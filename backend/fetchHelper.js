import fetch from 'node-fetch';

export const fetchData = async (url, data, method, headers = {}) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  return await response.json();
};
