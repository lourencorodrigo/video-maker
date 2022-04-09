const fs = require("fs");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

const ffmpeg = createFFmpeg({ log: true });

(async () => {
  const fileName = `${new Date().getTime()}.mp4`;
  const myArgs = process.argv.slice(2);

  if (!myArgs.includes("-f")) {
    throw new Error("You did not select a correct file");
  }

  if (!myArgs.includes("-d")) {
    throw new Error("You did not put any destination");
  }

  const inputFileName = myArgs[myArgs.indexOf("-f") + 1];
  myArgs.splice(myArgs.indexOf("-f"), 2);

  await ffmpeg.load();
  ffmpeg.FS("writeFile", "video.mp4", await fetchFile(inputFileName));
  await ffmpeg.run(...myArgs, "-i", "video.mp4", "-s", "384:216", fileName);
  await fs.promises.writeFile(fileName, ffmpeg.FS("readFile", fileName));
  process.exit(0);
})();
