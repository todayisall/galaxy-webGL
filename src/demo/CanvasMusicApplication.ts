export class CanvasMusicApplication {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private timer: number = 0;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = canvas.clientWidth;
    this.canvas.height = canvas.clientHeight;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.init();
  }
  // 初始化, 创建音频上下文
  private init(): void {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = "/assets/music/1.mp3";

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    this.addButtons(audio,analyser);
  }
  private addButtons(audio: HTMLAudioElement,analyser: AnalyserNode): void {
    // 增加暂停和播放按钮
    const playButton = document.createElement("button");
    // button 增加class
    playButton.classList.add("play");
    playButton.innerText = "暂停";
    playButton.onclick = () => {
      if (audio.paused) {
        audio.play();
        this.draw(analyser);
        playButton.innerText = "暂停";
      } else {
        audio.pause();
        if (this.timer) {
          cancelAnimationFrame(this.timer);
        }
        playButton.innerText = "播放";
      }
    };
    document.body.appendChild(playButton);
    // 自动播放
    audio.play();
    this.draw(analyser);
  }
  private draw(analyser: AnalyserNode): void {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
    const barWidth = (WIDTH / bufferLength);
    let barHeight;
    let x = 0;
    const context = this.context;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      const heightRate = barHeight / 256;
      //   颜色从红到蓝的过滤
      const r = heightRate * 255;
      const g = (4.0 * heightRate * (1.0 - heightRate)) * 255;
      const b = (1.0 - heightRate) * 255;
      context.fillStyle = `rgb(${r},${g},${b})`;
      const realHeight = barHeight / 255 * HEIGHT * 0.6;
      const y = HEIGHT - realHeight;
      context.fillRect(x, y, barWidth, realHeight);
      x += barWidth + 2;
    }
    this.timer = requestAnimationFrame(this.draw.bind(this, analyser));
  }
  //   销毁application
  public destroy(): void {
    cancelAnimationFrame(this.timer);
  }
}
