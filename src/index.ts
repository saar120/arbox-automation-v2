import {ArboxAPI} from './arboxAPI';
import {Scheduler} from './scheduler';
import {ArboxTasks} from './arboxTasks';


const testTask = {
    name: 'Test Task',
    action: async () => {
        console.log('Test task executed');
    }
}

const scheduler = new Scheduler();

// every day at 8:18 AM
const cronExpression = Scheduler.timeToExpression(8, 19);

scheduler.scheduleTask(cronExpression, testTask);

// testScheduler();

