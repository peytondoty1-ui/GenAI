# LedgerProof AI

Turn client facts into a supported draft tax memo for professional review.

## Intended user

Tax associates preparing evidence-supported draft memos and identifying missing information and judgments that require professional review.

## First working slice

Load fictional client facts → select **Generate Draft Memo** → read a prepared provisional memo with evidence references, a purchase-total calculation, and professional review flags.

The missing-facts example instead asks for the information needed before a draft can be completed.

## Run locally

The application uses plain HTML, CSS, and JavaScript. Vite is used only to serve and build the static files; there is no application backend.

From the repository root:

```sh
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/ledgerproof-ai run dev
```

Open `http://localhost:5173` when running on your own computer. In Replit, use the LedgerProof AI preview and its Run workflow.

To build the static site locally:

```sh
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/ledgerproof-ai run build
```

Prototype link: https://ledger-proof-ai.replit.app/

## Try the two examples

1. Open the prototype and select **Load Complete Example**, then **Generate Draft Memo**. Read the provisional memo, calculation, fictional evidence references, and professional review flags. Tax treatment remains unresolved.
2. Select **Edit Input / Try Again** to clear the result and return focus to the input.
3. Select **Load Missing-Facts Example**, then **Generate Draft Memo**. The result requests missing information instead of producing a memo.
4. To explore validation, clear the input or type unsupported fictional facts and select **Generate Draft Memo**.

After generation, the page scrolls to the result and moves keyboard focus to its heading or error message without a second scroll. Reduced-motion preferences disable animated scrolling.

## What works now and what is simulated

- Both example-loading buttons populate editable fictional facts.
- The complete example produces a prepared memo with S1–S3 evidence references, the calculation `4 × $1,800 = $7,200`, and review requirements.
- The missing-facts example produces a request for additional information.
- Blank input and unsupported input receive explicit messages instead of a memo.
- Leading/trailing whitespace and line-ending differences are tolerated. Material edits are not treated as supported examples.
- Changing input clears old results. **Edit Input / Try Again** returns focus to the input.
- The course-prototype notice remains visible, and the layout adapts to desktop and mobile.
- This version uses prepared responses. Input handling, example loading, validation, result display, and retry work. Research, drafting, and judgment routing are simulated; no live AI or tax-law research occurs.
- Sample evidence is fictional. Client-reported use and service dates are not independently verified; the workflow checklist is not authoritative tax guidance.
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

## Post-update verification

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

1. **Prepared scenarios only:** Only two fictional examples produce prepared responses. **Next improvement:** interpret user-supplied facts and documents.
2. **No live research or tax determination:** Research and drafting are simulated, and tax treatment remains unresolved. **Next improvement:** retrieve authoritative guidance for professional review.
3. **No persistent client workspace:** This slice does not provide saved client workspaces or review history. **Next improvement:** retain documents, prior analyses, and approved decisions.

## Standalone source handoff

The runnable application consists of `index.html`, `styles.css`, `app.js`, `examples.js`, and `favicon.svg` (the icon comes from `artifacts/ledgerproof-ai/public/`). The source files are served unchanged; no React runtime or backend is needed.

To run these standalone files after downloading the GitHub handoff, put them in the same directory and serve it with any static HTTP server. For example, if Python 3 is installed:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Use an HTTP server rather than opening `index.html` directly, because the browser loads JavaScript modules.

Repository: https://github.com/peytondoty1-ui/GenAI

Only the application files and this README belong in the handoff; unrelated repository content must be preserved. Do not upload secrets, credentials, `.env` files, installed dependencies, or the unused workspace scaffolding.
