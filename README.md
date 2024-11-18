# **Gym Planner Project**

## Description:

Gym planner backend project. A Project for Gym Instructors & Coach. <br /> **Medical records**, **Equipments**, **Body Parts**, **Exercises**, **Food & Workout Program**, etc...

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

## Features

Framework: [Nestjs](https://nestjs.com/) </br>
Database: [MariaDB](https://mariadb.org/) </br>
ORM: [Prisma](https://www.prisma.io/) </br>
Git Hook: [Husky](https://typicode.github.io/husky/) </br>

## Author

> [Mostafa Gholami](https://gitlab.com/mst-ghi)
