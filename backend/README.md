# Backend - App de Venda de Carros

## Descrição

O backend será responsável por:
- API REST para gerenciar operações
- Autenticação e autorização
- Validação de dados
- Lógica de negócios
- Integração com banco de dados

## Arquitetura

```
backend/
├── app/
│   ├── routes/                 # Rotas da API
│   │   ├── users.js
│   │   ├── carros.js
│   │   ├── vendas.js
│   │   └── avaliacoes.js
│   ├── controllers/            # Lógica de controle
│   ├── models/                 # Modelos de dados
│   ├── middleware/             # Middlewares
│   └── utils/                  # Funções utilitárias
├── config/
│   ├── firebase.js
│   └── database.js
├── tests/                      # Testes unitários
├── .env.example
├── server.js
├── package.json
└── README.md
```

## Stack Recomendado

### Node.js + Express
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "firebase-admin": "^11.0.0",
    "express-validator": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  }
}
```

## Endpoints Principais

### Usuários
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/users/:id` - Obter dados do usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `GET /api/users` - Listar usuários (admin)
- `PUT /api/users/:id/suspend` - Suspender usuário (admin)
- `PUT /api/users/:id/block` - Bloquear usuário (admin)

### Carros
- `POST /api/carros` - Criar anúncio
- `GET /api/carros` - Listar carros
- `GET /api/carros/:id` - Detalhes do carro
- `PUT /api/carros/:id` - Atualizar carro
- `DELETE /api/carros/:id` - Deletar carro
- `POST /api/carros/:id/images` - Upload de imagens

### Vendas
- `POST /api/vendas` - Criar venda
- `GET /api/vendas` - Listar vendas (histórico)
- `GET /api/vendas/:id` - Detalhes da venda
- `PUT /api/vendas/:id` - Atualizar status da venda
- `GET /api/relatorio/vendas` - Relatório de vendas (admin)

### Avaliações
- `POST /api/avaliacoes` - Criar avaliação
- `GET /api/avaliacoes/:usuarioId` - Avaliações de um usuário
- `GET /api/avaliacoes` - Listar avaliações (admin)
- `DELETE /api/avaliacoes/:id` - Deletar avaliação (admin)

## Autenticação

- JWT (JSON Web Token) para autenticação
- Firebase Auth para gerenciar usuários
- Roles/Claims customizadas para admin

## Validações

Todas as requisições devem validar:
- Email único e válido
- Senha com mínimo 8 caracteres
- Placa única de carro
- Preço maior que zero
- Quilometragem não-negativa
- Ano válido de fabricação

## Próximos Passos

- [ ] Configurar servidor Express
- [ ] Implementar rotas de usuários
- [ ] Implementar rotas de carros
- [ ] Implementar rotas de vendas
- [ ] Implementar rotas de avaliações
- [ ] Adicionar validações com express-validator
- [ ] Implementar middleware de autenticação
- [ ] Adicionar testes
- [ ] Deploy em Cloud Run/Heroku
- [ ] Configurar CI/CD

