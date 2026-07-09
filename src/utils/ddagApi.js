// src/utils/ddagApi.js

const API_URL = import.meta.env.PUBLIC_GATEWAY_URL || "https://api.emsacode.com";
const CLIENT_ID = import.meta.env.API_CLIENT_ID || "app-brim";
const CLIENT_SECRET = import.meta.env.API_CLIENT_SECRET || "demo-secret-brim-001";

// Cache token di memori server AstroJS untuk menghindari request token berulang
let cachedToken = null;
let tokenExpiryTime = 0;

/**
 * Mendapatkan Access Token OAuth2 secara aman
 */
async function getAccessToken() {
  const currentTime = Math.floor(Date.now() / 1000);
  
  // Gunakan token dari cache jika belum kedaluwarsa (menyisakan margin 60 detik)
  if (cachedToken && currentTime < (tokenExpiryTime - 60)) {
    return cachedToken;
  }

  try {
    const response = await fetch(`${API_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
    });

    if (!response.ok) {
      throw new Error(`Gagal mendapatkan token: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    
    // Hitung waktu kedaluwarsa token (biasanya 3600 detik / 1 jam)
    const expiresIn = data.expires_in || 3600;
    tokenExpiryTime = currentTime + expiresIn;

    return cachedToken;
  } catch (error) {
    console.error("Error OAuth2 Fetch Token:", error);
    throw error;
  }
}

/**
 * Melakukan pemanggilan endpoint API dengan autentikasi Bearer Token
 */
async function fetchFromGateway(endpoint, params = {}, options = {}) {
  try {
    const token = await getAccessToken();
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? '?' + query : ''}`;

    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        ...(options.headers || {})
      },
      body: options.body
    });

    if (!response.ok) {
      throw new Error(`API Gateway error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Gagal memanggil API (${endpoint}):`, error);
    return { success: false, data: [] };
  }
}

// Ekspor fungsi siap pakai
export const ddagApi = {
  getBooks: (limit = 10, page = 1) => fetchFromGateway("/api/v1/library/opac", { limit, page }),
  getTheses: (limit = 10, page = 1) => fetchFromGateway("/api/v1/library/repository", { limit, page }),
  getJournals: (limit = 10, page = 1) => fetchFromGateway("/api/v1/library/journals", { limit, page }),
  getStats: () => fetchFromGateway("/api/v1/library/stats"),
  getAnalytics: () => fetchFromGateway("/api/v1/analytics/visitors"),
  logDownloadEvent: () => fetchFromGateway("/api/v1/library/stats/download-event", {}, { method: "POST" })
};
