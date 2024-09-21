const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');
const svix = require('../../config/svix');
const providerAuth = require('../../providers/provider-authentication');

describe(`${path.basename(__filename)} - verifySitewireSignature`, () => {
  let svixAuthStub;
  let getSvixAuthStub;
  let sandbox;
  const SITEWIRE_SECRET = 'mock-secret';
  const providerMap = { secret: SITEWIRE_SECRET };

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    svixAuthStub = {
      verify: sandbox.stub(),
    };
    getSvixAuthStub = sandbox.stub(svix, 'getSvixAuth').returns(svixAuthStub);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call getSvixAuth with SITEWIRE_SECRET and verify the request body and headers', () => {
    const request = {
      body: { data: 'test data' },
      headers: { 'x-svix-signature': 'mock-signature' },
      providerMap,
    };
    const stringifiedBody = JSON.stringify(request.body);

    svixAuthStub.verify.returns('verified-body');

    const result = providerAuth.verifySitewireSignature(request);

    expect(getSvixAuthStub.calledOnceWithExactly(SITEWIRE_SECRET)).to.be.true;
    expect(svixAuthStub.verify.calledOnceWithExactly(stringifiedBody, request.headers)).to.be.true;
    expect(result).to.equal('verified-body');
  });

  it('should handle verification failure by throwing an error', () => {
    const request = {
      body: { data: 'test data' },
      headers: { 'x-svix-signature': 'mock-signature' },
      providerMap,
    };
    const stringifiedBody = JSON.stringify(request.body);

    const error = new Error('Verification failed');
    svixAuthStub.verify.throws(error);

    try {
      providerAuth.verifySitewireSignature(request);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err).to.equal(error);
    }

    expect(getSvixAuthStub.calledOnceWithExactly(SITEWIRE_SECRET)).to.be.true;
    expect(svixAuthStub.verify.calledOnceWithExactly(stringifiedBody, request.headers)).to.be.true;
  });
});
