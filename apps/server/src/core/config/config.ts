export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cacheTtl: parseInt(process.env.CACHE_TTL, 10) || 5000,
  cryptoAlgorithm: process.env.CRYPTO_ALGORITHM || 'aes-256-cbc',
  cryptoSecret: process.env.CRYPTO_SECRET || 'default-secret',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1H',
});
