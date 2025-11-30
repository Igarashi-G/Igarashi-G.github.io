

### outline 部署 

**轻松部署：** [outline-docker-compose](https://github.com/vicalloy/outline-docker-compose?tab=readme-ov-file)

```yaml
services:
  outline:
    image: docker.getoutline.com/outlinewiki/outline:0.82.0
    env_file: ./docker.env
    expose:
      - "3000"
    volumes:
      - storage-data:/var/lib/outline/data
    depends_on:
      - postgres
      - redis

  redis:
    image: redis
    env_file: ./docker.env
    expose:
      - "6379"
    volumes:
      - ./redis.conf:/redis.conf
    command: ["redis-server", "/redis.conf"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 30s
      retries: 3

  postgres:
    image: postgres:16
    env_file: ./docker.env
    expose:
      - "5432"
    volumes:
      - database-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-d", "outline", "-U", "user"]
      interval: 30s
      timeout: 20s
      retries: 3
    environment:
      POSTGRES_USER: 'user'
      POSTGRES_PASSWORD: 'pass'
      POSTGRES_DB: 'outline'

  https-portal:
    image: steveltn/https-portal
    env_file: ./docker.env
    ports:
      - '80:80'
      - '443:443'
    links:
      - outline
    restart: always
    volumes:
      - https-portal-data:/var/lib/https-portal
    healthcheck:
      test: ["CMD", "service", "nginx", "status"]
      interval: 30s
      timeout: 20s
      retries: 3
    environment:
      DOMAINS: 'docs.mycompany.com -> http://outline:3000'
      STAGE: 'production'
      WEBSOCKET: 'true'
      CLIENT_MAX_BODY_SIZE: '0'

volumes:
  https-portal-data:
  storage-data:
  database-data:
```





```
version: '3.8'
services:
  outline:
    image: outlinewiki/outline:0.84.0
    ports: ["3001:3000"]
    env_file: .env
    environment:
      - URL=http://你的服务器 IP:3001
      - DATABASE_URL=postgres://postgres:postgres@db/outline
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=production
      - FORCE_HTTPS=false
      - PGSSLMODE=disable
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: outline
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]

volumes:
  pgdata:

```

