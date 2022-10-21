import tldsArr from "tlds";

export const errors = {
  protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
  www: `ERROR: It looks like your link does not include "www"`,
  path: `ERROR: It looks like your link does not include a path`,
  TLD: `ERROR: It looks like your link does not include a domain name`,
};

function getCutoffPoints(url) {
  const cutoffPoints = {
    protocol: url.indexOf("://"),
    www: url.indexOf("www"),
    slash: url.indexOf("/", getFirstTLDIndex(url)),
    tld: getFirstTLDIndex(url),
  };

  return cutoffPoints;
}

export function clipStart(url, start) {
  //TODO: add error for REMOVE when there's no protocol
  const cutoffPoints = getCutoffPoints(url);
  var slicedURL = url;
  var start = start.toUpperCase();
  try {
    switch (start) {
      case "SHORTEN":
        if (cutoffPoints.protocol >= 0) {
          slicedURL = url.slice(cutoffPoints.protocol + 3); // TODO: Potentially make a helper function that does this
        } else throw errors.protocol;
        break;
      case "REMOVE": // google.co.uk/whatever
        if (cutoffPoints.www >= 0) {
          slicedURL = url.slice(cutoffPoints.www + 4);
        } else if (cutoffPoints.www < 0 && cutoffPoints.protocol >= 0) {
          slicedURL = url.slice(cutoffPoints.protocol + 3); // TODO: See above
        } else throw errors.www;
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
  const cutoffPoints = getCutoffPoints(url);

  try {
    switch (end) {
      case "SHORTEN":
        if (cutoffPoints.slash >= 0) {
          slicedURL = url.slice(0, cutoffPoints.slash);
        } else throw errors.path;
        break;
      case "REMOVE":
        slicedURL = url.slice(0, cutoffPoints.tld);
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return slicedURL;
}

export function getFirstTLDIndex(url) {
  const matchesArr = [];
  for (let i = 0; i < tldsArr.length; i++) {
    let key = `(\\.${tldsArr[i]}(\\.|\/|$))`;
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
