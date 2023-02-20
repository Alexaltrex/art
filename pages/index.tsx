import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {FirstBlock} from "../components/B0_0_FirstBlock/FirstBlock";
import {AboutUs} from "../components/B1_AboutUs/AboutUs";
import {OurPortfolio} from "../components/B3_OurPortfolio/OurPortfolio";
import {Feedback} from "../components/B4_Feedback/Feedback";
import {OtherWorks} from "../components/B5_OtherWorks/OtherWorks";
import {OurTeam} from "../components/B6_OurTeam/OurTeam";
import {Reviews} from "../components/B7_Reviews/Reviews";
import {LetsTalk} from "../components/B8_LetsTalk/LetsTalk";
import {WhatWeWorkWith} from "../components/B2_WhatWeWorkWith/WhatWeWorkWith";
import {OurServices} from "../components/B0_1_OurServices/OurServices";
import {LetsTalkModal} from "../components/A4_LetsTalkModal/LetsTalkModal";
import {ModelBlock} from "../components/A5_ModelBlock/ModelBlock";
import style from "./HomePage.module.scss"
import {portfolioAPI} from "../api/portfolio.api";
import {IPortfolio} from "../types/portfolio.type";
import {NextPage} from "next";
import {categoryAPI} from "../api/category.api";
import {ICategory} from "../types/category.type";

interface IHomePage {
    portfolios: IPortfolio[]
    categories: ICategory[]
}

const HomePage: NextPage<IHomePage> = ({
                                           portfolios,
                                           categories
                                       }) => {
    return (
        <MainLayout categories={categories}>
            <LetsTalkModal/>



            <div className={style.twoBlocksWrapper}>
                <FirstBlock/>
                <OurServices/>
                <ModelBlock/>
            </div>

            <AboutUs/>
            <WhatWeWorkWith/>
            <OurPortfolio portfolios={portfolios}/>
            <Feedback/>
            <OtherWorks categories={categories} portfolios={portfolios}/>
            <OurTeam/>
            <Reviews/>
            <LetsTalk/>
        </MainLayout>
    )
}
export default HomePage

////////////////////////////////////////////////
export const getServerSideProps = async () => {
    const portfolios = await portfolioAPI.getAll();
    const categories = await categoryAPI.getAll();
    return {
        props: {
            portfolios,
            categories
        }
    }
}
