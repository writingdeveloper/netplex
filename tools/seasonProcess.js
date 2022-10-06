const glob = require("glob");
const fs = require("fs");

/* 설정 경로 */
const seasonFolder = [
  "/mnt/c/Users/super/Documents/GitHub/netplex/dir1",
  "/mnt/c/Users/super/Documents/GitHub/netplex/dir2",
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* 좌측 Key 값 -> 우측 Value 값으로 변경 Rule */
/* .E => S01E 은 checkERule() 함수 활성화, 비활성화로 실행 유무 설정 가능 */
const rule = [
  {
    "시즌4.E": "시즌4.S04E",
  },
  {
    "2 너는 내 운명.E": "2 너는 내 운명.S02E",
  },
];

/* 메인 함수 */
function main() {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < seasonFolder.length; i++) {
      let searchDir = `${seasonFolder[i]}/**/*`; // 폴더 내 모든 파일 검색
      await glob(searchDir, async (err, files) => {
        if (err) {
          console.log(err);
        }
        for (let j = 0; j < files.length; j++) {
          for (let k = 0; k < rule.length; k++) {
            let key = Object.keys(rule[k])[0];
            let value = rule[k][key];
            if (files[j].includes(key)) {
              let newFileName = files[j].replace(key, value);
              console.log(`${files[j]} -> ${newFileName}`);

              fs.renameSync(files[j], newFileName);
              files.filter((file) => file === files[j]);
            }
            if (j === files.length - 1) {
              await delay(1000);
              resolve();
            }
          }
        }
      });
    }
  });
}

async function checkERule() {
  for (let i = 0; i < seasonFolder.length; i++) {
    let searchDir = `${seasonFolder[i]}/**/*`;
    await glob(searchDir, async (err, files) => {
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].includes(".E")) {
          console.log(`${files[i]} -> ${files[i].replace(".E", ".S01E")}`);
          fs.renameSync(files[i], files[i].replace(".E", ".S01E"));
        }
      }
    });
  }
}

// Main 함수 작동 확인이 확실히 종료후 checkERule 함수 작동
main().then(function () {
  checkERule(); // 불필요시 주석 처리
});
