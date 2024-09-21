const svix = require('../config/svix');

/**
 * uses Svix library to authenticate request
 *
 * @param {object} request fastify request object
 * @example verifySitewireSignature(request)
 * @returns {object | string} request body
 */
function verifySitewireSignature(request) {
  const svixAuth = svix.getSvixAuth(process.env.SITEWIRE_SECRET);
  const body = JSON.stringify(request.body);
  return svixAuth.verify(body, request.headers);
}

module.exports = {
  verifySitewireSignature,
};
