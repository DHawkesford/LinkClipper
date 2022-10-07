## Version 2.0.0 to do:

1. ✅ Replace console logs with errors, and add in try-catch blocks
   -adjust tests accordingly
2. ✅ Pull the little functions out into separate components (helpers)
3. ✅ Input validation to check whether the URL is a string.
4. ✅ Add toUppercase so that the thing works regardless of casing of arguments (e.g. "remove" vs "Remove" vs "REMOVE") 
5. ✅ Find a way to clip the domain name (API/package?) 
6. Include Chris Miller in acknowledgements in Readme.
7. ✅ Refactor the Regex
8. Refactor helpers.js to make it more uniform
   -clipStart has more & different if conditions than clipEnd
   -clipStart throws an error at clipping stage whilst clipEnd throws it at index computation stage (this may r may not be a problem)
   -IndicesStart are an object but the end indices are free-floating variables. 
9. Redo the test suite

KNOWN BUGS:
❗Account for URLs such as broadway.com where the site name also happens to be a TLD ❗