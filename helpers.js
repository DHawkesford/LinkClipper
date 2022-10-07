import tlds from "tlds" assert { type: "json" };


export const errors = {
  protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
  www: `ERROR: It looks like your link does not include "www"`,
  path: `ERROR: It looks like your link does not include a path`,
  TLD: `ERROR: It looks like your link does not include a domain name`
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
    const indexTLD = getFirstTLDIndex(url);
    
    // TODO: Potentially update this to use the TLD instead
    if (url.indexOf("://") < 0) {
      indexSlash = url.indexOf("/");
    }

    if (end === "SHORTEN" && indexSlash >= 0) {
      slicedURL = url.slice(0, indexSlash);
    } else if (end === "SHORTEN" && indexSlash < 0) throw errors.path;

    if (end === "REMOVE" && indexTLD >= 0) {
      slicedURL = url.slice(0, indexTLD);
    } else if (end === "REMOVE" && indexTLD < 0) throw errors.TLD;

  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function getFirstTLDIndex(url) {
  const matchesArr = [];
    for (let i = 0; i < tlds.length; i++) {
        let key = `(\\.${tlds[i]}\\.|\\.${tlds[i]}$|\\.${tlds[i]}\/)`;
        // The 'google' problem: if TLD is preceded by http://, www, or start of line, then don't remove it
        const regex = new RegExp(key, "gi");
        const index = url.search(regex);
        index >= 0 ? matchesArr.push(index) : null;
    } 
    return matchesArr.length ? Math.min(...matchesArr) : -1;
}

// console.log(getFirstTLDIndex('http://maps.zzzz.co.uk/whatever'))
// console.log(getFirstTLDIndex('http://www.zzzz.co.uk/whatever'))
// console.log(getFirstTLDIndex('www.zzzz.co.uk/whatever'))
// console.log(getFirstTLDIndex('zzzz.co.uk/whatever'))
// console.log(getFirstTLDIndex('maps.google.com'))
// console.log(getFirstTLDIndex('www.google.com'))
// console.log(getFirstTLDIndex('www.google.com/whwhw'))
// console.log(getFirstTLDIndex('www.google.xyz'))
// console.log(getFirstTLDIndex('www.google.xyz/whwhw'))