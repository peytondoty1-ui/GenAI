# Targeted recheck — banner/brand palette and tax-year label

Status: **COMPLETE** (criteria were written before any action in this recheck and are recorded below unchanged).
Scope: focused recheck of the new palette and the tax-year label only. The prior five-case suite was NOT rerun. `docs/evidence/before-change.md`, `docs/evidence/after-change.md`, and their screenshots were NOT modified.

## Environment
- URL: `https://4444eda2-0592-4747-868b-dac82b6e5ac3-00-zhozsjg7yd6o.spock.replit.dev/`
- Browser: Chromium via Playwright, timezone UTC. Desktop viewport 1366×900; mobile viewport 390×844 for the layout glance.
- Report finalized: 2026-11-20 00:24 UTC (environment clock, `date -u`). Individual check times were not logged; no timing or benchmark claims are made.
- Automated browser checks only. Not human testing, not a model evaluation, and not a tax-accuracy evaluation.

## Preregistered criteria (written before execution)

1. **Palette — header and notice:** the header (`banner`) and the notice (`text-notice`) computed background are `#0F161F`, and their text is white (`#FFFFFF`).
2. **Palette — primary button:** `#generate` ("Generate Draft Memo") computed background is `#12BF90`, and its text is `#0F161F`.
3. **Palette — small link text:** a small inspect-source link text computes to `#047857` (on the page background it appears on).
4. **Contrast:** WCAG 2.x contrast ratio computed from the actual computed RGB values using relative luminance. Normal-text threshold is 4.5:1. Each ratio is reported.
5. **Tax-year label — Complete Example:** after Load Complete Example → Generate, the Facts table "Tax year" row must read **"Not supplied — needs confirmation"**. It must NOT show a derived "2026".
6. **Placed-in-service:** the "Placed in service" row remains "September 15, 2026".
7. **Remaining review wording:** the professional-reviewer wording must refer to a qualified professional or reviewer and must NOT claim a licensed-only requirement.
8. **Missing → prepared answers → memo:** Load Missing-Facts → Generate → Load Prepared Answers → Generate. The memo's tax year must be **2026**, explicitly labelled as client-reported and not independently verified.
9. **Bounded source checks (optional):** S2 and F1 inspect links, if present, reveal their documents. No full-suite rerun.
10. **Mobile 390×844 glance:** primary (Generate) control is readable, with no horizontal overflow.
11. **Screenshot:** one real complete memo screenshot with the year label, saved to `docs/evidence/banner-brand-tax-year.png`.

## Actual results

### 1–2. Palette — header, notice, and primary button (criteria 1, 2) — PASS
Computed styles read at 1366×900 on the root page, before any example was loaded:

| Element (computed) | Background | Text | Contrast | Threshold | Result |
| --- | --- | --- | --- | --- | --- |
| Header (`HEADER`, role banner) | `rgb(15, 22, 31)` = `#0F161F` | `rgb(255, 255, 255)` = `#FFFFFF` | **18.18 : 1** | 4.5 : 1 | PASS |
| Notice (`text-notice`) | `rgb(15, 22, 31)` = `#0F161F` | `rgb(255, 255, 255)` = `#FFFFFF` | **18.18 : 1** | 4.5 : 1 | PASS |
| Generate Draft Memo (`button-generate`) | `rgb(18, 191, 144)` = `#12BF90` | `rgb(15, 22, 31)` = `#0F161F` | **7.69 : 1** | 4.5 : 1 | PASS |

Mobile (390×844), the Generate button computed `rgb(18, 191, 144)` background, `rgb(15, 22, 31)` text, 15.2px, weight 600, 301×44 px. Same contrast (7.69 : 1).

### 3–4. Small link text (criteria 3, 4) — PASS
- Inspect-source links (`link-inspect-S1`, `-S2`, `-F1`) compute to `rgb(4, 120, 87)` = `#047857`, font size 14.88px.
- Backdrop: the link sits in `SECTION.panel.result-panel`, computed `rgb(255, 255, 255)`.
- Contrast `#047857` on white: **5.48 : 1**. Threshold 4.5 : 1 for normal-size text. PASS. (At 14.88px this is not large text, so the normal threshold applies.)

### 5–6. Tax-year label and placed-in-service (criteria 5, 6) — PASS
Complete Example → Generate, facts table:
- Tax year row (verbatim): "Tax year — **Not supplied — needs confirmation** — The placed-in-service date does not establish the client's tax year; confirm separately. Inspect source S2". No derived "2026" appears in the Tax year row.
- Placed in service row (verbatim): "September 15, 2026 — Client-reported, not independently verified. Inspect source S2". Unchanged.

Observation (not a failure): the Tax year row's inspect link points to S2, the client questionnaire. The S2 document (opened) contains the placed-in-service date and business-use answers; it does not state a tax year. The row's own wording says the date does not establish the tax year, so the link is consistent with that wording.

### 7. Remaining review wording (criterion 7) — PASS
- "Remaining review items (all unresolved)" opened. Four items, each "Unresolved": confirm applicable authoritative guidance for the relevant tax year; obtain applicable accounting policy and election documentation; confirm the client's reported business use and placed-in-service date; approve the final treatment before client delivery.
- Closing text (verbatim): "This prototype has no approval action. These items require resolution by a qualified professional/reviewer outside this tool."
- Automated check: "qualified" = true, "reviewer" = true, "licensed" = false. No licensed-only claim.

### 8. Missing → prepared answers → memo (criterion 8) — PASS
- Load Missing-Facts → Generate → "More information needed" shown (`result-more-info` 1). Load Prepared Answers → Generate → memo 1, `error-unsupported` 0.
- Tax year row (verbatim): "Tax year — 2026 — Stated explicitly in client answers; not independently verified. Inspect source F1".
- Placed in service: "September 15, 2026" with a client-reported, not-independently-verified basis.
- Evidence list: `evidence-F1`, `evidence-S3` only. The memo states that no fact has been independently verified.
- Note on an automated flag: a regex for "verified" matched in this memo, but it was the disclaimer "not independently verified" / "has been independently verified", not a verification claim. The rows and the Evidence paragraph were read directly and do not claim verification.

### 9. Bounded source checks (criterion 9) — PASS (bounded)
- S2 link from the Tax year row: `details-doc-S2` opens with the full fictional client questionnaire: "Q: When were the laptops placed in service? A: September 15, 2026. Q: What percentage of use is for business? A: 100%. Answers are as reported by the client. They have not been independently verified."
- S1 and F1 links were not expanded in this recheck (the earlier after-change pass covered S1). Bounded scope kept.

### 10. Mobile 390×844 glance (criterion 10) — PASS
- `scrollWidth` 375 = `clientWidth` 375 (`innerWidth` 390). Overflow 0. No element extends past the right edge.
- Generate Draft Memo: 301×44 px, 15.2px semibold, `#12BF90` background, `#0F161F` text (7.69 : 1). The screenshot (taken at this viewport) shows it legible and full-width.
- Tax year row cell width 301 px. Long text wraps within the table; no horizontal overflow.

### 11. Screenshot (criterion 11) — PASS
- `docs/evidence/banner-brand-tax-year.png`: full-page desktop capture (401,390 bytes) of the Complete Example memo. I opened the saved PNG and confirmed it shows the dark header and notice, the Draft Tax Memo facts table with the Tax year row "Not supplied — needs confirmation", the S2 document expanded, and the Placed in service row "September 15, 2026".

## Limitations
- Automated browser checks only. No human usability testing, no assistive-technology (screen reader) testing, and no tax-accuracy evaluation.
- Contrast ratios are computed from the computed RGB values with the WCAG 2.x relative-luminance formula. They do not measure perceived rendering on a specific display.
- The memo, facts labels, and review wording are preauthored (Wizard-of-Oz). No model runs, and current tax law was not checked.
- The first palette-check attempt failed because of a bad locator in my script (`page.locator('banner')` is not a valid CSS selector). The app was not at fault; the rerun with a valid selector produced the values above.
- The Vite log showed server connection loss and reconnection during the session. Page content was correct after each reload.
- The prior five-case suite was not rerun. Only the palette, the tax-year label, the review wording, the prepared-answer path, bounded S2 check, and the mobile glance were checked.

## Files changed
- Created: `docs/evidence/banner-brand-tax-year-check.md` (this report), `docs/evidence/banner-brand-tax-year.png`.
- Not changed: `docs/tests.md`, `docs/evidence/before-change.md`, `docs/evidence/after-change.md`, the `after-change-*.png` and `before-change.png` evidence files, the application, and any README.
