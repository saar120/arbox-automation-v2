import * as cron from 'node-cron';

/**
 * Task type for the scheduler
 */
export type ScheduledTask = {
    name: string;
    action: () => Promise<void>;
};

/**
 * Scheduler class for scheduling tasks to run at specific times
 */

export class Scheduler {
    private tasks: Map<string, { cronJob: cron.ScheduledTask; task: ScheduledTask }>;
    private readonly timezone: string;

    /**
     * Creates an instance of Scheduler
     * @param timezone - Timezone for scheduling (default: 'Asia/Jerusalem' for Israel time)
     */
    constructor(timezone: string = 'Asia/Jerusalem') {
        this.tasks = new Map();
        this.timezone = timezone;
    }

    /**
     * Schedules a task to run at a specific time
     * @param cronExpression - Cron expression for scheduling (e.g., '0 8 * * *' for 8 AM daily)
     * @param task - Task to run
     * @returns Task ID for reference
     */
    public scheduleTask(cronExpression: string, task: ScheduledTask): string {
        // Validate cron expression
        if (!cron.validate(cronExpression)) {
            throw new Error(`Invalid cron expression: ${cronExpression}`);
        }

        const taskId = `${task.name}_${Date.now()}`;

        // Schedule the task with node-cron
        const cronJob = cron.schedule(cronExpression, async () => {
            console.log(`[${new Date().toISOString()}] Running scheduled task: ${task.name}`);
            try {
                await task.action();
                console.log(`[${new Date().toISOString()}] Task completed: ${task.name}`);
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Task failed: ${task.name}`, error);
            }
        }, {
            scheduled: true,
            timezone: this.timezone
        });

        // Store the task for future reference
        this.tasks.set(taskId, {cronJob, task});

        console.log(`Scheduled task "${task.name}" with ID ${taskId} using cron expression: ${cronExpression}`);
        return taskId;
    }

    /**
     * Cancels a scheduled task
     * @param taskId - ID of the task to cancel
     * @returns True if the task was cancelled, false if it wasn't found
     */
    public cancelTask(taskId: string): boolean {
        const taskEntry = this.tasks.get(taskId);
        if (!taskEntry) {
            return false;
        }

        taskEntry.cronJob.stop();
        this.tasks.delete(taskId);
        console.log(`Cancelled task: ${taskEntry.task.name} (ID: ${taskId})`);
        return true;
    }

    /**
     * Lists all scheduled tasks
     * @returns Array of task IDs and names
     */
    public listTasks(): Array<{ id: string; name: string }> {
        return Array.from(this.tasks.entries()).map(([id, {task}]) => ({
            id,
            name: task.name
        }));
    }


    /**
     * Helper method to convert a specific time to a cron expression
     * @param hour - Hour (0-23)
     * @param minute - Minute (0-59)
     * @param daysOfWeek - Days of week (0-6, Sunday to Saturday, default: all days)
     * @returns Cron expression
     */
    public static timeToExpression(
        hour: number,
        minute: number,
        daysOfWeek: number[] = [0, 1, 2, 3, 4, 5, 6]
    ): string {
        if (hour < 0 || hour > 23) {
            throw new Error('Hour must be between 0 and 23');
        }
        if (minute < 0 || minute > 59) {
            throw new Error('Minute must be between 0 and 59');
        }

        const daysString = daysOfWeek.length === 7
            ? '*'
            : daysOfWeek.map(d => d % 7).sort().join(',');

        return `${minute} ${hour} * * ${daysString}`;
    }
}
