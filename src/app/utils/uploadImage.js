import supabase from '../api/utils/supabase.js';

/**
 * Upload image to Supabase Storage
 * @param {File} file - Image file to upload
 * @param {string} bucket - Storage bucket name
 * @param {string} folder - Folder path (optional)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadImageToStorage(file, bucket = 'Business-image', folder = '') {
  try {
    // Validate file
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'Image must be less than 5MB' };
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    console.log('📤 Uploading image:', { fileName, filePath, size: file.size });

    // Upload to Supabase Storage (Public bucket, no auth needed)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('❌ Upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('✅ Upload successful:', uploadData);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    console.log('✅ Public URL:', publicUrl);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete image from Supabase Storage
 * @param {string} url - Image URL to delete
 * @param {string} bucket - Storage bucket name
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteImageFromStorage(url, bucket = 'Business-image') {
  try {
    if (!url) return { success: true };

    // Extract file path from URL
    const urlParts = url.split('/');
    const filePath = urlParts.slice(urlParts.indexOf(bucket) + 1).join('/');

    console.log('🗑️ Deleting image:', filePath);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('❌ Delete error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Image deleted');
    return { success: true };
  } catch (error) {
    console.error('❌ Delete failed:', error);
    return { success: false, error: error.message };
  }
}

