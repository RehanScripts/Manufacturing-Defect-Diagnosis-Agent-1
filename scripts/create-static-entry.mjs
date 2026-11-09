import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

const assetsDir = join(process.cwd(), "dist", "client", "assets");
const files = await readdir(assetsDir);
const entry = files.find((file) => /^index-[^/]+\.js$/.test(file));
const stylesheet = files.find((file) => /^index-[^/]+\.css$/.test(file));

if (!entry || !stylesheet) {
  throw new Error("Could not find the generated client entry assets");
}

await writeFile(
  join(process.cwd(), "dist", "client", "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manufacturing Defect Diagnosis Agent</title>
    <link rel="stylesheet" href="/assets/${stylesheet}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entry}"></script>
  </body>
</html>
`,
);
