import style from "./FirstBlock.module.scss";
import {Canvas} from "@react-three/fiber";
import {Box, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import {Model} from "./Model";

const items = [
    {label: "Instagram", href: "#"},
    {label: "Dribbble", href: "#"},
    {label: "Twitter", href: "#"},
    {label: "Telegram", href: "#"},
    {label: "Telegram", href: "#"},
];


export const FirstBlock = () => {
    return (
        <div className={style.firstBlock}>

            <div className={style.inner}>

                <div className={style.canvas}>
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
                                           position={[6, 6, 20]}
                                           rotation={new THREE.Euler(0, 0, 0)}
                                           zoom={7}
                        />

                        <OrbitControls enableRotate={true}
                                       enableZoom={true}
                                       autoRotate={false}
                                       autoRotateSpeed={2}
                                       target={[0,5.7,0]}
                        />
                    </Canvas>
                </div>


                <div className={style.content}>

                    <div className={style.titleBlock}>
                        <h1 className={style.title}>
                            Taking <span>crypto</span> and <span>fintech</span> products to the next level
                        </h1>

                        <div className={style.right}>
                            <div>
                                <p>Kiev, Ukrainian Local</p>
                                <p>Local Time → 11:01 AM</p>
                            </div>
                            <div>
                                <p>
                                    Monday
                                </p>
                                <p>
                                    November 14, 2022
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={style.items}>
                        {
                            items.map(({label, href}, key) => (
                                <a key={key}
                                   className={style.item}
                                   href={href}
                                   target="_blank"
                                   rel="noreferrer noopener"
                                >
                                    {label}
                                </a>
                            ))
                        }
                    </div>


                </div>

                <div className={style.bottom}/>
            </div>


        </div>
    )
}
