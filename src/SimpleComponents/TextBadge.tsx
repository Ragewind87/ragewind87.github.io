import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    badge: {
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        fontSize: '12px',
        border: '1px solid rgb(122, 122, 122)',
        color: '#333',
        ':hover': {
            backgroundColor: '#d0d0d0',
            transition: 'background-color 0.2s ease',
        },
    },
});

export interface ITextBadgeProps {
    children: React.ReactNode;
}

export const TextBadge: React.FC<ITextBadgeProps> = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.badge}>{children}</div>;
};

export default TextBadge;
