const api = require("./api");
const readingTime = require("reading-time");

module.exports = function(req, res) {
  const {
    sortBy,
    user,
    limit,
    tag,
    // truncate_body,
    start_permlink,
    start_author
  } = req.query;

  api.database
    .getDiscussions(sortBy || "trending", {
      limit: limit || 10,
      tag,
      // truncate_body,
      start_permlink,
      start_author
    })
    .then(collection => {
      const result = collection.map(data => {
        const item = {
          id: data.id,
          title: data.title,
          author: data.author,
          permlink: data.permlink,
          category: data.category,
          created: data.created,
          comment_counts: data.children,
          is_voted: false,
          value: data.pending_payout_value.split(" ")[0] * 1,
          poster: "",
          tags: [],
          reading_time: {}
          // metadata: {},
          // beneficiaries: data.beneficiaries,
        };
        // votes
        const votesLength = data.active_votes.length;
        item.votes_counts = votesLength;

        if (user) {
          let isVoted = false;
          for (let i = 0; i < votesLength; i++) {
            const vote = data.active_votes[i];
            if (user === vote.voter) {
              isVoted = true;
              break;
            }
          }
          item.is_voted = isVoted;
        }
        try {
          metadata = JSON.parse(data.json_metadata);
          // item.metadata = metadata;
          // poster
          if (metadata.image && metadata.image.length) {
            item.poster = metadata.image[0];
          } else if (
            // dtube
            metadata.video &&
            metadata.video.info &&
            metadata.video.info.snaphash
          ) {
            item.poster =
              "https://ipfs.io/ipfs/" + metadata.video.info.snaphash;
          }

          if (metadata.tags.length) {
            item.tags = metadata.tags;
          }
        } catch (e) {}

        // if (item.body) {
        console.log(item.body);
        item.reading_time = readingTime(data.body);
        // }

        return item;
      });
      res.json(result);
    })
    .catch(err => res.json(err));
  // res.json({ query: req.query });
};
