import styles from './LoadingIcons.module.css';

interface LoadingIconProps {
    size: number;
    thickness: number;
}

const LoadingIcon = (props: LoadingIconProps) => {
    const divStyle = {
        border: `${props.thickness}px solid #eee`,
        borderLeft: `${props.thickness}px solid teal`,
        width: `${props.size}px`,
        height: `${props.size}px`,
    };
    return <div style={divStyle} className={styles.loading} />;
};

LoadingIcon.defaultProps = {
    size: 25,
    thickness: 3,
};

export default LoadingIcon;
