-- Migration: unique JDs for all 17 concrete roles + mandatory ACI Grade I line.
-- Generated 2026-06-19. Source of truth: live InsForge `jobs` table.
-- Rollback snapshot: concrete-jd-snapshot-2026-06-19.json
-- Dollar-quoted ($JD$) strings so apostrophes / em-dashes need no escaping.

BEGIN;

-- ============ JUNIOR CONCRETE INSPECTOR (6) ============

UPDATE jobs SET description = $JD$Join our Denver field team as a Junior Concrete Inspector supporting commercial foundation and structural slab work across the Front Range. You'll spend most of your day on active pours, running fresh-concrete tests and building the daily record that engineers rely on to accept the work.

## What You'll Do
- Conduct pre-placement inspections of formwork, base preparation, and reinforcing steel before each pour
- Perform slump, air content, unit weight, and concrete temperature tests in accordance with ASTM C143, C231, and C1064
- Cast and field-cure compressive-strength cylinders for laboratory break testing
- Verify reinforcing steel size, spacing, and cover against approved drawings
- Write detailed daily field reports documenting placement conditions, test results, and any non-conformances

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete inspection or construction quality control
- Valid driver's license and reliable transportation to Front Range job sites
- Ability to read construction documents and communicate findings clearly in writing
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'junior-concrete-inspector-denver';

UPDATE jobs SET description = $JD$We're hiring a Junior Concrete Inspector in Austin to support fast-moving commercial and mixed-use construction. This role centers on specification compliance and visual quality — verifying that what gets placed and finished matches the project drawings and spec book.

## What You'll Do
- Verify each placement against project specifications and technical requirements before sign-off
- Perform visual inspections of concrete surfaces for honeycombing, cold joints, discoloration, and finish quality
- Inspect reinforcing steel layout and cover prior to placement
- Observe finishing operations — screeding, floating, and troweling — for conformance
- Maintain detailed field notes and photo documentation, coordinating with client reps and crews on site

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete or construction inspection
- Current driver's license
- Strong written communication and the ability to interpret blueprints and specifications
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'junior-concrete-inspector-austin';

UPDATE jobs SET description = $JD$This Portland-based Junior Concrete Inspector role pairs hands-on material testing with site-safety oversight. You'll confirm materials are compliant before placement and keep a close eye on safe work practices in the Pacific Northwest's wet conditions.

## What You'll Do
- Perform slump, temperature, and air content testing and prepare cylinders for compressive-strength testing
- Verify delivered materials meet specification requirements before authorizing placement
- Inspect safety equipment, signage, and work procedures for OSHA compliance
- Monitor curing conditions, documenting moisture and temperature control through wet and cold weather
- Verify reinforcing steel spacing and protection, and submit daily reports with all testing data

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete testing or construction quality assurance
- Valid driver's license
- Familiarity with OSHA site-safety requirements and the ability to work outdoors year-round
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'junior-concrete-inspector-portland';

UPDATE jobs SET description = $JD$Support high-volume concrete placement across South Florida as a Junior Concrete Inspector. This role is about keeping placements moving — coordinating trucks, pumps, and crews in real time while documenting quality, often in heat and high humidity.

## What You'll Do
- Monitor every phase of placement, from truck arrival through final curing
- Coordinate with delivery trucks, pumping operations, and placement crews to keep pours on schedule
- Conduct real-time inspections during consolidation and finishing
- Prepare pre-placement checklists and verify readiness before authorizing each pour
- Document placement activities and any non-conforming work with notes and photos, working outdoors in tropical conditions

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete inspection or construction quality control
- Valid driver's license
- Strong coordination skills and the ability to work in hot, humid outdoor environments
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'junior-concrete-inspector-miami';

UPDATE jobs SET description = $JD$We're looking for a Junior Concrete Inspector in Nashville with a focus on the post-placement window — curing, protection, and early-age strength. You'll make sure freshly placed concrete is protected and that formwork and loading happen only when the concrete is ready.

## What You'll Do
- Verify curing methods comply with specifications, including wet curing, curing compounds, and temperature control
- Inspect protection systems guarding against weather, traffic, and premature loading
- Monitor strength development and document when formwork removal is permitted
- Conduct post-placement inspections, documenting spalling, cracking, or other surface defects
- Work with project teams to implement curing schedules and protection plans, recording observations daily

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete inspection or construction
- Valid driver's license
- Strong technical writing skills and the ability to read engineering drawings
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'junior-concrete-inspector-nashville';

UPDATE jobs SET
  description = $JD$Join our Chicago-area team as a Junior Concrete Inspector based in Naperville, focused on reinforcement and embedded-item inspection for structural and infrastructure work across the western suburbs. You'll be the last set of eyes on the rebar and embeds before concrete covers them for good.

## What You'll Do
- Inspect reinforcing steel size, grade, spacing, lap lengths, and cover prior to placement
- Verify placement of embedded items — anchor bolts, sleeves, dowels, and waterstops — against shop drawings
- Perform fresh-concrete tests (slump, air, temperature) and cast cylinders during placement
- Confirm formwork dimensions and bracing before authorizing pours
- Maintain inspection logs and photographic records, coordinating with detailers and field crews

## Required Qualifications
- High school diploma or GED
- 0–2 years of experience in concrete or reinforcement inspection
- Valid driver's license
- Ability to read structural drawings, rebar schedules, and placement drawings
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$,
  discipline_slug = 'construction',
  experience_level = 'Entry-level (0-2 years)'
  WHERE slug = 'junior-concrete-inspector-naperville';

-- ============ SENIOR CONCRETE INSPECTOR (5) ============

UPDATE jobs SET description = $JD$Lead concrete inspection on major Bay Area construction projects as a Senior Concrete Inspector. You'll run a team of junior inspectors, own the inspection plan, and be the quality point of contact for the project's engineers and client representatives.

## What You'll Do
- Lead and assign a team of junior inspectors across one or more large active projects
- Develop inspection and quality-control plans aligned with project specifications
- Conduct and verify advanced concrete testing, confirming laboratory results meet design requirements
- Review and approve all field reports and documentation prepared by junior staff
- Implement and verify corrective actions for non-conforming work, coordinating directly with engineers, architects, and clients

## Required Qualifications
- PE license or equivalent professional credential
- 6–7 years of concrete inspection experience, including team leadership
- Valid driver's license
- Excellent project-management and client-communication skills
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'senior-concrete-inspector-san-francisco';

UPDATE jobs SET description = $JD$We need a Senior Concrete Inspector to manage concrete quality on large, complex building and infrastructure projects across the New York metro area. This role is about strategy and specialized systems — high-performance concrete, demanding schedules, and tight site constraints.

## What You'll Do
- Develop comprehensive inspection strategies tailored to project scope and schedule
- Lead inspection teams and ensure consistent quality standards through placement and curing
- Conduct advanced inspections of specialized concrete elements and high-performance systems
- Oversee concrete testing programs and verify laboratory compliance
- Interface with building officials, engineers, and owner representatives, producing progress reports on findings

## Required Qualifications
- PE license or equivalent professional credential
- 6–7 years of senior-level concrete inspection on complex projects
- Valid driver's license
- Strong project-management skills and experience with high-performance concrete systems
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'senior-concrete-inspector-new-york';

UPDATE jobs SET description = $JD$This Boston-based Senior Concrete Inspector role centers on code and regulatory compliance. You'll be the project's authority on building codes and ACI standards, working directly with code officials and building departments to keep concrete work compliant.

## What You'll Do
- Interpret complex technical specifications and building-code requirements for the project team
- Conduct comprehensive inspections of formwork, reinforcement, materials, and placement
- Verify compliance with ACI standards, local building codes, and international standards
- Coordinate with code officials and building departments on compliance and corrective actions
- Manage concrete testing programs and lead training sessions for project personnel

## Required Qualifications
- Professional Engineer license
- 6–7 years of concrete inspection with a code-compliance focus
- Valid driver's license
- In-depth knowledge of building codes and concrete standards
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'senior-concrete-inspector-boston';

UPDATE jobs SET description = $JD$Serve as the technical authority and mentor on concrete quality as a Senior Concrete Inspector in Atlanta. You'll develop the next generation of inspectors, audit inspection processes, and be the go-to expert when difficult concrete questions come up.

## What You'll Do
- Train and mentor junior inspection staff in advanced techniques and professional standards
- Conduct specialized inspections of unique and high-performance concrete systems
- Review team members' inspection reports and documentation for accuracy and completeness
- Implement quality-assurance procedures and conduct periodic audits of inspection processes
- Lead problem-solving for concrete quality issues and present findings to stakeholders

## Required Qualifications
- PE license or equivalent professional credential
- 6–7 years of concrete inspection with demonstrated technical expertise
- Valid driver's license
- Strong interpersonal, training, and mentoring skills
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'senior-concrete-inspector-atlanta';

UPDATE jobs SET description = $JD$We're seeking a Senior Concrete Inspector in Seattle focused on advanced inspection methods and rigorous documentation. You'll handle the most demanding concrete elements and produce the detailed technical reporting that complex projects require.

## What You'll Do
- Perform specialized inspections of complex concrete elements and demanding applications
- Use advanced testing equipment and verification methods to assess concrete quality
- Develop detailed inspection checklists and quality plans tailored to each project
- Coordinate testing programs and verify laboratory quality and equipment calibration
- Prepare detailed inspection reports with technical analysis and corrective-action recommendations

## Required Qualifications
- Professional Engineer license
- 6–7 years of senior-level concrete inspection experience
- Valid driver's license
- Expertise in concrete materials, construction methods, and equipment calibration
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'senior-concrete-inspector-seattle';

-- ============ ADJACENT CONCRETE ROLES (6) ============

UPDATE jobs SET description = $JD$We're recruiting a Concrete Inspection Field Technician for continuous quality monitoring on active construction sites around Elgin. This is a hands-on, site-based role for someone who knows concrete behavior and testing equipment inside and out.

## What You'll Do
- Provide continuous on-site monitoring of concrete operations throughout the workday
- Perform slump, temperature, air content, and compression testing on placed concrete
- Document construction sequences, placement conditions, and equipment used
- Identify and report non-conforming work to the project team in real time
- Maintain and care for field testing equipment, ensuring it stays in calibration

## Required Qualifications
- High school diploma
- 3–5 years of construction site experience
- Proficiency with field testing equipment
- Valid driver's license
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-inspection-field-tech-elgin';

UPDATE jobs SET description = $JD$Join our team as a Concrete Materials Inspector in Waukegan, verifying incoming concrete materials and monitoring quality throughout the project. This role ensures everything that arrives on site meets the mix design and acceptance criteria before it goes into the work.

## What You'll Do
- Verify incoming concrete deliveries against approved mix designs and batch tickets
- Inspect aggregate, cement, and admixture certifications for compliance
- Perform acceptance testing on fresh concrete and document results
- Track material traceability from delivery through placement
- Coordinate with suppliers and the project team to resolve material non-conformances

## Required Qualifications
- Associate degree in engineering technology or related field
- 2–4 years in materials inspection or quality control
- Knowledge of concrete mix design and acceptance criteria (ACI standards)
- Valid driver's license
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-materials-inspector-waukegan';

UPDATE jobs SET description = $JD$We're hiring an experienced Concrete Quality Assurance Specialist in Aurora to own the QA program across multiple concrete projects. You'll design the testing protocols, supervise inspection activity, and be accountable for the quality record that goes to clients.

## What You'll Do
- Develop and maintain concrete QA/QC protocols and inspection procedures
- Supervise testing and inspection activities across multiple active projects
- Review test results and specifications, determining acceptance and corrective actions
- Coordinate with project managers, engineers, and contractors on quality matters
- Maintain comprehensive quality-assurance documentation and reporting

## Required Qualifications
- Bachelor's degree in Civil Engineering or related field
- 5+ years in quality assurance or construction inspection
- Strong working knowledge of ACI standards and QA protocol design
- Valid driver's license
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-qa-specialist-aurora';

UPDATE jobs SET description = $JD$We need a Concrete Strength Testing Technician in Cicero to perform compressive-strength testing and evaluate concrete quality. This is a lab-focused role at the center of structural acceptance — your break results drive whether the concrete is accepted.

## What You'll Do
- Perform compressive-strength testing on cylinders and cores per ASTM C39
- Calibrate and maintain compression testing machines and related equipment
- Record, interpret, and report strength results against project specifications
- Apply statistical analysis to evaluate concrete performance and consistency
- Flag low breaks and coordinate follow-up investigation with the QA team

## Required Qualifications
- High school diploma
- 2–3 years of laboratory or testing experience
- Proficiency with compression testing equipment and calibration
- Strong attention to detail and data-recording discipline
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-strength-testing-technician-cicero';

UPDATE jobs SET description = $JD$Start your concrete-testing career as a Concrete Testing Associate in Evanston. This is an entry-level, training-focused role supporting senior technicians while you build hands-on expertise in concrete testing and quality assurance.

## What You'll Do
- Support concrete testing operations under the direction of senior technicians
- Prepare test samples, cylinders, and equipment for daily testing
- Record test data and field observations accurately
- Assist with sample transport, curing, and lab housekeeping
- Learn and apply concrete testing best practices and safety procedures

## Required Qualifications
- High school diploma, or currently enrolled in an engineering technology program
- Willingness to learn concrete testing procedures
- Physical capability to handle samples and equipment, and strong attention to detail
- Valid driver's license
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-testing-associate-evanston';

UPDATE jobs SET description = $JD$Join our downtown Chicago team as a Concrete Testing Technician performing quality-assurance testing on concrete samples. This role is critical to structural integrity — your testing confirms that placed concrete meets project specifications on high-rise and urban infrastructure work.

## What You'll Do
- Perform compression and fresh-concrete testing on QA samples
- Follow standard laboratory procedures for sample handling, curing, and testing
- Operate and maintain testing equipment, reporting calibration needs
- Record and analyze test data, assisting with test-report preparation
- Support QA staff in verifying compliance with project specifications

## Required Qualifications
- High school diploma
- 1–2 years of experience in concrete testing or laboratory work
- Familiarity with concrete testing equipment and lab procedures
- Valid driver's license
- ACI Concrete Field Testing Technician — Grade I (mandatory)$JD$ WHERE slug = 'concrete-testing-technician-downtown-chicago';

COMMIT;
