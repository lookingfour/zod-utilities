import type { PartialRecord } from "@lookingfour/js-utilities";
import type { ZodError } from "zod";

/**
 * Get the list of first error for each key from the given Zod error.
 *
 * @param error The zod error where will get the list
 */
export function getZodErrorMessageList<
  ObjectStructure extends Record<string, unknown>,
>(
  error: ZodError<ObjectStructure>
): PartialRecord<keyof ObjectStructure, string> {
  const { fieldErrors } = error.flatten();

  const errorList: PartialRecord<keyof ObjectStructure, string> = {};

  for (const fieldKey in fieldErrors) {
    const firstMessage = fieldErrors[fieldKey as keyof typeof fieldErrors]?.[0];
    if (typeof firstMessage !== "undefined") {
      errorList[fieldKey as keyof ObjectStructure] = firstMessage;
    }
  }

  return errorList;
}
