# LinkClipper

View the NPM package [here](https://www.npmjs.com/package/linkclipper).

LinkClipper is a package to help developers to easily shorten any URLs that they want to display to users in their apps.

For example you may have a resource-sharing app where users can submit their own links to share with others, and you have a page where you want to display a list of resources to the users, where each resource has a title, link, description, tags etc. However you don't want to show the full link address (such as 'https://www.stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array'), you just want to show the site name (such as 'stackoverflow.com'). LinkClipper can handle this URL shortening for you automatically.

![A screenshot summarising the above use-case.](./example.png)

## Contents

1. [Purpose](#purpose)

2. [Usage](#usage)

3. [Testing](#testing)

4. [Future plans](#future-plans)

5. [Acknowledgements](#acknowledgements)

6. [Contributors](#contributors)

## Purpose

With this project our goals were to:

- Create a simple package that would be helpful for other developers.
- Learn npm publishing: how to publish a package, how to manage version control, among others.
- Learn Test Driven Development.

We believe we achieved all of those goals, especially the one about TDD. We've learned how useful tests can be as a guide to how we want the finished product to work. As can be seen from our 'index.test.js' file, we anticipated there being many different possible inputs for the URL string, as URLs can be written in a variety of ways. For example, a user may either include or exclude the 'http://' protocol in their URL string.

As such we saw this as a good opportunity to practice following the Test Driven Development method for building our package, as we could then be confident that our function was behaving as intended for all of the possible inputs at every step in the development process.

We also took this as an opportunity to practice following Test-Driven Development, and have created a comprehensive test suite using Jest. This approach helped us to ensure that LinkClipper is robust across all the possible test cases (i.e. all possible combinations of links with or without protocols, 'www', domain names and paths).

## Usage

### Installation

    npm i linkclipper

### Syntax

    clipper(url, start, end)

### Parameters

`url`

The URL string to be shortened.

`start`

The extent to which to clip the beginning of the URL string. The options are:

- `none`: Does not clip the beginning of the URL.

- `shorten`: Removes the protocol from the beginning of the URL (e.g. http://, https://, ftp://).

- `remove`: Removes the protocol and the 'www' subdomain from the beginning of the URL.

`end` [Optional]

The extent to which to clip the end of the URL string. Currently the only option is 'shorten'. If omitted, the end of the URL string will not be clipped.

- `shorten`: Removes the path from the end of the URL (i.e. everything that comes after '.com' or other domain).

- `remove`: Removes the path and the TLDs from the end of the URL (e.g. everything from '.com' onwards).

### Return value

A new string containing the clipped URL. The original string is not modified.

### Examples

    import clipper from 'linkclipper';

    const url = 'https://www.stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array';

    clipper(url, 'none') // OUTPUT: 'https://www.stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array'

    clipper(url, 'shorten') // OUTPUT: 'www.stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array'

    clipper(url, 'remove') // OUTPUT: 'stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array'

    clipper(url, 'none', 'shorten') // OUTPUT: 'https://www.stackoverflow.com'

    clipper(url, 'shorten', 'shorten') // OUTPUT: 'www.stackoverflow.com'

    clipper(url, 'remove', 'shorten') // OUTPUT: 'stackoverflow.com'

    clipper(url, 'none', 'remove') // OUTPUT: 'https://www.stackoverflow'

    clipper(url, 'shorten', 'remove') // OUTPUT: 'www.stackoverflow'

    clipper(url, 'remove', 'remove') // OUTPUT: 'stackoverflow'

## Testing

Tests for LinkClipper are located in index.test.js. To run the tests use your terminal to execute:

    npm run test

## Future plans

- ✅ *Included in version 2.0*

    Include an option for just obtaining the site name (e.g. 'github').

- KNOWN BUG:

    ❗LinkClipper does not currently account for URLs such as broadway.com where the site name also happens to be a TLD❗

## Acknowledgements

- Thank you to Chris Miller ([@ccmiller2018](https://github.com/ccmiller2018)) for providing feedback!

- [How To Create And Publish Your First NPM Package - Web Dev Simplified](https://www.youtube.com/watch?v=J4b_T-qH3BY&ab_channel=WebDevSimplified)

## Contributors

- Philip Kaminski ([GitHub](https://github.com/AureaFlamma) | [LinkedIn](https://www.linkedin.com/in/kaminskp/))
- Dan Hawkesford ([GitHub](https://github.com/dhawkesford/) | [LinkedIn](https://www.linkedin.com/in/daniel-hawkesford/))

[Back to top](#linkclipper)
