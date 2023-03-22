//File focused on materials

import './style.css'
import * as THREE from 'three'
import { AxesHelper, Camera, TextureLoader } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //created just after camera below
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'
import flag from './assets/kenya.png'
 
//Scene
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1,1,1, 2, 2, 2)
const flagTexture = new TextureLoader().load(flag)

const rawShaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true,
    // wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
        //started with u for uniforms
        uFrequency: {value: new THREE.Vector2(10, 5)},
        uTime: {value: 0},
        uTexture: {value: flagTexture}
    }
})



const material = new THREE.MeshStandardMaterial()

const mesh = new THREE.Mesh(geometry, material)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16), 
    // material,
    rawShaderMaterial
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 10, 10),
    //     side: THREE.DoubleSide,
    rawShaderMaterial
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2 ))
plane.receiveShadow = true

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, .5, 10, 20),
    rawShaderMaterial
)
scene.add(plane)



sphere.position.x = -2
plane.position.set(2, 2, -2)
torus.position.x = 3.5

// plane.rotateX(-2)
plane.scale.set(5, 5)
// plane.position.z = 1


const sphereLight = new THREE.HemisphereLight('red', 'blue', .5)
scene.add(sphereLight)

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

const axesHelper = new AxesHelper(3)
scene.add(axesHelper)

//Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 10
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
renderer.shadowMap.enabled = true


const clock = new THREE.Clock()

//Animation function
function tick() {
    const elapsedTime = clock.getElapsedTime()
    //Must be called on each render to update controls e.g. damping controls
    controls.update()

    rawShaderMaterial.uniforms.uTime.value = elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

 