import Icon, { IconType } from "@/components/icon/icon";
import styles from './icon-button.module.css';
import { Button, ButtonProps } from "@/components/buttons/button";

interface IconButtonProps extends ButtonProps {
  icon: IconType;
}

export const IconButton = ({ testId, icon, onClick }: Readonly<IconButtonProps>) => {
  return (
    <Button
      testId={testId}
      className={styles.iconButton}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </Button>
  );
}