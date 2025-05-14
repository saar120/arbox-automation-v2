import { ArboxAPI } from './arboxAPI';
import { ScheduledTask } from './scheduler';

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
     * @param classId - ID of the class to sign up for
     * @returns A task that will sign up for a class (placeholder)
     */
    public createClassSignupTask(classId: number): ScheduledTask {
        return {
            name: `Sign up for class ${classId}`,
            action: async () => {
                // Ensure we're logged in first
                if (!this.api.isLoggedIn()) {
                    console.log('Logging in before signing up for class...');
                    await this.api.login();
                }

                // This is a placeholder for the actual signup implementation
                console.log(`[PLACEHOLDER] Signing up for class ${classId}`);
                // In the future, this would call an API method like:
                // await this.api.signUpForClass(classId);
            }
        };
    }
}
