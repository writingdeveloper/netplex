const glob = require("glob");
const fs = require("fs");

/* 설정 경로 */
const seasonFolder = [
  "/mnt/c/Users/super/Documents/GitHub/netplex/dir1",
  "/mnt/c/Users/super/Documents/GitHub/netplex/dir2",
];

/* 좌측 Key 값 -> 우측 Value 값으로 변경 Rule */
const rule = [
  {
    "1박 2일 시즌4.E": "1박 2일 S04.E",
  },
  {
    "2 - 너는 내 운명.E": "2. 너는 내운명.S02.E",
  },
  {
    "나 혼자 산다.E": "나 혼자 산다.S01.E",
  },
];

/* 메인 함수 */
async function main() {
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
          }
        }
      }
    });
  }
}
main();
