# Security Policy

## Operation: Secure Core — Cohort 2

This security policy defines the minimum security requirements for the
application, its source code, and its development pipeline. The policy
supports the DevSecOps security gate demonstrated in this repository.

---

## 1. Data at Rest

### Requirements

- Application data stored in databases, files, backups, or other persistent
  storage must be protected against unauthorized access or modification.
- Database credentials, API keys, signing secrets, and other sensitive
  configuration values must not be hardcoded in source code.
- Sensitive configuration must be supplied through protected environment
  variables or an approved secrets-management mechanism.
- Production databases and backups must be accessible only to authorized
  users and services.
- Test and training fixtures must not contain real production credentials or
  personal information.

### Responsibility

Developers are responsible for preventing credentials and sensitive data from
being committed to source control. System administrators and application
owners are responsible for protecting production storage and backups.

### Verification

Compliance is checked through source-code review, secret-pattern searches,
repository inspection, and the automated vulnerability scanner.

---

## 2. Data in Transit

### Requirements

- Application traffic containing credentials, authentication information, or
  sensitive data must use encrypted transport.
- Production web applications and APIs must use HTTPS/TLS.
- Plain HTTP must not be used for transmitting sensitive application data.
- API and service connections must validate the identity of the remote service
  where appropriate.
- Development and testing must not disable transport-security controls in
  code that could be promoted to production.

### Responsibility

Developers are responsible for implementing secure communication in the
application. Application and infrastructure administrators are responsible
for configuring valid TLS certificates and secure transport settings.

### Verification

Compliance is checked through configuration review, code review, deployment
configuration checks, and inspection of application endpoints.

---

## 3. Access Control

### Requirements

- Application resources must be accessible only to authenticated and
  authorized users where authentication is required.
- Access must follow the principle of least privilege.
- Administrative functions must require appropriate authorization checks.
- Secrets and privileged credentials must not be exposed through source code,
  logs, screenshots, or public repositories.
- User-supplied input must be validated before it is used in sensitive
  operations.
- Dangerous operations such as command execution must use an explicit
  allow-list or another safe control rather than accepting arbitrary user
  input.
- Security-sensitive changes must pass the automated security gate before
  being merged.

### Responsibility

Developers are responsible for implementing authentication, authorization,
input validation, and safe handling of privileged operations. Repository
maintainers are responsible for enforcing branch and workflow protections.

### Verification

Compliance is checked through code review, scanner results, security-gate
workflow runs, and manual testing of authorization and validation controls.

---

## 4. Incident Response

### Requirements

- Suspected security incidents must be reported to the responsible project
  owner or instructor as soon as they are identified.
- Exposed credentials must be revoked or rotated immediately.
- Security findings must be investigated and documented before vulnerable
  changes are promoted.
- Failed security-gate results must not be bypassed merely to allow a change
  to merge.
- Evidence of security incidents, including relevant logs and screenshots,
  must be handled carefully to avoid exposing additional sensitive
  information.
- Remediation must address the underlying security cause rather than simply
  suppressing the scanner finding.

### Responsibility

Developers must report and remediate vulnerabilities they discover.
Repository maintainers or project owners are responsible for coordinating
response activities and confirming that remediation has been completed.

### Verification

Compliance is checked through issue records, remediation commits, scanner
results, GitHub Actions workflow results, and documented security evidence.

---

## 5. Acceptable Use

### Requirements

- Security testing must be performed only against authorized classroom
  repositories, applications, and training fixtures.
- Users must not scan, attack, exploit, or probe external systems without
  explicit authorization.
- Security tools must be used only for legitimate educational, development,
  testing, or defensive purposes.
- Real passwords, API keys, private keys, live tokens, database credentials,
  wallet seed phrases, and personal information must not be committed to the
  repository.
- Screenshots and terminal output must be reviewed before submission to
  ensure that sensitive information is not exposed.
- Automated security controls must not be intentionally disabled or bypassed
  to conceal vulnerabilities.
- Repository contents must remain limited to authorized project and training
  material.

### Responsibility

All contributors are responsible for following acceptable-use requirements.
The project owner or instructor is responsible for defining the authorized
scope of security testing.

### Verification

Compliance is checked through repository review, Git history inspection,
secret-hygiene checks, and review of security-testing evidence.

---

## Policy Enforcement

The requirements in this policy are supported by technical controls
including:

- Static vulnerability scanning.
- Non-zero scanner exit codes for HIGH findings.
- GitHub Actions security-gate enforcement.
- Secure coding remediation.
- Input validation and allow-list controls.
- Parameterized SQL queries.
- Environment-based secret configuration.
- Repository and evidence review.

A clean automated scan does not prove that the application is completely
secure. The scanner provides a security gate for the specific rules it
implements and must be supported by human review and other security controls.
