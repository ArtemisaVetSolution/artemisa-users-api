# Artemisa Users API

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [API Documentation](#api-documentation)
- [Contributions](#contributions)
- [License](#license)

## Description
Artemisa Users API is an API built with [NestJS](https://nestjs.com/), designed to manage users efficiently and securely. It uses modern technologies such as TypeORM for database management, JWT for authentication, and Winston for logging.

## Features
- Authentication and authorization with JWT
- User management
- Robust data validation
- Integration with PostgreSQL databases
- Automatic API documentation with Swagger
- Advanced logging with file rotation
- Support for unit and integration tests

## Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (if using the default database)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ArtemisaVetSolution/artemisa-users-api.git
    cd artemisa-users-api
    ```

2. **Install the dependencies**:

    Using npm:
    ```bash
    npm install
    ```

    Or using Yarn:
    ```bash
    yarn install
    ```

## Configuration .env file in the project root

```env
# .env
DB_PASSWORD=123Dani 
DB_NAME=artemisa-users-db
DB_HOST=localhost
DB_USERNAME=postgres
DB_PORT=5436
USERS_SERVICE_PORT=3001
JWT_SECRET=yourSecrethere
EXECUTE_SEEDERS=false
USER_MAIL=email@correo.com
USER_MAIL_PASSWORD=asferg
```
## Available Scripts

The project includes several scripts to facilitate development and deployment:

| Command                | Description                                                       |
|------------------------|-------------------------------------------------------------------|
| `npm run start:dev`     | Starts the application in development mode with `nodemon`.        |
| `npm run build`         | Compiles the project using Nest CLI.                              |
| `npm run format`        | Formats the source code with Prettier.                            |
| `npm run start`         | Starts the application in production mode.                        |
| `npm run start:nest-watch` | Starts the application with Nest in watch mode.                |
| `npm run start:debug`   | Starts the application in debug mode with watch.                  |
| `npm run start:prod`    | Starts the compiled application in the `dist/` folder.            |
| `npm run lint`          | Lints the source code with ESLint and applies automatic fixes.    |
| `npm run test`          | Runs unit tests with Jest.                                        |
| `npm run test:watch`    | Runs tests in watch mode.                                         |
| `npm run test:cov`      | Runs tests and generates a coverage report.                       |
| `npm run test:debug`    | Runs tests in debug mode.                                         |
| `npm run test:e2e`      | Runs end-to-end/integration tests.                                |

## Running the Application

### Development Mode

To start the application in development mode, which automatically reloads on code changes:

```bash
npm run start:nest-watch`

yarn start:nest-watch`

```

## 1- Compile the project:

```bash
npm run build
```

## 2- Start the compiled application:
```bash
npm run start:prod
```

## Dependencies

| Package                        | Description                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `@nestjs/axios`                 | NestJS module for making HTTP requests using Axios.              |
| `@nestjs/common`                | Common NestJS components like decorators, pipes, and exceptions. |
| `@nestjs/config`                | Environment variables and configuration management.              |
| `@nestjs/core`                  | Core of NestJS providing the main framework functionality.       |
| `@nestjs/jwt`                   | Module for handling JWT-based authentication.                   |
| `@nestjs/mapped-types`          | Utilities for mapping types in NestJS, useful for DTOs.          |
| `@nestjs/microservices`         | Support for microservices in NestJS.                            |
| `@nestjs/passport`              | Integration of Passport.js with NestJS for authentication.       |
| `@nestjs/platform-express`      | Adapter for Express.js in NestJS.                               |
| `@nestjs/swagger`               | Generates API documentation using Swagger.                      |
| `@nestjs/typeorm`               | Integration of TypeORM with NestJS for database management.      |
| `bcryptjs`                      | Library for password hashing.                                   |
| `class-transformer`             | Transforms plain objects into class instances.                  |
| `class-validator`               | Data validation based on decorators for classes.                |
| `joi`                           | Validation schemas for JavaScript objects.                      |
| `nodemailer`                    | Sending emails from Node.js.                                    |
| `passport`                      | Authentication middleware for Node.js.                          |
| `passport-jwt`                  | JWT strategy for Passport.js.                                   |
| `pg`                            | PostgreSQL client for Node.js.                                  |
| `reflect-metadata`              | Metadata support in TypeScript, necessary for decorators.        |
| `rxjs`                          | Library for reactive programming.                               |
| `typeorm`                       | ORM for TypeScript and JavaScript.                              |
| `typeorm-extension`             | Extensions for TypeORM.                                         |
| `winston`                       | Logging library for Node.js.                                    |
| `winston-daily-rotate-file`     | Winston transport for daily log rotation.                       |


## Development Dependencies

| Package                               | Description                                                    |
|---------------------------------------|----------------------------------------------------------------|
| `@nestjs/cli`                         | Command-line tool for NestJS.                                  |
| `@nestjs/schematics`                  | Schematics for generating NestJS components.                   |
| `@nestjs/testing`                     | Testing utilities for NestJS.                                  |
| `@types/bcryptjs`                     | TypeScript types for `bcryptjs`.                               |
| `@types/express`                      | TypeScript types for Express.js.                               |
| `@types/jest`                         | TypeScript types for Jest.                                     |
| `@types/node`                         | TypeScript types for Node.js.                                  |
| `@types/supertest`                    | TypeScript types for SuperTest.                                |
| `@typescript-eslint/eslint-plugin`    | ESLint plugin for TypeScript.                                  |
| `@typescript-eslint/parser`           | ESLint parser for TypeScript.                                  |
| `eslint`                              | Linter for identifying and reporting patterns in code.         |
| `eslint-config-prettier`              | Disables ESLint rules that might conflict with Prettier.       |
| `eslint-plugin-prettier`              | Integrates Prettier with ESLint.                               |
| `jest`                                | Testing framework for JavaScript.                              |
| `nodemon`                             | Tool that automatically restarts the application on changes.   |
| `prettier`                            | Code formatter.                                                |
| `source-map-support`                  | Improves Node.js error messages with source map support.       |
| `supertest`                           | Library for integration testing of APIs.                       |
| `ts-jest`                             | Jest preprocessor for TypeScript.                              |
| `ts-loader`                           | TypeScript loader for Webpack.                                 |
| `ts-node`                             | Runs TypeScript files directly in Node.js.                     |
| `tsconfig-paths`                      | Support for paths in `tsconfig.json`.                          |
| `typescript`                          | Superset of JavaScript that adds static types.                 |

## Testing

To run the tests:
```bash
npm run test
```

To run the tests in watch mode:
```bash
npm run test:watch
```
To run the tests and generate a coverage report:
```bash
npm run test:cov
```
To run the end-to-end tests:
```bash
npm run test:e2e
```


## Linting and Formatting

To lint the code and apply automatic fixes:
```bash
npm run lint
```
To format the code:
```bash
npm run format
```

## The API documentation is automatically generated using Swagger. To access the documentation, start the application and navigate to [/api-docs](http://localhost:3001/api/v1/docs#/) in your browser.