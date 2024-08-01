"use client";

import MainView from "@/components/container/MainView";
import Banner from "./banner";

const Main = () => {
    return (
        <>
            <MainView
                Category="food"
                Title="Whats New?"
                SubTitle="Choose from your Food menu"
            />
            <Banner />
            <MainView
                Category="drink"
                Title="Our Product in Store"
                SubTitle="Choose your Favorit Menu"
            />
        </>
    );
};

export default Main;
