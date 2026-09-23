import styled, { css } from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'

interface IDatagridComponent {
  isnotmobilefixed?: boolean
}

export const Wrapper: any = styled(DataGrid)<IDatagridComponent>(
  ({ theme, isnotmobilefixed }) => css`
    && {
      box-shadow: ${theme.boxShadow.main};

      .MuiDataGrid-columnHeaderTitle {
        font-weight: 700;
        font-size: ${theme.font.size.body1};
        color: ${theme.font.colors.main};
      }

      .MuiTablePagination-displayedRows,
      .MuiTablePagination-selectLabel {
        font-size: ${theme.font.size.medium};
      }

      ${
        !isnotmobilefixed &&
        css`
          .MuiDataGrid-columnHeader,
          .MuiDataGrid-cell {
            @media (max-width: ${theme.screen.small}) {
              min-width: 16rem !important;
            }
          }
        `
      }
    }
  `,
)
