# PROJECT APEX: CONTEXT ENGINE

## [STRICT_ADHERENCE_REQUIRED]
- Any AI interacting with this project MUST read this file in its entirety before generating code.
- **ENVIRONMENTAL CONSTRAINT**: Production is Vercel (Node.js/Next.js). **NO PYTHON** execution is allowed in the production backend. All distribution logic must be Native TypeScript/Node.js.
- **[PROJECT_SPECIFIC_DESIGN_CONSTRAINTS]**: Minimalist Editorial, 80s Dream-pop glow. 
  - Primary Colors: Sage Green (#4C6545) and Bone (#FAF9F5).
  - Background: Obsidian (#0B0C10) or Dark Slate.
  - **CONSISTENCY MANDATE**: These design constraints (palette, 14px baseline) are specific to the Apex Macro Automation project only. They are NOT a global AI behavioral protocol. However, for THIS project, they are to be maintained with 100% consistency unless an explicit "Style Pivot" is ordered by the CEO.
- **LEGIBILITY**: Minimum body font size 14px. Minimum label size 12px. Headers: 18px - 24px.

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
- **Pathing Resolution**: 
  - Metadata: Statically scoped `path.join(process.cwd(), 'data', filename)`.
  - Shared Config: Statically scoped `path.join(process.cwd(), 'shared', filename)`.
  - Assets: Statically scoped `path.join(process.cwd(), 'public', 'data', filename)`.

## [CURRENT_MISSION_STATE]
- **Mission 0.1.1**: Final Housekeeping.
- **Status**: Completed. Eliminated legacy `backend/` artifacts. Re-aligned `src/lib/actions.ts` with correct modular paths. Verified absolute isolation of Intelligence and Creative domains.

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
- media/
  - images
  - texts
  - videos
- public/
  - data/
    - FINAL_OUTPUT.mp4
    - visuals_raw.mp4
    - voiceover.mp3
- shared/
  - config.json
- src/
  - app/
    - favicon.ico
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
- .env.example
- .gitignore
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
