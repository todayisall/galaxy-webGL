import { Application } from "./common/Application";
import { BasicWebGLApplication } from "./demo/BasicWebGLApplication";
import "./style.css";

// 获取用于获得webgl上下文对象的HTMLCanvasElement元素
let canvas: HTMLCanvasElement | null = document.querySelector(
  "#webgl"
) as HTMLCanvasElement;

function frameCallback(app: Application): void {
  console.log("frameCallback");
}

function runApplication(): void {
  let app: Application = new BasicWebGLApplication(canvas);
  app.frameCallback = frameCallback;
  app.run();
}

runApplication();
