export function getWelcomeMessage(name) {
  return [
    {
      type: 'text',
      text: `嗨 ${name}～感謝加入好友！☕\n我可以幫你找全台咖啡廳喔～`,
    },
    {
      type: 'text',
      text: '請輸入城市名稱或咖啡廳名稱查詢，或者點選下方選單開始吧！🎁✨',
    },
  ];
}
