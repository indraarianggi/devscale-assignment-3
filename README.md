# To Do List App

Devscale MERN Course Assignment #3:
- MVC Pattern
- Authentication & Authorization
- Token Rotation

Bonus:
- Docker & Docker Compose

## How to run?

1. Clone this repository

    ```bash
    git clone git@github.com:indraarianggi/devscale-assignment-3.git
    cd devscale-assignment-3
    ```

2. Install dependencies

    ```bash
    pnpm insall
    ```

3. Congfigure environment variables
    Create `.env` file on root directory and copy the contents from `.env.example` into it.

    ```javasscript
    PORT=
    MONGO_URI=
    JWT_SECRET=<you can use command "openssl rand -base64 32" to generate this secret>
    JWT_REFRESH_SECRET==<you can use command "openssl rand -base64 64" to generate this secret>
    JWT_ACCESS_EXPIRES_TIME=<short time>
    JWT_REFRESH_EXPIRES_TIME=<longest than expired time for access token>
    ```

4. Run the app

    ```bash
    pnpm dev
    ```

## How to run with Docker?

1. Start docker
2. Run this command
    ```bash
    docker-compose up
    ```