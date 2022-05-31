var GameState={
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=1000;

        this.cursors=this.game.input.keyboard.createCursorKeys();

        this.game.world.setBounds(0,0,360,700)

        this.running_speed=180;
        this.jump_speed=550;

    },

    preload: function (){
        this.load.image('ground','assets/ground1.png');
        this.load.image('platform','assets/platform1.png');
        this.load.image('goal','assets/alien1.png');
        this.load.image('arrow','assets/arrow1.png');
        this.load.image('barrel','assets/ball.png');

        this.load.spritesheet('player','assets/player.png',31.6,30,7,1,1);
        this.load.spritesheet('fire','assets/fire.jpg',22,21,5,1,1);

        this.load.text('level','assets/level.json')

        this.load.audio('music','assets/mario.mp3')
    },

    create: function () {
        this.ground =this.game.add.sprite(0,638,'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        // this.platform= this.game.add.sprite(0,300,'platform');
        // this.game.physics.arcade.enable(this.platform);
        // this.platform.body.allowGravity =false;
        // this.platform.body.immovable=true;
        // var platformData=[
        //     {"x":0, "y":430},
        //     {"x":45, "y":560},
        //     {"x":90, "y":290},
        //     {"x":0, "y":140},  
        // ];

        this.levelData=JSON.parse(this.game.cache.getText('level'));


        this.platforms=this.game.add.group();
        this.platforms.enableBody=true;

        this.levelData.platformData.forEach((element)=>{
            this.platforms.create(element.x, element.y, 'platform')
        },this)
        this.platforms.setAll('body.immovable',true);
        this.platforms.setAll('body.allowGravity',false)

        this.fires=this.game.add.group();
        this.fires.enableBody=true;

        var fire;
        this.levelData.fireData.forEach(function(element){
            fire= this.fires.create(element.x,element.y,'fire');
            fire.animations.add('fire',[0,1,2,3,4],10,true);
            fire.play('fire');
        },this)

        this.fires.setAll('body.allowGravity',false)


        this.goal= this.game.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'goal');
        this.goal.scale.setTo(0.04);
        this.game.physics.arcade.enable(this.goal);
        this.goal.body.allowGravity=false;

        this.player = this.game.add.sprite(this.levelData.playerStart.x,this.levelData.playerStart.y,'player',0);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walking',[0,1,2,3,1],6,true);
        // this.player.play('walking');
        this.game.physics.arcade.enable(this.player);
        this.player.customParams={}
        this.player.body.collideWorldBounds=true;
        this.game.camera.follow(this.player);
        
        this.createOnscreenControls();

        this.barrels=this.game.add.group();
        this.barrels.enableBody=true;

        this.createBarrel();
        this.barrelCreator=this.game.time.events.loop(Phaser.Timer.SECOND *this.levelData.barrelTime,this.createBarrel,this)

        this.music=this.game.add.audio('music');
        this.music.play();
        
    },

    update: function () {
        this.game.physics.arcade.collide(this.player,this.ground);
        // this.game.physics.arcade.overlap(this.player,this.platform);
        this.game.physics.arcade.collide(this.player,this.platforms);

        this.game.physics.arcade.collide(this.barrels,this.ground);
        this.game.physics.arcade.collide(this.barrels,this.platforms);

        this.game.physics.arcade.overlap(this.player,this.fires,this.killPlayers);  
        this.game.physics.arcade.overlap(this.player,this.barrels,this.killPlayers);  

        this.game.physics.arcade.overlap(this.player,this.goal,this.win);  


        this.player.body.velocity.x=0;

        if(this.cursors.left.isDown || this.player.customParams.isMovingLeft){
            this.player.body.velocity.x =-this.running_speed;
            this.player.scale.setTo(-1,1);
            this.player.play('walking')
        }
        else if(this.cursors.right.isDown || this.player.customParams.isMovingRight){
            this.player.body.velocity.x =this.running_speed;
            this.player.scale.setTo(1,1);
            this.player.play('walking');
        }
        else{
            this.player.animations.stop();
            this.player.frame=0;
        }

        if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down){
            this.player.body.velocity.y =-this.jump_speed;
            this.player.customParams.mustJump=false;
        }

        this.barrels.forEach(function(element){
            if(element.x<10 && element.y>600){
                element.kill();
            }
        },this)
    },

    createOnscreenControls: function () {
        this.leftArrow =this.add.button(70,535,'arrow');
        this.leftArrow.scale.setTo(-0.2,0.2);

        this.rightArrow =this.add.button(110,535,'arrow');
        this.rightArrow.scale.setTo(0.2);

        this.actionButton =this.add.button(280,570,'arrow');
        this.actionButton.angle =-90;
        this.actionButton.scale.setTo(0.1,0.2);

        this.leftArrow.alpha =0.5;
        this.rightArrow.alpha =0.5;
        this.actionButton.alpha =0.5;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        this.actionButton.events.onInputDown.add(()=>{
            this.player.customParams.mustJump = true;
        },this)
        this.actionButton.events.onInputUp.add(()=>{
            this.player.customParams.mustJump = false;
        },this)

        this.leftArrow.events.onInputDown.add(()=>{
            this.player.customParams.isMovingLeft = true;
        },this)
        this.leftArrow.events.onInputUp.add(()=>{
            this.player.customParams.isMovingLeft = false;
        },this)
        this.leftArrow.events.onInputOver.add(()=>{
            this.player.customParams.isMovingLeft = true;
        },this)
        this.leftArrow.events.onInputOut.add(()=>{
            this.player.customParams.isMovingLeft = false;
        },this)


        this.rightArrow.events.onInputDown.add(()=>{
            this.player.customParams.isMovingRight = true;
        },this)
        this.rightArrow.events.onInputUp.add(()=>{
            this.player.customParams.isMovingRight = false;
        },this)
        this.rightArrow.events.onInputOver.add(()=>{
            this.player.customParams.isMovingRight = true;
        },this)
        this.rightArrow.events.onInputOut.add(()=>{
            this.player.customParams.isMovingRight = false;
        },this)
    },

    killPlayers: function (player,fire) {
        game.state.start("GameState")
    },
    win: function (player,goal) {
        alert("win");
        game.state.start("GameState")
    },

    createBarrel: function () {
        var barrel= this.barrels.getFirstExists(false);

        if(!barrel){
            barrel=this.barrels.create(0,0,'barrel');
            barrel.scale.setTo(0.08);
        }

        barrel.body.collideWorldBounds = true;
        barrel.body.bounce.set(1,0);

        barrel.reset(this.levelData.goal.x,this.levelData.goal.y)
        barrel.body.velocity.x=this.levelData.barrelSpeed;
    }
    

};
// {
//     "x": 60,
//     "y": 408
// },

var game= new Phaser.Game(360,592,Phaser.AUTO);
game.state.add('GameState',GameState);
game.state.start('GameState');