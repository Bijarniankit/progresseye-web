---
description: Perform automated visual and accessibility QA across mobile (360px), tablet (768px), and desktop (1280px) viewports in light and dark mode.
---
# /visual-qa Workflow

1. Ensure dev server is running on `http://localhost:3000`.
2. Visit every added or modified route across 3 viewports:
   - Mobile: 360px
   - Tablet: 768px
   - Desktop: 1280px
3. Test in both Light mode and Dark mode.
4. Capture screenshots for each configuration.
5. Check:
   - Zero horizontal page overflow
   - No clipped, overlapping, or orphan text
   - No layout shifts (CLS <= 0.1)
   - Proper font and image rendering
   - Clean console with zero errors or warnings
   - Error and 404 fallbacks
   - Accessible contrast and keyboard focus order (WAI-ARIA)
   - Axe accessibility audit with 0 serious/critical defects
6. Generate a visual QA report matrix.
