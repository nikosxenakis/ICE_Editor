const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

// Create dist directory
const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read the original HTML
const htmlPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(htmlPath, "utf-8");

// Get all JavaScript file paths from HTML in order
const scriptRegex = /<script[^>]*src=["']([^"']+\.(?:js|json))["'][^>]*><\/script>/g;
const scripts = [];
let match;

while ((match = scriptRegex.exec(html)) !== null) {
  const src = match[1];
  // Skip external scripts and node_modules
  if (!src.startsWith("http") && !src.includes("node_modules")) {
    scripts.push(src);
  }
}

// Concatenate all JS files
let bundledJs = "";
scripts.forEach((scriptPath) => {
  const fullPath = path.join(__dirname, scriptPath);
  if (fs.existsSync(fullPath)) {
    console.log(`Adding: ${scriptPath}`);
    bundledJs += fs.readFileSync(fullPath, "utf-8") + "\n";
  } else {
    console.warn(`Warning: ${scriptPath} not found`);
  }
});

// Write bundled JS
const bundlePath = path.join(distDir, "bundle.js");
fs.writeFileSync(bundlePath, bundledJs);
console.log(`Bundle created: ${bundledJs.length} bytes`);

// Update HTML to use bundled JS
// Remove all local script tags (including .json files)
html = html.replace(
  /<script[^>]*src=["'](?!http)(?!.*node_modules)([^"']+\.(?:js|json))["'][^>]*><\/script>\s*/g,
  ""
);

// Add bundle script before closing body tag
html = html.replace("</body>", '<script src="bundle.js"></script>\n</body>');

// Copy necessary assets (exclude json since it's bundled)
const assetDirs = ["css", "images", "node_modules"];
assetDirs.forEach((dir) => {
  const srcDir = path.join(__dirname, dir);
  const destDir = path.join(distDir, dir);
  if (fs.existsSync(srcDir)) {
    copyDir(srcDir, destDir);
    console.log(`Copied: ${dir}`);
  }
});

// Minify HTML
minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: false, // Already bundled
})
  .then((minifiedHtml) => {
    fs.writeFileSync(path.join(distDir, "index.html"), minifiedHtml);
    console.log("Build complete! Output in dist/");
  })
  .catch((err) => {
    console.error("Error minifying HTML:", err);
    // Write non-minified version as fallback
    fs.writeFileSync(path.join(distDir, "index.html"), html);
    console.log("Build complete (HTML not minified)");
  });

// Helper function to recursively copy directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
