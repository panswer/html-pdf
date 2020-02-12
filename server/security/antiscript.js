const SearchScrypt = (text) => {
    return /script/ig.test(text);
}

module.exports = {
    SearchScrypt
}