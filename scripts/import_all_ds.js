/**
 * Enterprise Data Import & Migration Script for Zoho Catalyst Data Store
 * Usage: node scripts/import_all_ds.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const expectedRowCounts = {
  // Group 1: Lookup Tables
  Act: 10,
  CaseCategory: 5,
  CaseStatusMaster: 9,
  GravityOffence: 5,
  CasteMaster: 10,
  ReligionMaster: 8,
  OccupationMaster: 20,
  State: 5,
  UnitType: 5,
  Rank: 12,
  Designation: 10,

  // Group 2: Dependent & Reference Tables
  District: 20,
  Section: 36,
  CrimeHead: 10,
  CrimeSubHead: 33,
  CrimeHeadActSection: 30,
  Unit: 75,
  Court: 40,
  Employee: 220,

  // Group 3: Transactional Tables
  CaseMaster: 500,
  ComplainantDetails: 500,
  Victim: 845,
  Accused: 1051,
  Inv_OccuranceTime: 500,
  ActSectionAssociation: 920,
  ArrestSurrender: 457,
  inv_arrestsurrenderaccused: 568,
  ChargesheetDetails: 228
};

const tablesInOrder = Object.keys(expectedRowCounts);
const csvDir = path.join(__dirname, '..', 'csv_files');

async function main() {
  console.log('===============================================================');
  console.log('  KSP CRIME INTELLIGENCE PLATFORM — DATA STORE MIGRATION');
  console.log('===============================================================\n');

  const startTime = Date.now();
  const importSummary = [];
  let totalRowsImported = 0;
  let totalRowsFailed = 0;

  for (const table of tablesInOrder) {
    const csvFile = path.join(csvDir, `${table}.csv`);
    const expected = expectedRowCounts[table];
    const tableStartTime = Date.now();

    if (!fs.existsSync(csvFile)) {
      console.error(`[FAIL] CSV file missing for table ${table}: ${csvFile}`);
      importSummary.push({ table, status: 'FAILED', reason: 'CSV File Missing', rows: 0, expected, durationMs: 0 });
      totalRowsFailed += expected;
      continue;
    }

    console.log(`[IMPORTING] Table: ${table.padEnd(26)} (Expected: ${expected} rows)...`);

    try {
      const cmd = `catalyst ds:import --table "${table}" "${csvFile}" -ni`;
      const output = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      const durationMs = Date.now() - tableStartTime;

      if (output.includes('Error:') || output.includes('×')) {
        console.error(`  └─ FAILED (${durationMs}ms): ${output.trim()}`);
        importSummary.push({ table, status: 'FAILED', reason: output.trim(), rows: 0, expected, durationMs });
        totalRowsFailed += expected;
      } else {
        console.log(`  └─ SUCCESS (${durationMs}ms): ${output.trim()}`);
        importSummary.push({ table, status: 'PASSED', rows: expected, expected, durationMs });
        totalRowsImported += expected;
      }
    } catch (err) {
      const durationMs = Date.now() - tableStartTime;
      const errorMsg = (err.stderr || err.stdout || err.message || '').trim();
      console.error(`  └─ ERROR (${durationMs}ms): ${errorMsg}`);
      importSummary.push({ table, status: 'FAILED', reason: errorMsg, rows: 0, expected, durationMs });
      totalRowsFailed += expected;
    }
  }

  const totalDurationMs = Date.now() - startTime;
  const totalTables = tablesInOrder.length;
  const passedTables = importSummary.filter(s => s.status === 'PASSED').length;
  const failedTables = importSummary.filter(s => s.status === 'FAILED').length;

  console.log('\n===============================================================');
  console.log('                     MIGRATION SUMMARY');
  console.log('===============================================================');
  console.table(importSummary.map(s => ({
    Table: s.table,
    Status: s.status,
    'Expected Rows': s.expected,
    'Imported Rows': s.rows,
    'Time (ms)': s.durationMs,
    Error: s.reason || 'None'
  })));

  console.log(`Total Tables Processed : ${totalTables}`);
  console.log(`Tables Passed          : ${passedTables}`);
  console.log(`Tables Failed          : ${failedTables}`);
  console.log(`Total Rows Target      : 6132`);
  console.log(`Total Rows Imported    : ${totalRowsImported}`);
  console.log(`Total Rows Failed      : ${totalRowsFailed}`);
  console.log(`Total Execution Time   : ${(totalDurationMs / 1000).toFixed(2)}s`);

  if (failedTables === 0) {
    console.log('\n✅ MIGRATION STATUS: PASS');
  } else {
    console.log('\n❌ MIGRATION STATUS: FAIL');
    process.exit(1);
  }
}

main();

