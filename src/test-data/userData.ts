// src/test-data/userData.ts
export const user = {
  user: {
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
    url: process.env.BASE_URL || ''
  }
};