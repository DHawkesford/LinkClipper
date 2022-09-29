export const errors = {
    protocol: `ERROR: It looks like your link does not include "https://" nor "http://"`,
    www: `ERROR: It looks like your link does not include "www"`,
    path: `ERROR: It looks like your link does not include a path`,
};


export function clipStart(url, start) {
    const indicesStart = {
        h: url.indexOf("://"),
        w: url.indexOf("www"),
    };

    var slicedURL = url;

    try {
        if (start === "shorten" && indicesStart.h >= 0) {
            // If there's a protocol
            slicedURL = url.slice(indicesStart.h + 3);
        } else if (start === "remove" && indicesStart.w >= 0) {
            // If there's a 'www'
            slicedURL = url.slice(indicesStart.w + 4);
        } 
        else if (start === "remove" && indicesStart.w < 0 && indicesStart.h >= 0) {
            // If there's a protocol but no 'www'
            slicedURL = url.slice(indicesStart.h + 3);
        }
        // If there's no protocol:
        else if (start === "shorten" && indicesStart.h < 0) throw errors.protocol;
    } catch (err) {
        console.error(err);
    }

    return slicedURL;
}

export function clipEnd(url, end) {
    var slicedURL = url;

    try {
        let indexSlash = url.indexOf("/", slicedURL.indexOf("://") + 3);
      
        if (url.indexOf("://") < 0) {
          indexSlash = url.indexOf("/");
        }
      
        if (end === "shorten" && indexSlash >= 0) {
          slicedURL = url.slice(0, indexSlash);
        } else if (end === "shorten" && indexSlash < 0) throw errors.path;
    } catch (err) {
        console.error(err);
    }

    return slicedURL;
}