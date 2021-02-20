# DB <-> Repositories <-> Services <-> Routes

- Model
  - Entities data structure (how the entity data will be saved in the App).
- Repository Pattern
  - The repositories keep all methods used to manipulate the Persisted Data, like list, get, creation, edition, delete,
    etc.
- Service Pattern

  - Deal with the business rules. (Validations), removing the responsibility of the routes to deal with the business
    rules, and avoiding to repeat code with you have the same necessity in another route, the Service must have a
    descriptive name, and holding only one method (execute) - DRY

- SoC - Separation of concerns
- DTO - Data Transfer Object
- DRY - Don`t repeat yourself

- SOLID
- SRP - Single Responsibility Principle
- DIP - Dependency Inversion Principle

-> Src
config
database
erros
middlewares
models
repositories
routes
services

Domain -> Which the area of knowledge of that module/file

DDD => Domain Driven Design (methodology)
TDD => Test Driven Development (methodology)

# Automated Testing

1. Unitary Tests

- Test specific features of the application (must be pure functions).
  -- Never do API Calls or sideEffects.
  Route => Controller => Service => Reposioty...

2. Integration Tests

- Test a complete Feature, passing throw many layers of the App.
  -- Like: a SignIn or SignUp feature.

3. E2E Testes (interface Test Front)

- Those tests simulate the user's interaction with the app.
  like:
  - 1 - Click on Email Input.
  - 2 - Fill with email@email.com.
  - 3 - Click on Password Input.
  - 4 - Fill with 123456.
  - 5 - Click on Buttom Login.
  - 6 - Espect the result and navigate to the dashboad.

# TDD (Test Driven Development)
