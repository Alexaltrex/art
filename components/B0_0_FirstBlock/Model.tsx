import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import React, {useEffect, useRef} from "react";
import {useGLTF, useAnimations} from "@react-three/drei";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

type GLTFResultType = GLTF & {
    nodes: {
        Cube: THREE.Mesh
    }
    materials: {
        Material: THREE.MeshStandardMaterial
    }
}

export const Model = observer(() => {
    const {setModel} = useStore();


    const group = useRef<THREE.Group>(null!);
    const glb = useGLTF("/model.glb");

    console.log(glb)

    const {nodes, materials, animations} = glb;
    const animationsResult = useAnimations(animations, group);
    const {actions, names} = animationsResult;
    //console.log(animationsResult)

    useEffect(() => {
        //console.log("start", new Date())
        actions[names[0]]?.play();

    }, [])

    useEffect(() => {
        //console.log("glb", new Date())
        if (glb) {
            setModel(true)
        }
    }, [glb])

    return (
        <group ref={group} dispose={null}>
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
                            material={materials["Material.006"]}
                            //@ts-ignore
                            skeleton={nodes.unamedmesh004_1.skeleton}
                        />
                    </group>
                </group>
                <mesh
                    name="Torus001"
                    castShadow
                    receiveShadow
                    //@ts-ignore
                    geometry={nodes.Torus001.geometry}
                    material={materials["Material.009"]}
                    position={[0.25, 5.48, 0.24]}
                    rotation={[Math.PI / 2, 0, 0.16]}
                    scale={0.03}
                />
                <mesh
                    name="Torus"
                    castShadow
                    receiveShadow
                    //@ts-ignore
                    geometry={nodes.Torus.geometry}
                    material={materials["Material.009"]}
                    position={[-0.01, 5.48, 0.2]}
                    rotation={[Math.PI / 2, 0, 0.3]}
                    scale={0.03}
                />
                <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    //@ts-ignore
                    geometry={nodes.Object_8.geometry}
                    material={materials["Material.008"]}
                >
                    <mesh
                        name="Object_3"
                        castShadow
                        receiveShadow
                        //@ts-ignore
                        geometry={nodes.Object_3.geometry}
                        material={materials["Material.008"]}
                    />
                    <mesh
                        name="Object_6001"
                        castShadow
                        receiveShadow
                        //@ts-ignore
                        geometry={nodes.Object_6001.geometry}
                        material={materials["Material.008"]}
                    />
                    <mesh
                        name="Object_7"
                        castShadow
                        receiveShadow
                        //@ts-ignore
                        geometry={nodes.Object_7.geometry}
                        material={materials["Material.017"]}
                    />
                    <mesh
                        name="Object_9"
                        castShadow
                        receiveShadow
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
                    castShadow
                    receiveShadow
                    //@ts-ignore
                    geometry={nodes.Object_6007.geometry}
                    material={materials["Material.008"]}
                />
                <mesh
                    name="Vector"
                    castShadow
                    receiveShadow
                    //@ts-ignore
                    geometry={nodes.Vector.geometry}
                    material={materials.Vector}
                />
            </group>
        </group>
    );
})

useGLTF.preload("/model.glb");
