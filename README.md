# Quistock DAD

Frontend web do Quistock, desenvolvido com React, TypeScript e Vite.

## Requisitos

- Node.js 22
- npm 12 ou compatível com o `package-lock.json`

## Preparação do ambiente

Instale exatamente as dependências registradas no lockfile e configure os hooks do Git:

```bash
npm ci
npm run hooks:install
```

Se `make` estiver disponível, use `make prepare-environment`.

## Comandos

| Comando                 | Objetivo                                                |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Inicia o servidor de desenvolvimento                    |
| `npm run build`         | Valida os tipos e gera o bundle de produção             |
| `npm run typecheck`     | Valida os tipos sem emitir arquivos                     |
| `npm run lint`          | Executa as regras TypeScript, React e de acessibilidade |
| `npm run lint:fix`      | Corrige automaticamente violações compatíveis           |
| `npm run format`        | Formata os arquivos com Prettier                        |
| `npm run format:check`  | Verifica a formatação sem alterar arquivos              |
| `npm run code-smell`    | Analisa complexidade e code smells                      |
| `npm test`              | Executa testes unitários, de componente e integração    |
| `npm run test:watch`    | Executa o Vitest em modo interativo                     |
| `npm run test:coverage` | Executa os testes e valida a cobertura                  |
| `npm run test:e2e`      | Executa smoke tests no Chromium                         |
| `npm run validate`      | Executa as validações locais principais                 |
| `npm run hooks:install` | Instala o hook `pre-push`                               |

Antes do primeiro E2E, instale o navegador e gere o bundle:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

## Organização dos testes

`src/` contém somente código produtivo. Testes, mocks e dados ficam separados:

```text
tests/
├── components/   # comportamento dos componentes React
├── e2e/          # smoke tests no bundle de produção
├── fixtures/     # respostas determinísticas da API
├── integration/  # integração entre fronteiras da aplicação
├── mocks/        # handlers e servidor do Mock Service Worker
└── setup/        # preparação global do Vitest
```

Os testes devem verificar resultados observáveis. Evite assertions sobre estado interno,
implementação de hooks, classes CSS ou snapshots extensos.

## Imports internos

O projeto usa aliases para evitar caminhos relativos longos:

| Alias     | Destino   | Uso                                    |
| --------- | --------- | -------------------------------------- |
| `@/*`     | `src/*`   | Código produtivo                       |
| `@test/*` | `tests/*` | Fixtures, mocks e utilitários de teste |

Use caminhos relativos para arquivos do mesmo módulo e aliases quando o import atravessar
diretórios. Dependências externas continuam usando o nome do pacote:

```ts
import App from '@/pages/App'
import { healthyApiResponse } from '@test/fixtures/health'
import { describe, expect, it } from 'vitest'
import './App.css'
```

Não crie aliases para cada diretório. Um novo alias deve representar uma fronteira estável
do projeto e ser configurado tanto no TypeScript quanto na ferramenta que executa o código.

## API externa nos testes

Os testes automatizados não acessam a API externa real. Requisições HTTP são
interceptadas pelo [Mock Service Worker](https://mswjs.io/), com respostas
determinísticas em `tests/fixtures` e `tests/mocks`.

O servidor usa `onUnhandledRequest: 'error'`. Qualquer requisição sem handler explícito
falha, impedindo dependência acidental de rede, credenciais ou disponibilidade externa.

Ao adicionar uma integração HTTP:

1. mantenha o cliente e os contratos produtivos em `src/`;
2. adicione fixtures representativas em `tests/fixtures`;
3. adicione handlers de sucesso e erro em `tests/mocks`;
4. cubra sucesso, resposta vazia, erro HTTP e falha de rede;
5. nunca armazene tokens ou dados reais nas fixtures.

Os E2E obrigatórios também devem controlar dependências externas. Uma suíte futura contra
staging deve usar workflow e secrets separados, sem integrar o gate determinístico de PRs.

## Cobertura

`npm run test:coverage` usa o provider V8 e aplica limites globais bloqueantes:

| Métrica    | Mínimo |
| ---------- | -----: |
| Linhas     |    80% |
| Statements |    80% |
| Funções    |    80% |
| Branches   |    70% |

Os relatórios são gerados em `coverage/` nos formatos texto, JSON summary, HTML e LCOV.
O comando e o CI falham quando qualquer limite não é alcançado.

Somente bootstrap e declarações são excluídos. Não adicione exclusões para ocultar código
sem teste; qualquer nova exclusão precisa ser justificada no pull request.

## Hook pre-push

O Lefthook executa estas validações sequencialmente antes de cada push:

1. `npm run format:check`;
2. `npm run lint`;
3. `npm run code-smell`.

O hook apenas valida e não altera arquivos. Testes, cobertura, build e E2E permanecem no
pipeline completo para não tornar o push local excessivamente lento.

## Integração contínua

O workflow `.github/workflows/ci.yaml` roda em pull requests, pushes para `main` e execução
manual. Todos os jobs usam Node.js 22, `npm ci`, cache npm, Ubuntu 24.04 e timeout explícito.

| Job                      | Validação                               |
| ------------------------ | --------------------------------------- |
| Build                    | Bundle de produção                      |
| Lint and formatting      | ESLint e Prettier                       |
| Type checks              | Contratos TypeScript                    |
| Code smell analysis      | SonarJS, complexidade e relatório SARIF |
| Unit and component tests | Vitest, Testing Library e JUnit         |
| Test coverage validation | Thresholds obrigatórios e HTML/LCOV     |
| End-to-end smoke tests   | Playwright sobre o bundle de produção   |

Relatórios, cobertura, code smells, traces e screenshots são publicados como artefatos por
sete dias. Os uploads usam `always()` para preservar evidências mesmo em caso de falha.

Para reproduzir os gates:

```bash
npm ci
npm run validate
npm run test:e2e
```

Se apenas um job falhar, execute localmente o comando correspondente antes de repetir o CI.
