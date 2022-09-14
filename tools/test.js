const fs = require("fs");

const dir =
  "G:\\공유 드라이브\\users.parks98.07.NETPLEX\\3.요청 자료\\예능(이시형님)"; // 지정 경로

fs.readdir(dir, async function (error, fileList) {
  if (error) {
    console.log(error); // 오류 발생 시 에러 출력
  }
  console.log(fileList); // dir 경로에 있는 파일 및 폴더명 출력)
});
//   fileList = fileList.filter((except) => !exceptFileAndFolder.includes(except)); // 정리완료 폴더와 result.log 파일 제외
