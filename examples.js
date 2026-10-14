// Prepared, fictional examples. All "AI" output in this prototype is simulated.

export const COMPLETE_EXAMPLE = `Northstar Design LLC purchased four laptops for business use.
Each laptop cost $1,800, and the invoice total was $7,200.
The laptops were placed in service on September 15, 2026.
The client states that business use is 100%.
Prepare a draft federal tax memo evaluating whether the purchase
should be expensed or capitalized. The firm’s applicable policy
and election documentation have not yet been supplied.`;

export const MISSING_EXAMPLE = `My client bought laptops for the business.
Can we deduct the full amount?`;

export const SAMPLE_EVIDENCE = [
  { id: "S1", title: "Purchase invoice", text: "four laptops, $1,800 each, $7,200 total.", basis: "Documentary sample (not independently verified)" },
  { id: "S2", title: "Client questionnaire", text: "placed in service September 15, 2026; business use reported as 100%.", basis: "Client-reported (not independently verified)" },
  { id: "S3", title: "Demo review checklist", text: "confirm applicable authority, tax year, accounting policy, election documentation, and reviewer approval.", basis: "Workflow checklist, not authoritative tax guidance" },
];

export const MESSAGES = {
  blank: "Enter client facts or load an example before generating a draft.",
  unsupported: "This simulated prototype supports the two provided examples. Load an example to explore the workflow.",
};

export const MEMO = {
  heading: "Draft Tax Memo",
  status: "Provisional draft. Professional review required.",
  facts: "Northstar Design LLC purchased four laptops costing $1,800 each. The invoice total is $7,200 [S1]. The client reports that the laptops were placed in service on September 15, 2026 and used entirely for business [S2].",
  issue: "Determine the appropriate federal tax treatment of the equipment purchase, including whether expensing or capitalization applies.",
  calculation: "4 × $1,800 = $7,200.",
  calculationNote: "This is a purchase-total calculation only. It is not a determination of the deductible amount.",
  analysis: "The supplied sample documents establish the purchase amount and reported use. They do not establish the applicable tax treatment. The accountant must confirm relevant authority, firm policy, and election documentation before reaching a conclusion [S3].",
  conclusion: "Tax treatment remains unresolved. This draft organizes the available facts and identifies the research and professional review needed.",
  evidenceNote: "No fact in this draft has been independently verified. The purchase amount comes from a fictional sample invoice [S1]; the placed-in-service date and 100% business use are client-reported [S2]. No IRS citations are provided, and current tax law was not checked.",
  review: [
    "Confirm applicable authoritative guidance for the relevant tax year.",
    "Obtain applicable accounting policy and election documentation.",
    "Confirm the client’s reported business use and placed-in-service date.",
    "Approve the final treatment before client delivery.",
  ],
};

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
