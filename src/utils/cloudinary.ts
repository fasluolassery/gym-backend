import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

// Configure Cloudinary using the config settings
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

/**
 * Uploads a base64 image string to Cloudinary and returns the secure URL.
 * If the input is already a URL or is empty, it returns the input unchanged.
 */
export const uploadToCloudinary = async (
  imageStr: string | null | undefined,
  folder: string = 'gym-tournament'
): Promise<string | null> => {
  if (!imageStr) return null;

  // If it's already a hosted URL, don't upload again
  if (imageStr.startsWith('http://') || imageStr.startsWith('https://')) {
    return imageStr;
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(imageStr, {
      folder,
      resource_type: 'image',
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    // Fall back to original string
    return imageStr;
  }
};
