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
- **Backend**: `/backend` (Local scripts only).
- **Distribution**: Unified TypeScript Engine (Native Node.js via googleapis).
- **Data Pathing**: Consolidated to project root. Files like `ROADMAP.md` and `config.json` are read directly from `process.cwd()`.

## [CURRENT_MISSION_STATE]
- **Mission 7.2**: Transitioning YouTube Publisher from Python to Native TypeScript.
- **Status**: Python 'Command Not Found' error identified on Vercel. Unified Engine rewrite (Native TypeScript) has been deployed and the Python publisher decommissioned.
- **Mission 9.1**: Strategic Security. Secrets are suppressed via hardened root `.gitignore`.

## [WALL_OF_FAILURES]
- **DO NOT ATTEMPT**: Python-based server actions on Vercel. Structural impossibility.
- **DO NOT ATTEMPT**: Sub-directory dashboard nesting (causes Vercel trace and build-path failures).
- **DO NOT ATTEMPT**: Direct file-system writes in production Vercel environments (use ephemeral mirrors or external state if needed).
- **IDENTIFIED FAILURE**: Metadata/Token parsing issues in Mission 7.2 transition (Resolved in Mission 7.3).

---
*This file is the Source of Truth. Update it at the end of every session.*
