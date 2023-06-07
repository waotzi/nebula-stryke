import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension'

export default class CharacterScene extends Scene3D {
  videoCutscene : Phaser.GameObjects.Video
  rocketSelector : Phaser.GameObjects.Sprite
  part = 0
  drone: ExtendedObject3D
  
  constructor() {
    super({ key: 'CharacterScene' })
  }

  init() {
    this.accessThirdDimension({ antialias: true })
    this.input.setDefaultCursor('url(assets/cursors/cursor2.png), pointer');    
    this.third.load.preload('metal', '/assets/textures/metal001.jpg')

  }
  
  async create() {
    const { camera, lights } = await this.third.warpSpeed('-ground', '-sky', '-orbitControls')
    if (lights) {
        lights.hemisphereLight.color.r = 8
        lights.hemisphereLight.color.b = 8
        lights.hemisphereLight.color.g = 8
    }
    if (camera) {
        camera.position.set(0, 20, 50)
        camera.lookAt(0, 10, 0)
    }
    this.drone = new ExtendedObject3D()
    const pos = { x: 0, y: 0, z: 0 }

    this.third.load.gltf('/assets/models/ship001.glb').then(object => {
        this.drone.add(object.scene)
        this.drone.position.set(pos.x, pos.y, pos.z)
        this.drone.rotateY(-Math.PI / 2)
        this.drone.scale.set(0.5, 0.5, 0.5)
        this.third.load.texture('metal').then(metal => {
            metal.wrapS = metal.wrapT = 1000 // RepeatWrapping
            metal.offset.set(0, 0)
            metal.repeat.set(2, 2)    
     
           this.third.add.existing(this.drone)
        })
    })

    /*this.third.load.texture('metal').then(grass => {
        grass.wrapS = grass.wrapT = 1000 // RepeatWrapping
        grass.offset.set(0, 0)
        grass.repeat.set(2, 2)

        // BUG: To add shadows to your ground, set transparent = true
        this.third.physics.add.ground({ width: 20, height: 20, y: 0 }, { phong: { map: grass, transparent: true } })
      })*/


  }

  update() {
    const pointer = this.input.activePointer;
    const pointerX = pointer.position.x
    console.log(pointer.position.x)
    if (this.drone) {
        if (pointerX > 0 && pointerX < this.scale.width)
            this.drone.position.x = (pointer.position.x - this.scale.width * 0.5) * 0.08
    }
  }
}
