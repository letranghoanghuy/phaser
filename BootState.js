var BootState={
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

    },
    preload: function (){
        this.load.image('preloadBar','assets/bar.jpg');
        this.load.image('logo','assets/duck.jpg');
    },
    create: function () {
        this.game.stage.backgroundColor ='white';
        this.state.start('PreloadState');
    },

};