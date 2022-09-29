import clipper from "./index.js";
import { errors } from "./helpers.js";
import jest from "jest-mock";

/*
https://www.google.com/maps/place/Big+Ben/
[http://, https://, none] + [www, maps, none] + . + google + . + [.com, .co.uk] + [/maps/place/Big+Ben, none]

- ✅ http://www.google.com/maps/place/Big+Ben/
- ✅ http://www.google.com
- ✅ http://www.google.co.uk/maps/place/Big+Ben/
- ✅ http://www.google.co.uk
- ✅ http://maps.google.com/maps/place/Big+Ben/
- DAN
- ✅ http://maps.google.com
- ✅ http://maps.google.co.uk/maps/place/Big+Ben/
- ✅ http://maps.google.co.uk
- ✅ http://google.com/maps/place/Big+Ben/
- ✅ http://google.com
- ✅ http://google.co.uk/maps/place/Big+Ben/
- ✅ http://google.co.uk
- ✅ https://www.google.com/maps/place/Big+Ben/
- ✅ https://www.google.com
- ✅ https://www.google.co.uk/maps/place/Big+Ben/
- ✅ https://www.google.co.uk
- ✅ https://maps.google.com/maps/place/Big+Ben/
- ✅ https://maps.google.com
- ✅ https://maps.google.co.uk/maps/place/Big+Ben/
- ✅ https://maps.google.co.uk
- ✅ https://google.com/maps/place/Big+Ben/
- PHILIP
- https://google.com ✅
- https://google.co.uk/maps/place/Big+Ben/ ✅
- https://google.co.uk ✅
- www.google.com/maps/place/Big+Ben/ ✅
- www.google.com ✅
- www.google.co.uk/maps/place/Big+Ben/ ✅
- www.google.co.uk ✅
- maps.google.com/maps/place/Big+Ben/✅
- maps.google.com ✅
- maps.google.co.uk/maps/place/Big+Ben/ ✅
- maps.google.co.uk ✅
- google.com/maps/place/Big+Ben/ ✅
- google.com ✅
- google.co.uk/maps/place/Big+Ben/ ✅
- google.co.uk ✅

clipper(none), clipper(shorten), clipper(remove)
clipper(none, shorten), clipper(shorten, shorten), clipper(remove, shorten)
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

describe("http://www.google.com/maps/place/Big+Ben/", () => {
  const url = "http://www.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
  });
});

describe("http://www.google.com", () => {
  const url = "http://www.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com");
  });

  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.google.com" and log the "path" error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com" and log the "path" error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" and log the "path" error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://www.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://www.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.google.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("http://www.google.co.uk", () => {
  const url = "http://www.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://www.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.co.uk");
  });

  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://www.google.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the "path" error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://maps.google.com/maps/place/Big+Ben/", () => {
  const url = "http://maps.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
  });
});

describe("http://maps.google.com", () => {
  const url = "http://maps.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com");
  });

  test(`clipper(url, "remove") should return "maps.google.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://maps.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://maps.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.google.co.uk`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
  });
});

describe("http://maps.google.co.uk", () => {
  const url = "http://maps.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "remove") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://google.com/maps/place/Big+Ben/", () => {
  const url = "http://google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
  });
});

describe("http://google.com", () => {
  const url = "http://google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://maps.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("google.com");
  });

  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "http://google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("http://google.co.uk/maps/place/Big+Ben/", () => {
  const url = "http://google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "http://google.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("http://google.co.uk", () => {
  const url = "http://google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "http://google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "http://google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "http://google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://www.google.com/maps/place/Big+Ben/", () => {
  const url = "https://www.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
  });
});

describe("https://www.google.com", () => {
  const url = "https://www.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com");
  });

  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://www.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://www.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.google.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("https://www.google.co.uk", () => {
  const url = "https://www.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://www.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.co.uk");
  });

  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://www.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://maps.google.com/maps/place/Big+Ben/", () => {
  const url = "https://maps.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
  });
});

describe("https://maps.google.com", () => {
  const url = "https://maps.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com");
  });

  test(`clipper(url, "remove") should return "maps.google.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.com" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://maps.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://maps.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "remove") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.google.co.uk"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.google.co.uk");
  });
  ``;

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
  });
  ``;

  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
  });
  ``;
});

describe("https://maps.google.co.uk", () => {
  const url = "https://maps.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://maps.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "remove") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk" and log the 'path' error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://google.com/maps/place/Big+Ben/", () => {
  const url = "https://google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.com");
  });

  test(`clipper(url, "remove", "shorten") should return "google.com"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
  });
});

describe("https://google.com", () => {
  const url = "https://google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("google.com");
  });

  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "https://google.com" and log the path error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.com" and log the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("https://google.co.uk/maps/place/Big+Ben/", () => {
  const url = "https://google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "https://google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("https://google.co.uk", () => {
  const url = "https://google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "https://google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "https://google.co.uk" and log the path error message `, () => {
    expect(clipper(url, "none", "shorten")).toBe("https://google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk" and log the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("www.google.com/maps/place/Big+Ben/", () => {
  const url = "www.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com/maps/place/Big+Ben/");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "www.google.com" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
  });
});

describe("www.google.com", () => {
  const url = "www.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "www.google.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.com" and log both the protocol and the path error messages`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.com" and log the path error message `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("www.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "www.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe(
      "www.google.co.uk/maps/place/Big+Ben/"
    );
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "www.google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("www.google.co.uk", () => {
  const url = "www.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "www.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "www.google.co.uk" and display the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "www.google.co.uk" and log both the protocol and the path error messages`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the path error message `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("maps.google.com/maps/place/Big+Ben/", () => {
  const url = "maps.google.com/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com/maps/place/Big+Ben/" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com/maps/place/Big+Ben/");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.google.com/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "maps.google.com"`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.google.com");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.google.com" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
  });
});

describe("maps.google.com", () => {
  const url = "maps.google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.google.com"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.com");
  });

  test(`clipper(url, "none", "shorten") should return "maps.google.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.com" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.google.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("maps.google.co.uk/maps/place/Big+Ben/", () => {
  const url = "maps.google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe(
      "maps.google.co.uk/maps/place/Big+Ben/"
    );
  });

  test(`clipper(url, "none", "shorten") should return "maps.google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
  });
});

describe("maps.google.co.uk", () => {
  const url = "maps.google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "maps.google.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "maps.google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("maps.google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "maps.google.co.uk" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "maps.google.co.uk" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "maps.google.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("google.co.uk/maps/place/Big+Ben/", () => {
  const url = "google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  //What error message here?
  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "google.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("google.com", () => {
  const url = "google.com";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.com" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });

  test(`clipper(url, "none", "shorten") should return "google.com" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.com" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "google.com" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});

describe("google.co.uk/maps/place/Big+Ben/", () => {
  const url = "google.co.uk/maps/place/Big+Ben/";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  //What error message here?
  test(`clipper(url, "remove") should return "google.co.uk/maps/place/Big+Ben/"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk/maps/place/Big+Ben/");
  });

  test(`clipper(url, "none", "shorten") should return "google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("google.co.uk");
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk" and log the protocol error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "google.co.uk" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
  });
});

describe("google.co.uk", () => {
  const url = "google.co.uk";
  console.error = jest.fn();

  test(`clipper(url, "none") should return "google.co.uk"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "google.co.uk" and log the protocol erros`, () => {
    expect(clipper(url, "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
  });

  //What error message here?
  test(`clipper(url, "remove") should return "google.co.uk"`, () => {
    expect(clipper(url, "remove")).toBe("google.co.uk");
  });

  test(`clipper(url, "none", "shorten") should return "google.co.uk" and log the path error`, () => {
    expect(clipper(url, "none", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  test(`clipper(url, "shorten", "shorten") should return "google.co.uk" and log both the protocol and the path error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.protocol);
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });

  // what error message?
  test(`clipper(url, "remove", "shorten") should return "google.co.uk" and log the path error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.co.uk");
    expect(console.error).toHaveBeenCalledWith(errors.path);
  });
});
