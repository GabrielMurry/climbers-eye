export const createImageFormData = async (
  formData: FormData,
  uri: string,
  name: string
): Promise<void> => {
  try {
    // Fetch the file data from the local URI
    const responseImage = await fetch(uri);
    const blobImage = await responseImage.blob();

    // Extract file type from the URI or default to 'image/jpeg'
    const fileType = uri.split(".").pop() || "jpeg";
    const fileName = `${name}.${fileType}`;

    // formData.append("file", {
    //   uri: "/dev/sda/abc.png",
    //   type: "image/png",
    //   name: "abc.png",
    // });

    // Append the Blob to FormData with the correct file name and type
    // formData.append(name, blobImage, fileName);
    // FormDataValue = string | {name?: string, type?: string, uri: string}
    formData.append(name, blobImage);
  } catch (error) {
    console.error("Error creating image FormData:", error);
  }
};
