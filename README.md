# Apartments App

A full-stack apartment listing application built with Next.js frontend, NestJS backend, and PostgreSQL database.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start with Docker

### Prerequisites

Make sure you have Docker & docker-compose installed on your system:

### Running the Application

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/nour-aldin/Apartments-App.git
   cd Apartments-App
   ```

2. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - **Frontend**: http://localhost:3001
   - **Backend API Documentation**: http://localhost:3000/api

### Stop all services:
```bash
docker-compose down
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

## 🔧 Environment Variables

The Docker setup uses the following default environment variables:

- **Database**: `postgresql://postgres:postgres@db:5432/apartments_app`
- **Backend Port**: `3000`
- **Frontend Port**: `3001`

## 🧹 Cleanup

To remove all containers, networks, and volumes:
```bash
docker-compose down -v --remove-orphans
```

To remove all Docker images created by this project:
```bash
docker-compose down --rmi all
```