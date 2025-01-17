import { fal } from "@fal-ai/client";

import "dotenv/config.js";

fal.config({
  credentials: process.env.FAL_KEY
});

export const execute = async (modelImage, garmentImage) => {
  const result = await fal.subscribe("fashn/tryon", {
    input: {
      model_image: modelImage,
      garment_image: garmentImage,
      category: "tops"
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  console.log(result.data);
  console.log(result.requestId);
  
  return result;
}
