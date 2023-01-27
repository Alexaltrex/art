import {Canvas} from "@react-three/fiber";
import {Box, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Model} from "../B0_0_FirstBlock/Model";
import * as THREE from "three";
import style from "./ModelBlock.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import {getValue} from "../../helpers/helpers";

export const ModelBlock = observer(() => {
    const {
        modelShift,
        block2Height,
        pageYOffset
    } = useStore();

    return (
        <div className={clsx({
            [style.modelBlocks]: true,
            [style.modelBlocks_shift]: modelShift,
        })}
        >
            <Canvas>
                <ambientLight intensity={2}/>
                <directionalLight position={[2, 0, 2]} intensity={1.5}/>
                <directionalLight position={[-2, 0, 2]} intensity={1.5}/>

                <Box args={[1, 1, 1]}>
                    <meshPhongMaterial color="green"/>
                </Box>

                {/*<Suspense fallback={null}>*/}
                <Model/>
                {/*</Suspense>*/}


                <PerspectiveCamera makeDefault
                                   position={[
                                       0,
                                       6,
                                       // getValue({
                                       //     f1: 6,
                                       //     f2: 10,
                                       //     x2: block2Height || 0,
                                       //     x: pageYOffset,
                                       // })   ,
                                       20
                                   ]}
                                   rotation={new THREE.Euler(0, 0, 0)}
                                   zoom={
                                       getValue({
                                           f1: 7,
                                           f2: 10,
                                           x2: block2Height || 0,
                                           x: pageYOffset,
                                       })
                                   }
                />

                <OrbitControls enableRotate={false}
                               enableZoom={false}
                               autoRotate={false}
                               autoRotateSpeed={2}
                               target={[
                                   0,
                                   getValue({
                                       f1: 5.7,
                                       f2: 6.0,
                                       x2: block2Height || 0,
                                       x: pageYOffset,
                                   }),
                                   //5.7,
                                   0
                               ]}
                />
            </Canvas>
        </div>
    )
})
