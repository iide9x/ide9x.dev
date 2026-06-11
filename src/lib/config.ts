// ─────────────────────────────────────────────────────────────
// EDIT YOUR DETAILS HERE — this is the only file you need to touch
// for name, bio, and social links.
// ─────────────────────────────────────────────────────────────

export type SocialKey =
  | "github"
  | "twitter"
  | "hackerone"
  | "bugcrowd"
  | "telegram"
  | "linkedin"
  | "discord"
  | "email";

export type Social = {
  key: SocialKey;
  label: string;
  href: string;
};

export const site = {
  handle: "ide9x",
  name: "DestroyerX",
  realName: "Ahmed",
  role: "Security Researcher & Bug Bounty Hunter",
  domain: "ide9x.dev",
  url: "https://ide9x.dev",
  description:
    "Security research, bug bounty writeups, and findings by DestroyerX (ide9x).",

  // Primary contact + the social grid on /contact.
  // Reorder / remove freely — icons are wired in src/components/Icons.tsx.
  socials: [
    { key: "hackerone", label: "HackerOne", href: "https://hackerone.com/iide9x" },
    { key: "bugcrowd", label: "Bugcrowd", href: "https://bugcrowd.com/h/iide9x" },
    { key: "github", label: "GitHub", href: "https://github.com/iide9x" },
    { key: "twitter", label: "X / Twitter", href: "https://x.com/ide9x" },
    { key: "telegram", label: "Telegram", href: "https://t.me/iide9x" },
    { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ide9x" },
    { key: "discord", label: "Discord", href: "https://discord.com/users/1276179026536300667" },
    { key: "email", label: "Email", href: "mailto:iide9x@wearehackerone.com" },
  ] satisfies Social[],
};

// Quick accessors used around the site.
export const social = (k: SocialKey) =>
  site.socials.find((s) => s.key === k);

export type SiteConfig = typeof site;
