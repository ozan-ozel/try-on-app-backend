import { execute } from "../services/falService.js";
import { uploadFile } from "../services/fileService.js";
import { logWithTimestamp } from "../services/logService.js";

export const executeTryOn = async (req, res) => {
  try {
    logWithTimestamp("Received request to execute try-on");

    // Check if a file was uploaded
    if (!req.file) {
      logWithTimestamp("No file uploaded");

      throw { status: 400, message: "No file uploaded." };
    }

    // Upload the file
    const userImageUrl = await uploadFile(req.file);

    logWithTimestamp("User image uploaded");

    logWithTimestamp("Uploaded File URL:", userImageUrl);

    // Extract the model image from the request body
    const { modelImage } = req.body;

    logWithTimestamp("Model image uploaded");

    logWithTimestamp("Model Image URL:", modelImage);

    // Process the images
    const result = await execute(userImageUrl, modelImage);

    logWithTimestamp("Executed try-on\n" + JSON.stringify(result));

    // Send the result back to the client
    res.send(result);
  } catch (error) {
    logWithTimestamp("Error in init controller:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};
