const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');

const server = require('../../server');
const mapper = require('../../providers/provider-mapper');
const authenticators = require('../../providers/provider-authentication');
const controllers = require('../../controllers');
const logger = require('../../common/logger');

describe(`${path.basename(__filename)} - Test Suite`, () => {
  describe('POST /api/v1/webhook/:provider Route Tests', () => {
    let fastify;

    before(async () => {
      fastify = await server.buildFastify();
    });

    beforeEach(() => {
      sinon.stub(logger, 'info');
      sinon.stub(logger, 'error');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return 200 when the request is valid', async () => {
      const provider = 'op-sitewire';
      const providerMap = mapper[provider];

      const authenticatorStub = sinon.stub(
        authenticators,
        providerMap.authenticatorName,
      ).resolves();
      const publishMessageStub = sinon.stub(controllers, 'publishMessage').resolves();

      const response = await fastify.inject({
        method: 'POST',
        url: `/api/v1/webhook/${provider}`,
        payload: { data: 'test data' },
      });

      expect(response.statusCode).to.equal(200);
      expect(authenticatorStub.calledOnce).to.be.true;
      expect(publishMessageStub.calledOnce).to.be.true;
    });

    it('should return 400 when the provider is not found', async () => {
      const invalidProvider = 'invalidProvider';

      const response = await fastify.inject({
        method: 'POST',
        url: `/api/v1/webhook/${invalidProvider}`,
      });

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.include(`Provider '${invalidProvider}' not found`);
    });

    it('should return 403 when authentication fails', async () => {
      const provider = 'op-sitewire';
      const providerMap = mapper[provider];

      const error = new Error('Invalid webhook signature');
      error.name = 'WebhookVerificationError';
      sinon.stub(authenticators, providerMap.authenticatorName).throws(error);

      const response = await fastify.inject({
        method: 'POST',
        url: `/api/v1/webhook/${provider}`,
      });

      expect(response.statusCode).to.equal(403);
      expect(response.body).to.include('Invalid webhook signature');
    });

    it('should return 500 when an internal server error occurs', async () => {
      const provider = 'op-sitewire';
      const providerMap = mapper[provider];

      sinon.stub(authenticators, providerMap.authenticatorName).resolves();

      const error = new Error('Internal server error');
      sinon.stub(controllers, 'publishMessage').rejects(error);

      const response = await fastify.inject({
        method: 'POST',
        url: `/api/v1/webhook/${provider}`,
      });

      expect(response.statusCode).to.equal(500);
      expect(response.body).to.include('Internal server error');
    });

    it('should return 200 for valid payload', async () => {
      const provider = 'op-sitewire';
      const providerMap = mapper[provider];

      sinon.stub(authenticators, providerMap.authenticatorName).resolves();
      sinon.stub(controllers, 'publishMessage').resolves();

      const payload = {
        someField: 'someValue',
      };

      const response = await fastify.inject({
        method: 'POST',
        url: `/api/v1/webhook/${provider}`,
        payload,
      });

      expect(response.statusCode).to.equal(200);
    });
  });
});
