import { z, type RefinementCtx } from "zod";
import type { ZodErrMessage } from "../../types.js";
import { parseZodErrMessage } from "../../utils/index.js";

/**
 * A super refine that will check if the string does not exceed the given max
 * length. This will count most of multibyte characters like emoji as one
 * character instead of 2, some complex emoji like 👨‍👩‍👧‍👧 (7 for this) to
 * be counted as more than one. This uses Array.from internally.
 *
 * @example
 *   import { zSuperRefines } from "@lookingfour/zod-utilities/superRefines";
 *   z.string().superRefine(zSuperRefines.string.max(6));
 *
 * @param max The max length to use
 * @param message The overriding error message
 */
export const max =
  (maxLength: number, message?: ZodErrMessage) =>
  (arg: string, ctx: RefinementCtx): void => {
    if (Array.from(arg).length > maxLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        inclusive: true,
        maximum: maxLength,
        type: "string",
        message: parseZodErrMessage(
          `String must contain at most ${maxLength} character(s)`,
          message
        ),
      });
    }
  };
