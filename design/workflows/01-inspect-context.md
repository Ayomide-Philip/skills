# Workflow 1: Inspect Context & Determine Intent

## Objective

Understand the user's request, inspect the available project context, determine whether an existing design system is present, and establish the appropriate starting point before beginning design discovery.

This workflow is investigative and read-only. Do not begin defining the actual design system yet.

## A. Determine the Project Context

Establish whether the user is working with:

1. **A new project:** No existing application interface or design system is available.
2. **An existing project:** An application already exists and its interface can be inspected.
3. **An existing design system:** The user wants to review, update, or extend an established design system.

Use available project files and conversation context to determine this. Do not ask the user to provide information that can already be established.

## B. Inspect the Existing Project

For existing projects, inspect relevant files and application interfaces to understand the current visual implementation and determine whether a design system already exists.

Do not rely on filenames alone. A design system may exist through documented specifications, shared design tokens, reusable components, or established styling conventions.

Examine where applicable:

- Existing design documentation (`design-system.md`, `design.md`, `styleguide.md`, etc.).
- Global stylesheets and CSS variables.
- Tailwind CSS configuration and theme tokens.
- Shared UI components and component variants.
- Typography and font configuration.
- Colour palette and semantic colour definitions.
- Spacing, sizing, and layout conventions.
- Light and dark mode implementations.
- Icons, images, and other visual assets.
- Representative application pages.

Do not inspect the entire codebase unnecessarily. Focus on files and interfaces relevant to understanding the existing design.

### Classify the Existing Design System

Based on the inspection, classify the project into one of three categories:

1. **Established design system:** Consistent design tokens, reusable components, styling conventions, and/or documentation already exist.
   - Action: Identify existing design patterns, inconsistencies, and missing elements. Use these findings to inform the design direction discussion with the user.

2. **Partial design system:** Some design tokens, reusable components, or conventions exist, but important areas are missing or inconsistent.
   - Action: Identify what already works, present the missing areas and inconsistencies, and establish what should be retained or improved.

3. **No identifiable design system:** The application has no clearly established visual rules, and styling is mostly scattered or inconsistent.
   - Action: Explain that there is no coherent system to preserve. Offer to formalize the existing visual patterns with an inconsistency warning or establish a completely new design direction.

Do not assume that installing a component library or styling framework means a complete design system exists.

### Evaluate the Existing Visual Implementation

Inspect representative application interfaces to identify:

- Existing visual patterns and design decisions worth preserving.
- Inconsistent colours, typography, spacing, and component styles.
- Weak visual hierarchy and layout problems.
- Broken or inconsistent responsive behaviour.
- Obvious accessibility failures, such as unreadable text or insufficient colour contrast.
- Accidental implementation defects that should not become design rules.

Distinguish between intentional visual decisions and accidental implementation problems.

Do not reproduce obvious defects as part of the design system. Flag visible accessibility concerns here; comprehensive accessibility requirements and validation belong in Workflow 3.

Carry the inspection findings forward to the user and into Workflow 2. Do not create notes, documentation, or other files during this workflow.

## C. Establish the Design Direction with the User

### For Existing Projects

Present a concise summary of:

- Whether an established, partial, or no identifiable design system exists.
- The current visual direction and notable design patterns.
- Significant inconsistencies or implementation problems discovered.
- Existing design decisions worth preserving.

Then ask the user how they want to approach the design system.

Adapt the available choices to the classification:

**For an established design system:**

1. **Use the existing design:** Preserve the current visual identity and formalize its existing patterns into a design system.
2. **Improve the existing design:** Retain the visual identity while improving inconsistencies, usability, and weak design decisions.
3. **Create a new design direction:** Establish a different visual identity and design language.

**For a partial design system:**

1. **Use the existing design:** Formalize the existing patterns and fill the missing gaps, while identifying inconsistencies.
2. **Improve the existing design:** Retain its visual identity while improving weak areas and establishing more consistent rules.
3. **Create a new design direction:** Establish a different visual identity and design language.

**For no identifiable design system:**

1. **Formalize the existing visual patterns:** Extract the application's current visual choices and organize them into a design system. Clearly warn the user that the existing patterns are inconsistent and may require corrections.
2. **Create a new design direction:** Use the application as product context while establishing a coherent visual identity from scratch.

Do not offer to preserve an established system when no coherent system exists.

Do not choose an approach on the user's behalf. If the user has already clearly specified their preferred approach, respect that decision instead of asking again.

### For New Projects

There is no existing interface to inspect or preserve.

Proceed to Workflow 2 to understand the product, its users, brand personality, and desired visual direction.

Do not assume a visual style or choose a design direction without sufficient context.

### For Existing Design Systems

Inspect the current design system and determine whether the user wants to:

- Review the existing specification.
- Update or improve it.
- Extend it with additional components or patterns.
- Replace it with a new design system.

Clarify the intended scope if it is not already clear.

## D. Determine Artifact Destinations

Establish where the generated design system files should be placed.

Default locations:

- Markdown specification: `docs/design-system.md`
- HTML showcase: `docs/design-system.html`

For existing projects:

- Inspect the existing documentation structure.
- Preserve established naming conventions and locations where appropriate.
- Avoid creating duplicate design system files.
- If an existing design system is being updated, identify its current location.
- Ask before overwriting existing design documentation.

For new projects:

- Use the default locations unless the user specifies otherwise.

Do not create files or directories during this workflow.

## E. Assess Discovery Readiness

Before completing this workflow, establish:

- Whether the project is new or existing.
- The user's intended design system task.
- The existing design system classification, if applicable.
- The current visual direction and relevant findings.
- The user's preferred approach to the existing design, if applicable.
- Relevant technical constraints.
- The intended artifact destinations.
- Any important missing context that must be addressed during design discovery.

If essential information is missing, carry it into Workflow 2 for clarification.

Do not ask detailed questions about colours, fonts, component styles, or other design decisions here. Those belong to the design discovery workflow.

## Workflow Constraints

- This workflow is read-only.
- Do not modify existing application files.
- Do not generate the design system yet.
- Do not install dependencies.
- Do not implement UI components.
- Do not create inspection notes or temporary documentation files.
- Do not impose a visual direction without user input.
- Do not ask the user to repeat information already available in the conversation or project.

## Completion Criteria

Workflow 1 is complete when the project context, existing design system classification (if applicable), intended task, preferred design approach, and artifact destinations are sufficiently understood.

Proceed to **Workflow 2: Design Discovery & Visual Direction**.
