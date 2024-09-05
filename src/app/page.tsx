import ProductView from "@/components/container/ProductView";
import AccordionHome from "@/components/layouts/home/accordionHome";
import Banner from "@/components/layouts/home/banner";
import Header from "@/components/layouts/home/header";
import Main from "@/components/layouts/home/main";

export default function Home() {
  return (
    <>
      <Header />
      <Main Title="Whats news?" SubTitle="Choose from your Food menu">
        <ProductView limit="8" category="food" />
      </Main>
      <Banner />
      <Main Title="Our Product in Store" SubTitle="Choose your Favorit Menu">
        <ProductView limit="8" category="drink" />
      </Main>
      <AccordionHome />
    </>
  );
}
