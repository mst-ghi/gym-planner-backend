export default () => ({
  // App configuration
  mode: process.env.NODE_ENV,

  // Apps configuration
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    lang: process.env.APP_LANG || 'en',
  },

  // Sha256 configuration
  sha256: { secret: process.env.SHA256_SECRET },

  // Jwt tokens ttl configuration
  token: {
    ttl: {
      default: 24,
      user: parseInt(process.env.USER_TOKEN_EXPIRES_HOUR, 10) || 120,
    },
    refreshTtl: {
      default: 576,
      user: parseInt(process.env.USER_REFRESH_TOKEN_EXPIRES_HOUR, 10) || 120,
    },
  },

  // Mail configuration
  mail: {
    host: process.env.MAIL_HOST || 'mail.milanguagex.com',
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  // Google configuration
  google: {
    callBackUrl: process.env.GOOGLE_CALLBACK_URL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
  },

  storage: {
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
    bucketName: process.env.STORAGE_BUCKET_NAME,
    endPoint: process.env.STORAGE_END_POINT,
  },
});
