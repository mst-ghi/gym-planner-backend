# **Gym Planner Project**

Gym planner backend project

## How to Run:

```bash
# Install dependencies
> pnpm install

# update env configuration. redis, database and etc.
> cp .env.example .env

# Database migration & seeding
> npx prisma migrate dev
> pnpm prisma:seed

# Development running
> pnpm dev

# Production running
> pnpm build && pnpm start
```

## Author

> [Mostafa Gholami](https://gitlab.com/mst-ghi)
