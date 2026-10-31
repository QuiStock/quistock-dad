import styled, { css } from 'styled-components'

export {
  DialogActions as BoxButtons,
  DialogDescription as Helper,
} from '@/components/commom/DialogModal'

export const FormContainer = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
)
