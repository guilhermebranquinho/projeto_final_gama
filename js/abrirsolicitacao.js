function preencherCombo(lista){
    var dados="";
    for (cont=0;cont<lista.length;cont++){
        dados+=
        "<option value='" + lista[cont].id + "'>" + lista[cont].nome + "</option>"
    }
    document.getElementById("combo_pdv").innerHTML=dados;
}


function carregarPDV(){
    fetch("http://localhost:8080/pdv")
    .then(res => res.json())
    .then(res => preencherCombo(res));
}


function gravar(){

    if (document.getElementById("txt_nome").value == ""){
        alert("Preencha o campo Técnico");
        document.getElementById("txt_nome").focus();
        return false;
    }
    if (document.getElementById("txt_operadora").value == ""){
        alert("Preencha o campo Operadora");
        document.getElementById("txt_operadora").focus();
        return false;
    }
    if (document.getElementById("txt_telefone").value == ""){
        alert("Preencha o campo Celular/Whatsapp");
        document.getElementById("txt_telefone").focus();
        return false;
    }
    if (document.getElementById("txt_documento").value == ""){
        alert("Preencha o campo Documento");
        document.getElementById("txt_documento").focus();
        return false;
    }
    if (document.getElementById("txt_data").value == ""){
        alert("Preencha o campo Data");
        document.getElementById("txt_data").focus();
        return false;
    }
    if (document.getElementById("txt_hora").value == ""){
        alert("Preencha o campo Hora");
        document.getElementById("txt_hora").focus();
        return false;
    }


    var data = document.getElementById("txt_data").value;
    var ano = data.substring(0,4);
    var mes = data.substring(5,7);
    var dia = data.substring(8);
    var nossa_data = dia + "/" + mes + "/" + ano;



    var horario = document.getElementById("txt_hora").value;

    var hora = horario.substring(0,2);
    var minuto = horario.substring(3,5);
    var nosso_horario = hora + ":" + minuto;
   
    var mensagem = {
        nome_tecnico : document.getElementById("txt_nome").value,
        operadora : document.getElementById("txt_operadora").value,
        telefone : document.getElementById("txt_telefone").value,
        doc : document.getElementById("txt_documento").value,
        pdv : { id : document.getElementById("combo_pdv").value},
        data : nossa_data,
        hora : nosso_horario,
        status : "inicial"
    }

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/novasolicitacao", cabecalho)
    .then(res => res.json())
    .then(res => {
        window.alert("Solicitação aberta com sucesso");
        window.location = "abrirsolicitacao.html";
    })
    .catch(err => {
        window.alert("Erro ao abrir solicitação");
    });
}

function carregarPagina(){
    var str_usuario = localStorage.getItem("user");
    if(str_usuario){
        document.getElementById("bloco_logout").innerHTML = "<input type='button' class='btn btn-primary float-right' onclick='logout()' value='Logout' style='margin : 1px !important;'>";
    }
    carregarPDV();
}

function logout(){
    localStorage.removeItem("user");
    window.location="login.html";
}


