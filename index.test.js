import clipper, { errors } from "./index.js";
import jest from "jest-mock";

/*
https://www.google.com/maps/place/Big+Ben/
[http://, https://, none] + [www, maps, none] + . + google + . + [.com, .co.uk] + [/maps/place/Big+Ben, none]

- ✅ http://www.google.com/maps/place/Big+Ben/
- ✅ http://www.google.com
- http://www.google.co.uk/maps/place/Big+Ben/
- http://www.google.co.uk
- http://maps.google.com/maps/place/Big+Ben/
- http://maps.google.com
- http://maps.google.co.uk/maps/place/Big+Ben/
- http://maps.google.co.uk
- http://google.com/maps/place/Big+Ben/
- http://google.com
- http://google.co.uk/maps/place/Big+Ben/
- http://google.co.uk
- https://www.google.com/maps/place/Big+Ben/
- https://www.google.com
- https://www.google.co.uk/maps/place/Big+Ben/
- https://www.google.co.uk
- https://maps.google.com/maps/place/Big+Ben/
- https://maps.google.com
- https://maps.google.co.uk/maps/place/Big+Ben/
- https://maps.google.co.uk
- https://google.com/maps/place/Big+Ben/
- https://google.com
- https://google.co.uk/maps/place/Big+Ben/
- https://google.co.uk
- www.google.com/maps/place/Big+Ben/
- www.google.com
- www.google.co.uk/maps/place/Big+Ben/
- www.google.co.uk
- maps.google.com/maps/place/Big+Ben/
- maps.google.com
- maps.google.co.uk/maps/place/Big+Ben/
- maps.google.co.uk
- google.com/maps/place/Big+Ben/
- google.com
- google.co.uk/maps/place/Big+Ben/
- google.co.uk

clipper(none), clipper(shorten), clipper(remove)
clipper(none, shorten), clipper(shorten, shorten), clipper(remove, shorten)
*/

describe("http://www.google.com/maps/place/Big+Ben/", () => {
  const url = "http://www.google.com/maps/place/Big+Ben/";
  console.log = jest.fn();

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
  console.log = jest.fn();

  test(`clipper(url, "none") should return "http://www.google.com"`, () => {
    expect(clipper(url, "none")).toBe(url);
  });

  test(`clipper(url, "shorten") should return "www.google.com"`, () => {
    expect(clipper(url, "shorten")).toBe("www.google.com");
  });
  
  test(`clipper(url, "remove") should return "google.com"`, () => {
    expect(clipper(url, "remove")).toBe("google.com");
  });
  
  test(`clipper(url, "none", "shorten") should return "http://www.google.com" and log the "directories" error message`, () => {
    expect(clipper(url, "none", "shorten")).toBe("http://www.google.com");
    expect(console.log).toHaveBeenCalledWith(errors.directories);
  });
  
  test(`clipper(url, "shorten", "shorten") should return "www.google.com" and log the "directories" error message`, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("www.google.com");
    expect(console.log).toHaveBeenCalledWith(errors.directories);
  });
  
  test(`clipper(url, "remove", "shorten") should return "google.com" and log the "directories" error message`, () => {
    expect(clipper(url, "remove", "shorten")).toBe("google.com");
    expect(console.log).toHaveBeenCalledWith(errors.directories);
  });
});

describe("maps.google.co.uk/whatever", () => {
  const url = "maps.google.co.uk/whatever";
  console.log = jest.fn();

  test(`When the settings are set to start = "shorten" and end="shorten", it should return "maps.google.co.uk" and log "ERROR: It looks like your link does not include "https://" nor "http://"" `, () => {
    expect(clipper(url, "shorten", "shorten")).toBe("maps.google.co.uk");
    expect(console.log).toHaveBeenCalledWith(
      'ERROR: It looks like your link does not include "https://" nor "http://"'
    );
  });
  test(`When the settings are set to start = "remove" and end="shorten", it should return "maps.google.co.uk" and log "ERROR: It looks like your link does not include "www"" `, () => {
    expect(clipper(url, "remove", "shorten")).toBe("maps.google.co.uk");
    expect(console.log).toHaveBeenCalledWith(
      'ERROR: It looks like your link does not include "www"'
    );
  });
  test(`When the settings are set to start = "none" and end="shorten", it should return "maps.google.co.uk" `, () => {
    expect(clipper(url, "none", "shorten")).toBe("maps.google.co.uk");
  });
  test(`When the settings are set to start = "shorten" without the end option, it should return "maps.google.co.uk/whatever" and log "ERROR: It looks like your link does not include "https://" nor "http://"" `, () => {
    expect(clipper(url, "shorten")).toBe("maps.google.co.uk/whatever");
    expect(console.log).toHaveBeenCalledWith(
      'ERROR: It looks like your link does not include "https://" nor "http://"'
    );
  });
  test(`When the settings are set to start = "remove" without the end option, it should return "maps.google.co.uk/whatever" and log "ERROR: It looks like your link does not include "www"" `, () => {
    expect(clipper(url, "remove")).toBe("maps.google.co.uk/whatever");
    expect(console.log).toHaveBeenCalledWith(
      'ERROR: It looks like your link does not include "www"'
    );
  });
});
