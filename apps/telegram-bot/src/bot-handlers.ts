import { type Telegraf } from 'telegraf';
import {
  SomCurrencyConverter,
  instructionsForUse,
  formatConvertedCurrencyResult,
} from '@ttermechikov/som-currency-converter-core';

export const useBotHandlers = (bot: Telegraf) => {
  bot.start((ctx) => ctx.reply(instructionsForUse));

  bot.on('text', async (ctx) => {
    const { text } = ctx.message;
    const ctxReplyOptions = {
      reply_to_message_id: ctx.message.message_id,
    };
    const somCurrencyConverter = new SomCurrencyConverter();
    const converted = await somCurrencyConverter.convert(text);

    if (converted.success) {
      ctx.reply(formatConvertedCurrencyResult(converted), ctxReplyOptions);
    } else {
      ctx.reply(converted.errorMessage, ctxReplyOptions);
    }
  });
};
