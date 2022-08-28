const fs = require("fs"); // Node.js file system module
const dir =
  "G:\\공유 드라이브\\users.parks98.2.NETPLEX\\3.요청 자료\\예능(이시형님)"; // 지정 경로
const setFolderㄴ = [
  "1박 2일",
  "여름특집 놀면 뭐하니",
  "나 혼자 산다",
  "런닝맨",
  "아는 형님",
  "전지적 참견 시점",
]; // 해당 이름으로 폴더를 생성후, 파일명이 해당 이름으로 시작할 경우 각자의 폴더로 저장

const setFolder = [
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
const exceptFileAndFolder = ["정리완료", "result.txt"]; // 정리완료 폴더와 result.log 파일 제외

const log = dir + "\\result.txt"; // 로그파일 설정
fs.open(log, "w", (err, fd) => {
  if (err) throw err;
  console.log("result.txt 파일 생성 완료");
}); // 로그파일 생성

/* setFolder 에 설정된 폴더 생성*/
setFolder.forEach((folder) => {
  if (!fs.existsSync(dir + "\\정리완료\\" + folder.seriseName)) {
    fs.mkdirSync(dir + "\\정리완료\\" + folder.seriseName);
  }
});
/* */
fs.readdir(dir, async function (error, fileList) {
  if (error) {
    console.log(error); // 오류 발생 시 에러 출력
  }
  fileList = fileList.filter((except) => !exceptFileAndFolder.includes(except)); // 정리완료 폴더와 result.log 파일 제외
  // console.log(fileList); // dir 경로에 있는 파일 및 폴더명 출력)

  // for (let i = 0; i < setFolder.length; i++) {
  //   console.log(setFolder[i].additionalName);
  //   for (let j = 0; j < fileList.length; j++) {
  //     if (fileList[j].startsWith(setFolder[i].additionalName)) {
  //       console.log(fileList[j]);
  //       fs.rename(
  //         dir + "\\" + fileList[j],
  //         dir + "\\정리완료\\" + setFolder[i].seriseName + "\\" + fileList[j],
  //         (err) => {
  //           if (err) throw err;
  //           console.log(fileList[j] + " 파일 이동완료");
  //         }
  //       );
  //     }
  //   }
  // }
  for (let i = 0; i < fileList.length; i++) {
    console.log(fileList[i]);
    console.log(fileList.length);
    for (let j = 0; j < setFolder.length; j++) {
      for (let k = 0; k < setFolder[j].additionalName.length; k++) {
        if (fileList[i].startsWith(setFolder[j].additionalName[k])) {
          fs.rename(
            dir + "\\" + fileList[i],
            dir + "\\정리완료\\" + setFolder[j].seriseName + "\\" + fileList[i],
            (err) => {
              if (err) throw err;
              console.log(fileList[i] + " 파일 이동완료");
              fs.appendFile(
                log,
                `${fileList[i]} move to ${setFolder[j].seriseName} folder \n`,
                "utf8",
                (err) => {
                  if (err) throw err;
                }
              );
            }
          );
        }
      }
    }
  }

  // for (let i = 0; i < fileList.length; i++) {
  // fileList.find((file) => {
  //   console.log(file);
  //   console.log(fileList.length);
  //   setFolder.additionalName.forEach((additionalName) => {
  //     if (file.startsWith(additionalName)) {
  //       fs.rename(
  //         dir + "\\" + file,
  //         dir + "\\정리완료\\" + setFolder.seriseName + "\\" + file,
  //         (err) => {
  //           if (err) throw err;
  //           console.log(file + " 파일 이동완료");
  //         }
  //       );
  //     }
  //   });
  // });
  // for (let j = 0; j < setFolder[j].additionalName.length; j++) {
  //   console.log(`${fileList[i]}와 ${setFolder[j].additionalName[j]} 비교`);
  //   if (fileList[i].startsWith(setFolder[j].additionalName[j])) {
  //     fs.rename(
  //       dir + "\\" + fileList[i],
  //       dir + "\\정리완료\\" + setFolder[j].seriseName + "\\" + fileList[i],
  //       function (err) {
  //         if (err) throw err;
  //       }
  //     );
  //   }
  // }
  // }
  // setFolder.forEach((data) => {
  //   // console.log(data);

  //   fileList.forEach((file) => {
  //     // console.log(file);
  //     if (file.startsWith(data.additionalName)) {
  //       console.log(file.startsWith(data.additionalName));
  //     }
  //   });

  // setFolder.forEach((folder) => {
  //   console.log(folder.additionalName);
  //   // if (folder.additionalName.startsWith(folder.additionalName)) {
  //   //   console.log(folder.additionalName);
  //   // }
  // });

  // let correspondingFolder = setFolder.fs.appendFile(
  //   log,
  //   `${file} move to ${correspondingFolder} folder complete. \n`,
  //   "utf8",
  //   function (err) {
  //     if (err) throw err;
  //   }
  // );
  // console.log(
  //   `${file} 파일을 ${correspondingFolder} 폴더로 이동했습니다.`
  // );
  //   }
  // );
  // });
  // fs.appendFile(log, "정리 완료\n", "utf8", function (err) {
  //   console.log("정리 완료");
  // });
});
