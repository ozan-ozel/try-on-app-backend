import redisClient from "../services/redisService.js";

const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
      throw { status: 401, message: "Authorization token is required." };
    }

    // Check if the token exists in Redis
    const tokenData = await redisClient.get(token);
    if (!tokenData) {
      throw { status: 401, message: "Invalid or expired token." };
    }

    // Parse the token data (optional, if you stored additional information in Redis)
    const { passCode, randomString } = JSON.parse(tokenData);

    // Check if the random string exists in Redis
    const randomStringExists = await redisClient.exists(randomString);

    if (!randomStringExists) {
      throw { status: 401, message: "Invalid or expired token." };
    }

    const passCodeExists = await redisClient.sIsMember("passcodes", passCode);

    if (!passCodeExists) {
      throw { status: 401, message: "Invalid passcode." };
    }

    // Attach token data to the request for further use
    req.auth = { passCode, token };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export default { verifyToken };
