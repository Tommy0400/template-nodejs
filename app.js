const TelegramBot = require('node-telegram-bot-api');
const token = 'TU_TOKEN_DE_BOT'; // Reemplaza con tu token

// Crea un nuevo bot
const bot = new TelegramBot(token, { polling: true });

// Maneja los eventos de nuevos "star" (me gusta)
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Responde con "te amo" cuando se inicia el bot
  bot.sendMessage(chatId, 'Te amo ❤️');
});

// Maneja cualquier mensaje
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Responde con "te amo" si el mensaje contiene "star" (o cualquier otra palabra)
  if (msg.text && msg.text.toLowerCase().includes('star')) {
    bot.sendMessage(chatId, 'Te amo ❤️');
  }
});
