function sendResponse(
  res,
  { statusCode = 400, contentType = "application/json", body = {} },
) {
  res.writeHead(statusCode, { "content-type": contentType });
  res.end(JSON.stringify(body));
}

module.exports = {
  sendResponse,
};
