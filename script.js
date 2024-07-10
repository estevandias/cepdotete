function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido!');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('resultado').innerHTML = 'CEP não encontrado.';
            } else {
                document.getElementById('resultado').innerHTML = `
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Erro ao buscar o CEP. Tente novamente mais tarde.';
            console.error('Erro:', error);
        });
}
