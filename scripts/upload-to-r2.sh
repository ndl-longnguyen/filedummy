#!/bin/bash
set -e

BUCKET="${R2_BUCKET_NAME:-file-templates}"
SOURCE="./generated-files"

if [ ! -d "$SOURCE" ]; then
  echo "Error: Directory $SOURCE does not exist. Run ./scripts/generate-files.sh first."
  exit 1
fi

echo "Uploading all files from $SOURCE to Cloudflare R2 bucket: $BUCKET..."

find "$SOURCE" -type f | while read -r filepath; do
  r2key="${filepath#$SOURCE/}"
  echo "Uploading: $r2key ..."
  npx wrangler r2 object put "$BUCKET/$r2key" --file "$filepath"
done

echo "=== All files uploaded to R2 successfully ==="
