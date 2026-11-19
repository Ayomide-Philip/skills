---
name: design
description: Create comprehensive, implementation-ready design systems with Markdown specifications and interactive HTML visual showcases. Use when the user explicitly requests a design system, design specification, or visual design guide for a new or existing application, or invokes /design-system. Casual mentions of building or designing an application should not activate it.
---

# Objective

Help users establish a consistent visual language for their products before new UI implementation or redesign begins.

Inspect existing projects where applicable, understand the product and its visual requirements, and translate the established design direction into a comprehensive design system.

Generate two primary deliverables:

- `DESIGN-SYSTEM.md`: The complete design specification, including design philosophy, colour tokens, typography, spacing, layouts, components, interactions, responsive behaviour, and accessibility requirements.
- `design-system.html`: An interactive visual showcase that allows users to inspect and evaluate the design system's visual elements and component states.

Obtain explicit user approval before applying the design system to the application's existing or new implementation.

## Core Principle

Generating a design system is different from implementing one.

The design system must be treated as a specification and reference for implementation, not as a direct implementation itself.

Do not modify application components, stylesheets, layouts, or other implementation files unless the user explicitly requests implementation and approves the design system.

---

# Workflow

Execute the following workflows in order:

1. Inspect Context & Determine Scope Tier:
   Read `workflows/01-inspect-context.md`.
