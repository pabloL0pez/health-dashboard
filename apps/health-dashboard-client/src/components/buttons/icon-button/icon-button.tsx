import Icon, { IconType } from "@/components/icon/icon";
import styles from './icon-button.module.css';
import { Button, ButtonProps } from "@/components/buttons/button";

interface IconButtonProps extends ButtonProps {
  icon: IconType;
}

export const IconButton = ({ icon, ...props }: Readonly<IconButtonProps>) => {
  return (
    <Button
      {...props}
      className={styles.iconButton}
    >
      <Icon icon={icon} />
    </Button>
  );
}