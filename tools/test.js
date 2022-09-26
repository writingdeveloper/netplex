const glob = require("glob");
const fs = require("fs");
const setSeries = require("./series.json");

async function main() {
  for (let a = 0; a < setSeries.length; a++) {
    console.log(`${setSeries[a].settings.type} 처리중...`);
    /* 정의된 destinationFolder가 존재하지 않을시 폴더 생성*/
    if (!fs.existsSync(setSeries[a].settings.destinationFolder)) {
      fs.mkdirSync(setSeries[a].settings.destinationFolder);
    }
    for (let b = 0; b < setSeries[a].data.length; b++) {
      console.log(`${setSeries[a].data[b].seriseName} 폴더 생성중...`);
      /* 정의된 seriseName 폴더가 존재하지 않을시 폴더 생성*/
      if (
        !fs.existsSync(
          setSeries[a].settings.destinationFolder +
            "/" +
            setSeries[a].data[b].seriseName
        )
      ) {
        fs.mkdirSync(
          setSeries[a].settings.destinationFolder +
            "/" +
            setSeries[a].data[b].seriseName
        );
      }

      if (setSeries[a].data[b].hasOwnProperty("seasonFolder")) {
        console.log(`${setSeries[a].data[b].seasonFolder} 시즌 폴더 생성중...`);
        /* 정의된 seasonFolder가 존재하지 않을시 폴더 생성*/
        if (
          !fs.existsSync(
            setSeries[a].settings.destinationFolder +
              "/" +
              setSeries[a].data[b].seriseName +
              "/" +
              setSeries[a].data[b].seasonFolder
          )
        ) {
          fs.mkdirSync(
            setSeries[a].settings.destinationFolder +
              "/" +
              setSeries[a].data[b].seriseName +
              "/" +
              setSeries[a].data[b].seasonFolder
          );
        }
      }
    }
    console.log(`${setSeries[a].settings.type} 폴더 생성 완료`);
    for (let d = 0; d < setSeries[a].settings.rootFolder.length; d++) {
      let searchDir = `${setSeries[a].settings.rootFolder[d]}/**/*(${setSeries[
        a
      ].settings.fileTypes
        .map((ext) => `*.${ext}`)
        .join("|")})`;
      console.log(searchDir);
      await glob(searchDir, async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          for (let e = 0; e < files.length; e++) {
            for (let f = 0; f < setSeries[a].data.length; f++) {
              for (
                let g = 0;
                g < setSeries[a].data[f].additionalName.length;
                g++
              ) {
                if (
                  files[e].includes(setSeries[a].data[f].additionalName[g]) &&
                  setSeries[a].data[f].hasOwnProperty("seasonFolder")
                ) {
                  let newFileName = files[e].split("/").pop();
                  let newFilePath =
                    setSeries[a].settings.destinationFolder +
                    "/" +
                    setSeries[a].data[f].seriseName +
                    "/" +
                    setSeries[a].data[f].seasonFolder +
                    "/" +
                    newFileName;
                  console.log(newFilePath);
                  fs.renameSync(files[e], newFilePath);
                } else if (
                  files[e].includes(setSeries[a].data[f].additionalName[g])
                ) {
                  let newFileName = files[e].split("/").pop();
                  let newFilePath =
                    setSeries[a].settings.destinationFolder +
                    "/" +
                    setSeries[a].data[f].seriseName +
                    "/" +
                    newFileName;
                  console.log(newFilePath);
                  fs.renameSync(files[e], newFilePath);
                }
              }
            }
          }
        }
      });
    }
  }
}

main();
