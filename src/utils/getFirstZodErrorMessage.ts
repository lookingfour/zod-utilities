import type { ZodError, ZodType, output as Output } from "zod";
import { isArrayNotEmpty } from "@lookingfour/js-utilities";

/**
 * Get the first error message from the given ZodError instance.
 *
 * @param error The error where to get the first error message
 * @returns The first error message found, or undefined if none is found
 */
export function getFirstZodErrorMessage<Rules extends ZodType>(
  error: ZodError<Output<Rules>>
): undefined | string {
  const { fieldErrors, formErrors } = error.flatten();

  if (isArrayNotEmpty(formErrors)) return formErrors[0];

  for (const key in fieldErrors) {
    const fieldErrorList = fieldErrors[key as keyof typeof fieldErrors];

    if (fieldErrorList && isArrayNotEmpty(fieldErrorList)) {
      return fieldErrorList[0];
    }
  }

  return undefined;
}
