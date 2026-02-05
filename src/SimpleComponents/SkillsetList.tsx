import { makeStyles } from '@fluentui/react-components';
import TextBadge from './TextBadge';
import { Stack } from '@fluentui/react';
import { useWindowWidth } from 'src/Hooks/useWindowWidth';
import LastUpdated from './LastUpdated';

const SkillsetList: React.FC = () => {
    const styles = useStyles();
    const { isMobile } = useWindowWidth();

    return (
        <Stack style={{ justifyContent: 'space-between', height: '100%' }}>
            <div className={styles.skillsetContainer}>
                <strong className={styles.skillsetTitle}>Technical Skillset</strong>
                <strong className={styles.badgeHeading}>Strong</strong>
                <div className={styles.badgeContainer}>
                    <TextBadge>React</TextBadge>
                    <TextBadge>TypeScript</TextBadge>
                    <TextBadge>C#</TextBadge>
                    <TextBadge>.NET OData WebAPI</TextBadge>
                </div>
                <strong className={styles.badgeHeading}>Proficient</strong>
                <div className={styles.badgeContainer}>
                    <TextBadge>SQL Server</TextBadge>
                    <TextBadge>Git</TextBadge>
                    <TextBadge>Async patterns</TextBadge>
                </div>
                <strong className={styles.badgeHeading}>Experienced</strong>
                <div className={styles.badgeContainer}>
                    <TextBadge>Redux Toolkit</TextBadge>
                    <TextBadge>CSS</TextBadge>
                    <TextBadge>Javascript</TextBadge>
                    <TextBadge>Responsive Design</TextBadge>
                </div>
                {!isMobile && (
                    <>
                        <strong className={styles.badgeHeading}>Familiar</strong>
                        <div className={styles.badgeContainer}>
                            <TextBadge>Azure DevOps</TextBadge>
                            <TextBadge>Cosmos DB</TextBadge>
                            <TextBadge>C</TextBadge>
                            <TextBadge>Java</TextBadge>
                            <TextBadge>Vite</TextBadge>
                            <TextBadge>Jest</TextBadge>
                        </div>
                        <strong className={styles.badgeHeading}>Exposure to</strong>
                        <div className={styles.badgeContainer}>
                            <TextBadge>Python</TextBadge>
                            <TextBadge>Stripe</TextBadge>
                            <TextBadge>Storybook</TextBadge>
                            <TextBadge>Kubernetes</TextBadge>
                            <TextBadge>Terraform</TextBadge>
                            <TextBadge>Databricks</TextBadge>
                            <TextBadge>Mongo DB</TextBadge>
                            <TextBadge>React Testing Library</TextBadge>
                        </div>
                    </>
                )}
            </div>
            {!isMobile && <LastUpdated />}
        </Stack>
    );
};

const badgeHeadingColor = 'rgb(151, 177, 133)';

const useStyles = makeStyles({
    skillsetContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        textAlign: 'left',
        overflow: 'hidden',
    },
    skillsetTitle: {
        textAlign: 'center',
        fontSize: '20px',
    },
    badgeHeading: {
        fontSize: '15px',
        color: badgeHeadingColor,
        fontWeight: 600,
        margin: '12px 0 4px 0',
    },
    badgeContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '3px',
    },
});

export default SkillsetList;
