# Swibit Frontend Engineer \- Frontend Task

**Company:** Swibit  
**Role:** Senior Frontend Engineer  
**Deadline:** 3 days from the invitation email, **11:59 PM (GMT+3)** on that day  
**Repository:** [https://github.com/JafarEyad/Swishop-Frontend-Task](https://github.com/JafarEyad/Swishop-Frontend-Task)  
**Collaborator:** [JafarEyad](https://github.com/JafarEyad)  
**Subject line (when you submit):** `Frontend Task - <Your Name>`

In the repository this assignment is also [`TASK.md`](TASK.md). API notes: [`API.md`](API.md).

---

## 1\. Before You Start

### 1.1 What we do NOT expect

- A rewrite from a blank app  
- A new server, proxy, or database  
- A framework migration (React stays; a state library is allowed if you defend it)  
- Coupon, tax, or shipping systems the catalog API does not provide  
- A Figma file as the deliverable  
- A design-system starter kit with our copy pasted in  
- Extra screens to have more UI to style (search, filters, accounts, marketing pages)  
- 100% test coverage  
- Every problem in the repo fixed

**Code quality, structural judgment, visual judgment, and honest trade-off discussion matter more than how much you change.** A gold-plated rewrite will count against you.

### 1.2 Tech stack

The repository is a **React \+ TypeScript** application. Keep it that way.

- You may add a **state library** if you can defend it  
- You may add or remove other libraries if you can defend that too  
- Do **not** migrate the framework (no Next.js rewrite, no Vue, no React Native)  
- Do **not** stand up a backend

The starter talks to **[DummyJSON](https://dummyjson.com/)** (`https://dummyjson.com`). You may keep it or switch to another **public** catalog API. If you switch, say so in `NOTES.md` (base URL and endpoints) and make the client follow **that** API. Do not invent coupon, tax, or shipping features the API does not provide. Optional host override: `REACT_APP_API_BASE`.

API notes shipped with the repo: [`API.md`](API.md). Node.js **18.x**. Network is required.

### 1.3 Time

This task is **3 days** from the invitation email. If you run short, submit what you have and document what remains and how you would have approached it. An incomplete submission with clear reasoning is more useful than a rushed complete one.

---

## 2\. Task Overview

You are inheriting **SwiShop**, a small store: catalog, product, cart, and checkout. It was shipped under time pressure. Product wants it brought up to the standard we would put in front of a customer.

Fork the repository. Work on a branch. Open a pull request on **your fork** so we can review a diff. We will read your Git history. Add **[JafarEyad](https://github.com/JafarEyad)** as a collaborator.

### 2.1 Core user story

> As a shopper, I browse products from the catalog API, open a product, add it to a cart, and check out. I can use the shop in light or dark theme, and in English or Arabic (including right-to-left layout). The storefront follows what the catalog API actually provides.

### 2.2 What you are building

This is **not** a greenfield app. Refactor the living codebase, document the rules you used, and prove those rules by making the product usable.

The shop must still be this shop when you are done: catalog, product, cart, checkout. Call out any behaviour you changed on purpose.

---

## 3\. Functional Requirements

### 3.1 Get to a running shop

**Input:**

- A clone of your fork, Node.js 18.x, network access for the catalog API

**Expected output:**

- `npm install` and `npm start` are enough to run the UI (document any extra env vars)  
- The storefront loads catalog data from DummyJSON or from the public API you chose  
- Images, titles, prices, and stock (or equivalent fields the API actually returns) come from that API, not from a hardcoded product list you invented

### 3.2 Catalog, product, cart, checkout

**Input:**

- Shopper actions on the four screens

**Expected output:**

- Product list and product detail use the catalog API  
- Cart can add, change quantity, and remove lines  
- Checkout can complete a purchase using what the API offers (the starter uses DummyJSON `POST /carts/add`; that write is simulated and not persisted — that is acceptable)  
- Loading, empty, error, and missing-product states are handled, not leftover crashes  
- Totals follow the API’s product fields (e.g. price, `discountPercentage` on DummyJSON). Do not add coupon codes, tax, or shipping configuration unless the API you chose actually provides them  
- Every route reachable from the header is a designed screen (including empty and error). A crash is not a designed screen

### 3.3 Theme

**Input:**

- The shopper switches light / dark

**Expected output:**

- The whole shop follows the choice  
- The choice survives a refresh

### 3.4 Language and direction

**Input:**

- The shopper switches English / Arabic

**Expected output:**

- Copy is in the selected language  
- Arabic uses **RTL** layout; English uses **LTR**  
- Chrome, product screens, cart, and checkout all flip — not translated strings dropped into a left-to-right page

### 3.5 Structure

**Input:**

- The inherited codebase

**Expected output:**

- Structure, types, and data flow are in a place you would accept on a team  
- You do not start over from an empty app  
- Behaviour matches the shop you inherited except where you fixed a genuine bug (say so in `NOTES.md`)

You decide folder layout, naming, and state placement. Apply the choice consistently and explain it in `ARCHITECTURE.md`.

---

## 4\. Non-Functional Requirements

### 4.1 Documentation files (required)

| File | Contents |
| :---- | :---- |
| `README.md` | How to install and run. Network is required. No steps left implicit. If you used AI tools, `## AI Tools Used` |
| `ARCHITECTURE.md` | Layout, what may import what, where the rule fails. On paper only: guest checkout, order history, product reviews, seller dashboard, and where a shared `User` type would live. Write it for someone who joins in three months |
| `NOTES.md` | What you changed and why. What you left and why. Assumptions. If you switched APIs: base URL and endpoints used. Temptations you did not build. A short note on the visual direction you chose |
| `FEEDBACK.md` | Section 8 of this document (not scored) |

### 4.2 Git

- Fork the starter repository; do not submit a zip as the primary deliverable  
- Work on a branch; open a pull request on your fork  
- Incremental, named commits (we read history)  
- No secrets committed  
- Do not squash your history before submitting

### 4.3 Runnable setup

A reviewer should be able to clone your repo, follow `README.md`, and run the shop. Node.js 18.x. No backend to install.

### 4.4 UI bar

You own the visual direction. There is no Figma. We will review it in the browser at desktop and mobile widths.

We are looking for hierarchy, consistency, and states — not decoration. A reskin that keeps broken empty states is not an overhaul. A component-library demo with SwiShop copy dropped in is not an overhaul either.

---

## 5\. Optional Bonus

Only attempt this after the core requirements work. Note it in your README under `## Bonus`.

Pick **at most one**:

1. **Tests** — automated tests over logic you actually extracted, with a note on why you tested those things  
2. **Guardrails** — make it structurally harder for the old failure modes to come back, and explain how

Bonus work is not required.

---

## 6\. Submission Checklist

Reply to the invitation email by the deadline with:

- [ ] Link to your GitHub repository  
- [ ] Link to the open pull request (your branch → your `main`)  
- [ ] Confirmation that **[JafarEyad](https://github.com/JafarEyad)** has been added as a collaborator  
- [ ] Confirmation that the project installs and runs from a clean clone  
- [ ] Any blockers or assumptions we should know before review

**Subject line:** `Frontend Task - <Your Name>`

**Repository must include** everything in Section 4.1 and a running application.

**Do not submit:**

- A zip file as the primary deliverable (use Git)  
- A rewritten application with no shared history  
- A backend, even a small one  
- A Figma file instead of a running UI  
- Documents describing work that is not in the code

There will be a follow-up conversation. You will walk through the structure, one trade-off, and the UI.

---

## 7\. Evaluation Criteria (High Level)

| Area | Weight |
| :---- | :---- |
| Architecture and dependency reasoning | 25% |
| UI: hierarchy, consistency, states, theme, and locale | 25% |
| Code quality: TypeScript, React idioms, naming | 20% |
| Honest use of the catalog API and a working shop flow | 15% |
| Scope control: what you fixed, what you deferred, and why | 10% |
| Communication and documentation | 5% |

Section 8 is required and is not scored.

---

## 8\. Feedback on this task (not scored)

Answer in `FEEDBACK.md`. It does not affect the review of your work.

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

## 9\. Integrity

- The submitted solution must represent your own understanding and decisions.  
- You may use AI-assisted tools (Cursor, Copilot, ChatGPT, Claude, etc.). If you do, add `## AI Tools Used` in `README.md` stating which tools you used and for what. You must be able to explain and modify all submitted code in the interview.  
- You may reference public tutorials or documentation. Cite anything that materially shaped your approach in `ARCHITECTURE.md`.  
- Do not share this task description publicly while your application is active.

---

Good luck. We look forward to reviewing your submission.

**Swibit Frontend Engineering Team**
