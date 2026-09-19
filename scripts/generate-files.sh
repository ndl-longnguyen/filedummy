#!/bin/bash
set -e

OUTPUT="./generated-files"
echo "Creating output directories in $OUTPUT..."
mkdir -p "$OUTPUT/pdf" "$OUTPUT/docx" "$OUTPUT/txt" "$OUTPUT/jpg" "$OUTPUT/png" "$OUTPUT/csv" "$OUTPUT/json" "$OUTPUT/zip"

# Document sizes
SIZES=(1 5 10 15 20 30 50 100 200 500 1024)
LABELS=(1mb 5mb 10mb 15mb 20mb 30mb 50mb 100mb 200mb 500mb 1gb)

echo "Generating PDF and DOCX dummy files..."
for i in "${!SIZES[@]}"; do
  MB=${SIZES[$i]}
  LABEL=${LABELS[$i]}
  BYTES=$((MB * 1024 * 1024))

  # PDF: minimal valid PDF structure with padding
  python3 -c "
import os
header = b'%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000068 00000 n\n0000000125 00000 n\ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n200\n%%EOF\n'
target = $BYTES
padding = max(0, target - len(header))
with open('$OUTPUT/pdf/sample-$LABEL.pdf', 'wb') as f:
    f.write(header)
    chunk = b'%' + (b'0' * 65535)
    written = len(header)
    while written + len(chunk) <= target:
        f.write(chunk)
        written += len(chunk)
    if target > written:
        f.write(b'%' + b'0' * (target - written - 1))
"
  echo "✓ PDF $LABEL generated ($BYTES bytes)"

  # DOCX: generate valid zip structure padded to target
  python3 -c "
import zipfile, io, os
target = $BYTES
buf = io.BytesIO()
with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.writestr('[Content_Types].xml', '<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\"><Default Extension=\"xml\" ContentType=\"application/xml\"/></Types>')
    zf.writestr('word/document.xml', '<w:document xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\"><w:body><w:p><w:r><w:t>FileDummy Sample Document $LABEL</w:t></w:r></w:p></w:body></w:document>')
data = buf.getvalue()
with open('$OUTPUT/docx/sample-$LABEL.docx', 'wb') as f:
    f.write(data)
    if target > len(data):
        pad_needed = target - len(data)
        f.write(b'\x00' * pad_needed)
"
  echo "✓ DOCX $LABEL generated ($BYTES bytes)"
done

echo "Generating TXT files..."
python3 -c "
import os
lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
with open('$OUTPUT/txt/sample-lorem.txt', 'w') as f:
    f.write((lorem * 250)[:51200])

unicode_text = 'Hello World • Héllo Wörld • こんにちは • 안녕하세요 • مرحبا • Привет • 你好世界 • Xin chào thế giới • Ça va bien • Über die Straße\n'
with open('$OUTPUT/txt/sample-unicode.txt', 'w', encoding='utf-8') as f:
    f.write((unicode_text * 600)[:51200])

ascii_chars = ''.join(chr(i) for i in range(32, 127)) + '\n'
with open('$OUTPUT/txt/sample-ascii.txt', 'w') as f:
    f.write((ascii_chars * 1050)[:102400])

with open('$OUTPUT/txt/sample-large.txt', 'w') as f:
    f.write((lorem * 5000)[:1_048_576])

with open('$OUTPUT/txt/sample-5mb.txt', 'w') as f:
    chunk = (lorem * 100)
    written = 0
    target = 5_242_880
    while written + len(chunk) < target:
        f.write(chunk)
        written += len(chunk)
    f.write(chunk[:target - written])

with open('$OUTPUT/txt/sample-10mb.txt', 'w') as f:
    chunk = (lorem * 100)
    written = 0
    target = 10_485_760
    while written + len(chunk) < target:
        f.write(chunk)
        written += len(chunk)
    f.write(chunk[:target - written])
"
echo "✓ TXT files generated"

echo "Generating CSV and JSON datasets..."
python3 -c "
import json

def make_csv(filename, target_bytes):
    header = 'id,first_name,last_name,email,gender,ip_address,city,country,transaction_amount,created_at\n'
    row = '1001,John,Doe,john.doe@example.com,Male,192.168.1.1,New York,United States,499.99,2026-01-15T08:30:00Z\n'
    with open(filename, 'w') as f:
        f.write(header)
        written = len(header)
        while written + len(row) <= target_bytes:
            f.write(row)
            written += len(row)
        if target_bytes > written:
            f.write(row[:target_bytes - written])

make_csv('$OUTPUT/csv/sample-100kb.csv', 102400)
make_csv('$OUTPUT/csv/sample-500kb.csv', 512000)
make_csv('$OUTPUT/csv/sample-1mb.csv', 1048576)
make_csv('$OUTPUT/csv/sample-5mb.csv', 5242880)
make_csv('$OUTPUT/csv/sample-10mb.csv', 10485760)

def make_json(filename, target_bytes):
    record = '{\"id\":1001,\"name\":\"Product Demo\",\"sku\":\"SKU-98721\",\"price\":49.95,\"inStock\":true,\"tags\":[\"test\",\"sample\",\"qa\"]},'
    prefix = '{\n  \"status\": \"success\",\n  \"total\": 1000,\n  \"items\": [\n'
    suffix = '    {\"id\":9999,\"name\":\"Final Item\"}\n  ]\n}\n'
    with open(filename, 'w') as f:
        f.write(prefix)
        written = len(prefix) + len(suffix)
        while written + len(record) <= target_bytes:
            f.write('    ' + record + '\n')
            written += len('    ' + record + '\n')
        f.write(suffix)

make_json('$OUTPUT/json/sample-50kb.json', 51200)
make_json('$OUTPUT/json/sample-200kb.json', 204800)
make_json('$OUTPUT/json/sample-1mb.json', 1048576)
make_json('$OUTPUT/json/sample-5mb.json', 5242880)
make_json('$OUTPUT/json/sample-10mb.json', 10485760)
"
echo "✓ CSV & JSON files generated"

echo "Generating Image and ZIP dummy files..."
python3 -c "
import zipfile, io

# Minimal valid JPEG
jpeg_header = bytes.fromhex('ffd8ffe000104a46494600010101004800480000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffc0000b080001000101011100ffda0008010100003f00bf00ffd9')
for label, bytes_count in [('100kb', 102400), ('500kb', 512000), ('1mb', 1048576), ('2mb', 2097152), ('5mb', 5242880), ('10mb', 10485760)]:
    with open(f'$OUTPUT/jpg/sample-{label}.jpg', 'wb') as f:
        f.write(jpeg_header)
        f.write(b'\x00' * max(0, bytes_count - len(jpeg_header)))

# Minimal valid PNG
png_header = bytes.fromhex('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2d400000000049454e44ae426082')
for label, bytes_count in [('100kb', 102400), ('500kb', 512000), ('1mb', 1048576), ('2mb', 2097152), ('5mb', 5242880), ('10mb', 10485760)]:
    with open(f'$OUTPUT/png/sample-{label}.png', 'wb') as f:
        f.write(png_header)
        f.write(b'\x00' * max(0, bytes_count - len(png_header)))

# Valid ZIP archives
for label, bytes_count in [('1mb', 1048576), ('5mb', 5242880), ('10mb', 10485760), ('25mb', 26214400), ('50mb', 52428800), ('100mb', 104857600)]:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('readme.txt', f'FileDummy Sample Archive {label}\\nTarget Size: {bytes_count} bytes')
    raw = buf.getvalue()
    with open(f'$OUTPUT/zip/sample-{label}.zip', 'wb') as f:
        f.write(raw)
        f.write(b'\x00' * max(0, bytes_count - len(raw)))
"
echo "✓ JPG, PNG, and ZIP files generated"
echo "=== All test files generated successfully in $OUTPUT/ ==="
