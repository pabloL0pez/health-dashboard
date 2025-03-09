import styles from './text-button.module.css';
import { Button, ButtonProps } from "@/components/buttons/button";

type TextButtonProps = ButtonProps;

export const TextButton = ({children, testId, className = '', onClick}: Readonly<TextButtonProps>) => {
  return (
    <Button
      testId={testId}
      className={`${styles.textButton} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}