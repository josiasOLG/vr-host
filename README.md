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
- Git

## Instalação Inicial

### 1. Clonar todos os repositórios

Para que o sistema funcione corretamente, todos os projetos devem estar na mesma pasta raiz. Execute os comandos abaixo para clonar todos os repositórios:

```bash
# Criar pasta principal do projeto
mkdir VR
cd VR

# Clonar todos os repositórios
git clone https://github.com/josiasOLG/vr-host.git
git clone https://github.com/josiasOLG/vr-card.git
git clone https://github.com/josiasOLG/vr-header.git
git clone https://github.com/josiasOLG/vr-footer.git
```

### 2. Estrutura de pastas esperada

Após clonar todos os repositórios, sua estrutura de pastas deve ficar assim:

```
VR/
├── vr-host/
├── vr-card/
├── vr-header/
└── vr-footer/
```

⚠️ **Importante**: Esta estrutura é obrigatória para o correto funcionamento do Module Federation entre os microfrontends.

### 3. Instalar dependências

Entre na pasta do host e instale as dependências de todos os projetos:

```bash
cd vr-host
npm run install:all
```

Ou instale manualmente cada projeto:

```bash
# Instalar dependências do host
cd vr-host
npm install

# Instalar dependências dos microfrontends
cd ../vr-card
npm install

cd ../vr-header
npm install

cd ../vr-footer
npm install
```

## Como Executar o Sistema

### Opção 1: Executar tudo simultaneamente (Recomendado)

```bash
# Na pasta vr-host
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
# Terminal 1 - Card MFE
cd vr-card
npm run dev

# Terminal 2 - Header MFE
cd vr-header
npm run dev

# Terminal 3 - Footer MFE
cd vr-footer
npm run dev

# Terminal 4 - Host (deve ser o último a iniciar)
cd vr-host
npm run dev
```

**Importante**: Os microfrontends devem estar rodando antes do host para evitar erros de carregamento.

## Scripts Disponíveis (executar na pasta vr-host)

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

## Estrutura das Portas

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

Certifique-se de que:
1. Todos os repositórios foram clonados na mesma pasta raiz
2. Todos os microfrontends estão rodando antes de iniciar o host
3. A estrutura de pastas está correta

### Porta já em uso

Se alguma porta estiver ocupada, você pode modificar no arquivo `next.config.mjs` de cada projeto.

### Problemas de CORS

Os microfrontends são configurados para aceitar requests do host. Se houver problemas, verifique as configurações de CORS nos arquivos de configuração.

### Erro ao executar scripts npm

Se você estiver enfrentando problemas com os scripts `npm run install:all` ou `npm run start:all`, certifique-se de que está executando os comandos na pasta `vr-host` e que todos os repositórios foram clonados corretamente.

## Deploy

Para deploy em produção, cada microfrontend deve ser deployado independentemente. Recomendamos usar a Vercel para facilitar o processo.

## Repositórios do Projeto

- **Host**: https://github.com/josiasOLG/vr-host.git
- **Card MFE**: https://github.com/josiasOLG/vr-card.git
- **Header MFE**: https://github.com/josiasOLG/vr-header.git
- **Footer MFE**: https://github.com/josiasOLG/vr-footer.git

---

**Dica**: Use `npm run start:all` para uma experiência de desenvolvimento mais fluida, especialmente quando estiver trabalhando com múltiplos microfrontends
