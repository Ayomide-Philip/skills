# Agent Skills

> Production-grade, battle-tested skills for AI coding agents (Antigravity, Gemini CLI, Claude Code, Cursor, Windsurf, and custom agent harnesses).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills Standard](https://img.shields.io/badge/Standard-Agent_Skills_v1-green.svg)](https://github.com)
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

### Option 1: Google Antigravity & Gemini CLI

#### Global Installation (Available across all workspaces)
Clone or copy the skills into your global agent skills directory:

**macOS / Linux:**
```bash
git clone https://github.com/your-org/skills.git ~/.gemini/antigravity/skills
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/your-org/skills.git $HOME\.gemini\antigravity\skills
```

#### Workspace-Specific Installation
Copy the skill directory into your project's local `.agent/skills/` or `.gemini/skills/` folder:

```bash
mkdir -p .agent/skills
cp -r /path/to/skills/prd .agent/skills/prd
```

---

### Option 2: Claude Code, Cursor, Windsurf, & Other Agent Tools

You can link or copy the `prd` folder directly into your tool's custom instruction or skill directory:
- **Claude Code:** `.claude/skills/prd`
- **Cursor / Windsurf:** `.cursor/rules/prd` or include `prd/SKILL.md` in custom agent rules.

---

## How to Use

### 1. Triggering the Skill

Invoke the skill naturally in chat or via slash command:

```text
/prd
```
*or*
```text
Build a PRD for an incident management war room platform
```
*or*
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
