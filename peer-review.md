# Peer Review Record

## Operation: Secure Core — Cohort 2

### Reviewer

Instructor/Peer Reviewer

### Improvement Suggested

The security policy should contain practical requirements rather than only
general statements about security. Each requirement should identify what must
be protected, who is responsible for the control, and how compliance can be
verified.

The review also highlighted the importance of documenting secret hygiene and
ensuring that the automated security gate cannot be bypassed by ignoring a
scanner failure.

### My Response

Accepted.

The feedback improves the usefulness of the security policy because it makes
the requirements measurable and connects them to actual technical controls
and verification methods.

### Change Made

The final security policy was updated to include:

- Specific security requirements for Data at Rest.
- Specific security requirements for Data in Transit.
- Access-control and least-privilege requirements.
- Incident-reporting and remediation requirements.
- Authorized-use restrictions for security testing.
- Responsibilities for developers, maintainers, and application owners.
- Verification methods for each policy section.
- Secret-management requirements.
- Requirements preventing security-gate bypass.

The control register was also created to map policy requirements to technical
controls, verification methods, and repository evidence.

The GitHub Actions security gate was documented as an enforcement mechanism
that must respect the scanner's exit code and must not use `|| true` or
`continue-on-error: true` to hide failures.

### Result

The submitted `security-policy.md` represents the final version after the
review feedback was incorporated.

The final repository also contains the supporting `control-register.md`,
security-gate workflow, scanner evidence, and secret-hygiene evidence.
