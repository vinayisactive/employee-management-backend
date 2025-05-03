import { Request, Response } from "express";
import { generateSignature } from "../utils/cloudinary-signature";
import { v4 as uuidV4 } from "uuid";

export const getPreSignedUrl = async (req: Request, res: Response) => {
  try {
    const fileId = uuidV4();
    const resourceType = "image";
    const publicId = fileId;

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const fields = {
      api_key: process.env.CLOUDINARY_API_KEY,
      timestamp: timestamp.toString(),
      public_id: publicId,
      signature: await generateSignature(
        { timestamp, public_id: publicId },
        process.env.CLOUDINARY_API_SECRET!
      )
    };

    res.status(200).json({
      data: {
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        fields,
        imageUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/v1/${publicId}`
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
      error: err instanceof Error ? err.message : err,
    });
  }
};