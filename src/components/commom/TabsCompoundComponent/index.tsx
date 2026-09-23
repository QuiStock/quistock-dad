import { createContext, type ReactNode, use, useState } from 'react'
import * as S from './styles'

import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { TabComponent } from '@/components/commom/TabComponent'

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

const setFirstTabActive = (permissions: boolean[]): number => {
  const firstActive = permissions.findIndex((p) => p)
  return firstActive >= 0 ? firstActive : 0
}

interface ITabsContextProps {
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
    <TabsContext value={{ tab, permissionsArray, setTab }}>
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
        <IconButton onClick={onReturnPage}>
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

  const { setTab, permissionsArray } = context

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
      {...a11yProps(index)}
    />
  )
}

const Panel = ({ children, index }: IPanelProps) => {
  const context = use(TabsContext)

  if (!context) {
    console.error('Tabs.Panel deve ser usado dentro de Tabs.Root')
    return null
  }

  const { tab, permissionsArray } = context

  return (
    <S.CustomTabPanel
      role="tabpanel"
      hidden={tab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
