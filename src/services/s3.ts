import S3 from 'aws-sdk/clients/s3';

export enum S3Folder {
  'payouts' = 'payouts',
  'winning_pizzas' = 'winning_pizzas',
  'winners' = 'winners',
  'ingredientsJson' = 'ingredientsJson',
  'pizzas' = 'pizzas',
  'unclaimed' = 'unclaimed'
}

export const uploadJsonToS3 = async (json: any, folder: S3Folder) => {
  console.log(`uploading ${folder}/${process.env.ETH_NETWORK}.json to s3`);
  const s3 = new S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });
  const jsonString = JSON.stringify(json);
  const buffer = Buffer.from(jsonString);
  const params = {
    ContentType: 'application/json',
    ContentLength: buffer.byteLength,
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'lazlos-pizza',
    Key: `${folder}/${process.env.ETH_NETWORK}.json`,
    Body: buffer,
  };
  return s3.putObject(params).promise();
};

export const uploadTestJsonToS3 = async (json: any, folder: S3Folder, name: String) => {
  console.log(`uploading ${folder}/${name}.json to s3`);
  const s3 = new S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });
  const jsonString = JSON.stringify(json);
  const buffer = Buffer.from(jsonString);
  const params = {
    ContentType: 'application/json',
    ContentLength: buffer.byteLength,
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'lazlos-pizza',
    Key: `${folder}/${name}.json`,
    Body: buffer,
  };
  return s3.putObject(params).promise();
};