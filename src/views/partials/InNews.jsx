import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { CardFloatText } from "../../components";
import { Button } from "reactstrap";

const InNews = () => {
    const newsItems = [
        {
            imgSrc: "https://kaylacares4kids.org/wp-content/uploads/2021/05/Kayla-on-screen-with-Kelly.jpg",
            title: "",
            text: "Watch Kayla Cares 4 Kids on The Kelly Clarkson Show"
        },
        {
            imgSrc: "https://kaylacares4kids.org/wp-content/uploads/2021/01/kayla-hero-940x529-umiami.jpg",
            title: "",
            text: "University of Miami – Student Recognized for Outstanding Volunteer Work"
        },
        {
            imgSrc: "https://kaylacares4kids.org/wp-content/uploads/2017/04/nbc-news-image.jpg",
            title: "",
            text: "NBC Nightly News – Young Girl Turning Suffering Into a Solution for Other Sick Children"
        },
    ];

    return (
        <section className="in-the-news">
            <div className="sect-head color-green font-xl">
                <span className='font-playful marg-r-sm'>In the News</span>
                <FontAwesomeIcon icon={faNewspaper} className='font-xl' />
            </div>
            <div className="in-news-container">
                <div className='in-news-card'>
                    <CardFloatText props={newsItems[0]} />
                </div>
                <div className='in-news-card'>
                    <CardFloatText props={newsItems[1]} />
                </div>
                <div className='in-news-card'>
                    <CardFloatText props={newsItems[2]} />
                </div>
            </div>
            <div className="sect-foot">
                <Button size="lg" color="success" className="in-news-button">More Good News</Button>
            </div>
        </section>
    )
}

export default InNews;
