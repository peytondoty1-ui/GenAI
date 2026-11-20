// Prepared, fictional examples. Wizard-of-Oz prototype: every "AI" response is pre-written.

export const COMPLETE_EXAMPLE = `Northstar Design LLC purchased four laptops for business use.
Each laptop cost $1,800, and the invoice total was $7,200.
The laptops were placed in service on September 15, 2026.
The client states that business use is 100%.
Prepare a draft federal tax memo evaluating whether the purchase
should be expensed or capitalized. The firm’s applicable policy
and election documentation have not yet been supplied.`;

export const COMPLETE_CONFLICT_EXAMPLE = COMPLETE_EXAMPLE.replace("the invoice total was $7,200", "the invoice total was $8,000");

export const MISSING_EXAMPLE = `My client bought laptops for the business.
Can we deduct the full amount?`;

export const FOLLOWUP = `Northstar Design LLC bought four laptops at $1,800 each, invoice total $7,200, tax year 2026, placed in service September 15, 2026, business use 100%, policy and election documents not supplied.`;

export const CONFLICT_FOLLOWUP = FOLLOWUP.replace("invoice total $7,200", "invoice total $8,000");

const NOT_VERIFIED = "not independently verified";

export const DOCS = {
  S1: { id: "S1", title: "Purchase invoice", basis: `Documentary sample (${NOT_VERIFIED})`,
    body: `FICTIONAL SAMPLE INVOICE (course prototype)
Invoice no. FS-20417
Bill to: Northstar Design LLC

Item              Qty   Unit price    Amount
Laptop computer   4     $1,800.00     $7,200.00

Invoice total: $7,200.00

This document is invented for a course exercise. It has not been independently verified.` },
  S2: { id: "S2", title: "Client questionnaire", basis: `Client-reported (${NOT_VERIFIED})`,
    body: `FICTIONAL CLIENT QUESTIONNAIRE (course prototype)
Client: Northstar Design LLC

Q: When were the laptops placed in service?
A: September 15, 2026.

Q: What percentage of use is for business?
A: 100%.

Answers are as reported by the client. They have not been independently verified.` },
  S3: { id: "S3", title: "Demo review checklist", basis: "Workflow checklist, not authoritative tax guidance",
    body: `DEMO REVIEW CHECKLIST (workflow aid only, not authoritative tax guidance)
[ ] Confirm applicable authority for the relevant tax year.
[ ] Confirm tax year.
[ ] Obtain firm accounting policy.
[ ] Obtain election documentation.
[ ] Reviewer approval before client delivery.` },
  M1: { id: "M1", title: "Fictional client inquiry", basis: `Client-reported inquiry (${NOT_VERIFIED})`, body: MISSING_EXAMPLE },
  F1: { id: "F1", title: "Fictional client answers", basis: `Client-reported answers (${NOT_VERIFIED}); no invoice was supplied`, body: FOLLOWUP },
  F1C: { id: "F1", title: "Fictional client answers (conflicting figures)", basis: `Client-reported answers (${NOT_VERIFIED}); no invoice was supplied`, body: CONFLICT_FOLLOWUP },
  F1CC: { id: "F1", title: "Fictional client facts as entered (conflicting figures)", basis: `Client-reported (${NOT_VERIFIED}); no invoice was supplied`, body: COMPLETE_CONFLICT_EXAMPLE },
};

export const MESSAGES = {
  blank: "Enter client facts or load an example before generating a draft.",
  unsupported: "This simulated prototype supports only the prepared scenarios listed below. Load an example to explore the workflow.",
  boundary: "Supported inputs only: the Complete Example, the Missing-Facts Example, the prepared follow-up answers (alone, or pasted after the Missing-Facts Example with one blank line), and the conflicting-figures variants. Any other edit is not interpreted. No memo, evidence, or citations were produced.",
  refusal: "Refused. LedgerProof AI cannot claim a verified deduction, an approved treatment, or a final conclusion. Policy, elections, and research are unresolved, and $7,200 is a purchase total, not a deductible amount. No memo was produced.",
};

export const MEMO = {
  heading: "Draft Tax Memo",
  status: "Provisional draft. Professional review required.",
  issue: "Determine the appropriate federal tax treatment of the equipment purchase, including whether expensing or capitalization applies.",
  calculation: "4 × $1,800 = $7,200.",
  calculationNote: "This is a purchase-total calculation only. It is not a determination of the deductible amount.",
  analysis: "The supplied facts state the purchase amount and reported use. They do not establish the applicable tax treatment. The accountant must confirm relevant authority, firm policy, and election documentation before reaching a conclusion [S3].",
  conclusion: "Tax treatment remains unresolved. This draft organizes the available facts and identifies the research and professional review needed.",
  evidenceNoteComplete: "No fact in this draft has been independently verified. The purchase amount comes from a fictional sample invoice [S1]; the placed-in-service date and 100% business use are client-reported [S2]. No IRS citations are provided, and current tax law was not checked.",
  evidenceNoteFollowup: "No fact in this draft has been independently verified. Every figure, the date, and business use are client-reported answers [F1]; no invoice was supplied. No IRS citations are provided, and current tax law was not checked.",
  review: [
    "Confirm applicable authoritative guidance for the relevant tax year.",
    "Obtain applicable accounting policy and election documentation.",
    "Confirm the client’s reported business use and placed-in-service date.",
    "Approve the final treatment before client delivery.",
  ],
};

const tx = (src, basis) => ({ src, basis });
export const FACT_ROWS = {
  complete: [
    ["Quantity", "Four laptops", tx("S1", "Documentary sample, not independently verified")],
    ["Unit cost", "$1,800", tx("S1", "Documentary sample, not independently verified")],
    ["Invoice total", "$7,200 (purchase total, not a deductible amount)", tx("S1", "Documentary sample, not independently verified")],
    ["Placed in service", "September 15, 2026", tx("S2", "Client-reported, not independently verified")],
    ["Business use", "100%", tx("S2", "Client-reported, not independently verified")],
    ["Entity", "LLC (from the name Northstar Design LLC)", tx("S1", "Inferred from client name; entity classification not verified")],
    ["Tax year", "Not supplied — needs confirmation", tx("S2", "The placed-in-service date does not establish the client's tax year; confirm separately")],
  ],
  followup: [
    ["Quantity", "Four laptops", tx("F1", "Client-reported answer, not independently verified")],
    ["Unit cost", "$1,800", tx("F1", "Client-reported answer, not independently verified")],
    ["Invoice total", "$7,200 (client-reported; no invoice supplied)", tx("F1", "Client-reported answer, not independently verified")],
    ["Placed in service", "September 15, 2026", tx("F1", "Client-reported answer, not independently verified")],
    ["Business use", "100%", tx("F1", "Client-reported answer, not independently verified")],
    ["Entity", "LLC (from the name Northstar Design LLC)", tx("F1", "Inferred from client name; entity classification not verified")],
    ["Tax year", "2026", tx("F1", "Stated explicitly in client answers; not independently verified")],
  ],
};
FACT_ROWS.conflict = FACT_ROWS.followup.map((r) => r[0] === "Invoice total"
  ? ["Invoice total", "$8,000 (client-reported; conflicts with 4 × $1,800)", r[2]] : r);

export const MORE_INFO = {
  heading: "More information needed",
  explanation: "The draft memo cannot be completed from the supplied facts. Please provide:",
  needs: [
    "Number of laptops, individual costs, and invoice total",
    "Tax year and placed-in-service date",
    "Business-use percentage",
    "Entity type",
    "Applicable policy and election documentation",
  ],
  nextStep: "Update the client facts, or load the complete example to explore the draft-memo experience.",
};
