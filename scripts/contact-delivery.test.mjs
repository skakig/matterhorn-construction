import { test } from 'node:test';
import assert from 'node:assert/strict';
import { submitInquiry } from '../src/lib/contact-delivery.mjs';

test('encodes the registered Netlify form and preserves user punctuation', async () => {
  let request;
  await submitInquiry({ name: 'Jody & family', email: 'owner@example.com', phone: '970-903-0122', message: 'Timber + stone?' }, async (url, options) => {
    request = { url, options };
    return new Response('', { status: 200 });
  });
  assert.equal(request.url, '/__forms.html');
  const body = new URLSearchParams(request.options.body);
  assert.equal(body.get('form-name'), 'project-inquiry');
  assert.equal(body.get('name'), 'Jody & family');
  assert.equal(body.get('message'), 'Timber + stone?');
});
test('rejects unsuccessful delivery instead of claiming sent', async () => {
  await assert.rejects(submitInquiry({name:'Jody'}, async () => new Response('', {status:500})));
});
test('network failure remains a failure', async () => {
  await assert.rejects(submitInquiry({}, async () => { throw new Error('offline'); }), /offline/);
});
