import bcrypt, { hash } from "bcryptjs";

export async function hashPassword(password) {
  const saltRounds = 12;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
