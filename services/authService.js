import crypto from "crypto";

// Generate a random token using a passcode
export function generateToken(passcode) {
  if (!passcode) {
    throw new Error("Passcode is required to generate a token.");
  }

  // Generate a random string (unique identifier)
  const randomString = crypto.randomBytes(16).toString("hex");

  // Combine the passcode and random string, then hash
  const token = crypto
    .createHash("sha256")
    .update(passcode + randomString)
    .digest("hex");

  return { token, randomString };
}

// Verify the token
export function verifyToken(token, passcode, randomString) {
  if (!token || !passcode || !randomString) {
    throw new Error(
      "Token, passcode, and randomString are required for verification."
    );
  }

  // Recreate the token using the passcode and randomString
  const expectedToken = crypto
    .createHash("sha256")
    .update(passcode + randomString)
    .digest("hex");

  // Compare the provided token with the expected token
  return token === expectedToken;
}
