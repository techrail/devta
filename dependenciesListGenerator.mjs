import fs from "fs";
import path from "path";
import registryURL from "registry-url";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "src"),
  pages = path.join(src, "pages"),
  components = path.join(src, "components"),
  stores = path.join(src, "stores"),
  router = path.join(src, "router"),
  utils = path.join(components, "utils"),
  packageJson = path.join(__dirname, "package.json"),
  thankYouPageDir = path.join(pages, "ThankYou"),
  npmRegistryURL = registryURL();

const NPMPackageLink = `https://www.npmjs.com/package/`;

let modules = [];

/*
    Single module looks like this
    module = {
        "name": string,
        "link": string,
        "description": string,
        "homepage": string
    }

    link here is the npm link to the package
*/

async function getPackageDetails(name) {
  try {
    const data = await (await fetch(npmRegistryURL + name)).json();

    return {
      success: {
        description: data.description,
        homepage: data.homepage,
      },
      error: false,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

function extractModules(content) {
  const lines = content.split(/\n/g);

  let modules = [];

  let j = 0;

  while (lines[j]) {
    if (lines[j].match("from") || lines[j].startsWith("import")) {
      lines[j] = lines[j]
        .split(/\s/)
        .at(-2)
        .replace(/\"|\'|;/g, "");
      if (!lines[j].match(/^\.[\/\\\.]*/g)) {
        modules.push(lines[j]);
      }
    }
    j++;
  }
  modules = new Set(modules);
  modules = Array.from(modules);
  return modules;
}

function getDirModules(dir) {
  const files = fs.readdirSync(dir);
  let tempModules = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i].match(/\./)) {
      const content = fs.readFileSync(path.join(dir, files[i]), "utf-8");
      tempModules = new Set([...tempModules, ...extractModules(content)]);

      tempModules = Array.from(tempModules);
    }
  }
  return tempModules;
}

function getSrcModules(src) {
  const moduleFolders = fs.readdirSync(src);
  let tempModules = [];
  for (let i = 0; i < moduleFolders.length; i++) {
    tempModules = new Set([
      ...tempModules,
      ...getDirModules(path.join(src, moduleFolders[i])),
    ]);

    tempModules = Array.from(tempModules);
  }
  return tempModules;
}

async function generateDependenciesList() {
  console.log(`Generating list of dependencies for thank you page... 👷‍♂️`);
  modules = new Set(
    [
      ...getSrcModules(pages),
      ...getSrcModules(components),
      ...getDirModules(router),
      ...getDirModules(stores),
      ...getDirModules(utils),
      ...getDirModules(src),
    ].map((e) => (e.startsWith("@") ? e : e.split(/[\/\\]/)[0]))
  );

  modules = Array.from(modules);

  // there are a lot of garbage generated
  // let's clean that now by checking
  // if the module found exists in the package.json file
  const packageJsonContent = JSON.parse(fs.readFileSync(packageJson, "utf-8"));

  const realDependencies = Object.keys(packageJsonContent.dependencies);

  modules = modules.filter((e) => realDependencies.includes(e));

  for (let i = 0; i < modules.length; i++) {
    let details = await getPackageDetails(modules[i]);
    let final = {
      name: modules[i],
      link: NPMPackageLink + modules[i],
      description: details.success?.description || undefined,
      homepage: details.success?.homepage || undefined,
    };
    modules[i] = final;
  }

  const dependenciesFile = `const dependencies = ${JSON.stringify(
    modules,
    null,
    4
  )}; \n\n export default dependencies;`;

  fs.writeFileSync(
    path.join(thankYouPageDir, "dependencies.js"),
    dependenciesFile,
    "utf-8"
  );

  console.log(`List of dependencies successfully generated ✨`);
}

export default () => ({
  name: "dependencies-list-generator",
  apply: "build",
  async configResolved() {
    await generateDependenciesList();
  },
});
