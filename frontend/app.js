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
    imagem: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
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
    imagem: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    marca: 'Jeep',
    modelo: 'Renegade',
    ano: 2022,
    quilometragem: 32000,
    combustivel: 'Flex',
    preco: 145000,
    status: 'Disponível',
    descricao: 'SUV compacto com excelente desempenho em estrada e cidade.',
    imagem: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80',
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
    imagem: 'https://images.unsplash.com/photo-1549921296-3e4ef89cfb98?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    marca: 'Ford',
    modelo: 'Ka',
    ano: 2019,
    quilometragem: 68000,
    combustivel: 'Flex',
    preco: 52000,
    status: 'Disponível',
    descricao: 'Compacto econômico ideal para uso diário na cidade.',
    imagem: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
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

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const renderCars = (lista) => {
  carsGrid.innerHTML = lista
    .map(
      (carro) => `
        <article class="car-card">
          <div class="car-image">
            <img src="${carro.imagem || 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80'}" alt="${carro.marca} ${carro.modelo}" />
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
  const imagem = document.getElementById('carImage').value.trim();
  const descricao = document.getElementById('carDescription').value.trim();

  if (!marca || !modelo || !ano || !quilometragem || !combustivel || !preco || !descricao) {
    sellMessage.textContent = 'Preencha todos os campos obrigatórios do anúncio.';
    return;
  }

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
    imagem: imagem || 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    anunciante: currentUser.name,
  };

  carros.unshift(novoCarro);
  renderCars(carros);
  sellMessage.textContent = 'Carro anunciado com sucesso!';
  sellForm.reset();
};

const handleCancelSell = () => {
  sellForm.reset();
  sellMessage.textContent = '';
  sellSection.classList.add('hidden');
};

const initNavigation = () => {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const section = link.dataset.section;
      showSection(section);
    });
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

updateAuthUI();
initNavigation();
renderCars(carros);
