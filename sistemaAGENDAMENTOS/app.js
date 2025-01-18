document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar dados do LocalStorage
    function carregarDados(chave) {
      return JSON.parse(localStorage.getItem(chave)) || [];
    }
  
    // Função para salvar dados no LocalStorage
    function salvarDados(chave, dados) {
      localStorage.setItem(chave, JSON.stringify(dados));
    }
  
    // Atualiza a lista de agendamentos no Dashboard
    function atualizarAgendamentos() {
      const agendamentos = carregarDados('agendamentos');
      const listaAgendamentos = document.getElementById('lista-agendamentos');
      listaAgendamentos.innerHTML = '';
  
      agendamentos.forEach((agendamento, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${agendamento.nome}</strong> - ${agendamento.data} 
          - ${agendamento.horaInicio} a ${agendamento.horaFim} 
          - Status: ${agendamento.status}
          <button class="remover-agendamento" data-index="${index}">Remover</button>
        `;
        listaAgendamentos.appendChild(li);
      });
  
      // Atualizar total de agendamentos no Dashboard
      document.getElementById('total-agendamentos').textContent = agendamentos.length;
    }
  
    // Atualiza a lista de clientes
    function atualizarClientes() {
      const clientes = carregarDados('clientes');
      const listaClientes = document.getElementById('lista-clientes');
      listaClientes.innerHTML = '';
  
      clientes.forEach((cliente) => {
        const li = document.createElement('li');
        li.innerHTML = `${cliente.nome} - ${cliente.email}`;
        listaClientes.appendChild(li);
      });
  
      // Atualizar total de clientes no Dashboard
      document.getElementById('total-clientes').textContent = clientes.length;
    }
  
    // Mostrar a seção correta ao clicar no menu
    function mostrarPagina(idPagina) {
      const paginas = document.querySelectorAll('.pagina');
      paginas.forEach(pagina => pagina.classList.remove('ativo'));
  
      const paginaAtiva = document.getElementById(idPagina);
      paginaAtiva.classList.add('ativo');
    }
  
    // Navegação entre seções
    document.getElementById('btn-dashboard').addEventListener('click', () => mostrarPagina('dashboard'));
    document.getElementById('btn-agendamentos').addEventListener('click', () => mostrarPagina('agendamentos'));
    document.getElementById('btn-relatorios').addEventListener('click', () => mostrarPagina('relatorios'));
  
    // Formulário de Agendamento
    document.getElementById('btn-agendar').addEventListener('click', () => {
      document.getElementById('form-agendamento-container').style.display = 'block';
    });
  
    document.getElementById('form-agendamento').addEventListener('submit', function (e) {
      e.preventDefault();
      // Função para alternar a visibilidade do formulário de agendamento
document.getElementById('btn-agendar').addEventListener('click', function () {
    const formContainer = document.getElementById('form-agendamento-container');
    // Verifica se o formulário de agendamento está visível
    if (formContainer.style.display === 'block') {
      formContainer.style.display = 'none'; // Esconde o formulário
    } else {
      formContainer.style.display = 'block'; // Exibe o formulário
    }
  });
  
  
      // Coleta os dados do formulário
      const nome = document.getElementById('nome-agendamento').value;
      const data = document.getElementById('data-agendamento').value;
      const horaInicio = document.getElementById('hora-inicio').value;
      const horaFim = document.getElementById('hora-fim').value;
      const numeroCliente = document.getElementById('numero-cliente').value;
      const valorServico = document.getElementById('valor-servico').value;
      const formaPagamento = document.getElementById('forma-pagamento').value;
      const status = document.getElementById('status-atendimento').value;
  
      // Cria o novo agendamento
      const novoAgendamento = { nome, data, horaInicio, horaFim, numeroCliente, valorServico, formaPagamento, status };
  
      // Adiciona ao LocalStorage
      const agendamentos = carregarDados('agendamentos');
      agendamentos.push(novoAgendamento);
      salvarDados('agendamentos', agendamentos);
  
      // Limpa o formulário e atualiza a lista de agendamentos
      e.target.reset();
      document.getElementById('form-agendamento-container').style.display = 'none';
      atualizarAgendamentos();
    });
  
    // Remover agendamento
    document.getElementById('lista-agendamentos').addEventListener('click', function (e) {
      if (e.target.classList.contains('remover-agendamento')) {
        const index = e.target.getAttribute('data-index');
        const agendamentos = carregarDados('agendamentos');
        agendamentos.splice(index, 1); // Remove o agendamento
        salvarDados('agendamentos', agendamentos);
        atualizarAgendamentos();
      }
    });
  
    // Cadastro de Clientes
    document.getElementById('form-cliente').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const nome = document.getElementById('nome-cliente').value;
      const email = document.getElementById('email-cliente').value;
  
      // Cria novo cliente
      const novoCliente = { nome, email };
  
      // Adiciona ao LocalStorage
      const clientes = carregarDados('clientes');
      clientes.push(novoCliente);
      salvarDados('clientes', clientes);
  
      // Limpa o formulário e atualiza a lista de clientes
      e.target.reset();
      atualizarClientes();
    });
  
    // Gerar Relatório
    document.getElementById('gerarRelatorio').addEventListener('click', function () {
      const agendamentos = carregarDados('agendamentos');
      const clientes = carregarDados('clientes');
  
      let relatorio = `Relatório de Agendamentos:\n\nTotal de Agendamentos: ${agendamentos.length}\n\n`;
  
      agendamentos.forEach((agendamento, index) => {
        relatorio += `Agendamento ${index + 1} - ${agendamento.nome} - ${agendamento.data} - Status: ${agendamento.status}\n`;
      });
  
      relatorio += `\n\nRelatório de Clientes:\n\nTotal de Clientes: ${clientes.length}\n\n`;
  
      clientes.forEach((cliente, index) => {
        relatorio += `Cliente ${index + 1} - ${cliente.nome} - ${cliente.email}\n`;
      });
  
      document.getElementById('relatorio-gerado').textContent = relatorio;
    });
  
    // Inicializar as listas ao carregar a página
    atualizarAgendamentos();
    atualizarClientes();
    mostrarPagina('dashboard');
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    // Função para verificar o login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Dados de login (pode ser modificado para validar com um banco de dados)
      const email = document.getElementById('email-login').value;
      const senha = document.getElementById('senha-login').value;
  
      if (email === "cliente@exemplo.com" && senha === "senha123") {
        // Login bem-sucedido, redireciona para a área do cliente
        localStorage.setItem('loggedIn', true);
        window.location.href = 'area-cliente.html'; // Redireciona para a página de cliente
      } else {
        document.getElementById('login-error').style.display = 'block'; // Exibe mensagem de erro
      }
    });
  
    // Verifica se o usuário está logado
    if (localStorage.getItem('loggedIn') !== 'true') {
      window.location.href = 'login.html'; // Se não estiver logado, redireciona para a tela de login
    }
  
    // Função para agendar atendimento
    const formAgendamento = document.getElementById('form-agendamento');
    formAgendamento.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = document.getElementById('data-agendamento').value;
      const horaInicio = document.getElementById('hora-inicio').value;
      const horaFim = document.getElementById('hora-fim').value;
 });
  
    // Função para enviar feedback
    const formFeedback = document.getElementById('form-feedback');
    formFeedback.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const feedbackTexto = document.getElementById('feedback-texto').value;
    });
  
    // Função de logout
    const btnSair = document.getElementById('btn-sair');
    btnSair.addEventListener('click', function () {
      localStorage.removeItem('loggedIn'); // Remove a chave de login
      window.location.href = 'login.html'; // Redireciona para a tela de login
    });
  });
// Lógica de Logout
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
  btnLogout.addEventListener('click', function () {
    localStorage.removeItem('clienteLogado');
    window.location.href = 'index.html'; // Redireciona para a página de login
  });
}
