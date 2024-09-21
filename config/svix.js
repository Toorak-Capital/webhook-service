const { Webhook } = require('svix');

let svixWebhook;

module.exports = {
  getSvixAuth: (secret) => {
    if (!svixWebhook) {
      svixWebhook = new Webhook(secret);
    }
    return svixWebhook;
  },
};
