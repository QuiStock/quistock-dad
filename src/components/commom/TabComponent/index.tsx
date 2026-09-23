import * as S from './styles'

import type { TabProps } from '@mui/material'

const TabComponent = (props: TabProps) => {
  if (!props.disabled) return <S.Wrapper {...props} />

  return (
    <div>
      <S.Wrapper {...props} />
    </div>
  )
}

export { TabComponent }
