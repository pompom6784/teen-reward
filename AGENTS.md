# Teen Reward MVP

## Project Summary
This project is a local Laravel + Docker MVP for a parent/teen reward system.

The first scope is to test a simple flow where:
- parents create chores
- teens complete chores
- parents approve chores
- approved chores award points
- teens redeem points for a reward
- the reward is initially represented as a voucher-style code, with a path toward UniFi integration

## Current Implementation
- Laravel app running locally via Docker/Sail
- MySQL, Redis, and Mailpit included in the Docker stack
- Basic authentication with parent/teen-style users
- Chores, chore completions, rewards, and reward redemptions models
- Simple dashboard for testing the MVP flow
- Seeded sample accounts and data for local testing

## Core Models
- User
  - role: parent or teen
  - points_balance
- Chore
  - title, description, points_value
  - assigned_to, created_by
- ChoreCompletion
  - tracks pending/approved status for chore submissions
- Reward
  - name, points_cost, duration_minutes
- RewardRedemption
  - records redeemed rewards and voucher output

## MVP Workflow
1. A teen submits a chore for approval.
2. A parent approves the chore.
3. The teen receives points.
4. The teen redeems points for a reward.
5. The app creates a voucher-style reward result.

## Intended Next Step
Connect the reward redemption flow to the UniFi controller so that a reward can create a real voucher or temporary access grant for a teen device, especially for devices that cannot redeem a portal voucher directly.

## Local Test Accounts
- Parent: parent@example.com
- Teen: teen@example.com
- Password for both: password

## Local Run
The app is intended to run locally with Laravel Sail:
- ./vendor/bin/sail up -d
- ./vendor/bin/sail artisan serve

## Recent changes / Notes
- Auth scaffold: Laravel Breeze (Blade) installed — provides `login`/`register` routes and views.
- Routing: `/` now returns the `welcome` view; `/dashboard` is a named route protected by `auth`.

## Run / Verify
Start services and serve the app:
```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan serve
```

Useful checks:
```bash
./vendor/bin/sail artisan route:list   # confirm login/register/dashboard routes
./vendor/bin/sail artisan test         # run the test suite
```

## Local Seed
Seed the local database with the example parent/teen accounts (password: `password`):

```bash
# run only the user seeder
./vendor/bin/sail artisan db:seed --class=UserSeeder

# or recreate the database and run all seeders
./vendor/bin/sail artisan migrate:fresh --seed
```

## Notes
This file should be updated as the MVP evolves, especially if the UniFi integration or device-based access control is implemented.
