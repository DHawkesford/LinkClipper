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

describe("http://www.example.com/maps/place/Big+Ben/", () => {
  const url = "http://www.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });

  test(`clipper(url, "none", "remove") should return "http://www.example"`, () => {
    expect(clipper(url, "none")).toBe("http://www.example");
  });
  test(`clipper(url, "shorten", "remove") should return "www.example"`, () => {
    expect(clipper(url, "none")).toBe("www.example");
  });
  test(`clipper(url, "remove", "remove") should return "example"`, () => {
    expect(clipper(url, "none")).toBe("example");
  });
});

describe("http://www.example.com", () => {
  const url = "http://www.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.example.com" and log the "path" error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com" and log the "path" error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" and log the "path" error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://www.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://www.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.example.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("http://www.example.co.uk", () => {
  const url = "http://www.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.co.uk");
  });

  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.example.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://maps.example.com/maps/place/Big+Ben/", () => {
  const url = "http://maps.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.com/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
  });
});

describe("http://maps.example.com", () => {
  const url = "http://maps.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.com");
  });

  test(`clipper(url, "remove") should return "maps.example.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://maps.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://maps.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.example.co.uk`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
  });
});

describe("http://maps.example.co.uk", () => {
  const url = "http://maps.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "remove") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://example.com/maps/place/Big+Ben/", () => {
  const url = "http://example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });
});

describe("http://example.com", () => {
  const url = "http://example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("example.com");
  });

  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://example.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://example.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("http://example.co.uk", () => {
  const url = "http://example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "http://example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://www.example.com/maps/place/Big+Ben/", () => {
  const url = "https://www.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });
});

describe("https://www.example.com", () => {
  const url = "https://www.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://www.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://www.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.example.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("https://www.example.co.uk", () => {
  const url = "https://www.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.co.uk");
  });

  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://maps.example.com/maps/place/Big+Ben/", () => {
  const url = "https://maps.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.com/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
  });
});

describe("https://maps.example.com", () => {
  const url = "https://maps.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.com");
  });

  test(`clipper(url, "remove") should return "maps.example.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://maps.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://maps.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.example.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.example.co.uk");
  });
  ``;

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
  });
  ``;

  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
  });
  ``;
});

describe("https://maps.example.co.uk", () => {
  const url = "https://maps.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "remove") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://example.com/maps/place/Big+Ben/", () => {
  const url = "https://example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.com");
  });

  test(`clipper(url, "remove", "shorten") should return "example.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });
});

describe("https://example.com", () => {
  const url = "https://example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.com"`, () => {
    expect(clipper(url, "shorten")).toBe("example.com");
  });

  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://example.com" and log the path error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.com" and log the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://example.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://example.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("https://example.co.uk", () => {
  const url = "https://example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://example.co.uk" and log the path error message `, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk" and log the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("www.example.com/maps/place/Big+Ben/", () => {
  const url = "www.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com/maps/place/Big+Ben/");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "www.example.com" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
  });
});

describe("www.example.com", () => {
  const url = "www.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "www.example.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.com" and log both the protocol and the path error messages`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.com" and log the path error message `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("www.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "www.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.example.co.uk/maps/place/Big+Ben/"
    );
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "www.example.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("www.example.co.uk", () => {
  const url = "www.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.example.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "www.example.co.uk" and display the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.example.co.uk" and log both the protocol and the path error messages`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the path error message `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("maps.example.com/maps/place/Big+Ben/", () => {
  const url = "maps.example.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.com/maps/place/Big+Ben/"
    );
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.example.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "maps.example.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.example.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.example.com" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
  });
});

describe("maps.example.com", () => {
  const url = "maps.example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.example.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.com");
  });

  test(`clipper(url, "none", "shorten") should return "maps.example.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.com" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.example.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("maps.example.co.uk/maps/place/Big+Ben/", () => {
  const url = "maps.example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.example.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "maps.example.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
  });
});

describe("maps.example.co.uk", () => {
  const url = "maps.example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.example.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "maps.example.co.uk" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.example.co.uk" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.example.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("example.co.uk/maps/place/Big+Ben/", () => {
  const url = "example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  //What error message here?
  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "example.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "example.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
  });
});

describe("example.com", () => {
  const url = "example.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "example.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "example.com"`, () => {
    expect(clipper(url, "remove")).toBe("example.com");
  });

  test(`clipper(url, "none", "shorten") should return "example.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.com" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "example.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("example.co.uk/maps/place/Big+Ben/", () => {
  const url = "example.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  //What error message here?
  test(`clipper(url, "remove") should return "example.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "example.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("example.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "example.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.noStart);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("example.co.uk", () => {
  const url = "example.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "example.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "example.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "example.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("example.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "example.co.uk" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "example.co.uk" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "example.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("example.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});
