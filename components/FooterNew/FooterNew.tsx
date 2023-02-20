import style from "./FooterNew.module.scss"
import {svgIcons} from "../../assets/svgIcons";
import {useMediaQuery} from "@mui/material";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import Link from "next/link";
import {Canvas, extend} from "@react-three/fiber";
import {Effects, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {siteLinks, socialIcons, socialLinks} from "./data";
import * as THREE from "three";
import {getValue} from "../../helpers/helpers";
import {FC, Suspense} from "react";
import {WireModel} from "../X_common/Models/WireModel";
import {EffectComposer, Bloom} from '@react-three/postprocessing'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

export const FooterNew = () => {
    const desktop = useMediaQuery('(min-width:1400px)');

    //
    return (
        <footer className={style.footerNew}>

            <div className={style.modelWrapper}>
                <Canvas gl={{ antialias: false }}>
                    <ambientLight intensity={0.6}/>
                    <directionalLight position={[2, 0, 2]} intensity={0.6}/>
                    <directionalLight position={[-2, 0, 2]} intensity={0.6}/>

                    <Suspense fallback={null}>
                        <WireModel/>
                        {/*<EffectComposer>*/}
                        {/*    <Bloom mipmapBlur luminanceThreshold={0.5} radius={0.6} intensity={5}/>*/}
                        {/*</EffectComposer>*/}
                        <Effects disableGamma>
                            {/*@ts-ignore*/}
                            <unrealBloomPass threshold={0.5} strength={15.0} radius={0.5} exposure={1} />
                        </Effects>
                    </Suspense>

                    <PerspectiveCamera makeDefault
                                       position={[-0.05, -0.6, 25]}
                                       rotation={new THREE.Euler(0, 0, 0)}
                                       zoom={10.0}
                    />

                    <OrbitControls enableRotate={true}
                                   enableZoom={true}
                                   target={[-0.05, -0.6, 0]}
                    />

                </Canvas>
            </div>


            <div className={style.content}>
                <div className={style.top}>
                    <div className={style.inner}>

                        <div className={style.left}>
                            {svgIcons.logo}
                        </div>

                        <div className={style.right}>
                            {
                                socialIcons.map(({icon, href}, key) => (
                                    <a key={key}
                                       href={href}
                                       className={style.link}
                                       target="_blank"
                                       rel="nofollow noopener noreferrer"
                                    >
                                        {icon}
                                    </a>
                                ))
                            }
                        </div>


                    </div>
                </div>

                <div className={style.middle}>
                    <div className={style.middleInner}>

                        <div className={style.middleTop}>

                            <div className={style.row}>
                                <p className={style.label}>Get in touch</p>
                                <div className={style.dot}/>
                            </div>

                            <p className={style.name}>
                                {desktop ? "Demyanchuk " : "Demyanchuk ART"}
                            </p>

                            <div className={style.textWithButton}>
                                <p className={style.art}>ART</p>
                                <PrimaryButton label="Let's talk!"
                                               className={style.talkBtn}
                                />
                            </div>

                        </div>

                        <div className={style.middleBottom}>
                            {
                                socialLinks.map(({label, linkLabel, href}, key) => (
                                    <div key={key}
                                         className={style.socialLinkItem}
                                    >
                                        <p className={style.label}>{label}</p>
                                        <a href={href} className={style.link}>{linkLabel}</a>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>

                <div className={style.bottom}>
                    <div className={style.bottomInner}>
                        <div className={style.text}>
                            I have been working with Anatoly and his team for over 3 years. Implemented 3 projects.
                            Anatoly and his team were always in touch, made all the changes
                        </div>

                        <div className={style.siteLinks}>
                            {
                                siteLinks.map((group, key) => (
                                    <div className={style.group} key={key}>
                                        <p className={style.groupLabel}>
                                            {group.groupLabel}
                                        </p>
                                        <div className={style.links}>
                                            {
                                                group.links.map((link, key) => (
                                                    <Link key={key}
                                                          href={link.href}
                                                          className={style.link}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className={style.realFooter}>
                    <div className={style.realFooterInner}>
                        <p className={style.rights}>© Demyanchuk Art All rights reserved</p>

                        <div className={style.links}>
                            {
                                [
                                    {label: "Privacy Policy", href: "/"},
                                    {label: "Terms & Conditions", href: "/"},
                                ].map(({label, href}, key) => (
                                    <Link href={href}
                                          key={key}
                                          className={style.link}
                                    >
                                        {label}
                                    </Link>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>

        </footer>
    )
}
