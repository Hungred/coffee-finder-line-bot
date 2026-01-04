import { fetchCafes } from '../api/cafes.js';
import { cafeFlexMessage } from '../messages/cafeFlex.js';
import { getCityQuickReplyMessage } from '../messages/cityQuickReply.js';

export const handleTextMessage = async (event, client) => {
  const searchQuery = event.message.text.trim();
  const payload = {
    searchQuery,
  };

  // 使用者叫出城市選單
  if (searchQuery === '城市' || searchQuery === '選城市') {
    const message = await getCityQuickReplyMessage();
    return client.replyMessage(event.replyToken, message);
  }

  // 檢查是否點了下一頁
  if (searchQuery.startsWith('NEXT_PAGE_')) {
    const page = parseInt(searchQuery.split('_')[2], 10);
    const replyMessage = await getCityQuickReplyMessage(page);
    await client.replyMessage(event.replyToken, replyMessage);
    return;
  }

  try {
    console.log(payload);
    const cafes = await fetchCafes(payload);

    if (!cafes.length) {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: `找不到「${searchQuery}」咖啡廳 ☕`,
      });
    }

    return client.replyMessage(
      event.replyToken,
      cafeFlexMessage(searchQuery, cafes)
    );
  } catch (err) {
    console.error(err);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '系統忙碌中，請稍後再試 🙏',
    });
  }
};
