import clipper from "./index.js";
import { errors } from "./helpers.js";
import jest from "jest-mock";

/*
https://www.example.com/maps/place/Big+Ben/
[http://, https://, none] + [www, maps, none] + . + example + . + [.com, .co.uk] + [/maps/place/Big+Ben, none]

Block I: just one site name 
   A: single domain name:
    I: https protocol
  -  https://www.example.com/maps/place/Big+Ben/
  -  https://example.com/maps/place/Big+Ben/
  -  https://www.example.com
  - https://example.com 

    II: http protol:
  -  http://www.example.com/maps/place/Big+Ben/
  -  http://example.com/maps/place/Big+Ben/
  -  http://www.example.com
  -  http://example.com
  
    III: No protocol:
  - www.example.com/maps/place/Big+Ben/ 
  - example.com/maps/place/Big+Ben/ 
  - www.example.com 
  - example.com 

  //B: double domain name
  I: https protocol
  - https://www.example.co.uk/maps/place/Big+Ben/
  - https://example.co.uk/maps/place/Big+Ben/ 
  - https://www.example.co.uk
  - https://example.co.uk
  
  II. http protocol: 
-  http://www.example.co.uk/maps/place/Big+Ben/
-  http://example.co.uk/maps/place/Big+Ben/
-  http://www.example.co.uk
-  http://example.co.uk

  III. No protocol:
- www.example.co.uk/maps/place/Big+Ben/ 
- example.co.uk/maps/place/Big+Ben/ 
- www.example.co.uk 
- example.co.uk 

Block II: double site name
  A: single domain name:
    I: https protocol
    -  https://www.maps.example.com/maps/place/Big+Ben/
    -  https://maps.example.com/maps/place/Big+Ben/
    -  https://www.maps.example.com
    -  https://maps.example.com 

    II: http protocol
    -  http://www.maps.example.com/maps/place/Big+Ben/
    -  http://maps.example.com/maps/place/Big+Ben/
    -  http://www.maps.example.com
    -  http://maps.example.com

    III. no protocol
    - www.maps.example.com/maps/place/Big+Ben/ 
    - maps.example.com/maps/place/Big+Ben/ 
    - www.maps.example.com 
    - maps.example.com 

    B:double domain name
    I: https protocol
    - https://www.maps.example.co.uk/maps/place/Big+Ben/
    - https://maps.example.co.uk/maps/place/Big+Ben/ 
    - https://www.maps.example.co.uk
    - https://maps.example.co.uk
    
    II. http protocol: 
    -  http://www.maps.example.co.uk/maps/place/Big+Ben/
    -  http://maps.example.co.uk/maps/place/Big+Ben/
    -  http://www.maps.example.co.uk
    -  http://maps.example.co.uk

    III. No protocol:
    - www.maps.example.co.uk/maps/place/Big+Ben/ 
    - maps.example.co.uk/maps/place/Big+Ben/ 
    - www.maps.example.co.uk 
    - maps.example.co.uk 
*/

function tester(protocol, www, siteName1, siteName2, tld1, tld2, path) {
  const url = protocol + www + siteName1 + siteName2 + tld1 + tld2 + path;
  console.error = jest.fn();

  test(`clipper(url, "none")`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten")`, () => {
    expect(clipper(url, "shorten")).toBe(
      www + siteName1 + siteName2 + tld1 + tld2 + path
    );
  });

  test(`clipper(url, "remove")`, () => {
    expect(clipper(url, "remove")).toBe(
      siteName1 + siteName2 + tld1 + tld2 + path
    );
  });

  test(`clipper(url, "none", "shorten")`, () => {
    expect(clipper(url, "none", "shorten")).toBe(
      protocol + www + siteName1 + siteName2 + tld1 + tld2
    );
  });

  test(`clipper(url, "shorten", "shorten")`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe(
      www + siteName1 + siteName2 + tld1 + tld2
    );
  });

  test(`clipper(url, "remove", "shorten")`, () => {
    expect(clipper(url, "remove", "shorten")).toBe(
      siteName1 + siteName2 + tld1 + tld2
    );
  });

  test(`clipper(url, "none", "remove")`, () => {
    expect(clipper(url, "none", "remove")).toBe(
      protocol + www + siteName1 + siteName2
    );
  });
  test(`clipper(url, "shorten", "remove")`, () => {
    expect(clipper(url, "shorten", "remove")).toBe(www + siteName1 + siteName2);
  });
  test(`clipper(url, "remove", "remove")`, () => {
    expect(clipper(url, "remove", "remove")).toBe(siteName1 + siteName2);
  });
}

// PRELIMINARY CHECKS
describe("Errors", () => {
  console.error = jest.fn();

  test(`If the 'start' parameter is 'SHORTEN', and the url parameter has no protocol, it should console.error the protocol error message`, () => {
    clipper("www.maps.example.co.uk", "SHORTEN", "none");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`If the 'start' parameter is 'REMOVE', and the url parameter has no protocol and no www, it should console.error the noStart error message`, () => {
    clipper("maps.example.co.uk", "REMOVE", "none");
    expect(console.error).toHaveBeenCalledWith(errors.noStart);
  });

  test(`If the 'end' parameter is 'SHORTEN', and the url parameter has no path, it should console.error the path error message`, () => {
    clipper("https://maps.example.co.uk", "none", "SHORTEN");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`If the 'end' parameter is 'REMOVE', and the url parameter has no tld, it should console.error the tld error message`, () => {
    clipper("https://maps.example", "none", "REMOVE");
    expect(console.error).toHaveBeenCalledWith(errors.tld);
  });
});

describe("Case checking", () => {
  const url = "http://www.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "sHorTen") should return "www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remOVE") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "NOne", "shoRTen") should return "http://www.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.example.com");
  });

  test(`clipper(url, "SHorten", "SHorten") should return "www.example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "remOVE", "shoRten") should return "example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });
});

describe("Input validation", () => {
  console.error = jest.fn();

  test(`If the url parameter is a number, should return an error`, () => {
    expect(clipper(123, "none")).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith("URL needs to be a string.");
  });

  test(`If the url parameter is an array, should return an error`, () => {
    expect(clipper(["Test"], "none")).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith("URL needs to be a string.");
  });
  test(`If the url parameter is an array with items corresponding to url elements, should return an error`, () => {
    expect(clipper(["://", "www", "/"], "none")).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith("URL needs to be a string.");
  });
});

// SINGLE SITE NAME | SINGLE DOMAIN | HTTPS
describe("https://www.example.com/maps/place/Big+Ben/", () => {
  tester("https://", "www.", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("https://example.com/maps/place/Big+Ben/", () => {
  tester("https://", "", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("https://www.example.com", () => {
  tester("https://", "www.", "", "example", ".com", "", "");
});
describe("https://example.com ", () => {
  tester("https://", "", "", "example", ".com", "", "");
});

//SINGLE SITE NAME | SINGLE DOMAIN | HTTP
describe("http://www.example.com/maps/place/Big+Ben/", () => {
  tester("http://", "www.", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("http://example.com/maps/place/Big+Ben/", () => {
  tester("http://", "", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("http://www.example.com", () => {
  tester("http://", "www.", "", "example", ".com", "", "");
});
describe("http://example.com ", () => {
  tester("http://", "", "", "example", ".com", "", "");
});

//SINGLE SITE NAME |SINGLE DOMAIN | NO PROTOCOL
describe("www.example.com/maps/place/Big+Ben/", () => {
  tester("", "www.", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("example.com/maps/place/Big+Ben/", () => {
  tester("", "", "", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("www.example.com", () => {
  tester("", "www.", "", "example", ".com", "", "");
});
describe("example.com ", () => {
  tester("", "", "", "example", ".com", "", "");
});

// SINGLE SITE NAME | DOUBLE DOMAIN | HTTPS
describe("https://www.example.co.uk/maps/place/Big+Ben/", () => {
  tester("https://", "www.", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("https://example.co.uk/maps/place/Big+Ben/", () => {
  tester("https://", "", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("https://www.example.co", () => {
  tester("https://", "www.", "", "example", ".co", ".uk", "");
});
describe("https://example.co.uk ", () => {
  tester("https://", "", "", "example", ".co", ".uk", "");
});

//SINGLE SITE NAME | DOUBLE DOMAIN | HTTP
describe("http://www.example.co.uk/maps/place/Big+Ben/", () => {
  tester("http://", "www.", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("http://example.co.uk/maps/place/Big+Ben/", () => {
  tester("http://", "", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("http://www.example.co.uk", () => {
  tester("http://", "www.", "", "example", ".co", ".uk", "");
});
describe("http://example.co.uk ", () => {
  tester("http://", "", "", "example", ".co", ".uk", "");
});

//SINGLE SITE NAME |DOUBLE DOMAIN | NO PROTOCOL
describe("www.example.co.uk/maps/place/Big+Ben/", () => {
  tester("", "www.", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("example.co.uk/maps/place/Big+Ben/", () => {
  tester("", "", "", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("www.example.co.uk", () => {
  tester("", "www.", "", "example", ".co", ".uk", "");
});
describe("example.co.uk ", () => {
  tester("", "", "", "example", ".co", ".uk", "");
});

// DOUBLE SITE NAME | SINGLE DOMAIN | HTTPS
describe("https://www.maps.example.com/maps/place/Big+Ben/", () => {
  tester("https://", "www.", "maps.maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("https://maps.example.com/maps/place/Big+Ben/", () => {
  tester("https://", "", "maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("https://www.maps.example.com", () => {
  tester("https://", "www.", "maps.", "example", ".com", "", "");
});
describe("https://maps.example.com ", () => {
  tester("https://", "", "maps.", "example", ".com", "", "");
});

//DOUBLE SITE NAME | SINGLE DOMAIN | HTTP
describe("http://www.maps.example.com/maps/place/Big+Ben/", () => {
  tester("http://", "www.", "maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("http://maps.example.com/maps/place/Big+Ben/", () => {
  tester("http://", "", "maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("http://www.maps.example.com", () => {
  tester("http://", "www.", "maps.", "example", ".com", "", "");
});
describe("http://maps.example.com ", () => {
  tester("http://", "", "maps.", "example", ".com", "", "");
});

//DOUBLE SITE NAME |SINGLE DOMAIN | NO PROTOCOL
describe("www.maps.example.com/maps/place/Big+Ben/", () => {
  tester("", "www.", "maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("maps.example.com/maps/place/Big+Ben/", () => {
  tester("", "", "maps.", "example", ".com", "", "/maps/place/Big+Ben/");
});
describe("www.maps.example.com", () => {
  tester("", "www.", "maps.", "example", ".com", "", "");
});
describe("maps.example.com ", () => {
  tester("", "", "maps.", "example", ".com", "", "");
});

// DOUBLE SITE NAME | DOUBLE DOMAIN | HTTPS
describe("https://www.maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("https://", "www.", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("https://maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("https://", "", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("https://www.maps.example.co", () => {
  tester("https://", "www.", "maps.", "example", ".co", ".uk", "");
});
describe("https://maps.example.co.uk ", () => {
  tester("https://", "", "maps.", "example", ".co", ".uk", "");
});

//DOUBLE SITE NAME | DOUBLE DOMAIN | HTTP
describe("http://www.maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("http://", "www.", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("http://maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("http://", "", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("http://www.maps.example.co.uk", () => {
  tester("http://", "www.", "maps.", "example", ".co", ".uk", "");
});
describe("http://maps.example.co.uk ", () => {
  tester("http://", "", "maps.", "example", ".co", ".uk", "");
});

//DOUBLE SITE NAME |DOUBLE DOMAIN | NO PROTOCOL
describe("www.maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("", "www.", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("maps.example.co.uk/maps/place/Big+Ben/", () => {
  tester("", "", "maps.", "example", ".co", ".uk", "/maps/place/Big+Ben/");
});
describe("www.maps.example.co.uk", () => {
  tester("", "www.", "maps.", "example", ".co", ".uk", "");
});
describe("maps.example.co.uk ", () => {
  tester("", "", "maps.", "example", ".co", ".uk", "");
});
