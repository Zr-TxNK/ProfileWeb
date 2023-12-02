let x;

document.getElementById("roll").onclick = function(){

    x = Math.floor(Math.random() * 1001) ;

    document.getElementById("wysi").innerHTML = x ;
}

