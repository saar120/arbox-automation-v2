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
3. Build the project:
   ```
   npm run build
   ```

## Usage

### Basic API Usage

```typescript
import { ArboxApi } from './src/arboxApi';

// Initialize the API with your credentials
const api = new ArboxApi('your-email@example.com', 'your-password');

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
import { ArboxApi } from './src/arboxApi';
import { Scheduler } from './src/scheduler';

// Initialize the API with your credentials
const api = new ArboxApi('your-email@example.com', 'your-password');

// Create a scheduler with Israel timezone (default)
const scheduler = new Scheduler(api);

// Create a login task
const loginTask = scheduler.createLoginTask();

// Schedule the login task to run at 8:00 AM Israel time every day
const dailyMorningCron = Scheduler.timeToExpression(8, 0);
const loginTaskId = scheduler.scheduleTask(dailyMorningCron, loginTask);

// Create a class signup task (placeholder for future implementation)
const classId = 12345; // Replace with actual class ID
const signupTask = scheduler.createClassSignupTask(classId);

// Schedule the signup task to run at 8:05 AM Israel time every day
const fiveMinutesLaterCron = Scheduler.timeToExpression(8, 5);
const signupTaskId = scheduler.scheduleTask(fiveMinutesLaterCron, signupTask);

// List all scheduled tasks
const tasks = scheduler.listTasks();
console.log('Scheduled tasks:');
tasks.forEach(task => {
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
