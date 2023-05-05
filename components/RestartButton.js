export class RestartButton {
  constructor(scene) {
    this.actualScene = scene;
  }

  preload() {
    this.actualScene.load.spritesheet("button", "images/restart.png", {
      frameWidth: 190,
      frameHeight: 49,
    });
  }

  create() {
    this.startButton = this.actualScene.add
      .sprite(400, 230, "button")
      .setInteractive();

    this.startButton.on("pointerover", () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on("pointerdown", () => {
      this.actualScene.scene.start("game");
    });
  }
}
