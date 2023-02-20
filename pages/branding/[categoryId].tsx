import {useRouter} from "next/router";
import {categoryAPI} from "../../api/category.api";
import {NextPage} from "next";
import {sliderAPI} from "../../api/slider.api";
import {ISlider} from "../../types/slider.type";
import {PortfolioSlider} from "../../components/B11_PortfolioSlider/PortfolioSlider";
import {MainLayout} from "../../layouts/MainLayout/MainLayout";
import {ICategory} from "../../types/category.type";
import {FooterNew} from "../../components/FooterNew/FooterNew";
import * as React from "react";
import {OurServices} from "../../components/B0_1_OurServices/OurServices";
import {IPortfolio} from "../../types/portfolio.type";
import {portfolioAPI} from "../../api/portfolio.api";
import {OtherWorks} from "../../components/B5_OtherWorks/OtherWorks";
import {LetsTalk} from "../../components/B8_LetsTalk/LetsTalk";

interface ICategoryBrandingPage {
    slider: ISlider
    categories: ICategory[]
    portfolios: IPortfolio[]
}

const CategoryBrandingPage: NextPage<ICategoryBrandingPage> = ({
                                                                   slider,
                                                                   categories,
                                                                   portfolios
                                                               }) => {



    return (
        <MainLayout categories={categories}>


            {slider && <PortfolioSlider slider={slider}/>}
            <OurServices/>
            <OtherWorks categories={categories} portfolios={portfolios}/>
            <LetsTalk/>
        </MainLayout>
    )
}
export default CategoryBrandingPage

interface IContext {
    params: {
        categoryId: string
    }
}

////////////////////////////////////////////////
export const getServerSideProps = async (context: IContext) => {
    const sliderId = context.params.categoryId;
    const slider = await sliderAPI.getSliderById(sliderId);
    const categories = await categoryAPI.getAll();
    const portfolios = await portfolioAPI.getAll();
    return {
        props: {
            slider,
            categories,
            portfolios
        }
    }
}
