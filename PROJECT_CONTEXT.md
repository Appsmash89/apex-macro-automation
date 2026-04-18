# PROJECT APEX: CONTEXT ENGINE

## [STRICT_ADHERENCE_REQUIRED]
- Any AI interacting with this project MUST read this file in its entirety before generating code.
- **ENVIRONMENTAL CONSTRAINT**: Production is Vercel (Node.js/Next.js). **NO PYTHON** execution is allowed in the production backend. All distribution logic must be Native TypeScript/Node.js.
- **UI/UX STANDARD**: Minimalist Editorial, 80s Dream-pop glow. 
  - Primary Colors: Sage Green (#4C6545) and Bone (#FAF9F5).
  - Background: Obsidian (#0B0C10) or Dark Slate.
- **LEGIBILITY**: Minimum body font size 14px. Minimum label size 12px. Headers: 18px - 24px.

## [ARCHITECTURAL_TRUTH]
- **Framework**: Next.js 16.2.4 (Security Hardened).
- **React**: 19.0.0.
- **Structure**: Flat Architecture (Root-level src/app).
- **Asset Directive**: All assets for distribution MUST reside in `/public/data`. 
- **Backend Restriction**: Python is strictly forbidden in the production environment.
- **Distribution**: Unified TypeScript Engine (Native Node.js via googleapis).
- **Data Pathing**: Consolidated to `public/data/`. Files are read using `path.join(process.cwd(), 'public', 'data', filename)`.

## [CURRENT_MISSION_STATE]
- **Mission 7.3.2**: Path Realignment & Manifest Automation.
- **Status**: Asset core moved to `/public/data`. All cross-language scripts (TS/Python) synchronized. Automated manifest protocol active.

## [WALL_OF_FAILURES]
- **DO NOT ATTEMPT**: Python-based server actions on Vercel. Structural impossibility.
- **DO NOT ATTEMPT**: Sub-directory dashboard nesting (causes Vercel trace and build-path failures).
- **DO NOT ATTEMPT**: Direct file-system writes in production Vercel environments.
- **IDENTIFIED FAILURE**: Metadata/Token parsing issues in Mission 7.2 transition (Resolved in Mission 7.3).

## [LIVE_FILE_SYSTEM_MAP]
- backend/
  - analyst_engine.py
  - director_audio.py
  - director_visuals.py
  - scout_forex.py
- public/
  - data/
    - current_script.json
    - FINAL_OUTPUT.mp4
    - latest_news.json
    - session_cookies.json
    - visuals_raw.mp4
    - voiceover.mp3
- src/
  - app/
    - globals.css
    - layout.tsx
    - page.tsx
    - login/
      - page.tsx
  - lib/
    - actions.ts
    - auth.ts
    - youtube-publisher.ts
- .env.example
- AGENTS.md
- CLAUDE.md
- client_secret.json
- config.json
- eslint.config.mjs
- Gemini.md
- next.config.ts
- package.json
- PROJECT_CONTEXT.md
- requirements.txt
- ROADMAP.md
- tailwind.config.ts
- token.json
- tsconfig.json

---
*This file is the Source of Truth. Update it at the end of every session.*
