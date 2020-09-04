function exibirUsuario(){
    var str_usuario = localStorage.getItem("user");
    if(str_usuario){
        var usuario = JSON.parse(localStorage.getItem("user"));
        document.getElementById("foto").innerHTML = "<img alt='sem foto' height='50px' src=images/" + usuario.foto + ">";
        document.getElementById("dados").innerHTML = "<h3>" + usuario.nome + " (" + usuario.racf + ")" + "</h3>";
        document.getElementById("titulo_aba").innerHTML = usuario.racf;
    }else{
        window.location="login.html";
    }
    carregarSolicitacoesLoad();
}

function logout(){
    localStorage.removeItem("user");
    window.location="login.html";
}

function preencherTabela(lista){
    var tabela = 
    "<table border='1' align='center' width='80%' max-width='100%' cellspacing='2'>" +
    "<tr>" +
    "<th>Técnico</th>" + 
    "<th>Operadora</th>" +
    "<th>PDV</th>" +
    "<th>Data/Hora</th>" +
    "<th>Status</th>" +
    "<th>Botões</th>" +
    "</tr>";

    for(cont=0;cont<lista.length;cont++){
        tabela+=
        "<tr>" +
        "<td>" + lista[cont].nome_tecnico + "</td>" +
        "<td>" + lista[cont].operadora + "</td>" +
        "<td>" + lista[cont].pdv.nome + "</td>" +
        "<td>" + lista[cont].data + " " + lista[cont].hora + "</td>" +
        "<td>" + lista[cont].status + "</td>" +
        "<td>" + "<button type='button' class='btn btn-success' onclick='aprovarSolicitacao(" + lista[cont].num_seq + ")'></button><button type='button' class='btn btn-warning' onclick='negarSolicitacao(" + lista[cont].num_seq + ")'></button><button type='button' class='btn btn-danger' onclick='cancelarSolicitacao(" + lista[cont].num_seq + ")'></button>" + "</td>" +
        "</tr>";
    }

    tabela+= "</table>";
    document.getElementById("tabela_solicitacao").innerHTML=tabela;
}

function carregarSolicitacoesLoad(){
    fetch("http://localhost:8080/solicitacoes")
    .then(res => res.json())
    .then(res => preencherTabela(res));
}

function carregarSolicitacoes(){
    var var_combo = document.getElementById("combo_status").value;
    if (var_combo == "todas"){
        fetch("http://localhost:8080/solicitacoes")
        .then(res => res.json())
        .then(res => preencherTabela(res));
    }else{
        fetch("http://localhost:8080/solicitacao/" + var_combo)
        .then(res => res.json())
        .then(res => preencherTabela(res));
    }

}

function aprovarSolicitacao(codigo){
 
    var mensagem = {
        num_seq : codigo,
        status : "aprovada"
    };

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/atualizarsolicitacao", cabecalho)
    .then(res => res.json())
    .then(res => {
        window.alert("Aprovada com sucesso");
        window.location = "gestor.html";
    })
    .catch(err => {
        window.alert("Erro ao aprovar");
    });
}

function negarSolicitacao(codigo){
 
    var mensagem = {
        num_seq : codigo,
        status : "negada"
    };

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/atualizarsolicitacao", cabecalho)
    .then(res => res.json())
    .then(res => {
        window.alert("Negada com sucesso");
        window.location = "gestor.html";
    })
    .catch(err => {
        window.alert("Erro ao negar");
    });
}

function cancelarSolicitacao(codigo){
 
    var mensagem = {
        num_seq : codigo,
        status : "cancelada"
    };

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/atualizarsolicitacao", cabecalho)
    .then(res => res.json())
    .then(res => {
        window.alert("Cancelado com sucesso");
        window.location = "gestor.html";
    })
    .catch(err => {
        window.alert("Erro ao cancelar");
    });
}

