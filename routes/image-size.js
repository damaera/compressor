var probe = require("probe-image-size");

module.exports = function(req, res) {
  const images = [
    "https://steemitimages.com/DQmZATEMbVHH6NkEAZ6CK1P23K6jgKHJi9ZC8RsdGp26vE8/image.png",
    "https://steemitimages.com/DQmUAJyg2xhuft1F4CuYWQquFjtrGssRALALS1R5nYo4j5K/image.png",
    "https://steemitimages.com/DQmVZVU9QKBk7cHyZACNRmEffnJxyWAegC5ixLtypb88gUz/image.png",
    "https://img.youtube.com/vi/-KFvk5ThFiM/0.jpg",
    // "http://i.imgur.com/hHJVJtc.png", //imgur ssl expired indihome tsel
    // "https://i.imgur.com/hqVIUl2.png",
    // "https://i.imgur.com/wP5Nanv.png",
    // "https://i.imgur.com/w5ZmMxL.png",
    "https://steemitimages.com/DQmcf1grL7683B9qDWAdDB3KTBcW4beJS3a5WkqH6J5suhN/image.png",
    "https://steemitstageimages.com/DQmRLd5R8k8y8LfkX59HagCebsYs3WEpwRELKvnLrSWs5Tu/steem.png",
    "https://steemitimages.com/0x0/https://cdn.discordapp.com/attachments/359978261146763264/433217727360925696/smartsteem_logo_wide.png",
    "https://steemitimages.com/DQmcUaReshDyqTmddae2vrHzstfdZqp2yAjPrL4Dgmn2g3U/image.png"
  ];

  const promises = [];

  images.forEach(image => {
    const promise = new Promise((resolve, reject) => {
      probe(image, { timeout: 5000 })
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
    promises.push(promise);
  });

  console.log(promises);

  Promise.all(promises)
    .then(values => {
      res.json(values);
    })
    .catch(err => res.json(err));
};
