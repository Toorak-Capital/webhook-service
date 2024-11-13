const proxyquire = require('proxyquire').noCallThru();

/**
 * Retrieves a proxified server object for testing by stubbing controller logic.
 *
 * @param {string} routePath - The path to the route file to be stubbed.
 * @param {string} controllerPath - The route's path to the controller file to be stubbed.
 * @param {object} controllerStub - An object containing controller stub properties
 * and values for routers.
 * @returns {object} A fastify server object with stubbed controller logic.
 * @example
 * const server = getProxifiedServer(
 *    '../../routes/template-routes',
 *    '../controllers/notification-controller',
 *    { getTemplate: sandbox.stub().resolves(routeRes.getTemplateResponse) },
 * );
 */
function getProxifiedServer(routePath, controllerPath, controllerStub) {
  const routes = proxyquire.noCallThru().load(routePath, {
    [controllerPath]: controllerStub,
  });
  const server = proxyquire.noCallThru().load('../../server.js', {
    './routes': routes,
  });
  return server;
}

module.exports = {
  getProxifiedServer,
};
