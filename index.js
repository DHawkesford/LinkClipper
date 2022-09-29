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

  try {
    if (start === "shorten" && indicesStart.h >= 0) {
      // If there's a protocol
      slicedURL = slicedURL.slice(indicesStart.h + 3);
      console.log(slicedURL);
    } else if (start === "remove" && indicesStart.w >= 0) {
      // If there's a 'www'
      slicedURL = slicedURL.slice(indicesStart.w + 4);
      console.log(slicedURL);
    } // If there's no protocol:
    else if (start === "shorten" && indicesStart.h < 0) throw errors.protocol;
    else if (start === "remove" && indicesStart.w < 0 && indicesStart.h >= 0) {
      // If there's a protocol but no 'www'
      slicedURL = slicedURL.slice(indicesStart.h + 3);
    }
  } catch (err) {
    console.error(err);
  }

  try {
    let indexSlash = slicedURL.indexOf("/", slicedURL.indexOf("://") + 3);
  
    if (slicedURL.indexOf("://") < 0) {
      indexSlash = slicedURL.indexOf("/");
    }
  
    if (end === "shorten" && indexSlash >= 0) {
      slicedURL = slicedURL.slice(0, indexSlash);
      console.log(slicedURL);
    } else if (end === "shorten" && indexSlash < 0) throw errors.path;
  } catch (err) {
    console.error(err);
  }
    
  return slicedURL;
}

export default clipper;
