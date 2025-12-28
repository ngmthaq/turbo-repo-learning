export const config = () => ({
  port: parseInt(process.env.NEST_APP_PORT, 10) || 3000,
  cacheTtl: parseInt(process.env.NEST_APP_CACHE_TTL, 10) || 5000,
  cryptoAlgorithm: process.env.NEST_APP_CRYPTO_ALGORITHM || 'aes-256-cbc',
  cryptoSecret: process.env.NEST_APP_CRYPTO_SECRET || 'default-secret',
  databaseUrl: process.env.NEST_APP_DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.NEST_APP_JWT_SECRET || 'your-jwt-secret',
  jwtExpiration: process.env.NEST_APP_JWT_EXPIRATION || '1H',
  refreshTokenExpirationNumber:
    parseInt(process.env.NEST_APP_RT_EXPIRATION_NUMBER, 10) || 30,
  refreshTokenExpirationUnit: process.env.NEST_APP_RT_EXPIRATION_UNIT || 'days',
});
