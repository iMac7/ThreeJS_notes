//File focused on materials

import './style.css'
import * as THREE from 'three'
import { AxesHelper, Camera, MOUSE } from 'three'
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
// const parameters = {color: '#000fff'} 

//Scene
const scene = new THREE.Scene()

// particles
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
// const particlesMaterial = new THREE.PointsMaterial({
//     size: .02,
//     sizeAttenuation: true,
//     color: 'red',
    // The properties below refer to particle visibility through objects and other particles
    // alphaTest: .002,
    // depthTest: false,
    // depthWrite: false
// })
// // points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)




// Galaxy
const parameters = {
    count: 100000,
    size: .02,
    spreadMultiplier: 5,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

let galaxyGeometry = null
let galaxyMaterial = null
let points = null

function generateGalaxy() {

if(points) {
    // deletes from the scene
    galaxyGeometry.dispose()
    galaxyMaterial.dispose()
    scene.remove(points)
}

galaxyGeometry = new THREE.BufferGeometry()

const positions = new Float32Array(parameters.count * 3)
// RGB
const colors = new Float32Array(parameters.color * 3)
const insideColor = new THREE.Color(parameters.insideColor)
const outsideColor = new THREE.Color(parameters.outsideColor)

for (let i = 0; i < parameters.count; i++) {
    let i3 = i * 3
    // to update x, y and z
    positions[i3 + 0] = (Math.random() - .5) * parameters.spreadMultiplier
    positions[i3 + 1] = (Math.random() - .5) * parameters.spreadMultiplier
    positions[i3 + 2] = (Math.random() - .5) * parameters.spreadMultiplier

    // cloned to avoid unexpected results overwriting the insidecolor above
    const mixedColor = insideColor.clone()
    // lerp = 'mixing ratio'
    mixedColor.lerp(outsideColor, 1)
    //update R G B
    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
    
}

galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

galaxyMaterial = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    // blending: THREE.AdditiveBlending,
    // vertexColors: true,
    color: parameters.insideColor
    
})

points = new THREE.Points(galaxyGeometry, galaxyMaterial)
scene.add(points)

}

generateGalaxy()



// DEBUG UI
const gui = new dat.GUI 
gui.add(parameters, 'count').min(100).max(100000).step(1000).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(.001).max(.1).step(.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'spreadMultiplier').min(1).max(100).step(1).onFinishChange(generateGalaxy)



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

 