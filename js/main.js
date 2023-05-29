// Utilizando API de buscador de CEP
var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaCEP(cep.value));

async function buscaCEP(cep){

    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";

    try{

        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro){
            throw Error('Cep não existe');
        }

        console.log(consultaCepConvertida);

        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var localidade = document.getElementById('cidade');
        var uf = document.getElementById('estado');
        var ddd = document.getElementById('telefone')

        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        localidade.value = consultaCepConvertida.localidade;
        uf.value = consultaCepConvertida.uf;

        return consultaCepConvertida;

    }catch(erro){
        mensagemErro.innerHTML = `<p class="erro">CEP invalido.Tente Novamente</p>`;

        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var localidade = document.getElementById('cidade');
        var uf = document.getElementById('estado');
        var ddd = document.getElementById('telefone')

        logradouro.value = "";
        bairro.value = "";
        localidade.value = "";
        uf.value = "";
        ddd.value = "";

    }

}

// verificando e arrumando o contato
var contato = document.getElementById('telefone');
contato.addEventListener('focusout', () => corrigirContato(contato.value));

function corrigirContato(){

    var mensagemErro = document.getElementById("erroContato");
        mensagemErro.innerHTML = "";

    if(contato.value.length == 11){
        contato.value = `(${(contato.value).slice(0,2)}) ${(contato.value).slice(2, 7)}-${(contato.value).slice(7, 11)}`
    }else{
        mensagemErro.innerHTML = `<p class="erro">Numero inválido.Tente Novamente</p>`;
    }
}