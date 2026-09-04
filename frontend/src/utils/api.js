const API_BASE_URL = 'https://safedarshan-m0du.onrender.com';

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: 'Unable to connect to SafeDarshan backend server.' }
    };
  }
}
