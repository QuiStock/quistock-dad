# Otimizações e validação com React Profiler

As memoizações mantidas têm alvos observáveis:

- `ManagersPartial` mantém as linhas derivadas e as definições de colunas do DataGrid
  estáveis para que uma abertura de modal ou mudança de loading não force novo processamento
  nem reinicialize estado interno de colunas.
- `useManagerForm` refaz a filtragem de gerentes substitutos somente quando muda a coleção,
  filial, gerente editado ou status de desativação.
- `AuthProvider` mantém estável o objeto do Context enquanto os valores de autenticação não
  mudam, evitando atualizações dos consumidores por renders não relacionados do Provider.
- `useManagers` mantém estável o callback de sucesso enquanto o callback de fechamento e o
  `QueryClient` não mudam, evitando recriar handlers das mutações sem alteração de dependências.

Para confirmar o ganho na apresentação, registre no React DevTools Profiler uma interação
de abertura/fechamento do modal de gerente e uma edição de status/filial. Compare o commit
com o perfil "Record why each component rendered" ativado; confira se a lista de opções não
é recalculada para mudanças sem relação e se o DataGrid mantém o estado de colunas. Esta
verificação manual ainda precisa ser feita em um navegador com React DevTools; não são
incluídos tempos ou ganhos não medidos.
