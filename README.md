# Estrutura do Repositório - App de Venda de Carros

## 📁 Organização Geral

```
aula.do.matheus/
├── regras/                      # Documentação das regras do negócio
│   ├── REGRAS.md               # Regras principais do app
│   ├── ESPECIFICACAO_TECNICA.md # Stack tecnológico
│   └── FIREBASE_CONFIG.md      # Configuração do Firebase
│
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas (Home, Admin)
│   │   ├── services/            # Serviços (Firebase)
│   │   ├── styles/              # CSS global
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/                     # API Node.js + Express
│   ├── app/
│   │   ├── routes/              # Endpoints da API
│   │   ├── controllers/         # Lógica de controle
│   │   ├── models/              # Modelos de dados
│   │   └── middleware/          # Middlewares
│   ├── config/                  # Configurações
│   ├── tests/                   # Testes
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── README.md                    # Este arquivo
└── .gitignore
```

## 🚀 Progresso de Implementação

### ✅ Concluído
- [x] Criar estrutura de pastas (frontend e backend)
- [x] Documentação das regras de negócio
- [x] Especificação técnica (React + Mobile First)
- [x] Configuração do Firebase
- [x] Página Home com listagem de carros
- [x] Painel Administrativo com 4 seções
- [x] Componentes reutilizáveis (Header, CarCard, SearchBar)
- [x] Serviço de integração Firebase
- [x] Design Mobile First (CSS responsivo)

### 🔄 Em Andamento
- [ ] Implementar roteamento completo
- [ ] Criar páginas de autenticação
- [ ] Implementar API backend

### ⏳ Próximas Etapas
- [ ] Página de detalhes do carro
- [ ] Sistema de carrinho/compra
- [ ] Perfil do usuário
- [ ] Histórico de compras
- [ ] Sistema de mensagens
- [ ] Notificações
- [ ] Testes e CI/CD

## 📱 Funcionalidades Implementadas

### Frontend
- **Home**: Listagem de carros com filtros, design responsivo
- **Admin Dashboard**: 
	- Gerenciar usuários
	- Gerenciar carros
	- Relatório de vendas
	- Moderação de avaliações

### Serviços
- Integração com Firebase Firestore
- Upload de imagens no Storage
- Autenticação com Firebase Auth

## 🛠️ Como Começar

### 1. Clonar o repositório
```bash
git clone https://github.com/Joaodamonark/aula.do.matheus
cd aula.do.matheus
```

### 2. Configurar Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Adicionar credenciais do Firebase no .env.local
npm start
```

### 3. Configurar Backend
```bash
cd ../backend
npm install
cp .env.example .env
# Adicionar configurações no .env
npm start
```

## 📋 Tecnologias Utilizadas

### Frontend
- React 18+
- CSS3 (Mobile First)
- Firebase (Auth, Firestore, Storage)

### Backend
- Node.js + Express
- Firebase Admin SDK
- JWT para autenticação
- Validação com express-validator

### Banco de Dados
- Firebase Firestore
- Firebase Storage para imagens

## 📚 Documentação

- [Regras de Negócio](regras/REGRAS.md)
- [Especificação Técnica](regras/ESPECIFICACAO_TECNICA.md)
- [Configuração Firebase](regras/FIREBASE_CONFIG.md)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 👥 Estrutura de Usuários

### Tipos de Usuários
1. **Comprador**: Compra carros, deixa avaliações
2. **Vendedor**: Anuncia carros, recebe avaliações
3. **Admin**: Gerencia usuários, carros, vendas e avaliações

## 🔐 Segurança

- Autenticação via Firebase Auth
- Senhas criptografadas
- CPF criptografado antes de salvar
- Rules no Firestore para controle de acesso
- JWT para APIs

## 📞 Suporte

Para dúvidas sobre a estrutura ou implementação, consulte a documentação nas pastas correspondentes.

---

**Última atualização**: Maio 2026