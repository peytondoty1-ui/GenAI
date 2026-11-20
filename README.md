# LedgerProof AI

Turn client facts into a supported draft tax memo for professional review.

## Run the standalone application

Download or clone this repository. With **Python 3** installed, run from the repository root:

```sh
python3 -m http.server 8000
```

Open **http://localhost:8000**. Use an HTTP server rather than opening `index.html` directly because the browser loads JavaScript modules.

This public repository contains standalone HTML, CSS, JavaScript, an icon, and milestone documentation. **No package installation, workspace scaffolding, build step, backend, database, or API key is required.**

Prototype link: https://ledger-proof-ai.replit.app/ — publication of the latest revision must be checked separately.

## Brand

LedgerProof ink **#0F161F** and emerald **#12BF90**, from the sampled Emerald LinkedIn Cover Banner supplied in the branding request. Header and notice use ink with white text; primary actions use emerald with ink text. Links/small text on light surfaces use deeper emerald **#047857** for readability.

## Intended user

A tax associate at a regional CPA firm preparing evidence-supported draft memos and identifying missing information and judgments that require professional review.

## First working slice

Load fictional client facts → select **Generate Draft Memo** → read a prepared provisional memo with evidence references, a purchase-total calculation, and professional review flags.

The missing-facts example asks for missing information and now accepts an explicit prepared Northstar follow-up to continue to an updated provisional memo.

## Revision milestone documentation

- [Priority improvements, feedback response, decisions, risk, interpretation, and next priorities](docs/milestone.md)
- [Five distinct tests: preregistered criteria and actual results](docs/tests.md)
- [Latest targeted brand contrast, tax-year, and reviewer-wording check](docs/evidence/banner-brand-tax-year-check.md)
- [Same-task before-change failure](docs/evidence/before-change.md) and [actual baseline screenshot](docs/evidence/before-change.png)
- [Auditable changes and handoff](docs/changes.md)
- [Draft AI-use disclosure — scope decision confirmed; final review pending](docs/ai-use-disclosure.md)
- [2–3 minute narrated demo script and recording checklist — real video pending](docs/demo.md)

This is a **Wizard-of-Oz simulation**. No live model, real tax-law retrieval, client collection, or verified tax treatment is provided.

## Try the prepared workflows

1. Open the prototype and select **Load Complete Example**, then **Generate Draft Memo**. Read the provisional memo, calculation, fictional evidence references, and professional review flags. Tax treatment remains unresolved.
2. Select **Edit Input / Try Again** to clear the result and return focus to the input.
3. Select **Load Missing-Facts Example**, then **Generate Draft Memo**. Read the clarification requests, then **Load Prepared Answers** and generate again. Alternatively, manually paste the exact prepared answers from the page (alone or following the missing inquiry with one blank line). The memo cites client-reported answers, not an invented supplied invoice.
4. Use fact-source links to open the full fictional support. Missing inquiry shows only inquiry/checklist evidence; the completed scenario and follow-up show their own relevant documents.
5. Use **Edit Draft** to add working annotations, **Save Draft Edits** or **Cancel Edit**, **Inspect Remaining Review Items**, and **Reject Draft**. Editing does not change protected facts, calculation, status, or unresolved conclusion. No approval control exists.
6. Select **Load Conflicting-Figures Example**, then generate: the app asks to reconcile the $8,000 reported total with four × $1,800, not silently accept it.
7. To explore validation, clear input, materially edit a scenario, or request a verified deduction. Unsupported requests do not produce a memo.

After generation, the page scrolls to the result and moves keyboard focus to its heading or error message without a second scroll. Reduced-motion preferences disable animated scrolling.

## What works now and what is simulated

- Example-loading buttons populate editable fictional facts, including the prepared continuation and conflict scenario.
- The complete example produces a prepared memo with S1–S3 evidence references, the calculation `4 × $1,800 = $7,200`, and review requirements.
- The missing-facts example produces clarification requests and a prepared-answer continuation. Only the explicitly supported answers are accepted; no answers are invented.
- Blank input and unsupported input receive explicit messages instead of a memo.
- Leading/trailing whitespace and line-ending differences are tolerated. Material edits are not treated as supported examples.
- Changing input clears old results. **Edit Input / Try Again** returns focus to the input.
- The course-prototype notice remains visible, and the layout adapts to desktop and mobile.
- This version uses prepared responses. Input handling, example loading, validation, result display, and retry work. Research, drafting, and judgment routing are simulated; no live AI or tax-law research occurs.
- Sample evidence is fictional and inspectable per fact. Documentary samples, client-reported statements, and non-authoritative workflow checklists are distinguished. Follow-up figures/date/use come from client-reported answers, not a supplied invoice. No facts are independently verified.
- Draft annotation edit/save/cancel, rejection, and unresolved review inspection are functional. A simple phrase check blocks some verification/approval claims; it is not semantic fact checking. Canonical facts and tax conclusion remain protected.
- In the complete example, tax year is **not supplied and needs confirmation**; a 2026 placed-in-service date is not proof of the client's tax year. The prepared follow-up separately states tax year 2026 as an unverified client-reported answer.
- There are no accounts, database, API keys, paid services, or application-server requests. Input is held only in the current page and is not saved.

## Future AI role

A future AI would research authoritative guidance, synthesize client documents, draft and revise memos, identify missing information, and escalate uncertain judgments for professional review. It would need source validation, privacy safeguards, and professional approval before client delivery. These capabilities are not implemented here.

## Test results reported before this update

The user reported that these checks were performed on the published prototype by the ChatGPT browser assistant on **October 13, 2026, before this update**. They evaluate the simulated user experience, not tax accuracy. These are historical results, not the results of the post-update verification.

| Case | Action | Observed | Result |
| --- | --- | --- | --- |
| Typical | Load Complete Example → Generate Draft Memo | A structured draft appeared with facts, issue, calculation, sample evidence references, unresolved tax treatment, and review flags. | Pass |
| Challenge | Load Missing-Facts Example → Generate Draft Memo | The app requested costs, invoice total, tax year, placed-in-service date, business use, entity type, and policy/election documentation instead of generating an unsupported memo. | Pass |
| Invalid or empty | Clear input → Generate Draft Memo | The app requested client facts or an example. No memo appeared. | Pass |

Additional checks reported as passed:
- Unsupported fictional input produced a coverage explanation.
- **Edit Input / Try Again** cleared the result and focused the input.

## Earlier revision verification (historical)

Performed against the updated **development preview**, not the published URL. These checks evaluate simulated behavior and accessibility, not tax accuracy.

| Case | Observed after update | Result |
| --- | --- | --- |
| Typical | Complete example produced the structured provisional memo with facts, issue, $7,200 purchase-total calculation, S1–S3 evidence, unresolved treatment, and professional review flags. | Pass |
| Challenge | Missing-facts example requested all five information categories and showed no draft memo. | Pass |
| Invalid or empty | Empty input displayed the exact validation message and no memo. | Pass |

Additional browser observations:
- Unsupported fictional input displayed the coverage explanation, not a memo.
- Changing input cleared the previous result.
- Generation made exactly one explicit result-scroll request and focused the heading or error message using `preventScroll: true`.
- Normal-motion generation and retry used smooth scrolling; reduced-motion generation and retry used instant scrolling.
- Results remained visible below the sticky notice at desktop (1280 × 900) and mobile (390 × 844) sizes.
- **Edit Input / Try Again** cleared the result, retained the input, focused the textarea, and scrolled it into view.
- No browser console errors were observed during this verification pass.

The published prototype must be republished to include this update; the historical published checks above do not verify the new code.

## Known limitations

1. **Prepared scenarios only:** Only explicitly listed fictional scenarios and exact follow-up answers produce prepared responses; harmless trim/line endings are accepted, material edits are not ignored. **Next improvement:** structured fictional fact intake before broader interpretation.
2. **No live research or tax determination:** Research and drafting are simulated, and tax treatment remains unresolved. **Next improvement:** retrieve authoritative guidance for professional review.
3. **No persistent client workspace:** This slice does not provide saved client workspaces or review history. **Next improvement:** retain documents, prior analyses, and approved decisions.

## Standalone source handoff

The runnable application consists of `index.html`, `styles.css`, `app.js`, `examples.js`, and `favicon.svg` in the repository root. The source files are served unchanged; no React runtime or backend is needed.

To run these standalone files after downloading the GitHub handoff, put them in the same directory and serve it with any static HTTP server. For example, if Python 3 is installed:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Use an HTTP server rather than opening `index.html` directly, because the browser loads JavaScript modules.

Repository: https://github.com/peytondoty1-ui/GenAI

The repository's prior README is retained at [docs/history/repository-readme-before-milestone.md](docs/history/repository-readme-before-milestone.md). Historical test statements there are not fresh verification of this revision.

## Remaining owner actions

The computer-narrated screen recording is **being prepared separately and remains pending** until a real recording exists. Prepared narration is not a completed recording. Peyton must review the final disclosure and recording, ensure Google Drive viewing access for the two required instructors listed in the recording checklist, and upload the real video directly to Canvas with the GitHub URL. No emails, messages, file sharing, or Canvas submission were performed. Peyton's confirmed choice to keep simulated AI and reject a live model is now documented. Publish/recheck the public prototype before recording.

Only the application files and relevant milestone documentation/evidence belong in the handoff; unrelated repository content must be preserved. Do not upload secrets, credentials, `.env` files, installed dependencies, or the unused workspace scaffolding.
