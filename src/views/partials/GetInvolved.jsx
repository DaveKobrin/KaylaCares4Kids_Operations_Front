import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDollarToSlot, faHandHoldingHand, faNewspaper } from '@fortawesome/free-solid-svg-icons'

const GetInvolved = () => {

    return (
        <section className='get-involved-section'>
            <div className='sect-head color-red font-xl'>
                <span className='font-playful marg-r-sm'>Get Involved!</span>
                <span className='font-xxl'><i className='fad fa-box-heart'></i></span>
            </div>

            <div className='get-involved-button-container'>
                <div className='get-involved-button color-red bk-fade-red'>
                    <FontAwesomeIcon icon={faHandHoldingHand} className='font-xxl' />
                    <span className='font-playful font-l'>Volunteer</span>
                </div>
                <div className='get-involved-button color-orange bk-fade-orange'>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className='font-xxl'/>
                    <span className='font-playful font-l'>Donate</span>
                </div>
                <div className='get-involved-button color-green bk-fade-green'>
                    <FontAwesomeIcon icon={faNewspaper} className='font-xxl' />
                    <span className='font-playful font-l'>Programs</span>
                </div>
            </div>
        </section>
    )
}

export default GetInvolved;