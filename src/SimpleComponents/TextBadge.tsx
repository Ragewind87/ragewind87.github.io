import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    badge: {
        display: 'inline-block',
        padding: '1px 8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: '500',
        border: '1px solid #7a7a7a',
        color: '#333',
        cursor: 'default',
        ':hover': {
            backgroundColor: 'rgb(179, 179, 179)',
            border: '1px solid #5a5a5a',
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
        },
    },
});

export interface ITextBadgeProps {
    children: React.ReactNode;
}

export const TextBadge: React.FC<ITextBadgeProps> = ({ children }) => {
    const classes = useStyles();
    return <span className={classes.badge}>{children}</span>;
};

export default TextBadge;
