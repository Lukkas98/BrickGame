export default class ScoreBoard {
    constructor(scene){
        this.actualScene = scene;
        this.score = 0;
    }

    create(){
        this.scoreText = this.actualScene.add.text(16, 16, "PUNTOS: 0",{
            fontSize: "20px",
            fill: "#fff",
            fontFamily: "verdana, arial, sans-serif"
        });
    }

    incrementPoints(points){
        this.score += points ;
        this.scoreText.setText("PUNTOS: " + this.score);
    }
}