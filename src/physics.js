//File focused on materials

import './style.css'
import * as THREE from 'three'
import { AxesHelper } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //created just after camera below
import cannon from 'cannon'
import * as dat from 'dat.gui'

const loadingManager = new THREE.LoadingManager()

const scene = new THREE.Scene()


// Create physics world with cannon, add objects
const world = new cannon.World()
world.gravity.set(0, -9.82, 0)

//set materials that will collide
const defaultMaterial = new cannon.Material('default')
const defaultContactMaterial = new cannon.ContactMaterial(defaultMaterial, defaultMaterial, {
    restitution: .5
})
world.addContactMaterial(defaultContactMaterial)

const sphereShape = new cannon.Sphere(1)
const sphereBody = new cannon.Body({
    mass: 1,
    position: new cannon.Vec3(0, 5, 0),
    shape: sphereShape,
    material: defaultMaterial
})
sphereBody.applyLocalForce(new cannon.Vec3(150, 0, 0), new cannon.Vec3(0,0,0))
world.addBody(sphereBody)

const floorShape = new cannon.Plane()
const floorBody = new cannon.Body({ mass: 0, material: defaultMaterial })
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new cannon.Vec3(-1, 0, 0), Math.PI / 2)
world.addBody(floorBody)



const floor = new THREE.Mesh(new THREE.BoxGeometry(10,.1,10), new THREE.MeshStandardMaterial({color: 'white'}))
floor.position.y = -1.1
floor.receiveShadow = true

const ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshStandardMaterial({color: 'red'}))
ball.castShadow = true

const ambientLight = new THREE.AmbientLight('#fff000', 0.5)

const pointLight = new THREE.PointLight('#ffffff', 1, 30)
pointLight.position.set(3,3,5)
const pointLightHelper = new THREE.PointLightHelper(pointLight, .3, '#00ff00')

scene.add(floor, ball, ambientLight, pointLight )

// DEBUG UI
const gui = new dat.GUI 


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector(".webgl")

//Consistent width and height on resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    //the code below is also where the renderer is instantiated
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) 

})

const aspectRatio = sizes.width / sizes.height

const axesHelper = new AxesHelper(10)
scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, .001, 100)
// camera.position.set(2, 2, 2 )
camera.position.z = 10
// camera.lookAt(mesh.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.y = 1.5
controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true




const clock = new THREE.Clock()
let oldElapsedTime = 0

function tick() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    //Must be called on each render to update controls e.g. damping controls
    controls.update()

    // Update cannon physics world
    world.step(1/60, deltaTime, 3)
    ball.position.copy(sphereBody.position)
    floor.position.copy(floorBody.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

 