document.getElementById('cepInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const cep = event.target.value.trim();
        const cepOutput = document.getElementById('cepOutput');
        const loading = document.getElementById('loading');

        if (cep.length !== 8 || isNaN(cep)) {
            cepOutput.textContent = 'Por favor, insira um CEP válido de 8 dígitos.';
            return;
        }

        loading.style.display = 'block';
        cepOutput.textContent = '';

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                loading.style.display = 'none';
                if (data.erro) {
                    cepOutput.textContent = 'CEP não encontrado';
                } else {
                    const cepFormatado = data.cep.replace(/[^0-9a-zA-Z]/g, '');
                    const logradouroFormatado = data.logradouro.replace(/[^0-9a-zA-Z ]/g, '');
                    const bairroFormatado = data.bairro.replace(/[^0-9a-zA-Z ]/g, '');
                    const localidadeFormatada = data.localidade.replace(/[^0-9a-zA-Z ]/g, '');
                    const ufFormatada = data.uf.replace(/[^0-9a-zA-Z]/g, '');
                    cepOutput.innerHTML = `
                        <div>CEP: ${cepFormatado}</div>
                        <div>Logradouro: ${logradouroFormatado}</div>
                        <div>Bairro: ${bairroFormatado}</div>
                        <div>Cidade: ${localidadeFormatada}</div>
                        <div>Estado: ${ufFormatada}</div>
                    `;
                }
            })
            .catch(error => {
                loading.style.display = 'none';
                cepOutput.textContent = 'Erro ao buscar CEP';
                console.error('Erro:', error);
            });
    }
});
