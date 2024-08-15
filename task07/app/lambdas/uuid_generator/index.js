const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client();
const bucketName = process.env.bucket_name || uuid-storage;

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handler = async (event) => {
  // await delay(60000);
  console.log(`Lambda execution started at: ${new Date().toISOString()}`);

  const executionTime = new Date().toISOString();
  const fileName = `${executionTime}`;

  const ids = Array.from({ length: 10 }, () => uuidv4());

  const fileContent = JSON.stringify({ ids });


  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/json",
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(`File ${fileName} successfully uploaded to S3.`);
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw err;
  }

  return {
    statusCode: 200,
    message: `File ${fileName} successfully uploaded to S3.`,
  };
};