const glob = require("glob");
const fs = require("fs");
const setSeries = require("./series.json");

const rootFolder = ["/mnt/c/Users/super/Documents/GitHub/netplex/dir", ""]; // 최상위 경로
// const trashFolder = "/mnt/c/Users/super/Documents/GitHub/netplex/trash"; // 휴지통 경로
const destinationFolder =
  "/mnt/c/Users/super/Documents/GitHub/netplex/destination"; // 이동할 경로

/* setFolder 에 설정된 폴더 생성*/
setSeries.forEach((folder) => {
  if (!fs.existsSync(destinationFolder + "/" + folder.seriseName)) {
    fs.mkdirSync(destinationFolder + "/" + folder.seriseName);
  }
});

let selectExtention = ["mp4", "mkv", "avi"]; // 확장자 설정
// 경로를 `/mnt/c/Users/super/Documents/GitHub/netplex/dir/**/*(*.mp4|*.mkv)` 와 같은 형식으로 설정 완료
selectExtention = selectExtention.map((ext) => `*.${ext}`).join("|");

async function main() {
  for (let k = 0; k < rootFolder.length; k++) {
    const searchDir = `${rootFolder[k]}/**/*(${selectExtention})`;
    await glob(searchDir, (err, files) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log(files);
        for (let i = 0; i < files.length; i++) {
          for (let j = 0; j < setSeries.length; j++) {
            if (files[i].startsWith(setSeries[j].seriseName)) {
              fs.rename(
                files[i],
                destinationFolder +
                  "/" +
                  setSeries[j].seriseName +
                  "/" +
                  files[i].split("/").pop(),
                (err) => {
                  if (err) throw err;
                  console.log(`일치 파일 처리 완료 : ${files[i]}`);
                }
              );
              break;
            } else if (
              setSeries[j].additionalName.startsWith(
                files[i].split("/").pop().split(".")[0]
              )
            ) {
              fs.rename(
                files[i],
                destinationFolder +
                  "/" +
                  setSeries[j].seriseName +
                  "/" +
                  files[i].split("/").pop(),
                (err) => {
                  if (err) throw err;
                  console.log(`예외 파일 처리 완료 : ${files[i]}`);
                }
              );
              break;
            }
          }
        }
      }
    });
  }
}

main();
