import dayjs from 'dayjs';

export const config = () => ({
  // NEST_APP_PORT
  port: parseInt(process.env.NEST_APP_PORT, 10) || 3000,

  // NEST_APP_CACHE_TTL
  cacheTtl: parseInt(process.env.NEST_APP_CACHE_TTL, 10) || 5000,

  // NEST_APP_CRYPTO_ALGORITHM
  cryptoAlgorithm: process.env.NEST_APP_CRYPTO_ALGORITHM || 'aes-256-cbc',

  // NEST_APP_CRYPTO_SECRET
  cryptoSecret: process.env.NEST_APP_CRYPTO_SECRET || 'default-secret',

  // NEST_APP_SALT_ROUNDS
  saltRounds: parseInt(process.env.NEST_APP_SALT_ROUNDS, 10) || 10,

  // NEST_APP_DATABASE_URL
  databaseUrl: process.env.NEST_APP_DATABASE_URL || 'file:./dev.db',

  // NEST_APP_JWT_SECRET
  jwtSecret: process.env.NEST_APP_JWT_SECRET || 'your-jwt-secret',

  // NEST_APP_JWT_EXPIRATION
  jwtExpiration: process.env.NEST_APP_JWT_EXPIRATION || '1H',

  // NEST_APP_RT_EXPIRATION_NUMBER
  refreshTokenExpirationNumber:
    parseInt(process.env.NEST_APP_RT_EXPIRATION_NUMBER, 10) || 30,

  // NEST_APP_RT_EXPIRATION_UNIT
  refreshTokenExpirationUnit: process.env.NEST_APP_RT_EXPIRATION_UNIT || 'days',

  // Refresh token expiration date
  refreshTokenExpiration: () => {
    return dayjs()
      .add(
        parseInt(process.env.NEST_APP_RT_EXPIRATION_NUMBER, 10) || 30,
        (process.env.NEST_APP_RT_EXPIRATION_UNIT ||
          'days') as dayjs.ManipulateType,
      )
      .toDate();
  },

  // NEST_APP_AT_EXPIRATION_NUMBER
  activationTokenExpirationNumber:
    parseInt(process.env.NEST_APP_AT_EXPIRATION_NUMBER, 10) || 1,

  // NEST_APP_AT_EXPIRATION_UNIT
  activationTokenExpirationUnit:
    process.env.NEST_APP_AT_EXPIRATION_UNIT || 'days',

  // Activation token expiration date
  activationTokenExpiration: () => {
    return dayjs()
      .add(
        parseInt(process.env.NEST_APP_AT_EXPIRATION_NUMBER, 10) || 1,
        (process.env.NEST_APP_AT_EXPIRATION_UNIT ||
          'days') as dayjs.ManipulateType,
      )
      .toDate();
  },
});
