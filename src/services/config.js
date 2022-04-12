export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://qms.com/api'
  : 'http://localhost:8000/api';

export const DATETIME_DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm';