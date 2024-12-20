export const createImageFormData = async (
  formData: FormData,
  uri: string,
  name: string
): Promise<void> => {
  try {
    // Fetch the file data from the local URI
    const responseImage = await fetch(uri);
    const blobImage = await responseImage.blob();

    // Append the Blob to FormData
    // const isHttps = image.url.startsWith("https")
    formData.append(name, blobImage, `${name}.jpeg`);
  } catch (error) {
    console.error(error);
  }
};
