import { type DataGridProps } from '@mui/x-data-grid'
import { ptBR } from '@mui/x-data-grid/locales'
import * as S from './styles'

interface IDatagridComponent extends DataGridProps {
  isNotMobileFixed?: boolean
}

const DatagridComponent = (props: IDatagridComponent) => (
  <S.Wrapper
    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
    isnotmobilefixed={props.isNotMobileFixed}
    {...props}
  />
)

export { DatagridComponent }
