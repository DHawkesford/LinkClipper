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

function clipper(url, start, end) {
  let slicedURL = url;

  const indices = {
    h: slicedURL.indexOf("://"),
    w: slicedURL.indexOf("www"),
    slash: slicedURL.indexOf("/", slicedURL.indexOf("://") + 3),
    c: slicedURL.indexOf("."),
  };

  if (start === "shorten" && indices.h >= 0) {
    slicedURL = slicedURL.slice(indices.h + 3);
    console.log(slicedURL);
  } else if (start === "remove" && indices.w >= 0) {
    slicedURL = slicedURL.slice(indices.w + 4);
    console.log(slicedURL);
  } else if (start === "shorten" && indices.h < 0) {
    console.log(
      `ERROR: It looks like your link does not include "https://" nor "http://" `
    );
  } else if (start === "remove" && indices.w < 0) {
    console.log(`ERROR: It looks like your link does not include "www" `);
  }

  return slicedURL;
}

// clipper("http://www.google.com/whatever");
clipper("http://google.com", "remove");
clipper("https://www.google.com", "remove");
// clipper("https://google.com");
clipper("https://maps.google.com", "shorten");
clipper("www.google.com", "shorten");
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
