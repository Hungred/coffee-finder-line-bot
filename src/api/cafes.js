const isDev = process.env.NODE_ENV !== 'production';

const API_BASE = isDev
  ? 'http://localhost:3000/api/cafes'
  : process.env.API_BASE_URL;

export async function fetchCafes({ searchQuery }) {
  const url = new URL(API_BASE);

  if (searchQuery) {
    url.searchParams.set('searchQuery', searchQuery);
  }

  console.log('實際打 API URL:', url.toString());

  const res = await fetch(url.toString());
  const jsonData = await res.json();
  const cafes = jsonData.data.cafes;
  return cafes;
}
