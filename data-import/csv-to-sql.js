#!/usr/bin/env node

/**
 * CSV to SQL Converter
 * 
 * Usage:
 *   node csv-to-sql.js businesses_template.csv > businesses.sql
 *   node csv-to-sql.js coupons_template.csv > coupons.sql
 */

const fs = require('fs');
const path = require('path');

// CSV 파싱 함수
function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV file must have at least 2 lines (header + data)');
  }

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }

  return { headers, rows };
}

// CSV 라인 파싱 (따옴표 처리)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // 이스케이프된 따옴표
        current += '"';
        i++;
      } else {
        // 따옴표 시작/끝
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // 필드 구분자
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

// SQL 값 이스케이프
function escapeSQLValue(value) {
  if (!value || value === '') {
    return 'NULL';
  }

  // 숫자 체크
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return value;
  }

  // JSON 체크
  if (value.startsWith('{') || value.startsWith('[')) {
    return `'${value.replace(/'/g, "''")}'::jsonb`;
  }

  // 날짜 체크
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return `'${value}'::timestamptz`;
  }

  // 일반 문자열
  return `'${value.replace(/'/g, "''")}'`;
}

// Businesses SQL 생성
function generateBusinessesSQL(rows) {
  console.log('-- ============================================');
  console.log('-- Businesses Data Import');
  console.log('-- Generated at:', new Date().toISOString());
  console.log('-- ============================================\n');

  rows.forEach((row, index) => {
    const fields = [];
    const values = [];

    // 필수 필드
    fields.push('name', 'category', 'phone', 'street_address_1', 'city', 'state', 'postal_code', 'latitude', 'longitude');
    values.push(
      escapeSQLValue(row.name),
      escapeSQLValue(row.category),
      escapeSQLValue(row.phone),
      escapeSQLValue(row.street_address_1),
      escapeSQLValue(row.city),
      escapeSQLValue(row.state),
      escapeSQLValue(row.postal_code),
      escapeSQLValue(row.latitude),
      escapeSQLValue(row.longitude)
    );

    // 선택 필드
    if (row.email) {
      fields.push('email');
      values.push(escapeSQLValue(row.email));
    }
    if (row.description) {
      fields.push('description');
      values.push(escapeSQLValue(row.description));
    }
    if (row.logo_url) {
      fields.push('logo_url');
      values.push(escapeSQLValue(row.logo_url));
    }
    if (row.cover_image_url) {
      fields.push('cover_image_url');
      values.push(escapeSQLValue(row.cover_image_url));
    }
    if (row.hours) {
      fields.push('hours');
      values.push(escapeSQLValue(row.hours));
    }

    console.log(`-- Business ${index + 1}: ${row.name}`);
    console.log(`INSERT INTO businesses (${fields.join(', ')})`);
    console.log(`VALUES (${values.join(', ')});`);
    console.log('');
  });
}

// Coupons SQL 생성
function generateCouponsSQL(rows) {
  console.log('-- ============================================');
  console.log('-- Coupons Data Import');
  console.log('-- Generated at:', new Date().toISOString());
  console.log('-- ============================================\n');
  console.log('-- Note: Replace business_name with actual business_id');
  console.log('-- Run this query first to get business IDs:');
  console.log('-- SELECT id, name FROM businesses;\n');

  rows.forEach((row, index) => {
    const fields = [];
    const values = [];

    console.log(`-- Coupon ${index + 1}: ${row.title} (${row.business_name})`);
    console.log(`INSERT INTO coupons (`);
    
    // business_id는 서브쿼리로 처리
    fields.push('  business_id');
    values.push(`  (SELECT id FROM businesses WHERE name = ${escapeSQLValue(row.business_name)} LIMIT 1)`);

    // 필수 필드
    fields.push('  title', '  code', '  discount_type', '  expiration_date');
    values.push(
      `  ${escapeSQLValue(row.title)}`,
      `  ${escapeSQLValue(row.code)}`,
      `  ${escapeSQLValue(row.discount_type)}`,
      `  ${escapeSQLValue(row.expiration_date)}`
    );

    // 선택 필드
    if (row.description) {
      fields.push('  description');
      values.push(`  ${escapeSQLValue(row.description)}`);
    }
    if (row.discount_value) {
      fields.push('  discount_value');
      values.push(`  ${escapeSQLValue(row.discount_value)}`);
    }
    if (row.start_date) {
      fields.push('  start_date');
      values.push(`  ${escapeSQLValue(row.start_date)}`);
    }
    if (row.terms_and_conditions) {
      fields.push('  terms_and_conditions');
      values.push(`  ${escapeSQLValue(row.terms_and_conditions)}`);
    }

    console.log(fields.join(',\n'));
    console.log(`) VALUES (`);
    console.log(values.join(',\n'));
    console.log(`);\n`);
  });
}

// 메인 함수
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node csv-to-sql.js <csv-file>');
    console.error('');
    console.error('Examples:');
    console.error('  node csv-to-sql.js businesses_template.csv > businesses.sql');
    console.error('  node csv-to-sql.js coupons_template.csv > coupons.sql');
    process.exit(1);
  }

  const csvFile = args[0];
  
  if (!fs.existsSync(csvFile)) {
    console.error(`Error: File not found: ${csvFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(csvFile, 'utf-8');
  const { headers, rows } = parseCSV(content);

  const fileName = path.basename(csvFile, '.csv');

  if (fileName.includes('business')) {
    generateBusinessesSQL(rows);
  } else if (fileName.includes('coupon')) {
    generateCouponsSQL(rows);
  } else {
    console.error('Error: Unknown CSV type. File name should contain "business" or "coupon"');
    process.exit(1);
  }

  console.log('-- ============================================');
  console.log(`-- Total ${rows.length} records generated`);
  console.log('-- ============================================');
}

// 실행
main();



