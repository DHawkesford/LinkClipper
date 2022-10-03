import { clipStart, clipEnd } from "./helpers.js";
import tlds from "tlds";

console.log(tlds);

function clipper(url, start, end) {
  try {
    if (typeof url !== "string") throw "URL needs to be a string.";

    const URLSlicedStart = clipStart(url, start);
    const URLSlicedEnd = end ? clipEnd(URLSlicedStart, end) : URLSlicedStart;

    return URLSlicedEnd;
  } catch (e) {
    console.error(e);
  }
}

export default clipper;
