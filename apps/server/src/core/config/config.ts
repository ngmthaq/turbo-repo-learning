export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cacheTtl: parseInt(process.env.CACHE_TTL, 10) || 5000,
});

export type ConfigType = ReturnType<typeof config>;
