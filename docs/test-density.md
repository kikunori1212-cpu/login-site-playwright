# Test Density Summary

## Latest Result

| Item | Value |
| --- | ---: |
| Test run | `USE_LOCAL_SERVER=1 npm.cmd test` |
| Logical test cases | 13 |
| Browser projects | 2 |
| Total executions | 26 |
| Result | 26 passed |
| Duration | 9.5s |

## Quantitative Summary

| Metric | Value | Calculation |
| --- | ---: | --- |
| Pass rate | 100.0% | 26 passed / 26 executions |
| Fail rate | 0.0% | 0 failed / 26 executions |
| Logical case pass rate | 100.0% | 13 passed / 13 logical cases |
| Execution multiplier | 2.0x | 26 executions / 13 logical cases |
| Average execution time | 0.37s | 9.5s / 26 executions |
| Average time per logical case | 0.73s | 9.5s / 13 logical cases |
| Covered feature areas | 12 | Rows in feature-area density table |
| Open candidate gaps | 4 | Rows in gaps table |
| Current suggested-case achievement | 100.0% | 13 current / 13 minimum suggested |
| Current suggested-execution achievement | 100.0% | 26 current / 26 minimum suggested |

## Coverage Ratio By Test Type

| Test type | Logical cases | Executions | Share of logical cases | Share of executions |
| --- | ---: | ---: | ---: | ---: |
| Smoke | 1 | 2 | 7.7% | 7.7% |
| Functional positive | 3 | 6 | 23.1% | 23.1% |
| Functional negative | 4 | 8 | 30.8% | 30.8% |
| UI/security attribute | 1 | 2 | 7.7% | 7.7% |
| Keyboard | 1 | 2 | 7.7% | 7.7% |
| Accessibility | 1 | 2 | 7.7% | 7.7% |
| Responsive | 1 | 2 | 7.7% | 7.7% |
| Visual regression | 1 | 2 | 7.7% | 7.7% |
| Total | 13 | 26 | 100.0% | 100.0% |

## Quantitative Risk View

| Risk area | Current score | Basis | Interpretation |
| --- | ---: | --- | --- |
| Execution stability | 100/100 | 26/26 passed | No failing regression in the latest run. |
| Input validation coverage | 80/100 | 4 negative cases, but no max-length rule exists | Strong for the current static form. |
| Positive-flow coverage | 75/100 | Normal, boundary, and long values covered | Good sample coverage; real auth is out of scope. |
| Responsive confidence | 60/100 | Mobile project exists, but only one responsive logical case | Adequate, but could add state-specific screenshots. |
| Accessibility confidence | 50/100 | Semantic checks exist, no automated a11y scanner | Basic confidence only. |
| Visual confidence | 60/100 | One baseline state across desktop/mobile | Useful baseline, but only the initial screen is covered. |
| Overall demo readiness | 85/100 | 100% pass rate plus broad sample coverage | Ready as a training/demo regression suite. |

## Density By Feature Area

| Area | Covered behavior | Test cases | Executions | Density | Result |
| --- | --- | --- | ---: | --- | --- |
| Page structure | Title, heading, ID field, PASS field, login button are visible | TC-001 | 2 | Medium | Pass |
| Successful login | ID/PASS input and success message | TC-002 | 2 | Medium | Pass |
| ID boundary | One-character ID is accepted | TC-003 | 2 | Low-Medium | Pass |
| Required input validation | Empty submit is blocked by browser validation | TC-004 | 2 | Medium | Pass |
| Password handling | PASS field uses `type="password"` and accepts input | TC-005 | 2 | Medium | Pass |
| Responsive display | Key labels and login button remain visible on mobile project | TC-006 | 2 | Low-Medium | Pass |
| Partial input validation | ID-only and PASS-only submissions are blocked | TC-007, TC-008 | 4 | High | Pass |
| Whitespace validation | Whitespace-only ID is rejected by app validation | TC-009 | 2 | Medium | Pass |
| Long input handling | Long ID/PASS values submit without breaking the form | TC-010 | 2 | Medium | Pass |
| Keyboard operation | Tab navigation, typing, and Enter submit work | TC-011 | 2 | Medium | Pass |
| Accessibility semantics | `lang`, main landmark, named region, H1, and live status exist | TC-012 | 2 | Medium | Pass |
| Visual regression | Desktop and mobile screenshots match approved baselines | TC-013 | 2 | Medium | Pass |

## Density By Test Level

| Level | Count | Notes |
| --- | ---: | --- |
| Smoke | 1 | TC-001 confirms the page can render and primary controls exist. |
| Functional positive | 3 | TC-002, TC-003, and TC-010 cover normal login flow, a boundary value, and long values. |
| Functional negative | 4 | TC-004, TC-007, TC-008, and TC-009 cover empty, partial, and whitespace-only input. |
| UI/security attribute | 1 | TC-005 checks password masking. |
| Keyboard | 1 | TC-011 covers keyboard-only submission. |
| Accessibility | 1 | TC-012 covers basic semantic structure and live region behavior. |
| Responsive | 1 | TC-006 checks visibility on the mobile browser project. |
| Visual regression | 1 | TC-013 compares desktop and mobile screenshots against baselines. |

## Density Assessment

Current density is strong for a small login sample page. The suite covers the main user path, boundary and long input values, multiple negative paths, password masking, keyboard operation, basic accessibility semantics, visual regression, and desktop/mobile execution. Because every logical case runs against both `chromium` and `mobile-chrome`, each behavior currently has two executions.

The density is enough for a training/demo login page. For a production login feature, the next layer would be authentication behavior, server responses, security controls, and cross-browser coverage beyond Chromium.

## Gaps And Candidate Additions

| Priority | Gap | Candidate test |
| --- | --- | --- |
| Medium | Cross-browser coverage is Chromium-only | Add Firefox/WebKit projects if the target environment requires them. |
| Medium | Visual regression has only one baseline state | Add screenshots for validation and success message states. |
| Low | Accessibility coverage is semantic only | Add automated accessibility scanning if a dependency such as axe is introduced. |
| Low | No backend/authentication behavior exists | Add API/server tests if login becomes connected to real authentication. |

## Recommended Next Density Target

| Target | Current | Suggested |
| --- | ---: | ---: |
| Logical test cases | 13 | 13-16 |
| Total executions | 26 | 26-32 |
| Negative-path cases | 4 | 4-5 |
| Boundary/input-variation cases | 3 | 3-4 |
| Responsive cases | 1 | 2 |
| Visual regression cases | 1 | 2-3 |

Recommended next step: keep this suite as the regression baseline, then add browser diversity or extra visual states only if the app grows beyond a static training/demo page.
