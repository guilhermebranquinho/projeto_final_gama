function gravar(){

    var data = document.getElementById("txt_nascimento").value;
    var ano = data.substring(0,4);
    var mes = data.substring(5,7);
    var dia = data.substring(8);
    var nossa_data = dia + "/" + mes + "/" + ano;

    var mensagem = {
        nome : document.getElementById("txt_nome").value,
        nacionalidade : document.getElementById("txt_nacionalidade").value,
        nascimento : nossa_data
    }

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/incluirartista", cabecalho)
    .then(res => res.json())
    .then(res => {
        window.alert("Gravado com sucesso");
        window.alert(nossa_data);
        window.location = "artista.html";
    })
    .catch(err => {
        window.alert("Erro");
    });
}

function preencherTabela(lista){
    var tabela = 
    "<div class='row'>" +
    "<div class='col-12'>" +
    "<table border='1' align='center' width='80%' cellspacing='2'>" +
    "<tr>" +
    "<th>Artista</th>" + 
    "<th>País</th>" +
    "<th>Nascimento</th>" +
    "</tr>";

    for(cont=0;cont<lista.length;cont++){
        tabela+=
        "<tr>" +
        "<td>" + lista[cont].nome + "</td>" +
        "<td>" + lista[cont].nacionalidade + "</td>" +
        "<td>" + lista[cont].nascimento + "</td>" +
        "</tr>";
    }

    tabela+= "</table></div></div>";
    document.getElementById("artistas").innerHTML=tabela;
}

function carregarArtistas(){
    fetch("http://localhost:8080/artistas")
    .then(res => res.json())
    .then(res => preencherTabela(res));
}

    
