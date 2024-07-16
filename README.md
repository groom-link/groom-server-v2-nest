# Nest.js boilerplate

## Supported
- NPM, Node.js (node:21.7.1 or Higher)
- Docker, Docker Compose
- TypeORM (0.3.x or Higher)

## Installation
To run this project, please follow these steps:

1. Install the required npm packages:  

```
npm install
```

2. Build the project:
```
npm run build
```

3. Run the application using Docker Compose:
```
docker-compose up
```

## Directory Structure
```
ROOT
├── db
└── src
    ├── common
    │   ├── decorator
    │   ├── dto
    │   ├── enum
    │   ├── filter
    │   ├── guard
    │   ├── interceptor
    │   ├── interface
    │   └── middleware
    ├── config
    ├── entity
    └── module
        ├── auth
        │   ├── controller
        │   │   └── dto
        │   │       ├── req
        │   │       └── res
        │   ├── decorator
        │   ├── repository
        │   └── service
        │       └── dto
        ├── post
        │   ├── controller
        │   │   └── dto
        │   │       ├── req
        │   │       └── res
        │   ├── decorator
        │   ├── repository
        │   └── service
        │       └── dto
        └── user
            ├── controller
            │   └── dto
            │       ├── req
            │       └── res
            ├── decorator
            ├── repository
            └── service
```
