const { expect } = require('chai');
const buildFastify = require('../server');

describe('Fastify Server Tests', () => {
  let fastify;

  before(async () => {
    fastify = await buildFastify();
  });

  it('should return 200 for health check', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/webhook/health',
    });

    expect(response.statusCode).to.equal(200);
  });

  it('should return API version info', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    });

    const responseBody = JSON.parse(response.payload);
    expect(response.statusCode).to.equal(200);
    expect(responseBody).to.have.property('api');
    expect(responseBody).to.have.property('version');
  });

  it('should return 200 for Swagger UI documentation', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/webhook/docs',
    });

    expect(response.statusCode).to.equal(200);
    expect(response.headers['content-type']).to.include('text/html');
  });

  it('should return 200 for the metrics endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/webhook/metrics',
    });

    expect(response.statusCode).to.equal(200);
  });

  const routes = require('../routes');
  routes.forEach((route) => {
    it(`should return correct response for ${route.method} ${route.url}`, async () => {
      const response = await fastify.inject({
        method: route.method,
        url: `/api/v1/webhook${route.url}`,
      });

      expect(response.statusCode).to.be.oneOf([200, 201, 400, 404]);
    });
  });
});
