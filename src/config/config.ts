require("dotenv").config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  CORS_ORIGINS: JSON.parse(process.env.CORS_ORIGINS!) || [],
  DATABASE: {
    MONGO_URL: process.env.MONGO_SERVER_URL,
    DATABASE_NAME: process.env.MONGO_DB_NAME,
  },
  SESSION: {
    name: process.env.SESSION_NAME,
    secret: String(process.env.SESSION_SECRET),
    resave: JSON.parse(process.env.SESSION_OPTION_RESAVE!),
    saveUninitialized: JSON.parse(process.env.SESSION_OPTION_SAVE_UNINITIALIZED!),
    rolling: JSON.parse(process.env.SESSION_OPTION_ROLLING!),
    cookie: {
      maxAge: Number(process.env.SESSION_COOKIE_AGE), // in milliseconds
      httpOnly: JSON.parse(process.env.SESSION_COOKIE_HTTP_ONLY!),
      secure: JSON.parse(process.env.SESSION_COOKIE_SECURE!),
      sameSite:  process.env.SAME_SITE 
    }
  }
};