# Design System Specification: High-Density Tactical Excellence

## 1. Overview & Creative North Star
### The Creative North Star: "The Sovereign Observer"
This design system is engineered to move beyond the "dashboard" trope and into the realm of the **Digital Command Center**. The objective is to provide institutional-grade macro-finance professionals with an environment of surgical precision and absolute authority.

We reject the "generic SaaS" look. Instead of flat boxes and standard padding, we utilize **High-Density Tactical Excellence**. This means every pixel must justify its existence. We achieve a premium, 2026-era aesthetic through:
*   **Intentional Asymmetry:** Breaking the rigid grid for specialized modules like 'The War Room' to prioritize temporal data over static content.
*   **Tonal Depth:** Moving away from borders and toward layered surfaces that feel like a physical cockpit.
*   **Data Authoritarianism:** Treating data points not as secondary information, but as the primary visual architecture.

---

## 2. Colors: Midnight Onyx & Cyber-Finance Blue
The palette is rooted in deep obsidian and slate tones to minimize eye strain during high-stakes sessions, while utilizing vibrant "Signal" accents for immediate cognitive processing.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off major layout areas. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` side panel should sit directly against a `surface` background. The transition of the color itself is the divider.

### Surface Hierarchy & Nesting
Use the surface tiers to create a physical "stack":
1.  **Base Layer:** `surface` (#111318) - The main canvas.
2.  **Sectioning:** `surface-container-low` (#1a1c20) - Used for primary sidebar or navigation zones.
3.  **Module Housing:** `surface-container` (#1e2024) - The standard for cockpit modules.
4.  **Active/Focus States:** `surface-container-high` (#282a2e) - To pull a specific card or modal "closer" to the user.

### The "Glass & Gradient" Rule
To ensure the UI feels like a 2026 interface, main CTAs and AI-driven elements (Velocity Blue) must use subtle linear gradients (from `primary` to `primary-container`). Floating overlays, such as tooltips or 'Script Review' pop-outs, must use high-fidelity glassmorphism: `surface-container-highest` at 70% opacity with a 12px backdrop-blur.

---

## 3. Typography: Tactical Authority
The typography system balances the institutional authority of **Inter** with the technical, monospaced precision required for high-density data.

*   **Headers & Navigation (Inter):** High-authority headers should use `display-sm` or `headline-md` with tight letter spacing (-0.02em) to feel architectural and solid.
*   **Tactical Data (Space Grotesk/Mono):** All macro-finance data points, logs, and parameters (using `label-md` and `label-sm`) use **Space Grotesk**. This conveys a "technical readout" vibe, ensuring numbers remain legible at high densities.
*   **Hierarchy:** Use `on-surface-variant` for secondary labels to create a clear "read-order" where the data itself (in `on-surface`) takes precedence over its descriptor.

---

## 4. Elevation & Depth
We replace traditional shadows with **Tonal Layering** and **Tactical Glows**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural "recessed" look, suggesting an integrated instrument panel.
*   **Tactical Glows:** When a "floating" effect is required, use the `tactical-glow` shadow. It is extra-diffused (large blur) and uses a 5% opacity tint of `primary` (Velocity Blue) rather than black, simulating the light emitted from a high-end OLED display.
*   **The "Ghost Border" Fallback:** If a containment line is required for accessibility, use a **Ghost Border**: `outline-variant` at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons: The Execution Units
*   **Primary (AI/Velocity Blue):** Gradient fill (`primary` to `primary-container`), 0.25rem (4px) radius. No border. On hover, apply a `tactical-glow`.
*   **Secondary (Signal Green):** Ghost style. Transparent fill with a `secondary` (Signal Green) 15% opacity ghost border.
*   **Tertiary:** Minimalist. `label-md` text only, switching to `on-surface` high-contrast on hover.

### Modules: The Integrated Cockpit
*   **'The CEO Dial' (Parameters):** Uses `surface-container-lowest` for the dial housing to create a "carved-out" look. 
*   **'The War Room' (Timeline):** Forgo standard list dividers. Separate timeline events using 16px of vertical white space and subtle background shifts to `surface-container-low`.
*   **Input Fields:** Ghost-style inputs. `surface-container-highest` background with a bottom-only 1px border using `outline-variant`. Focus state transitions the border to `primary`.

### Chips: Tactical Tags
*   Compact and sharp. Use `label-sm` text. Success chips use `secondary-container` (Signal Green) with `on-secondary-container` text. Volatility chips use `tertiary-container` (Market Crimson).

---

## 6. Tailwind Implementation