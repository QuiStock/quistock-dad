import styled, { css } from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'

interface IDatagridComponent {
  isnotmobilefixed?: boolean
}

export const Wrapper = styled(DataGrid)<IDatagridComponent>(
  ({ theme, isnotmobilefixed }) => css`
    && {
      border: none;
      border-radius: ${theme.borderRadius.main};
      background-color: ${theme.colors.white};
      box-shadow: ${theme.boxShadow.main};
      font-family: ${theme.font.family.base};
      --DataGrid-rowBorderColor: ${theme.colors.lightGray3};
      --DataGrid-containerBackground: ${theme.colors.lightGray2};

      .MuiDataGrid-columnHeader {
        padding: 0 1.6rem;
      }

      .MuiDataGrid-columnHeaderTitle {
        font-size: ${theme.font.size.base};
        font-weight: 500;
        color: ${theme.font.colors.main};
      }

      .MuiDataGrid-cell {
        padding: 0 1.6rem;
        font-size: ${theme.font.size.base};
        color: ${theme.font.colors.title2};
        font-variant-numeric: tabular-nums;
      }

      .MuiDataGrid-row {
        transition: background-color ${theme.motion.hover} ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .MuiDataGrid-row:hover {
          background-color: ${theme.colors.brandTint};
        }
      }

      .MuiDataGrid-columnSeparator {
        color: ${theme.colors.lightGray3};
      }

      .MuiTablePagination-root,
      .MuiTablePagination-displayedRows,
      .MuiTablePagination-selectLabel,
      .MuiTablePagination-select {
        font-size: ${theme.font.size.base};
        color: ${theme.font.colors.main};
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
