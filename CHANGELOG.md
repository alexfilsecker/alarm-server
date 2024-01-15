# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of changes

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** in case of vulnerabilities.

## [0.4.0] - 2024-01-14

### Added

- migrate and seed scripts to package.json
- dotenv to package.json dependencies
- ability to run seed and migrate outside from docker
- auth utils for password
- AuthError custom errors

### Changed

- migrations fixed to follow standard
- tables now use camelCase instead of snake_case
- login controller now uses camelCase for token payload

## [0.3.0] - 2024-01-14

### Added

- .vscode to .gitignore
- Postres database to docker-compose
- seed and migrate in package.json scripts
- prisma client to package.json dependencies
- bcrypt to package.json dependencies
- prisma schema and migrations to create user table
- seeder complete script
- user seeds

### Changed

- Moved envs to .envs folder
- docker volume set to root instead of src

### Fixed

- start script in package.json set to use ts-node instead of node

## [0.2.0] - 2024-01-13

### Added

- Alarms router created
- Get alarms hardcoded

### Removed

- pene router deleted

## [0.1.0] - 2024-01-13

### Added

- Changelog itself
