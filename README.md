# Week 5 DevSecOps Security Gate Dossier

## Operation: Secure Core — Cohort 2

This repository demonstrates a DevSecOps security gate that detects security weaknesses in application code, blocks vulnerable changes, verifies security remediation, and documents the resulting security controls.

The workflow follows:

**Detect → Fix → Verify → Enforce → Document**

The project uses a Python static vulnerability scanner integrated with GitHub Actions.

---

## 1. Project Purpose

The purpose of this project is to demonstrate that insecure code can be detected automatically before it progresses through a development pipeline.

The project demonstrates:

1. A vulnerable training fixture producing HIGH security findings.
2. A non-zero scanner exit code for vulnerable code.
3. Secure remediation of the identified vulnerabilities.
4. A passing local scan after remediation.
5. A failed GitHub Actions security gate for vulnerable code.
6. A successful GitHub Actions security gate after remediation.
7. Security policy requirements mapped to technical controls and evidence.
8. Secret-hygiene checks before submission.

---

## 2. Tools and Versions

The project uses:

* Kali Linux
* Python 3
* Git
* GitHub
* GitHub Actions
* actions/checkout@v4
* actions/setup-python@v5

The scanner is implemented in `tools/vulnerability_scanner.py`.

---

## 3. Vulnerability Scanner

The scanner performs static pattern-based analysis of JavaScript and TypeScript files.

### Scanner Rules

| Rule      | Severity | Purpose                                                             |
| --------- | -------- | ------------------------------------------------------------------- |
| SECRET001 | HIGH     | Detects hardcoded secret or API-key-like values                     |
| SQL001    | HIGH     | Detects possible unparameterized SQL query construction             |
| VAL001    | MEDIUM   | Detects request input without visible validation                    |
| EXEC001   | HIGH     | Detects dangerous command execution involving request-derived input |
| JWT001    | HIGH     | Detects weak literal JWT signing secrets                            |

A HIGH finding causes the scanner to return exit code `1`.

A scan with no HIGH findings returns exit code `0`.

---

## 4. Task 1 — Failed Local Scan

The vulnerable training fixture is `training-fixtures/vulnerable.js`.

Run the following commands:

```
python3 tools/vulnerability_scanner.py training-fixtures/vulnerable.js
echo $?
```

The vulnerable version produced HIGH findings including:

* SECRET001 — HIGH
* SQL001 — HIGH

The scanner returned exit code `1`.

Evidence: `evidence/local-failed-scan.png`

This demonstrates that the scanner detects the vulnerable code and produces a failing result.

---

## 5. Task 2 — Remediation

The vulnerable implementation contained security weaknesses including a hardcoded secret and SQL query construction using request-derived input.

The remediation included:

* Moving the demonstration API key to environment-based configuration.
* Replacing direct SQL string construction with a parameterized query.
* Adding visible request validation where required by the training fixture.
* Replacing unsafe command execution with an allow-list of permitted commands in the command-execution training fixture.
* Replacing the weak JWT signing secret with environment-based configuration.

The important security principle is that the vulnerable code was corrected rather than simply hiding the scanner output.

The corrected SQL implementation uses a parameterized query:

```
const query =
  "SELECT id, name FROM products WHERE name LIKE $1";
const rows = await db.query(query, [`%${term}%`]);
```

Parameterized queries prevent request input from being interpreted as part of the SQL statement.

---

## 6. Task 3 — Successful Local Scan

Run:

```
python3 tools/vulnerability_scanner.py training-fixtures/fixed.js
echo $?
```

The corrected fixture produced no HIGH findings and returned exit code `0`.

A MEDIUM validation finding may be reported depending on the scanner rule configuration. The security gate is configured to fail on HIGH findings.

Evidence: `evidence/local-passed-scan.png`

A passing scan does not prove that the entire application is secure. It proves that the configured scanner rules passed for the tested file.

---

## 7. Task 4 — GitHub Actions Security Gate

The automated security workflow is located at `.github/workflows/security-scan.yml`.

The workflow:

1. Checks out the repository.
2. Sets up Python.
3. Runs the vulnerability scanner.
4. Allows the scanner's exit code to determine whether the security gate passes or fails.

The security-gate step does not use `|| true` or `continue-on-error: true`, because those mechanisms could hide scanner failures.

### Failed Pipeline

The vulnerable version was pushed to the test branch.

GitHub Actions detected the security findings and marked the security scan as failed.

Evidence: `evidence/failed-pipeline.png`

### Passed Pipeline

After remediation, the corrected code was pushed.

The GitHub Actions security scan completed successfully and the pull request security check passed.

Evidence: `evidence/passed-pipeline.png`

---

## 8. Security Policy

The repository contains a practical security policy covering:

* Data at Rest
* Data in Transit
* Access Control
* Incident Response
* Acceptable Use

See `security-policy.md`.

---

## 9. Control Register

The control register maps policy requirements to:

* Policy statements
* Technical controls
* Verification methods
* Evidence

See `control-register.md`.

---

## 10. Peer Review

Peer-review feedback and the resulting changes are documented in `peer-review.md`.

The submitted security policy represents the final version after review.

---

## 11. Secret Hygiene

Before submission, the repository was checked for accidentally committed passwords, API keys, private keys, tokens, and other sensitive credentials.

The documented check is `evidence/secret-hygiene-check.md`.

No real credentials were intentionally committed to the repository.

---

## 12. Evidence Review

The evidence directory contains four required screenshots:

| Evidence                | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `local-failed-scan.png` | Vulnerable code produces a failing local scan |
| `local-passed-scan.png` | Corrected code passes the local security gate |
| `failed-pipeline.png`   | GitHub Actions blocks the vulnerable change   |
| `passed-pipeline.png`   | GitHub Actions accepts the corrected change   |

These screenshots provide visual evidence of the Detect → Fix → Verify → Enforce process.

---

## 13. Scanner Limitations

The scanner uses static pattern matching rather than full program analysis.

It may:

* Produce false positives.
* Miss vulnerabilities using different coding patterns.
* Miss validation performed in another file or middleware.
* Miss vulnerabilities that require runtime context.
* Fail to determine whether a vulnerability is actually exploitable.

Therefore, a clean scan does not prove that an application is secure.

Scanner results should be treated as security signals requiring appropriate human review.

---

## 14. Project Structure

```
week5-secure-core/
├── .github/
│   └── workflows/
│       └── security-scan.yml
├── evidence/
│   ├── failed-pipeline.png
│   ├── local-failed-scan.png
│   ├── local-passed-scan.png
│   ├── passed-pipeline.png
│   └── secret-hygiene-check.md
├── tools/
│   ├── vulnerability_scanner.py
│   ├── vulnerability_scanner_ai_draft.py
│   └── vulnerability_scanner_before_medusa_fix.py
├── training-fixtures/
│   ├── vulnerable.js
│   ├── fixed.js
│   ├── missed.js
│   └── jwt-weak.js
├── artifacts/
├── control-register.md
├── peer-review.md
├── scanner-review.md
├── security-policy.md
├── .gitignore
└── README.md
```

---

## 15. Reproduction Summary

### Failed Security Gate

```
python3 tools/vulnerability_scanner.py training-fixtures/vulnerable.js
echo $?
```

Expected result: a HIGH finding and exit code `1`.

### Successful Security Gate

```
python3 tools/vulnerability_scanner.py training-fixtures/fixed.js
echo $?
```

Expected result: no HIGH findings and exit code `0`.

### Automated Verification

GitHub Actions automatically runs the scanner when the configured branch or pull request workflow is triggered.

A non-zero scanner result causes the security-gate workflow to fail.

---

## 16. Conclusion

This project demonstrates an automated DevSecOps security control that can detect vulnerable code, block insecure changes, verify remediation, and provide documented evidence of the security decision.

The security gate is intentionally limited to the rules implemented by the scanner and therefore should be combined with code review, testing, secure configuration, dependency management, and other security controls.
