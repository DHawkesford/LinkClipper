import clipper from "./index.js";
import { errors } from "./helpers.js";
import jest from "jest-mock";

/*
https://www.example.com/maps/place/Big+Ben/
[http://, https://, none] + [www, maps, none] + . + example + . + [.com, .co.uk] + [/maps/place/Big+Ben, none]

- ✅ http://www.example.com/maps/place/Big+Ben/
- ✅ http://www.example.com
- ✅ http://www.example.co.uk/maps/place/Big+Ben/
- ✅ http://www.example.co.uk
- ✅ http://maps.example.com/maps/place/Big+Ben/
- DAN
- ✅ http://maps.example.com
- ✅ http://maps.example.co.uk/maps/place/Big+Ben/
- ✅ http://maps.example.co.uk
- ✅ http://example.com/maps/place/Big+Ben/
- ✅ http://example.com
- ✅ http://example.co.uk/maps/place/Big+Ben/
- ✅ http://example.co.uk
- ✅ https://www.example.com/maps/place/Big+Ben/
- ✅ https://www.example.com
- ✅ https://www.example.co.uk/maps/place/Big+Ben/
- ✅ https://www.example.co.uk
- ✅ https://maps.example.com/maps/place/Big+Ben/
- ✅ https://maps.example.com
- ✅ https://maps.example.co.uk/maps/place/Big+Ben/
- ✅ https://maps.example.co.uk
- ✅ https://example.com/maps/place/Big+Ben/
- PHILIP
- https://example.com ✅
- https://example.co.uk/maps/place/Big+Ben/ ✅
- https://example.co.uk ✅
- www.example.com/maps/place/Big+Ben/ ✅
- www.example.com ✅
- www.example.co.uk/maps/place/Big+Ben/ ✅
- www.example.co.uk ✅
- maps.example.com/maps/place/Big+Ben/✅
- maps.example.com ✅
- maps.example.co.uk/maps/place/Big+Ben/ ✅
- maps.example.co.uk ✅
- example.com/maps/place/Big+Ben/ ✅
- example.com ✅
- example.co.uk/maps/place/Big+Ben/ ✅
- example.co.uk ✅

clipper(none), clipper(shorten), clipper(remove)
clipper(none, shorten), clipper(shorten, shorten), clipper(remove, shorten)

var www = "www."
protocol = "https://"
name1 = "example"
name2= "maps"
tld1 ="co"
told2 = "uk"



test: 
let url = www+.+protocol+.+name+.+tld1
expect xdfadsgfs toBe 
*/

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

describe("http://www.example.com/maps/place/Big+Ben/", () => {
  var protocol = "http://";
  var www = "www.";
  var siteName1 = "";
  var siteName2 = "example";
  var tld1 = ".com";
  var tld2 = "";
  var path = "/maps/place/Big+Ben/";
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
});

describe("http://www.example.com", () => {
  var protocol = "http://";
  var www = "www.";
  var siteName1 = "";
  var siteName2 = "example";
  var tld1 = ".com";
  var tld2 = "";
  var path = "";
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
});

describe("https://maps.example.co.uk", () => {
  var protocol = "https://";
  var www = "";
  var siteName1 = "maps.";
  var siteName2 = "example";
  var tld1 = ".co";
  var tld2 = ".uk";
  var path = "";
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
});
