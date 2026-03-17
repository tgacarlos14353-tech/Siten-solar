const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
5000
)

camera.position.set(0,80,180)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("space").appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera,renderer.domElement)
controls.enableDamping = true

const loader = new THREE.TextureLoader()


// SOL
const sun = new THREE.Mesh(
new THREE.SphereGeometry(25,64,64),
new THREE.MeshBasicMaterial({
map: loader.load("https://threejsfundamentals.org/threejs/resources/images/sun.jpg")
})
)

scene.add(sun)


// LUZ FORTE DO SOL
const sunlight = new THREE.PointLight(0xffffff,6,5000)
sunlight.position.set(0,0,0)
scene.add(sunlight)

const ambient = new THREE.AmbientLight(0xffffff,0.3)
scene.add(ambient)


// ESTRELAS
const starGeo = new THREE.BufferGeometry()
const starVertices=[]

for(let i=0;i<15000;i++){

starVertices.push(
(Math.random()-0.5)*6000,
(Math.random()-0.5)*6000,
(Math.random()-0.5)*6000
)

}

starGeo.setAttribute(
"position",
new THREE.Float32BufferAttribute(starVertices,3)
)

const starMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:1.5
})

const stars = new THREE.Points(starGeo,starMaterial)

scene.add(stars)


// FUNÇÃO PLANETA
function planet(size,texture,distance){

const mesh = new THREE.Mesh(

new THREE.SphereGeometry(size,64,64),

new THREE.MeshStandardMaterial({
map: loader.load(texture)
})

)

mesh.position.x = distance

scene.add(mesh)

return mesh

}


// PLANETAS
const mercury = planet(2,"https://threejsfundamentals.org/threejs/resources/images/mercury.jpg",40)
const venus = planet(3,"https://threejsfundamentals.org/threejs/resources/images/venus.jpg",60)
const earth = planet(3.5,"https://threejsfundamentals.org/threejs/resources/images/earth.jpg",85)
const mars = planet(3,"https://threejsfundamentals.org/threejs/resources/images/mars.jpg",110)
const jupiter = planet(8,"https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",160)
const saturn = planet(7,"https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",210)


// ANEL SATURNO
const ringGeo = new THREE.RingGeometry(9,15,64)

const ringMat = new THREE.MeshBasicMaterial({
map: loader.load("https://threejsfundamentals.org/threejs/resources/images/saturnringcolor.jpg"),
side: THREE.DoubleSide
})

const ring = new THREE.Mesh(ringGeo,ringMat)

ring.rotation.x = Math.PI/2

saturn.add(ring)


// LUA
const moon = new THREE.Mesh(
new THREE.SphereGeometry(1,32,32),
new THREE.MeshStandardMaterial({
map: loader.load("https://threejsfundamentals.org/threejs/resources/images/moon.jpg")
})
)

moon.position.x = 8

earth.add(moon)


// ORBITAS
let mercuryOrbit=0
let venusOrbit=0
let earthOrbit=0
let marsOrbit=0
let jupiterOrbit=0
let saturnOrbit=0


function animate(){

requestAnimationFrame(animate)

mercuryOrbit+=0.04
venusOrbit+=0.02
earthOrbit+=0.01
marsOrbit+=0.008
jupiterOrbit+=0.003
saturnOrbit+=0.002


mercury.position.x=Math.cos(mercuryOrbit)*40
mercury.position.z=Math.sin(mercuryOrbit)*40

venus.position.x=Math.cos(venusOrbit)*60
venus.position.z=Math.sin(venusOrbit)*60

earth.position.x=Math.cos(earthOrbit)*85
earth.position.z=Math.sin(earthOrbit)*85

mars.position.x=Math.cos(marsOrbit)*110
mars.position.z=Math.sin(marsOrbit)*110

jupiter.position.x=Math.cos(jupiterOrbit)*160
jupiter.position.z=Math.sin(jupiterOrbit)*160

saturn.position.x=Math.cos(saturnOrbit)*210
saturn.position.z=Math.sin(saturnOrbit)*210


earth.rotation.y+=0.02
moon.rotation.y+=0.04

controls.update()

renderer.render(scene,camera)

}

animate()


window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})
