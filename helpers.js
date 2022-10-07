import tlds from "tlds" assert { type: "json" };

export const errors = {
  protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
  www: `ERROR: It looks like your link does not include "www"`,
  path: `ERROR: It looks like your link does not include a path`,
  TLD: `ERROR: It looks like your link does not include a domain name`,
};

export function clipStart(url, start) {
  const indicesStart = {
    h: url.indexOf("://"),
    w: url.indexOf("www"),
  };
  //TODO: add error for REMOVE when there's no protocol
  var slicedURL = url;
  var start = start.toUpperCase();
  try {
    switch (start) {
      case "SHORTEN":
        if (indicesStart.h >= 0) {
          slicedURL = url.slice(indicesStart.h + 3); // TODO: Potentially make a helper function that does this
        } else if (indicesStart.h < 0) {
          throw errors.protocol;
        }
        break;
      case "REMOVE": // google.co.uk/whatever
        if (indicesStart.w >= 0) {
          slicedURL = url.slice(indicesStart.w + 4);
        } else if (indicesStart.w < 0 && indicesStart.h >= 0) {
          slicedURL = url.slice(indicesStart.h + 3); // TODO: See above
        } else if (indicesStart.w < 0 && indicesStart.h < 0) {
          throw errors.www;
        }
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function clipEnd(url, end) {
  var slicedURL = url;
  var end = end.toUpperCase();
  const indexTLD = getFirstTLDIndex(url);
  let indexSlash = url.indexOf("/", indexTLD);

  try {
    switch (end) {
      case "SHORTEN":
        if (indexSlash >= 0) {
          slicedURL = url.slice(0, indexSlash);
        } else throw errors.path;
        break;
      case "REMOVE":
        slicedURL = url.slice(0, indexTLD);
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function getFirstTLDIndex(url) {
  const matchesArr = [];
  for (let i = 0; i < tlds.length; i++) {
    let key = `(\\.${tlds[i]}(\\.|\/|$))`;
    // The 'google' problem: if TLD is preceded by http://, www, or start of line, then don't remove it
    const regex = new RegExp(key, "gi");
    const index = url.search(regex);
    index >= 0 ? matchesArr.push(index) : null;
  }
  try {
    if (matchesArr.length > 0) {
      return Math.min(...matchesArr);
    } else throw errors.TLD;
  } catch (err) {
    console.error(err);
  }
}

console.log(getFirstTLDIndex("http://maps.zzzz.co.uk/whatever"));
console.log(getFirstTLDIndex("http://www.zzzz.co.uk/whatever"));
console.log(getFirstTLDIndex("www.zzzz.co.uk/whatever"));
console.log(getFirstTLDIndex("zzzz.co.uk/whatever"));
console.log(getFirstTLDIndex("maps.google.com"));
console.log(getFirstTLDIndex("www.google.com"));
console.log(getFirstTLDIndex("www.google.com/whwhw"));
console.log(getFirstTLDIndex("www.google.xyz"));
console.log(getFirstTLDIndex("www.google.xyz/whwhw"));
