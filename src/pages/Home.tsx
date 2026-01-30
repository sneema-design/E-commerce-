import { useLocation } from "react-router-dom"
export default function Home() {
    const location=useLocation()
    return(
        <>
           <p>hello {location.state?.Username||"Guest"} how are you?</p>
        </>
    )
};
