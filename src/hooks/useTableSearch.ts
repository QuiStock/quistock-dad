import { useState, type ChangeEvent } from 'react'

import type { IPaginationModel } from '@/types'

const INITIAL_TABLE_STATE = {
  searchName: '',
  paginationModel: { page: 0, pageSize: 10 },
}

export const useTableSearch = () => {
  const [tableState, setTableState] = useState(INITIAL_TABLE_STATE)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchName = event.target.value
    setTableState((prev) => ({
      searchName,
      paginationModel: { ...prev.paginationModel, page: 0 },
    }))
  }

  const handlePaginationChange = (paginationModel: IPaginationModel) => {
    setTableState((prev) => ({ ...prev, paginationModel }))
  }

  return {
    searchName: tableState.searchName,
    paginationModel: tableState.paginationModel,
    handleSearchChange,
    handlePaginationChange,
  }
}
