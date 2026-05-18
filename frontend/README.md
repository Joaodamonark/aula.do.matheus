# Frontend - App de Venda de Carros

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── AdminSections/          # Componentes das seções admin
│   │   │   ├── UserManagement.jsx  # Gerenciamento de usuários
│   │   │   ├── CarManagement.jsx   # Gerenciamento de carros
│   │   │   ├── SalesReports.jsx    # Relatório de vendas
│   │   │   ├── ReviewsModeration.jsx # Moderação de avaliações
│   │   │   └── AdminSections.css   # Estilos compartilhados
│   │   ├── Header.jsx              # Header principal
│   │   ├── Header.css
│   │   ├── SearchBar.jsx           # Barra de busca
│   │   ├── SearchBar.css
│   │   ├── CarCard.jsx             # Card de carro
│   │   ├── CarCard.css
│   │   ├── AdminHeader.jsx         # Header admin
│   │   ├── AdminHeader.css
│   │   ├── AdminNavigation.jsx     # Navegação admin
│   │   └── AdminNavigation.css
│   ├── pages/
│   │   ├── Home/                   # Página inicial
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   └── Admin/                  # Página admin
│   │       ├── Admin.jsx
│   │       └── Admin.css
│   ├── services/
│   │   └── firebaseService.js      # Integração com Firebase
│   ├── styles/                     # Estilos globais
│   ├── App.jsx                     # Componente raiz
│   └── index.js                    # Ponto de entrada
├── public/
├── package.json
└── README.md

```

## Componentes Principais

### 1. **Home (Página Inicial)**
- Exibe lista de carros disponíveis
- Barra de busca com filtros (marca, modelo, preço, ano)
- Grid responsivo (1 coluna mobile, 2 tablets, 3+ desktops)
- Cards com informações do carro

### 2. **Admin (Painel Administrativo)**
- Verificação de acesso (somente admin)
- Navegação entre seções
- Gerenciamento de usuários
- Gerenciamento de carros
- Relatório de vendas
- Moderação de avaliações

## Design Mobile First

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Princípios
- Layouts fluidos e flexíveis
- Imagens otimizadas
- Botões com tamanho adequado para toque (44px mín)
- Fonte mínima de 14px

## Tecnologias

- **React 18+**: Framework principal
- **Firebase**: Autenticação, Firestore, Storage
- **CSS3**: Responsive design com media queries
- **JavaScript ES6+**: Lógica da aplicação

## Instalação

```bash
# Instalar dependências
npm install

# Variáveis de ambiente (.env)
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx

# Executar em desenvolvimento
npm start
```

## Funcionalidades

### Página Home
- ✅ Listagem de carros com filtros
- ✅ Busca por marca, modelo, preço e ano
- ✅ Cards responsivos
- ✅ Design mobile first

### Painel Admin
- ✅ Gerenciar usuários (suspender/bloquear)
- ✅ Gerenciar carros
- ✅ Relatório de vendas com estatísticas
- ✅ Moderação de avaliações
- ✅ Verificação de acesso admin

## Próximos Passos

- [ ] Implementar roteamento (React Router)
- [ ] Criar página de autenticação (login/registro)
- [ ] Criar página de detalhes do carro
- [ ] Criar página do perfil do usuário
- [ ] Implementar carrinho de compras
- [ ] Adicionar sistema de notificações
- [ ] Otimizar imagens e lazy loading
- [ ] Adicionar testes unitários
- [ ] Melhorar acessibilidade (a11y)

