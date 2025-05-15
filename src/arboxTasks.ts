import {ArboxAPI} from './arboxAPI';
import {ScheduledTask} from './scheduler';
import {addHours, format, startOfHour} from 'date-fns';

/**
 * Creates Arbox-specific tasks that can be scheduled
 */
export class ArboxTasks {
    private api: ArboxAPI;

    /**
     * Creates an instance of ArboxTasks
     * @param api - ArboxApi instance for API interactions
     */
    constructor(api: ArboxAPI) {
        this.api = api;
    }

    /**
     * Creates a login task that can be scheduled
     * @returns A task that performs login
     */
    public createLoginTask(): ScheduledTask {
        return {
            name: 'Login',
            action: async () => {
                if (!this.api.isLoggedIn()) {
                    console.log('Logging in...');
                    const userProfile = await this.api.login();
                    console.log(`Logged in as ${userProfile.full_name}`);
                } else {
                    console.log('Already logged in');
                }
            }
        };
    }

    /**
     * Creates a placeholder for a future class signup task
     * @param  classTime - The time of the class to sign up for
     * @returns A task that will sign up for a class (placeholder)
     */
    public createClassSignupTask(classTime: string, daysFromNow: number): ScheduledTask {
        return {
            name: `Sign up for class ${classTime}`,
            action: async () => {
                // Ensure we're logged in first
                if (!this.api.isLoggedIn()) {
                    console.log('Logging in before signing up for class...');
                    await this.api.login();
                }

                const userProfile = await this.api.getProfile();

                const now = new Date();
                const to = addHours(now, 25 * daysFromNow);


                const {data} = await this.api.getScheduleBetweenDates(
                    now.toISOString(),
                    to.toISOString(),
                    userProfile.users_boxes[0].locations_box.id,
                    userProfile.users_boxes[0].box.id,
                )

                // find class tommorow class by date and time "08:00" "2025-01-01"
                const classToSign = data.find((c) => {
                    const dateStr = format(to, 'yyyy-MM-dd');
                    return c.time === classTime && c.date === dateStr;
                })

                if (!classToSign) {
                    console.log(`No class found for ${classTime}`);
                    return;
                }


                // log relevant class details
                console.log(`Sign in to ${classTime}`);
                console.log(`free spots ${classToSign.free}`);
                console.log(`booked users ${classToSign.booked_users?.length}`);
                console.log(`status ${classToSign.status}`);
            }
        };
    }
}
