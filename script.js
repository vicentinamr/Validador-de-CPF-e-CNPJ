function validarDocumento() {
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const documento = document.getElementById('documentoInput').value;
    const resultado = document.getElementById('resultado');

    // Remove caracteres não numéricos
    const documentoLimpo = documento.replace(/\D/g, '');

    if (tipoDocumento === 'cpf') {
        if (validarCPF(documentoLimpo)) {
            resultado.textContent = 'CPF válido!';
            resultado.style.color = 'green';
        } else {
            resultado.textContent = 'CPF inválido!';
            resultado.style.color = 'red';
        }
    } else if (tipoDocumento === 'cnpj') {
        if (validarCNPJ(documentoLimpo)) {
            resultado.textContent = 'CNPJ válido!';
            resultado.style.color = 'green';
        } else {
            resultado.textContent = 'CNPJ inválido!';
            resultado.style.color = 'red';
        }
    }
}

function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica os dígitos verificadores
    return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
}

function validarCNPJ(cnpj) {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;

    // Calcula o segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica os dígitos verificadores
    return parseInt(cnpj[12]) === digito1 && parseInt(cnpj[13]) === digito2;
}