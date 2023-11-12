const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const TelegramBot = require('node-telegram-bot-api');

// Configura el token de tu bot de Telegram
const telegramToken = '6631269530:AAEP084xOypzZlYiwD3sG7lkdwpscq4SgbE';
const bot = new TelegramBot(telegramToken, { polling: true });

// Maneja el comando de inicio (/start)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Te amo. Soy tu bot de Telegram. ¡Bienvenido!');
});

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log(`Bot de Telegram escuchando comandos "/start"`);
});

// Manejador de errores para el servidor
app.on('error', (err) => {
    console.error('Error en el servidor:', err.message);
});

// Manejador de errores para el bot de Telegram
bot.on('polling_error', (error) => {
    console.error('Error en el bot de Telegram:', error.message);
});
