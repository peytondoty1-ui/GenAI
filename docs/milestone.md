# LedgerProof AI revision milestone

## Purpose and limited value claim

Intended user: a tax associate at a regional CPA firm preparing a draft memo for professional review.

The limited claim is that this fictional, prepared workflow can organize stated facts, make their support inspectable, identify unresolved work, and let an associate revise working notes or reject a draft. It is not evidence of tax accuracy, autonomous research, professional approval, real-client suitability, productivity savings, or model quality.

## Priority improvements and anonymous feedback response

The feedback below comes from the supplied peer comments. No new reviewer interviews or human testing were conducted.

| Feedback or observed issue | Decision | What changed, or why it was not implemented |
| --- | --- | --- |
| Loading an example, generating a memo, editing input, and trying again worked. | Preserved and checked | The central example-to-memo and retry flow remains functional. The revision also adds bounded working-note editing, rejection, and stale-result invalidation. |
| The provisional memo structure, source references, review checklist, simulation transparency, and distinction between a purchase total and a deduction were useful. | Preserved and expanded | These features remain. Important facts now have inspectable fictional support, relevant evidence is shown per scenario, and documentary samples, client-reported statements, and the non-authoritative checklist are distinguished. |
| Add stronger specialized value beyond what someone could achieve with a general-purpose AI tool. | Adapted; partially addressed | The revision emphasizes provenance inspection, unresolved review work, source-type distinctions, and draft controls in one tax-associate workflow. It does not establish unique capabilities, superiority over configured general-purpose AI, or a competitive advantage. Comparative testing with tax associates and real research capabilities remain future work. |
| Supplying answers after the Missing-Facts Example returned the old two-examples-only message. | Acted on; fixed within the simulated scope | An explicit prepared Northstar continuation now produces an updated provisional memo. The prepared answers may be loaded or pasted in the supported form, including after the inquiry. The same task passed its before/after comparison. Arbitrary follow-up wording and real client facts remain unsupported; no general-language understanding is claimed. |
| In Iris's Verizon cancellation flow, Skip ahead should jump directly to the next decision instead of showing multiple rapid updates. | Not applicable to the current LedgerProof prototype | This comment describes a cancellation/call assistant. LedgerProof has no Verizon cancellation, retention-offer, call-update, or Skip ahead flow. No Iris behavior was changed, and this issue must not be claimed as solved by LedgerProof. |

### Additional product decisions

These decisions come from the assignment requirements and revision work, rather than being falsely attributed to the classmates.

- **Bounded editing and rejection:** working notes can be edited while core facts, calculation, provisional status, and unresolved conclusion remain protected. Rejection removes the draft without approving tax treatment.
- **Scope:** arbitrary document interpretation, authoritative research, verified treatment, and saved client history remain deferred. Peyton explicitly selected keeping the AI simulated for this milestone.
- **Recorded demo:** an actual screen recording with disclosed computer-generated narration was completed, uploaded, and made viewable by both required instructors. Peyton's final review and Canvas submission remain his next actions.

Priority order: complete the prepared clarification loop; expose scenario-relevant support; support safe draft control and unresolved review.

## Same task before and after

Start with **Load Missing-Facts Example → Generate Draft Memo**. Then replace the facts with exactly:

> Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.

Success criterion set before the baseline: generate an updated provisional memo while preserving unresolved research, policy, and election questions.

**Before:** Actual browser reproduction failed that criterion. The app showed “This simulated prototype supports the two provided examples. Load an example to explore the workflow.” No memo appeared. [Retained baseline report](evidence/before-change.md) and [actual baseline screenshot](evidence/before-change.png).

**After:** The exact same task was rerun and passed: the prepared answers yielded a provisional memo with F1 client-reported support and S3, no invented invoice, and unresolved treatment. See the actual revised test record in [tests.md](tests.md) and [actual capture](evidence/after-change-case2.png).

## Supported boundaries

The complete example, the missing inquiry, the prepared Northstar follow-up, and explicit conflicting-figure examples are deterministic scenarios. Leading/trailing whitespace and line endings are harmless; material edits are not silently discarded. The prepared answers are fictional client-reported statements, not a newly uploaded invoice. Policy and election documents are still absent. A checklist is not authority. Nothing is independently verified. In the complete example, tax year is not supplied and needs confirmation; a 2026 placed-in-service date does not establish it. The follow-up explicitly reports tax year 2026 without verification. Remaining items require a qualified professional/reviewer, not an assertion of a particular licensing requirement.

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

1. Evaluate fictional tasks with tax associates, including whether provenance and review controls offer useful value over their current tools.
2. Complete Tab-only and assistive-technology checks and test broader misleading-note paraphrases.
3. Define structured evidence intake, source verification, privacy, and review controls before considering live research or saved client workspaces.

## Audit and submission status

- [Development test record](tests.md) and [independent published verification](published-verification.md).
- [Draft AI-use disclosure](ai-use-disclosure.md) records Peyton's confirmed scope decision; broader final review remains his responsibility.
- [Actual narrated demo](https://drive.google.com/file/d/1_aQ7fVNYklS2G46TxJyBncQ-dpkYaXPi/view?usp=drivesdk) and [transcript](demo-script.md). Computer-generated narration is disclosed.
- Reader access for both required instructors was verified. No invitation emails were sent.
- Public repository: https://github.com/peytondoty1-ui/GenAI
- Published prototype: https://ledger-proof-ai.replit.app/
- Canvas submission remains pending; see the [checklist](../submission-checklist.md).
