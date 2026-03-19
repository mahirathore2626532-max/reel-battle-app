import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';

export async function uploadToBucket(uri, bucket = 'posts', fileName = 'file') {
  const ext = uri.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${fileName}.${ext}`;

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const contentType =
    ext === 'mp4' || ext === 'mov' ? 'video/mp4' : 'image/jpeg';

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, decode(base64), { contentType, upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}