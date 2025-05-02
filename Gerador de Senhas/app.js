document.addEventListener('DOMContentLoaded', () => {
    const palavra1Input = document.getElementById('palavra1');
    const palavra2Input = document.getElementById('palavra2');
    const palavra3Input = document.getElementById('palavra3');
    const embaralharBtn = document.getElementById('embaralharBtn');
    const limparBtn = document.querySelector('.buttonRefresh');
    const senhaGeradaInput = document.getElementById('senhaGerada');
    const copiarBtn = document.getElementById('copiarBtn');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    function embaralhar(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    function gerarSenhaForte() {
        const palavra1 = palavra1Input.value.trim();
        const palavra2 = palavra2Input.value.trim();
        const palavra3 = palavra3Input.value.trim();

        if (!palavra1 || !palavra2) {
            alert('Por favor, insira pelo menos duas palavras.');
            return;
        }

        let palavras = [palavra1, palavra2];
        if (palavra3) {
            palavras.push(palavra3);
        }

        let senhaBase = palavras.join('-');
        let senhaEmbaralhada = embaralhar(senhaBase);

        const caracteresEspeciais = "!@#$%^&*()_+=-`~[]{}|;':\",./<>?";
        const numeros = "0123456789";

        const adicionarAleatorio = (str) => {
            const indiceAleatorio = Math.floor(Math.random() * str.length);
            return str.charAt(indiceAleatorio);
        };

        senhaEmbaralhada += adicionarAleatorio(caracteresEspeciais);
        senhaEmbaralhada += adicionarAleatorio(numeros);
        senhaEmbaralhada = embaralhar(senhaEmbaralhada);

        senhaGeradaInput.value = senhaEmbaralhada;
    }

    function limparCampos() {
        palavra1Input.value = '';
        palavra2Input.value = '';
        palavra3Input.value = '';
        senhaGeradaInput.value = '';
    }

    function alternarTema() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.classList.remove('ativo');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.classList.add('ativo');
        }
    }

    embaralharBtn.addEventListener('click', gerarSenhaForte);
    limparBtn.addEventListener('click', limparCampos);
    copiarBtn.addEventListener('click', () => {
        senhaGeradaInput.select();
        document.execCommand('copy');
        alert('Senha copiada para a área de transferência!');
    });
    themeToggle.addEventListener('click', alternarTema);
});
