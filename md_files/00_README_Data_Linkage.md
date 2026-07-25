# Karnataka State Police Intelligence Hub — Mock Data Set

Generated: 2026-07-24
Total rows across all tables: **6,132** (500 mock FIR cases as the anchor, fully linked through every table in the schema)

This package contains one `.md` file per table, each holding a full markdown data table
of synthetic records plus a row count. All foreign keys are internally consistent — every
`CaseMasterID`, `EmployeeID`, `UnitID`, etc. referenced in a child table actually exists in
its parent table, so you can import these directly (via CSV, see the companion `data/` folder)
into Zoho Catalyst tables built from the schema in your original design doc.

## How the tables link (foreign-key map)

### Core transactional chain (anchored on `CaseMaster`)
- `CaseMaster.CaseMasterID` (500 rows) is the hub. Every case links to:
  - `PolicePersonID` → `Employee.EmployeeID`
  - `PoliceStationID` → `Unit.UnitID`
  - `CaseCategoryID` → `CaseCategory.CaseCategoryID`
  - `GravityOffenceID` → `GravityOffence.GravityOffenceID`
  - `CrimeMajorHeadID` → `CrimeHead.CrimeHeadID`
  - `CrimeMinorHeadID` → `CrimeSubHead.CrimeSubHeadID` (chosen consistently under the same major head)
  - `CaseStatusID` → `CaseStatusMaster.CaseStatusID`
  - `CourtID` → `Court.CourtID`
- `ComplainantDetails.CaseMasterID` — one complainant per case (500 rows), also linking to
  `OccupationMaster`, `ReligionMaster`, `CasteMaster`.
- `Victim.CaseMasterID` — 1–3 victims per case (845 rows).
- `Accused.CaseMasterID` — 1–4 accused per case, `PersonID` labelled A1, A2… (1,051 rows).
- `ArrestSurrender.CaseMasterID` + `AccusedMasterID` — arrest/surrender events tied to a
  specific accused in that case, also linking `Employee` (IO), `Unit`, `Court`, `State`,
  `District` (457 rows).
- `inv_arrestsurrenderaccused` — junction table tying each arrest event to one or more
  accused (568 rows), FK to both `ArrestSurrender` and `Accused`.
- `ChargesheetDetails.CaseMasterID` — only generated for cases whose `CaseStatusID`
  indicates the file has moved past investigation (charge-sheeted / under trial / convicted
  / acquitted) — 228 rows, so counts won't equal 500 by design.
- `Inv_OccuranceTime.CaseMasterID` — one-to-one occurrence/location record per case (500 rows).
- `ActSectionAssociation.CaseMasterID` — 1–3 Act+Section combinations charged per case
  (920 rows), FK to `Act.ActCode` and `Section.SectionID`.

### Legal reference tables
- `Act` (10 rows: IPC, BNS, NDPS, MV Act, IT Act, POCSO, Arms Act, SC/ST Act, Excise Act, KP Act)
- `Section` (36 rows) — FK to `Act.ActCode`
- `CrimeHeadActSection` (30 rows) — pre-defined mapping of `CrimeHead` to typical `Act`/`Section`
- `CrimeHead` (10 rows) → `CrimeSubHead` (33 rows)

### Demographics & lookups
`CasteMaster`, `ReligionMaster`, `OccupationMaster`, `CaseStatusMaster`, `CaseCategory`,
`GravityOffence` — small fixed lookup sets referenced by ID from the transactional tables above.

### Hierarchy & organization
- `State` (5) → `District` (20, FK `StateID`)
- `UnitType` (5) → `Unit` (75, FK `TypeID`, `DistrictID`, self-referencing `ParentUnit`)
- `Court` (40, FK `DistrictID`)
- `Rank` (12), `Designation` (10)
- `Employee` (220, FK `DistrictID`, `UnitID`, `RankID`, `DesignationID`) — pool of officers
  used as `PolicePersonID` / `IOID` throughout the case tables.

## Files in this package
Each table below has its own `<TableName>.md` file (full data as a markdown table) and a
matching `<TableName>.csv` file in the `data/` folder for direct import into Catalyst.

| Table | Rows |
|---|---|
| CaseMaster | 500 |
| ComplainantDetails | 500 |
| Victim | 845 |
| Accused | 1,051 |
| ArrestSurrender | 457 |
| ChargesheetDetails | 228 |
| Inv_OccuranceTime | 500 |
| inv_arrestsurrenderaccused | 568 |
| Act | 10 |
| Section | 36 |
| ActSectionAssociation | 920 |
| CrimeHead | 10 |
| CrimeSubHead | 33 |
| CrimeHeadActSection | 30 |
| CasteMaster | 10 |
| ReligionMaster | 8 |
| OccupationMaster | 20 |
| CaseStatusMaster | 9 |
| CaseCategory | 5 |
| GravityOffence | 5 |
| State | 5 |
| District | 20 |
| UnitType | 5 |
| Unit | 75 |
| Court | 40 |
| Rank | 12 |
| Designation | 10 |
| Employee | 220 |

**All data is synthetic** — names, ages, coordinates, and dates were randomly generated for
schema/testing purposes only and do not represent real people, cases, or events.
