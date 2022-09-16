const glob = require("glob");
const fs = require("fs");

const rootFolder = "/mnt/c/Users/super/Documents/GitHub/netplex/dir"; // 최상위 경로
// const trashFolder = "/mnt/c/Users/super/Documents/GitHub/netplex/trash"; // 휴지통 경로
const destinationFolder =
  "/mnt/c/Users/super/Documents/GitHub/netplex/destination"; // 이동할 경로

const setSeries = [
  {
    seriseName: "1박 2일",
    additionalName: ["1박 2일", "1박2일", "1박-2일"],
  },
  {
    seriseName: "여름특집 놀면 뭐하니",
    additionalName: ["여름특집 놀면 뭐하니", "여름특집놀면뭐하니"],
  },
  {
    seriseName: "나 혼자 산다",
    additionalName: ["나 혼자 산다", "나혼자산다"],
  },
  {
    seriseName: "런닝맨",
    additionalName: ["런닝맨"],
  },
  {
    seriseName: "아는 형님",
    additionalName: ["아는 형님", "아는형님"],
  },
  {
    seriseName: "전지적 참견 시점",
    additionalName: ["전지적 참견 시점", "전지적참견시점"],
  },
];

// const log = rootFolder + "/result.txt"; // 로그파일 설정
// fs.open(log, "w", (err, fd) => {
//   if (err) throw err;
//   console.log("result.txt 파일 생성 완료");
// }); // 로그파일 생성

/* setFolder 에 설정된 폴더 생성*/
setSeries.forEach((folder) => {
  if (!fs.existsSync(destinationFolder + "/" + folder.seriseName)) {
    fs.mkdirSync(destinationFolder + "/" + folder.seriseName);
  }
});

let selectExtention = ["mp4", "mkv", "avi"]; // 확장자 설정
let selectAllFiles = `${rootFolder}/**/*`;
// 경로를 `/mnt/c/Users/super/Documents/GitHub/netplex/dir/**/*(*.mp4|*.mkv)` 와 같은 형식으로 설정 완료
selectExtention = selectExtention.map((ext) => `*.${ext}`).join("|");

const searchDir = `${rootFolder}/**/*(${selectExtention})`;

async function main() {
  await glob(searchDir, (err, files) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < setSeries.length; j++) {
          if (files[i].includes(setSeries[j].seriseName)) {
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
            setSeries[j].additionalName.includes(
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

  //   /* 남은 파일 및 폴더 정리 */
  //   await glob(selectAllFiles, (err, files) => {
  //     if (err) {
  //       console.log("Error", err);
  //     } else {
  //       for (let i = 0; i < files.length; i++) {
  //         fs.rename(
  //           files[i],
  //           trashFolder + "/" + files[i].split("/").pop(),
  //           (err) => {
  //             console.log(`남은 파일 처리 완료 : ${files[i]}`);
  //           }
  //         );
  //       }
  //     }
  //   });

  //   await glob("", { matchBase: true }, (err, files) => {
  //     if (err) {
  //       console.log("Error", err);
  //     } else {
  //       console.log(files);
  //     }
  //   });
}

main();
