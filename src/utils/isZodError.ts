import { type ZodType, type output as Output, ZodError } from "zod";

/**
 * Checks if the given value is a ZodError instance.
 *
 * @param error The value to check
 */
export function isZodError<Rules extends ZodType>(
  value: unknown
): value is ZodError<Output<Rules>> {
  return value instanceof ZodError;
}
