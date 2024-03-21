export type ZodErrMessage<
  Others extends Record<string, unknown> = Record<never, never>,
> = string | ({ message?: undefined | string } & Others);
