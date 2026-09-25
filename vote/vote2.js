let avote=false;
function handlevote(nomCandidat){
    if(avote){
        alert("Vous avez déjà voté !");
        return;
    }
    alert("Vous avez voté pour " + nomCandidat + " !");
    avote=true;
    //desactiver tout les boutons pour empecher un deuxieme vote

    document.querySelectorAll('.vote-button').forEach(btn => {btn.disabled =true;});
    
    // Rediriger vers la page d'accueil après 2 secondes
    setTimeout(function() {
        window.top.location.href = window.top.location.origin + '/Accueil.html';
    }, 2000);

}