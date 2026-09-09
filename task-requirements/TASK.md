# Senior Frontend Engineer Task

**SwiShop** · Swibit Engineering

| | |
|---|---|
| **Role** | Senior Frontend Engineer |
| **Time** | 3 days from the invitation email |
| **Subject** | `Frontend Task - <Your Name>` |

You are inheriting **SwiShop**, a small store: catalog, product, cart, checkout. It was shipped under time pressure. Product wants it brought up to the standard we would put in front of a customer.

Stay on **React and TypeScript**. A state library is fine if you can defend it. Do not migrate the framework. Do not stand up a backend. The starter talks to [DummyJSON](https://dummyjson.com/) (`https://dummyjson.com`, [`API.md`](API.md)). You may keep it or switch to another **public** catalog API. If you switch, say so in `NOTES.md` and make the client follow **that** API — do not invent coupon, tax, or shipping features the API does not provide.

Deadline is **3 days**. If you run short, submit what you have and say what you would have done next. Fork the repo, work on a branch, open a PR on your fork so we can read the diff. Your commits sit on top of this history; we will read them. Add **`JafarEyad`** as a collaborator.

---

## What to ship

1. **A codebase we can keep working in.** Bring structure, types, and data flow to a place you would accept on a team. Do not greenfield. The product should still be this shop when you are done. Call out any behaviour you changed on purpose.

2. **`ARCHITECTURE.md`.** How the app is put together, what may depend on what, and where that rule fails. Then, on paper only, place four upcoming bets: guest checkout, order history, product reviews, seller dashboard. Include where a shared `User` type would live. Write it for someone who joins in three months.

3. **`NOTES.md`.** What you changed, what you left, and why. Assumptions. Temptations you did not build.

4. **A shop, not a prototype.** Overhaul the UI. You own the visual direction; there is no Figma. Every shopper-facing route, including loading / empty / error, should feel like one store. Desktop and mobile. Do not add search, filters, accounts, or extra marketing pages in order to have more UI.

5. **Light and dark.** The shopper can switch. Choice should survive a refresh.

6. **English and Arabic.** The shopper can switch language. Arabic must work in RTL, English in LTR, including layout, chrome, and checkout — not translated copy dropped into a LTR page.

---

## Out of scope

Rewriting from a blank app. A new server. Features your catalog API does not offer (do not invent coupon / tax / shipping if it has none). A Figma as the deliverable. A design-system starter kit with our copy pasted in. 100% test coverage. Fixing everything you notice.

Optional, only after the above, pick at most one: tests on the logic you actually extracted, or mechanical guardrails so the old failure modes cannot return. Note it under `## Bonus` in your README.

---

## Submit

**README.md** — install and run. Network is required. If you used AI tools, add `## AI Tools Used` and say for what.

**ARCHITECTURE.md**, **NOTES.md**, **FEEDBACK.md** (below).

Email when the PR is up: repo link, PR link, collaborator added, runs from a clean clone. No zip as the primary deliverable, no backend, no docs for work that is not in the code.

We will look at judgment, structure, whether the UI is a store, whether the catalog API is used honestly, and whether locale and theme were treated as product, not stickers.

Follow-up interview: you will walk through the structure, one trade-off, and the UI.

---

## FEEDBACK.md (not scored)

1. Time per outcome above?
2. What told us the most about you? The least?
3. What was under-specified?
4. What would you cut?
5. What are we not measuring?
6. Real codebase, or a test puzzle?
7. Would you want to work in what you produced?
8. Three days: short, long, or about right?

---

Do not share this brief while your application is active. You are responsible for everything you submit.

Good luck.

— Swibit Frontend Engineering
