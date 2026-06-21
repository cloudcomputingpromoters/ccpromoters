# Session Log — CCPromoters & CCPacademy

_Last updated: 2026-06-20. Covers work from 2026-06-05 → 2026-06-20. Times are local unless marked UTC._

This log is the 2-minute orientation for any future session. Two separate projects/repos:
- **ccpromoters** — civil-staffing job board. Repo: `ccpromoters_local/ccpromoters` → GitHub `cloudcomputingpromoters/ccpromoters` (`main`). Backend: InsForge project `cizr93dz`. Live: https://ccpromoters.com
- **ccpacademy** — learning platform. Repo: `D:/CCPWebsites/ccpacademy` → GitHub `waheeduddin9050-dev/CCPACADEMY-` (`master`). Backend: InsForge project `zxyy4eh9`.

Job-board JD content lives in the InsForge `jobs.description` column (markdown), rendered by a `force-dynamic` detail page — so DB writes are live immediately, no deploy needed.

---

## PHASE A — ccpacademy: auth/proxy fix + todays-task + mobile responsive
_All committed to `master` and pushed (branch is in sync with origin). "Live" assumes the deploy that tracks `master` is current — not independently re-verified this session._

| Date | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-10 | Multiple auth fixes: login redirect, enrollment form visibility, email-verify toggle, SDK session-persistence attempts | `app/auth/login/page.tsx`, `app/courses/english/page.tsx`, `app/api/setup-database/route.ts`, `insforge.toml`, `lib/insforge.ts`, many test/docs files | `8b3d484`, `493fa1e`, `ef889db`, `87d816b`, `36e8431`, `2429f3d`, `ff8239c`, `569ec29` | Yes (pushed) | git revert per commit |
| 2026-06-11 | Rollback to restore working auth | `lib/insforge.ts`, test files | `d406bb7` | Yes (pushed) | git revert |
| 2026-06-11 | Fallback backend URL for missing env var | `lib/insforge.ts` | `29b3924` | Yes (pushed) | git revert |
| 2026-06-11 | **Same-origin proxy auth fix** (corrected to match SDK URL behavior) | `app/auth/login/page.tsx`, `lib/insforge.ts`, `next.config.ts`, `app/api/seed-questions/route.ts`, `app/api/setup-database/route.ts` | `1f6616e` | Yes (pushed) | git revert |
| 2026-06-11 | **Enroll flow + Today's Task + mobile responsive** | `app/courses/english/page.tsx`, `app/dashboard/layout.tsx`, `app/dashboard/todays-task/page.tsx` | `7ce28a7` (current HEAD) | Yes (pushed) | git revert |

> **"Grammar unlock":** referenced by user but no distinct commit identified in recent history — likely folded into the english-course / todays-task work above. Confirm in `app/courses/english/page.tsx`.
> **Uncommitted ccpacademy work exists locally (NOT committed, NOT live)** — see Phase F + Pending.

---

## PHASE B — ccpromoters: initial concrete JD rewrite (17 distinct + ACI line)
_InsForge `jobs` table; backend project `cizr93dz`._

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-05 | Origin of the concrete jobs (created/seeded, search pill, Junior/Senior split) | `app/jobs/JobsClient.tsx`, SQL seeds | `bfe0f77`, `04968ad`, `659516a` | Yes | — |
| 2026-06-19 10:33 | **Rewrote all 17 concrete JDs to be unique + appended `ACI Concrete Field Testing Technician — Grade I (mandatory)`** to every one; fixed Naperville null `discipline_slug`/`experience_level`. DB UPDATEs (description only). | DB `jobs`; repo: `update-concrete-jds.sql`, `concrete-jd-snapshot-2026-06-19.json` | `d1f8239` | **Live** (DB) | Snapshot `concrete-jd-snapshot-2026-06-19.json` = pre-state; re-run reverses |
| 2026-06-19 10:35 | Saved JD drafts to docs as record | `docs/concrete-jd-drafts.md` | `357a374` | n/a (docs) | git revert |

Verified at the time: 17/17 distinct, 17/17 contain ACI line.

---

## PHASE C — ccpromoters: concrete JD expansion (8 sections, ~3.5–5.2k chars)

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-20 02:39 | **Expanded all 17 concrete JDs** into full US-style listings (intro, About the Role, What You'll Do 7–9 bullets, Required Quals + ACI line, Preferred Quals, What We Offer w/ real DB salary, Growth & Development, About CCPromoters). DB UPDATEs (description only). Applied via InsForge SDK (admin key) because MCP `run-raw-sql` was down; per-row idempotent. | DB `jobs`; repo: `update-concrete-jds-expanded.sql`, `docs/concrete-jd-expanded-drafts.md`, `concrete-jd-snapshot-pre-expansion-2026-06-19.md` | `83ceff9` | **Live** (DB) | Re-run `update-concrete-jds.sql` (= pre-expansion state, byte-identical); rollback ref in the snapshot `.md` |

Verified: 17/17 distinct, 17/17 ACI line, 17/17 all 8 sections, lengths 3,501–5,197.

---

## PHASE D — ccpromoters: CM cluster (DRAFTED, NOT APPLIED)

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-19/20 | Drafted 22 unique JDs for the 22 roles wearing one shared construction-management template (`524ed3e1`): 10 Construction Manager, 4 Cost Estimator, 5 Field Engineer, 3 Site Superintendent — each with its own mandatory cert line. **NOT written to the DB.** | `docs/cm-cluster-jd-drafts.md` (committed in `83ceff9`) | (draft only) | **No — not applied** | n/a (nothing applied) |

Those 22 rows still show the identical CM template in production. Awaiting go-ahead to apply.

---

## PHASE E — Security cleanup (.mcp.json + key rotation + .insforge status)

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-20 02:46 | **Stopped tracking `.mcp.json`** (held the InsForge admin key in plaintext) + added it to `.gitignore`. ccpacademy already ignored/untracked `.mcp.json` (no action needed). | `.gitignore`, `.mcp.json` (removed from index) | `bbfbf97` | Yes (pushed) | git revert |
| 2026-06-20 | Updated local `.mcp.json` (untracked) with the **new** ccpromoters key after user rotated it. New key NOT committed/pushed anywhere. | `.mcp.json` (local only) | — | local only | edit file |
| 2026-06-20 09:04 UTC | **Re-tested the OLD key** `ik_269f…` — still returns 200 (read + privileged write). **Old key is STILL ALIVE.** Garbage-key control returns 401, proving the gateway enforces keys. | — | — | — | — |

**Outstanding exposure (NOT yet resolved):**
- Old leaked key `ik_269f91279e81e422e94e2a9257178aac` is **still active** — awaiting InsForge support to revoke.
- `.insforge/project.json` **still tracked in git AND still contains the old key** (working tree + HEAD + GitHub). Not yet cleaned.
- Old key present in history commits: `802b75e`, `bfe0f77`, `bbfbf97` (all `.json` files — note a `-- ':!*.json'` filter hides them).
- ccacademy `origin` remote URL has a GitHub PAT (`ghp_…`) embedded in local `.git/config` (local only, not pushed) — recommend rotating that token too.

---

## PHASE F — ccpromoters: NY Junior Concrete Inspector addition (this session)

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-20 | **Added new job:** Junior Concrete Inspector — New York, NY. Distinct angle (high-rise/urban placement support under senior inspectors, specialty-mix exposure). $62k–$78k, `construction`, `Entry-level (0-2 years)`, full 8-section JD + ACI line. **DB INSERT (one row).** | DB `jobs` (slug `junior-concrete-inspector-new-york`); repo: `docs/concrete-jd-ny-junior-draft.md` | this commit (draft + this log) | **Live** (DB) | `DELETE FROM jobs WHERE slug='junior-concrete-inspector-new-york';` — exact content in the draft md to re-insert |

Verified: row present; live at https://ccpromoters.com/jobs/junior-concrete-inspector-new-york (title, NY, $62k–$78k, all sections, ACI line render); `discipline_slug=construction` + `active`; total concrete roles now **18** (was 17); all 18 descriptions distinct; all 7 juniors distinct by md5 (NY `5508238c85d6`).

---

## PHASE G — ccpromoters cleanup: remove "Meet the Team" page

| Date/time | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-20 | **Removed the `/about/team` "Meet the Team" page** entirely (route + 6 hardcoded recruiter profiles — no DB table, no shared components involved). Removed all references: the "Meet the Team" CTA button on `/about` (heading reworded to "Work With Specialist Recruiters", Contact Us button kept), the sitemap HTML entry, and the `sitemap.xml` route entry. `/about` itself kept intact. | **Deleted:** `app/about/team/page.tsx`. **Edited:** `app/about/page.tsx`, `app/sitemap/page.tsx`, `app/sitemap.xml/route.ts` | `68c1ca5` (`feat: remove Meet the Team page (no longer needed)`) | **Live** — deployed 2026-06-20 09:07 via InsForge (deployment `5db285db`, provider vercel); verified on production | `git revert 68c1ca5` restores the page and all references; redeploy to apply |

Codebase verified post-change: no remaining `about/team` references, no `TeamPage`/dead imports, route directory gone, `/about` unaffected. **Live verified 2026-06-20:** `/about/team` → HTTP 404; `/about` shows "Work With Specialist Recruiters" with no "Meet the Team" button; `sitemap.xml` has no `/about/team`.

## PHASE H — ccpromoters: job search fix + readable hero subtitle

**What broke:** On `/jobs` the "City or state" search (and overall search) felt broken because (1) there was **no Enter-key handler**, (2) **state full names didn't match** the DB's state *codes* (typing "Texas" matched nothing — DB stores "TX"), (3) the **"Concrete Inspector" pill returned only 12** roles (matched `title ~ "concrete inspector"`, missing the 6 "Concrete Testing/Materials/QA" roles), and (4) every debounced keystroke did a `router.push` → the async server page re-fetched all 523 jobs → Suspense remount → focus loss / janky typing. Also the hero subtitle ("N active roles…") was too dim (`text-white/60`).

**What changed:** Reworked `/jobs` search to **instant client-side filtering** over the already-loaded jobs (no per-keystroke navigation/refetch). Search now triggers on **debounced typing + Enter + the Search button**. City/state matches **city, state code, AND full state name** (case-insensitive, partial) via a new `STATE_NAMES` map. Job-title + city + discipline all **AND** together. Empty fields = no filter. "Concrete Inspector" pill now matches **all 18** concrete roles (`title ~ "concrete"`). No-match state reworded to **"No jobs match your search."** Pagination moved to local state (resets to page 1 on filter change; clamps to valid range). Subtitle bumped to **`text-gray-200`**. Inbound deep links (`?discipline=`, `?location=`, `?q=`) still honored on load; filters no longer write to the URL (deliberate).

| Date/time | Files | Commit | Live? | Reversible |
|---|---|---|---|---|
| 2026-06-20 | **New:** `lib/jobSearch.ts` (pure, tested filter helpers). **Edited:** `app/jobs/JobsClient.tsx`. Style change limited to the subtitle color. | `23864ec` (`fix: city/state job search + readable hero subtitle`) | **Live** — deployed 2026-06-21 via InsForge (deployment `cb440019`, READY) | `git revert 23864ec` + redeploy |

**Tested (localhost, pure-logic harness vs the real 523 jobs — 8/8 PASS):** "New York"→19 NY only; "Denver"→23 Denver; "TX"/"Texas"→65 TX (both); "new"→all 19 NY included; "concrete inspector"+"New York"→2; Concrete pill→18 (incl NY junior); clear→523; "zzzzz"→0. Production `npm run build` passed.
**Live verified 2026-06-21 (deployment `cb440019`):** deployed JS bundle contains the fix (`No jobs match your search`, `STATE_NAMES`/"Tennessee", `City or state`); 8/8 logic cases re-run against live data all PASS.

## PENDING / OPEN ITEMS

1. ~~InsForge support — revoke old leaked key~~ **RESOLVED 2026-06-21.** Old key `ik_269f…` now returns **401 (dead)** — confirmed by direct probe. New key `ik_de62…` works (200). The GitHub-exposed key is no longer a live credential.
2. ~~`.insforge/` cleanup~~ **DONE 2026-06-21.** Added `.insforge/` to `.gitignore` and `git rm --cached .insforge/project.json` (it had been needed for the CLI deploy and now holds the **new** key locally — untracking keeps the new key out of git). Local file retained for the InsForge CLI. The dead old key remains only in past history commits (see #3).
3. **Git history rewrite — deferred** until the old key is revoked. Then optionally scrub `ik_269f…` from commits `802b75e`, `bfe0f77`, `bbfbf97` (e.g., `git filter-repo`). Coordinate because it rewrites shared history.
4. **ccpromoters CM cluster — 22 JDs drafted, NOT applied** (`docs/cm-cluster-jd-drafts.md`). Awaiting go-ahead to run the migration (snapshot → UPDATE → verify → commit).
5. **ccpacademy Razorpay — Phases C–F.** Phase B reportedly done; Phase C waiting (per user). NOTE: Razorpay code is **uncommitted/local** in ccpacademy working tree (`app/api/razorpay/`, `lib/razorpay.ts`, plus `_q.sql`, `_seed_questions.js`) — not committed, not live.
6. **ccpacademy other open threads (per user):** Today's Task "10-tasks" upgrade, admin approval page, Devanagari Hindi. Related uncommitted local edits present: `app/dashboard/todays-task/page.tsx`, `app/courses/english/page.tsx`, `app/courses/[slug]/page.tsx`, `lib/data/courses.ts`.
7. **ccpacademy uncommitted working tree** — the above local changes should be reviewed/committed or stashed so they aren't lost.
8. **PAT in ccpacademy git remote** — rotate the `ghp_…` token embedded in `.git/config` and switch to a credential helper.

9. ~~Live 404 for `/about/team` pending redeploy.~~ **RESOLVED 2026-06-20.** Deployed via InsForge (`npx @insforge/cli deployments deploy .`, deployment `5db285db`, READY). Verified live: `/about/team`→404, `/about` reworded with no Team button, `sitemap.xml` clean.
   - _Deploy note for future sessions:_ this site is hosted on **InsForge** (project `cizr93dz`, Vercel under the hood → `cizr93dz.insforge.site`). Page/route/code changes require a redeploy with `npx @insforge/cli deployments deploy .`; DB content changes (e.g. `jobs.description`) are live instantly via the `force-dynamic` pages.

> Status note: ccpromoters `main` and ccpacademy `master` are both in sync with their origins as of this log (only the new docs in this commit are being added to ccpromoters).
