import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension'
import { OrthographicCamera, PerspectiveCamera } from 'three'

export default class CharacterScene extends Scene3D {
  drone: ExtendedObject3D
  camera: PerspectiveCamera | OrthographicCamera
  created: boolean
  droneVelocityX: number = 0
  groundH: number = 5000
  constructor() {
    super({ key: 'CharacterScene' })
  }

  init() {
    this.accessThirdDimension({ antialias: true })
    this.input.setDefaultCursor('url(assets/cursors/cursor.png), pointer');    
    this.third.load.preload('ground', '/assets/textures/ground001.jpg')
  }
  
  async create() {
    const { camera, lights } = await this.third.warpSpeed('camera', 'light')
    if (lights) {
        lights.hemisphereLight.color.r = 3
        lights.hemisphereLight.color.b = 3
        lights.hemisphereLight.color.g = 3
    }
    if (camera) {
        camera.position.set(0, 50, 50)
        camera.lookAt(0, 10, 0)
        this.camera = camera
    }
    this.third.load.texture('ground').then(ground => {
        const groundW = 200
        ground.wrapS = ground.wrapT = 1 // RepeatWrapping
        ground.repeat.set(1, this.groundH / groundW)

        // BUG: To add shadows to your ground, set transparent = true
        this.third.physics.add.ground({ width: groundW, height: this.groundH, y: -1, z: 0 }, { phong: { map: ground, transparent: true } })
        this.third.physics.add.ground({ width: 1000, height: this.groundH, y: -10, z: 0 }, { lambert: { color: 0x000000 } })
    })

    
    this.drone = new ExtendedObject3D()
    const pos = { x: 0, y: 0, z: 0 }

    this.third.load.gltf('/assets/models/ship001.glb').then(object => {
        this.drone.add(object.scene)
        this.drone.position.set(pos.x, pos.y, pos.z)
        this.drone.rotateY(-Math.PI / 2)
        this.drone.scale.set(0.5, 0.5, 0.5)

        this.third.add.existing(this.drone)
    })

    
    this.created = true
  }

  update(time, delta) {
    const pointer = this.input.activePointer;
    const pointerX = pointer.position.x;
    
    if (this.created) {
        if (pointerX > 0 && pointerX < this.scale.width) {
            const targetX = (pointerX - this.scale.width * 0.5) * 0.05;
      
            // Calculate the distance remaining to the target position
            const moveDistanceX = (targetX - this.drone.position.x) * delta / 200;
            
            
            this.drone.position.x += moveDistanceX;

        }  else {
            // Stop the drone's movement if the pointer is outside the valid range
            this.droneVelocityX = 0;
        }
        
      if (this.drone.position.z > -this.groundH / 2 ) {
        const velocityZ = 1; // Adjust the velocity as needed
        this.drone.position.z -= velocityZ * delta / 60;

        this.camera.position.z = this.drone.position.z + 40
      }
    }
  }
}
