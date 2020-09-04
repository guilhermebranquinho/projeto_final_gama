function exibirUsuario(){
    var str_usuario = localStorage.getItem("user");
    if(str_usuario){
        var usuario = JSON.parse(localStorage.getItem("user"));
        document.getElementById("foto").innerHTML = "<img alt='sem foto' width='10%' src=images/" + usuario.foto + ">";
        document.getElementById("dados").innerHTML = "<h3> Nome: " + usuario.nome + "<br> Email: " + usuario.email + "<br> User ID: " + usuario.id + "</h3>";
    }else{
        window.location="login.html";
    }
}