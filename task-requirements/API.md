# API

The starter uses [DummyJSON](https://dummyjson.com/). You may keep it or point the client at another public catalog API. Do not stand up a server. If you switch, document the base URL and the endpoints you used in `NOTES.md`.

This file is the API note for [`TASK.md`](TASK.md) and [`Swibit Frontend Engineer Task.docx.md`](Swibit%20Frontend%20Engineer%20Task.docx.md).

**Default base URL:** `https://dummyjson.com`

**Optional env:** `REACT_APP_API_BASE` — same path shape, different host. A different response shape still means changing the client.

**Docs:** [dummyjson.com/docs/products](https://dummyjson.com/docs/products) · [dummyjson.com/docs/carts](https://dummyjson.com/docs/carts)

What the starter calls:

- `GET /products` — `{ products, total, skip, limit }`
- `GET /products/:id` — one product
- `GET /products/category/:name` — optional
- `POST /carts/add` — simulated cart / checkout payload (not persisted)

A DummyJSON product includes `title`, `price`, `discountPercentage`, `stock`, `availabilityStatus`, `thumbnail`, `images`, `category`, `rating`, and `reviews`.

Match the UI to whatever API you ship against. Do not invent coupon, tax, or shipping services the API does not provide.
