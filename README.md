# LedgerProof AI

LedgerProof is a course prototype for tax associates at regional CPA firms preparing a provisional tax memo for professional review. It demonstrates organizing fictional facts, inspecting their support, resolving a prepared clarification, and keeping unresolved judgments visible.

## Open the prototype

https://ledger-proof-ai.replit.app/

No account is required. Use fictional information only. The published revision uses the LedgerProof ink and emerald palette sampled from the saved brand banner.

## Try the revised central task

1. Load the Missing-Facts Example and select Generate Draft Memo.
2. Read the clarification requests, select Load Prepared Answers, and generate again. The supported answers produce a provisional memo with client-reported support; no invoice is invented.
3. Inspect a fact's source. Add a working note, inspect remaining review items, or reject the draft.
4. Try the Complete Example, Conflicting-Figures Example, empty input, and unsupported requests.

Only explicitly prepared scenarios are supported. The interface explains the boundaries. Arbitrary wording and material edits are not silently interpreted.

## Milestone materials

- [Current application source](app.js), [prepared scenarios and fictional documents](examples.js), [page](index.html), [styles](styles.css), and [icon](favicon.svg).
- [Priority improvements, anonymous feedback decisions, risk response, interpretation, and next priorities](docs/milestone.md).
- [Development-preview test plan and actual results](docs/tests.md).
- [Independent published checks: five distinct cases, controls, source inspection, and limits](docs/published-verification.md).
- [Original failure and before/after evidence](docs/evidence/before-change.md).
- [Draft AI-use disclosure, including Peyton's confirmed scope decision](docs/ai-use-disclosure.md).
- [Recorded demo details](docs/demo.md) and [narration transcript](docs/demo-script.md).
- [Auditable change history](docs/changes.md) and [final submission checklist](submission-checklist.md).

## Demo Video

[Watch the recorded demo on Google Drive](https://drive.google.com/file/d/1_aQ7fVNYklS2G46TxJyBncQ-dpkYaXPi/view?usp=drivesdk)

The MP4 is 2 minutes 41 seconds. It is an actual browser screen recording with clearly disclosed computer-generated macOS Samantha narration. The voice does not imitate Peyton. The same video should be uploaded directly to Canvas.

Viewing access was granted and checked for Emelia Hughes (ehughes8@nd.edu) and Samuel Huang (ghuang3@nd.edu). No sharing invitation emails were sent.

## AI role and implementation status

| Functional interface behavior | Simulated behavior | Planned, not implemented |
| --- | --- | --- |
| Example loading, strict validation, prepared continuation, source inspection, bounded working-note editing/cancel, rejection/retry, stale-result invalidation, and review-item inspection | Memo drafting, clarification content, scenario-source mapping, and fictional supporting documents are prepared in advance | Arbitrary client-document interpretation, authoritative research, verified tax treatment, saved client workspaces, and genuine reviewer approval |

The intended AI task is to organize client facts and support into a draft, identify missing information, and expose work needing professional judgment. Inputs are fictional facts or supported prepared answers. Outputs are a provisional memo, clarification, conflict explanation, or refusal. No live model or tax-law retrieval is connected.

The $7,200 is a purchase total, not a determined deductible amount. Documentary samples, client-reported statements, and a non-authoritative workflow checklist are identified separately. The complete example's tax year is not supplied and must be confirmed. The prototype has no approval action.

## Evidence and limits

Five distinct published-workflow cases passed their stated criteria: complete example, clarification then answers, conflicting figures, empty input, and the literal unsupported-verification demand. The same prepared follow-up failed in the original version and continued in the revised version. A later targeted check confirmed the published banner colors, corrected tax-year label, and qualified-reviewer wording.

These are automated observations of scripted behavior. They do not establish tax accuracy, semantic safety, real-user usefulness, time savings, or model performance. Phrase-based refusal is limited. Full Tab-only and assistive-technology evaluation, real-user testing, and broader unsupported-input coverage remain priorities.

## Run locally

Download or clone this repository. With Python 3 installed, run from its root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Use an HTTP server because the page loads JavaScript modules. The standalone handoff needs no package installation, build step, backend, database, account, or API key. Replit's separate workspace build scaffolding is not required to run these repository files.

## Next priorities

1. Test fictional tasks with tax associates, especially whether they understand source categories and unresolved review work.
2. Complete Tab-only and assistive-technology checks and evaluate broader misleading-note paraphrases.
3. Define structured evidence intake, source verification, privacy, and review controls before considering live research or saved client workspaces.

## Submission status

Code, revision documentation, test evidence, draft disclosure, published prototype, and the recorded Drive demo are prepared. Peyton should review the demo and disclosure, then submit the public repository link and this same MP4 file together in Canvas. Canvas has not been submitted by ChatGPT.
