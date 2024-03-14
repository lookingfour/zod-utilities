import { z, type RefinementCtx } from "zod";
import type { ZodErrMessage } from "../../types";
import type { default as COUNTRY_MOBILE_CODES } from "../../constants/countryMobileCode";
import type { ValueOf } from "type-fest";
import { wrapToArray, type ArrayOrData } from "@lookingfour/js-utilities";
import { parseZodErrMessage } from "utils";

/**
 * A super refine that will check if the string is a valid mobile number of
 * format `+[country code][10-digit number]` (`+19123456789).
 *
 * @example
 *   import { zSuperRefines } from "@lookingfour/zod-utilities/superRefines";
 *   import {
 *     US,
 *     CN,
 *   } from "@lookingfour/zod-utilities/constants/countryMobileCode";
 *
 *   z.string().superRefine(zSuperRefines.string.mobile([US, CN]));
 *
 * @param acceptedCountryCodes The list of accepted country code
 * @param message The overriding error message
 */
export const mobile =
  (
    acceptedCountryCodes: ArrayOrData<ValueOf<typeof COUNTRY_MOBILE_CODES>>,
    message?: ZodErrMessage
  ) =>
  (arg: string, ctx: RefinementCtx): void => {
    const countryCodeSection = arg.substring(
      1, // removes the leading `+`
      arg.length - 10 // removes the dynamic mobile number part
    );

    if (
      !/^\+\d+$/.test(arg) || // must be all digits and starts with `+`
      !wrapToArray(acceptedCountryCodes).includes(countryCodeSection)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        validation: "regex",
        message: parseZodErrMessage("Invalid mobile number", message),
      });
    }
  };
