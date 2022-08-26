const fs = require("fs"); // Node.js file system module
const dir =
  "G:\\공유 드라이브\\users.parks98.2.NETPLEX\\3.요청 자료\\예능(이시형님)"; // 지정 경로
let setFolder = [
  "1박 2일",
  "여름특집 놀면 뭐하니",
  "나 혼자 산다",
  "런닝맨",
  "아는 형님",
  "전지적 참견 시점",
]; // 해당 이름으로 폴더를 생성후, 파일명이 해당 이름으로 시작할 경우 각자의 폴더로 저장

/* setFolder 에 설정된 폴더 생성*/
setFolder.forEach((folder) => {
  if (!fs.existsSync(dir + "\\정리완료\\" + folder)) {
    fs.mkdirSync(dir + "\\정리완료\\" + folder);
  }
});
/* */
fs.readdir(dir, async function (error, fileList) {
  if (error) {
    console.log(error); // 오류 발생 시 에러 출력
  }
  console.log(fileList); // dir 경로에 있는 파일 및 폴더명 출력
  fileList.forEach((file) => {
    setFolder.forEach((folderName) => {
      if (file.startsWith(folderName)) {
        fs.rename(
          dir + "\\" + file,
          dir + "\\정리완료\\" + folderName + "\\" + file,
          function (err) {
            if (err) throw err;
            console.log(`${file} 파일을 ${folderName} 폴더로 이동했습니다.`);
          }
        );
      }
    });
  });
});
