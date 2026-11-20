# Independent published-prototype verification

On November 19, 2026 (America/Indianapolis), ChatGPT ran independent isolated Google Chrome checks against https://ledger-proof-ai.replit.app/ after the functional revision was published. These supplement Replit Agent's development-preview tests. Success criteria were stated before each case was executed.

| Case | Success criterion | Actual result | Outcome |
| --- | --- | --- | --- |
| Typical 1: complete example | Provisional memo, purchase-total caveat, unresolved treatment, relevant S1/S2/S3 | Memo appeared; $7,200 was a purchase total, not a determined deductible amount; treatment stayed unresolved. | Pass |
| Typical 2: clarification then answers | Clarifications followed by a provisional memo from the exact prepared answers; no invented invoice | Clarification appeared, then the exact prepared answers produced a memo supported by F1/S3. No S1 invoice appeared. | Pass |
| Challenge: conflicting figures | Request reconciliation and withhold a memo | Four times $1,800 was compared with the stated $8,000 total; the unexplained $800 difference was identified and no memo appeared. | Pass |
| Empty input | Ask for facts, with no memo or scenario evidence | Clear validation message; no memo or scenario evidence. | Pass |
| Risk: unsupported verified deduction | Refuse the tested unsupported verification request without fabricated support | Explicit refusal; no memo, citations, or scenario evidence. | Pass for the literal tested request |

The exact continuation input was:

> Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.

For an independent same-task comparison, an isolated page that retained the original app loaded before deployment was given the missing inquiry and then those identical answers. It returned the old two-examples-only message. The published revision accepted those answers and kept tax treatment unresolved. The original repository baseline is commit `73d0c6dec8f81e8fcbc123cea086a5a078334af3`.

## Additional observed checks

- Full S1 invoice, S2 client questionnaire, F1 client answers, and S3 checklist could each be opened.
- A working note saved with an explicit user-authored, unverified, not-reviewed label. The provisional status remained.
- A note claiming a verified full deduction was refused; cancel exited the editor.
- Remaining review items opened as unresolved. Reject removed the memo and notes; retry regenerated.
- Changing the input immediately removed the stale memo and evidence.
- A 390 by 844 mobile viewport had no horizontal overflow in the checked workflow.
- No page JavaScript errors were observed in the five-case run.

One test assertion initially failed because CSS rendered the unverified label in uppercase. A case-insensitive assertion confirmed the intended label; no product change was needed. This was a test-harness correction, not a hidden product failure.

## Limits

These are automated checks of deterministic prepared scenarios, not professional usability research, tax verification, semantic safety validation, or evidence of time savings. Broad paraphrase handling, screen-reader behavior, real document interpretation, and live-model performance remain untested. The phrase-based refusal must not be presented as protection against every misleading claim.

The original development-preview observations remain in [tests.md](tests.md). Raw independent results and screenshots accompany this report in [published evidence](../evidence/published-tests.json).

## Final published correction check

After the banner-matched color and fact-label corrections were published, an additional targeted check confirmed the ink header `#0F161F`, emerald primary action `#12BF90` with ink text, the complete example's tax year marked as not supplied/needs confirmation, and qualified-reviewer wording. The five functional cases above preceded these small corrections; the recorded walkthrough then exercised the finished published version. See the [targeted release result](../evidence/final-release-check.json). The actual video is linked from the [demo record](demo.md).
