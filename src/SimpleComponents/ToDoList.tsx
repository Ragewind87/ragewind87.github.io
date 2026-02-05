import { makeStyles } from '@fluentui/react-components';
import { navPanelColor } from 'src/constants';

export interface IToDoListProps {}

const ToDoList: React.FC<IToDoListProps> = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <h4 className={styles.listHeading}>
                Site{'  '}
                <span className={styles.todoSpan}>//todo</span>
                {'  '}
                List:
            </h4>
            <ul className={styles.list}>
                <li className={styles.listItemFirst}>Make the site mobile responsive (badly needed)</li>
                <li className={styles.listItem}>Make the left and right panel shown at all times</li>
                <li className={styles.listItem}>Add "Formal Education" section to the left panel</li>
                <li className={styles.listItem}>
                    Make skillset section tabular; add alternate "soft skillset" section
                </li>
            </ul>
            <h4 className={styles.stretchHeading}>Stretch Goals:</h4>
            <ul className={styles.stretchList}>
                <li className={styles.stretchListItem}>Add page describing Godot game I'm working on</li>
            </ul>
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: navPanelColor,
        alignContent: 'center',
        gap: '10px',
        paddingLeft: '0px',
        paddingTop: '30px',
        paddingRight: '20px',
        paddingBottom: '20px',
        border: '2px solid black',
        borderRadius: '5px',
        maxHeight: '60%',
    },
    listHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
    },
    todoSpan: {
        fontSize: '26px',
        fontWeight: 'bold',
        fontFamily: '"Courier New", Courier, monospace',
        color: '#6aff6a',
    },
    list: {
        fontSize: '16px',
        textAlign: 'left',
    },
    listItem: {
        lineHeight: '1.3',
        marginTop: '12px',
        fontSize: '15px',
    },
    listItemFirst: {
        lineHeight: '1.3',
        marginTop: '0px',
        fontSize: '15px',
    },
    stretchHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
        marginTop: '10px',
    },
    stretchList: {
        fontSize: '16px',
        textAlign: 'left',
    },
    stretchListItem: {
        lineHeight: '1.2',
        marginTop: '0px',
        fontSize: '15px',
    },
});

export default ToDoList;
