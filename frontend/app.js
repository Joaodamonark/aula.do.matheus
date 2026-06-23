const carros = [
  {
    id: '1',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2021,
      quilometragem: 42000,
    combustivel: 'Flex',
      preco: 95000,
      status: 'Disponível',
      descricao: 'Sedã confortável e econômico com tecnologia moderna.',
    imagem: 'images/images.jpeg',
    
  },
  {
    id: '2',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2020,
      quilometragem: 55000,
    combustivel: 'Gasolina',
      preco: 98000,
      status: 'Disponível',
      descricao: 'Carro esportivo e elegante com direção ágil e interior premium.',
    imagem: 'images/honda.jpeg',

  },
  {
    id: '3',
    marca: 'lamborghini',
    modelo: 'aventador',
    ano: 2022,
    quilometragem: 32000,
    combustivel: 'Gasolina Premium',
    preco: 6500000,
    status: 'Disponível',
    descricao: 'Com o motor V12 de 6.5 litros, que entrega impressionantes 700 hp, proporcionando uma performance que deixa qualquer um sem fôlego',
    imagem: 'images/Lamborghini_Aventador_Genf.jpg',
  },
  {
    id: '4',
    marca: 'Volkswagen',
    modelo: 'T-Cross',
    ano: 2023,
    quilometragem: 15000,
    combustivel: 'Flex',
    preco: 170000,
    status: 'Disponível',
    descricao: 'SUV moderno com conectividade inteligente e design robusto.',
    imagem: 'images/Volkswagen-T-Cross-750x450.jpg',
   
  },
  {
    id: '5',
    marca: 'Porsche',
    modelo: 'Panameira',
    ano: 2019,
    quilometragem: 68000,
    combustivel: 'Gasolina Premium',
    preco: 730000,
    status: 'Disponível',
    descricao: 'Se você busca o desempenho visceral de um autêntico Porsche, mas não abre mão do conforto, espaço e sofisticação de um sedã de luxo, o Porsche Panamera 2019 é a escolha definitiva.',
    imagem: 'images/2022-porsche-panamera-platinum-edition.jpg',
  },
  {
    id: '6',
    marca: 'Chevrolet',
    modelo: 'opala',
    ano: 1981,
    quilometragem: 100000,
    combustivel: 'alcool',
    preco: 40000,
    status: 'Disponível',
    descricao: 'O Opala Comodoro 1981 a álcool une o luxo e a robustez clássicos da Chevrolet com a economia e a força do motor movido a etanol. É a escolha ideal para quem busca um carro de colecionador cheio de personalidade e pronto para rodar com o autêntico ronco brasileiro.',
    imagem: 'images/opala 81 comodoro.jpg',
  },
];

const carsGrid = document.getElementById('carsGrid');
const carsCount = document.getElementById('carsCount');
const filtersForm = document.getElementById('filtersForm');
const resetFilters = document.getElementById('resetFilters');
const navLinks = document.querySelectorAll('.nav-link');
const actionButtons = document.querySelectorAll('[data-section]');
const loginSection = document.getElementById('loginSection');
const sellSection = document.getElementById('sellSection');
const loginForm = document.getElementById('loginForm');
const registerButton = document.getElementById('registerButton');
const authMessage = document.getElementById('authMessage');
const sellForm = document.getElementById('sellForm');
const sellMessage = document.getElementById('sellMessage');
const cancelSell = document.getElementById('cancelSell');
const loginNav = document.getElementById('loginNav');

let users = JSON.parse(localStorage.getItem('carsellUsers') || '[]');
let currentUser = JSON.parse(localStorage.getItem('carsellCurrentUser') || 'null');
// Se houver carros anunciados na página de vender, integraremos aqui
const stagedCars = JSON.parse(localStorage.getItem('carsellStagedCars') || '[]');
if (Array.isArray(stagedCars) && stagedCars.length) {
  // adiciona no início para priorizar anúncios recentes
  stagedCars.forEach((c) => carros.unshift(c));
  localStorage.removeItem('carsellStagedCars');
}

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const renderCars = (lista) => {
  carsGrid.innerHTML = lista
    .map(
      (carro) => `
        <article class="car-card" data-id="${carro.id}" tabindex="0">
          <div class="car-image">
            ${carro.artigo
              ? `<a href="${carro.artigo}" target="_blank" rel="noopener noreferrer"><img src="${carro.imagem || 'images/images.jpeg'}" alt="${carro.marca} ${carro.modelo}" /></a>`
              : `<img src="${carro.imagem || 'images/images.jpeg'}" alt="${carro.marca} ${carro.modelo}" />`}
          </div>
          <div class="car-body">
            <div class="car-title">${carro.marca} ${carro.modelo}</div>
            <div class="car-badges">
              <span class="badge">${carro.ano}</span>
              <span class="badge">${carro.combustivel}</span>
              <span class="badge">${carro.status}</span>
            </div>
            <p class="car-description">${carro.descricao}</p>
            <div class="car-meta">
              <span>Quilometragem: ${carro.quilometragem.toLocaleString()} km</span>
            </div>
            <div class="car-footer">
              <div class="car-price">${formatPrice(carro.preco)}</div>
              <button class="btn-primary" type="button">Comprar</button>
            </div>
          </div>
        </article>
      `,
    )
    .join('');

  carsCount.textContent = `${lista.length} carro${lista.length === 1 ? '' : 's'} encontrado${lista.length === 1 ? '' : 's'}`;
};

const showSection = (section) => {
  if (section === 'login') {
    loginSection.classList.remove('hidden');
    sellSection.classList.add('hidden');
    loginSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (section === 'sell') {
    loginSection.classList.add('hidden');
    sellSection.classList.remove('hidden');
    sellSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  loginSection.classList.add('hidden');
  sellSection.classList.add('hidden');

  if (section === 'catalogo') {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  }

  if (section === 'home') {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }
};

const applyFilters = (event) => {
  if (event) event.preventDefault();

  const marca = document.getElementById('filter-brand').value.trim().toLowerCase();
  const modelo = document.getElementById('filter-model').value.trim().toLowerCase();
  const ano = parseInt(document.getElementById('filter-year').value, 10);
  const precoMin = parseFloat(document.getElementById('filter-min-price').value);
  const precoMax = parseFloat(document.getElementById('filter-max-price').value);

  const filtered = carros.filter((carro) => {
    const matchesMarca = !marca || carro.marca.toLowerCase().includes(marca);
    const matchesModelo = !modelo || carro.modelo.toLowerCase().includes(modelo);
    const matchesAno = !ano || carro.ano === ano;
    const matchesPrecoMin = Number.isNaN(precoMin) || carro.preco >= precoMin;
    const matchesPrecoMax = Number.isNaN(precoMax) || carro.preco <= precoMax;
    return matchesMarca && matchesModelo && matchesAno && matchesPrecoMin && matchesPrecoMax;
  });

  renderCars(filtered);
};

const updateAuthUI = () => {
  if (currentUser) {
    loginNav.textContent = `Olá, ${currentUser.name}`;
    loginNav.title = 'Clique para gerenciar sua conta';
    authMessage.textContent = `Logado como ${currentUser.name}. Agora você pode anunciar um carro.`;
  } else {
    loginNav.textContent = 'Login';
    loginNav.title = 'Login ou cadastro';
    authMessage.textContent = 'Use seu email e senha para entrar ou cadastre-se para anunciar seu carro.';
  }
};

const persistAuth = () => {
  localStorage.setItem('carsellUsers', JSON.stringify(users));
  localStorage.setItem('carsellCurrentUser', JSON.stringify(currentUser));
};

const handleLogin = (event) => {
  event.preventDefault();
  const email = document.getElementById('userEmail').value.trim().toLowerCase();
  const password = document.getElementById('userPassword').value;

  if (!email || !password) {
    authMessage.textContent = 'Preencha email e senha.';
    return;
  }

  const foundUser = users.find((user) => user.email === email && user.password === password);

  if (!foundUser) {
    authMessage.textContent = 'Conta não encontrada. Cadastre-se ou verifique seus dados.';
    return;
  }

  currentUser = foundUser;
  persistAuth();
  updateAuthUI();
  authMessage.textContent = `Bem-vindo de volta, ${currentUser.name}!`;
};

const handleRegister = () => {
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim().toLowerCase();
  const password = document.getElementById('userPassword').value;

  if (!name || !email || !password) {
    authMessage.textContent = 'Preencha nome, email e senha para se cadastrar.';
    return;
  }

  if (users.some((user) => user.email === email)) {
    authMessage.textContent = 'Este email já está cadastrado. Faça login.';
    return;
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  currentUser = newUser;
  persistAuth();
  updateAuthUI();
  authMessage.textContent = `Conta criada! Bem-vindo, ${name}.`;
};

const handleSell = (event) => {
  event.preventDefault();

  if (!currentUser) {
    sellMessage.textContent = 'Você precisa estar logado para anunciar um carro.';
    loginSection.classList.remove('hidden');
    loginSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const marca = document.getElementById('carBrand').value.trim();
  const modelo = document.getElementById('carModel').value.trim();
  const ano = parseInt(document.getElementById('carYear').value, 10);
  const quilometragem = parseInt(document.getElementById('carMileage').value, 10);
  const combustivel = document.getElementById('carFuel').value.trim();
  const preco = parseFloat(document.getElementById('carPrice').value);
  const imagemFile = document.getElementById('carImage').files[0];
  const descricao = document.getElementById('carDescription').value.trim();

  if (!marca || !modelo || !ano || !quilometragem || !combustivel || !preco || !descricao) {
    sellMessage.textContent = 'Preencha todos os campos obrigatórios do anúncio.';
    return;
  }

  if (!imagemFile) {
    sellMessage.textContent = 'Selecione uma foto para o carro.';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const imagemBase64 = e.target.result;

    const novoCarro = {
      id: Date.now().toString(),
      marca,
      modelo,
      ano,
      quilometragem,
      combustivel,
      preco,
      status: 'Disponível',
      descricao,
      imagem: imagemBase64,
      anunciante: currentUser.name,
    };

    carros.unshift(novoCarro);
    renderCars(carros);
    sellMessage.textContent = 'Carro anunciado com sucesso!';
    sellForm.reset();
    document.getElementById('imagePreview').classList.add('hidden');
  };
  reader.readAsDataURL(imagemFile);
};

const handleCancelSell = () => {
  sellForm.reset();
  sellMessage.textContent = '';
  sellSection.classList.add('hidden');
};

const initNavigation = () => {
  navLinks.forEach((link) => {
    const section = link.dataset.section;
    if (section) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showSection(section);
      });
    }
    // se não houver data-section, permite o comportamento padrão (navegar para href)
  });

  actionButtons.forEach((button) => {
    const section = button.dataset.section;
    if (section) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        showSection(section);
      });
    }
  });
};

filtersForm.addEventListener('submit', applyFilters);
resetFilters.addEventListener('click', () => {
  filtersForm.reset();
  renderCars(carros);
});
loginForm.addEventListener('submit', handleLogin);
registerButton.addEventListener('click', handleRegister);
sellForm.addEventListener('submit', handleSell);
cancelSell.addEventListener('click', handleCancelSell);

// Preview de imagem no formulário de venda
const carImageInput = document.getElementById('carImage');
const imagePreview = document.getElementById('imagePreview');
if (carImageInput && imagePreview) {
  carImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
        imagePreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.classList.add('hidden');
    }
  });
}

updateAuthUI();
initNavigation();
renderCars(carros);

// Ao clicar em um card, abrir a página de detalhes
carsGrid.addEventListener('click', (e) => {
  // se clicou em um link (imagem/artigo), deixa o <a> tratar o evento
  if (e.target.closest('a')) return;
  // ignora cliques no botão Comprar
  if (e.target.closest('button')) return;
  const card = e.target.closest('.car-card');
  if (!card) return;
  const id = card.dataset.id;
  const found = carros.find((c) => c.id === id);
  if (!found) return;
  localStorage.setItem('carsellSelectedCar', JSON.stringify(found));
  window.location.href = 'car.html';
});

// também permite abrir com Enter quando focado (acessibilidade)
carsGrid.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  // se o foco estiver em um link, deixa o Enter seguir o link
  if (e.target.closest('a')) return;
  const card = e.target.closest('.car-card');
  if (!card) return;
  const id = card.dataset.id;
  const found = carros.find((c) => c.id === id);
  if (!found) return;
  localStorage.setItem('carsellSelectedCar', JSON.stringify(found));
  window.location.href = 'car.html';
});
