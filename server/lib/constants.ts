export const GOOGLE_API_CREDENTIALS =
  process.env.GOOGLE_API_CREDENTIALS || "{}";
export const {
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
} = JSON.parse(GOOGLE_API_CREDENTIALS)?.web || {};
