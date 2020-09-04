function preencherCombo(lista){
    var dados="";
    for (cont=0;cont<lista.length;cont++){
        dados+=
        "<option value='" + lista[cont].id + "'>" + lista[cont].nome + "</option>"
    }
    document.getElementById("combo_artistas").innerHTML=dados;
}

function carregarArtistas(){
    fetch("http://localhost:8080/artistas")
    .then(res => res.json())
    .then(res => preencherCombo(res));
}