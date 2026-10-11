---
name: pe-ux-flows
description: Use when building navigation, forms, user flows or feedback states (loading, empty, error, success) in ProgressEye.
---
# UI and UX flows
Navigation: one primary nav, clear active state, visible focus, skip link. Mobile drawer traps focus, closes on route change and Escape.
CTAs: one primary per viewport, labels start with a verb. Secondary actions look weaker.
Forms: label above the field (never placeholder-only), validate on blur and on submit, errors linked with aria-describedby, focus the first error, keep entered values on failure, correct autocomplete and input types, no more than 7 visible fields. Submit shows progress text while sending.
Every async view defines four states: loading (skeleton, not a lone spinner), empty (explain and offer an action), error (what happened and a retry), success (confirm and the next step).
Toasts are for transient confirmations only. Destructive actions use a confirm dialog that names the consequence.
Write the happy path and failure paths before building. No dead ends. Microcopy: sentence case, plain words, Indian English spelling.
