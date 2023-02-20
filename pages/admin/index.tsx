import style from "./AdminPage.module.scss"
import * as React from "react";
import {Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {useRouter} from "next/router";
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import {PortfolioTab} from "../../components/A6_Admin/PortfolioTab/PortfolioTab";
import {getLocalStorage} from "../../localStorage/localStorage";
import {CategoryTab} from "../../components/A6_Admin/CategoryTab/CategoryTab";
import {TeamTab} from "../../components/A6_Admin/TeamTab/TeamTab";
import {SliderTab} from "../../components/A6_Admin/SliderTab/SliderTab";

export enum TabsEnum {
    portfolio = 0,
    category = 1,
    team = 2,
    slider = 3,
}

const AdminPage = observer(() => {
    const {setPreloader} = useStore();

    const router = useRouter();

    if (typeof window !== 'undefined') {
        const accessToken = getLocalStorage();
        if (!accessToken) {
            router.push("/login");
        }
    }

    const onHomeHandler = () => {
        //setPreloader(false);
        router.push("/");
    }

    const [tab, setTab] = React.useState<TabsEnum>(TabsEnum.portfolio);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div className={style.adminPage}>
            <div className={style.header}>
                <div className={style.left}>
                    <SettingsIcon/>
                    <Typography variant="h6"
                                className={style.text}
                    >
                        Admin panel
                    </Typography>
                </div>

                <Button variant="contained"
                        startIcon={<HomeIcon/>}
                        color='success'
                        onClick={onHomeHandler}
                >
                    Go to Home page
                </Button>
            </div>

            <div className={style.content}>

                <Tabs value={tab}
                      onChange={handleChange}
                >
                    {
                        [
                            {label: "Portfolio"},
                            {label: "Category"},
                            {label: "Team"},
                            {label: "Slider"},
                        ].map(({label}, key) => (
                            <Tab key={key} label={label}/>
                        ))
                    }
                </Tabs>

                <div className={style.tabContent}>
                    {
                        [
                            {
                                tabOfEnum: TabsEnum.portfolio,
                                component: <PortfolioTab/>
                            },
                            {
                                tabOfEnum: TabsEnum.category,
                                component: <CategoryTab/>
                            },
                            {
                                tabOfEnum: TabsEnum.team,
                                component: <TeamTab/>
                            },
                            {
                                tabOfEnum: TabsEnum.slider,
                                component: <SliderTab/>
                            },
                        ].map(({tabOfEnum, component}, key) => (
                            <div key={key}>
                                {
                                    tab === tabOfEnum && component
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})
export default AdminPage
