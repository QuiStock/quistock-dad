import type { ReactNode } from 'react'
import { Fade } from '@mui/material'

import theme from '@/styles/theme'
import * as S from './styles'

const ENTER_MS = parseInt(theme.motion.enter, 10)
const EXIT_MS = parseInt(theme.motion.exit, 10)

interface IDialogModalProps {
  open: boolean
  children: ReactNode
  labelledBy: string
  describedBy?: string
  role?: 'dialog' | 'alertdialog'
  size?: S.TDialogSize
  onClose?: () => void
  'data-testid'?: string
}

const DialogModal = ({
  open,
  children,
  labelledBy,
  describedBy,
  role = 'dialog',
  size = 'sm',
  onClose,
  'data-testid': testId,
}: IDialogModalProps) => (
  <S.StyledModal
    open={open}
    onClose={onClose}
    closeAfterTransition
    data-testid={testId}
  >
    <Fade
      in={open}
      timeout={{ enter: ENTER_MS, exit: EXIT_MS }}
      easing={{ enter: theme.motion.easeOut, exit: theme.motion.easeOut }}
    >
      <S.Surface
        $size={size}
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        {children}
      </S.Surface>
    </Fade>
  </S.StyledModal>
)

const DialogTitle = S.Title
const DialogDescription = S.Description
const DialogHeader = S.Header
const DialogBody = S.Body
const DialogActions = S.Actions

export {
  DialogModal,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
}
