# PROJECT APEX: CONTEXT ENGINE

## [STRICT_ADHERENCE_REQUIRED]
- Any AI interacting with this project MUST read this file in its entirety before generating code.
- **ENVIRONMENTAL CONSTRAINT**: Production is Vercel (Node.js/Next.js). **NO PYTHON** execution is allowed in the production backend. All distribution logic must be Native TypeScript/Node.js.
- **[PROJECT_SPECIFIC_DESIGN_CONSTRAINTS]**: Sovereign Observer / High-Density Tactical Cockpit.
  - Primary Colors: Midnight Onyx (#111318), Velocity Blue (#00D1FF), Bone (#FAF9F5).
  - Background: Midnight Onyx (#111318).
  - **NO-LINE MANDATE**: Component boundaries must be defined by background color shifts, not 1px borders.
  - **TYPOGRAPHY**: Inter for UI/Headers; Space Grotesk for technical data and tactical readouts.
  - **CONSISTENCY MANDATE**: These design constraints (palette, tactical glows) are specific to the Apex Macro Automation project only.
- **LEGIBILITY**: Minimum body font size 14px. Deep contrast enforcement.

## [ARCHITECTURAL_TRUTH]
- **Framework**: Next.js 16.2.4 (Security Hardened).
- **Architecture**: Modular Micro-Engine Framework. Project follows Domain-Driven Design (DDD). Logic is isolated within `/engines` (and `src/engines` for TS).
- **React**: 19.0.0.
- **Structure**: Modular Architecture.
- **Data Blueprint**: 
  - **Internal Data**: JSON metadata (scripts, news) resides in root `/data` for build-time bundling and trace compliance.
  - **Shared Domain**: Cross-language configurations reside in root `/shared`.
  - **Public Assets**: Media files (MP4, MP3) reside in `/public/data` for runtime serving and external accessibility.
- **Backend Restriction**: Python is strictly forbidden in the production environment.
- **Distribution Domain**: Unified TypeScript Engine (Native Node.js via googleapis) located in `src/engines/distribution`.
- **Idempotency**: Stateful Broadcast Locking. Distribution is gated by `broadcast_status` in `current_script.json`. Once set to `published`, the Unified Engine rejects further attempts.
- **[COMMUNICATION_CONTRACT]**: The Shared Dictionary in `/shared/config.json` is the Source of Truth for engine data interchange. All engines must map their telemetry and status keys to this schema to prevent interface degradation.
- **Pathing Resolution**: 
  - Metadata: Statically scoped `path.join(process.cwd(), 'data', filename)`.
  - Shared Config: Statically scoped `path.join(process.cwd(), 'shared', filename)`.
  - Assets: Statically scoped `path.join(process.cwd(), 'public', 'data', filename)`.
  - **Mission 0.3 Standard**: All engines must utilize **Absolute Root Pathing**. Python engines resolve root via file-directory anchors; TypeScript resolves via `process.cwd()`. Indexed Mapping using the [LIVE_FILE_SYSTEM_MAP] is the required navigation protocol.
- **Institutional Standard**: Design follows the Stitch No-Line Mandate. Component boundaries defined by background color shifts. Typography set to Inter (UI) and Space Grotesk (Data).

## [CURRENT_MISSION_STATE]
- **Mission 2.3**: Video Engine Hardening (FFmpeg Discovery).
- **Status**: COMPLETE. FFmpeg dynamic discovery implemented via `shutil.which`. System paths synchronized in `shared/config.json`.

## [WALL_OF_FAILURES]
- **DO NOT ATTEMPT**: Python-based server actions on Vercel. Structural impossibility.
- **DO NOT ATTEMPT**: Sub-directory dashboard nesting (causes Vercel trace failures).
- **DO NOT ATTEMPT**: Reading from `/public` during build-time server execution on Vercel (causes `ENOENT`).
- **RESOLVED**: Dependency Leakage - Fixed in Mission 0.1 with Domain Isolation.
- **RESOLVED**: Legacy Artifacts - Fixed in Mission 0.1.1 with `backend/` removal.

## [LIVE_FILE_SYSTEM_MAP]
- data/
  - current_script.json
  - latest_news.json
  - session_cookies.json
- engines/
  - creative/
    - director_audio.py
    - director_visuals.py
  - intelligence/
    - analyst_engine.py
    - scout_forex.py
- shared/
  - config.json
- src/
  - app/
    - favicon.ico (v2.2)
    - globals.css
    - layout.tsx
    - page.tsx
    - login/
      - page.tsx
  - components/
    - InteractiveDials.tsx
    - InteractivePublish.tsx
    - InteractiveWarRoom.tsx
  - engines/
    - distribution/
      - youtube-publisher.ts
  - lib/
    - actions.ts
    - auth.ts
  - middleware.ts
- public/ (Assets)
  - data/
    - FINAL_OUTPUT.mp4
    - visuals_raw.mp4
    - voiceover.mp3
- .env.example
- .gitignore
- ROADMAP.md
- PROJECT_CONTEXT.md
- DESIGN.md
- DECISION_LOG.md
- AGENTS.md
- CLAUDE.md
- client_secret.json
- eslint.config.mjs
- Gemini.md
- next-env.d.ts
- next.config.ts
- package-lock.json
- package.json
- postcss.config.mjs
- PROJECT_CONTEXT.md
- requirements.txt
- ROADMAP.md
- tailwind.config.ts
- token.json
- tsconfig.json

---
*This file is the Source of Truth. Update it at the end of every session.*
