import clipper from "./index.js";
import jest from "jest-mock";

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
