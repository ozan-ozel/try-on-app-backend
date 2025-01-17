import { UTApi } from "uploadthing/server";
import "dotenv/config.js";

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN
});

export async function uploadFiles(files) {
  var response = await utapi.uploadFiles(files.map(
    (file) =>
      new File([file.buffer], file.originalname, { type: file.mimetype })
  )); // Send buffers

  return response?.[0]?.data;
}

export async function uploadFile(file) {
  const response = await utapi.uploadFiles(new File([file.buffer], file.originalname, { type: file.mimetype }));

  return response?.data.url;
};