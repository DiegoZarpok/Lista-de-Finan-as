let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;

    const transacao = { descricao, valor, data };
    transacoes.push(transacao);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    renderTable();
    this.reset();
});

document.getElementById('valor').addEventListener('input', function(event) {
    let value = event.target.value;
    if (!value.startsWith('R$')) {
        value = 'R$' + value.replace(/[^\d]/g, '');
    }
    event.target.value = value;
});

function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
}

function renderTable() {
    const tbody = document.getElementById('transacoesTableBody');
    tbody.innerHTML = '';
    transacoes.forEach((transacao, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transacao.descricao}</td>
            <td>${transacao.valor}</td>
            <td>${formatDate(transacao.data)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTransacao(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTransacao(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editTransacao(index) {
    const transacao = transacoes[index];
    document.getElementById('descricao').value = transacao.descricao;
    document.getElementById('valor').value = transacao.valor;
    document.getElementById('data').value = transacao.data;
    transacoes.splice(index, 1);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    renderTable();
}

function deleteTransacao(index) {
    transacoes.splice(index, 1);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    renderTable();
}

renderTable();
