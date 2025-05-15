# Arbox Automation

A TypeScript project for automating interactions with the Arbox API, including scheduling login and class signup processes.

## Features

- **ArboxApi**: A class for interacting with the Arbox API, including authentication, profile retrieval, and schedule information.
- **Scheduler**: A class for scheduling tasks to run at specific times, with support for Israel timezone.

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory based on the `.env.example` template:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file with your Arbox credentials and desired configuration:
   ```
   # Arbox API credentials
   ARBOX_EMAIL=your-email@example.com
   ARBOX_PASSWORD=your-password
   ARBOX_WHITELABEL=Arbox

   # Scheduling configuration
   ARBOX_CRON=0 8 * * 0-3,6
   ARBOX_CLASS_TIME=08:00
   ARBOX_DAYS_FROM_NOW=1
   ```
5. Test your environment variable setup:
   ```
   npm run test-env
   ```
6. Build the project:
   ```
   npm run build
   ```

## Usage

### Basic API Usage

```typescript
import { ArboxAPI } from './src/arboxAPI';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the API with credentials from environment variables
const api = new ArboxAPI(
  process.env.ARBOX_EMAIL || '',
  process.env.ARBOX_PASSWORD || '',
  process.env.ARBOX_WHITELABEL || ''
);

// Login to get authentication token
const userProfile = await api.login();
console.log(`Logged in as ${userProfile.full_name}`);

// Get schedule information
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const scheduleData = await api.getScheduleBetweenDates(
    today.toISOString(),
    nextWeek.toISOString(),
    locationId,
    boxId
);

console.log(`Found ${scheduleData.data.length} classes`);
```

### Using the Scheduler

The Scheduler class allows you to schedule tasks to run at specific times, such as logging in or signing up for classes.

```typescript
import { ArboxAPI } from './src/arboxAPI';
import { Scheduler } from './src/scheduler';
import { ArboxTasks } from './src/arboxTasks';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the API with credentials from environment variables
const api = new ArboxAPI(
  process.env.ARBOX_EMAIL || '',
  process.env.ARBOX_PASSWORD || '',
  process.env.ARBOX_WHITELABEL || ''
);

// Create tasks handler
const tasks = new ArboxTasks(api);

// Create a scheduler with Israel timezone (default)
const scheduler = new Scheduler();

// Create a login task
const loginTask = tasks.createLoginTask();

// Schedule the login task to run at 8:00 AM Israel time every day
const dailyMorningCron = process.env.ARBOX_CRON || '0 8 * * *';
const loginTaskId = scheduler.scheduleTask(dailyMorningCron, loginTask);

// Create a class signup task
const classTime = process.env.ARBOX_CLASS_TIME || '08:00';
const daysFromNow = parseInt(process.env.ARBOX_DAYS_FROM_NOW || '1', 10);
const signupTask = tasks.createClassSignupTask(classTime, daysFromNow);

// Schedule the signup task to run at a different time
const fiveMinutesLaterCron = '5 8 * * *';
const signupTaskId = scheduler.scheduleTask(fiveMinutesLaterCron, signupTask);

// List all scheduled tasks
const scheduledTasks = scheduler.listTasks();
console.log('Scheduled tasks:');
scheduledTasks.forEach(task => {
    console.log(`- ${task.id}: ${task.name}`);
});

// Keep the process running to allow scheduled tasks to execute
// In a real application, you would use a process manager like PM2
console.log('Scheduler is running. Press Ctrl+C to exit.');
```

## Cron Expressions

The scheduler uses cron expressions to define when tasks should run. Here are some examples:

- `0 8 * * *`: Run at 8:00 AM every day
- `0 8 * * 1-5`: Run at 8:00 AM Monday through Friday
- `0 8 * * 0,6`: Run at 8:00 AM on weekends (Sunday and Saturday)
- `0,30 8-10 * * *`: Run at the start and middle of every hour from 8 AM to 10 AM

You can use the `Scheduler.timeToExpression()` helper method to create cron expressions for specific times:

```typescript
// 8:00 AM every day
const dailyMorningCron = Scheduler.timeToExpression(8, 0);

// 8:00 AM on weekdays only (Monday=1, Friday=5)
const weekdayMorningCron = Scheduler.timeToExpression(8, 0, [1, 2, 3, 4, 5]);
```

## Future Enhancements

- Implement the class signup functionality in the ArboxApi class
- Add support for recurring tasks with different frequencies
- Add persistence for scheduled tasks
- Create a web interface for managing scheduled tasks

## License

This project is private and not licensed for public use.
