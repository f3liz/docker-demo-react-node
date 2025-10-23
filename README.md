## Sample repo structure

```
react-node-docker-demo/
├── client/                # React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── App.js
├── server/                # Node backend (Express)
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
└── docker-compose.yml
```

## Frontend Example Dockerfile

### What each line in the Dockerfile does:
- `FROM node:18-alpine`: start from a lightweight Node 18 image (small, fast).
- `WORKDIR /app`: this sets `/app` as the working directory inside our container.
- `COPY package*.json ./`: this will copy `package.json` and `package-lock.json` so Docker can install all the dependencies before copying the full source.
- `RUN npm install`: this will install dependencies inside the image.
- `COPY . .`: this copies the rest of the frontend code into the image.
- `EXPOSE 3001`: this line exposes the port that our frontend server will run on.
- `CMD ["npm", "start"]`:  this defines our default command to start our React development server.

## Backend Example Dockerfile

### What each line in the Dockerfile does:
- Each line will do the exact same thing as it did for frontend except it will expose port **3000** where the backend will be listening.
- `alpine` is a lightweight version of Linux called Alpine Linux, we use it because it helps our image download and build faster (also uses less memory and disk space).

## File: `docker-compose.yml`

```yaml
services:
  backend:
    build: ./server
    ports:
      - "3000:3000"
    container_name: backend
    networks:
      - app-network

  frontend:
    build: ./client
    ports:
      - "3001:3001"
    depends_on:
      - backend
    environment:
      - PORT=3001
    container_name: frontend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### docker-compose.yml breakdown:
- `services`: this groups the containers (backend + frontend).
- `build: ./server` / `build: ./client`: this tells Docker Compose where each Dockerfile is.
- `ports`: maps **host:container**  so `localhost:3000` = backend container's `3000`.
- `depends_on`: this ensures that the backend starts up before our frontend.
- `networks`: this creates an internal network so the frontend can call `http://backend:3000` from inside the container.

# Docker Compose Commands
## Build Command
docker-compose up --build

## Run Command after first time building
docker compose up

## Stop Command
ctrl + c

## Command to compose down
docker compose down
