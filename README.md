# NestJS + CommanderJs Monorepo Project

A demo application for managing documents

## 🚀 Prerequisites

- Docker
- Node.js >20.x
- yarn (version compatible with Node 20+)
- Make

## ⚙️ Environment Setup

1. Clone the repository
2. Copy environment files:

   ```bash
   cp app-a/.env.example app-a/.env
   ```

3. Update the environment variables in `.env` file as needed

## 🛠️ Getting Started

### Initial Setup

```bash
make setup       # Install dependencies and build Docker images
make start       # Start all services in Docker containers
```

### Development Modes

Run the following commands in two different terminals to start the env in the containers:

```bash
make start-app-a-dev
make app-b-connect
```

- API available at `http://localhost:3000`

### App B usage

Once you ran the `make app-b-connect` you will be inside the container terminal, here run the following commands:

```bash
cd app-b
yarn start # this will display all possible commands to run
yarn start <command>
```

Here is the list of all available commands:

#### Commands

- `yarn start delete <id>`: Elimina un documento in App A
- `yarn start update [options] <id>`: Aggiorna un documento in App A
- `yarn start save <content> <owner>`: Salva un documento in App A
- `yarn start login <username> <password>`: Esegui il login in App A
- `yarn start get <id>`: Ottieni documento da App A e salvalo localmente
- `yarn start get-list`: Ottieni la lista dei documenti da App A e salvali localmente
- `yarn start get-local-list`: Ottieni la lista dei documenti salvati localmente
- `yarn start help [command]`: Display help for command

> [!warning]
> save, update and delete commands are protected, first launch the login commands with valid information, one of the available users in dev enviornment is: alice, password123

## 📚 API Documentation

Swagger UI is automatically available at:  
`http://localhost:3000/api`

> [!warning]
> The docs page could render blank, if that's the case copy the json from `http://localhost:3000/api-json` and paste it in `https://editor.swagger.io/` to view the documentation

This interactive documentation provides:

- All available API endpoints
- Request/response schemas
- Direct testing capabilities for endpoints

## 🧪 Testing

### Unit Tests

```bash
yarn backend:test
```

### E2E Tests

```bash
yarn backend:test:e2e    # Run end-to-end tests
```

## 🛠️ Bruno Support

This application supports Bruno, a powerful API development and testing tool. You can use Bruno to interact with the API endpoints, test requests and responses, and manage your API collections.

## 📄 License

[MIT](https://opensource.org/license/mit) - See the LICENSE file for details
