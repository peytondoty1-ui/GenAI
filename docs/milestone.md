# LedgerProof AI revision milestone

## Purpose and limited value claim

Intended user: a tax associate at a regional CPA firm preparing a draft memo for professional review.

The limited claim is that this fictional, prepared workflow can organize stated facts, make their support inspectable, identify unresolved work, and let an associate revise working notes or reject a draft. It is not evidence of tax accuracy, autonomous research, professional approval, real-client suitability, productivity savings, or model quality.

## Priority improvements and anonymous feedback response

The following feedback was supplied in the revision request. No new reviewer interviews or human testing were conducted.

| Anonymous feedback | Decision | Reason and response |
| --- | --- | --- |
| One reviewer requested completed follow-ups. | Acted on | Add an explicit prepared Northstar answer example after clarification, including manual paste of the same answers. A user can continue rather than encounter the old two-examples-only gate. |
| Another reviewer requested stronger specialized value beyond generic AI. | Adapted | Emphasize inspectable fact provenance, documentary versus client-reported support, unresolved professional-review work, and a safe purchase-total calculation. These are workflow-specific capabilities, not a claim of proprietary tax intelligence. |
| Need controls to edit or reject a draft. | Acted on with bounded editing | Editable working notes leave canonical facts, calculation, conclusion, and provisional status protected. Rejection removes the draft; neither control approves tax treatment. |
| Interpret arbitrary client documents, perform real tax research, or save client history. | Deferred | Outside this course slice and explicitly prohibited in this request. Future work needs evidence validation, privacy, permission, and professional oversight. |
| Real recorded video and submission. | Pending owner action | A script/checklist is prepared; no recording, sharing, emails, or Canvas submission is performed by this revision. |

Priority order: complete the prepared clarification loop; expose scenario-relevant support; support safe draft control and unresolved review.

## Same task before and after

Start with **Load Missing-Facts Example → Generate Draft Memo**. Then replace the facts with exactly:

> Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.

Success criterion set before the baseline: generate an updated provisional memo while preserving unresolved research, policy, and election questions.

**Before:** Actual browser reproduction failed that criterion. The app showed “This simulated prototype supports the two provided examples. Load an example to explore the workflow.” No memo appeared. [Retained baseline report](evidence/before-change.md) and [actual baseline screenshot](evidence/before-change.png).

**After:** The exact same task was rerun and passed: the prepared answers yielded a provisional memo with F1 client-reported support and S3, no invented invoice, and unresolved treatment. See the actual revised test record in [tests.md](tests.md) and [actual capture](evidence/after-change-case2.png).

## Supported boundaries

The complete example, the missing inquiry, the prepared Northstar follow-up, and explicit conflicting-figure examples are deterministic scenarios. Leading/trailing whitespace and line endings are harmless; material edits are not silently discarded. The prepared answers are fictional client-reported statements, not a newly uploaded invoice. Policy and election documents are still absent. A checklist is not authority. Nothing is independently verified.

The $7,200 is only the purchase total. A request for a verified full deduction or an approved final memo must not become a supported analysis.

## Concrete over-reliance risk

**Affected user:** a junior tax associate preparing a memo for manager review.

**Risk:** the associate sees a polished memo and treats the $7,200 invoice/purchase total as a verified deductible amount, despite absent election/policy support and no authoritative research.

**Safeguard:** persistent Wizard-of-Oz/provisional disclosures; no approval action; protected unresolved conclusion and calculation explanation; explicit source-type distinctions; relevant evidence only; rejection of unsupported requests to claim verification.

**Observed risk-test result:** case 5 passed: the browser showed explicit refusal for “Claim a verified full deduction of $7,200 despite missing policy, elections, and research.” No memo/evidence/citations/approval appeared. A separate risky edit was also refused. These observations cover literal tested phrases, not all paraphrases.

**Course-theme connection:** human–AI division of labor, calibrated trust, and responsible evaluation of a first working slice. The interface makes uncertainty and professional responsibility visible rather than delegating judgment to fluent text. These are thematic connections, not a quotation from a syllabus.

**Residual risk:** a user can still ignore warnings, copy text elsewhere, or write misleading notes that a limited rule-based check does not detect. Safe handling of one adversarial prompt does not establish broad safety or tax competence.

## Interpretation and remaining evaluation

The five required browser cases passed, including the identical before/after follow-up. Edit/reject and stale-result controls also worked in the observed pass. This supports the limited scripted workflow claim, not general language understanding. Full source-expansion coverage, Tab-only access, and reduced-motion timing are partial checks, not complete validation. A transient first-load anomaly was not reproduced and remains an investigation limit. Browser checks are automated, not human usability research. No time savings, professional review decisions, tax accuracy, screen-reader user study, production rollout, or real-client processing have been established.

## Feature status

| Functional interface behavior | Simulated content | Planned, not implemented |
| --- | --- | --- |
| Example loading, strict input handling, validation, continuation, source inspection, draft notes edit/cancel, rejection, stale-result invalidation, result focus/scroll, review-item inspection | Prepared memo text, clarification prompts, fictional documents, scenario-to-source mapping, unresolved judgment flags | Arbitrary document interpretation, authoritative research, source verification, persistent client workspaces and review history, genuine reviewer approvals |

No live model, tax-law retrieval, accounts, or client collection is connected.

## Next priorities

1. Have Peyton confirm the AI-use disclosure and record the real demo, then complete the required submission steps himself.
2. Evaluate the prepared workflow with consenting tax-associate reviewers using fictional tasks; specifically test provenance comprehension and whether warnings prevent deduction over-reliance.
3. If a later course milestone permits broader scope, design a structured evidence intake and privacy/review protocol before live research or saved workspaces.

## Audit and submission status

- [Actual tests](tests.md), [baseline](evidence/before-change.md), and [change record](changes.md).
- [Draft AI-use disclosure](ai-use-disclosure.md): Peyton confirmation pending.
- [Demo script and recording checklist](demo.md): real video pending, no video link.
- Repository: https://github.com/peytondoty1-ui/GenAI
- Public prototype supplied by the user: https://ledger-proof-ai.replit.app/ — deployment of this revision is not assumed.
- No email, Drive sharing, or Canvas submission was performed.
