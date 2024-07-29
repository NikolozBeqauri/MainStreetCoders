import style from "./ReusableButton.module.scss";

type Props = {
    title: string;
    disabled?: boolean;
    icon?: string;  
};

const ReusableButton = (props: Props) => {
    
    const classes = [style.container];

    if (props.disabled) classes.push(style.disabled);

    return (
        <button disabled={props.disabled} className={classes.join(" ").trim()}>
            {props.icon && <img src={`/icons/${props.icon}.svg`} alt="icon" />} 
            {props.title}
        </button>
    );
};

export default ReusableButton;
