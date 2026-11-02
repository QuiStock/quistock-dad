import { createContext, type ReactNode, use, useId, useState } from 'react'
import * as S from './styles'

import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { TabComponent } from '@/components/commom/TabComponent'

const getTabId = (baseId: string, index: number) => `${baseId}-tab-${index}`
const getPanelId = (baseId: string, index: number) =>
  `${baseId}-tabpanel-${index}`

const setFirstTabActive = (permissions: boolean[]): number => {
  const firstActive = permissions.findIndex((p) => p)
  return firstActive >= 0 ? firstActive : 0
}

interface ITabsContextProps {
  baseId: string
  tab: number
  permissionsArray: boolean[]
  setTab: (val: number) => void
}

interface IRootProps {
  children: ReactNode
  permissionsArray?: boolean[]
}

interface IListProps {
  children: ReactNode
  onReturnPage?: () => void
}

interface ITabProps {
  label: string
  index: number
  onClickOcurrence?: () => void
}

interface IPanelProps {
  children: ReactNode
  index: number
}

const TabsContext = createContext<ITabsContextProps | null>(null)

const Root = ({ children, permissionsArray = [true] }: IRootProps) => {
  const baseId = useId()
  const [tab, setTab] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const tabParam = searchParams.get('tab')

    if (tabParam) {
      const tabIndex = Number(tabParam)
      if (
        !isNaN(tabIndex) &&
        tabIndex >= 0 &&
        tabIndex < permissionsArray.length &&
        permissionsArray[tabIndex]
      ) {
        return tabIndex
      }
    }

    return setFirstTabActive(permissionsArray)
  })

  return (
    <TabsContext value={{ baseId, tab, permissionsArray, setTab }}>
      {children}
    </TabsContext>
  )
}

const List = ({ children, onReturnPage }: IListProps) => {
  const context = use(TabsContext)

  if (!context) {
    console.error('Tabs.List deve ser usado dentro de Tabs.Root')
    return null
  }

  const { tab } = context

  return (
    <S.WrapperTabs>
      {!!onReturnPage && (
        <IconButton aria-label="Voltar" onClick={onReturnPage}>
          <ArrowBack />
        </IconButton>
      )}

      <S.CustomTabs value={tab}>{children}</S.CustomTabs>
    </S.WrapperTabs>
  )
}

const Tab = ({ label, index, onClickOcurrence }: ITabProps) => {
  const context = use(TabsContext)

  if (!context) {
    console.error('Tabs.Tab deve ser usado dentro de Tabs.Root')
    return null
  }

  const { baseId, tab, setTab, permissionsArray } = context

  const handleChangeTab = () => {
    if (onClickOcurrence) onClickOcurrence()
    setTab(index)
  }

  return (
    <TabComponent
      label={label}
      onChange={handleChangeTab}
      disabled={!permissionsArray[index]}
      value={index}
      id={getTabId(baseId, index)}
      aria-controls={getPanelId(baseId, index)}
      aria-selected={tab === index}
    />
  )
}

const Panel = ({ children, index }: IPanelProps) => {
  const context = use(TabsContext)

  if (!context) {
    console.error('Tabs.Panel deve ser usado dentro de Tabs.Root')
    return null
  }

  const { baseId, tab, permissionsArray } = context

  return (
    <S.CustomTabPanel
      role="tabpanel"
      hidden={tab !== index}
      id={getPanelId(baseId, index)}
      aria-labelledby={getTabId(baseId, index)}
    >
      {tab === index && permissionsArray[index] && children}
    </S.CustomTabPanel>
  )
}

export const TabsCompoundComponent = {
  Root,
  List,
  Tab,
  Panel,
}
