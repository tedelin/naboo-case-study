# Code Review 📋

## Good Practices

- **Backend (NestJS):**

  - Clear separation of concerns with controllers, services, modules, resolvers, and DTOs.
  - Microservice architecture is respected and well-structured.

- **Frontend:**

  - Small, reusable components improve readability and maintainability.
  - Consistent project organization.

- **Testing:**
  - Presence of tests for both frontend and backend.

---

## Areas for Improvement

### Project Setup & Infrastructure

- Missing **instructions to launch the database**
- **Frontend and backend not dockerized** → consider a single `docker-compose.yml` to spin up the entire stack (frontend, backend, DB) easily.

### Dependencies & Maintenance

- Several **npm package vulnerabilities** need fixing.
- **NestJS and Next.js versions are outdated** → upgrading would improve performance, security, and compatibility with newer tooling.

### Documentation

- Lack of clear documentation and code comments.
- Add to `README.md`:
  - Setup instructions (install, run, test).
  - Environment variables and config details.

### Testing

- Add more test for activity module

### Errors

- Add error catching : For example on the homepage if the backend server is not available.
