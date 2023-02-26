//File focused on materials

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

// const material = new THREE.MeshBasicMaterial({map: texture})

// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = texture //transparent texture

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = texture

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()

const material = new THREE.MeshStandardMaterial({map: texture})
// material.metalness = .5
material.aoMap = texture
material.aoMapIntensity = 10
material.displacementMap = texture
material.displacementScale = .05
material.metalnessMap = texture
material.normalMap = texture
material.normalScale.set(.5, .5)


const mesh = new THREE.Mesh(geometry, material)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16), 
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2 ))
console.log(plane.geometry)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, .5, 10, 20),
    material
)
scene.add(sphere, plane, torus)

sphere.position.x = -2
plane.position.x = .5
torus.position.x = 3.5

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
.add(material, 'metalness').min(0).max(1).step(.001)
gui
.add(material, 'roughness').min(0).max(1).step(.001)
gui
.add(material, 'aoMapIntensity').min(0).max(20).step(.001)
gui
.add(material, 'displacementScale').min(0).max(3).step(.001)
gui
.addColor(parameters, 'color')
.onChange(() => material.color.set(parameters.color))



const canvas = document.querySelector(".webgl")

const ambientLight = new THREE.AmbientLight('#fff', .7)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight('#fff', 0.9)
pointLight.position.set(2,3,4)
scene.add(pointLight)

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
    //Must be called on each render to update controls e.g. damping controls
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

 