// firebaseService.js - Serviço de integração com Firebase

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// ===== USUARIOS =====

export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Salvar dados adicionais no Firestore
    await addDoc(collection(db, 'users'), {
      id: uid,
      email,
      nome: userData.nome,
      cpf: userData.cpf, // Deveria ser criptografado em produção
      telefone: userData.telefone,
      endereco: userData.endereco,
      dataRegistro: new Date(),
      avatar: '',
      avaliacao: 0,
      statusConta: 'ativo',
    });

    return uid;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const suspendUser = async (userId) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { statusConta: 'suspenso' });
  } catch (error) {
    console.error('Erro ao suspender usuário:', error);
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { statusConta: 'bloqueado' });
  } catch (error) {
    console.error('Erro ao bloquear usuário:', error);
    throw error;
  }
};

// ===== CARROS =====

export const createCarro = async (carroData, images) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Usuário não autenticado');

    // Upload de imagens
    const imageUrls = [];
    for (const image of images) {
      const storageRef = ref(storage, `carros/${currentUser.uid}/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    // Salvar carro no Firestore
    const carroDoc = await addDoc(collection(db, 'carros'), {
      ...carroData,
      proprietarioId: currentUser.uid,
      imagens: imageUrls,
      status: 'disponivel',
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    });

    return carroDoc.id;
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    throw error;
  }
};

export const getCarros = async () => {
  try {
    const q = query(collection(db, 'carros'), where('status', '==', 'disponivel'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw error;
  }
};

export const getCarroById = async (carroId) => {
  try {
    const carroDoc = await getDoc(doc(db, 'carros', carroId));
    if (!carroDoc.exists()) throw new Error('Carro não encontrado');
    return {
      id: carroDoc.id,
      ...carroDoc.data()
    };
  } catch (error) {
    console.error('Erro ao buscar carro:', error);
    throw error;
  }
};

export const updateCarro = async (carroId, updates) => {
  try {
    const carroDoc = doc(db, 'carros', carroId);
    await updateDoc(carroDoc, {
      ...updates,
      dataAtualizacao: new Date(),
    });
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    throw error;
  }
};

export const removeCarro = async (carroId) => {
  try {
    await deleteDoc(doc(db, 'carros', carroId));
  } catch (error) {
    console.error('Erro ao remover carro:', error);
    throw error;
  }
};

// ===== VENDAS =====

export const createSale = async (vendaData) => {
  try {
    const saleDoc = await addDoc(collection(db, 'vendas'), {
      ...vendaData,
      dataVenda: new Date(),
      status: 'concluida',
    });

    // Atualizar status do carro para vendido
    await updateCarro(vendaData.carroId, { status: 'vendido' });

    return saleDoc.id;
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    throw error;
  }
};

export const getSales = async () => {
  try {
    const q = query(collection(db, 'vendas'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    throw error;
  }
};

// ===== AVALIACOES =====

export const createAvaliacao = async (avaliacaoData) => {
  try {
    const avaliacaoDoc = await addDoc(collection(db, 'avaliacoes'), {
      ...avaliacaoData,
      dataCriacao: new Date(),
    });
    return avaliacaoDoc.id;
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    throw error;
  }
};

export const getAvaliacoes = async () => {
  try {
    const q = query(collection(db, 'avaliacoes'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    throw error;
  }
};

export const removeAvaliacao = async (avaliacaoId) => {
  try {
    await deleteDoc(doc(db, 'avaliacoes', avaliacaoId));
  } catch (error) {
    console.error('Erro ao remover avaliação:', error);
    throw error;
  }
};

// ===== ADMIN =====

export const verifyAdminAccess = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    // Verificar se é admin (você pode usar Claims customizadas do Firebase)
    const idTokenResult = await currentUser.getIdTokenResult();
    return idTokenResult.claims.admin === true;
  } catch (error) {
    console.error('Erro ao verificar acesso admin:', error);
    return false;
  }
};

export const approveCarr = async (carroId) => {
  try {
    await updateCarro(carroId, { aprovado: true });
  } catch (error) {
    console.error('Erro ao aprovar carro:', error);
    throw error;
  }
};

export const rejectCarro = async (carroId) => {
  try {
    await deleteDoc(doc(db, 'carros', carroId));
  } catch (error) {
    console.error('Erro ao rejeitar carro:', error);
    throw error;
  }
};
