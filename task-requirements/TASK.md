# Frontend Engineer Task

**SwiShop: Restructure, Document, and Extend**
Swibit Engineering

| | |
|---|---|
| **Role** | Frontend Engineer |
| **Deadline** | See your invitation email (submit before the stated date/time) |
| **Submission** | See [Section 8](#8-submission-checklist) |
| **Subject line** | `Frontend Task - <Your Name>` |

---

## 1. Before You Start

### 1.1 What We Do Not Expect

- A polished or redesigned UI
- New features beyond what Section 5 asks for
- A rewrite of the application from scratch
- 100% test coverage
- Every problem in the codebase fixed

Code quality, structural judgment, and honest reasoning about trade-offs matter far more than how much you manage to change.

### 1.2 Tech Stack

The repository is a React + TypeScript application. Keep it that way. You may add libraries where you can justify them, and you may remove libraries where you can justify that too. Both decisions belong in your write-up.

### 1.3 Time Guidance

This task is intended to take roughly **8 hours of focused work**. Your deadline is stated in your invitation email.

If you run out of time, submit what you have and document what remains and how you would have approached it. An incomplete submission with clear reasoning is more useful to us than a rushed complete one.

### 1.4 The Follow-Up Interview

After submission you will meet with one of our senior engineers. In that conversation you will be asked to:

- Walk through the structure you arrived at and why
- Defend one refactor decision you made
- Explain one problem you deliberately chose **not** to fix (if any)

Write your code and your documents with that conversation in mind.

## 2. Task Overview

You are joining a team that has inherited **SwiShop**, a small e-commerce application. It has four screens: product list, product detail, cart, and checkout. It runs, and from the outside it mostly works.

Internally, it was built quickly and without much thought. Features import from each other in whichever direction was convenient at the time. Nobody can say with confidence what breaks when something changes.

Your job is to make this codebase safe to work in, explain the rules you used to do it, and then prove those rules hold by building something new on top of them.

There are three tasks. They build on each other in order.

| Task | What It Is | Rough Share of Your Time |
|---|---|---|
| 1 | Restructure the existing codebase | ~4 hours |
| 2 | Write `ARCHITECTURE.md` explaining your rules | ~1.5 hours |
| 3 | Add one new feature under your own rules | ~2 hours |

We are not prescribing a folder structure, a naming convention, or a dependency rule. Choose an approach, apply it consistently, and explain it.

## 3. Task 1 — The Restructure

### 3.1 What We Are Asking

The repository has problems. Some are cosmetic. Some are structural. Some are live bugs that a user could hit today. We are not telling you how many there are or where they live.

Find them. Prioritize them. Fix what matters in the time you have.

Then tell us, in writing, what you deliberately left alone and why.

That last part is not a formality. Deciding what **not** to do under a deadline is a large part of the job, and we read it as carefully as we read your code.

### 3.2 Constraints

- **No rewrite from scratch.** Refactoring a living codebase is the work. Greenfielding is not.
- **The application must still run** when you are finished, and it must behave the way it behaved before, except where you are fixing a genuine bug (in which case, say so).
- **Commit incrementally.** We will read your Git history. A single commit titled `refactor` tells us nothing. A sequence of small, named commits tells us how you think.
- Behavior changes that are not bug fixes should be called out explicitly.

### 3.3 What We Will Be Looking At

- Readability and naming
- TypeScript usage: where types earn their keep and where they are decoration
- React idioms: state placement, effects, rendering, component boundaries
- Where business logic lives
- Duplication, and what you did about it
- How dependencies flow between parts of the application

## 4. Task 2 — The Rules

Write an `ARCHITECTURE.md` at the root of the repository.

### 4.1 Describe the Structure You Arrived At

Explain the layout you chose in Task 1 and the reasoning behind it. A diagram is welcome (ASCII or Mermaid is fine). Describe what may import what, and what may not.

### 4.2 Apply Your Rules to a Feature We Have Not Built Yet

Next quarter, product wants four things:

- **Guest checkout** — purchasing without an account
- **Order history** — a signed-in user reviewing past orders
- **Product reviews** — ratings and written reviews on the product detail screen
- **Seller dashboard** — a separate area where sellers manage their own listings

Answer these, concretely:

1. Where does each of these live in your structure?
2. What is each one allowed to import, and what is it not allowed to import?
3. Reviews and order history both need a `User` type. Where does it live, and how did you decide?
4. Two of these features need the same piece of logic and neither obviously owns it. What do you do?

We are looking for the **rule**, not just the answer. Write it the way you would write it for a new hire who joins in three months, so that they never have to ask you this question.

### 4.3 Tell Us Where Your Rule Breaks

Every structural rule has a cost and a failure mode. Name yours.

- Under what circumstances does the rule you just described become the wrong rule?
- What would make you abandon or revise it?
- What did you give up by choosing it?

An engineer who cannot name the weakness of their own design has not finished designing it.

## 5. Task 3 — The Extension

Add **promo code support** to the checkout flow.

### 5.1 Behavior

- The user can enter a promo code during checkout
- The code is validated against a small set of known codes (hardcode them; there is no backend for this)
- Support at least two kinds of discount: a percentage off, and a fixed amount off
- A valid code updates the order total visibly
- An invalid, expired, or empty code is handled clearly and does not break the flow
- The discount must be reflected correctly wherever totals are shown

### 5.2 What This Task Is Really For

This feature touches the cart, the checkout, and the way prices are calculated and displayed. It sits directly on top of the structure you built in Task 1 and described in Task 2.

Build it using your own rules. If you find yourself breaking them to get it done, that is worth knowing, and worth writing down. Say so in `NOTES.md`.

UI polish is not required here. Correctness and placement are.

## 6. Non-Functional Requirements

### 6.1 Required Files

| File | Contents |
|---|---|
| `README.md` | How to install and run the project. Anything a reviewer needs, with no steps left implicit |
| `ARCHITECTURE.md` | Task 2. Structure, rules, the future-features exercise, and where your rule breaks |
| `NOTES.md` | What you fixed and why. What you deliberately left and why. Any bug you found, whether or not you fixed it. Any behavior you intentionally changed |
| `FEEDBACK.md` | Section 10 of this document |

### 6.2 Git

- **Create your own copy** of this repository using GitHub's **"Use this template"** button — do not fork.
- Work on a branch; do not commit directly to `main`.
- Incremental, named commits.
- No secrets committed.
- Do not squash your history before submitting.
- When you are done, **open a pull request in your own repository** (your working branch → your `main`) so your changes can be reviewed as a diff.

### 6.3 Scope Discipline

Do not add features, screens, or dependencies outside of what Section 5 asks for. If you are tempted, write the temptation down in `NOTES.md` instead. That is a better answer than building it.

## 7. Optional Bonus

Only attempt this once the three tasks are complete. Note any bonus work in `README.md` under `## Bonus`.

Pick **at most one**:

- **RTL and Arabic** — make the application work correctly in right-to-left layout, with Arabic strings
- **Guardrails** — make it structurally impossible for the problems you fixed to come back, and explain how
- **Tests** — automated tests over whatever logic you extracted, with a note on why you tested those things and not others
- **UI** — a genuinely polished interface

Bonus work is not required, and its absence costs you nothing.

## 8. Submission Checklist

Create your repository from this template, do your work on a branch, and open a pull request against your own `main`. Add **`JafarEyad`** as a collaborator on your repository so we can review, then email the reviewers to let them know it is ready.

**Subject line:** `Frontend Task - <Your Name>`

The email must include:

- A link to your repository and the open pull request
- Confirmation that you have added `JafarEyad` as a collaborator
- Confirmation that the project installs and runs from a clean clone
- Any blockers or assumptions we should know before review

The pull request must contain everything in Section 6.1 and a running application.

**Do not submit:**

- A zip file as the primary deliverable (use Git)
- A rewritten application with no shared history
- Documents describing work that is not in the code

## 9. Evaluation Criteria (High Level)

| Area | Weight |
|---|---|
| Code quality: readability, TypeScript, React idioms, naming | 30% |
| Architecture and dependency reasoning | 25% |
| Scope control: what you fixed, what you deferred, and why | 20% |
| Extension: whether the structure held when you built on it | 15% |
| Communication and documentation | 10% |

Section 10 is required and is not scored.

## 10. Feedback on This Task

Swibit asks every candidate to review the process that reviewed them.

**This section is not scored. It does not affect the review of your work.** Answer it honestly. If something here was unfair, badly explained, or a waste of your Sunday, we would rather hear it from you than discover it four candidates later.

Answer in `FEEDBACK.md`:

1. Roughly how long did each of the three tasks take you?
2. Which task told us the most about you as an engineer? Which told us the least?
3. What was ambiguous or under-specified? Where did you have to guess what we wanted?
4. What would you cut from this task?
5. What are we not measuring that you wish we were?
6. Did the codebase feel like a real one, or like a puzzle assembled for a test?
7. Would you want to work in the codebase you produced?

Short answers are fine. Blunt answers are better than polite ones.

## 11. Integrity

- The submitted solution must represent your own understanding and decisions.
- You may use AI-assisted tools such as ChatGPT, Claude, Cursor, or GitHub Copilot. If you do, add a brief `## AI Tools Used` section to your `README.md` stating which tools you used and for what. Describing the specific work you handed to a tool is more useful to us than a one-word answer.
- You may reference public tutorials or documentation. Cite anything that materially shaped your approach in `ARCHITECTURE.md`.
- You are responsible for reviewing, testing, and understanding everything you submit. In the follow-up interview you will be asked to explain your structure, your decisions, and selected parts of your implementation.
- Do not share this task description publicly while your application is active.

Good luck. We look forward to reviewing your submission.

— Swibit Frontend Engineering Team
