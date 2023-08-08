import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: { paramsToSign?: Record<string, any> } =
    JSON.parse(req.body) || {};
  const { paramsToSign } = body;

  try {
    if (!paramsToSign) {
      throw new Error("Missing 'paramsToSign' in the request body.");
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    res.status(200).json({
      signature,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
