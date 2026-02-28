import { createRequire } from 'module';
import { use, should } from 'chai';
import chaiHttp, { request } from 'chai-http';

// Import the CommonJS server into this ESM test file
const require = createRequire(import.meta.url);
const app = require('../server.js');

use(chaiHttp);  // registers .status(), .header(), etc. on Assertion
should();       // augments Object.prototype with .should

describe('Echo Server — POST /', function () {
  it('echoes plain text and preserves text/plain content type', async function () {
    const res = await request.execute(app)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send('hello world');

    res.should.have.status(200);
    res.should.have.header('content-type', /text\/plain/);
    res.text.should.equal('hello world');
  });

  it('echoes JSON body and preserves application/json content type', async function () {
    const payload = JSON.stringify({ message: 'hello' });

    const res = await request.execute(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send(payload);

    res.should.have.status(200);
    res.should.have.header('content-type', /application\/json/);
    res.text.should.equal(payload);
  });

  it('handles an empty body and returns 200', async function () {
    const res = await request.execute(app)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send('');

    res.should.have.status(200);
    res.should.have.header('content-type', /text\/plain/);
    res.text.should.equal('');
  });
});
