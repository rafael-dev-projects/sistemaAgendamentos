document.addEventListener('DOMContentLoaded', function () {
  // Utilitários para manipulação do LocalStorage
  const carregarDados = (chave) => JSON.parse(localStorage.getItem(chave)) || [];
  const salvarDados = (chave, dados) => localStorage.setItem(chave, JSON.stringify(dados));

  // Função para alternar entre as seções
  const mostrarPagina = (idPagina) => {
      const paginas = document.querySelectorAll('.pagina');
      paginas.forEach(pagina => pagina.classList.remove('ativo'));
      document.getElementById(idPagina).classList.add('ativo');
  };

  // Atualiza o Dashboard
  const atualizarDashboard = () => {
      const agendamentos = carregarDados('agendamentos');
      const clientes = carregarDados('clientes');

      // Atualiza totais
      document.getElementById('total-agendamentos').textContent = agendamentos.length;
      document.getElementById('total-clientes').textContent = clientes.length;

      // Atualiza a lista de próximos atendimentos
      const proximosAtendimentos = document.getElementById('proximos-atendimentos');
      proximosAtendimentos.innerHTML = '';
      agendamentos.slice(0, 5).forEach(agendamento => {
          const li = document.createElement('li');
          li.textContent = `${agendamento.data} - ${agendamento.nome}`;
          proximosAtendimentos.appendChild(li);
      });
  };

  // Atualiza a lista de agendamentos
  const atualizarAgendamentos = () => {
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

      atualizarDashboard(); // Atualiza o Dashboard
  };

  // Alternar visibilidade do formulário de agendamento
  document.getElementById('btn-agendar').addEventListener('click', () => {
      const formContainer = document.getElementById('form-agendamento-container');
      formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
  });

  // Salvar novo agendamento
  document.getElementById('form-agendamento').addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome-agendamento').value;
      const data = document.getElementById('data-agendamento').value;
      const horaInicio = document.getElementById('hora-inicio').value;
      const horaFim = document.getElementById('hora-fim').value;
      const numeroCliente = document.getElementById('numero-cliente').value;
      const valorServico = document.getElementById('valor-servico').value;
      const formaPagamento = document.getElementById('forma-pagamento').value;
      const status = document.getElementById('status-atendimento').value;

      // Adiciona ao LocalStorage
      const novoAgendamento = { nome, data, horaInicio, horaFim, numeroCliente, valorServico, formaPagamento, status };
      const agendamentos = carregarDados('agendamentos');
      agendamentos.push(novoAgendamento);
      salvarDados('agendamentos', agendamentos);

      // Atualiza a interface
      this.reset();
      document.getElementById('form-agendamento-container').style.display = 'none';
      atualizarAgendamentos();
  });

  // Remover agendamento
  document.getElementById('lista-agendamentos').addEventListener('click', function (e) {
      if (e.target.classList.contains('remover-agendamento')) {
          const index = e.target.getAttribute('data-index');
          const agendamentos = carregarDados('agendamentos');
          agendamentos.splice(index, 1);
          salvarDados('agendamentos', agendamentos);
          atualizarAgendamentos();
      }
  });

  // Gerar relatório
  document.getElementById('gerarRelatorio').addEventListener('click', () => {
      const agendamentos = carregarDados('agendamentos');
      const clientes = carregarDados('clientes');
      let relatorio = `Relatório de Agendamentos:\n\nTotal de Agendamentos: ${agendamentos.length}\n`;

      agendamentos.forEach((agendamento, index) => {
          relatorio += `\nAgendamento ${index + 1}: ${agendamento.nome} - ${agendamento.data}`;
      });

      relatorio += `\n\nRelatório de Clientes:\n\nTotal de Clientes: ${clientes.length}\n`;

      clientes.forEach((cliente, index) => {
          relatorio += `\nCliente ${index + 1}: ${cliente.nome}`;
      });

      document.getElementById('relatorio-gerado').textContent = relatorio;
  });

  // Navegação entre as páginas
  document.getElementById('btn-dashboard').addEventListener('click', () => mostrarPagina('dashboard'));
  document.getElementById('btn-agendamentos').addEventListener('click', () => mostrarPagina('agendamentos'));
  document.getElementById('btn-relatorios').addEventListener('click', () => mostrarPagina('relatorios'));

  // Inicializa a página
  mostrarPagina('dashboard');
  atualizarDashboard();
  atualizarAgendamentos();
});
