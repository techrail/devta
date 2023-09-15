export const BODY_TYPE = {
  JSON: "json",
  FORM_MULTIPART: "frmMultipart",
  FORM_ENCODED: "frmUrlEnc",
  PLAIN: "plain",
};
export const METHOD_TYPE = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const BODY_TYPE_TO_CONTENT_TYPE_MAPPING = {
  [BODY_TYPE.JSON]: "application/json; charset=UTF-8",
  [BODY_TYPE.FORM_MULTIPART]: "multipart/form-data",
  [BODY_TYPE.FORM_ENCODED]: "application/x-www-form-urlencoded",
  [BODY_TYPE.PLAIN]: "text/plain",
};

const normBytes = (size) => {
  if (size > 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${size} Bytes`;
};
const normTime = (time) => {
  if (time > 1000) return `${(time / 1000).toFixed(2)} sec`;
  return `${time} ms`;
};

export const makeRequest = async (main) => {
  const { methodType, url, headers: _headers, form, json, type } = main;
  console.log(main);
  let body = null;
  if (methodType != METHOD_TYPE.GET) {
    if (type === BODY_TYPE.JSON) {
      try {
        body = json == "" ? "" : JSON.stringify(JSON.parse(json));
      } catch (err) {
        return { isError: true, msg: "Invalid JSON Provided" };
      }
    } else if (type === BODY_TYPE.FORM_ENCODED) {
      body = new FormData();
      for (let row of form) {
        if (row[0] != "") body.append(row[0], row[1]);
      }
      body = new URLSearchParams(body);
    } else {
      return { isError: true, msg: "Invalid Body Type" };
    }
  }

  let headers = {};
  for (let row of _headers) {
    if (row[0] != "") headers[row[0]] = row[1];
  }
  // override content type if any
  headers["Content-Type"] = BODY_TYPE_TO_CONTENT_TYPE_MAPPING[type];
  headers["Access-Control-Expose-Headers"] = "Content-Length";

  const createOptionsForFetch = { method: methodType, headers, body };
  const start = new Date();
  try {
    const res = await (methodType == METHOD_TYPE.GET ? fetch(url) : fetch(url, createOptionsForFetch));
    const end = new Date();
    const timeTaken = end - start;
    const json = await res.text();
    // console.log(normBytes(json.length));
    return {
      isError: false,
      json,
      status: `${res.status} ${res.statusText}`,
      size: res.headers["content-length"] || normBytes(json.length),
      time: normTime(timeTaken),
    };
  } catch (err) {
    // console.log(err);
    if (err instanceof SyntaxError) {
      return { isError: true, msg: "Server Returned Invalid JSON" };
    }
    return { isError: true, msg: err.toString() };
  }
};
