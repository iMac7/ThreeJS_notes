// import * as THREE from 'three'
// import { AxesHelper } from 'three'
// // import './style.css'

// const canvas = document.querySelector(".webgl")

// //Scene
// const scene = new THREE.Scene()
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({ color: "red" })
// const mesh = new THREE.Mesh(geometry, material)

// //Scale      //x y z
// mesh.scale.set(2,1,1)

// //Rotation
// //Mesh rotation is X,Y,Z by default and can sometimes provide unexpected results. The order can be overridden with mesh.rotation.reorder('YXZ') before changing rotation
// mesh.rotation.x = 5


// scene.add(mesh)

// const sizes = {
//     width: 800,
//     height: 600
// }

// const axesHelper = new AxesHelper(3)
// scene.add(axesHelper)

// //Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.set(2, 0.5, 5)

// scene.add(camera)


// //Renderer
// const renderer = new THREE.WebGLRenderer({ canvas: canvas })
// renderer.setSize(sizes.width, sizes.height)

// renderer.render(scene, camera)

