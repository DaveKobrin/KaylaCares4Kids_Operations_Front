import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FAQAccordian } from "../../components"

const FAQ = () => {
    return (
        <section>
            <div className="sect-head font-xl color-teal">
                <span className='font-playful marg-r-sm'>Questions</span>
                <FontAwesomeIcon icon={faQuestion} className="font-xxl" />
            </div>
            <FAQAccordian />
        </section>
    )
}

export default FAQ