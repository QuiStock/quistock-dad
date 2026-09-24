import styled, { css } from 'styled-components'

interface IImg {
  src: string
  alt: string
}

export const Logo = styled('img')<IImg>(
  () => css`
    && {
      width: 25rem;
      height: auto;
      margin-top: 1rem;
    }
  `,
)
