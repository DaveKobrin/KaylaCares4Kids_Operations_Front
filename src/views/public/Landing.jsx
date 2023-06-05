import { FAQ, GetInvolved, Hero, InNews, Intro } from "../partials"
import Counters from "../partials/Counters";


const Landing = () => {
    return (
        <>
            <Hero />
            <Intro />
            <Counters />
            <GetInvolved />
            <InNews />
            <FAQ />
        </>
    )
}

export default Landing;