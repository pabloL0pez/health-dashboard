import styles from './tooltip-dialog.module.css';

const DEFAULT_SPACING = 10;

interface DialogTooltipProps {
  message: string;
  anchorElement: HTMLElement | null;
  spacing?: number;
  useAnchorElementWidth?: boolean;
  className?: string;
}

const TooltipDialog = ({ message, anchorElement, spacing = DEFAULT_SPACING, useAnchorElementWidth = false }: Readonly<DialogTooltipProps>) => {
  const onTooltipDialogRefChange = (tooltipDialogElement: HTMLDivElement) => {
    if (tooltipDialogElement && anchorElement) {
      const anchorWidth = anchorElement.clientWidth;
      const { bottom, right } = anchorElement.getBoundingClientRect();

      tooltipDialogElement.style.left = `${right - anchorWidth}px`;
      tooltipDialogElement.style.top = `${bottom + spacing}px`;

      if (useAnchorElementWidth) {
        tooltipDialogElement.style.width = `${anchorWidth}px`;
      }
    }
  };

  return (
    <div className={styles.tooltipDialog} ref={onTooltipDialogRefChange}>
      <div className={styles.content} >
        <span>{message}</span>
      </div>
    </div>
  );
}

export default TooltipDialog;