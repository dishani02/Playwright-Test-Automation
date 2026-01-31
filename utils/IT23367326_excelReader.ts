// \IT23367326_Playwright_Project\utils\excelReader.ts
import * as XLSX from 'xlsx';
import path from 'path';

export interface TestCase {
  Partial: any;
  TestType: string;
  tcId: string;
  name: string;
  input: string;
  expected: string;

    // UI-specific optional fields
  expectedInputAfterSwap?: string;
  expectedOutputAfterSwap?: string;
}

export function readTestCases(filePath: string): TestCase[] {
  // Resolve absolute path
  const fullPath = path.resolve(filePath);

  const workbook = XLSX.readFile(fullPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Read as array of arrays (header:1)
  const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const testCases: TestCase[] = [];

  for (let i = 5; i < data.length; i++) { // start from row 6 (index 5)
    const row = data[i];

    if (!row || row.length === 0) continue; // skip empty rows
    if (!row[0] || typeof row[0] !== 'string') continue; // skip if no TC ID

    const tcId = String(row[0]).trim();
    // Only accept IDs like Pos_Fun_0001, Neg_UI_0001 etc
    if (!tcId.match(/^(Pos|Neg)_(Fun|UI)_\d{4}$/)) continue;

    const name = row[1] ? String(row[1]).trim() : '';
    const Partial = row[2] ? String(row[2]).trim() : ''; // column C
    const input = row[3] ? String(row[3]).trim() : '';
    const expected = row[4] ? String(row[4]).trim() : '';

    // Determine TestType automatically
    const TestType = tcId.includes('Fun') ? 'Functional' : 'UI';

    // Debug log each row
    console.log(`Loaded TC: ${tcId}, Name: "${name}", Input length: ${input.length}, Expected length: ${expected.length}, TestType: ${TestType}`);

    testCases.push({ Partial, TestType, tcId, name, input, expected });
  }

  console.log(`✅ Total test cases loaded: ${testCases.length}`);
  return testCases;
}
