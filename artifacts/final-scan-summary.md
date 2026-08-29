# Week 5 Vulnerability Scanner Summary

## Scanner Validation

The vulnerability scanner was tested against the Week 5 training fixtures.

### vulnerable.js
- SECRET001 — HIGH
- VAL001 — MEDIUM
- SQL001 — HIGH
- Total: 3 findings

### missed.js
- VAL001 — MEDIUM
- EXEC001 — HIGH
- Total: 2 findings

### jwt-weak.js
- SECRET001 — HIGH
- JWT001 — HIGH
- Total: 2 findings

## Real Medusa Backend Scan

The corrected scanner was tested against the actual Medusa backend source.

Target:
`apps/backend/src`

Result:
- VAL001 — MEDIUM — Request input without visible validation
- SQL001 — HIGH — Possible unparameterized SQL query construction

Total: 2 findings across 6 scanned files.

## Conclusion

The scanner successfully detected the intentionally vulnerable SQL query
in the Medusa search endpoint. The scanner was also improved to detect
dangerous exec/eval usage and weak literal JWT signing secrets.

The scanner uses static pattern matching and therefore does not prove that
an application is secure. Findings require human review.
