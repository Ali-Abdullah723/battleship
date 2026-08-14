#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."
npm install

echo "Scaffolding src/ starter files..."
mkdir -p src

cat > src/template.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  </body>
</html>
EOF

cat > src/index.js <<'EOF'
import "./styles.css";
EOF

cat > src/styles.css <<'EOF'
EOF

echo "Done! Run 'npm run dev' (or 'npx webpack serve') to start the dev server, or 'npm run build'."
