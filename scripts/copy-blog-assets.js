import fs from "fs-extra";
import path from "path";

const mainAppDistDir = path.resolve(__dirname, "../dist");
const vuepressTempDistDir = path.resolve(__dirname, "../docs/dist-blog-temp");
const blogTargetDir = path.join(mainAppDistDir, "blog");

console.log("--- Copying VuePress blog assets ---");
console.log(`Source: ${vuepressTempDistDir}`);
console.log(`Target: ${blogTargetDir}`);

fs.ensureDirSync(blogTargetDir);

fs.copySync(vuepressTempDistDir, blogTargetDir, { overwrite: true });

fs.removeSync(vuepressTempDistDir);

console.log("--- VuePress blog assets copied successfully ---");
