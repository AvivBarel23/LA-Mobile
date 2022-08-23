import fetch from 'node-fetch';
export async function fetchData(
  url = '',
  data = {},
  method = 'GET',
  headers = {}
) {
  const response = await fetch(`http://localhost:5000${url}`, {
    method: method,
    body: data,
    headers: headers,
  });
  return response.json();
}
