// scripts/copy-blog-assets.js
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainAppDistDir = path.resolve(__dirname, "../dist");
const vuepressTempDistDir = path.resolve(__dirname, "../dist-blog-temp");
const blogTargetDir = path.join(mainAppDistDir, "blog");

console.log("--- Debugging Copy VuePress Blog Assets Script ---");
console.log(`Current working directory (from __dirname): ${process.cwd()}`); // Add this to see where the script thinks it is
console.log(`__dirname: ${__dirname}`);
console.log(`mainAppDistDir: ${mainAppDistDir}`);
console.log(`vuepressTempDistDir: ${vuepressTempDistDir}`);
console.log(`blogTargetDir: ${blogTargetDir}`);

// Check if source directory exists and is not empty
if (!fs.existsSync(vuepressTempDistDir)) {
  console.error(
    `ERROR: VuePress temporary build directory DOES NOT EXIST: ${vuepressTempDistDir}`
  );
  // Exit with an error code to make the GitHub Actions step fail explicitly
  process.exit(1);
} else {
  console.log(
    `VuePress temporary build directory EXISTS: ${vuepressTempDistDir}`
  );
  const files = fs.readdirSync(vuepressTempDistDir);
  if (files.length === 0) {
    console.warn(
      `WARNING: VuePress temporary build directory IS EMPTY: ${vuepressTempDistDir}`
    );
  } else {
    console.log(
      `VuePress temporary build directory contains ${files.length} items.`
    );
    // console.log(`Contents: ${files.join(', ')}`); // Uncomment if you want to see all files
  }
}

// Ensure the target directory exists before copying into it
try {
  fs.ensureDirSync(blogTargetDir);
  console.log(`Ensured target directory EXISTS: ${blogTargetDir}`);
} catch (error) {
  console.error(
    `ERROR: Failed to ensure target directory: ${blogTargetDir}`,
    error
  );
  process.exit(1);
}

// Copy contents of vuepressTempDistDir to blogTargetDir
try {
  fs.copySync(vuepressTempDistDir, blogTargetDir, { overwrite: true });
  console.log(
    `Successfully copied contents from ${vuepressTempDistDir} to ${blogTargetDir}`
  );
} catch (error) {
  console.error(
    `ERROR: Failed to copy assets from ${vuepressTempDistDir} to ${blogTargetDir}`,
    error
  );
  process.exit(1);
}

// Optional: Clean up the temporary VuePress build directory
try {
  fs.removeSync(vuepressTempDistDir);
  console.log(`Cleaned up temporary directory: ${vuepressTempDistDir}`);
} catch (error) {
  console.warn(
    `WARNING: Failed to remove temporary directory: ${vuepressTempDistDir}`,
    error
  );
}

console.log("--- VuePress blog assets script finished ---");
