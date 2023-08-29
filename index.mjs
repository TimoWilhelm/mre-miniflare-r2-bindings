// @ts-check

import { Miniflare } from 'miniflare';

const mf = new Miniflare({
  script: `
  addEventListener("fetch", (event) => {
    event.respondWith(new Response("Hello Miniflare!"));
  });
  `,
  r2Buckets: {
    R2_DEFAULT: 'default',
  },
  r2Persist: './.miniflare/r2-data',
});

const bindings = await mf.getBindings();

const r2Proxy = /** @type {R2Bucket} */ (bindings.R2_DEFAULT);

console.log(r2Proxy);

console.log("Uploading...");
await r2Proxy.put("test.txt", "Hello World"); // This gets stuck indefinitely
console.log("Uploaded test.txt to default bucket");

await mf.dispose();