# LedgerProof AI

LedgerProof AI helps tax associates turn client facts into evidence-supported draft tax memos with clear professional-review flags.

## Intended User

Tax associates at regional CPA firms with 50–200 employees preparing memos and workpapers for professional review.

## First Working Slice

Load fictional client facts → select **Generate Draft Memo** → receive a prepared provisional memo with facts, issue, purchase-total calculation, sample evidence references, and review flags.

The missing-facts example requests clarification. Blank and unsupported inputs receive clear messages. Users can edit input and try again.

## Open the Prototype

https://ledger-proof-ai.replit.app/

Select **Load Complete Example**, then **Generate Draft Memo**. Read the result. Select **Edit Input / Try Again**, then try **Load Missing-Facts Example** and generate again. Only the two provided examples produce prepared responses. Use fictional data only.

## AI Role and Prototype Status

Future AI would research authoritative guidance, synthesize client documents, draft and revise memos, identify missing facts, and escalate uncertain judgments for professional review.

This is a **Wizard-of-Oz prototype**. Research, drafting, source matching, and judgment routing are simulated with prewritten responses. No live AI model or authoritative-source retrieval is connected.

**Functional now:** example loading, editable input, validation, scenario matching, result display, automatic result scrolling and focus, and retry. Changing input clears old results.

**Simulated now:** memos, clarification questions, evidence references, and review flags. All evidence is fictional. S3 is a workflow checklist, not tax authority. Facts are not independently verified. The $7,200 calculation is a purchase total, not a deductible amount. Tax treatment remains unresolved.

The prototype was developed in Replit using AI-assisted development. AI-assisted coding is separate from the simulated AI behavior inside the product.

## Test Results

The ChatGPT browser assistant reran these tests against the **published Replit URL on October 13, 2026 (America/Indianapolis)**. Results evaluate the simulated user experience, not tax accuracy.

| Test | Input or action | What happened | Pass, partial, or fail |
| --- | --- | --- | --- |
| Typical case | Load Complete Example, then Generate Draft Memo | A provisional memo appeared with facts, issue, 4 × $1,800 = $7,200, S1–S3 references, unresolved tax treatment, and professional-review requirements. Its heading received focus. | Pass |
| Challenge case | Load Missing-Facts Example, then Generate Draft Memo | More information needed appeared, requesting costs and total, tax year and service date, business use, entity type, and policy/election documentation. No memo appeared. | Pass |
| Invalid or empty case | Clear input, then Generate Draft Memo | A message requested client facts or an example. No memo appeared. | Pass |

Additional checks passed: unsupported input received the coverage explanation; editing input cleared old results; retry cleared the result and returned focus to input. Automatic result scrolling was observed. Both public links were accessible during review.

## Known Limitations

1. **Prepared scenarios only.** Only two fictional examples produce prepared responses; material edits receive a coverage message. Next improvement: interpret user-supplied facts and documents.
2. **No live research or tax determination.** Research and drafting are simulated, and tax treatment remains unresolved. Next improvement: retrieve authoritative guidance with traceable support for professional review.
3. **No persistent client context.** Inputs and results are not saved across sessions. Next improvement: retain client documents, prior analyses, and approved decisions in client workspaces.

## Run Locally

The static application consists of index.html, styles.css, app.js, examples.js, and favicon.svg. No package installation, build step, backend, database, or API key is required.

Download or clone the repository. From its root, with Python 3 installed, run:


```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Use an HTTP server because the application loads JavaScript modules.

## Submission

- Public repository: https://github.com/peytondoty1-ui/GenAI
- Working prototype: https://ledger-proof-ai.replit.app/
- Canvas note: The three completed test cases and known limitations are documented in README.md under Test Results and Known Limitations.
