# Vulnerability Scanner Review

## AI-Generated First Draft

The first AI-generated scanner was tested against the Week 5 vulnerable
training fixtures.

### What the Scanner Detected

The scanner successfully detected:

- A hardcoded secret-like value
- Request input without visible validation
- SQL query construction using request input

The scan of `training-fixtures/vulnerable.js` produced three findings:
two HIGH findings and one MEDIUM finding.

### Review Finding 1: Missing EXEC Detection

**Test file:** `training-fixtures/missed.js`

**Pattern tested:** Request-derived input is passed to `exec()`.

**Expected behavior:** The scanner should identify dangerous use of
`exec` or `eval` near request-derived input.

**Actual behavior:** The scanner reported `VAL001` because
`req.query.command` was used without visible validation, but it did not
report a specific HIGH-severity command-execution finding.

**Conclusion:** The AI-generated scanner detects the missing validation but
misses the more specific and higher-risk `exec()` pattern.

### Review Finding 2: Static Analysis Limitation

**Issue:** The scanner relies on static patterns and nearby source code.

**Why this matters:** A validation function may exist in another file or
middleware layer and not be visible to the scanner.

**Conclusion:** A scanner finding is an early warning that requires human
review. A clean scan does not prove that the application is secure.

### Review Finding 3: Missing Specific JWT Weakness Detection

**Test file:** `training-fixtures/jwt-weak.js`

**Pattern tested:** A weak literal JWT signing secret is used with
`jwt.sign()`.

**Expected behavior:** The scanner should identify a weak literal JWT
signing secret using a specific `JWT001` rule.

**Actual behavior:** The scanner reported the literal as a generic
`SECRET001` hardcoded secret finding, but it did not identify the
JWT-specific weakness.

**Conclusion:** The AI-generated scanner can identify that a secret-like
literal exists, but it lacks context-specific detection for weak JWT
signing secrets.

## Improvements Planned

1. Add an `EXEC001` rule for dangerous `exec` or `eval` usage near
   request-derived input.
2. Add a `JWT001` rule for weak literal JWT signing secrets.
