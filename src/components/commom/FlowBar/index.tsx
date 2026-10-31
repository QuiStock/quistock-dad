import * as S from './styles'

export interface IFlowBarItem {
  id: string
  label: string
  value: number | string
  percentage: number
  color: string
  detail?: string
}

const FlowBarList = ({ items }: { items: IFlowBarItem[] }) => (
  <S.List>
    {items.map((item) => (
      <S.Item key={item.id}>
        <S.Header>
          <span>{item.label}</span>
          <strong>
            {item.value}
            {item.detail && <small>{item.detail}</small>}
          </strong>
        </S.Header>
        <S.Track aria-hidden="true">
          <S.Fill $percentage={item.percentage} $color={item.color} />
        </S.Track>
      </S.Item>
    ))}
  </S.List>
)

export { FlowBarList }
