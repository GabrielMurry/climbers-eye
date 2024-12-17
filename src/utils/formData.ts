export const createImageFormData = async (
  formData: FormData,
  uri: string,
  name: string
): Promise<null> => {
  // Fetch the file data from the local URI
  const responseImage = await fetch(uri);
  const blobImage = await responseImage.blob();

  // Append the Blob to FormData
  // const isHttps = image.url.startsWith("https")
  formData.append("image", blobImage, `${name}.jpeg`);

  return null;
};
