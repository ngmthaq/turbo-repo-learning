export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cacheTtl: parseInt(process.env.CACHE_TTL, 10) || 5000,
  crytoAlgorithm: process.env.CRYPTO_ALGORITHM || 'aes-256-cbc',
  cryptoSecret: process.env.CRYPTO_SECRET || 'default-secret',
});
