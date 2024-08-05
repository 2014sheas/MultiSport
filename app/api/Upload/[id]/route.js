import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: id,
    });

    const url = await getSignedUrl(client, command);

    return new NextResponse(url);
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    return new Response("Error fetching image from S3");
  }
};

export { GET };
