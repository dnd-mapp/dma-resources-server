# Contributing to D&D Mapp - Resources server

Thank you for your interest in contributing to the D&D Mapp - Resources server! We welcome contributions from everyone, whether it's fixing a bug, adding a new feature, improving documentation, or anything else that makes the project better.

This document outlines the guidelines for contributing to this project. Please read it carefully before submitting your contributions.

## Table of Contents

-  [Code of Conduct](#code-of-conduct)
-  [How Can I Contribute?](#how-can-i-contribute)
   -  [Reporting Bugs](#reporting-bugs)
   -  [Suggesting Enhancements](#suggesting-enhancements)
   -  [Your First Code Contribution](#your-first-code-contribution)
   -  [Pull Requests](#pull-requests)
-  [Development Setup](#development-setup)
-  [Coding Guidelines](#coding-guidelines)
   -  [Angular Style Guide](#angular-style-guide)
   -  [Linting and Formatting](#linting-and-formatting)
   -  [Commit Messages](#commit-messages)
   -  [Branching Strategy](#branching-strategy)
-  [Submitting a Pull Request](#submitting-a-pull-request)
-  [License](#license)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to: **[mail.dndmapp@gmail.com](mailto:mail.dndmapp@gmail.com)**.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please check the [issue tracker](https://github.com/dnd-mapp/dma-resources-server/issues) to see if it has already been reported. If not, open a new issue and provide as much detail as possible:

*  **A clear and concise description of the bug.**
*  **Steps to reproduce the behavior:**
   1.  Go to '...'
   2.  Click on '....'
   3.  Scroll down to '....'
   4.  See error
*  **Expected behavior.**
*  **Screenshots/videos** if applicable.
*  **Your environment:**
   *  Angular CLI version
   *  Node.js version
   *  npm version
   *  Operating System
   *  Browser and version

### Suggesting Enhancements

We love new ideas! If you have a suggestion for an enhancement or a new feature, please open an issue in the [issue tracker](https://github.com/dnd-mapp/dma-resources-server/issues). Describe your idea clearly and explain why it would be beneficial to the project.

### Your First Code Contribution

If you're looking for an easy way to get started, look for issues labeled `good first issue` in our [issue tracker](https://github.com/dnd-mapp/dma-resources-server/issues). These issues are specifically designed for new contributors.

### Pull Requests

We welcome pull requests! If you plan to contribute code, please follow these steps:

1.  **Fork** the repository and create your branch from `main`.
2.  **Ensure your changes are well-tested.**
3.  **Adhere to the coding guidelines** (see [Coding Guidelines](#coding-guidelines)).
4.  **Open a pull request** with a clear description of your changes.

## Development Setup

For instructions on how to set up your local development environment we recommend to have a look at the [Getting Started](README.md#getting-started) section in the README in the root of the repository.

## Coding Guidelines

### Angular Style Guide

Please follow the official [Angular Style Guide](https://angular.io/guide/styleguide) as closely as possible. This ensures consistency and readability across the codebase.

### Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting.

*  **Upon Pull Request:** Your code will automatically be linted and formatted as part of the PR checks. All checks must pass for your PR to be mergeable into `main`.
*  **Locally:** It's recommended to run these tools locally before committing:
   ```bash
   # Lint all files
   npm run lint

   # Format all files
   npm run format:check

   # Or fix formatting issues where possible
   npm run format:write
   ```
   *  It's also possible to configure your code editor to run these tools automatically on saving your files.
      *  ESLint:
          *  For Webstorm:
             1.  After installing the dependencies, open the settings of your editor and navigate to: `Language & Frameworks > JavaScript > Code Quality Tools > ESLint`.
             2.  Make sure that `Automatic ESLint configuration` and `Run eslint --fix on save` are selected.
             3.  The pattern used for `Run for files:` should look as followed: `**/*.{js,ts,cjs,cts,mjs,mts,html}`
      * Prettier:
        *  For Webstorm:
           1. After installing the dependencies, open the settings of your editor and navigate to: `Language & Frameworks > JavaScript > Prettier`.
           2. Make sure that `Automatic Prettier configuration`, `Run on save`, and `Prefer Prettier configuration to IDE code style` are selected.
           3. The pattern used for `Run for files:` should look as followed: `**/*`. Because of the `.prettierignore` file, only the intended files are formatted.

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This helps us generate release notes and understand the nature of changes.

**Examples:**

*  `feat: Add user authentication module`
*  `fix: Resolve styling issue on mobile devices`
*  `docs: Update README with installation instructions`
*  `refactor: Improve performance of data fetching`
*  `test: Add unit tests for login component`
*  `build: Update Angular CLI to v16`

### Branching Strategy

Please base your work on the `main` branch. For new features or bug fixes, create a new branch with a descriptive name:

```bash
git checkout main
git pull origin main # Ensure your main is up-to-date
git checkout -b feature/your-feature-name # For new features
# or
git checkout -b fix/your-bug-fix-name # For bug fixes
```

Direct pushes to the `main` branch are not allowed. All changes must go through a pull request.

## Submitting a Pull Request

When you are ready to submit your changes, open a Pull Request (PR) on GitHub. Please ensure your PR includes:

*  **A clear and concise title** following the Conventional Commits specification (e.g., `feat: Implement user profile page`).
*  **A detailed description** of your changes, including:
   *  What problem does this PR solve?
   *  How was it solved?
   *  Any relevant screenshots or GIFs.
   *  Referencing any related issues (e.g., `Fixes #123`, `Closes #456`).
*  **Self-review checklist** (optional, but highly recommended):
   *  [ ] My code follows the project's coding guidelines.
   *  [ ] I have performed a self-review of my own code.
   *  [ ] I have commented my code, particularly in hard-to-understand areas.
   *  [ ] I have made corresponding changes to the documentation.
   *  [ ] My changes generate no new warnings.
   *  [ ] I have added tests that prove my fix is effective or that my feature works.
   *  [ ] New and existing unit tests pass locally with my changes.
   *  [ ] New and existing end-to-end (Playwright) tests pass locally with my changes.
   *  [ ] Any dependent changes have been merged and published in downstream modules.

## License

By contributing to the D&D Mapp - Resources server, you agree that your contributions will be licensed under its [AGPL-3.0 License](LICENSE).

---

Thank you for contributing!
