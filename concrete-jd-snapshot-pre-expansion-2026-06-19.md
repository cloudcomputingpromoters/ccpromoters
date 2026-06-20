# Snapshot — concrete JDs immediately before the 2026-06-19 expansion

**Purpose:** rollback reference for the JD-expansion migration (`update-concrete-jds-expanded.sql`).

## State captured
On 2026-06-19, immediately before running the expansion migration, all 17 concrete-role
`description` values were verified to be **byte-identical** to the descriptions in
[`update-concrete-jds.sql`](update-concrete-jds.sql), committed in **d1f8239**.

That means the pre-expansion state is already preserved, exactly, in the repository.

## How to roll back the expansion
Re-run `update-concrete-jds.sql` against the live InsForge `jobs` table. It contains 17
`UPDATE jobs SET description = … WHERE slug = …;` statements that restore each of the 17
concrete roles to its pre-expansion (d1f8239) description. It also re-asserts Naperville's
`discipline_slug` / `experience_level`. No other columns are touched.

## Scope of the expansion migration
- Touches ONLY the `description` column of the 17 concrete roles (11 Concrete Inspector +
  6 adjacent: Field Technician, Materials Inspector, QA Specialist, Strength Testing
  Technician, Testing Associate, Testing Technician).
- Does NOT touch salary, experience_level, discipline_slug, requirements, skills, benefits,
  titles, or slugs.
- Does NOT touch any non-concrete category (Structural, Geotechnical, Transportation,
  Estimator, Construction Manager, Field Engineer, Superintendent, Surveyor, etc.).

The 17 verbatim pre-expansion descriptions are also reproduced in the git history of
`update-concrete-jds.sql` at commit d1f8239 for full-text recovery.
