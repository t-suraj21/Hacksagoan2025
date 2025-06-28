// Token management
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Authentication state
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Logout
export const logout = () => {
  clearTokens();
  window.location.href = '/';
};

// Token refresh
export const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('http://localhost:5001/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    logout();
    throw error;
  }
}; 