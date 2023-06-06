import { Scene3D } from '@enable3d/phaser-extension'
import {createInteractiveButton, createTitleText} from '../ui'

export default class MainScene extends Scene3D {
  videoCutscene : Phaser.GameObjects.Video
  rocketSelector : Phaser.GameObjects.Sprite
  part = 0

  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    this.accessThirdDimension()

    this.input.setDefaultCursor('url(assets/cursors/cursor.png), pointer');

    const centerX = this.scale.width * 0.5
    const centerY = this.scale.height * 0.5
    
    this.videoCutscene = this.add.video(centerX, centerY, 'space2');
    this.videoCutscene.setOrigin(0.5, 0.5);
    this.videoCutscene.setScale(1.3, 1.5)


    const videoTitle = this.add.video(centerX, centerY, 'space');
    videoTitle.setOrigin(0.5, 0.5);
    videoTitle.play(true, 0, 7.8);
    videoTitle.setScale(1.3, 1.5)
    
    const title = createTitleText(this, centerX, centerY - 100, 'Nebula Stryke', 72, '#f1a304');

    
    const playNowButton = createInteractiveButton(
        this,
        centerX,
        title.y + title.height + 20,
        'Play now!',
        { fontSize: '42px', padding: { x: 8, y: 8 }, color: '#fff' },
        '#f1a304',
        '#c19304',
        () => {
        videoTitle.stop()
        videoTitle.destroy()
        this.videoCutscene.play()
        
        this.tweens.add({
            targets: [title, playNowButton],
            alpha: 0,
            duration: 900,
            ease: "Sine.easeInOut",
        });            
        // Handle button click
        }
    );
    this.rocketSelector = this.add.sprite(centerX, centerY, 'rocket')

  }

  create() {
    // creates a nice scene
    this.third.warpSpeed()

    // adds a box
    this.third.add.box({ x: 1, y: 2 })

    // adds a box with physics
    this.third.physics.add.box({ x: -1, y: 2 })

    // throws some random object on the scene
    this.third.haveSomeFun()
  }

  update() {
      if (this.videoCutscene.isPlaying()) {
            if (this.videoCutscene.getCurrentTime() > 5 && this.part === 0) {
                this.videoCutscene.stop()
                this.tweens.add({
                    targets: [this.rocketSelector],
                    alpha: 1,
                    duration: 900,
                    ease: "Sine.easeInOut",
                });      
                this.part = 1
            }
      }
  }
}
