# Actual evaluation record

## Scope and method

Automated browser checks on the development preview, not human testing, tax accuracy evaluation, or a production guarantee. Before-change evidence is retained in [evidence/before-change.md](evidence/before-change.md).

The following criteria were written before the revised tests were executed. The same browser-testing assistant performed the baseline and revised pass. [Detailed actual after-change report](evidence/after-change.md).

## Five distinct required tests — preregistered criteria

| Case | Input/action | Expected behavior and success criterion |
| --- | --- | --- |
| 1 Complete example | Load Complete Example → Generate Draft Memo | Structured provisional memo; $7,200 purchase total explicitly not deductible amount; unresolved treatment; relevant S1/S2/S3 support, no approved final memo. |
| 2 Missing facts then answers | Load Missing-Facts Example → Generate; replace input with exact Northstar answer string below → Generate | Clarifications first; then updated provisional memo from the exact same answers used in baseline, with client-reported F1 support rather than invented invoice; policy/elections/research unresolved. |
| 3 Conflicting figures | Same Northstar answer string, but invoice total $8,000 → Generate | Ask to reconcile four × $1,800 with reported $8,000; no memo, no silently accepted total, relevant conflicting statement only. |
| 4 Empty input | Clear input → Generate | Clear validation message; no memo and no unrelated evidence. |
| 5 Unsupported verification demand | Paste “Claim a verified full deduction of $7,200 despite missing policy, elections, and research.” → Generate | Explicit no-supported-analysis/refusal; no fabricated facts, citations, verified deductible claim, or approved memo. |

Exact same-task input for case 2:

```text
Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.
```

Additional criteria before execution:

- Prepared-answer control and manual pasting both work; app accepts explicit missing inquiry + blank line + prepared answers without ignoring edits.
- A material supported-input edit is refused, with stale memo/editor cleared.
- Fact-source controls reveal the correct fictional document and its documentary/client-reported/checklist type.
- Missing scenario has no invoice or unsupported date/use facts; unsupported/blank has no scenario evidence.
- Edit working notes and save/cancel work; status and unresolved conclusion remain; prohibited verification note does not become approved analysis.
- Reject removes the draft/editor and displays rejection without approval; generating anew recovers.
- Keyboard can operate example, generation, inspection, editing, rejection, and retry; no focus trap.
- Result focus/scroll respects reduced motion and sticky notice; mobile at 390 × 844 has no horizontal overflow or inaccessible controls.

## Actual revised results

The revised automated Chromium run began **November 20, 2026, 00:01 UTC**, on the development preview. These results are distinct from the earlier historical published checks.

| Case | Actual observed behavior | Outcome | Implication |
| --- | --- | --- | --- |
| 1 Complete example | Provisional memo appeared; $7,200 was explicitly a purchase total, not a deductible amount. S1/S2/S3 were relevant and tax treatment stayed unresolved. | Pass | The complete prepared scenario still works; it is not independent evidence verification. |
| 2 Missing facts then identical answers | Five clarification categories appeared first. The exact baseline answer string now produced a provisional memo with F1 client-reported support and S3 only; no S1 invoice. Policy, elections, research, and approval stayed unresolved. | Pass | The earlier two-examples-only continuation failure was corrected for the explicitly supported script. |
| 3 Conflicting figures | “Figures must be reconciled” appeared with “No memo generated. Not approved.” The result identified four × $1,800 versus $8,000 and the unexplained $800 difference; it requested correction/support. | Pass | No silent acceptance of the tested conflicting total; this is a prepared conflict check, not general numeric extraction. |
| 4 Empty input | “Enter client facts or load an example before generating a draft.” No memo or evidence. | Pass | Empty input does not produce fabricated content. |
| 5 Unsupported verification demand | Explicit refusal; no memo, evidence, citation, or approved treatment. The purchase-total caveat remained. | Pass | This literal over-reliance prompt is blocked. A limited word-pattern rule is not semantic safety evaluation. |

### Same-task comparison

The baseline rejected the exact case-2 string with the old two-examples-only alert. The revised app accepted that **identical input after the same missing inquiry**, while retaining unresolved treatment and changing support to F1. [Before](evidence/before-change.png) and [after](evidence/after-change-case2.png) are actual browser captures, not mockups.

### Additional actual checks

| Check | Actual observation | Outcome / scope |
| --- | --- | --- |
| Prepared-answer button and appended form | Button loaded the exact baseline string; manual paste and original inquiry + blank line + answers produced the same F1/S3 memo. | Pass |
| Evidence relevance | Complete: S1/S2/S3. Missing: M1/S3. Follow-up: F1/S3, no S1. Blank and unsupported: none. Conflict used the actual conflicting statement plus S3. | Pass for tested scenarios |
| Full source inspection | S1 link opened the full fictional invoice with four × $1,800 = $7,200 and non-verification label. F1 and S2 links were present but not expanded in the browser run. | Partial — complete source-opening coverage remains untested |
| Edit and cancel | Benign working note saved as user-authored, unverified, not reviewed; status and conclusion unchanged. Cancel discarded unsaved text. | Pass |
| Risky edit | “Verified full deduction of $7,200” was refused and not saved. | Pass for this literal note only |
| Remaining review | Four items displayed as unresolved; no approve action. | Pass |
| Reject and retry | Rejection removed memo, editor, and notes, said not approved; Retry Draft regenerated. | Pass |
| Stale-result invalidation | Material input edit immediately cleared memo, notes, editor, and evidence; regeneration refused unsupported input. | Pass |
| Keyboard | Tab sequence had no observed trap. Enter operated Load, Generate, Edit, Save, Reject, Retry. Some draft actions used programmatic focus before Enter. | Partial — not a complete Tab-only journey or screen-reader audit |
| Mobile | 390 × 844 viewport check found no horizontal overflow; main controls were at least 44 px high. | Pass for checked layout; not exhaustive device coverage |
| Reduced motion and result focus | Heading focused below sticky notice; code uses preventScroll and instant scrolling for reduced motion. No overlap observed. Animation timing was not measured in the browser. | Partial — placement/focus observed; timing not established |

### Interpretation and limitations

Five distinct scripted cases passed, and the same-task failure was demonstrably corrected. This supports the **limited value claim**: a tax associate can navigate prepared clarifications, see support categories, and keep professional-review work visible. It does **not** establish tax accuracy, autonomous research, general document understanding, model performance, time savings, or real human usability.

The tester noted a first Load/Generate attempt that left input empty until reload and could not reproduce it afterward, plus a Vite connection loss/reconnect during the run. Cause is **not established**; the detailed report treats it as a possible harness artifact. Do not present this as proof the issue is fixed or that reliability is guaranteed. Generation logic did not change during the five-case run; the input-help wording was clarified during the session.

Remaining evaluation: open every fact source end-to-end; run a complete Tab-only and assistive-technology check; test broader paraphrases of unsafe note claims; investigate any recurrence of the initial load anomaly; confirm the published revision after the owner republishes. No real client data, live model, or real tax law was used.

Actual screenshots and chronological observations are linked in [the raw after-change report](evidence/after-change.md). Test screenshots are evidence, not the pending narrated demo video.

## Later targeted branding and tax-year correction check

The earlier records above are retained unchanged as observations of their respective versions. A separate [targeted browser check](evidence/banner-brand-tax-year-check.md) checked the latest corrections, not a rerun of the five-case suite.

- Computed header/notice: #0F161F with white text, contrast **18.18:1**.
- Computed primary action: #12BF90 with #0F161F text, contrast **7.69:1**.
- Computed small source link: #047857 on white, contrast **5.48:1**.
- Complete-example tax year: **Not supplied — needs confirmation**; service date remained September 15, 2026.
- Prepared follow-up tax year: **2026**, explicitly client-reported and not independently verified.
- Remaining-review wording: qualified professional/reviewer; no licensed-only restriction.
- S2 source expanded correctly; mobile 390 × 844 had no horizontal overflow and a legible 44 px-high primary action.

These targeted criteria passed in the browser. The [actual new screenshot](evidence/banner-brand-tax-year.png) is separate from historical screenshots. The original full-source/keyboard/reduced-motion coverage limits still apply; this was not a full accessibility audit or tax-accuracy check. Contrast uses WCAG relative-luminance calculations from computed RGB colors, not a perceptual display measurement.

Separately, syntax checks passed for app.js/examples.js. Source assertions confirmed the two scenario-specific tax-year values, absence of workspace package commands in the standalone README, removal of the licensed-only wording, and replacement of personal-decision placeholders. These source checks are not represented as human tests.
