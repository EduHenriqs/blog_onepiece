function fazerRequisicao() {


    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    var dataFormatada = mes + '-' + dia + '-' + ano;


    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial=\'03-26-2024\'&@dataFinalCotacao=\'${dataFormatada}\'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao realizar a requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var cotacaoCompra = data.value[0].cotacaoCompra;
            var dolarCompra = document.getElementById("dolarCompra");
            dolarCompra.innerHTML = 'R$' + cotacaoCompra.toFixed(2);

            var cotacaoVenda = data.value[0].cotacaoVenda;
            var dolarVenda = document.getElementById("dolarVenda");
            dolarVenda.innerHTML = 'R$' + cotacaoVenda.toFixed(2);

            var dataHoraCotacao = data.value[0].dataHoraCotacao;
            var ultimaCotacao = document.getElementById("ultimaCotacao");
            ultimaCotacao.innerHTML = dataHoraCotacao;

        })

}