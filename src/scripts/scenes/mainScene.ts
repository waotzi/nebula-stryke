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
    this.input.setDefaultCursor('url(assets/cursors/cursor.png), pointer');

    const centerX = this.scale.width * 0.5
    const centerY = this.scale.height * 0.5
    

    const videoTitle = this.add.video(centerX, centerY, 'title_loop');
    videoTitle.setOrigin(0.5, 0.5);
    videoTitle.play(true, 0, 7.8);
    videoTitle.setScale(1.3, 1.5)
    
    const videoCutscene = this.add.video(centerX, centerY, 'intro');
    videoCutscene.setOrigin(0.5, 0.5);
    videoCutscene.setScale(1.3, 1.5)
    videoCutscene.visible = false

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
          this.input.setDefaultCursor('url(assets/cursors/cursor.png), default');

          videoTitle.stop()
          videoTitle.visible = false
          videoCutscene.visible = true
          videoCutscene.play(false)
          videoCutscene.on('complete', () => {
            this.part = 1
            title.destroy()
            videoTitle.destroy()
            playNowButton.destroy()
            this.tweens.add({
              targets: [videoCutscene],
              alpha: 0,
              duration: 900,
              ease: "Sine.easeInOut",
            }).on('complete', () => {
              videoCutscene.destroy()
              this.scene.start('CharacterScene')

            })   
          })
          
          this.tweens.add({
              targets: [title, playNowButton],
              alpha: 0,
              duration: 900,
              ease: "Sine.easeInOut",              
          });            
        }
    );
  }

  create() {}

  update() {}
}
