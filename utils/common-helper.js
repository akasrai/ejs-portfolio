function getExcerpt(str, limit) {
  let shortText = str;
  shortText = shortText.substr(0, shortText.lastIndexOf(' ', limit)) + '...';

  return shortText;
}

module.exports = {
  getExcerpt
};
