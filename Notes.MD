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
