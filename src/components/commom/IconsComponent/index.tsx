import { type ReactNode } from 'react'
import * as S from './styles'

import { type IIconSize } from '@/components/commom/IconsComponent/icons/types'
import Award from './icons/Award'
import Briefcase from './icons/Briefcase'
import Calendar from './icons/Calendar'
import Description from './icons/Description'
import Empty from './icons/Empty'
import FileCoffee from './icons/File-coffee'
import FolderAdd from './icons/Folder-add'
import FolderError from './icons/Folder-error'
import Hourglass from './icons/Hourglass'
import OpsExclamation from './icons/Ops-exclamation'
import TargetSuccess from './icons/Target-success'
import VideoCall from './icons/VideoCall'
import PDFBox from './icons/PDFBox'
import ExcelFile from './icons/ExcelFile'
import PresentationFile from './icons/PresentationFile'
import DocumentFile from './icons/DocumentFile'
import IconByBusiness from './icons/IconByBusiness'
import IconByCourse from './icons/IconByCourse'
import IconByPerson from './icons/IconByPerson'
import IconByTrail from './icons/IconByTrail'
import type { JSX } from '@emotion/react/jsx-runtime'

type TIcon =
  | 'Award'
  | 'Briefcase'
  | 'Calendar'
  | 'Description'
  | 'Empty'
  | 'FileCoffee'
  | 'FolderAdd'
  | 'FolderError'
  | 'Hourglass'
  | 'OpsExclamation'
  | 'TargetSuccess'
  | 'VideoCall'
  | 'PDFBox'
  | 'ExcelFile'
  | 'PresentationFile'
  | 'DocumentFile'
  | 'IconByBusiness'
  | 'IconByCourse'
  | 'IconByPerson'
  | 'IconByTrail'

interface IIconsComponentProps extends Partial<IIconSize> {
  type: TIcon
  direction?: 'row' | 'column'
  children?: ReactNode
  align?: 'center' | 'start' | 'end'
  fitContent?: boolean
}

const IconsComponent = ({
  type,
  size = 'big',
  direction = 'row',
  children,
  align,
  fitContent,
}: IIconsComponentProps) => {
  const icons: Record<TIcon, ({ size }: IIconSize) => JSX.Element> = {
    Award,
    Briefcase,
    Calendar,
    Empty,
    Description,
    FileCoffee,
    FolderAdd,
    FolderError,
    Hourglass,
    OpsExclamation,
    TargetSuccess,
    VideoCall,
    PDFBox,
    ExcelFile,
    PresentationFile,
    DocumentFile,
    IconByBusiness,
    IconByCourse,
    IconByPerson,
    IconByTrail,
  }

  return (
    <S.Wrapper
      direction={direction ? direction : 'row'}
      fitContent={fitContent}
    >
      {icons[type]({ size })}

      {!!children && <S.BoxContent align={align}>{children}</S.BoxContent>}
    </S.Wrapper>
  )
}

export { IconsComponent }
export type { TIcon }
