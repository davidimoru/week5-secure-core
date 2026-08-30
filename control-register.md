# Control Register

## Operation: Secure Core — Cohort 2

This control register maps the requirements in the Security Policy to the
technical controls used in this project, the methods used to verify those
controls, and the available evidence.

| Policy Statement | Technical Control | Verification Method | Evidence |
|---|---|---|---|
| Sensitive credentials must not be hardcoded in source code. | SECRET001 scanner rule and environment-based secret configuration. | Run the vulnerability scanner against the training fixtures and inspect source code. | `evidence/local-failed-scan.png`; `training-fixtures/fixed.js` |
| HIGH security findings must block insecure changes. | Vulnerability scanner returns exit code `1` when a HIGH finding is detected. | Run the scanner against the vulnerable fixture and inspect the exit code. | `evidence/local-failed-scan.png` |
| Fixed code must pass the security gate. | Vulnerability scanner returns exit code `0` when no HIGH finding is present. | Run the scanner against the corrected fixture and inspect the result. | `evidence/local-passed-scan.png` |
| Parameterized queries must be used when handling request-derived database input. | Parameterized SQL query using `$1` and a separate parameter value. | Review the corrected fixture and run the scanner. | `training-fixtures/fixed.js`; `evidence/local-passed-scan.png` |
| User-supplied input must be validated before sensitive operations. | Server-side validation and scanner rule VAL001. | Review validation logic and inspect scanner findings. | `training-fixtures/missed.js`; `training-fixtures/fixed.js` |
| Dangerous command execution must not accept arbitrary request input. | Allow-list of permitted commands and removal of unsafe command execution. | Review the corrected fixture and run the scanner. | `training-fixtures/missed.js`; `evidence/local-passed-scan.png` |
| Weak JWT signing secrets must not be stored directly in source code. | JWT001 scanner rule and environment-based JWT secret configuration. | Scan the JWT training fixture and inspect the corrected source. | `training-fixtures/jwt-weak.js`; `training-fixtures/fixed.js` |
| The security scanner must run automatically during development. | GitHub Actions workflow at `.github/workflows/security-scan.yml`. | Push or open a pull request and inspect the workflow run. | `.github/workflows/security-scan.yml` |
| A vulnerable change must cause the automated security gate to fail. | GitHub Actions executes the scanner without `continue-on-error` or `|| true`. | Trigger the workflow with the vulnerable fixture and inspect the failed run. | `evidence/failed-pipeline.png` |
| A corrected change must pass the automated security gate. | GitHub Actions executes the scanner against the corrected code and respects its exit code. | Trigger the workflow after remediation and inspect the successful run. | `evidence/passed-pipeline.png` |
| Application traffic containing sensitive information must use encrypted transport. | HTTPS/TLS for production application and API traffic. | Review deployment and application configuration. | Security policy requirement; configuration review |
| Access must follow the principle of least privilege. | Authentication, authorization, and restricted administrative access. | Code review and authorization testing. | Security policy requirement; code-review evidence |
| Suspected security incidents must be reported and investigated. | Incident-response process and documented remediation. | Review security findings, remediation commits, and workflow results. | `evidence/failed-pipeline.png`; `evidence/passed-pipeline.png` |
| Security testing must be limited to authorized systems and training fixtures. | Authorized-scope requirement in the security policy. | Review testing activity and repository evidence. | `security-policy.md`; `evidence/secret-hygiene-check.md` |
| Secrets must be checked before repository submission. | Secret-pattern search and repository inspection. | Run Git status, staged-file inspection, and secret-pattern search. | `evidence/secret-hygiene-check.md` |

---

## Security Gate Control

The primary DevSecOps security gate is the vulnerability scanner combined
with GitHub Actions.

The control operates as follows:

1. The scanner analyzes the configured training fixture.
2. HIGH findings cause the scanner to return exit code `1`.
3. GitHub Actions respects the non-zero exit code.
4. The workflow therefore fails when insecure code is detected.
5. After remediation, the scanner returns exit code `0`.
6. GitHub Actions then allows the security check to pass.

This creates the required:

**Detect → Fix → Verify → Enforce**

security control.

---

## Control Limitations

The controls in this register are limited to the security rules implemented
by the scanner and the checks documented in this repository.

A successful security gate does not prove that the entire application is
secure. Additional controls such as dependency scanning, code review,
runtime testing, secure infrastructure configuration, and manual security
assessment may still be required.
