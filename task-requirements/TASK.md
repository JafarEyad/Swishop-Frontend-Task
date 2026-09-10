# Senior Frontend Engineer Task

**SwiShop** · Swibit

| | |
|---|---|
| **Role** | Senior Frontend Engineer |
| **Time** | 3 days from the invitation email, **11:59 PM (GMT+3)** on that day |
| **Repo** | [https://github.com/JafarEyad/Swishop-Frontend-Task](https://github.com/JafarEyad/Swishop-Frontend-Task) |
| **Collaborator** | [JafarEyad](https://github.com/JafarEyad) |
| **Subject (when you submit)** | `Frontend Task - <Your Name>` |

This file is the in-repo assignment. It matches [`Swibit Frontend Engineer Task.docx.md`](Swibit%20Frontend%20Engineer%20Task.docx.md). API details: [`API.md`](API.md).

---

You are inheriting **SwiShop**, a small store: catalog, product, cart, checkout. It was shipped under time pressure. Product wants it brought up to the standard we would put in front of a customer.

Stay on **React and TypeScript**. A state library is fine if you can defend it. Do not migrate the framework. Do not stand up a backend. Node.js **18.x**. Network is required.

The starter talks to [DummyJSON](https://dummyjson.com/) (`https://dummyjson.com`). You may keep it or switch to another **public** catalog API. If you switch, say so in `NOTES.md` (base URL and endpoints) and make the client follow **that** API. Do not invent coupon, tax, or shipping features the API does not provide. Optional host override: `REACT_APP_API_BASE`.

Deadline is **3 days** from the invitation email, **11:59 PM (GMT+3)** that day. If you run short, submit what you have and say what you would have done next. Fork the repo, work on a branch, open a PR on your fork so we can read the diff. Your commits sit on top of this history; we will read them. Add **JafarEyad** as a collaborator.

---

## What we do not expect

- A rewrite from a blank app
- A new server, proxy, or database
- A framework migration (React stays; a state library is allowed if you defend it)
- Coupon, tax, or shipping systems the catalog API does not provide
- A Figma file as the deliverable
- A design-system starter kit with our copy pasted in
- Extra screens to have more UI to style (search, filters, accounts, marketing pages)
- 100% test coverage
- Every problem in the repo fixed

Judgment and restraint count. A gold-plated rewrite will count against you.

---

## What to ship

1. **A codebase we can keep working in.** Bring structure, types, and data flow to a place you would accept on a team. Do not greenfield. The product should still be this shop when you are done. Call out any behaviour you changed on purpose.

2. **`ARCHITECTURE.md`.** How the app is put together, what may import what, and where that rule fails. Then, on paper only, place four upcoming bets: guest checkout, order history, product reviews, seller dashboard. Include where a shared `User` type would live. Write it for someone who joins in three months.

3. **`NOTES.md`.** What you changed, what you left, and why. Assumptions. If you switched APIs: base URL and endpoints. Temptations you did not build. A short note on the visual direction you chose.

4. **A shop, not a prototype.** Overhaul the UI. You own the visual direction; there is no Figma. Catalog, product, cart, and checkout use the catalog API. Loading, empty, error, and missing-product states are designed. Every route reachable from the header is a designed screen. Desktop and mobile. Do not add search, filters, accounts, or extra marketing pages in order to have more UI.

5. **Light and dark.** The shopper can switch. Choice should survive a refresh.

6. **English and Arabic.** The shopper can switch language. Arabic must work in RTL, English in LTR, including layout, chrome, and checkout — not translated copy dropped into a LTR page.

Checkout may use DummyJSON `POST /carts/add` (simulated, not persisted). Totals follow fields the API actually returns (for DummyJSON: price, `discountPercentage`, stock).

---

## Bonus

Optional, only after the rest is done. Pick **at most one**: tests on the logic you actually extracted, or mechanical guardrails so the old failure modes cannot return. Note it under `## Bonus` in your README.

---

## Submit

**README.md** — install and run (`npm install`, `npm start`). Network is required. If you used AI tools, add `## AI Tools Used` and say for what.

Also: `ARCHITECTURE.md`, `NOTES.md`, `FEEDBACK.md` (below).

Reply to the invitation email with:

- Link to your repository
- Link to the open pull request (your branch → your `main`)
- Confirmation that **JafarEyad** has been added as a collaborator
- Confirmation that the project installs and runs from a clean clone
- Any blockers or assumptions we should know before review

**Subject:** `Frontend Task - <Your Name>`

**Do not submit:** a zip as the primary deliverable, a rewritten app with no shared history, a backend, a Figma instead of a running UI, or documents describing work that is not in the code.

Follow-up interview: you will walk through the structure, one trade-off, and the UI.

---

## Evaluation (high level)

| Area | Weight |
|---|---|
| Architecture and dependency reasoning | 25% |
| UI: hierarchy, consistency, states, theme, and locale | 25% |
| Code quality: TypeScript, React idioms, naming | 20% |
| Honest use of the catalog API and a working shop flow | 15% |
| Scope control: what you fixed, what you deferred, and why | 10% |
| Communication and documentation | 5% |

`FEEDBACK.md` is required and is not scored.

---

## FEEDBACK.md (not scored)

1. Roughly how long did each part take you?
2. Which part told us the most about you? Which told us the least?
3. What was ambiguous or under-specified?
4. What would you cut from this task?
5. What are we not measuring that you wish we were?
6. Did the codebase feel like a real one, or like a puzzle assembled for a test?
7. Would you want to work in the codebase you produced?
8. Did three days feel too short, too long, or about right?

Short answers are fine. Blunt answers are better than polite ones.

---

## Integrity

- The submitted solution must represent your own understanding and decisions.
- You may use AI-assisted tools (Cursor, Copilot, ChatGPT, Claude, etc.). If you do, add `## AI Tools Used` in `README.md` stating which tools you used and for what. You must be able to explain and modify all submitted code in the interview.
- You may reference public tutorials or documentation. Cite anything that materially shaped your approach in `ARCHITECTURE.md`.
- Do not share this task description publicly while your application is active.

---

Good luck. We look forward to reviewing your submission.

**Swibit Frontend Engineering Team**
