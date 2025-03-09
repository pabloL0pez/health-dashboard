import styles from './pill-button.module.css';
import { Button, ButtonProps } from "@/components/buttons/button";

interface PillButtonProps extends ButtonProps {
  isSelected: boolean;
}

export const PillButton = ({ children, testId, className, isSelected, onClick }: Readonly<PillButtonProps>) => {
  return (
    <Button
      testId={testId}
      className={`${styles.pillButton} ${isSelected ? styles.selected : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}