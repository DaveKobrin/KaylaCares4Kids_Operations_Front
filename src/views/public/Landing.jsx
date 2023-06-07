import { FAQ, GetInvolved, Hero, InNews, Intro, PhotoGallery } from "../partials"
import Counters from "../partials/Counters";


const Landing = () => {
    return (
        <div className="whole-page">
            <Hero />
            <Intro />
            <Counters />
            <GetInvolved />
            <InNews />
            <FAQ />
            <PhotoGallery />
        </div>
    )
}

export default Landing;