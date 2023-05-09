import * as Three from 'three'

export enum MaterialType {
    MESH_PHONE_MATERIAL = 'MESH_PHONE_MATERIAL',
    MESH_STANDARD_MATERIAL = 'MESH_STANDARD_MATERIAL'
}

const createScene: (type?: keyof typeof MaterialType) => Three.Scene = (type = MaterialType.MESH_PHONE_MATERIAL) => {

    const scene = new Three.Scene()

    const planeSize = 40

    let planeMat: Three.Material
    let cubeMat: Three.Material
    let sphereMat: Three.Material

    switch (type) {
        case MaterialType.MESH_STANDARD_MATERIAL:
            planeMat = new Three.MeshStandardMaterial({
                color: '#eee',
                side: Three.DoubleSide
            })
            cubeMat = new Three.MeshStandardMaterial({ color: '#8AC' })
            sphereMat = new Three.MeshStandardMaterial({ color: '#CA8' })
            break
        default:
            planeMat = new Three.MeshPhongMaterial({
                color: '#eee',
                side: Three.DoubleSide
            })
            cubeMat = new Three.MeshPhongMaterial({ color: '#8AC' })
            sphereMat = new Three.MeshPhongMaterial({ color: '#8AC' })
    }

    const planeGeo = new Three.PlaneBufferGeometry(planeSize, planeSize)
    const mesh = new Three.Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * -0.5
    scene.add(mesh)

    const cubeGeo = new Three.BoxBufferGeometry(4, 4, 4)
    const cubeMesh = new Three.Mesh(cubeGeo, cubeMat)
    cubeMesh.position.set(5, 2.5, 0)
    scene.add(cubeMesh)

    const sphereGeo = new Three.SphereBufferGeometry(3, 32, 16)
    const sphereMesh = new Three.Mesh(sphereGeo, sphereMat)
    sphereMesh.position.set(-4, 5, 0)
    scene.add(sphereMesh)

    return scene
}

export default createScene