import React, {useEffect, useRef} from "react";
import {useGLTF, useAnimations} from "@react-three/drei";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {getValue} from "../../../helpers/helpers";
//import {Material} from "three";

// type GLTFResultType = GLTF & {
//     nodes: {
//         Cube: THREE.Mesh
//     }
//     materials: {
//         Material: THREE.MeshStandardMaterial
//     }
// }

export const ManModel = observer(() => {
    const {
        setModel,
        block2Height,
        pageYOffset
    } = useStore();

    const groupRef = useRef<THREE.Group>(null!);
    const glb = useGLTF("/glb/man.glb");

    const {nodes, materials, animations} = glb;
    const animationsResult = useAnimations(animations, groupRef);
    const {actions, names} = animationsResult;

    useEffect(() => {
        actions[names[0]]?.play();
    }, [])

    useEffect(() => {
        if (glb) {
            setModel(true)
        }
    }, [glb])

    return (
        <group ref={groupRef}
               dispose={null}
               rotation={[
                   0,
                   getValue({
                       x2: block2Height || 0,
                       x: pageYOffset,
                       f1: - (0.3) * Math.PI,
                       f2: 0
                   }),
                   0]
               }
        >
            <group name="Scene">
                <group name="GLTF_SceneRootNode004" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Cube_0"/>
                </group>
                <group name="Armature002">
                    <primitive object={nodes.mixamorigHips}/>
                    <group name="unamed004">
                        <skinnedMesh
                            name="unamedmesh004"
                            //@ts-ignore
                            geometry={nodes.unamedmesh004.geometry}
                            material={materials["Material.002"]}
                            //@ts-ignore
                            skeleton={nodes.unamedmesh004.skeleton}
                        />
                        <skinnedMesh
                            name="unamedmesh004_1"
                            //@ts-ignore
                            geometry={nodes.unamedmesh004_1.geometry}
                            //material={materials["Material.006"]}
                            //@ts-ignore
                            skeleton={nodes.unamedmesh004_1.skeleton}
                        >
                            <meshStandardMaterial
                                color={`rgb(${Math.round(getValue({
                                    x2: block2Height || 0,
                                    x: pageYOffset,
                                    f1: 255,
                                    f2: 114
                                }))}, ${Math.round(getValue({
                                    x2: block2Height || 0,
                                    x: pageYOffset,
                                    f1: 255,
                                    f2: 239
                                }))}, ${Math.round(getValue({
                                    x2: block2Height || 0,
                                    x: pageYOffset,
                                    f1: 255,
                                    f2: 113
                                }))})`}
                                emissive="#444"
                                roughness={0.5}
                                metalness={1}
                            />
                        </skinnedMesh>
                    </group>
                </group>
                <mesh
                    name="Torus001"
                    //@ts-ignore
                    geometry={nodes.Torus001.geometry}
                    material={materials["Material.009"]}
                    position={[0.25, 5.48, 0.24]}
                    rotation={[Math.PI / 2, 0, 0.16]}
                    scale={0.03}
                />
                <mesh
                    name="Torus"
                    //@ts-ignore
                    geometry={nodes.Torus.geometry}
                    material={materials["Material.009"]}
                    position={[-0.01, 5.48, 0.2]}
                    rotation={[Math.PI / 2, 0, 0.3]}
                    scale={0.03}
                />
                <mesh
                    name="Object_8"
                    //@ts-ignore
                    geometry={nodes.Object_8.geometry}
                    material={materials["Material.008"]}
                >
                    <mesh
                        name="Object_3"
                        //@ts-ignore
                        geometry={nodes.Object_3.geometry}
                        material={materials["Material.008"]}
                    />
                    <mesh
                        name="Object_6001"
                        //@ts-ignore
                        geometry={nodes.Object_6001.geometry}
                        material={materials["Material.008"]}
                    />
                    <mesh
                        name="Object_7"
                        //@ts-ignore
                        geometry={nodes.Object_7.geometry}
                        material={materials["Material.017"]}
                    />
                    <mesh
                        name="Object_9"
                        //@ts-ignore
                        geometry={nodes.Object_9.geometry}
                        material={materials["Material.008"]}
                        position={[0.34, 2.4, -0.09]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={1.18}
                    />
                </mesh>
                <mesh
                    name="Object_6007"
                    //@ts-ignore
                    geometry={nodes.Object_6007.geometry}
                    material={materials["Material.008"]}
                />
                <mesh
                    name="Vector"
                    //@ts-ignore
                    geometry={nodes.Vector.geometry}
                    material={materials.Vector}
                />
            </group>
        </group>
    );
})

useGLTF.preload("/glb/man.glb");
