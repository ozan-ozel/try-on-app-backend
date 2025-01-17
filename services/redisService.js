import "dotenv/config.js";

import { createClient } from "redis";

console.log("On redis client");

console.log({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect(); // Connect to Redis
  console.log("Connected to Redis");

  if (process.env.PASS_CODE_LIST) {
    const passCodes = process.env.PASS_CODE_LIST.split(",");

    for(let passCode of passCodes) {
      await redisClient.sAdd("passcodes", passCode);
    }
  }
})();

export const isPassCodeValid = async (passCode) => {
  return await redisClient.sIsMember("passcodes", passCode);
}; 

export default redisClient;
