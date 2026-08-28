import { AuthenticationRequiredError } from "@/lib/tenancy/tenant-errors";

/**
 * Phase 3.03 authentication boundary.
 *
 * Actual authentication/session implementation belongs to the
 * authentication phase.
 *
 * For now this helper validates a user ID that has ALREADY been
 * resolved by trusted server-side authentication code.
 *
 * Never pass request.body.userId, query.userId, formData.userId,
 * or another raw browser-controlled identity value here.
 */
export function requireAuthenticatedUser(authenticatedUserId) {
  if (
    typeof authenticatedUserId !== "string" ||
    authenticatedUserId.trim() === ""
  ) {
    throw new AuthenticationRequiredError();
  }

  return authenticatedUserId;
}
