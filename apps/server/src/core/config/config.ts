export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
});

export type ConfigType = ReturnType<typeof config>;
