// import tldsArr from "tlds" assert {type: "json"};
import tldsArr from "tlds";

export const errors = {
  protocol: `ERROR: It looks like your link already does not include "https://" nor "http://"`,
  noStart: `ERROR: It looks like your link already does not include "www", "https://" nor "http://"`,
  path: `ERROR: It looks like your link already does not include a path`,
  tld: `ERROR: It looks like your link already does not include a domain name`,
};

//Looks for occurrences of TLDs in the input string (url), and returns the index of the first TLD found in that string. If none found, returns -1.
function getFirstTLDIndex(url) {
  const matchesArr = [];
  //Iterates through tldsArr (which contains all current TLDS) and puts each item in a regex.
  for (let i = 0; i < tldsArr.length; i++) {
    let key = `(\\.${tldsArr[i]}(\\.|\/|$))`;
    const regex = new RegExp(key, "gi");
    //searches for that regex in the url, returning the index of the match
    const index = url.search(regex);
    //if there is a match (i.e. index isn't -1), it pushes it to the matchesArr. Otherwise it does nothing.
    index >= 0 ? matchesArr.push(index) : null;
  }
  //if matchesArr contains any indices at all, it returns the lowest of those; if it's empty, it returns -1.
  if (matchesArr.length > 0) {
    return Math.min(...matchesArr);
  } else return -1;
}

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
  const cutoffPoints = getCutoffPoints(url);
  var start = start.toUpperCase();
  try {
    switch (start) {
      case "SHORTEN":
        if (cutoffPoints.protocol >= 0) {
          url = url.slice(cutoffPoints.protocol + 3);
        } else throw errors.protocol;
        break;
      case "REMOVE":
        if (cutoffPoints.www >= 0) {
          url = url.slice(cutoffPoints.www + 4);
        } else if (cutoffPoints.www < 0 && cutoffPoints.protocol >= 0) {
          url = url.slice(cutoffPoints.protocol + 3);
        } else throw errors.noStart;
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return url;
}

export function clipEnd(url, end) {
  var end = end.toUpperCase();
  const cutoffPoints = getCutoffPoints(url);

  try {
    switch (end) {
      case "SHORTEN":
        if (cutoffPoints.slash >= 0) {
          url = url.slice(0, cutoffPoints.slash);
        } else throw errors.path;
        break;
      case "REMOVE":
        if (cutoffPoints.tld >= 0) {
          url = url.slice(0, cutoffPoints.tld);
        } else throw errors.tld;
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return url;
}
