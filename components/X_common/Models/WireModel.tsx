import {FC, useEffect, useRef} from "react";
import {Trail, useAnimations, useGLTF} from "@react-three/drei";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

type GLTFResultType = GLTF & {
    nodes: {
        Cylinder003: THREE.Mesh
        Cylinder008: THREE.Mesh
        Cylinder004: THREE.Mesh
        Cylinder009: THREE.Mesh
        Cylinder010: THREE.Mesh
        Cylinder011: THREE.Mesh
        Cylinder012: THREE.Mesh
        Cylinder013: THREE.Mesh
        Cylinder026: THREE.Mesh
        Cylinder027: THREE.Mesh
        Cylinder028: THREE.Mesh
        Catenary029_Catenary005_1: THREE.Mesh
        Catenary029_Catenary005_2: THREE.Mesh
        Sphere: THREE.Mesh
        Sphere001: THREE.Mesh
        Sphere002: THREE.Mesh
        Sphere003: THREE.Mesh
        Sphere004: THREE.Mesh
        Sphere005: THREE.Mesh
    }
    materials: {
        "Material.003": THREE.Material
        "Material.001": THREE.Material
        Material: THREE.Material
    }
}

const ballMaterial = <meshStandardMaterial emissive="#72EF71" emissiveIntensity={5} toneMapped={false}/>
const cylinderMaterial = <meshStandardMaterial color="#1f401e" emissiveIntensity={1} toneMapped={false}/>
//#1f401e

const TrailCustom:FC<{children: any}> = ({children}) => {
    return (
        <Trail local
               width={3}
               length={1}
               color="#72EF71"
               attenuation={(t) => t * t}
               //stride={0.1}
               //interval={0.5}
        >
            {children}
        </Trail>
    )
}

const glowGreen = new THREE.MeshBasicMaterial({ color: "#72EF71", toneMapped: false })

export const WireModel = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const glb = useGLTF("/glb/wire.glb") as GLTFResultType;
    const {nodes, materials, animations} = glb;
    const animationsResult = useAnimations(animations, groupRef);
    const {actions, names} = animationsResult;

    useEffect(() => {
        for (let i = 0; i < names.length; i++) {
            actions[names[i]]?.play()
        }
    }, [])

    return (
        <group ref={groupRef} dispose={null}>
            <group name="Scene">
                <group
                    name="Empty002"
                    position={[-0.14, -0.06, -0.02]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.9}
                />
                <group
                    name="BezierCurve004"
                    position={[-1, 0.18, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve009"
                    position={[-0.28, -0.56, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.16}
                />
                <group
                    name="BezierCurve005"
                    position={[-1.59, 0.1, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve010"
                    position={[-1.12, -0.71, 3.27]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve011"
                    position={[-1.04, -0.76, 3.25]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve012"
                    position={[-1.11, -0.87, 3.22]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve013"
                    position={[-0.97, 0.15, 3.33]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve014"
                    position={[-1.6, 0.15, 3.36]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="BezierCurve027"
                    position={[-0.27, 0.1, 3.33]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={1.33}
                />
                <group
                    name="BezierCurve028"
                    position={[-0.28, 0.11, 3.31]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={[1.33, 1.15, 1.3]}
                />
                <group
                    name="BezierCurve029"
                    position={[0.13, 0.17, 3.38]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.13}
                />
                <group
                    name="Empty"
                    position={[-1.44, 0.43, 3.53]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={0.14}
                />
                <group
                    name="Empty001"
                    position={[-1.39, 0.5, 3.16]}
                    rotation={[1.58, 0.08, 0.27]}
                    scale={0.05}
                />
                <group
                    name="Empty003"
                    position={[-1.47, 0, 3.92]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.09}
                />
                <group
                    name="Empty004"
                    position={[-1.08, 0.5, 3.81]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.1}
                />
                <group
                    name="Empty005"
                    position={[-1.25, 0.48, 3.33]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.05}
                />
                <group
                    name="Empty006"
                    position={[-1.39, 0.44, 3.35]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={0.06}
                />
                <mesh
                    name="Cylinder003"
                    geometry={nodes.Cylinder003.geometry}
                    material={materials["Material.003"]}
                    position={[-1.1, 0.2, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.3}
                />
                <mesh
                    name="Cylinder008"
                    geometry={nodes.Cylinder008.geometry}
                    material={materials["Material.003"]}
                    position={[-0.28, -0.55, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.33}
                />
                <mesh
                    name="Cylinder004"
                    geometry={nodes.Cylinder004.geometry}
                    material={materials["Material.003"]}
                    position={[-1.62, 0.11, 3.37]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.37}
                />
                <mesh
                    name="Cylinder009"
                    geometry={nodes.Cylinder009.geometry}
                    material={materials["Material.003"]}
                    position={[-1.22, -0.7, 3.27]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.34}
                />
                <mesh
                    name="Cylinder010"
                    geometry={nodes.Cylinder010.geometry}
                    material={materials["Material.003"]}
                    position={[-1.14, -0.75, 3.25]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.35}
                />
                <mesh
                    name="Cylinder011"
                    geometry={nodes.Cylinder011.geometry}
                    material={materials["Material.003"]}
                    position={[-1.25, -0.85, 3.2]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.35}
                />
                <mesh
                    name="Cylinder012"
                    geometry={nodes.Cylinder012.geometry}
                    material={materials["Material.003"]}
                    position={[-1.03, 0.16, 3.33]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.3}
                />
                <mesh
                    name="Cylinder013"
                    geometry={nodes.Cylinder013.geometry}
                    material={materials["Material.003"]}
                    position={[-1.63, 0.16, 3.36]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.34}
                />
                <mesh
                    name="Cylinder026"
                    geometry={nodes.Cylinder026.geometry}
                    material={materials["Material.003"]}
                    position={[-0.3, 0.09, 3.31]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={0.45}
                />
                <mesh
                    name="Cylinder027"
                    geometry={nodes.Cylinder027.geometry}
                    //material={materials["Material.001"]}
                    //material={glowGreen}
                    position={[-0.19, 0.1, 3.29]}
                    rotation={[-2.71, 0.04, -3.11]}
                    scale={[0.46, 0.39, 0.44]}
                >
                    {cylinderMaterial}
                </mesh>
                <mesh
                    name="Cylinder028"
                    geometry={nodes.Cylinder028.geometry}
                    material={materials["Material.003"]}
                    position={[-0.09, 0.19, 3.38]}
                    rotation={[-0.27, -0.01, 3.09]}
                    scale={0.36}
                />
                <group
                    name="Catenary029_Catenary005"
                    position={[0.06, 0.07, 2.98]}
                    rotation={[Math.PI / 2, 0, -0.78]}
                    scale={0.02}
                >
                    <mesh
                        name="Catenary029_Catenary005_1"
                        geometry={nodes.Catenary029_Catenary005_1.geometry}
                        material={materials["Material.003"]}
                    />
                    <mesh
                        name="Catenary029_Catenary005_2"
                        geometry={nodes.Catenary029_Catenary005_2.geometry}
                        material={materials["Material.001"]}
                    />
                </group>

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere"
                        geometry={nodes.Sphere.geometry}
                        material={glowGreen}
                        position={[-1.44, 0.43, 3.39]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere001"
                        geometry={nodes.Sphere001.geometry}
                        material={glowGreen}
                        position={[-1.39, 0.5, 3.16]}
                        rotation={[1.33, -0.01, -2.81]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere002"
                        geometry={nodes.Sphere002.geometry}
                        material={glowGreen}
                        position={[-1.48, -0.02, 3.38]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere003"
                        geometry={nodes.Sphere003.geometry}
                        material={glowGreen}
                        position={[-1.25, 0.48, 3.33]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere004"
                        geometry={nodes.Sphere004.geometry}
                        material={glowGreen}
                        position={[-1.09, 0.5, 3.38]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

                {/*<TrailCustom>*/}
                    <mesh
                        name="Sphere005"
                        geometry={nodes.Sphere005.geometry}
                        material={glowGreen}
                        position={[-1.39, 0.44, 3.35]}
                        scale={0.01}
                    >
                        {/*{ballMaterial}*/}
                    </mesh>
                {/*</TrailCustom>*/}

            </group>
        </group>
    )
}
useGLTF.preload("/glb/wire.glb");
