import { execute } from "../services/falService.js";
import { uploadFile } from "../services/fileService.js";

export const executeTryOn = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      throw { status: 400, message: "No file uploaded." };
    }

    // Upload the file
    const userImageUrl = await uploadFile(req.file);

    console.log("Uploaded File URL:", userImageUrl);

    // Extract the model image from the request body
    const { modelImage } = req.body;

    console.log("Model Image:", modelImage);

    // Process the images
    const result = await execute(userImageUrl, modelImage);

    // Send the result back to the client
    res.send(result);
  } catch (error) {
    console.error("Error in init controller:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};
