# 🚀 Guia de Início Rápido - App de Venda de Carros

## Antes de Começar

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Conta [Firebase](https://firebase.google.com/) criada

---

## 📋 Passo 1: Configurar Firebase

### 1.1 Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Dê um nome (ex: "CarSell App")
4. Ative Google Analytics (opcional)

### 1.2 Habilitar Firestore
1. No painel do Firebase, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione modo de teste (para desenvolvimento)
4. Escolha a localização (ex: América do Sul)

### 1.3 Habilitar Storage
1. Vá para "Storage"
2. Clique em "Começar"
3. Estude as regras de segurança

### 1.4 Habilitar Authentication
1. Vá para "Authentication"
2. Clique em "Começar"
3. Ative "Email/Senha"
4. (Opcional) Ative "Google Sign-in"

### 1.5 Obter Configuração
1. Vá para "Configurações do Projeto"
2. Clique em "Apps"
3. Selecione "</>" (Web)
4. Copie a configuração Firebase

---

## 🎨 Passo 2: Configurar Frontend

### 2.1 Clonar Repositório
```bash
cd ~/projects
git clone https://github.com/Joaodamonark/aula.do.matheus
cd aula.do.matheus/frontend
```

### 2.2 Instalar Dependências
```bash
npm install

# Ou com yarn
yarn install
```

### 2.3 Criar Arquivo de Configuração
```bash
# Criar arquivo .env.local
nano .env.local
```

Adicionar (copie a configuração do passo 1.5):
```env
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx
```

### 2.4 Configurar Firestore
```bash
# Instalar Firebase
npm install firebase

# Criar arquivo de config
touch src/config/firebase.js
```

Adicionar em `src/config/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 2.5 Iniciar Servidor de Desenvolvimento
```bash
npm start
```

Abrirá em `http://localhost:3000`

---

## 🔧 Passo 3: Configurar Backend (Opcional para agora)

### 3.1 Criar Projeto Node
```bash
cd ../backend
npm init -y
```

### 3.2 Instalar Dependências
```bash
npm install express firebase-admin cors dotenv express-validator jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

### 3.3 Criar .env
```bash
nano .env
```

Adicionar:
```env
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_PRIVATE_KEY=xxxxx
FIREBASE_CLIENT_EMAIL=xxxxx
```

### 3.4 Criar server.js básico
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

### 3.5 Iniciar Backend
```bash
npm start
```

---

## 📁 Estrutura de Pastas (Esperada)

```
aula.do.matheus/
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js (novo)
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.local (novo)
│   ├── package.json
│   └── node_modules/
├── backend/
│   ├── .env (novo)
│   ├── server.js (novo)
│   ├── package.json
│   └── node_modules/
└── README.md
```

---

## ✅ Verificar Instalação

### Frontend
```bash
# Abrir http://localhost:3000
# Deve mostrar a página Home com grid de carros

# Se houver erro, verificar:
npm list react
npm list firebase
```

### Backend
```bash
# Fazer requisição
curl http://localhost:5000/api/health
# Deve retornar: { "status": "OK" }
```

---

## 🗂️ Criar Estrutura Firestore

1. Vá para Firebase Console
2. Firestore → Criar Collection → `users`
3. Adicionar documento de exemplo
4. Repetir para `carros`, `vendas`, `avaliacoes`

---

## 🧪 Dados de Teste

### Usuário Teste
```json
{
  "email": "teste@example.com",
  "senha": "Senha123!",
  "nome": "João Teste",
  "cpf": "123.456.789-00",
  "telefone": "(11) 98765-4321",
  "endereco": {
    "rua": "Rua Teste",
    "numero": "123",
    "cidade": "São Paulo",
    "estado": "SP"
  }
}
```

### Carro Teste
```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC-1234",
  "ano": 2022,
  "quilometragem": 15000,
  "combustivel": "Gasolina",
  "cor": "Branco",
  "preco": 85000,
  "descricao": "Carro em perfeito estado",
  "status": "disponivel"
}
```

---

## 🐛 Troubleshooting

### Erro: "Firebase não inicializado"
```bash
# Verificar .env.local
cat .env.local

# Reiniciar servidor
npm start
```

### Erro: "CORS"
```javascript
// No backend, adicionar:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Erro: "Firestore Rules"
1. Ir para Firestore > Rules
2. Modo teste já permite leitura/escrita
3. Em produção, implementar rules adequadas

---

## 📚 Próximos Tutoriais

1. **Roteamento com React Router**
   ```bash
   npm install react-router-dom
   ```

2. **Criar Página de Login**
   - Use `firebaseService.loginUser()`
   - Armazene token no localStorage

3. **Implementar Rotas de Carros**
   - POST `/api/carros` - Criar
   - GET `/api/carros` - Listar
   - GET `/api/carros/:id` - Detalhe
   - PUT `/api/carros/:id` - Atualizar
   - DELETE `/api/carros/:id` - Deletar

---

## 🎯 Checklist Inicial

- [ ] Firebase Project criado
- [ ] Firestore habilitado
- [ ] Storage habilitado
- [ ] Authentication habilitado
- [ ] Configuração Firebase copiada
- [ ] .env.local criado no frontend
- [ ] npm install executado
- [ ] Frontend iniciado com sucesso
- [ ] Backend iniciado (opcional)
- [ ] Collections Firestore criadas

---

## 🔗 Links Úteis

- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com/)
- [Firestore Query](https://firebase.google.com/docs/firestore/query-data/queries)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

## 📞 Suporte

Para dúvidas, consulte:
1. [regras/FIREBASE_CONFIG.md](../regras/FIREBASE_CONFIG.md)
2. [frontend/README.md](frontend/README.md)
3. [backend/README.md](backend/README.md)
4. Documentação oficial do Firebase

---

**Pronto para começar? Bora lá! 🚀**

