import { COMPLETE_EXAMPLE, COMPLETE_CONFLICT_EXAMPLE, MISSING_EXAMPLE, FOLLOWUP, CONFLICT_FOLLOWUP,
  DOCS, FACT_ROWS, MESSAGES, MEMO, MORE_INFO } from "./examples.js";

const input = document.getElementById("facts-input");
const result = document.getElementById("result");
const evidenceList = document.getElementById("evidence-list");
const evidenceHelp = document.getElementById("evidence-help");

// Only line endings and leading/trailing whitespace are ignored.
function normalize(text) {
  return text.replace(/\r\n?/g, "\n").trim();
}

// Simple lexical rule (not semantic fact checking): blocks phrases claiming verification, approval, or finality.
const CLAIM_PATTERNS = [/verified\s+(full\s+)?deduct/i, /full(y)?\s+deduct\w*\s+(is\s+)?verified/i, /fully\s+deductible/i,
  /approved\s+(final\s+)?treatment/i, /final\s+treatment\s+(is\s+)?approved/i, /reviewer\s+approved/i, /\bapproved\b.*\bfinal\b/i];
const claimsApproval = (t) => CLAIM_PATTERNS.some((p) => p.test(t));

const N = normalize;
function classify(raw) {
  const v = N(raw);
  if (v === "") return "blank";
  if (v === N(COMPLETE_EXAMPLE)) return "complete";
  if (v === N(COMPLETE_CONFLICT_EXAMPLE)) return "complete-conflict";
  if (v === N(MISSING_EXAMPLE)) return "missing";
  const appended = (f) => N(MISSING_EXAMPLE) + "\n\n" + N(f);
  if (v === N(FOLLOWUP) || v === appended(FOLLOWUP)) return "followup";
  if (v === N(CONFLICT_FOLLOWUP) || v === appended(CONFLICT_FOLLOWUP)) return "conflict";
  if (claimsApproval(v) || /claim\b.*deduct/i.test(v)) return "refusal";
  return "unsupported";
}

const EVIDENCE = {
  complete: ["S1", "S2", "S3"], missing: ["M1", "S3"], followup: ["F1", "S3"],
  conflict: ["F1C", "S3"], "complete-conflict": ["F1CC", "S3"],
};

let state = null; // { scenario, annotation, rejected, editing }

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) if (child != null) node.append(child);
  return node;
}

function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

function focusAndScroll(target, scrollEl = target, block = "start") {
  if (!target.matches("button, a, textarea, summary")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  scrollEl.scrollIntoView({ behavior: scrollBehavior(), block });
}

/* ---------- Evidence panel ---------- */
function renderEvidence(scenario) {
  const keys = EVIDENCE[scenario] || [];
  evidenceList.replaceChildren(...keys.map((k) => {
    const d = DOCS[k];
    return el("li", { class: "evidence-item", "data-testid": `evidence-${d.id}` }, [
      el("span", { class: "tag", text: "Fictional sample evidence" }),
      el("p", {}, [el("strong", { text: `${d.id}: ${d.title}` })]),
      el("p", { class: "basis", text: d.basis }),
      el("details", { class: "doc", id: `doc-${d.id}`, "data-testid": `details-doc-${d.id}` }, [
        el("summary", { text: `Full fictional document ${d.id}` }),
        el("pre", { class: "doc-body", text: d.body }),
      ]),
    ]);
  }));
  evidenceHelp.textContent = keys.length
    ? "Evidence shown applies only to the current recognized input. None of it has been independently verified."
    : "No scenario evidence. Evidence appears only after a supported example is generated.";
}

function inspectLink(src) {
  return el("a", { href: `#doc-${src}`, class: "inspect", "data-testid": `link-inspect-${src}`,
    onclick: (e) => {
      e.preventDefault();
      const d = document.getElementById(`doc-${src}`);
      if (!d) return;
      d.open = true;
      focusAndScroll(d.querySelector("summary"), d, "center");
    } }, [`Inspect source ${src}`]);
}

function factTable(rows) {
  return el("table", { class: "facts", "data-testid": "table-facts" }, [
    el("thead", {}, el("tr", {}, ["Fact", "Value", "Source and basis"].map((h) => el("th", { scope: "col", text: h })))),
    el("tbody", {}, rows.map(([label, value, s]) => el("tr", {}, [
      el("th", { scope: "row", text: label }),
      el("td", { text: value }),
      el("td", {}, [el("span", { class: "basis", text: `${s.basis}. ` }), inspectLink(s.src)]),
    ]))),
  ]);
}

/* ---------- Result views ---------- */
function showPlaceholder() {
  result.replaceChildren(el("p", { class: "placeholder", text: "No result yet. Load an example and select Generate Draft Memo." }));
}

function showMessage(text, testId) {
  result.replaceChildren(el("p", { class: "message", role: "alert", "data-testid": testId, text }));
}

function section(title, content) {
  return el("section", { class: "memo-section" }, [el("h4", { text: title })].concat(content));
}

function reviewDetails() {
  return el("details", { class: "review-details", id: "review-items", "data-testid": "details-review-items" }, [
    el("summary", { text: "Remaining review items (all unresolved)" }),
    el("ul", { class: "review" }, MEMO.review.map((r) => el("li", {}, [el("span", { class: "pill", text: "Unresolved" }), " ", r]))),
    el("p", { class: "note", text: "This prototype has no approval action. These items require resolution by a qualified professional/reviewer outside this tool." }),
  ]);
}

function showMemo() {
  const { scenario } = state;
  const rows = FACT_ROWS[scenario];
  const srcNote = scenario === "complete" ? MEMO.evidenceNoteComplete : MEMO.evidenceNoteFollowup;

  const annotation = state.annotation
    ? section("Working annotations", [
        el("div", { class: "annotation", "data-testid": "text-annotation" }, [
          el("span", { class: "tag tag-user", text: "User-authored, unverified, not reviewed" }),
          el("p", { text: state.annotation }),
        ]),
      ])
    : null;

  const editor = state.editing ? el("form", { class: "editor", "data-testid": "form-edit", onsubmit: saveEdit }, [
    el("label", { for: "annotation-input", class: "field-label", text: "Working notes and analysis annotations" }),
    el("p", { class: "help", id: "edit-scope", text: "Editable scope: your working notes only. Facts, calculation, conclusion, and status are locked. Notes are labelled user-authored and unverified; they never mark the draft approved. Notes claiming a verified deduction or an approved final treatment are refused by a simple word-pattern rule, which is not semantic fact checking." }),
    el("textarea", { id: "annotation-input", rows: "5", "aria-describedby": "edit-scope edit-error", "data-testid": "input-annotation" }),
    el("p", { id: "edit-error", class: "edit-error", role: "alert" }),
    el("div", { class: "button-row" }, [
      el("button", { type: "submit", class: "btn btn-primary", "data-testid": "button-save-edit", text: "Save Draft Edits" }),
      el("button", { type: "button", class: "btn btn-ghost", "data-testid": "button-cancel-edit", text: "Cancel Edit", onclick: cancelEdit }),
    ]),
  ]) : null;

  result.replaceChildren(el("article", { class: "memo", "data-testid": "memo-draft" }, [
    el("h3", { text: MEMO.heading }),
    el("p", { class: "status", "data-testid": "text-status", text: MEMO.status }),
    el("div", { class: "button-row draft-controls" }, [
      el("button", { type: "button", class: "btn btn-secondary", "data-testid": "button-edit-draft", text: "Edit Draft", onclick: startEdit, ...(state.editing ? { disabled: "" } : {}) }),
      el("button", { type: "button", class: "btn btn-ghost", "data-testid": "button-reject-draft", text: "Reject Draft", onclick: rejectDraft }),
      el("button", { type: "button", class: "btn btn-ghost", "data-testid": "button-inspect-review", text: "Inspect Remaining Review Items", onclick: inspectReview }),
    ]),
    editor,
    section("Facts", [factTable(rows), el("p", { class: "note", text: "Locked. Every fact is from fictional sample material; no fact has been independently verified." })]),
    section("Issue", el("p", { text: MEMO.issue })),
    section("Calculation", [el("p", { class: "calc", text: MEMO.calculation }), el("p", { text: MEMO.calculationNote })]),
    section("Draft analysis", el("p", { text: MEMO.analysis })),
    annotation,
    section("Provisional conclusion", el("p", { text: MEMO.conclusion })),
    section("Evidence", el("p", { class: "note", text: srcNote })),
    section("Professional review required", reviewDetails()),
  ]));
  if (state.editing) {
    const ta = document.getElementById("annotation-input");
    ta.value = state.annotation || "";
  }
}

function showMoreInfo() {
  result.replaceChildren(el("article", { class: "memo info", "data-testid": "result-more-info" }, [
    el("h3", { text: MORE_INFO.heading }),
    el("p", { text: MORE_INFO.explanation }),
    el("ul", { class: "review" }, MORE_INFO.needs.map((n) => el("li", { text: n }))),
    el("p", { class: "note" }, ["Source of request: fictional client inquiry ", inspectLink("M1"), ". No answers have been invented."]),
    el("section", { class: "prepared", "aria-labelledby": "prepared-heading" }, [
      el("h4", { id: "prepared-heading", text: "Prepared follow-up answers (Wizard-of-Oz script)" }),
      el("p", { class: "help", text: "These fictional client answers are prepared in advance for this course prototype. Load them, or copy them manually and paste them alone or after the original inquiry with one blank line. Any other wording is not supported." }),
      el("textarea", { class: "prepared-text", readonly: "", rows: "7", "aria-label": "Prepared follow-up answers, read-only, selectable for copying", "data-testid": "text-prepared-followup" }, [FOLLOWUP]),
      el("div", { class: "button-row" }, [
        el("button", { type: "button", class: "btn btn-primary", "data-testid": "button-load-prepared", text: "Load Prepared Answers",
          onclick: () => loadExample(FOLLOWUP) }),
      ]),
    ]),
    el("p", { class: "next" }, [el("strong", { text: "Next step: " }), MORE_INFO.nextStep]),
  ]));
}

function showConflict() {
  const rows = state.scenario === "conflict" ? FACT_ROWS.conflict
    : FACT_ROWS.conflict.map((r) => [r[0], r[1].replace("client-reported; ", "client facts; "), { src: "F1", basis: "Client facts as entered, not independently verified" }]);
  result.replaceChildren(el("article", { class: "memo info", "data-testid": "result-conflict" }, [
    el("h3", { text: "Figures must be reconciled" }),
    el("p", { class: "status", text: "No memo generated. Not approved." }),
    el("p", {}, ["Please reconcile ", el("strong", { text: "4 × $1,800 = $7,200" }), " against the stated ", el("strong", { text: "invoice total of $8,000" }), ". The $800 difference is unexplained."]),
    el("p", { text: "No memo was drafted and no deductible amount is claimed. Request the actual invoice or a corrected figure from the client." }),
    section("Facts as supplied", factTable(rows)),
  ]));
}

function showRejected() {
  result.replaceChildren(el("div", { class: "message rejected", role: "alert", "data-testid": "text-rejected" }, [
    el("p", { text: "Draft rejected. It is not approved and has been removed, including any working notes." }),
    el("button", { type: "button", class: "btn btn-secondary", "data-testid": "button-retry", text: "Retry Draft", onclick: generate }),
  ]));
}

/* ---------- Draft controls ---------- */
function startEdit() {
  state.editing = true;
  showMemo();
  focusAndScroll(document.getElementById("annotation-input"), document.getElementById("annotation-input"), "center");
}
function cancelEdit() {
  state.editing = false;
  showMemo();
  focusAndScroll(document.querySelector('[data-testid="button-edit-draft"]'), result.closest(".result-panel"));
}
function saveEdit(e) {
  e.preventDefault();
  const ta = document.getElementById("annotation-input");
  const text = ta.value.trim();
  if (claimsApproval(text)) {
    document.getElementById("edit-error").textContent = "Not saved. Notes cannot claim a verified deduction or an approved final treatment. (Word-pattern check only; it does not fact-check other text.)";
    ta.focus({ preventScroll: true });
    return;
  }
  state.annotation = text;
  state.editing = false;
  showMemo();
  const target = document.querySelector('[data-testid="text-annotation"]') || result.querySelector("h3");
  focusAndScroll(target, target, "center");
}
function rejectDraft() {
  state = { scenario: state.scenario, rejected: true };
  renderEvidence(null);
  showRejected();
  focusAndScroll(result.querySelector('[role="alert"]'), result.closest(".result-panel"));
}
function inspectReview() {
  const d = document.getElementById("review-items");
  d.open = true;
  focusAndScroll(d.querySelector("summary"), d, "center");
}

/* ---------- Generate ---------- */
function generate() {
  const scenario = classify(input.value);
  state = { scenario, annotation: "", rejected: false, editing: false };
  renderEvidence(scenario);
  if (scenario === "blank") showMessage(MESSAGES.blank, "error-blank");
  else if (scenario === "complete" || scenario === "followup") showMemo();
  else if (scenario === "missing") showMoreInfo();
  else if (scenario === "conflict" || scenario === "complete-conflict") showConflict();
  else if (scenario === "refusal") showMessage(MESSAGES.refusal, "error-refusal");
  else showMessage(`${MESSAGES.unsupported} ${MESSAGES.boundary}`, "error-unsupported");
  const panel = result.closest(".result-panel");
  // Keep the result below the persistent notice, including when it wraps on mobile.
  panel.style.scrollMarginTop = `${document.querySelector(".notice").getBoundingClientRect().height + 12}px`;
  focusAndScroll(result.querySelector('[role="alert"], h3'), panel);
}

function invalidate() {
  state = null;
  renderEvidence(null);
  showPlaceholder();
}

function loadExample(text) {
  input.value = text;
  invalidate();
  input.focus({ preventScroll: true });
  input.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
}

document.getElementById("load-complete").addEventListener("click", () => loadExample(COMPLETE_EXAMPLE));
document.getElementById("load-missing").addEventListener("click", () => loadExample(MISSING_EXAMPLE));
document.getElementById("load-conflict").addEventListener("click", () => loadExample(CONFLICT_FOLLOWUP));
document.getElementById("generate").addEventListener("click", generate);
document.getElementById("edit-again").addEventListener("click", () => {
  invalidate();
  input.focus({ preventScroll: true });
  input.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
});
input.addEventListener("input", invalidate);

renderEvidence(null);
