const glob = require("glob");
const fs = require("fs");
const setSeries = require("./series.json");

async function main() {
  for (let a = 0; a < setSeries.length; a++) {
    console.log(`${setSeries[a].settings.type} 처리중...`);
    if (!fs.existsSync(setSeries[a].settings.destinationFolder)) {
      fs.mkdirSync(setSeries[a].settings.destinationFolder);
    }
    for (let b = 0; b < setSeries[a].data.length; b++) {
      console.log(`${setSeries[a].data[b].seriseName} 폴더 생성중...`);
      for (let c = 0; c < setSeries[a].data.length; c++) {
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
              if (
                files[e]
                  .split("/")
                  .pop()
                  .includes(setSeries[a].data[f].seriseName)
              ) {
                fs.rename(
                  files[e],
                  setSeries[a].settings.destinationFolder +
                    "/" +
                    setSeries[a].data[f].seriseName +
                    "/" +
                    files[e].split("/").pop(),
                  (err) => {
                    if (err) throw err;
                    console.log(`일치 파일 처리 완료 : ${files[e]}`);
                  }
                );
                break;
              }
              for (
                let g = 0;
                g < setSeries[a].data[f].additionalName.length;
                g++
              ) {
                if (
                  files[e]
                    .split("/")
                    .pop()
                    .includes(setSeries[a].data[f].additionalName[g])
                ) {
                  fs.rename(
                    files[e],
                    setSeries[a].settings.destinationFolder +
                      "/" +
                      setSeries[a].data[f].seriseName +
                      "/" +
                      files[e].split("/").pop(),
                    (err) => {
                      if (err) throw err;
                      console.log(`예외 일치 파일 처리 완료 : ${files[e]}`);
                    }
                  );
                  break;
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
