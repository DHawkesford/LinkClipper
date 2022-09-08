import clipper from './index.js';

describe("maps.google.co.uk/whatever", () => {
    const url = "maps.google.co.uk/whatever";

    test(``, () => {
      expect(clipper(url, 'shorten', 'shorten')).toBe('maps.google.co.uk');
    });

});