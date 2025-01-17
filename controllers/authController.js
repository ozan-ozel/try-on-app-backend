import { generateToken } from "../services/authService.js";
import redisClient, { isPassCodeValid } from "../services/redisService.js";

export const authenticate = async (req, res, next) => {
  try {
    const { passCode } = req.body;

    // Check if the passcode exists in Redis set
    const passCodeExists = await isPassCodeValid(passCode);
    if (!passCodeExists) {
      throw { status: 400, message: "Passcode does not exist." };
    }

    // Check if the passcode has already been used
    const passCodeCount = await redisClient.get(passCode);

    if (passCodeCount > 3) {
      throw {
        status: 400,
        message: "Passcode can not be used more than 4 times.",
      };
    }

    // Generate a random token
    const { randomString, token } = generateToken(passCode);

    // Store the passcode and token in Redis with a 6-hour expiry
    await redisClient.set(
      token,
      JSON.stringify({ randomString, passCode }),
      "EX",
      6 * 60 * 60
    );

    await redisClient.set(randomString, "true"); // Store the random string to prevent token reuse

    await redisClient.incr(passCode); // Increment the passcode usage count

    // Respond with the generated access token
    res.status(200).json({ accessToken: token });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const reset = async (req, res, next) => {
  try {
    const { passCode } = req.body;

    if (!passCode) {
      throw { status: 400, message: "Passcode is required to logout." };
    }

    // Check if the passcode exists in Redis
    const isPassCodeUsed = await redisClient.exists(passCode);
    if (!isPassCodeUsed) {
      throw {
        status: 400,
        message: "Passcode is not associated with an active session.",
      };
    }

    // Delete the passcode from Redis to invalidate the session
    await redisClient.del(passCode);

    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export default { authenticate, reset };
