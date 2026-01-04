import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import dotenv from 'dotenv';
import { handleTextMessage } from './src/handlers/messageHandler.js';
import { getWelcomeMessage } from './src/messages/welcomeMessage.js';
dotenv.config();

const app = express();

const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
};
// console.log('secret:', process.env.LINE_CHANNEL_SECRET);
// console.log('token:', process.env.LINE_CHANNEL_ACCESS_TOKEN);

const client = new Client(config);

app.post('/webhook', middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  //   return client.replyMessage(event.replyToken, {
  //     type: 'text',
  //     text: `你剛剛說了：${event.message.text}`,
  //   });

  if (event.type === 'message') {
    // 一般訊息
    return handleTextMessage(event, client);
  } else if (event.type === 'follow') {
    // 加入好友歡迎訊息
    const userId = event.source.userId;
    const profile = await client.getProfile(userId);
    const messages = getWelcomeMessage(profile.displayName);
    return client.replyMessage(event.replyToken, messages);
  }
}

app.listen(3001, () => {
  console.log('LINE Bot running on http://localhost:3001');
});
