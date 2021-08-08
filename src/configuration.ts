export type DatabaseConfig = {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
};

export type EnvironmentVariables = {
  port: number;
  database: DatabaseConfig;
  redisUri: string;
  sessionSecret: string;
};

export const configuration = (): EnvironmentVariables => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD.toString(),
  },
  sessionSecret: process.env.SESSION_SECRET,
  redisUri: process.env.REDIS_URI,
});
