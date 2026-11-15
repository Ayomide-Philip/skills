# Product Requirements Document (PRD)

## DevFolio: Modern Developer Portfolio & Technical Blog

- **Tier:** Standard Tier (Greenfield Web Application)
- **Document Version:** 1.0.0
- **Status:** In Review
- **Author:** Product Engineering & Architecture Lead
- **Target Release:** Q1 2027 (MVP Launch)
- **Document Location:** `prd/examples/04-personal-portfolio-example.md`
- **Reference Implementation:** Personal Developer Portfolio

---

### 1. Executive Summary & Vision

#### 1.1 Problem Statement
Software engineers and technical creators often rely on generic resumes, outdated static pages, or third-party profile aggregators (LinkedIn, GitHub profile READMEs) that fail to convey engineering depth, design craftsmanship, and architectural problem-solving. Existing off-the-shelf website builders (WordPress, Webflow, Squarespace) are heavy, vendor-locked, and lack native developer workflows such as MDX technical writing, code syntax highlighting, and performant lighthouse metrics.

#### 1.2 Product Vision
DevFolio is a blazing-fast, minimalist, and content-driven personal portfolio and technical blog built with Next.js (App Router) and Tailwind CSS. It empowers engineers to showcase real-world projects with interactive deep-dives, publish technical articles with rich code blocks, highlight career milestones, and capture inbound opportunities via a secure serverless contact flow.

#### 1.3 Value Proposition
- **Developer-Native Content Workflow:** Write project writeups and technical essays in local MDX with syntax highlighting, frontmatter metadata, and interactive React components.
- **Flawless Performance & SEO:** 95+ Google Lighthouse scores across Performance, Accessibility, Best Practices, and SEO; automated dynamic OpenGraph images for social sharing.
- **Refined Aesthetics & Accessibility:** Tailored dark/light mode with zero flash of unstyled content (FOUC), smooth micro-interactions via Framer Motion, and full WCAG 2.1 AA keyboard navigable design.

#### 1.4 Goals & Non-Goals
- **Goals:**
  - First Contentful Paint (FCP) under 800ms and Largest Contentful Paint (LCP) under 1.5s on desktop.
  - Zero-maintenance serverless architecture deployed on Vercel or Cloudflare Pages with zero fixed monthly database cost.
  - Full end-to-end type safety across content schemas, form validation, and UI props.
  - Spam-protected direct contact pipeline delivering inquiries straight to the developer's personal email inbox.
- **Non-Goals (Out of Scope for Initial Launch):**
  - Paid CMS dashboard or web-based content editor (all content is managed via Git-tracked Markdown/MDX files).
  - Multi-user authentication, membership paywalls, or newsletter subscriber management (deferred to v1.2).
  - In-browser interactive code sandboxes (e.g. embedded WebContainers or Sandpack; external links are provided instead).

---

### 2. Target Users & Personas

| Persona / Role | Description | Primary Needs | Key Pain Points |
| :--- | :--- | :--- | :--- |
| **Engineering Hiring Manager** | Evaluates software design capabilities, code cleanliness, and leadership scope for senior engineering openings. | Quick access to production live demos, GitHub repositories, architecture summaries, and verified impact metrics. | Dense resumes with buzzwords; non-working demo links; lack of clarity on what the candidate actually owned vs. team contributions. |
| **Technical Recruiter** | Rapidly screens candidates for skill match, years of experience, current location/availability, and contact info. | Skimmable summary of tech stack, current role status, downloadable PDF resume, and one-click email/LinkedIn links. | Hard-to-find contact information, broken resume download links, and sluggish mobile page load. |
| **Peer Engineer / Technical Reader** | Discovers technical articles via social media, Hacker News, or search engines. | Fast-loading technical writeups, readable typography, copyable code snippets with syntax highlighting, and responsive mobile layout. | Cluttered popups, cookie consent overlays, unreadable font contrast, and unformatted code blocks. |

---

### 3. User Journeys & Workflows

#### 3.1 Primary Journey: Hiring Manager Evaluation & Inquiry
```
[Landing / Hero] ---> [Scans Bio & Stack] ---> [Explores Featured Project]
                                                        |
[Contact Confirmed] <--- [Submits Contact Form] <--- [Reviews Live Demo & Repo]
```

1. **Entry Point:** Lands on `/` via direct resume link or LinkedIn profile.
2. **First Impression:** Hero section displays high-contrast introduction, headline role (*"Full-Stack Systems Engineer"*), availability badge (*"Open to Select Opportunities"*), and links to GitHub, LinkedIn, and PDF resume.
3. **Project Exploration:** Scrolls to the "Featured Projects" section. Filters projects by tag (`TypeScript`, `Next.js`, `Distributed Systems`).
4. **Project Deep-Dive:** Clicks on a project card to view an architecture summary modal or navigates to `/projects/[slug]` with problem-solution narrative and metrics.
5. **Contact Initiation:** Clicks **"Get in Touch"** button, triggering smooth scroll to the contact form or opening `/contact`.
6. **Form Submission:** Enters name, email, subject, and message. Receives instantaneous client feedback and a confirmation toast upon delivery.

#### 3.2 Secondary Journey: Technical Article Discovery
1. **Entry Point:** Lands on `/blog/optimizing-nextjs-app-router` from search or social link.
2. **Reading Experience:** Clean typography, sticky table of contents (desktop), estimated read time indicator, and copy-to-clipboard buttons on code blocks.
3. **Engagement:** Footer offers related articles, developer bio card, and a link back to all projects.

---

### 4. Functional Requirements

#### FR-PORT-001: Hero Section & Personal Branding
- **Priority:** Must Have
- **Description:** Provide an engaging above-the-fold introductory section presenting the engineer's identity, core competencies, status, and primary CTAs.
- **Business Rules:**
  - Availability status indicator must toggle between `"Available for hire"`, `"Consulting only"`, and `"Not actively looking"` via a single config constant.
  - Resume CTA must open or download a verified PDF stored in `/public/resume.pdf`.
  - Social media icon links (GitHub, LinkedIn, X/Twitter, Email) must open in new tabs with `rel="noopener noreferrer"`.
- **Acceptance Criteria:**
  - [ ] Given a desktop or mobile visitor on `/`, when the hero renders, the avatar, headline, bio summary, and social links are fully visible without layout shift (CLS = 0).
  - [ ] When clicking "Download Resume", the browser triggers a download or opens `/resume.pdf` in a new tab.

#### FR-PORT-002: Project Catalog with Tag Filtering & Case Studies
- **Priority:** Must Have
- **Description:** Display a curated portfolio of software projects with metadata, category filtering, repository/demo URLs, and detailed case studies.
- **Business Rules:**
  - Projects are defined via structured MDX files in `content/projects/` with typed frontmatter (`title`, `slug`, `summary`, `tags`, `featured`, `githubUrl`, `liveUrl`, `thumbnail`, `order`).
  - Filtering by tech tag must be instant (client-side state) and update the URL query string (`?tag=react`) without full page reload.
  - Featured projects (flagged `featured: true`) appear pinned at the top of the home page.
- **Acceptance Criteria:**
  - [ ] Given 10 projects in the catalog, when a user selects the tag "Next.js", only projects containing "Next.js" in their tags list remain visible.
  - [ ] Given a project card with a valid `githubUrl`, clicking the GitHub icon opens the repository in a new tab.
  - [ ] Navigating to `/projects/sample-project` displays the full project case study rendered from MDX with screenshots, key challenges, and measurable results.
  - [ ] If an invalid slug is requested (`/projects/unknown-slug`), the system renders a customized `404 - Project Not Found` screen with a button returning to `/projects`.

#### FR-PORT-003: Interactive Career & Education Timeline
- **Priority:** Must Have
- **Description:** Chronological timeline illustrating employment history, roles, responsibilities, and education milestones.
- **Business Rules:**
  - Entries are sorted reverse-chronologically (most recent first).
  - Current positions must display a highlighted active badge (`Present`).
  - Bullet points highlight quantifiable engineering achievements (e.g. *"Reduced build times by 42%"*).
- **Acceptance Criteria:**
  - [ ] Given the Experience section, career entries display company name, position title, date range, location, and bulleted contributions.
  - [ ] On mobile screens (<640px), the timeline collapses into a clean vertical single-column layout without horizontal scroll overflow.

#### FR-PORT-004: Technical Blog / Articles Engine (MDX)
- **Priority:** Should Have
- **Description:** Lightweight, markdown-driven publishing system for technical writing, guides, and architectural notes.
- **Business Rules:**
  - Posts stored as `.mdx` files in `content/blog/` with frontmatter (`title`, `publishedAt`, `summary`, `tags`, `draft`).
  - Posts flagged with `draft: true` are hidden in production builds but accessible in development mode.
  - Code blocks must support syntax highlighting (via Shiki or Rehype Pretty Code) and provide a one-click copy button.
  - Reading time calculation must be automated based on word count (~200 words per minute).
- **Acceptance Criteria:**
  - [ ] Given an article with fenced code blocks (`typescript`), syntax highlighting is applied with proper language tokens and line formatting.
  - [ ] When clicking the "Copy" button on a code snippet, code is copied to the user's clipboard and a checkmark icon confirms the action for 2000ms.
  - [ ] Articles display calculated read time (e.g., *"5 min read"*) and formatted release date.

#### FR-PORT-005: Contact Form with Server-Side Validation & Spam Shield
- **Priority:** Must Have
- **Description:** Allow visitors to submit direct inquiries with validation, rate limiting, and spam protection without exposing raw email addresses.
- **Business Rules:**
  - Form fields: Name (min 2 chars), Email (valid format), Subject (optional, max 100 chars), Message (min 10 chars, max 2000 chars).
  - Spam prevention: Implement a hidden honeypot field (`website`). If filled, silently accept the request without dispatching an email.
  - Submission mechanism: Next.js Server Action with Zod schema validation.
  - Email transport: Integration with Resend API (or configured SMTP) using a structured email template.
  - Rate limiting: Max 3 submissions per IP address per 15-minute window.
- **Acceptance Criteria:**
  - [ ] Given an empty or invalid form submission, inline error messages appear under the invalid fields without page reload.
  - [ ] Given a valid submission, the server action sends an email via Resend and the UI displays a green success state: *"Thank you! Your message has been sent successfully."*
  - [ ] Given a submission where the invisible honeypot field is populated by an automated bot, return HTTP success but discard the message without triggering email delivery.
  - [ ] If email delivery fails due to API error, display a friendly error notification with a fallback `mailto:` link.

#### FR-PORT-006: Dark / Light Mode with System Synchronization
- **Priority:** Must Have
- **Description:** Complete theme customization allowing users to toggle between Dark, Light, and System Default themes.
- **Business Rules:**
  - Implemented using `next-themes` and Tailwind CSS `class` strategy.
  - User preference persisted in `localStorage` under key `theme`.
  - Zero layout shift and zero flash of incorrect theme during hydration.
- **Acceptance Criteria:**
  - [ ] Given a visitor whose OS preference is Dark mode, the site renders dark theme on initial load without white flash.
  - [ ] When the theme toggle button in the header is clicked, the interface toggles instantly between light and dark modes.

#### FR-PORT-007: Dynamic OpenGraph Social Previews & SEO
- **Priority:** Should Have
- **Description:** Generate social share cards and rich search engine metadata for all pages and articles.
- **Business Rules:**
  - Static pages define metadata using Next.js Metadata API (title, description, canonical URL).
  - Blog posts and project pages dynamically generate OpenGraph images via `@vercel/og` featuring post title, author name, and tag badges.
  - Auto-generate valid `sitemap.xml` and `robots.txt` at build time.
- **Acceptance Criteria:**
  - [ ] Inspecting the `<head>` of `/blog/my-post` shows valid `og:title`, `og:description`, `og:image`, and `twitter:card` tags.
  - [ ] Navigating to `/sitemap.xml` outputs valid XML listing all public pages and published blog posts.

---

### 5. UI/UX Specifications

#### 5.1 Route Inventory & Structure
- `/`: Home page (Hero, Featured Projects, Experience Timeline, Skills Grid, Latest Articles, Contact CTA).
- `/projects`: Complete project catalog with search and tag filters.
- `/projects/[slug]`: In-depth project case study.
- `/blog`: Article listing with tag filter and search.
- `/blog/[slug]`: Single article reading view with sticky table of contents.
- `/contact`: Dedicated contact page with contact form and alternative social channels.
- `/404`: Custom Not Found screen.

#### 5.2 Key UI States
- **Loading State:** Skeleton placeholder cards with subtle pulse animations for project grids and article lists while MDX or dynamic data is resolving.
- **Empty State:** When filtering projects or search returns no results, display an illustrative empty state: *"No projects found matching the selected tag. Try resetting filters."* with a **"Reset Filters"** action button.
- **Error State:** On contact form submission failure or network disconnection, display an inline alert box with error explanation and a **"Try Again"** button.
- **Success State:** Contact form smoothly transitions into a success card with animated checkmark and option to send another message.

#### 5.3 Responsive & Accessibility Standards
- Fully responsive across Mobile (<640px), Tablet (640–1024px), and Desktop (>1024px).
- Mobile navigation uses a slide-out hamburger menu with trapped keyboard focus and `aria-expanded` attributes.
- WCAG 2.1 AA compliant color contrast ratios across both light and dark themes (minimum 4.5:1 for normal body text).
- Interactive elements feature clear `:focus-visible` outline rings for keyboard navigators.

---

### 6. Technical Architecture & Data Specifications

#### 6.1 Technology Stack
- **Framework:** Next.js 15+ (App Router, Server Components, Server Actions)
- **Language:** TypeScript 5.x (Strict Mode enabled)
- **Styling:** Tailwind CSS v3.4+ / v4 with `@tailwindcss/typography`
- **Component Primitives:** Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`) & Lucide React icons
- **Animations:** Framer Motion (subtle entrance fades and layout animations)
- **Content Engine:** Local MDX with `next-mdx-remote` or Contentlayer2; syntax highlighting via `rehype-pretty-code` / `shiki`
- **Validation:** Zod 3.x
- **Email Delivery:** Resend SDK (`resend`) with React Email components
- **Hosting & CI/CD:** Vercel (Edge Network, automatic preview branches on Git push)

#### 6.2 Data Models & TypeScript Types

```typescript
// types/project.ts
export interface Project {
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
  order: number;
  publishedAt: string;
  tags: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

// types/blog.ts
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  readingTimeMinutes: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

// types/contact.ts
export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // Must be empty
}
```

#### 6.3 Security & Operational Integrity
- **Honeypot + Bot Shield:** Hidden field to intercept automated form scrapers.
- **Sanitization:** All markdown output sanitized; form inputs strictly validated via Zod schema before processing.
- **Environment Isolation:** Sensitive API tokens (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`) stored strictly in server-side environment variables and never exposed to the client bundle (`NEXT_PUBLIC_`).

---

### 7. Non-Functional Requirements

- **Performance:**
  - Google Lighthouse Performance score $\ge 95$ on desktop, $\ge 90$ on mobile.
  - Zero Cumulative Layout Shift (CLS < 0.05).
  - Next.js Image component utilized for all project thumbnails with automatic AVIF/WebP conversion and responsive `sizes`.
- **Reliability:**
  - 99.9% uptime powered by serverless edge CDN.
  - Graceful degradation: contact page provides direct fallback mailto link if external email dispatch service experiences an outage.
- **Maintainability:**
  - Single source of truth for site config (`config/site.ts` containing personal name, social URLs, site title, bio).
  - Clean separation between content (`/content`), reusable UI primitives (`/components/ui`), and route pages (`/app`).

---

### 8. Prioritization & MVP Scope (MoSCoW)

- **Must Have (MVP Launch):**
  - FR-PORT-001: Hero Section & Personal Branding
  - FR-PORT-002: Project Catalog with Tag Filtering & Detail Pages
  - FR-PORT-003: Experience & Career Timeline
  - FR-PORT-005: Contact Form with Server Actions, Zod, and Resend
  - FR-PORT-006: Dark / Light Mode with zero-FOUC
  - Responsive mobile navigation and WCAG 2.1 AA baseline accessibility
- **Should Have (v1.1 Release):**
  - FR-PORT-004: Technical Blog / Articles Engine with MDX & Syntax Highlighting
  - FR-PORT-007: Dynamic OpenGraph Social Image Generation
  - RSS Feed generation (`/feed.xml`) for technical blog posts
- **Could Have (v1.2 Consideration):**
  - Project search bar with fuzzy matching (`fuse.js`)
  - GitHub stats / recent commits live widget via GitHub REST API
  - Audio player for recorded podcast appearances or talk recordings
- **Won't Have (Out of Scope for Initial Version):**
  - Web-based admin dashboard or CMS login
  - User commenting system (Disqus/Giscus) on blog posts
  - Paid subscription / newsletter checkout integration

---

### 9. Assumptions, Risks & Open Decisions

| Type | Item | Impact | Mitigation / Status |
| :--- | :--- | :---: | :--- |
| **Confirmed Decision** | Next.js App Router + Tailwind CSS is the selected frontend architecture. | High | [CONFIRMED] Aligns directly with user specification. |
| **Confirmed Decision** | Contact delivery will use serverless Resend API with server action validation. | Medium | [CONFIRMED] Free tier covers 3,000 emails/month, zero server overhead. |
| **Assumption** | Content will be authored locally via Markdown/MDX in the repository. | Low | [ASSUMPTION] Avoids headless CMS complexity and database costs. |
| **Risk** | Inbound spam via public contact form. | Medium | [MITIGATED] Honeypot field + Zod string length constraints + rate limiting. |
| **Open Decision** | Blog comments via Giscus (GitHub Discussions backend). | Low | Deferred to v1.2; blog remains clean and read-focused for MVP. |

---

### 10. Document Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-11-15 | Product Engineering | Initial Standard Tier PRD for personal developer portfolio example. |
