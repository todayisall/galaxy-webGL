import { Application } from "./common/Application";
import { BasicWebGLApplication } from "./demo/BasicWebGLApplication";
import { CanvasMusicApplication } from "./demo/CanvasMusicApplication";
import "./style.css";

// 定义应用的类型， 用于切换不同的应用
const appType = [
  {
    name: "webgl 基础demo",
    value: "BasicWebGLApplication",
  },
  {
    name: "canvas 音乐可视化",
    value: "CanvasMusicApplication",
  },
  // {
  //     name: "webgl 音乐可视化",
  //     app: MusicWebGLApplication
  // }
];

// 获取用于获得webgl上下文对象的HTMLCanvasElement元素
const canvas: HTMLCanvasElement | null = document.querySelector(
  "#webgl"
) as HTMLCanvasElement;
const appSelect: HTMLSelectElement | null = document.querySelector(
  "#appType"
) as HTMLSelectElement;
appSelect.onchange = function (e) {
  switch (appSelect.value) {
    case "BasicWebGLApplication":
      const app: Application = new BasicWebGLApplication(canvas);
      app.run();
      break;
    case "CanvasMusicApplication":
      new CanvasMusicApplication(canvas);
      break;
    default:
      break;
  }
};

// 初始化应用选择下拉框
function initAppSelect(): void {
  if (appSelect) {
    appType.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.text = item.name;
      appSelect.appendChild(option);
    });
  }
}

function frameCallback(app: Application): void {
  console.log("frameCallback");
}

// 程序入口
initAppSelect();
