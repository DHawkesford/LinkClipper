import { clipStart, clipEnd } from "./helpers.js";

function clipper(url, start, end) {
  const URLSlicedStart = clipStart(url, start)
  const URLSlicedEnd = clipEnd(URLSlicedStart, end)
    
  return URLSlicedEnd;
}

export default clipper;
