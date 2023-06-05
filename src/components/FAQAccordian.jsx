import { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";
import '../views/public/styles.css'
const data = [
    {
        title: 'What items do you accept as donations?',
        text:`<span classname="color-red"> 
                <span classname="font-bold">Due to COVID-19 </span>
                we are not currently accepting used items.</span>
                <br>
                <p>We accept new and gently used Books, DVDs, Portable DVD Players, Game Consoles, 
                Video Games, Nintendo DS Players, and DS games.</p>
                <br>
                <ul>
                    <li>Gently used books must be good as new with no writing.</li>
                    <li>DVDs must be rated G, PG, or PG-13.</li>
                    <li>Gently used DVDs must be good as new with no scratches.</li>
                    <li>Electronics must have power cords, all accessories, and be in good working condition.</li>
                    <li>Video Games must not have violence.</li>
                </ul>`
    },
    // {
    //     title:,
    //     text:
    // },
    // {
    //     title:,
    //     text:
    // },
    // {
    //     title:,
    //     text:
    // },

];

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
            <Accordion open={open} toggle={toggle}>
                    <AccordionItem>
                        <AccordionHeader targetId="1">'What items do you accept as donations?'</AccordionHeader>
                        <AccordionBody accordionId="1">
                            <span classname="color-red"> 
                                <span classname="font-bold">Due to COVID-19 </span>
                                we are not currently accepting used items.
                            </span>
                            <p>We accept new and gently used Books, DVDs, Portable DVD Players, Game Consoles, 
                            Video Games, Nintendo DS Players, and DS games.</p>
                            <br/>
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
                    <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                    <AccordionBody accordionId="2">
                        <strong>This is the second item&#39;s accordion body.</strong>
                        You can modify any of this with custom CSS or overriding our default
                        variables. It&#39;s also worth noting that just about any HTML can
                        go within the <code>.accordion-body</code>, though the transition
                        does limit overflow.
                    </AccordionBody>
                </AccordionItem>
                
                <AccordionItem>
                    <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                    <AccordionBody accordionId="3">
                        <strong>This is the third item&#39;s accordion body.</strong>
                        You can modify any of this with custom CSS or overriding our default
                        variables. It&#39;s also worth noting that just about any HTML can
                        go within the <code>.accordion-body</code>, though the transition
                        does limit overflow.
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default FAQAccordian;
