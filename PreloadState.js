var PreloadState={
    preload: function () {
        
        this.logo=this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
        this.logo.anchor.setTo(0.5);
        this.logo.scale.setTo(0.1)

        this.preloadBar=this.add.sprite(this.game.world.centerX,this.game.world.centerY+128,'preloadBar')
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(0.5)
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('backyard', 'assets/backyard.jpg');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('candy', 'assets/candy.png');
        this.load.image('rotate', 'assets/rotate3.png');
        this.load.image('toy', 'assets/duck1.png');
        this.load.image('arrow', 'assets/arrow1.png');
        this.load.spritesheet('pet', 'assets/man.jpg', 40, 83, 5, 1, 1);
    },
    create: function(){
        this.state.start('HomeState');
    }
};