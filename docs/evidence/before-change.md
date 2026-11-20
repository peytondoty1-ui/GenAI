# BEFORE-CHANGE baseline — LedgerProof AI Missing-Facts flow

## Environment
- App root: `artifacts/ledgerproof-ai` (web workflow: `artifacts/ledgerproof-ai: web`, RUNNING)
- URL tested: `https://4444eda2-0592-4747-868b-dac82b6e5ac3-00-zhozsjg7yd6o.spock.replit.dev/`
- Browser: Chromium via Playwright, viewport 1366x900, timezone UTC
- Baseline run started: 2026-11-19 23:56:51 UTC (approx. 9.3 s for the first Generate; 2.7 s for the second Generate)
- No application code, README, or config was changed. The only file written is this report and `docs/evidence/before-change.png`.

## Success criterion (set before the run)
After loading the Missing-Facts Example, clicking Generate Draft Memo, and then replacing the facts with the exact supplied answers and clicking Generate again, the app should return a **provisional memo** with the research, policy, and election items marked **unresolved**.

## Steps and observed results
1. Load "Load Missing-Facts Example" (`data-testid=button-load-missing`): textarea filled with "My client bought laptops for the business. Can we deduct the full amount?" — PASS.
2. Click Generate Draft Memo (`#generate` / `data-testid=button-generate`) on that example: result `data-testid=result-more-info` shows "More information needed" with five requested items (laptop count/costs/invoice total; tax year and placed-in-service date; business-use %; entity type; applicable policy and election documentation). These are listed as bullets, not as literal question sentences. No memo.
3. Replace `#facts-input` (`data-testid=input-facts`) with the EXACT text:
   > Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.
   Input value verified equal to the exact string.
4. Click Generate Draft Memo again.
   - **Actual:** the app rejects the input. The Result region shows an alert `data-testid=error-unsupported` with the text:
     > "This simulated prototype supports the two provided examples. Load an example to explore the workflow."
   - No provisional memo, no `result-more-info`, no unresolved-items list. Only `data-testid=panel-result` wraps the alert.

## Verdict against the desired criterion
**FAIL.** The app does not continue to a provisional memo. It rejects any facts that are not one of the two built-in examples. This is an observed application behavior. It is not a test-tool error. The rejection is a hard gate on input text, so the exact answers are never evaluated.

## Notes
- The plan's IDs (`#load-missing`, `#generate`, `#facts-input`) do exist on the live page. Locators were used exactly as the plan gave them, and the `data-testid` values also work.
- The exact supplied text does not mention entity type, which the first response also asked for. That gap is not what triggers the rejection, because the rejection occurs before any fact check.

## Evidence
- Screenshot: `docs/evidence/before-change.png` (full-page, 160,999 bytes). It shows the exact input in the textarea and the `error-unsupported` alert in the Result section.
- Screenshot file was confirmed to exist with nonzero size after saving.
