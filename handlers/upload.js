const { sendResponse } = require("../utils/httpHelpers");
const { parseFileMetadata } = require("../utils/file");

const { formidable } = require("formidable"); // formidable v3 用 named import

function handleUpload(req, res, config) {
  const { uploadDir, maxFileSize } = config;

  const form = formidable({
    uploadDir,
    maxFileSize,
    keepExtensions: true,
  });

  form.on("error", (err) => {
    console.log(err);
  });

  form.parse(req, (error, fields, files) => {
    if (error) {
      return sendResponse(res, {
        statusCode: 500,
        body: { error: error || "Upload failed" },
      });
    }

    const file = files.file?.[0];

    if (!file) {
      return sendResponse(res, {
        statusCode: 400,
        body: { error: "No file uploaded" },
      });
    }

    const responseMessage = {
      ...parseFileMetadata(file),
      savedPath: file.filepath,
    };

    return sendResponse(res, {
      statusCode: 200,
      body: responseMessage,
    });
  });
}

function handleNotFound(res) {
  return sendResponse(res, { statusCode: 404, body: { error: "Not Found" } });
}

module.exports = {
  handleUpload,
  handleNotFound,
};
