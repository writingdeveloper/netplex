const glob = require("glob");
const fs = require("fs");

const rootFolder = "/mnt/c/Users/super/Documents/GitHub/netplex/dir"; // 최상위 경로
// const trashFolder = "/mnt/c/Users/super/Documents/GitHub/netplex/trash"; // 휴지통 경로
const destinationFolder =
  "/mnt/c/Users/super/Documents/GitHub/netplex/destination"; // 이동할 경로

const setSeries = [
  {
    seriseName: "1박 2일 시즌4",
    additionalName: ["1박 2일", "1박2일", "1박-2일"],
  },
  {
    seriseName: "걸어서 세계속으로",
    additionalName: ["걸어서 세계속으로"],
  },
  {
    seriseName: "골 때리는 그녀들",
    additionalName: ["골 때리는 그녀들"],
  },
  {
    seriseName: "구해줘! 홈즈",
    additionalName: ["구해줘! 홈즈"],
  },
  {
    seriseName: "나 혼자 산다",
    additionalName: ["나 혼자 산다"],
  },
  {
    seriseName: "나는 자연인이다",
    additionalName: ["나는 자연인이다"],
  },
  {
    seriseName: "놀라운 토요일",
    additionalName: ["놀라운 토요일"],
  },
  {
    seriseName: "놀면 뭐하니?",
    additionalName: ["놀면 뭐하니"],
  },
  {
    seriseName: "라디오스타",
    additionalName: ["라디오스타"],
  },
  {
    seriseName: "런닝맨",
    additionalName: ["런닝맨"],
  },
  {
    seriseName: "무엇이든 물어보살",
    additionalName: ["무엇이든 물어보살"],
  },
  {
    seriseName: "미운 우리 새끼",
    additionalName: ["미운 우리 새끼"],
  },
  {
    seriseName: "불후의 명곡",
    additionalName: ["불후의 명곡"],
  },
  {
    seriseName: "세계테마기행",
    additionalName: ["세계테마기행"],
  },
  {
    seriseName: "속풀이쇼 동치미",
    additionalName: ["속풀이쇼 동치미"],
  },
  {
    seriseName: "순간포착 세상에 이런일이",
    additionalName: ["순간포착 세상에 이런일이"],
  },
  {
    seriseName: "슈퍼맨이 돌아왔다",
    additionalName: ["슈퍼맨이 돌아왔다"],
  },
  {
    seriseName: "안싸우면 다행이야",
    additionalName: ["안싸우면 다행이야"],
  },
  {
    seriseName: "어서와 한국은 처음이지?",
    additionalName: ["어서와 한국은 처음이지?"],
  },
  {
    seriseName: "영화가 좋다",
    additionalName: ["영화가 좋다"],
  },
  {
    seriseName: "유 퀴즈 온 더 블럭",
    additionalName: ["유 퀴즈 온 더 블럭"],
  },
  {
    seriseName: "이웃집 찰스",
    additionalName: ["이웃집 찰스"],
  },
  {
    seriseName: "이제 만나러 갑니다",
    additionalName: ["이제 만나러 갑니다"],
  },
  {
    seriseName: "인간극장",
    additionalName: ["인간극장"],
  },
  {
    seriseName: "전지적 참견 시점",
    additionalName: ["전지적 참견 시점"],
  },
  {
    seriseName: "접속! 무비월드",
    additionalName: ["접속! 무비월드"],
  },
  {
    seriseName: "코미디빅리그",
    additionalName: ["코미디빅리그"],
  },
  {
    seriseName: "텐트 밖은 유럽",
    additionalName: ["텐트 밖은 유럽"],
  },
  {
    seriseName: "골 때리는 그녀들",
    additionalName: ["골 때리는 그녀들"],
  },
  {
    seriseName: "놀라운 토요일",
    additionalName: ["놀라운 토요일"],
  },
  {
    seriseName: "동상이몽 2 - 너는 내 운명",
    additionalName: ["동상이몽 2 - 너는 내 운명"],
  },
  {
    seriseName: "신비한 TV 서프라이즈",
    additionalName: ["신비한 TV 서프라이즈"],
  },
  {
    seriseName: "아는 형님",
    additionalName: ["아는 형님"],
  },
  {
    seriseName: "옥탑방의 문제아들",
    additionalName: ["옥탑방의 문제아들"],
  },
  {
    seriseName: "일밤- 미스터리 음악쇼 복면가왕",
    additionalName: ["일밤- 미스터리 음악쇼 복면가왕"],
  },
  {
    seriseName: "집사부일체",
    additionalName: ["집사부일체"],
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
