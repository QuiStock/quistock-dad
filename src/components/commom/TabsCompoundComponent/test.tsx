import { renderWithTheme } from '@/utils/__tests__/helpers'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { TabsCompoundComponent } from './index'
import { describe, it, expect, vi } from 'vitest'

describe('<TabsCompoundComponent />', () => {
  it('renders tabs and shows correct content when clicked', async () => {
    renderWithTheme(
      <TabsCompoundComponent.Root permissionsArray={[true, true]}>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label="Aba 1" index={0} />
          <TabsCompoundComponent.Tab label="Aba 2" index={1} />
        </TabsCompoundComponent.List>

        <TabsCompoundComponent.Panel index={0}>
          <p>Conteúdo da aba 1</p>
        </TabsCompoundComponent.Panel>
        <TabsCompoundComponent.Panel index={1}>
          <p>Conteúdo da aba 2</p>
        </TabsCompoundComponent.Panel>
      </TabsCompoundComponent.Root>,
    )

    expect(screen.getByText('Conteúdo da aba 1'))

    fireEvent.click(screen.getByText('Aba 2'))

    await waitFor(() => {
      expect(screen.getByText('Conteúdo da aba 2'))
    })
  })

  it('disables tabs based on permissions', () => {
    renderWithTheme(
      <TabsCompoundComponent.Root permissionsArray={[true, false]}>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label="Aba 1" index={0} />
          <TabsCompoundComponent.Tab label="Aba 2" index={1} />
        </TabsCompoundComponent.List>
      </TabsCompoundComponent.Root>,
    )

    const tabs = screen.getAllByRole('tab')
    expect(tabs[0])
    expect(tabs[1])
  })

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TabsCompoundComponent.Root permissionsArray={[true]}>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab
            label="Aba unica"
            index={0}
            onClickOcurrence={onChange}
          />
        </TabsCompoundComponent.List>
      </TabsCompoundComponent.Root>,
    )

    fireEvent.click(screen.getByText('Aba unica'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
