import crypto from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

const SECRET_API_KEY = process.env.SECRET_API_KEY;
const algorithm = "aes-256-cbc";
const initVector = "1234567891234567";

export function cipherPassword(password) {
  console.log("apiKEY", SECRET_API_KEY);
  const cipher = crypto.createCipheriv(algorithm, SECRET_API_KEY, initVector);
  let encryptedPassword = cipher.update(password, "utf-8", "hex");

  console.log("Encrypted password: " + encryptedPassword);
  return (encryptedPassword += cipher.final("hex"));
}

export function decipherPassword(password) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SECRET_API_KEY,
    initVector
  );

  let decryptedData = decipher.update(password, "hex", "utf-8");

  //   console.log("Decrypted message: " + decryptedData);
  return (decryptedData += decipher.final("utf8"));
}
