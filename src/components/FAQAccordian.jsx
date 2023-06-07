import { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";

const FAQAccordian = (props) => {
    const [ open, setOpen ] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return(
        <>
            <Accordion open={open} toggle={toggle} >
                <AccordionItem>
                    <AccordionHeader targetId="1">'What items do you accept as donations?'</AccordionHeader>
                    <AccordionBody accordionId="1">
                        <em><span style={{color: "red"}}> 
                            <strong>Due to COVID-19 </strong>
                            we are not currently accepting used items.
                        <br />
                        </span></em>
                        <p>We accept new and gently used Books, DVDs, Portable DVD Players, Game Consoles, 
                        Video Games, Nintendo DS Players, and DS games.</p>
                        
                        <ul>
                            <li>Gently used books must be good as new with no writing.</li>
                            <li>DVDs must be rated G, PG, or PG-13.</li>
                            <li>Gently used DVDs must be good as new with no scratches.</li>
                            <li>Electronics must have power cords, all accessories, and be in good working condition.</li>
                            <li>Video Games must not have violence.</li>
                        </ul>
                    </AccordionBody>
                </AccordionItem>

                <AccordionItem>
                    <AccordionHeader targetId="2">Where can I drop off donations?</AccordionHeader>
                    <AccordionBody accordionId="2">
                        <em><span style={{color: "red"}}> 
                            <strong>Due to COVID-19 </strong>
                            we are not currently accepting donations.
                        </span></em>
                    </AccordionBody>
                </AccordionItem>
                
                <AccordionItem>
                    <AccordionHeader targetId="3">Where do donations get sent?</AccordionHeader>
                    <AccordionBody accordionId="3">
                        <p>
                            We donate items to all types of medical related facilities across the world.
                            Places include children's hospitals, Ronald McDonald Houses, healthcare hospitality 
                            homes, residential pediatric treatment facilities, and pediatric therapy centers.
                            If there is a place you would like for us to donate to, please let us know by 
                            emailing <a href="mailto:andrea@kaylacares4kids.org">andrea@kaylacares4kids.org</a>. 
                        </p> 
                    </AccordionBody>
                </AccordionItem>

                <AccordionItem>
                    <AccordionHeader targetId="4">How else can I support the cause?</AccordionHeader>
                    <AccordionBody accordionId="4">
                        <ul>
                            <li>
                                We are always in need of monetary donations to keep our nonprofit organization
                                alive and to thrive.
                            </li>
                            <li>
                                Help us by becoming a volunteer - we welcome people of all ages and abilities. Tell us a little bit 
                                about yourself by emailing <a href="mailto:andrea@kaylacares4kids.org">andrea@kaylacares4kids.org</a>.
                            </li>
                            <li>
                                We can assist you with a school-wide or company-wide collection.
                            </li>
                            <li>
                                If you're interested in joining our Board of Directors or Advisory Council, please 
                                email <a href="mailto:andrea@kaylacares4kids.org">andrea@kaylacares4kids.org</a> and 
                                let's talk!
                            </li>
                        </ul>
                    </AccordionBody>
                </AccordionItem>
                
            </Accordion>
        </>
    );
};

export default FAQAccordian;
