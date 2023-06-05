import './CardFloatText.css';

const CardFloatText = (props) => {
    const { imgSrc, title, text } = props.props;
    return (
        <div className="card-float-text-background" style={{backgroundImage: `url(${imgSrc})`}}>
            {console.log({props})}
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