import styles from './access-card.module.css';
import Icon, { IconType } from '@/components/icon/icon';

interface AccessCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: IconType;
}

const AccessCard = ({ title, description, onClick: onClick = () => {}, icon }: Readonly<AccessCardProps>) => {
  return (
    <div className={styles.accessCard} onClick={onClick}>
      <h3 className={styles.title}>
        {icon && <Icon icon={icon} className={styles.icon}/>}
        &nbsp;{title}
      </h3>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

export default AccessCard;