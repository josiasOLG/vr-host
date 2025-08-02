# VR System - Microfrontend Host

Este é o sistema principal que orquestra os microfrontends do VR System. O projeto utiliza Next.js e Module Federation para integrar diferentes aplicações de forma independente.

## Arquitetura do Sistema

O sistema é composto por:

- **vr-host**: Aplicação principal que integra todos os microfrontends
- **vr-card**: Microfrontend responsável pelo catálogo de produtos
- **vr-header**: Microfrontend que gerencia o cabeçalho e carrinho de compras
- **vr-footer**: Microfrontend que renderiza o rodapé da aplicação

## Pré-requisitos

- Node.js v22.14.0 ou superior
- npm, yarn, pnpm ou bun

## Instalação Completa

Para instalar todas as dependências de todos os projetos de uma vez:

```bash
npm run install:all
```

Ou instale manualmente cada projeto:

```bash
# Instalar dependências do host
npm install

# Instalar dependências dos microfrontends
npm run install:card
npm run install:header
npm run install:footer
```

## Como Executar o Sistema

### Opção 1: Executar tudo simultaneamente (Recomendado)

```bash
npm run start:all
```

Este comando iniciará todos os serviços simultaneamente:

- Host: http://localhost:3000
- Card MFE: http://localhost:3001
- Header MFE: http://localhost:3002
- Footer MFE: http://localhost:3003

### Opção 2: Executar serviços individualmente

Se preferir ter controle individual sobre cada serviço:

```bash
# Terminal 1 - Host (deve ser o último a iniciar)
npm run dev

# Terminal 2 - Card MFE
npm run dev:card

# Terminal 3 - Header MFE
npm run dev:header

# Terminal 4 - Footer MFE
npm run dev:footer
```

**Importante**: Os microfrontends devem estar rodando antes do host para evitar erros de carregamento.

## Scripts Disponíveis

### Desenvolvimento

- `npm run dev` - Inicia apenas o host
- `npm run start:all` - Inicia todos os serviços
- `npm run dev:card` - Inicia apenas o microfrontend de produtos
- `npm run dev:header` - Inicia apenas o microfrontend do cabeçalho
- `npm run dev:footer` - Inicia apenas o microfrontend do rodapé

### Instalação

- `npm run install:all` - Instala dependências de todos os projetos
- `npm run install:card` - Instala dependências do card MFE
- `npm run install:header` - Instala dependências do header MFE
- `npm run install:footer` - Instala dependências do footer MFE

### Testes

- `npm run test` - Executa testes do host
- `npm run test:all` - Executa todos os testes de todos os projetos
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Gera relatório de cobertura

### Build e Deploy

- `npm run build` - Build da aplicação host
- `npm run start` - Inicia aplicação em modo produção

## Estrutura dos Portas

| Serviço    | Porta | URL                   |
| ---------- | ----- | --------------------- |
| Host       | 3000  | http://localhost:3000 |
| Card MFE   | 3001  | http://localhost:3001 |
| Header MFE | 3002  | http://localhost:3002 |
| Footer MFE | 3003  | http://localhost:3003 |

## Funcionalidades

- **Catálogo de Produtos**: Visualização de produtos com grid responsivo
- **Carrinho de Compras**: Adicionar, remover e gerenciar itens no carrinho
- **Interface Unificada**: Header e footer consistentes em toda aplicação
- **Carregamento Independente**: Cada microfrontend carrega de forma assíncrona

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Material-UI
- Module Federation
- Redux Toolkit (para gerenciamento de estado do carrinho)

## Desenvolvimento

Durante o desenvolvimento, você pode modificar qualquer microfrontend e ver as mudanças refletidas automaticamente no host. Cada aplicação mantém seu próprio hot-reload.

## Troubleshooting

### Erro de "Module not found"

Certifique-se de que todos os microfrontends estão rodando antes de iniciar o host.

### Porta já em uso

Se alguma porta estiver ocupada, você pode modificar no arquivo `next.config.mjs` de cada projeto.

### Problemas de CORS

Os microfrontends são configurados para aceitar requests do host. Se houver problemas, verifique as configurações de CORS nos arquivos de configuração.

## Deploy

Para deploy em produção, cada microfrontend deve ser deployado independentemente. Recomendamos usar a Vercel para facilitar o processo.

---

**Dica**: Use `npm run start:all` para uma experiência de desenvolvimento mais fluida, especialmente quando estiver trabalhando
