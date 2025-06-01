import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainAppDistDir = path.resolve(__dirname, "../dist");
const vuepressTempDistDir = path.resolve(__dirname, "../docs/dist-blog-temp");
const blogTargetDir = path.join(mainAppDistDir, "blog"); // Where blog will live in final dist

console.log("--- Copying VuePress blog assets ---");
console.log(`Source: ${vuepressTempDistDir}`);
console.log(`Target: ${blogTargetDir}`);

fs.ensureDirSync(blogTargetDir);

fs.copySync(vuepressTempDistDir, blogTargetDir, { overwrite: true });

fs.removeSync(vuepressTempDistDir);

console.log("--- VuePress blog assets copied successfully ---");
