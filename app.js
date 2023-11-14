const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/telegramBot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
});

const User = mongoose.model('User', userSchema);

const token = '6631269530:AAEP084xOypzZlYiwD3sG7lkdwpscq4SgbE'; // Reemplaza con tu token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  User.findOne({ userId }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (!user) {
      const newUser = new User({ userId });
      newUser.save((saveErr) => {
        if (saveErr) {
          console.error(saveErr);
        } else {
          bot.sendMessage(chatId, '¡Bienvenido! Comienza a jugar.');
        }
      });
    } else {
      bot.sendMessage(chatId, '¡Bienvenido de nuevo!');
    }
  });
});

bot.onText(/\/profile/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  User.findOne({ userId }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
      const message = `Nivel: ${user.level}\nPuntos: ${user.points}`;
      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(chatId, 'Primero debes iniciar el juego con /start.');
    }
  });
});

bot.onText(/\/share/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  User.findOneAndUpdate({ userId }, { $inc: { points: 10 } }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
      bot.sendMessage(chatId, '¡Gracias por compartir el bot! Has ganado 10 puntos.');
    } else {
      bot.sendMessage(chatId, 'Primero debes iniciar el juego con /start.');
    }
  });
});

bot.onText(/\/levelup/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  User.findOneAndUpdate({ userId }, { $inc: { level: 1 } }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
      bot.sendMessage(chatId, '¡Felicidades! Has subido de nivel.');
    } else {
      bot.sendMessage(chatId, 'Primero debes iniciar el juego con /start.');
    }
  });
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;

  const infoMessage = 'Bienvenido al juego de Telegram. Puedes utilizar los siguientes comandos:\n' +
    '/start - Inicia el juego\n' +
    '/profile - Muestra tu perfil\n' +
    '/share - Gana puntos compartiendo el bot\n' +
    '/levelup - Sube de nivel\n' +
    '/info - Muestra esta información';

  bot.sendMessage(chatId, infoMessage);
});
