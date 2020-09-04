function logar(){
    var mensagem = {
        email:document.getElementById("txt_email").value,
        senha:document.getElementById("txt_senha").value
    };
    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/login", cabecalho)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user", JSON.stringify(res));
        window.location = "gestor.html";
    })
    .catch(err => {
        window.alert("Não autorizado");
    });
}

function validarLogin(){
    var str_usuario = localStorage.getItem("user");
    if(str_usuario){
        window.location="gestor.html";
    } 
}