import argon2 from "argon2";

const PASSWORD_MIN_LENGTH = 8;

export function validatePasswordStrength(password) {
  if (typeof password !== "string" || password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
    );
  }

  return true;
}

export async function hashPassword(password) {
  validatePasswordStrength(password);

  return argon2.hash(password, {
    type: argon2.argon2id,

    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

export async function verifyPassword(password, passwordHash) {
  if (!password || !passwordHash) {
    return false;
  }

  return argon2.verify(passwordHash, password);
}
