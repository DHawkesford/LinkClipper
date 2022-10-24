import { clipStart, clipEnd } from "./helpers.js";

function clipper(url, start, end) {
  try {
    if (typeof url !== "string") throw "URL needs to be a string.";

    url = clipStart(url, start);
    url = end ? clipEnd(url, end) : url;

    return url;
  } catch (e) {
    console.error(e);
  }
}

export default clipper;
