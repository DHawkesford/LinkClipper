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

function clipper(url) {
  let slicedURL = url;

  // Look for :// and get rid of it if it's there
  const index = slicedURL.indexOf("://");
  if (index >= 0) {
    slicedURL = slicedURL.slice(index + 3);
  }

  // console.log(slicedURL);

  // Then look for www and get rid of it if it's there
  const index2 = slicedURL.indexOf("www");
  if (index2 >= 0) {
    slicedURL = slicedURL.slice(index2 + 4);
  }

  const index3 = slicedURL.indexOf("/");
  if (index3 >= 0) {
    slicedURL = slicedURL.slice(0, index3);
  }

  const index4 = slicedURL.lastIndexOf(".");
  if (index4 >= 0) {
    slicedURL = slicedURL.slice(0, index4);
  }

  console.log(slicedURL);

  return slicedURL;
}

clipper("http://www.google.com/whatever");
clipper("http://google.com");
clipper("https://www.google.com");
clipper("https://google.com");
clipper("https://maps.google.com");
clipper("www.google.com");
clipper("maps.google.com");
clipper("google.com");
clipper("https://meet.google.com/bnd-azkm-tmy");

export default clipper;
