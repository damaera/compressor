const api = require("./api");

module.exports = function(req, res) {
  const { tag } = req.query;
  if (tag) {
    api.database
      .getDiscussions("trending", {
        tag,
        limit: 50,
        truncate_body: 1
      })
      .then(collection => {
        const related = {};
        collection.forEach(data => {
          try {
            const { tags } = JSON.parse(data.json_metadata);
            tags.forEach(item => {
              const relatedTag = related[item];
              if (tag === item) {
              } else if (!relatedTag) {
                related[item] = 1;
              } else {
                related[item] = relatedTag + 1;
              }
            });
          } catch (e) {}
        });
        const relatedSorted = Object.keys(related)
          .sort((a, b) => related[b] - related[a])
          .reduce((obj, key) => ({ ...obj, [key]: related[key] }), {});
        res.json(relatedSorted);
      });
  }
};
