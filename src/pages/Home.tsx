import CarouselPart from "@/components/Carousel-part"
import ProductPannel from "@/components/ProductPannel"
import { Navbar } from "@/components/ui/navbar"
// import { api } from "@/lib/axios"
// import { User } from "@/types/user"
export default function Home() {
    return(
        <>
        <Navbar/>
        <CarouselPart/>
        <ProductPannel/>
        </>
    )
};
