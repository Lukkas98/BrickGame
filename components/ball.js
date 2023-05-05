export default class Ball{
    constructor(scene){
        this.actualScene = scene;
    }

    preload(){
        this.actualScene.load.image("ball", "images/ball.png");
    }

    create(){

    }


}