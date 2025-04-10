export const createImageFormData = async (
  formData: FormData,
  uri: string,
  name: string
): Promise<void> => {
  try {
    const responseImage = await fetch(uri);
    const blobImage = await responseImage.blob();

    const fileType = uri.split(".").pop() || "jpeg";
    const fileName = `${name}.${fileType}`;

    formData.append(name, blobImage);
  } catch (error) {
    console.error("Error creating image FormData:", error);
  }
};
