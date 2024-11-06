const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3") 
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner") 
const crypto = require("crypto")

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.MY_APP_AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_BUCKET_REGION
})

const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const uploadFiles = async(files) => {
    const s3UploadPromises = files.map(async (file) => {
        const fileName = randomFileName()
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,  
          Body: file.buffer,  
          ContentType: file.mimetype,
        } 
  
        const command = new PutObjectCommand(params) 
        const s3Upload = await s3.send(command) 
        
        return {
          filename: fileName,
          s3Response: s3Upload,
        } 
      }) 
  
    const uploadResults = await Promise.all(s3UploadPromises) 

    return uploadResults
}

const getFileUrls = async(files) => {

  const fileUrls = await Promise.all(files.map(async (file) => {
    const getObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file
    } 
    const command = new GetObjectCommand(getObjectParams) 

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }) 

    return url 
  })) 

  return fileUrls
}

const deleteFiles = async(files) => {
  for (const file of files) {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file, 
    };
    const command = new DeleteObjectCommand(params);
    try {
        await s3.send(command); 
    } 
    catch (s3Error) {
        return response.status(500).send({message: s3Error})
    }
  }
}

module.exports = {uploadFiles, getFileUrls, deleteFiles}