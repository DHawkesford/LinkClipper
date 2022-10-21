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

console.log(clipper('http://www.example.co.uk', 'remove', 'remove'));
// console.log(clipper("http://maps.zzzz.co.uk/whatever", "remove", "remove"));
// console.log(clipper("http://www.zzzz.co.uk/whatever", "remove", "remove"));
// console.log(clipper("www.zzzz.co.uk/whatever", "remove", "remove"));
// console.log(clipper("zzzz.co.uk/whatever", "remove", "remove"));
// console.log(clipper("maps.google.com", "remove", "remove"));
// console.log(clipper("www.google", "remove", "remove"));
// console.log(clipper("www.google.com/whwhw", "none", "remove"));
// console.log(clipper("maps.google.com/whwhw", "none", "remove"));
// console.log(clipper("maps.google.xyz", "shorten", "remove"));
// console.log(clipper("maps.google.xyz/whwhw", "none", "remove"));
// console.log(clipper("www.zzzz", "remove", "remove"));
// console.log(clipper("zzzz", "remove", "remove"));
