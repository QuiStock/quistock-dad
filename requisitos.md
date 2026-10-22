Mínimo para o 7,0:
Projeto criado com Vite e template React TypeScript — todos os arquivos dentro de src/ com extensão .tsx ou .ts; proibido .js ou .jsx dentro de src/;

Componentes em src/components/ e páginas em src/pages/, cada um em pasta própria com index.tsx — convenção aplicada consistentemente em todo o projeto;

Mínimo de 6 componentes com responsabilidade única — nenhum componente mistura renderização, lógica de negócio ou acesso a src/services/;

Interfaces TypeScript para props de todos os componentes e entidades do domínio em src/types/, organizadas por arquivo de domínio proibido any em src/;

Toda comunicação com API externa isolada em src/services/, com arquivos por recurso, retorno tipado Promise e try/catch — proibido fetch em componentes ou páginas; chaves e URLs privadas em variáveis de ambiente, nunca versionadas;

Estado local gerenciado com useState, campos relacionados agrupados em um único objeto — proibida mutação direta de arrays e objetos;

useEffect com array de dependências explícito e correto — o avaliador verificará removendo uma dependência ao vivo e observando se o comportamento muda;

Listas dinâmicas renderizadas com key de identificador único do dado — proibido key={index} em listas com adição, remoção ou reordenação;

Parâmetros de rota recuperados com useParams com verificação de presença antes do uso — proibido acessar parâmetro sem tratar undefined;

Mínimo de três rotas com React Router, navegação via ou useNavigate — proibido window.location.href; rota curinga path="*" com página de erro e botão de retorno;

Acessibilidade mínima seguindo WCAG 2.1 nível AA: para todas as ações — proibido ; associado a cada via htmlFor; imagens com alt descritivo ou alt="" quando decorativas; contraste mínimo de 4,5:1 para texto normal e 3:1 para texto grande; erros no DOM com role="alert"; aplicação integralmente operável por teclado com foco visível em todos os elementos interativos — testado ao vivo sem mouse na apresentação;

Feedback visual para operações assíncronas com três estados no DOM: carregando (spinner, skeleton ou aria-live), sucesso e erro — proibido alert() e console.log como único tratamento;

Aplicação publicada em Vercel ou GitHub Pages com link no README.md — acessada ao vivo na apresentação;

Mínimo de 20 commits no padrão Conventional Commits (feat:, fix:, refactor:, docs:) cobrindo ao menos 4 semanas de desenvolvimento — proibidos commits genéricos.

Extra:
Context API com Provider dedicado, hook customizado de consumo e tipagem completa — grupo demonstra oralmente o problema de prop drilling resolvido, apontando no código;

useReducer com State e Action tipados em union types — grupo demonstra oralmente por que não múltiplos useState, apontando a complexidade real do estado;

Hook customizado com retorno tipado, estado de loading, erro tratado e cancelamento via AbortController para evitar atualização de estado em componente desmontado;

React.lazy e Suspense por página — demonstrado ao vivo na aba Network do DevTools no carregamento inicial de cada rota;

localStorage com schema versionado — campo _versao no objeto salvo, verificação ao carregar e migração ou descarte seguro em caso de incompatibilidade de versão;

useCallback e useMemo com justificativa de performance — avaliador comenta a otimização ao vivo e grupo demonstra a diferença no React DevTools Profiler;

Proteção contra XSS: proibido dangerouslySetInnerHTML com dados externos; todo conteúdo dinâmico via interpolação JSX {variavel} — grupo demonstra no código onde dados externos são tratados antes de renderizados;

Validação e sanitização de formulários: campos com tipo, tamanho máximo e mensagem de erro específica por campo em src/utils/ — nenhum dado enviado ao serviço sem passar por função de validação tipada;

Rotas privadas com componente PrivateRoute que redireciona para login quando não autenticado — estado de autenticação via Context, nunca verificado diretamente no componente de página;

Acessibilidade avançada seguindo WCAG 2.1 nível AA completo: componentes interativos complexos (modais, menus, abas) implementados com padrões ARIA corretos (aria-expanded, aria-controls, aria-haspopup, aria-selected) e gerenciamento de foco programático — foco movido para o elemento correto ao abrir e devolvido ao elemento de origem ao fechar; landmarks semânticos (, , , ) estruturando todas as páginas; grupo demonstra ao vivo navegação com leitor de tela (NVDA ou VoiceOver) sem perda de contexto ou armadilha de foco.
