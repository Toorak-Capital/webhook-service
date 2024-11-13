const sinon = require('sinon');
const { expect } = require('chai');
const server = require('../server');
const routes = require('../routes');
const common = require('../common');

const { logger } = common;

describe('Fastify Server Tests', () => {
  let fastify;

  before(async () => {
    fastify = await server.buildFastify();
  });

  describe('buildFastify suite', () => {
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

  describe('startServer suite', () => {
    let sandbox;
    let buildFastifyStub;
    let listenStub;
    let loggerErrorStub;
    let loggerInfoStub;
    let processExitStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      loggerErrorStub = sandbox.stub(logger, 'error');
      loggerInfoStub = sandbox.stub(logger, 'info');

      listenStub = sandbox.stub();
      buildFastifyStub = sandbox.stub(server, 'buildFastify').resolves({
        listen: listenStub,
      });

      processExitStub = sandbox.stub(process, 'exit');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call buildFastify and listen on the specified port', async () => {
      const port = 3000;
      listenStub.callsFake((options, callback) => callback(null, `http://localhost:${port}`));

      await server.startServer();

      expect(buildFastifyStub.calledOnce).to.be.true;
      expect(listenStub.calledOnceWith({
        port: process.env.PORT || port,
        host: '0.0.0.0',
      })).to.be.true;
      expect(loggerInfoStub.calledOnceWith(`Server is now listening on http://localhost:${port}`)).to.be.true;
    });

    it('should log an error and exit if the listen callback has an error', async () => {
      const error = new Error('Listen error');
      listenStub.callsFake((options, callback) => callback(error));

      await server.startServer();

      expect(loggerErrorStub.calledOnceWith(error)).to.be.true;
      expect(processExitStub.calledOnceWith(1)).to.be.true;
    });

    it('should log info message with server address on successful start', async () => {
      const address = 'http://localhost:3000';
      listenStub.callsFake((options, callback) => callback(null, address));

      await server.startServer();

      expect(loggerInfoStub.calledOnceWith(`Server is now listening on ${address}`)).to.be.true;
    });
  });
});
