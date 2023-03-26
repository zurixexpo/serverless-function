exports.handler = async (event) => {
  const formData = JSON.parse(event.body); // parse the request body as JSON
  const fileData = formData.file.split(';base64,').pop(); // extract the base64-encoded file data
  const fileType = formData.filetype; // get the file type from the form data

  const file = Buffer.from(fileData, 'base64'); // convert the base64-encoded file data to a buffer
  const fileName = `video-${Date.now()}.${fileType}`; // generate a unique file name for the uploaded video

  try {
    await require('fs').promises.writeFile(`./public/${fileName}`, file); // write the file to your site's published files
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully.' }),
    };
  } catch (error) {
    console.error('Error writing file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error uploading file.' }),
    };
  }
};
