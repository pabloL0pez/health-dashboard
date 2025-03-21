import styles from './button.module.css';

export interface ButtonProps {
  testId: string;
  label?: string;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const Button = ({ testId, label, children, onClick, className, ariaLabel, disabled }: Readonly<ButtonProps>) => {
  const handleOnClick = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    onClick();
  }

  return (
    <button
      data-testid={testId}
      className={`${className} ${styles.button}`}
      onClick={handleOnClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {label && <span>{label}</span>}
      {children}
    </button>
  );
}