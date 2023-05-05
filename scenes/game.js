import ScoreBoard from "../components/Scoreboard.js";
import Ball from "../components/ball.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }
  init() {
    this.scoreBoard = new ScoreBoard(this);
    this.ball = new Ball(this)
  }

  preload() {
    this.load.image("background", "images/background.png");
    this.load.image("gameover", "images/gameover.png");
    this.load.image("platform", "images/platform.png");
    this.load.image("success", "images/congratulations.png");
    this.load.image("blackBrick", "images/brickBlack.png");
    this.load.image("blueBrick", "images/brickBlue.png");
    this.load.image("orangeBrick", "images/brickOrange.png");
    this.load.image("greenBrick", "images/brickGreen.png");
    this.ball.preload();
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(410, 250, "background");
    this.gameoverImage = this.add.image(400, 90, "gameover");
    this.gameoverImage.visible = false;

    this.congratsImage = this.add.image(400, 90, "success");
    this.congratsImage.visible = false;

    this.scoreBoard.create();

    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);

    this.ball = this.physics.add.image(400, 440, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setData("glue", true);

    this.bricks = this.physics.add.staticGroup({
      key: ["blackBrick", "blueBrick", "orangeBrick", "greenBrick"],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
        x: 112,
        y: 100,
      },
    });

    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.brickImpact.bind(this),
      null
    );

    this.physics.add.collider(
      this.ball,
      this.platform,
      this.platformImpact.bind(this), //"bind" remplaza la ultima linea
      null
      //   this
    );
    this.ball.setBounce(1);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  platformImpact(ball, platform) {
    let relativeImpact = ball.x - platform.x;
    if (relativeImpact > 0) {
      //   console.log("derecha!");
      ball.setVelocityX(10 * relativeImpact);
    } else if (relativeImpact < 0) {
      //   console.log("izquierda!");
      ball.setVelocityX(10 * relativeImpact);
    } else {
      //   console.log("centro!!");
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    }
  }

  brickImpact(ball, brick) {
    brick.disableBody(true, true);
    this.scoreBoard.incrementPoints(10);

    if (this.bricks.countActive() === 0) {
      this.endGame(true);
    }
  }

  endGame(completed = false) {
    if(! completed) {
      this.scene.start('gameover');
    } else {
      this.scene.start('congratulations');
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(-500);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(500);
      }
    } else if (this.cursors.up.isDown) {
      if (this.ball.getData("glue")) {
        this.ball.setVelocity(-75, -300);
        this.ball.setData("glue", false);
      }
    } else {
      this.platform.setVelocityX(0);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500) {
      this.bricks.setVisible(false);
      this.gameoverImage.visible = true;
      this.scene.pause();
      this.endGame();
    }
  }
}
