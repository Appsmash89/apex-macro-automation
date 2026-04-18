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
- **React**: 19.0.0.
- **Structure**: Flat Architecture (Root-level src/app).
- **Data Blueprint**: 
  - **Internal Data**: JSON metadata (scripts, config) resides in root `/data` for build-time bundling and trace compliance.
  - **Public Assets**: Media files (MP4, MP3) reside in `/public/data` for runtime serving and external accessibility.
- **Backend Restriction**: Python is strictly forbidden in the production environment.
- **Distribution**: Unified TypeScript Engine (Native Node.js via googleapis).
- **Idempotency**: Stateful Broadcast Locking. Distribution is gated by `broadcast_status` in `current_script.json`. Once set to `published`, the Unified Engine rejects further attempts.
- **Pathing Resolution**: 
  - Metadata: Statically scoped `path.join(process.cwd(), 'data', filename)`.
  - Assets: Statically scoped `path.join(process.cwd(), 'public', 'data', filename)`.

## [CURRENT_MISSION_STATE]
- **Mission 8.1**: Broadcast Idempotency & State Locking.
- **Status**: Implemented metadata gatekeeper in Unified Engine. Successfully synchronized state between generation (Python) and distribution (TypeScript). UI button is now state-aware and prevents double-publishing.
- **Mission [UI Sync]**: Clarified project-specific design boundaries.

## [WALL_OF_FAILURES]
- **DO NOT ATTEMPT**: Python-based server actions on Vercel. Structural impossibility.
- **DO NOT ATTEMPT**: Sub-directory dashboard nesting (causes Vercel trace failures).
- **DO NOT ATTEMPT**: Reading from `/public` during build-time server execution on Vercel (causes `ENOENT`).
- **RESOLVED**: Double-Publish Risk - Fixed in Mission 8.1 with stateful idempotency.
- **RESOLVED**: OAuth2 'Identity Crisis' (Missing client_id/client_secret in constructor) - Fixed in Mission 7.8.
- **RESOLVED**: 'Ghost Folder' issue where mission-critical JSON was untracked (Fixed in Mission 7.6.1).
- **RESOLVED**: `.gitignore` conflict blocking build-time JSON access (Fixed in Mission 7.5).

## [LIVE_FILE_SYSTEM_MAP]
- backend/
  - analyst_engine.py
  - director_audio.py
  - director_visuals.py
  - scout_forex.py
- data/
  - current_script.json
  - latest_news.json
  - session_cookies.json
- media/
  - images
  - texts
  - videos
- public/
  - data/
    - FINAL_OUTPUT.mp4
    - visuals_raw.mp4
    - voiceover.mp3
  - file.svg
  - globe.svg
  - next.svg
  - vercel.svg
  - window.svg
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
  - lib/
    - actions.ts
    - auth.ts
    - youtube-publisher.ts
  - middleware.ts
- .env.example
- .gitignore
- AGENTS.md
- CLAUDE.md
- client_secret.json
- config.json
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
