
        // gestion du bouton vote pour un seul electeur et un seul candidat 
        // initialisation des donnees
        function getStorage(key){
            const data = localStorage.getItem(key);
            if(data ===null || data === "undefined"){
                return{};
            }
            try{
                return JSON.parse(data);
            }catch(e){
                console.error("erreur de lecture du localstorage pour la cle:",key,e)
                return{};
            }
        }
        function setStorage(key, value){
            localStorage.setItem(key , JSON.stringify(value));
        }
        // intialiser les structures si elles n'exixtent pas 
        if (!localstorage.getItem('voterStatus'))
        {
            setStorage('voterStatus',{});
        }
        if(!localStorage.getItem('electionResults')){
            setStorage('electionResults',{});
        }
        // fonction pour recuperer le nom de l'election 
        // cette fonction est adaptee au nom de nos fichiers page 
        function getCurrentElectiontype(){
            // deduction de deduction du type d'election grace a l'url de la page 
            const path = window.location.pathname;
            // extrait la partie apres 'elec' et avant 'html' 
            const match = path.match(/elec_([a-z]+)\.html/i);
            return match ? match[1] : 'unknown';
            // retourne senatoriale , presidentiel etc... 
        }
        const CURRENT_ELECTION = getCurrentElectiontype();
        function disableVoteButtons(){
            document.querySelectorAll('.vote-button').forEach(button =>{
                button.disabled = true ;
                button.textContent = "VOTE EFFECTUE";
                button.classList.remove('btn-succes');
                button.classList.add('btn-secondary');
            });
        }
        // @param {string} candidateName : nom du candidat selectionne
        function handlevote(candidateName){
            const voterStatus = getStorage('voterStatuts');
            const electionResults = getStorage('electionResults');
            // verification du vote unique 
            if(voterStatus[CURRENT_ELECTION]){
                console.warn("vous avez deja votepour cette election.Votre vote ne sera pas domptabilise a nouveau");
                return; 
                // arreter la fonction 
            }
            // Enregistrement du vote 
            voterStatus[CURRENT_ELECTION] = true;
            setStorage('voterStatuts',voterStatus);
            alert('vote por $ {candidateName} enregistre avec succes!');
            disableVoteButtons();
        }
        //fonction pour desactiver les boutons
       
        document.addEventListener('DOMcontentLoaded',() =>
    {
        if (!localStorage.getItem('voterStatuts')){
            setStorage('voterStatuts',{});
        }
        const voterStatus = getStorage('voterStatuts');
        if(voterStatus[CURRENT_ELECTION]){
            disableVoteButtons();
        }
    });