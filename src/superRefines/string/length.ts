import { z, type RefinementCtx } from "zod";
import type { ZodErrMessage } from "../../types";
import { parseZodErrMessage } from "../../utils";

/**
 * A super refine that will check if the string is of exact length. This will
 * count most of multibyte characters like emoji as one character instead of 2,
 * some complex emoji like 👨‍👩‍👧‍👧 (7 for this) to be counted as more than
 * one. This uses Array.from internally.
 *
 * @example
 *   import { zSuperRefines } from "@lookingfour/zod-utilities/superRefines";
 *   z.string().superRefine(zSuperRefines.string.length(6));
 *
 * @param length The length value
 * @param message The overriding error message
 */
export const length =
  (length: number, message?: ZodErrMessage) =>
  (arg: string, ctx: RefinementCtx): void => {
    const argLength = Array.from(arg).length;

    if (argLength < length) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        inclusive: true,
        minimum: length,
        type: "string",
        message: parseZodErrMessage(
          `String must contain ${length} character(s)`,
          message
        ),
      });
    } else if (argLength > length) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        inclusive: true,
        maximum: length,
        type: "string",
        message: parseZodErrMessage(
          `String must contain ${length} character(s)`,
          message
        ),
      });
    }
  };
