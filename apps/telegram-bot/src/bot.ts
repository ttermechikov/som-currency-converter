import { Telegraf } from 'telegraf';
import './config';
import { useBotHandlers } from './bot-handlers';

const token = process.env.BOT_TOKEN as string;
const bot: Telegraf = new Telegraf(token);

useBotHandlers(bot);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
