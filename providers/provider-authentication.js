const svix = require('../config/svix');

/**
 * uses Svix library to authenticate request
 *
 * @param {object} request fastify request object
 * @example verifySitewireSignature(request)
 * @returns {object | string} request body
 */
function verifySitewireSignature(request) {
  const { body, headers, providerMap } = request;
  const { secret } = providerMap;
  const svixAuth = svix.getSvixAuth(secret);
  const bodyStr = JSON.stringify(body);
  return svixAuth.verify(bodyStr, headers);
}

module.exports = {
  verifySitewireSignature,
};
