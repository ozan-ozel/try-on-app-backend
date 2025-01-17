import "dotenv/config.js";

import express from "express";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import tryOnRoute from "./routes/tryOnRoute.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/try-on", tryOnRoute);

app.get("/health-check", (req, res) => {
  res.send("Service is running.");
});

// app.post("/upload", upload.array("files", 2), async (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   try {
//     const files = req.files.map(
//       (file) =>
//         new File([file.buffer], file.originalname, { type: file.mimetype })
//     );

//     console.log(files);

//     const response = await utapi.uploadFiles(files); // Send buffers
//     console.log("Upload response:", response);
//     res.send("Files uploaded successfully!");

//     // await uploadFiles(formData); // Pass FormData to uploadFiles function
//     // res.send("Files uploaded successfully!");
//   } catch (error) {
//     console.error("Error during upload:", error);
//     res.status(500).send("Upload failed.");
//   }
//   return "Upload successful!";
// });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Try on app listening on port ${port}`);
});
