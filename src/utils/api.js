const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function getAllUsers() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.users;
  }

  async function getAllThreads() {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.threads;
  }
  async function getDetailThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.detailThread;
  }

  async function createThread({ title, body, category = 'General' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.thread;
  }

  async function createThreadComment({ content, threadId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.thread;
  }

  async function getLeaderboard() {
    const response = await _fetchWithAuth(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.leaderboards;
  }

  return {
    getAllUsers,
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllThreads,
    createThread,
    getDetailThread,
    getLeaderboard,
    createThreadComment
  };
})();

export default api;
