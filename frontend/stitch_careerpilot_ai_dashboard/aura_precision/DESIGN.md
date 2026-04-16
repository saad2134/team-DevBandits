# Design System Strategy: The Intelligent Path

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Mentor"**

This design system moves away from the "utility-first" clutter of traditional SaaS to embrace an editorial, high-end aesthetic. It is inspired by the precision of a high-performance flight deck and the breathability of a luxury lifestyle magazine.

To break the "template" look, we leverage **Intentional Asymmetry** and **Micro-Depth**. We don't just place cards on a grid; we layer surfaces. By using generous white space (64px+ section buffers) and high-contrast typography scales (e.g., pairing a massive `display-lg` headline with a tiny, uppercase `label-md`), we create a hierarchy that feels curated and authoritative. The UI should feel like it is "thinking" alongside the user—calm, precise, and sophisticated.

---

## 2. Colors & Surface Architecture

The palette is rooted in Indigo and Purple, but its power lies in how we treat the "Negative Space."

### The "No-Line" Rule
Standard 1px borders are prohibited for sectioning. We define boundaries through **Tonal Shifts**. 
- **Method:** Place a `surface-container-low` (#f2f4f6) element against a `background` (#f7f9fb) to create a soft edge. 
- **The Result:** A UI that feels seamless and unified, rather than a collection of boxes.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of fine paper and glass.
*   **Base Layer:** `surface` (#f7f9fb).
*   **Secondary Context:** `surface-container` (#eceef0).
*   **Actionable Elements:** `surface-container-lowest` (#ffffff) for primary cards to make them "pop" against the off-white background.
*   **Elevated Overlays:** Use `surface-bright` for floating navigation.

### The "Glass & Gradient" Rule
To signal AI-driven intelligence, use **Glassmorphism**. Floating menus or "Match Score" cards should use a semi-transparent `on_secondary_container` with a `backdrop-blur` (20px-30px). 
*   **Signature Texture:** Apply a subtle linear gradient (`primary` #3525cd to `secondary` #8127cf) at 15% opacity as a background for hero sections to provide "visual soul."

---

## 3. Typography: The Editorial Voice

We utilize a dual-typeface system to balance technical precision with human approachability.

*   **The Display Voice (Manrope):** Used for `display` and `headline` tiers. Manrope’s geometric yet warm curves provide a "premium tech" feel. Use `display-lg` (3.5rem) with tight tracking (-0.02em) for hero moments.
*   **The Functional Voice (Inter):** Used for `title`, `body`, and `labels`. Inter provides maximum legibility for data-heavy career paths and skill trees.
*   **Hierarchy Note:** Always pair a `headline-sm` with a `label-sm` (all-caps, 0.05em letter spacing) to create an "Editorial Metadata" look common in high-end publications like Linear.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "heavy" for this system. We use light to create focus.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, soft lift.
*   **Ambient Shadows:** If a shadow is required for a floating state, use a "Tinted Ambient Shadow." 
    *   *Values:* `0 20px 40px -12px rgba(70, 69, 85, 0.08)`. The shadow color is derived from `on_surface_variant`, never pure black.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use the `outline-variant` (#c7c4d8) at **20% opacity**. It should be felt, not seen.
*   **Interactive Depth:** On hover, instead of a shadow, shift the background color from `surface-container-lowest` to `surface-bright`.

---

## 5. Components

### Buttons & CTAs
*   **Primary:** Solid `primary` (#3525cd) with `on_primary` text. Use `radius-md` (0.75rem).
*   **AI Action:** Use a gradient fill (`primary` to `secondary`) with a subtle 1px inner glow to signify "Intelligence."
*   **Tertiary:** No background. Use `primary` text with a `surface-container-highest` background on hover.

### Progress Bars & Match Scores
*   **Track:** `surface-container-high`.
*   **Indicator:** `primary` (#3525cd) with a `secondary` (#8127cf) glow at the leading edge.
*   **Radius:** Always `full` (9999px) for progress indicators to contrast against the `md` radius of cards.

### Cards & Skill Tags
*   **The Rule of No Dividers:** Never use horizontal lines. Separate skill lists using `surface-container-low` backgrounds for each tag.
*   **Card Radius:** Use `radius-lg` (1rem) for main dashboard cards and `radius-md` (0.75rem) for nested elements.

### AI-Driven Components
*   **Pulse Loader:** A soft, breathing opacity animation on a `secondary_container` surface to indicate the AI is processing career data.
*   **Match Score Badge:** A glassmorphic circle with a 2px `outline-variant` border (20% opacity) and `headline-sm` typography.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical padding (e.g., more padding at the top of a card than the bottom) to create an editorial feel.
*   **Do** use `on_surface_variant` (#464555) for secondary text to maintain a soft, high-end contrast.
*   **Do** allow elements to overlap slightly to create a sense of depth and "digital physicalness."

### Don't
*   **Don't** use 100% black (#000000) for text. Use `on_surface` (#191c1e).
*   **Don't** use sharp corners. Everything must feel approachable (0.5rem minimum radius).
*   **Don't** use "Card-in-Card" layouts with borders. Use a background color shift for the nested card instead.