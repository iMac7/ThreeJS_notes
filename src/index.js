import './style.css'
import * as THREE from 'three'
import { AxesHelper, Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //created just after camera below
import gsap from 'gsap'
import * as dat from 'dat.gui'
import colosseum from './assets/colosseum.png'
import blue from './assets/blue.jpeg'


const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log('onstart')
// } 
// loadingManager.onLoad = () => {
//     console.log('onload')
// } 
// loadingManager.onProgress = () => {
//     console.log('onprogress')
// } 
// loadingManager.onError = () => {
//     console.log('onError')
// } 


const texture = new THREE.TextureLoader(loadingManager).load(blue)

//Color is changed differently in debug UI because of the possible interpretations of its value (string), created different object for it to use in Debug UI
const parameters = {color: '#000fff'} 

//Scene
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1,1,1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


//Debug UI. Works best with objects, properties are easily accessible
const gui = new dat.GUI 
// position, axis, min, max, step
// gui.add(mesh.position, 'y',  -3, 3, .01)
// alternative way to add some parameters not present in above
gui
 .add(mesh.position, 'y')
 .min(-3)
 .max(3)
 .step(.01)
 .name("elevation")

gui
.add(mesh, 'visible') //automatically puts a checkbox for boolean attribute visible, same for wireframe below

gui
.add(material, 'wireframe')

gui
.addColor(parameters, 'color')
.onChange(() => material.color.set(parameters.color))



const canvas = document.querySelector(".webgl")


//Scale      //x y z
// mesh.scale.set(1,1,1)

//Rotation
//Mesh rotation is X,Y,Z by default and can sometimes provide unexpected results. The order can be overridden with mesh.rotation.reorder('YXZ') before changing rotation
// mesh.rotation.x = 5



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

const axesHelper = new AxesHelper(3)
scene.add(axesHelper)

//Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, .001, 100)
// camera.position.set(2, 2, 2 )
camera.position.z = 4
camera.lookAt(mesh.position)

scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.y = 1.5
controls.update()


//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) 

// gsap.to(mesh.position, {duration: 1, delay: 1, x: 3})

// renderer.render(scene, camera)



const clock = new THREE.Clock()


function tick() {
    const elapsedTime = clock.getElapsedTime()
    // camera.position.y = Math.cos(elapsedTime)
    // mesh.position.x = elapsedTime
    // camera.lookAt(mesh.position)
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.x * 3
    // camera.lookAt(new THREE.Vector3())
    // console.log(camera.position.x, camera.position.y)

    //Must be called on each render to update controls e.g. damping controls
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

 