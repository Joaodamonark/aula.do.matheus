<!-- ARQUITETURA DO PROJETO -->

# Arquitetura do App de Venda de Carros

## Diagrama de Fluxo Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENTE (Navegador)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐      │
│  │  Home Page   │  │ Admin Panel  │  │ Auth Pages       │      │
│  │  - Listagem  │  │ - Users      │  │ - Login          │      │
│  │  - Filtros   │  │ - Cars       │  │ - Register       │      │
│  │  - Detalhes  │  │ - Sales      │  │ - Logout         │      │
│  │              │  │ - Reviews    │  │                  │      │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘      │
│         │                 │                   │                 │
│         └─────────────────┼─────────────────┘                   │
│                           │                                     │
│                    React Components                             │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE CLOUD                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐      │
│  │Authentication│  │  Firestore   │  │    Storage       │      │
│  │              │  │              │  │                  │      │
│  │ - Email/Pass │  │ Collections: │  │ - Car Images     │      │
│  │ - Google ID  │  │ • users      │  │ - Profile Pics   │      │
│  │ - JWT Claims │  │ • carros     │  │ - Documents      │      │
│  │              │  │ • vendas     │  │                  │      │
│  │              │  │ • avaliacoes │  │                  │      │
│  └──────────────┘  └──────────────┘  └──────────────────┘      │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    API Routes                             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │   │
│  │  │/api/     │ │/api/     │ │/api/     │ │/api/     │    │   │
│  │  │users     │ │carros    │ │vendas    │ │avaliacoes│    │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Controllers & Models                     │   │
│  │  - Validação de dados                                   │   │
│  │  - Lógica de negócio                                    │   │
│  │  - Autenticação e Autorização                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘

```

## Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE LOGIN                            │
└─────────────────────────────────────────────────────────────┘

1. Usuário preenche credenciais
   │
   ▼
2. Frontend envia para Firebase Auth
   │
   ▼
3. Firebase valida e retorna token JWT
   │
   ▼
4. Token armazenado no localStorage/sessionStorage
   │
   ▼
5. Requisições incluem header "Authorization: Bearer <token>"
   │
   ▼
6. Backend valida token antes de processar requisição
   │
   ▼
7. Se válido → Acesso concedido | Se inválido → 401 Unauthorized
```

## Fluxo de Venda de Carro

```
┌─────────────────────────────────────────────────────────────┐
│                 FLUXO DE VENDA DE CARRO                      │
└─────────────────────────────────────────────────────────────┘

1. Vendedor acessa app e faz login
   │
   ▼
2. Clica em "Anunciar Carro"
   │
   ▼
3. Preenche dados: marca, modelo, ano, preço, km, descrição
   │
   ▼
4. Faz upload de imagens do carro
   │
   ▼
5. Firebase armazena imagens no Storage
   │
   ▼
6. Dados salvos em Firestore (status: "disponivel")
   │
   ▼
7. Carro aparece na Home para buscadores
   │
   ▼
8. Comprador clica "Ver Detalhes" → "Comprar"
   │
   ▼
9. Transação registrada em "vendas" collection
   │
   ▼
10. Status do carro muda para "vendido"
   │
   ▼
11. Histórico atualizado para vendedor e comprador
   │
   ▼
12. Possibilidade de avaliação do vendedor

```

## Estrutura de Dados - Firestore

```
┌─────────────────────────────────────────────────────────────┐
│                  FIRESTORE COLLECTIONS                       │
└─────────────────────────────────────────────────────────────┘

users/
├── {userId}
│   ├── id: string
│   ├── email: string
│   ├── nome: string
│   ├── cpf: string (criptografado)
│   ├── telefone: string
│   ├── endereco: object
│   │   ├── rua
│   │   ├── cidade
│   │   └── estado
│   ├── avatar: string (URL)
│   ├── avaliacao: number
│   ├── statusConta: "ativo" | "suspenso" | "bloqueado"
│   └── dataRegistro: timestamp

carros/
├── {carroId}
│   ├── proprietarioId: string
│   ├── marca: string
│   ├── modelo: string
│   ├── placa: string (único)
│   ├── ano: number
│   ├── quilometragem: number
│   ├── combustivel: string
│   ├── cor: string
│   ├── preco: number
│   ├── descricao: string
│   ├── imagens: array<string>
│   ├── status: "disponivel" | "vendido" | "reservado"
│   ├── dataCriacao: timestamp
│   └── dataAtualizacao: timestamp

vendas/
├── {vendaId}
│   ├── carroId: string
│   ├── vendedorId: string
│   ├── compradorId: string
│   ├── precoVenda: number
│   ├── dataVenda: timestamp
│   ├── status: "pendente" | "concluida" | "cancelada"
│   └── historicoVendedor: string

avaliacoes/
├── {avaliacaoId}
│   ├── vendedorId: string
│   ├── compradorId: string
│   ├── vendaId: string
│   ├── estrelas: number (1-5)
│   ├── comentario: string
│   ├── dataCriacao: timestamp
│   └── tipo: "vendedor" | "comprador"
```

## Camadas da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA APRESENTAÇÃO                         │
│         (React Components + CSS Responsivo)                  │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE SERVIÇOS                         │
│        (Firebase Integration, HTTP Requests)                │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                 CAMADA DE LÓGICA (Backend)                   │
│     (Controllers, Validação, Regras de Negócio)             │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE DADOS                            │
│         (Firestore, Firebase Storage)                       │
└─────────────────────────────────────────────────────────────┘
```

## Deploy (Sugestão)

```
┌──────────────────────────────────────────────────────────────┐
│                      PRODUÇÃO                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend: Vercel / Firebase Hosting                        │
│  Backend: Cloud Run / Heroku / DigitalOcean                │
│  Banco: Firebase Firestore (gerenciado)                     │
│  Storage: Firebase Storage (gerenciado)                     │
│  Auth: Firebase Authentication (gerenciado)                 │
│  CDN: Cloudflare / Firebase CDN                             │
│  Monitoring: Firebase Console / Sentry                       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

