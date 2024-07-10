document.getElementById('cepInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const cep = event.target.value;
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    document.getElementById('cepOutput').textContent = 'CEP não encontrado';
                } else {
                    document.getElementById('cepOutput').innerHTML = `
                        <div>CEP: ${data.cep}</div>
                        <div>Logradouro: ${data.logradouro}</div>
                        <div>Bairro: ${data.bairro}</div>
                        <div>Cidade: ${data.localidade}</div>
                        <div>Estado: ${data.uf}</div>
                    `;
                }
            })
            .catch(error => {
                document.getElementById('cepOutput').textContent = 'Erro ao buscar CEP';
                console.error('Erro:', error);
            });
    }
});
