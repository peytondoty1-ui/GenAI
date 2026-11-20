# AFTER-CHANGE browser evaluation — LedgerProof AI

## Scope, environment, and method
- URL: `https://4444eda2-0592-4747-868b-dac82b6e5ac3-00-zhozsjg7yd6o.spock.replit.dev/`
- Workflow: `artifacts/ledgerproof-ai: web` (Vite dev server; served `index.html` + `app.js` + `examples.js`)
- Browser: Chromium via Playwright, timezone UTC. Desktop viewport 1366×900 unless noted; mobile 390×844 for the mobile check.
- Run timing (UTC, from the browser environment): run started **2026-11-20 00:01:24**; last timed log **2026-11-20 00:10:04**. Later checks were run after that and were not timed. No benchmark timing savings are claimed.
- Automated browser checks only. This is **not** human testing, **not** a tax-accuracy evaluation, and **not** a production guarantee. Memo text is pre-written by the course prototype (Wizard-of-Oz), so the "analysis" tests the workflow and wording, not real tax law.
- Criteria are the ones in `docs/tests.md`, preregistered before execution. Neither `docs/tests.md` nor the app was modified.
- Baseline for comparison: `docs/evidence/before-change.md` (the exact Northstar answer was rejected with `error-unsupported`).
- Selector note: the plan's `#load-prepared` does not exist on the live page; the button is `button-load-prepared` (appears only in the clarification panel). `#review-items` is the `details` element inside the memo. `#annotation-input` exists. `#result`/`#evidence-list` exist. `button-retry` appears after rejection.

## Summary of results

| Case / check | Verdict |
| --- | --- |
| 1 Complete example | **PASS** |
| 2 Missing → exact Northstar answers (baseline task) | **PASS** (baseline FAIL → now provisional memo) |
| 2a Load Prepared Answers button (from clean missing state) | **PASS** |
| 2b Appended form (inquiry + blank line + exact answer) | **PASS** |
| 3 Conflicting figures ($8,000) | **PASS** (one minor note: S3 also listed in evidence) |
| 4 Empty input | **PASS** |
| 5 Unsupported verification demand | **PASS** |
| Inspect-source links | **PARTIAL** (S1 verified; F1 and S2 links present but their documents not opened) |
| Missing scenario has M1/S3 only; unsupported has no evidence | **PASS** |
| Material input edit clears memo/notes/evidence/editor; Generate refuses the edited text | **PASS** |
| Edit Draft → benign note saved, labelled unverified, status intact | **PASS** |
| Cancel discards unsaved edit | **PASS** |
| Prohibited note "Verified full deduction of $7,200" refused, not saved | **PASS** |
| Inspect Remaining Review Items (all unresolved, no approval action) | **PASS** |
| Reject removes draft/editor/notes; Retry regenerates | **PASS** |
| Keyboard operation of example, generate, edit, save, reject, retry; no focus trap | **PASS** (caveat: edit/reject/retry focused via `element.focus()` before Enter) |
| Mobile 390×844: no horizontal overflow; controls usable | **PASS** |
| Reduced motion: instant scroll, result focus with preventScroll, notice no overlap | **PARTIAL** (source and positions verified; scroll timing not measured) |

## Case log (criterion → action → observed → verdict → implication)

### Case 1 — Complete example
- **Criterion (preregistered):** structured provisional memo; $7,200 explicitly not a deductible amount; unresolved treatment; relevant S1/S2/S3 support; no approved final memo.
- **Action:** after a clean reload, Load Complete Example (`button-load-complete`) → Generate (`#generate`).
- **Observed:** "Draft Tax Memo", status "Provisional draft. Professional review required." Facts table: invoice total "$7,200 (purchase total, not a deductible amount)" sourced to S1; placed-in-service and business use sourced to S2; "Inspect source" links present. Verbatim memo text (from the accessibility snapshot and a textContent read):
  - Calculation: "4 × $1,800 = $7,200." / "This is a purchase-total calculation only. It is not a determination of the deductible amount."
  - Draft analysis: "The supplied facts state the purchase amount and reported use. They do not establish the applicable tax treatment. The accountant must confirm relevant authority, firm policy, and election documentation before reaching a conclusion [S3]."
  - Provisional conclusion: "Tax treatment remains unresolved. This draft organizes the available facts and identifies the research and professional review needed."
  - Evidence: "No fact in this draft has been independently verified. The purchase amount comes from a fictional sample invoice [S1]; the placed-in-service date and 100% business use are client-reported [S2]. No IRS citations are provided, and current tax law was not checked."
  - Evidence list: S1, S2, S3. Edit Draft, Reject Draft, and Inspect Remaining Review Items present. No approved status.
- **Verdict: PASS.**
- **Implication:** the preauthored Complete memo meets the criterion.
- **Harness note:** a first Load + Generate attempt, made before the reload, left the textarea empty and the result at "No result yet." After a reload, the same steps worked, the console showed no page errors, and I did not reproduce the first failure. I treat it as a harness or timing artifact, not an app defect. It is recorded here as observed.
- **Screenshot:** `docs/evidence/after-change-case1.png` (memo element, 190,477 bytes).

### Case 2 — Missing facts, then exact Northstar answers (same task as baseline)
- **Criterion (preregistered):** clarifications first; then an updated provisional memo from the exact same answers as the baseline; client-reported F1 support, not an invented invoice; policy/elections/research unresolved.
- **Action:** Load Missing-Facts (`button-load-missing`) → Generate → read the clarifications → fill `#facts-input` with the exact Northstar string (value verified identical) → Generate.
- **Observed, clarifications:** "More information needed" (`result-more-info`) with five items: laptop count/costs/invoice total; tax year and placed-in-service date; business-use %; entity type; applicable policy and election documentation. Source link `link-inspect-M1`. The prepared follow-up block (`text-prepared-followup`, read-only) and `button-load-prepared` are shown.
- **Observed, after exact input:** no `error-unsupported`. "Draft Tax Memo", status "Provisional draft. Professional review required." Every facts-table row (quantity, unit cost, invoice total "$7,200 (client-reported; no invoice supplied)", placed in service, business use, entity, tax year) is sourced to F1. Evidence list: exactly `evidence-F1` and `evidence-S3`. Source-reference counts in the memo text: S1 = 0, S2 = 0, F1 = 8, S3 = 1. The conclusion reads "Tax treatment remains unresolved." The evidence paragraph reads "Every figure, the date, and business use are client-reported answers [F1]; no invoice was supplied."
- **Verdict: PASS.** This is a direct change from the baseline: the same string was rejected (`error-unsupported`) before the change.
- **Implication:** the app now accepts the exact string and returns a provisional memo with F1 provenance and unresolved treatment. It still uses preauthored output.
- **Screenshot:** `docs/evidence/after-change-case2.png` (memo element, 184,732 bytes).

### Case 2a — Load Prepared Answers button (related check)
- **Criterion (preregistered):** the prepared-answer control and manual paste both work.
- **Action:** from a clean missing state (clarifications shown), click `button-load-prepared`; read the textarea; Generate.
- **Observed:** the textarea equals the exact Northstar string (exact and trimmed equal). Generate produced the same provisional memo as the manual paste: S1 = 0; evidence `evidence-F1` and `evidence-S3` only; "Tax treatment remains unresolved."
- **Verdict: PASS.**

### Case 2b — Appended form (related check)
- **Criterion (preregistered):** the explicit missing inquiry + one blank line + prepared answers is accepted without ignoring edits.
- **Action:** from a clean missing state, the app's own inquiry text ("My client bought laptops for the business.\nCan we deduct the full amount?") + "\n\n" + the exact Northstar answer was entered (value verified). Generate.
- **Observed:** a provisional memo with no clarifications and no error. S1 = 0; F1 = 8; unresolved treatment.
- **Verdict: PASS.**

### Case 3 — Conflicting figures ($8,000)
- **Criterion (preregistered):** asks to reconcile 4 × $1,800 with the reported $8,000; no memo; no silently accepted total; only the relevant conflicting statement.
- **Action:** from a fresh page, `#facts-input` set to the Northstar string with "invoice total $8,000" (value verified). Generate.
- **Observed (verbatim, `result-conflict`, from a chunked textContent read):** heading "Figures must be reconciled"; "No memo generated. Not approved."; "Please reconcile 4 × $1,800 = $7,200 against the stated invoice total of $8,000. The $800 difference is unexplained."; "No memo was drafted and no deductible amount is claimed. Request the actual invoice or a corrected figure from the client."; the facts table's invoice-total cell reads "$8,000 (client-reported; conflicts with 4 × $1,800)" with "Inspect source F1". No memo (count 0), no `error-unsupported`, no `result-more-info`. Evidence list: `evidence-F1` ("F1: Fictional client answers (conflicting figures)") and `evidence-S3` ("S3: Demo review checklist").
- **Verdict: PASS.**
- **Minor note:** S3 (workflow checklist) is still listed in the evidence, which is broader than strictly needed for a conflict message.
- **Screenshot:** `docs/evidence/after-change-case3.png` (result panel, 118,493 bytes).

### Case 4 — Empty input
- **Criterion (preregistered):** clear validation message; no memo; no unrelated evidence.
- **Action:** cleared `#facts-input` (value verified `""`) → Generate. Repeated after a reload for the saved screenshot.
- **Observed:** `error-blank` alert: "Enter client facts or load an example before generating a draft." No memo; no conflict or clarification panel; evidence list empty ("No scenario evidence. Evidence appears only after a supported example is generated."). The textarea has no native validation message (`checkValidity()` true); the message is the app's own alert.
- **Verdict: PASS.**
- **Screenshot:** `docs/evidence/after-change-case4.png` (result panel, 6,328 bytes).

### Case 5 — Unsupported verification demand
- **Criterion (preregistered):** explicit refusal; no fabricated facts, citations, verified deductible claim, or approved memo.
- **Action:** pasted "Claim a verified full deduction of $7,200 despite missing policy, elections, and research." (value verified) → Generate. Repeated after a reload for the saved screenshot.
- **Observed (verbatim, `error-refusal`):** "Refused. LedgerProof AI cannot claim a verified deduction, an approved treatment, or a final conclusion. Policy, elections, and research are unresolved, and $7,200 is a purchase total, not a deductible amount. No memo was produced." No memo; evidence list empty; no citations; no approved status.
- **Verdict: PASS.**
- **Implication:** the refusal comes from a fixed word-pattern rule. Paraphrases of the same demand were not tested.
- **Screenshot:** `docs/evidence/after-change-case5.png` (result panel, 18,573 bytes).

## Related checks

### Inspect-source links — PARTIAL
- **Criterion (preregistered):** the link reveals the correct full document and basis for important facts.
- **Observed:** the Complete memo's S1 link (`link-inspect-S1`, href `#doc-S1`) opens `details-doc-S1`, which shows "FICTIONAL SAMPLE INVOICE (course prototype) Invoice no. FS-20417 Bill to: Northstar Design LLC … Laptop computer 4 $1,800.00 $7,200.00 … Invoice total: $7,200.00 … It has not been independently verified." The evidence basis reads "Documentary sample (not independently verified)."
- **Not verified:** the F1 document (for the Northstar memo) and the S2 document were not opened. The F1 and S2 links were present in the facts tables but their documents were not expanded.
- **Verdict: PARTIAL** (one of the required documents checked).

### Missing scenario M1/S3 only; unsupported has no evidence — PASS
- In the Missing-Facts state the evidence list contained exactly `evidence-M1` and `evidence-S3`. In the unsupported and blank states the evidence list was empty.

### Material input edit — PASS
- On the Complete memo with a saved working note, appending " Updated." to the facts (no Generate) removed the memo, the saved note, the evidence, and the editor immediately; the panel reset to "No result yet. Load an example and select Generate Draft Memo."
- Clicking Generate with the edited text returned `error-unsupported` ("…Any other edit is not interpreted. No memo, evidence, or citations were produced."), no memo, and no evidence.
- Screenshot of this refusal state: `docs/evidence/after-change-reduced-motion.png` is not that state. (Not separately saved.)

### Edit Draft / working notes — PASS
- `button-edit-draft` opened `#annotation-input` with `button-save-edit` ("Save Draft Edits") and `button-cancel-edit` ("Cancel Edit"); Edit Draft was disabled while editing. Scope text: "Editable scope: your working notes only. Facts, calculation, conclusion, and status are locked…"
- Saving "Obtain election documents before any conclusion." shows the note under "USER-AUTHORED, UNVERIFIED, NOT REVIEWED". Status remained "Provisional draft. Professional review required."; the conclusion remained "Tax treatment remains unresolved."
- Cancel with unsaved text "Unsaved cancel test" closed the editor. The text did not appear in the memo; the saved note was unchanged.
- Prohibited note "Verified full deduction of $7,200": Save showed `#edit-error` "Not saved. Notes cannot claim a verified deduction or an approved final treatment. (Word-pattern check only; it does not fact-check other text.)" The saved note stayed the benign one; the prohibited text did not appear in the memo. Cancel then closed the editor.

### Inspect Remaining Review Items — PASS
- `button-inspect-review` opened `#review-items` (open). Items, each labelled "Unresolved": "Confirm applicable authoritative guidance for the relevant tax year."; "Obtain applicable accounting policy and election documentation."; "Confirm the client's reported business use and placed-in-service date."; "Approve the final treatment before client delivery." No approve control exists on the page (0 buttons named approve).

### Reject and Retry — PASS
- `button-reject-draft` removed the memo, editor, and notes. `text-rejected` read "Draft rejected. It is not approved and has been removed, including any working notes." Evidence list empty; no approve control.
- `button-retry` ("Retry Draft") then generated a fresh provisional memo with `evidence-S1`, `evidence-S2`, `evidence-S3`; the rejected message was gone.

### Keyboard — PASS (with a caveat)
- Tab order from the top: Load Complete → Load Missing → Load Conflicting → facts textarea → Generate → Edit Input / Try Again → body → wraps. No focus trap.
- Keyboard-only generation: after loading the Complete example with Enter, focus moved to the textarea; one Tab reached `button-generate`; Enter produced the provisional memo.
- Keyboard Enter then operated `button-edit-draft`, `#annotation-input` (typed by keyboard), `button-save-edit`, `button-reject-draft`, and `button-retry`; the note saved and the retry regenerated the memo.
- **Caveat:** for edit, reject, and retry, the element was focused with `element.focus()` before pressing Enter, not reached by Tab. The Tab-order check above covered the top-level controls only.

### Mobile 390×844 — PASS
- Viewport 390 × 844 with the Complete memo generated: `document.documentElement.scrollWidth` = 375 and `clientWidth` = 375 (overflow 0). No element extended past the viewport. Main controls measured at 301×44 px (Generate, Edit Draft, Reject Draft, Inspect Remaining Review Items). The screenshot shows the three memo action buttons stacked full width.

### Reduced motion — PARTIAL
- With `prefers-reduced-motion: reduce` emulated at 1366×900, the Complete memo was generated. The memo heading (H3) had focus; it was positioned below the sticky notice (`text-notice` is `position: sticky`, bottom 41 px; heading top 122 px), so they did not overlap. `window.matchMedia('(prefers-reduced-motion: reduce)').matches` = true.
- Source (`app.js`): the scroll helper returns `"instant"` under reduced motion, and focus uses `{ preventScroll: true }` before `scrollIntoView`. The computed CSS `scroll-behavior` on `html` is `auto`, which is a separate setting.
- **Not verified:** the scroll timing itself was not measured, so instant scrolling is supported by the source, not by a timed observation.
- Screenshot: `docs/evidence/after-change-reduced-motion.png` (125,645 bytes).

## Limitations
- Browser automation only. No human usability testing, no assistive-technology (screen reader) testing, and no tax-accuracy evaluation.
- The memo, calculation, and conclusion text are preauthored; the app does not run a model and does not check current law.
- Word-pattern refusal rules are literal patterns; paraphrased prohibited claims were not tested.
- Keyboard checks for edit, reject, and retry used programmatic focus before Enter.
- The reduced-motion check verified source and positions, not scroll timing.
- Not all source documents were opened (F1 and S2 inspect links were not expanded).
- One first-attempt harness anomaly in Case 1 was not reproduced after a reload (see the harness note).
- The app is served by the Vite dev server; the Vite log showed a connection loss and reconnect during the run.

## Screenshot files (saved and size-checked)
- `docs/evidence/before-change.png` — baseline rejection (from the baseline run)
- `docs/evidence/after-change-case1.png` — Case 1 memo
- `docs/evidence/after-change-case2.png` — Case 2 memo from the exact Northstar answer
- `docs/evidence/after-change-case3.png` — Case 3 reconcile result
- `docs/evidence/after-change-case4.png` — Case 4 validation alert
- `docs/evidence/after-change-case5.png` — Case 5 refusal
- `docs/evidence/after-change-reduced-motion.png` — reduced-motion desktop memo state

## Files changed
- Created: `docs/evidence/after-change.md` (this report), `docs/evidence/after-change-case1.png` … `after-change-case5.png` (Cases 1–5 as listed), `docs/evidence/after-change-reduced-motion.png`.
- No changes to `docs/tests.md`, the application, or any README.
