# Apartments App

A full-stack apartment listing application built with Next.js frontend, NestJS backend, and PostgreSQL database.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start with Docker

### Prerequisites

Make sure you have Docker installed on your system:

#### Ubuntu/Linux:
```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin
sudo systemctl start docker
sudo usermod -aG docker $USER
```

#### macOS:
Download and install [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)

#### Windows:
Download and install [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)

### Running the Application

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Apartments-App
   ```

2. **Build and start all services**:
   ```bash
   docker compose up --build
   ```

3. **Access the application**:
   - **Frontend**: http://localhost:3001
   - **Backend API**: http://localhost:3000
   - **Database**: localhost:5432 (if you need direct access)

### 🎯 What happens when you run `docker compose up --build`:

1. **Database Setup**: PostgreSQL container starts with initial database
2. **Backend Build**: NestJS application builds with Prisma client generation
3. **Database Migration**: Prisma migrations run automatically
4. **Backend Start**: API server starts on port 3000
5. **Frontend Build**: Next.js application builds in production mode
6. **Frontend Start**: Web application starts on port 3001

## 🛠️ Development Commands

### Stop all services:
```bash
docker compose down
```

### View logs:
```bash
docker compose logs
```

### Rebuild specific service:
```bash
docker compose build server    # Rebuild backend
docker compose build client    # Rebuild frontend
```

### Run in background (detached mode):
```bash
docker compose up -d
```

### Database Operations

#### Seed the database:
```bash
docker compose exec server npm run db:seed
```

#### Access database directly:
```bash
docker compose exec db psql -U postgres -d apartments_app
```

## 📁 Project Structure

```
Apartments-App/
├── client/                 # Next.js frontend
│   ├── Dockerfile
│   └── ...
├── server/                 # NestJS backend
│   ├── Dockerfile
│   ├── prisma/
│   └── ...
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## 🔧 Environment Variables

The Docker setup uses the following default environment variables:

- **Database**: `postgresql://postgres:postgres@db:5432/apartments_app`
- **Backend Port**: `3000`
- **Frontend Port**: `3001`

## 🚨 Troubleshooting

### Port conflicts:
If ports 3000 or 3001 are already in use, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "8000:3000"  # Change 8000 to any available port
```

### Permission errors:
Make sure your user is in the docker group:
```bash
sudo usermod -aG docker $USER
```
Then log out and back in.

### Database connection issues:
The backend waits for the database to be healthy before starting. If issues persist, check logs:
```bash
docker compose logs db
docker compose logs server
```

## 🧹 Cleanup

To remove all containers, networks, and volumes:
```bash
docker compose down -v --remove-orphans
```

To remove all Docker images created by this project:
```bash
docker compose down --rmi all
```