# What I learned

**JS Urls**

In native browser JS, to refer to files living statically on your server, you need to use `import.meta` and the `URL` class like so:

```js
const jsonUrl = new URL("../json/notebook-products.json", import.meta.url).href;
const response = await fetch(jsonUrl);
```
