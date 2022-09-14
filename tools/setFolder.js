const fs = require("fs"); // Node.js file system module
const dir =
  "G:\\공유 드라이브\\users.parks98.07.NETPLEX\\3.요청 자료\\예능(이시형님)"; // 지정 경로
const destinationDir =
  "G:\\공유 드라이브\\users.parks98.07.NETPLEX\\3.요청 자료\\예능(이시형님 결과 테스트)"; // 이동할 경로

/*
폴더 경로는 윈도우의 경우 \\ 를 사용하고 리눅스의 경우에는 / 를 사용한다. 
*/

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
  if (!fs.existsSync(destinationDir + "/" + folder.seriseName)) {
    fs.mkdirSync(destinationDir + "/" + folder.seriseName);
  }
});
/* */
fs.readdir(dir, async function (error, fileList) {
  if (error) {
    console.log(error); // 오류 발생 시 에러 출력
  }
  console.log(fileList); // dir 경로에 있는 파일 및 폴더명 출력)
  fileList = fileList.filter((except) => !exceptFileAndFolder.includes(except)); // 정리완료 폴더와 result.log 파일 제외
  for (let i = 0; i < fileList.length; i++) {
    console.log(fileList[i]);
    console.log(fileList.length);
    for (let j = 0; j < setFolder.length; j++) {
      for (let k = 0; k < setFolder[j].additionalName.length; k++) {
        if (fileList[i].startsWith(setFolder[j].additionalName[k])) {
          fs.rename(
            dir + "/" + fileList[i],
            destinationDir + "/" + setFolder[j].seriseName + "/" + fileList[i],
            (err) => {
              if (err) throw err;
              console.log(fileList[i] + " 파일 이동완료");
              fs.appendFileSync(
                log,
                `${fileList[i]} 파일 ${destinationDir}/${setFolder[j].seriseName} 폴더로 이동완료 \n`,
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
});
