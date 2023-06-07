import { Button } from "reactstrap";


const Hero = () => {
    return (
        <>
            <div className="hero">
                <div className="hero-heading">
                    <div className="hero-text-container hero-shadow">
                        <h2 className="hero-text font-xxl">Helping sick kids feel better one smile at a time</h2>
                    </div>
                    <Button className="hero-shadow" size="lg" color="primary">About Us</Button>
                </div>
            </div>
        </>
    )
}

export default Hero;