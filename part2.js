// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     backgroundColor: '#3498db',
//     physics: {
//         default: 'arcade',
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update,
//     }
// }

// var game = new Phaser.Game(config);

// function preload() {
//     this.load.setBaseURL('.');

//     this.load.image('player', 'assets/dude.png');
//     this.load.image('star', 'assets/star.png');

// };
// function create() {
//     this.player = this.physics.add.sprite(100, 100, 'player');

//     this.star = this.physics.add.sprite(300, 300, 'star');
//     this.score = 0;
//     let style = { font: '20px Arial', fill: '#fff' };
//     this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

//     this.arrow = this.input.keyboard.createCursorKeys();
// };
// function update() {
//     if (this.physics.overlap(this.player, this.star)) {
//         // Call the new hit() method
//         //this.hit();
//         this.star.x = Phaser.Math.Between(100, 600);
//         this.star.y = Phaser.Math.Between(100, 300);

//         this.score += 10;

//         this.scoreText.setText('score: ' + this.score);

//         this.tweens.add({
//             targets: this.player, // on the player 
//             duration: 200, // for 200ms 
//             scaleX: 1.2, // that scale vertically by 20% 
//             scaleY: 1.2, // and scale horizontally by 20% 
//             yoyo: true, // at the end, go back to original scale 
//           });
//     }
//     if (this.arrow.right.isDown) {
//         this.player.x += 3;
//     } else if (this.arrow.left.isDown) {
//         this.player.x -= 3;
//     }

//     if (this.arrow.down.isDown) {
//         this.player.y += 3;
//     } else if (this.arrow.up.isDown) {
//         this.player.y -= 3;
//     }

// };
// function hit() {

//     this.star.x = Phaser.Math.Between(100, 600);
//     this.star.y = Phaser.Math.Between(100, 300);

//     this.score += 10;

//     this.scoreText.setText('score: ' + this.score);
// }

class mainScene {
    preload() {
      this.load.image('player', 'assets/player.png');
      this.load.image('coin', 'assets/coin.png');
    }
  
    create() {
      this.player = this.physics.add.sprite(100, 100, 'player');
      this.coin = this.physics.add.sprite(300, 200, 'coin');
  
      this.score = 0;
      let style = { font: '20px Arial', fill: '#fff' };
      this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
  
      this.arrow = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      if (this.physics.overlap(this.player, this.coin)) {
        this.hit();
      }
  
      if (this.arrow.right.isDown) {
        this.player.x += 3;
      } else if (this.arrow.left.isDown) {
        this.player.x -= 3;
      } 
  
      if (this.arrow.down.isDown) {
        this.player.y += 3;
      } else if (this.arrow.up.isDown) {
        this.player.y -= 3;
      } 
    }
    
    hit() {
      this.coin.x = Phaser.Math.Between(100, 600);
      this.coin.y = Phaser.Math.Between(100, 200);
  
      this.score += 10;
      this.scoreText.setText('score: ' + this.score);
  
      this.tweens.add({
        targets: this.player,
        duration: 200,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
      });
    }
  }
  
  new Phaser.Game({
    width: 700,
    height: 300,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
  });