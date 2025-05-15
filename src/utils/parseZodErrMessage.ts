import type { ZodErrMessage } from "../types.js";

/**
 * Parse the message from the zod error message option value.
 *
 * @param defaultMessage The message to return if no message is parsed
 * @param error The error message option value to parse
 * @returns The error message parsed, or the default message if no message is
 *   parsed
 */
export function parseZodErrMessage(
  defaultMessage: string,
  error?: undefined | ZodErrMessage
) {
  return typeof error === "string" ? error : error?.message ?? defaultMessage;
}
