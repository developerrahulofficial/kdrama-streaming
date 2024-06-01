import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(req, res) {
  try {
    const { title } = req.query;

    if (!title) {
      res.status(400).json({ message: 'Title parameter is required' });
      return;
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    const params = {
      Bucket: bucketName,
      Prefix: `${title}/`,
    };

    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents.length) {
      res.status(404).json({ message: 'Title not found' });
      return;
    }

    const s3BaseUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`;

    const episodes = data.Contents
      .map(item => item.Key)
      .filter(key => key.endsWith('.mp4'))
      .map(key => {
        const episodeName = key.split('/').pop().replace('.mp4', '');
        const subtitleFile = `${title}/${episodeName}.en.srt`;
        return {
          video: `${s3BaseUrl}${key}`,
          subtitle: data.Contents.some(item => item.Key === subtitleFile) ? `${s3BaseUrl}${subtitleFile}` : null,
        };
      });

    res.status(200).json(episodes);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
