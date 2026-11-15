# Agent Skills

> Production-grade, battle-tested skills for AI coding agents (Antigravity, Gemini CLI, Claude Code, Cursor, Windsurf, and custom agent harnesses).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills Standard](https://img.shields.io/badge/Standard-Agent_Skills_v1-green.svg)](https://github.com/Ayomide-Philip/skills)
[![PRDs Generated](https://img.shields.io/badge/PRD_Tiers-Light_|_Standard_|_Full-orange.svg)](prd/)

---

## Overview

**Agent Skills** is an open-source library of structured, modular capabilities that supercharge AI coding agents. Unlike raw prompts, skills are standardized modular directories containing executable instructions (`SKILL.md`), ordered workflow phases (`workflows/`), authoritative reference guides (`references/`), and concrete implementation examples (`examples/`).

By packaging domain expertise into deterministic workflows with strict approval gates, skills ensure that AI agents think, discover, and validate before touching code.

---

## Available Skills

### [`prd`](./prd) — Implementation-Ready Product Requirements Documents

The flagship skill in this repository. Generates structured, unambiguous, implementation-ready Product Requirements Documents in Markdown before writing any code, scaffolding projects, or installing dependencies.

#### Core Value Proposition

- **Zero Hallucination:** Never assumes or invents user requirements. Distinguishes confirmed decisions from assumptions.
- **Adaptive Scope Tiers:** Automatically scales documentation depth to match project complexity:
  - **Light Tier:** Small features, micro-apps, or CLI scripts. Concise problem statement, user flow, numbered requirements (`FR-001`) with observable acceptance criteria.
  - **Standard Tier:** Typical feature additions in existing codebases. Focuses on modified views, schema migrations, API changes, and backward compatibility.
  - **Full Tier:** Greenfield platforms and multi-role platforms. Full vision, personas, Gherkin acceptance criteria, 5 UI states, API contracts, latency budgets, MoSCoW scoping, and audit trails.
- **Mandatory Approval Gate:** Requires explicit human approval before any implementation, code generation, or workspace modifications can occur.
- **9-Point Quality Audit Matrix:** Automatically validates completeness, requirement quality, traceability, UX state coverage, business logic, technical consistency, scope boundaries, and internal consistency.

---

## Repository Structure

```
skills/
├── README.md                      # Project documentation and catalog
└── prd/                           # Product Requirements Document skill
    ├── SKILL.md                   # Skill entrypoint & metadata frontmatter
    ├── workflows/                 # Sequential workflow steps
    │   ├── 01-inspect-context.md  # Silent codebase inspection & tier selection
    │   ├── 02-discovery.md        # Targeted requirements clarification
    │   ├── 03-generate-prd.md     # Implementation-ready PRD creation
    │   └── 04-review-and-approval.md # 9-point audit & explicit approval gate
    ├── references/                # Supporting guides & specifications
    │   ├── prd-templates.md       # Standardized PRD & feature spec templates
    │   ├── requirement-writing.md # Anatomy of testable functional requirements
    │   ├── prioritization.md      # MoSCoW & RICE prioritization frameworks
    │   ├── technical-specifications.md # Architecture, schemas & API contracts
    │   └── validation-checklist.md # 9-point audit matrix & severity grading
    └── examples/                  # Reference PRD implementations
        ├── README.md              # Examples index & tier comparison table
        ├── 01-light-tier-example.md          # Light Tier: CLI note clipper
        ├── 02-standard-feature-spec-example.md # Standard Tier: Scoped API keys
        └── 03-full-tier-prd-example.md       # Full Tier: Incident platform
```

---

## Quick Start & Installation

### Option 1: One-Line Install via `npx` (Interactive CLI)

Run the guided installer directly (using `@latest` ensures `npx` always pulls the freshest skills and avoids stale local cache):

```bash
npx @ayomide-philip/skills@latest
```

Or install non-interactively using target flags:

```bash
# Add to Antigravity Global (~/.gemini/antigravity/skills/prd)
npx @ayomide-philip/skills@latest add prd --antigravity

# Add to current project workspace (.agent/skills/prd)
npx @ayomide-philip/skills@latest add prd --workspace

# Add to System Global (~/.agents/skills/prd)
npx @ayomide-philip/skills@latest add prd --global

# Add for Claude Code (.claude/skills/prd)
npx @ayomide-philip/skills@latest add prd --claude

# Add for Cursor rules (.cursor/rules/prd)
npx @ayomide-philip/skills@latest add prd --cursor
```

---

### Option 2: Instant GitHub Download via `degit` (Zero Publish Needed)

Install directly from GitHub into your project without npm dependencies:

```bash
# Workspace install
npx degit Ayomide-Philip/skills/prd .agent/skills/prd

# Global Antigravity install
npx degit Ayomide-Philip/skills/prd ~/.gemini/antigravity/skills/prd
```

---

### Option 3: Manual Clone or Copy

Clone the repository and place the `prd` folder into your skills path:

```bash
git clone https://github.com/Ayomide-Philip/skills.git
```

- **Antigravity Global:** Copy `prd/` to `~/.gemini/antigravity/skills/prd`
- **Project Workspace:** Copy `prd/` to `.agent/skills/prd`

---

## How to Use

### 1. Triggering the Skill

Invoke the skill naturally in chat or via slash command:

```text
/prd
```

_or_

```text
Build a PRD for an incident management war room platform
```

_or_

```text
Create a PRD for adding OAuth2 social login to our existing web app
```

### 2. The 4-Stage Execution Flow

```
+-------------------------------------------------------------------------------+
| 1. INSPECT CONTEXT  | Silently reads workspace, stack, and classifies intent.  |
|                     | Chooses Light, Standard, or Full scope tier.            |
+---------------------+---------------------------------------------------------+
| 2. DISCOVERY        | Asks targeted, high-impact clarifying questions.        |
|                     | Adheres to strict questioning budget (max 3-5 at once). |
+---------------------+---------------------------------------------------------+
| 3. GENERATE PRD     | Writes implementation-ready Markdown specification      |
|                     | with testable Gherkin acceptance criteria & schemas.    |
+---------------------+---------------------------------------------------------+
| 4. AUDIT & APPROVE  | Runs 9-point quality audit; awaits explicit user        |
|                     | approval before any code or scaffolding can begin.       |
+-------------------------------------------------------------------------------+
```

### 3. Controlling Scope Tiers

You can override the automatic tier selection at any time:

- `"Make it light"` &rarr; Generates a fast, minimal PRD (problem, primary flow, numbered FRs).
- `"Use standard tier"` &rarr; Balances depth with agility for feature development.
- `"Full PRD"` &rarr; Generates comprehensive enterprise specs with full MoSCoW prioritization, schemas, and error states.

---

## Examples in Action

Explore the [`prd/examples/`](./prd/examples/) directory to see real reference documents:

- **[Light Tier Example](./prd/examples/01-light-tier-example.md):** `quickclip` — A fast, zero-config CLI markdown link and note clipper.
- **[Standard Tier Feature Spec](./prd/examples/02-standard-feature-spec-example.md):** Scoped API Key Management & Revocation for an existing observability platform.
- **[Full Tier Greenfield PRD](./prd/examples/03-full-tier-prd-example.md):** `PulseLog` — Real-time developer incident triage and sprint health platform with WebSockets, RBAC, and Prisma data models.
- **[Standard Tier Greenfield PRD](./prd/examples/04-personal-portfolio-example.md):** `DevFolio` — Modern developer personal portfolio & technical blog built with Next.js App Router, Tailwind CSS, local MDX, and serverless contact pipeline.

---

## Contributing New Skills

We welcome new skills from the community! Every skill must adhere to the standard skill layout:

1. **`SKILL.md`:** Must include YAML frontmatter with `name` and a trigger-ready `description`.
2. **`workflows/`:** Decompose the skill into numbered sequential steps (`01-...`, `02-...`).
3. **`references/`:** Extract deep guides, templates, and checklists so the core instructions stay clean.
4. **`examples/`:** Provide realistic reference inputs and outputs so both humans and agents understand the intended output quality.

To contribute:

1. Fork this repository.
2. Create your feature branch (`git checkout -b skill/my-new-skill`).
3. Commit your changes (`git commit -m "feat: add my-new-skill"`).
4. Push to the branch (`git push origin skill/my-new-skill`).
5. Open a Pull Request.

---

## License

This repository is licensed under the [MIT License](LICENSE).
