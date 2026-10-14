import { COMPLETE_EXAMPLE, MISSING_EXAMPLE, SAMPLE_EVIDENCE, MESSAGES, MEMO, MORE_INFO } from "./examples.js";

const input = document.getElementById("facts-input");
const result = document.getElementById("result");
const evidenceList = document.getElementById("evidence-list");

// Only line endings and leading/trailing whitespace are ignored.
function normalize(text) {
  return text.replace(/\r\n?/g, "\n").trim();
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) node.append(child);
  return node;
}

function evidenceItem(item) {
  return el("li", { class: "evidence-item", "data-testid": `evidence-${item.id}` }, [
    el("span", { class: "tag", text: "Fictional sample evidence" }),
    el("p", {}, [el("strong", { text: `${item.id}: ${item.title}: ` }), item.text]),
    el("p", { class: "basis", text: item.basis }),
  ]);
}

function renderEvidencePanel() {
  SAMPLE_EVIDENCE.forEach((item) => evidenceList.append(evidenceItem(item)));
}

function showPlaceholder() {
  result.replaceChildren(el("p", { class: "placeholder", text: "No result yet. Load an example and select Generate Draft Memo." }));
}

function showMessage(text, testId) {
  result.replaceChildren(el("p", { class: "message", role: "alert", "data-testid": testId, text }));
}

function section(title, content) {
  return el("section", { class: "memo-section" }, [el("h4", { text: title })].concat(content));
}

function showMemo() {
  const evidence = el("ul", { class: "memo-evidence" },
    SAMPLE_EVIDENCE.map((item) => el("li", {}, [
      el("strong", { text: `${item.id}: ${item.title}: ` }), item.text,
      el("span", { class: "basis", text: ` (${item.basis}.)` }),
    ])));

  result.replaceChildren(el("article", { class: "memo", "data-testid": "memo-draft" }, [
    el("h3", { text: MEMO.heading }),
    el("p", { class: "status", "data-testid": "text-status", text: MEMO.status }),
    section("Facts", el("p", { text: MEMO.facts })),
    section("Issue", el("p", { text: MEMO.issue })),
    section("Calculation", [el("p", { class: "calc", text: MEMO.calculation }), el("p", { text: MEMO.calculationNote })]),
    section("Draft analysis", el("p", { text: MEMO.analysis })),
    section("Provisional conclusion", el("p", { text: MEMO.conclusion })),
    section("Evidence", [evidence, el("p", { class: "note", text: MEMO.evidenceNote })]),
    section("Professional review required", el("ul", { class: "review" }, MEMO.review.map((r) => el("li", { text: r })))),
  ]));
}

function showMoreInfo() {
  result.replaceChildren(el("article", { class: "memo info", "data-testid": "result-more-info" }, [
    el("h3", { text: MORE_INFO.heading }),
    el("p", { text: MORE_INFO.explanation }),
    el("ul", { class: "review" }, MORE_INFO.needs.map((n) => el("li", { text: n }))),
    el("p", { class: "next" }, [el("strong", { text: "Next step: " }), MORE_INFO.nextStep]),
  ]));
}

function generate() {
  const value = normalize(input.value);
  if (value === "") showMessage(MESSAGES.blank, "error-blank");
  else if (value === normalize(COMPLETE_EXAMPLE)) showMemo();
  else if (value === normalize(MISSING_EXAMPLE)) showMoreInfo();
  else showMessage(MESSAGES.unsupported, "error-unsupported");
  const panel = result.closest(".result-panel");
  // Keep the result below the persistent notice, including when it wraps on mobile.
  panel.style.scrollMarginTop = `${document.querySelector(".notice").getBoundingClientRect().height + 12}px`;
  const focusTarget = result.querySelector('[role="alert"], h3');
  focusTarget.setAttribute("tabindex", "-1");
  focusTarget.focus({ preventScroll: true });
  panel.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

function loadExample(text) {
  input.value = text;
  showPlaceholder();
  input.focus();
}

document.getElementById("load-complete").addEventListener("click", () => loadExample(COMPLETE_EXAMPLE));
document.getElementById("load-missing").addEventListener("click", () => loadExample(MISSING_EXAMPLE));
document.getElementById("generate").addEventListener("click", generate);
document.getElementById("edit-again").addEventListener("click", () => {
  showPlaceholder();
  input.focus({ preventScroll: true });
  input.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
});
input.addEventListener("input", showPlaceholder);

renderEvidencePanel();
