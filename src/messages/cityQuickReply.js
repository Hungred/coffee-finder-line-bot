import { CITIES } from '../tools/const.js';

const PAGE_SIZE = 10; // 每頁城市數量
const isDev = process.env.NODE_ENV !== 'production';

const API_BASE = isDev
  ? 'http://localhost:3000/api/cafes'
  : process.env.API_BASE_URL;

export async function getCityQuickReplyMessage(page = 1) {
  const url = `${API_BASE}/options/city`;
  console.log('打 options API:', url);

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`options API 錯誤 ${res.status}: ${text}`);
  }

  const jsonData = await res.json();
  const cities = jsonData.data.cities;
  // 計算分頁
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const cityPage = cities.slice(start, end);

  const items = cityPage
    .filter((city) => CITIES[city.id])
    .map((city) => ({
      type: 'action',
      action: {
        type: 'message',
        label: `${CITIES[city.id]} ${city.count}間`.slice(0, 20),
        text: CITIES[city.id],
      },
    }));

  if (page > 1) {
    items.unshift({
      type: 'action',
      action: {
        type: 'message',
        label: '⬅️ 上一頁',
        text: `PAGE_${page - 1}`,
      },
    });
  }
  if (end < cities.length) {
    items.push({
      type: 'action',
      action: {
        type: 'message',
        label: '下一頁 ➡️',
        text: `PAGE_${page + 1}`,
      },
    });
  }

  return {
    type: 'text',
    text: '請選擇城市 ☕',
    quickReply: { items },
  };
}
