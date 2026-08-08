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

## PHASE I — deployment topology discovery + /jobs dynamic fix

**Two deployments exist (important):**
- **`ccpromoters.com` → `www.ccpromoters.com` → Vercel** (auto-deploys from every `git push origin main`). **This is the real customer-facing site and it is healthy** — `/jobs` renders all 523 jobs, detail pages 200, search fix + team removal + NY job all live.
- **`cizr93dz.insforge.site`** (deployed via `npx @insforge/cli deployments deploy .`) is a **separate mirror whose build is missing `NEXT_PUBLIC_INSFORGE_URL` / `NEXT_PUBLIC_INSFORGE_ANON_KEY`** → it shows no jobs and 404s on detail pages. Not the customer domain. (The `.env*.local` file holding those vars is gitignored and isn't included in the InsForge build.)

| Date | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-06-21 | Made `/jobs` `force-dynamic` so it fetches live data per request instead of baking an empty list at build time. | `app/jobs/page.tsx` | `bc0a73b` | **Live on Vercel** (auto-deploy from main) | `git revert bc0a73b` |

Note: a stray remote `master` branch was accidentally created during a push and immediately deleted; `origin/main` is the production branch (`origin/HEAD → main`).

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

10. **`cizr93dz.insforge.site` shows no jobs** — its InsForge-CLI build lacks `NEXT_PUBLIC_INSFORGE_URL` / `NEXT_PUBLIC_INSFORGE_ANON_KEY`. The real site (Vercel/ccpromoters.com) is unaffected. Fix options if this mirror is wanted: add those two (the anon key is a **public, non-secret** client key) to a committed `.env.production`, or set them in the InsForge project's build env, then redeploy. Not done — needs a decision on whether the InsForge mirror is needed at all.

> Status note: ccpromoters `main` and ccpacademy `master` are both in sync with their origins as of this log (only the new docs in this commit are being added to ccpromoters).

## PHASE J — 2026-08-08: HR email outage + apply/admin/registration repairs

**Reported:** Boss applied on the live site (no login), resume submitted fine, but no email arrived at hr@ccpromoters.com. "This used to work."

**Root cause of the email outage:** `ccpromoters.com` is served by the **Vercel** deployment, which never had `SMTP_USER` / `SMTP_PASS` set. Those Zoho creds live only on the **InsForge** deployment env (set 2026-04-27). `/api/notify` bails out with 503 "SMTP not configured" when they are absent, and every caller (`apply`, `contact`, `register/candidate`, `candidate/resume`) fires the request without awaiting or surfacing the result — so applications kept saving to the DB and storage while every notification silently died. Confirmed by probing live: `POST https://www.ccpromoters.com/api/notify` → **503 SMTP not configured**, while the same route on `cizr93dz.insforge.site` → **200 ok**.

Note: InsForge's own `emails.send` API is **not** an option here — project `cizr93dz` is on the free plan and returns `403 Custom email service is not available for free plan`.

| Date | Change | Files | Commit | Live? | Reversible |
|---|---|---|---|---|---|
| 2026-08-08 | **Email relay fix.** `/api/notify` now forwards the request to the InsForge deployment's working notify endpoint when local SMTP creds are missing (loop-guard header `x-notify-forwarded`, 20s timeout). Also fixed `SITE_URL` fallback from the InsForge mirror to `https://www.ccpromoters.com` so admin links in emails point at the real site. | `app/api/notify/route.ts` | `2c081f3` | **Live** (Vercel) | `git revert 2c081f3` |
| 2026-08-08 | **Guest applications were invisible to HR.** Applying without an account writes to `contact_submissions` (subject `Job Application: …`), but the admin Applications page only read the `applications` table — 5 real applications, including the boss's, were never listed. Page now merges both sources, tags guest rows, shows email/phone and a resume download link. | `app/dashboard/admin/applications/page.tsx` | `781056a` | **Live** | `git revert 781056a` |
| 2026-08-08 | **Admin contacts status dropdown was dead.** It PATCHed a `status` column that does not exist on `contact_submissions` (verified: `PGRST204 Could not find the 'status' column`). The table tracks `is_read`. Reduced to a working New/Read toggle. | `app/dashboard/admin/contacts/page.tsx` | `781056a` | **Live** | `git revert 781056a` |
| 2026-08-08 | **Registration data never reached `candidate_profiles`.** `signUp` called only `auth.setProfile` (auth jsonb), while the candidate dashboard, admin candidate list and employer search all read the `candidate_profiles` table — new candidates saw "Profile Not Set Up" and admin saw 2 candidates out of 20 users. Registration now writes both. | `app/register/candidate/page.tsx` | `781056a` | **Live** | `git revert 781056a` |
| 2026-08-08 | **Backfilled `candidate_profiles`** for the 4 pre-existing candidate users that had none (from their auth jsonb). DB INSERT only. | DB `candidate_profiles` | — | **Live** (DB) | `DELETE FROM candidate_profiles WHERE user_id IN (…)` — affected emails: waheeduddin9050@gmail.com, waheed@ccpromoters.com, abdulsami@ccpromoters.com, laurawalkerdev@gmail.com |
| 2026-08-08 | Added the 6 admin pages that existed but were missing from the sidebar (Applications, Candidates, Employers, Talent Requests, Placements, Salary Data) — they were only reachable via overview cards. | `app/dashboard/admin/layout.tsx` | `781056a` | **Live** | `git revert 781056a` |

**Verified working (2026-08-08):**
- Live `POST /api/notify` on www.ccpromoters.com → `{"ok":true}` for both `application` and `contact` types (previously 503). Test emails sent to hr@ccpromoters.com, all clearly labelled `[TEST]`.
- Resume upload: PUT to `candidate-files` with the anon key → **201**; public download → **200**. Boss's resume confirmed present (`resumes/1786209913500_Terraform_Command_Reference_Ahmad_Haroon_Rahmatullah.pdf`, 19.8 KB, 2026-08-08 17:23 UTC) and his row is in `contact_submissions`.
- Login: `POST /api/auth/sessions` with a fresh test account → **200** with access token. Registration wizard walked end-to-end in a browser (5 steps → OTP screen); `require_email_verification` is **true**, `verify_email_method` = `code`.
- Live smoke test: `/jobs /apply /login /register/candidate /register/employer /auth/forgot-password /contact` and all dashboard routes → **200**.
- Deployed bundle for the admin applications page contains the fix (`contact_submissions`, `Job Application: `, `Guest`).
- `npm run build` passes.

**Still open after this session:**
1. **The relay is a bridge, not the real fix.** The proper fix is setting `SMTP_HOST/PORT/USER/PASS/FROM` on the **Vercel** project (team `ccp6`) so `ccpromoters.com` sends directly. Right now every HR email depends on the InsForge deployment staying up. The Vercel project is not linked locally (`vercel projects ls` under `ccp6` lists only `zafrani-zaiqa`), so the vars must be added from the Vercel dashboard, or the project linked first.
2. **Nobody was watching.** All four notify callers fire-and-forget; the apply page logs a failure to the browser console only. Consider surfacing send failures (or a weekly digest) so a future outage is not silent for months.
3. **Test account left behind:** `claude-test-20260808@example.com` (id `7a443d14-f206-4303-a099-6fb77d129cf9`). InsForge blocks `DELETE` on the `auth` schema and no admin delete endpoint responded (404 on `/api/auth/users/:id` and `/api/auth/admin/users/:id`) — remove it from the InsForge dashboard.
4. Items 3, 4, 5, 6, 7, 8 and 10 from the previous PENDING list remain untouched.

### PHASE J addendum — why the SMTP vars could not be set on Vercel (2026-08-08)

Attempted the "real fix" (item 1 above) and hit two hard blockers. Both need the user; no code change can route around either.

**Blocker 1 — the Vercel project is in an account we are not signed into.**
`vercel whoami` = `waheed-9605`; `GET /v2/teams` returns exactly one team, `ccp6` (`team_m7stHvi23wrnpffOACQ7XHv1`). Listing projects in both the personal and `ccp6` scopes returns only `zafrani-zaiqa`. Decisive check: `GET https://api.vercel.com/v5/domains/ccpromoters.com` → `403 {"code":"forbidden","message":"You don't have access to \"ccpromoters.com\""}`. There is no `.vercel/project.json` in the repo either. Yet pushes to `main` go live on www.ccpromoters.com within ~45s, so the site is Git-connected to `cloudcomputingpromoters/ccpromoters` from **some other Vercel account**. That account has to add the env vars (or invite this one to the project).

**Blocker 2 — the SMTP password is not readable from anywhere on this machine.**
- InsForge deployment env vars come back as `type: "encrypted"` with keys only — `GET /api/deployments/env-vars` lists `SMTP_HOST/PORT/USER/PASS/FROM` but no values; `/api/deployments/env` and `/api/deployments/envs` 500.
- The CLI has no `deployments env get` (only `list`/`set`/`delete`).
- The creds are **not** in InsForge backend secrets (`secrets list --all` = API_KEY, ANON_KEY, INSFORGE_BASE_URL, INSFORGE_INTERNAL_URL, VERCEL_WEBHOOK_SECRET, one rotated old key).
- No `.env*` file was ever committed (`git log --all --diff-filter=A -- '*.env*'` is empty); commit `562afcf` ("Zoho SMTP email config") touched only `route.ts`, `apply/page.tsx`, `ApplyButton.tsx`.

So the value exists only in the Zoho mailbox settings and inside the InsForge deployment's encrypted store.

**What the user needs to add** (Production scope, on whichever Vercel project serves ccpromoters.com):
| Key | Value |
|---|---|
| `SMTP_USER` | the Zoho mailbox that sends (likely `hr@ccpromoters.com`) |
| `SMTP_PASS` | Zoho **app-specific password**, from Zoho Mail → Settings → Security → App Passwords |
| `SMTP_HOST` | `smtp.zoho.com` (code default — only needed if different) |
| `SMTP_PORT` | `587` (code default — only needed if different) |
| `SMTP_FROM` | optional; falls back to `SMTP_USER` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.ccpromoters.com` (makes "View in Admin Panel" links correct) |

**No code change is needed when they do.** `app/api/notify/route.ts` already prefers local SMTP and only relays when `SMTP_USER`/`SMTP_PASS` are absent — the moment the vars exist and the project redeploys, ccpromoters.com sends directly and the relay goes dormant as a fallback.

**Verification after adding them:** `curl -s -o /dev/null -w "%{http_code}" -X POST https://www.ccpromoters.com/api/notify -H "Content-Type: application/json" -d '{"type":"__probe__","data":{}}'` should still return `400`; then send a real `contact` type and confirm arrival at hr@ccpromoters.com.

**Cheaper alternative:** upgrading InsForge project `cizr93dz` off the free plan unlocks `insforge.emails.send()` / `POST /api/email/send-raw`, which needs only the anon key — no SMTP password, no Vercel env vars, and no second deployment in the path. Currently returns `403 Custom email service is not available for free plan`.

**Current state: email is working** via the relay (both hops verified healthy on 2026-08-08). This addendum is about removing a single point of failure, not about a live outage.
