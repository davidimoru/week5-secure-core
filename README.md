# Week 5 Secure Core — Vulnerability Scanner

## Overview

This project contains a Python-based static vulnerability scanner developed and reviewed during Week 5 of the Secure Core training.

The scanner analyzes JavaScript and TypeScript source files for several common security weaknesses.

## Scanner Rules

### SECRET001 — Hardcoded Secret

Detects secret-like values assigned directly to variables, including API keys, tokens, passwords, and private keys.

**Severity:** HIGH

### SQL001 — Unparameterized SQL

Detects simple SQL query construction where request-derived input is inserted directly into an SQL query.

**Severity:** HIGH

### VAL001 — Missing Visible Validation

Detects request input from `req.query`, `req.body`, or `req.params` when no obvious server-side validation is visible nearby.

**Severity:** MEDIUM

### EXEC001 — Dangerous Command Execution

Detects suspicious `exec()` or `eval()` usage involving request-derived input.

**Severity:** HIGH

### JWT001 — Weak JWT Secret

Detects weak literal JWT signing secrets, including common weak values and short secrets.

**Severity:** HIGH

## Training Fixture Testing

The scanner was tested against three intentionally vulnerable training fixtures.

### vulnerable.js

Detected:

* SECRET001 — HIGH
* VAL001 — MEDIUM
* SQL001 — HIGH

**Total: 3 findings**

### missed.js

Detected:

* VAL001 — MEDIUM
* EXEC001 — HIGH

**Total: 2 findings**

This test demonstrated that the improved scanner successfully detected the dangerous `exec()` pattern that the original AI-generated scanner missed.

### jwt-weak.js

Detected:

* SECRET001 — HIGH
* JWT001 — HIGH

**Total: 2 findings**

This demonstrated that the improved scanner can identify a weak JWT signing secret in addition to the generic hardcoded-secret finding.

## Real Medusa Backend Testing

The scanner was tested against the actual Medusa backend source:

`apps/backend/src`

The scanner analyzed 6 JavaScript/TypeScript files and identified:

* VAL001 — MEDIUM — Request input without visible validation
* SQL001 — HIGH — Possible unparameterized SQL query construction using request input

**Total: 2 findings**

The SQL finding corresponds to the intentionally vulnerable search endpoint:

`apps/backend/src/api/search/route.ts`

The endpoint constructs an SQL query using request input:

`req.query.q`

and inserts that value directly into the SQL query string.

## AI Scanner Review

The original AI-generated scanner successfully detected hardcoded secrets, missing visible validation, and the SQL injection pattern.

However, testing revealed two important limitations:

1. It did not specifically detect dangerous `exec()` or `eval()` usage involving request-derived input.
2. It did not specifically identify weak JWT signing secrets.

The scanner was therefore improved with:

* `EXEC001`
* `JWT001`

The original scanner was preserved as:

`tools/vulnerability_scanner_ai_draft.py`

A pre-Medusa-fix version was also preserved as:

`tools/vulnerability_scanner_before_medusa_fix.py`

## Limitations

This scanner uses static pattern matching rather than full program analysis.

It may:

* Produce false positives.
* Miss vulnerabilities using different coding patterns.
* Miss validation performed in another file or middleware.
* Miss vulnerabilities that require runtime context.
* Fail to determine whether a vulnerability is actually exploitable.

Therefore, a clean scan does not prove that an application is secure.

Scanner findings should be treated as early warnings requiring human review.

## Project Structure

```text
week5-secure-core/
├── artifacts/
│   ├── final-scan-summary.md
│   ├── medusa-backend-scan.txt
│   └── scanner-findings.txt
├── tools/
│   ├── vulnerability_scanner.py
│   ├── vulnerability_scanner_ai_draft.py
│   └── vulnerability_scanner_before_medusa_fix.py
├── training-fixtures/
│   ├── vulnerable.js
│   ├── missed.js
│   └── jwt-weak.js
├── scanner-review.md
└── README.md
```

## Conclusion

The Week 5 scanner was iteratively tested and improved using intentionally vulnerable fixtures and the existing Medusa training project.

The final scanner successfully detects the SQL injection pattern in the Medusa search endpoint and provides additional detection for dangerous command execution and weak JWT secrets.

