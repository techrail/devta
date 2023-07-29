import path from "path";
import fs from "fs";

console.log("Generating modules...");

// have a list containing all modules
// key -> slug,
// value info and executioner -> the class exported
const imports = [];
const modules_list = {};

const modulesPath = path.join("./", "src", "modules");

const dirs = (
  await fs.promises.readdir(modulesPath, {
    withFileTypes: true,
  })
)
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

let modulePath = "";

for (let dir in dirs) {
  modulePath = dirs[dir] + "/" + "index.mjs";
  const { default: module } = await import("./" + modulePath);
  const info = module.info();
  const slug = info.slug;
  delete info.slug;
  modules_list[slug] = {
    ...info,
    module: dirs[dir],
  };
  imports.push(`import ${dirs[dir]} from "${"./modules/" + modulePath}"`);
}

// generate modules.mjs file
let modulesFileContents = `${imports.join("\n")}`;

modulesFileContents += "\n\n";

modulesFileContents += `let modules = ${JSON.stringify(modules_list).replace(
  /\"module\"\:\"([A-Za-z]*)+\"/g,
  `"module": $1`
)}`;
modulesFileContents += "\n\n";
modulesFileContents += "export default modules";

fs.writeFileSync(
  path.join("./", "src", "modules.mjs"),
  modulesFileContents,
  "utf-8"
);

console.log(`${imports.length} module(s) generated and saved!`);
