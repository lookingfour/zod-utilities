import { z, type RefinementCtx } from "zod";
import type { ZodErrMessage } from "../../types.js";
import { parseZodErrMessage } from "../../utils/index.js";

/**
 * A super refine that will check if the string does not exceed the given min
 * length. This will count most of multibyte characters like emoji as one
 * character instead of 2, some complex emoji like 👨‍👩‍👧‍👧 (7 for this) to
 * be counted as more than one. This uses Array.from internally.
 *
 * @example
 *   import { zSuperRefines } from "@lookingfour/zod-utilities/superRefines";
 *   z.string().superRefine(zSuperRefines.string.min(6));
 *
 * @param maxLength The min length to use
 * @param message The overriding error message
 */
export const min =
  (minLength: number, message?: ZodErrMessage) =>
  (arg: string, ctx: RefinementCtx): void => {
    if (Array.from(arg).length < minLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        inclusive: true,
        minimum: minLength,
        type: "string",
        message: parseZodErrMessage(
          `String must contain at least ${minLength} character(s)`,
          message
        ),
      });
    }
  };
