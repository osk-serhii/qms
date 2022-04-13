export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://localhost/api'
  : 'http://localhost:8000/api';

export const DATETIME_DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm';