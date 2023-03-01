//File focused on materials

import './style.css'
import * as THREE from 'three'
import { AxesHelper, Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //created just after camera below
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import colosseum from './assets/colosseum.png'
import blue from './assets/blue.jpeg'
import earth from './assets/earth.png'
import pexels from './assets/pexels.jpg'


const loadingManager = new THREE.LoadingManager()


// const texture = new THREE.TextureLoader(loadingManager).load(pexels)
 

//Color is changed differently in debug UI because of the possible interpretations of its value (string), created different object for it to use in Debug UI
const parameters = {color: '#000fff'} 

//Scene
const scene = new THREE.Scene()

//house
const house = new THREE.Group()
scene.add(house)

//objects
const walls = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 7), new THREE.MeshStandardMaterial())
house.add(walls)

const roof = new THREE.Mesh(new THREE.ConeGeometry(6, 3, 4), new THREE.MeshStandardMaterial({color: 'red'}))
roof.position.y = 3.001
roof.rotateY(Math.PI / 4)
house.add(roof)




//Debug UI. Works best with objects, properties are easily accessible
const gui = new dat.GUI 
// position, axis, min, max, step
// gui.add(mesh.position, 'y',  -3, 3, .01)
// alternative way to add some parameters not present in above
// gui
// .add(mesh.position, 'y')
// .min(-3)
// .max(3)
// .step(.01)
// .name("elevation")
// gui
// .add(mesh, 'visible') //automatically puts a checkbox for boolean attribute visible, same for wireframe below
// gui
// .add(material, 'wireframe')
// gui
// .add(material, 'metalness').min(0).max(1).step(.001)
// gui
// .add(material, 'roughness').min(0).max(1).step(.001)
// gui
// .add(material, 'aoMapIntensity').min(0).max(20).step(.001)
// gui
// .add(material, 'displacementScale').min(0).max(3).step(.001)
// gui
// .addColor(parameters, 'color')
// .onChange(() => material.color.set(parameters.color))
// gui
// .add(pointLight, 'intensity')
// .min(0)
// .max(2)
// .step(.1)


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

// Light
const ambientLight = new THREE.AmbientLight('#ffffff', .5)
scene.add(ambientLight)


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true




const clock = new THREE.Clock()

function tick() {
    const elapsedTime = clock.getElapsedTime()
    //Must be called on each render to update controls e.g. damping controls
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

 