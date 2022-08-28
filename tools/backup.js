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
    additionalName: ["1박2일", "1박-2일"],
  },
  {
    seriseName: "여름특집 놀면 뭐하니",
    additionalName: ["여름특집놀면뭐하니"],
  },
  {
    seriseName: "나 혼자 산다",
    additionalName: ["나혼자산다"],
  },
  {
    seriseName: "런닝맨",
    additionalName: [],
  },
  {
    seriseName: "아는 형님",
    additionalName: ["아는형님"],
  },
  {
    seriseName: "전지적 참견 시점",
    additionalName: ["전지적참견시점"],
  },
];
const exceptFileAndFolder = ["정리완료", "result.log"]; // 정리완료 폴더와 result.log 파일 제외

const log = dir + "\\result.log"; // 로그파일 설정
fs.open(log, "w", (err, fd) => {
  if (err) throw err;
  console.log("result.log 파일 생성 완료");
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
  fileList.forEach((file) => {
    console.log(file);
    const correspondingFolder = setFolder.find((folderName) => {
      file.startsWith(folderName.seriseName);
      if (folderName.additionalName.length > 0) {
        console.log("additionl!");
        return folderName.additionalName.includes(file);
      }
    });
    if (correspondingFolder) {
      // fs.rename(
      //   dir + "\\" + file,
      //   dir + "\\정리완료\\" + correspondingFolder + "\\" + file,
      //   function (err) {
      //     if (err) {
      //       console.log(err);
      //       fs.appendFile(log, `${file} fail.\n`, "utf8", function (err) {
      //         if (err) throw err;
      //       });
      //     }
      fs.appendFile(
        log,
        `${file} move to ${correspondingFolder} folder complete. \n`,
        "utf8",
        function (err) {
          if (err) throw err;
        }
      );
      // console.log(
      //   `${file} 파일을 ${correspondingFolder} 폴더로 이동했습니다.`
      // );
      //   }
      // );
    }
  });
  fs.appendFile(log, "정리 완료\n", "utf8", function (err) {
    console.log("정리 완료");
  });
});
