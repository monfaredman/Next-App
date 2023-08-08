import { hash } from "bcryptjs";

export async function hashPassword(password) {
  const saltRounds = 12;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await computeFromManifest(password, hashedPassword);
  return isValid;
}
