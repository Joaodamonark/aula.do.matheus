# Firebase - Configuração e Banco de Dados

## Plataforma: Firebase (Realtime Database / Firestore)

### O que usar do Firebase

1. **Firestore**
   - Banco de dados NoSQL em nuvem
   - Estrutura em coleções e documentos
   - Sincronização em tempo real
   - Consultas eficientes

2. **Authentication**
   - Autenticação por email/senha
   - Google Sign-in
   - Gerenciamento de sessão automático

3. **Storage**
   - Armazenamento de imagens dos carros
   - Fotos do perfil de usuários

4. **Hosting** (Opcional)
   - Deploy da aplicação React

## Estrutura do Firestore

```
users/
├── {userId}
│   ├── nome: string
│   ├── email: string
│   ├── cpf: string
│   ├── telefone: string
│   ├── dataRegistro: timestamp
│   ├── avatar: string (URL)
│   ├── avaliacao: number (1-5)
│   ├── statusConta: string (ativo/suspenso/bloqueado)
│   └── endereco: object
│       ├── rua: string
│       ├── numero: string
│       ├── cidade: string
│       └── estado: string

carros/
├── {carroId}
│   ├── marca: string
│   ├── modelo: string
│   ├── placa: string
│   ├── ano: number
│   ├── preco: number
│   ├── quilometragem: number
│   ├── cor: string
│   ├── combustivel: string
│   ├── proprietarioId: string
│   ├── status: string (disponivel/vendido/reservado)
│   ├── descricao: string
│   ├── imagens: array
│   ├── dataCriacao: timestamp
│   └── dataAtualizacao: timestamp

vendas/
├── {vendaId}
│   ├── carroId: string
│   ├── vendedorId: string
│   ├── compradorId: string
│   ├── precoVenda: number
│   ├── dataVenda: timestamp
│   ├── status: string (pendente/concluida/cancelada)
│   └── historicoVendedor: string

avaliacoes/
├── {avaliacaoId}
│   ├── vendedorId: string
│   ├── compradorId: string
│   ├── vendaId: string
│   ├── estrelas: number (1-5)
│   ├── comentario: string
│   ├── dataCriacao: timestamp
│   └── tipo: string (vendedor/comprador)
```

## Regras de Segurança do Firebase

### Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - Cada usuário só acessa seus próprios dados
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Carros - Leitura pública, escrita apenas do proprietário
    match /carros/{carroId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if resource.data.proprietarioId == request.auth.uid;
    }
    
    // Vendas - Apenas participantes podem ler
    match /vendas/{vendaId} {
      allow read: if request.auth.uid == resource.data.vendedorId || 
                     request.auth.uid == resource.data.compradorId;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.vendedorId || 
                       request.auth.uid == resource.data.compradorId;
    }
    
    // Avaliações - Leitura pública, escrita apenas do avaliador
    match /avaliacoes/{avaliacaoId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.compradorId;
      allow update, delete: if request.auth.uid == resource.data.compradorId;
    }
  }
}
```

## Configuração no React

```javascript
// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

## Variáveis de Ambiente (.env)

```
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx
```

## Dependências NPM

```
firebase: ^10.0.0 ou superior
```

## Operações Principais

1. **Criar usuário**: `createUserWithEmailAndPassword()`
2. **Login**: `signInWithEmailAndPassword()`
3. **Logout**: `signOut()`
4. **Criar carro**: `addDoc(collection(db, "carros"), {...})`
5. **Atualizar carro**: `updateDoc(doc(db, "carros", id), {...})`
6. **Registrar venda**: `addDoc(collection(db, "vendas"), {...})`
7. **Avaliar vendedor**: `addDoc(collection(db, "avaliacoes"), {...})`

## Testes no Emulator (Desenvolvimento)

Para desenvolvimento local, usar Firebase Emulator Suite para testar sem custos.
