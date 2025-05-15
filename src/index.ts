import {ArboxAPI} from './arboxAPI';
import {Scheduler} from './scheduler';
import {ArboxTasks} from './arboxTasks';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const hyper = "HYPR-training";
const arbox = "Arbox";


interface IConfig {
    email: string;
    password: string;
    whitelabel: string;
    classTime: string;
    cron: string;
    daysFromNow: number;
}


const config: IConfig = {
    email: process.env.ARBOX_EMAIL || "",
    password: process.env.ARBOX_PASSWORD || "",
    whitelabel: process.env.ARBOX_WHITELABEL || "",
    cron: process.env.ARBOX_CRON || "0 8 * * 0-3,6",
    classTime: process.env.ARBOX_CLASS_TIME || "08:00",
    daysFromNow: parseInt(process.env.ARBOX_DAYS_FROM_NOW || "1", 10),
}

const api = new ArboxAPI(config.email, config.password, config.whitelabel);
const tasks = new ArboxTasks(api);

const signTask = tasks.createClassSignupTask(config.classTime, config.daysFromNow);
const scheduler = new Scheduler();


scheduler.scheduleTask(config.cron, signTask);
