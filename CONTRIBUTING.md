# Contributing to Label Insight Pro

Thank you for your interest in contributing to **Label Insight Pro**! We welcome community contributions to help improve our food label understanding platform.

Please follow these guidelines to make sure the process is smooth and consistent for everyone.

---

## 🚀 Getting Started

1. **Fork the Repository:** Create a personal copy of the project on GitHub.
2. **Clone the Fork:** Get the code locally on your development machine.
   ```bash
   git clone https://github.com/your-username/label-insight-pro.git
   cd label-insight-pro
   ```
3. **Set Up Environments:** Follow the steps in the [README.md](README.md) to set up the frontend and backend servers.

---

## 🌿 Branching Strategy

Always create a new branch for your work instead of committing directly to `main`.
*   **Feature Branches:** `feature/your-feature-name`
*   **Bug Fixes:** `bugfix/issue-description`
*   **Refactoring & Audits:** `chore/audit-description` or `refactor/cleanups`

```bash
git checkout -b feature/awesome-new-scanner
```

---

## 💻 Coding Standards

### Frontend (React & TypeScript)
*   **Naming Conventions:**
    *   React component files must use **PascalCase** (e.g. `BarcodeScanner.tsx`).
    *   Hooks and utility files must use **camelCase** (e.g. `useAuth.ts`, `storage.ts`).
    *   Generic Shadcn UI atoms should be placed in `src/components/ui/` in kebab-case/lowercase.
*   **Linting & Formatting:** 
    *   Make sure there are no unused imports or variables (warnings are active).
    *   Run `npm run lint` before committing to scan for formatting errors.

### Backend (FastAPI & Python)
*   **Coding Conventions:** Follow standard [PEP 8](https://peps.python.org/pep-0008/) style guidelines.
*   **Pydantic Models:** Always define clear schemas for incoming requests and outgoing API responses.
*   **Logging:** Avoid using standard `print()` statements in route logic. Initialize the Python `logging` module and use `logger.info()`, `logger.warning()`, or `logger.error()`.

---

## 📥 Submitting a Pull Request (PR)

1. **Keep Commits Clean:** Write descriptive commit messages.
2. **Verify Compilation:** Ensure the client and backend compile successfully.
   ```bash
   npm run build
   ```
3. **Push to Your Fork:** Push changes to your branch on GitHub.
4. **Open a PR:** Open a Pull Request targeting the `main` branch of the origin repository. Include a clear title and description summarizing:
   *   What was added or fixed.
   *   How it was verified.
   *   Any open design questions or dependencies.
