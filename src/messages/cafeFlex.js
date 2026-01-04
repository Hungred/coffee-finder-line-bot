export const cafeFlexMessage = (searchQuery, cafes) => ({
  type: 'flex',
  altText: `${searchQuery} 咖啡廳推薦`,
  contents: {
    type: 'carousel',
    contents: cafes.slice(0, 5).map((cafe) => ({
      type: 'bubble',
      hero: {
        type: 'image',
        url:
          cafe.image ||
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&sig=$%7Bitem.id%7D',
        size: 'full',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: cafe.name,
            weight: 'bold',
            size: 'lg',
            wrap: true,
          },
          {
            type: 'text',
            text: cafe.address || '無地址資訊',
            size: 'sm',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'link',
            action: {
              type: 'uri',
              label: '在地圖查看',
              uri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                cafe.address
              )}`,
            },
          },
        ],
      },
    })),
  },
});
