function clipper(url) {
    if (url.length > 5) {
        return 'URL is > 5 characters'
    } else {
        return 'URL is < 5 characters'
    }
}

export default clipper