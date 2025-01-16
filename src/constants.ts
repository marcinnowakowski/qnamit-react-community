const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
export const REST_API_BASE_URL: string = `${API_BASE_URL}/qna-rest/v1/api`;
export const TOKEN_API_BASE_URL: string = `${API_BASE_URL}/api/token`;
