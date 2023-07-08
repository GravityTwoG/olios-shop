export * from 'nestjs/config';

declare module 'nestjs/config' {
  class ConfigService<Config extends Record<unknown, unknown>> {
    public get<ConfigKey extends keyof Config>(
      property: ConfigKey,
    ): Config[ConfigKey];
  }
}
