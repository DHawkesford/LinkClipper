import tlds from "tlds" assert { type: "json" };


export const errors = {
  protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
  www: `ERROR: It looks like your link does not include "www"`,
  path: `ERROR: It looks like your link does not include a path`,
};

export function clipStart(url, start) {
  const indicesStart = {
    h: url.indexOf("://"),
    w: url.indexOf("www"),
  };

  var slicedURL = url;
  var start = start.toUpperCase();
  try {
    if (start === "SHORTEN" && indicesStart.h >= 0) {
      // If there's a protocol
      slicedURL = url.slice(indicesStart.h + 3);
    } else if (start === "REMOVE" && indicesStart.w >= 0) {
      // If there's a 'www'
      slicedURL = url.slice(indicesStart.w + 4);
    } else if (
      start === "REMOVE" &&
      indicesStart.w < 0 &&
      indicesStart.h >= 0
    ) {
      // If there's a protocol but no 'www'
      slicedURL = url.slice(indicesStart.h + 3);
    }
    // If there's no protocol:
    else if (start === "SHORTEN" && indicesStart.h < 0) throw errors.protocol;
  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function clipEnd(url, end) {
  var slicedURL = url;
  var end = end.toUpperCase();
  try {
    let indexSlash = url.indexOf("/", slicedURL.indexOf("://") + 3);

    if (url.indexOf("://") < 0) {
      indexSlash = url.indexOf("/");
    }

    if (end === "SHORTEN" && indexSlash >= 0) {
      slicedURL = url.slice(0, indexSlash);
    } else if (end === "SHORTEN" && indexSlash < 0) throw errors.path;
  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function getSiteName(url) {
  // let key = '';
  const matchesArr = [];
    for (let i = 0; i < tlds.length; i++) {
        let key = `([.]${tlds[i]}[.]|[.]${tlds[i]}$|[.]${tlds[i]}\/)`;
        const regex = new RegExp(key, "gi");
        const doesItMatch = regex.test(url);
        doesItMatch ? matchesArr.push(tlds[i]) : null;
    } 
    return matchesArr.length ? matchesArr : "no matches found";
}

console.log(getSiteName('www.zzzz.co.uk/whatever'))
console.log(getSiteName('www.google.com'))
console.log(getSiteName('www.google.com/whwhw'))
console.log(getSiteName('www.google.xyz'))
console.log(getSiteName('www.google.xyz/whwhw'))