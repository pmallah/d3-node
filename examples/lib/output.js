import { createWriteStream, existsSync, writeFile } from "fs";
import { join } from "path";
import svg2png from "svg2png";

export default function (outputName, d3n) {
  if (d3n.options.canvas) {
    const canvas = d3n.options.canvas;
    console.log("canvas output...", canvas);
    canvas
      .pngStream()
      .pipe(createWriteStream("/dist/" + outputName + ".png"));
    return;
  }
  console.log(process.cwd());
  const writeToPath = join(
    process.cwd(),
    "/dist/" + outputName + ".html"
  );
  writeFile(writeToPath, d3n.html(), function () {
    console.log("prem", existsSync(writeToPath));
    console.log(
      '>> Done. Open "/dist/' + outputName + '.html" in a web browser'
    );
  });

  const svgBuffer = Buffer.from(d3n.svgString(), "utf-8");
  svg2png(svgBuffer)
    .then((buffer) => {
      const p = join(process.cwd(), "/dist/" + outputName + ".png");
      writeFile(p, buffer, () => {
        console.log("prem", existsSync(p));
      });
    })
    .catch((e) => console.error("ERR:", e))
    .then(() =>
      console.log('>> Exported: "/dist/' + outputName + '.png"')
    );
}
