/*
Possible inputs:

- http://www.google.com
- http://google.com
- https://www.google.com
- https://google.com
- https://maps.google.com
- www.google.com
- maps.google.com
- google.com

Desired outputs:

1. google.com OR maps.google.com (get rid of everything up to the www / before the maps part)
2. www.google.com or maps.google.com (get rid of everything before the www / maps part)

*/

// clipper(url, 1)
// clipper(url, start, end) // start = shorten, remove, none; end = shorten, remove, none
/*
1. If start = shorten, slice based on index.h 
2. else, if start= remove, slice based on index.w

3. If end = shorten, slice based on indices.slash
4. else if end= remove, slice based on indices.c 
*/

export const errors = {
  protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
  www: `ERROR: It looks like your link does not include "www"`,
  path: `ERROR: It looks like your link does not include a path`,
};

function clipper(url, start, end) {
  let slicedURL = url;

  const indicesStart = {
    h: slicedURL.indexOf("://"),
    w: slicedURL.indexOf("www"),
  };

  if (start === "shorten" && indicesStart.h >= 0) { // If there's a protocol
    slicedURL = slicedURL.slice(indicesStart.h + 3);
    console.log(slicedURL);
  } else if (start === "remove" && indicesStart.w >= 0) { // If there's a 'www'
    slicedURL = slicedURL.slice(indicesStart.w + 4);
    console.log(slicedURL);
  } else if (start === "shorten" && indicesStart.h < 0) { // If there's no protocol
    console.log(errors.protocol);
  } else if (start === "remove" && indicesStart.w < 0 && indicesStart.h >= 0) { // If there's a protocol but no 'www'
    slicedURL = slicedURL.slice(indicesStart.h + 3);
  }

  let indexSlash = slicedURL.indexOf("/", slicedURL.indexOf("://") + 3);

  if (slicedURL.indexOf("://") < 0) {
    indexSlash = slicedURL.indexOf("/");
  }

  if (end === "shorten" && indexSlash >= 0) {
    slicedURL = slicedURL.slice(0, indexSlash);
    console.log(slicedURL);
  } else if (end === "shorten" && indexSlash < 0) {
    console.log(errors.path);
  }

  return slicedURL;
}

// Clip the start: the protocol, and 'www' if it exists
// clipper("maps.google.co.uk/whatever");
// clipper("maps.google.com/whatever");
// clipper("google.com/whatever");
// clipper("google.co.uk/whatever");
// clipper("maps.google.co.uk");
// clipper("maps.google.com");
// clipper("google.com");
// clipper("google.co.uk");

// At this point, the user may want either:
// 1. the string as it currently is at this point
// 2. remove the path (/ and everything after it)
// 3. just get the site name ('google')
// How do we differentiate between maps.google.com and google.co.uk?

// clipper("http://google.com", "remove");
// clipper("https://www.google.com", "remove");
// clipper("https://google.com");
// clipper("https://maps.google.com", "shorten");
// clipper("www.google.com", "shorten");
// clipper("maps.google.com");
// clipper("google.com");
// clipper("https://meet.google.com/bnd-azkm-tmy");

export default clipper;

// const indexH = slicedURL.indexOf("://");
// const indexW = slicedURL.indexOf("www");
// const indexSlash = slicedURL.indexOf("/");
// const indexC = slicedURL.lastIndexOf(".");

/*function clipper(url, start, end) {
  let slicedURL = url;

  const indices = {
    h: slicedURL.indexOf("://"),
    w: slicedURL.indexOf("www"),
    slash: slicedURL.indexOf("/", slicedURL.indexOf("://") + 3),
    c: slicedURL.indexOf("."),
  };

  // Look for :// and get rid of it if it's there
  if (indexH >= 0) {
    slicedURL = slicedURL.slice(indexH + 3);
  }

  // console.log(slicedURL);

  // Then look for www and get rid of it if it's there
  if (indexW >= 0) {
    slicedURL = slicedURL.slice(indexW + 4);
  }

  if (indexSlash >= 0) {
    slicedURL = slicedURL.slice(0, indexSlash);
  }

  if (indexC >= 0) {
    slicedURL = slicedURL.slice(0, indexC);
  }

  console.log(slicedURL);

  return slicedURL;
}*/
