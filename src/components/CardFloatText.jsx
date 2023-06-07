import './CardFloatText.css';

const CardFloatText = ({props}) => {
    const { imgSrc, title, text } = props;
    return (
        <div className="card-float-text-background" style={{backgroundImage: `url(${imgSrc})`}}>
            <div className="card-float-text-container">
                <div className="card-float-text">
                    <p>{text}</p>
                </div>
                <div className="card-float-title">
                    <span>{title}</span>
                </div>
            </div>
        </div>
    )
}

export default CardFloatText