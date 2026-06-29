# Changelog

All notable changes to the **Label Insight Pro** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-06-29

### Added
*   Added `CONTRIBUTING.md` setting up contribution standards and guidelines.
*   Added `LICENSE` file containing the MIT License.
*   Added `.gitattributes` to handle cross-platform line ending configurations.
*   Added `ProductAnalysisRequest` request Pydantic schema in Python backend to handle POST JSON payloads.

### Changed
*   Reorganized component structure by moving custom components out of `src/components/ui/` into `src/components/product/` and `src/components/common/`.
*   Renamed React components from kebab-case (e.g. `barcode-scanner.tsx`) to standard PascalCase (e.g. `BarcodeScanner.tsx`).
*   Upgraded `README.md` to a premium state with system architecture diagrams, badges, environment variable tables, and screenshot links.
*   Updated `eslint.config.js` to warning levels for `@typescript-eslint/no-unused-vars` (changing it from `off` to `warn`).
*   Updated `.gitignore` to include more comprehensive ignore files for Deno, Python, lock files, and Supabase local caches.
*   Updated `package.json` to rename the project to `"label-insight-pro"`, add MIT license, add description, and remove redundant `fastapi` NPM package.
*   Replaced all `print` statements in the FastAPI backend with structured python `logging`.
*   Refactored the dynamic profile TODO in `Scanner.tsx` to query Supabase dynamically using `profileService.getProfile`.
*   Removed hardcoded evaluation fallback key from Supabase `analyze-nutrition-label` edge function, referencing only environment variables.

### Removed
*   Deleted `Y/` folder containing default Firebase hosting setup pages.
*   Deleted unused `src/services/api.ts` file.
*   Deleted unused `backend/alert_engine.py` and `backend/alert_types.py` files.
