document.addEventListener('DOMContentLoaded', function () {
    // Alternar entre as páginas
    document.querySelectorAll('.sidebar ul li').forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = btn.id.replace('btn-', '');
            mostrarPagina(id);
        });
    });

    // Inicializar com a página do Dashboard visível
    mostrarPagina('dashboard');
    
    // Função para mostrar a página ativa
    function mostrarPagina(pagina) {
        // Remover a classe 'ativo' de todas as páginas
        document.querySelectorAll('.pagina').forEach((el) => {
            el.classList.remove('ativo');
        });

        // Mostrar a página solicitada
        document.getElementById(pagina).classList.add('ativo');
    }

    // Função para salvar dados no LocalStorage
    function salvarDados(chave, dados) {
        localStorage.setItem(chave, JSON.stringify(dados));
    }

    // Função para carregar dados do LocalStorage
    function carregarDados(chave) {
        return JSON.parse(localStorage.getItem(chave)) || [];
    }

    // Função para atualizar o total de clientes no Dashboard
    function atualizarClientes() {
        const clientes = carregarDados('clientes');
        const listaClientes = document.getElementById('lista-clientes');
        listaClientes.innerHTML = '';
        clientes.forEach((cliente, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${cliente.nome} (${cliente.email})
                <button onclick="removerCliente(${index})">Remover</button>
            `;
            listaClientes.appendChild(li);
        });
        document.getElementById('total-clientes').textContent = clientes.length;
    }

    // Função para adicionar cliente
    document.getElementById('form-cliente').addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nome-cliente').value;
        const email = document.getElementById('email-cliente').value;
        const clientes = carregarDados('clientes');
        clientes.push({ nome, email });
        salvarDados('clientes', clientes);
        e.target.reset();
        atualizarClientes();
    });

    // Função para remover cliente
    window.removerCliente = function (index) {
        const clientes = carregarDados('clientes');
        clientes.splice(index, 1);
        salvarDados('clientes', clientes);
        atualizarClientes();
    }

    // Função para atualizar os agendamentos no Dashboard
    function atualizarAgendamentos() {
        const agendamentos = carregarDados('agendamentos');
        const listaAgendamentos = document.getElementById('lista-agendamentos');
        listaAgendamentos.innerHTML = '';
        agendamentos.forEach((agendamento, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${agendamento.nome} - ${agendamento.data} - ${agendamento.horaInicio} a ${agendamento.horaFim} - Status: ${agendamento.status}
                <button onclick="removerAgendamento(${index})">Remover</button>
            `;
            listaAgendamentos.appendChild(li);
        });
        document.getElementById('total-agendamentos').textContent = agendamentos.length;
        atualizarProximosAtendimentos();
    }

    // Função para adicionar agendamento
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

        const agendamentos = carregarDados('agendamentos');
        agendamentos.push({ nome, data, horaInicio, horaFim, numeroCliente, valorServico, formaPagamento, status });
        salvarDados('agendamentos', agendamentos);
        e.target.reset();
        atualizarAgendamentos();
    });

    // Função para remover agendamento
    window.removerAgendamento = function (index) {
        const agendamentos = carregarDados('agendamentos');
        agendamentos.splice(index, 1);
        salvarDados('agendamentos', agendamentos);
        atualizarAgendamentos();
    }

    // Função para exibir próximos atendimentos no Dashboard
    function atualizarProximosAtendimentos() {
        const agendamentos = carregarDados('agendamentos');
        const proximosAtendimentos = document.getElementById('proximos-atendimentos');
        proximosAtendimentos.innerHTML = '';
        
        const proximos = agendamentos
            .filter(agendamento => agendamento.status !== 'concluido')
            .sort((a, b) => new Date(a.data + ' ' + a.horaInicio) - new Date(b.data + ' ' + b.horaInicio))
            .slice(0, 5); // Exibe apenas os 5 próximos atendimentos

        proximos.forEach(agendamento => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${agendamento.nome} - ${agendamento.data} - ${agendamento.horaInicio} a ${agendamento.horaFim}
                - Status: ${agendamento.status}
            `;
            proximosAtendimentos.appendChild(li);
        });
    }

    // Chamada inicial para preencher o Dashboard
    atualizarClientes();
    atualizarAgendamentos();
});
