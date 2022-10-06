//Gestion des onglets

//Définition des variables
let onglets = document.querySelectorAll('.onglets');
let index   = 0;

const contenu = document.querySelectorAll('.contenu');

onglets.forEach(onglet =>{
    onglet.addEventListener('click', ()=>{
        if(onglet.classList.contains('actif')){
            return;
        }else{
            onglet.classList.add('actif');
        }
        index = onglet.getAttribute('data-anim');
            for(i=0; i<onglets.length; i++){
                if((onglets[i]).getAttribute('data-anim')!== index){
                    onglets[i].classList.remove('actif');
                }
            }

        for(j=0; j<contenu.length; j++){
            if(contenu[j].getAttribute('data-anim') == index){
                contenu[j].classList.add('activeContenu');
                }else{
                    contenu[j].classList.remove('activeContenu');
                }
        }
    })
})

//Class object wine
class bottleWine{
    constructor(nomVin, typeVin, anneeVin, cepageVin, nbrBouteille, accord, com){
        this.nomVin       = nomVin;
        this.typeVin      = typeVin;
        this.anneeVin     = anneeVin;
        this.cepageVin    = cepageVin;
        this.nbrBouteille = nbrBouteille;
        this.accord       = accord ;
        this.com          = com;
    }
}

//Class object beer

class bottleBeer{
    constructor(nomBeer, typeBeer, paysBeer, nbrBottleBeer, accordBeer, comBeer){
        this.nomBeer       = nomBeer;
        this.typeBeer      = typeBeer;
        this.paysBeer      = paysBeer;
        this.nbrBottleBeer = nbrBottleBeer;
        this.accordBeer    = accordBeer;
        this.comBeer       = comBeer;
    }
}

//variable definition
let myBottleWine ={};
let myCaveofWine =[];
let myBottleBeer ={};
let myCaveOfBeer =[];
let ajoutvin     = document.querySelector('#ajoutvin');
let ajoutbiere   = document.querySelector('#ajoutbiere');
let tablecavevin = document.querySelector('#cavevin');
let tablecaveall = document.querySelector('#caveall');
let indexWineName;
let recupCaveOfWine;
let nom;
let type;
let cepage;
let annee;
let nbrBouteille;
let accord;
let com;
let median;
let indexNbrOfBottle;
let caveWineToShow;
let nomBeer;
let typeBeer;
let paysBeer;
let nbrBottleBeer;
let accordBeer;
let comBeer;
let i = 0;
let result;


//Class static function 
class fonctionWine{
    static createObjectWine(){
        nom          = document.querySelector('#nom-vin').value.toLowerCase();
        nom          = nom.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
        type         = document.querySelector('#type-vin');
        type         = type.options[type.selectedIndex].text;
        cepage       = document.querySelector('#cepage-vin').value.toLowerCase(); 
        cepage       = cepage.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
        annee        = document.querySelector('#annee-vin').value;
        nbrBouteille = document.querySelector('#nbrvin').value;
        accord       = document.querySelector('#accordvin').value;
        com          = document.querySelector('#com-vin').value;

        myBottleWine = new bottleWine(nom, type, annee, cepage, nbrBouteille, accord, com);
    }

    static addWineToCave(array){
        array.push(myBottleWine);
    }

    static sortChronoName(a, b){
        return a.nomVin - b.nomVin;
    }


    static researchWine(array, nameToFind, yearToFind, cepageToFind){
        i = 0;
        while(i<=array.length){
            if(i == array.length){
                result = false;
                return result;
            }else if(array[i].nomVin == nameToFind && array[i].anneeVin == yearToFind && array[i].cepageVin == cepageToFind){
                result = true;
                return i;
            } 
            i++;
        }
    }

    static registerTable(key, cave){
        localStorage.setItem(key, JSON.stringify(cave));
        window.location.reload();
    }

    static showWine(cave){
        cave = JSON.parse(localStorage.getItem('vin'));
            for(let wine of cave){                
                tablecavevin.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td><a href=#'+wine.nomVin.replaceAll(' ', '_')+wine.anneeVin+' class="openModal">'+ wine.nomVin +'</a></td>'
                +'<aside id="'+ wine.nomVin.replaceAll(' ', '_')+wine.anneeVin +'" class="modal" aria-hidden="true" role="dialog" aria-labelledby="'+ wine.nomVin+wine.anneeVin +'" style="display : none;">'
                +'<div class="modal-wrapper">'
                +'<h1 id='+wine.nomVin+'>Modification</h1>'
                +'<h2 class="titre-bout">Ma bouteille : <br/>'+ wine.nomVin + '</h2>'
                +'<p class="type-bout">Type : <br/>' + wine.typeVin + '</p>'
                +'<p class="annee-bout">Année : <br/>' + wine.anneeVin + '</p>'
                +'<p class="cepage-bout">Cépage : <br/>' + wine.cepageVin + '</p>'
                +'<label for="nbr-bout">Nombre de bouteille : </label><br/>'
                +'<input type="number" id="nbr-bout" value="'+ wine.nbrBouteille +'"></input><br/><br/>'
                +'<label for="accord-bout">Accord mets/vins</label><br/>'
                +'<input type="text" id="accord-bout" value="'+ wine.accord +'"</input><br/><br/>'
                +'<label for="com-bout">Commentaires - Avis</label><br/><br/>'
                +'<textarea id="com-bout" row="8" cols="30">'+ wine.com +'</textarea><br/><br/>'
                +'<button class="modif" type="button">Enregistrer</button><br/>'
                +'<button class="js-close" type="button">Fermer</button>'
                +'</aside>'
                +'<td>'+ wine.typeVin      +'</td>'
                +'<td>'+ wine.anneeVin     +'</td>'
                +'<td>'+ wine.cepageVin    +'</td>'
                +'<td>'+ wine.nbrBouteille +'</td>'
                +'<td>'+ wine.accord       +'</td>'
                +'<td>'+ wine.com          +'</td>');

                tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td>'+ wine.nomVin +'</td>'
                +'<td>'+ wine.typeVin      +'</td>'
                +'<td>'+ wine.anneeVin     +'</td>'
                +'<td>'+ wine.cepageVin    +'</td><td></td>'
                +'<td>'+ wine.nbrBouteille +'</td>'
                +'<td>'+ wine.accord       +'</td>'
                +'<td>'+ wine.com          +'</td>');
            }
    }

    static modifWine(){
        let name      = modal.querySelector('.titre-bout').textContent.slice(15);
        let annee     = modal.querySelector('.annee-bout').textContent.slice(8);
        let cepage    = modal.querySelector('.cepage-bout').textContent.slice(9);
        let accord    = modal.querySelector('#accord-bout').value;
        let nbrBottle = modal.querySelector('#nbr-bout').value;
        let com       = modal.querySelector('#com-bout').value;
        myCaveofWine = JSON.parse(localStorage.getItem('vin'));
        myCaveofWine = myCaveofWine.sort(fonctionWine.sortChronoName);
        fonctionWine.researchWine(myCaveofWine, name, annee, cepage);
            myCaveofWine[i].nbrBouteille = nbrBottle;
            myCaveofWine[i].accord       = accord;
            myCaveofWine[i].com          = com;

        localStorage.setItem('vin', JSON.stringify(myCaveofWine));
        window.location.reload();
    }
    
}

class fonctionBeer{
    static createObjectBeer(){
        nomBeer      = document.querySelector('#nom-biere').value.toLowerCase();
        nomBeer      = nomBeer.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
        typeBeer     = document.querySelector('#type-biere');
        typeBeer     = typeBeer.options[type.selectedIndex].text;
        paysBeer     = document.querySelector('#pays-biere').value.toLowerCase(); 
        paysBeer     = paysBeer.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
        nbrBottleBeer= document.querySelector('#nbrbiere').value;
        accordBeer   = document.querySelector('#accordbiere').value;
        comBeer      = document.querySelector('#com-biere').value;

        myBottleBeer = new bottleBeer(nomBeer, typeBeer, paysBeer, nbrBottleBeer, accordBeer, comBeer);
    }

    static addBeerToCave(array){
        array.push(myBottleBeer);
    }

    static showBeer(cave){
        cave = JSON.parse(localStorage.getItem('beer'));
            for(let beer of cave){
                tablecavebiere.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td><a href="#'+beer.nomBeer.replaceAll(" ", "_")+beer.typeBeer+'" class="openModal">'+beer.nomBeer+'</a></td>'
                +'<aside id="'+beer.nomBeer.replaceAll(" ", "_")+beer.typeBeer+'" class="modal" aria-hidden="true" role="dialog" aria-labelledby="'+beer.nomBeer+'" style="display : none;">'
                +'<div class="modal-wrapper">'
                +'<h1 id="'+beer.nomBeer+'">Modification</h1>'
                +'<h2 class="titre-biere">Ma bière : <br/>'+beer.nomBeer+'</h2>'
                +'<p class="type-biere">Type : <br/>'+beer.typeBeer+'</p>'
                +'<p class="pays-biere">Pays : <br/>'+beer.paysBeer+'</p>'
                +'<label for="nbr-biere">Nombre de bouteilles</label><br/>'
                +'<input type="number" id="nbr-biere" value="'+beer.nbrBottleBeer+'"></input><br/>'
                +'<label for="accord-biere">Accord mets/bière</label><br/>'
                +'<input type="text" id="accord-biere" value="'+beer.accordBeer+'"></input><br/>'
                +'<label for="com-biere">Commentaires - avis</label><br/>'
                +'<textarea id="com-biere" row="8" cols="30">'+beer.comBeer+'</textarea><br/>'
                +'<button type="button" class="modif">Enregistrer</button><br/><br/>'
                +'<button type="button" class="js-close">Fermer</button>'
                +'</aside>'
                +'<td>'+beer.typeBeer+'</td>'
                +'<td>'+beer.paysBeer+'</td>'
                +'<td>'+beer.nbrBottleBeer+'</td>'
                +'<td>'+beer.accordBeer+'</td>'
                +'<td>'+beer.comBeer+'</td>');
                tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td>'+beer.nomBeer+'</td>'+'<td>'+beer.typeBeer+'</td><td></td><td></td><td>'+beer.paysBeer+'</td><td>'+beer.nbrBottleBeer+'</td><td>'+beer.accordBeer+'</td><td>'+beer.comBeer+'</td>');
                
            }
    }
}

//Lors d'un ajout de vin 
//Déclaration des variables 

let nomvin;
let typevin;
let anneevin;
let cepagevin;
let nbrbouteillevin;
let accordvin;
let comvin;

let cavevin;

let indextable;

//i     = 1;
indextable = 0;

//Si ma cave à vin n'est pas nul alors affichage au démarrage
    if(localStorage.getItem('vin') !== null){
        fonctionWine.showWine(caveWineToShow);
    }

//Ajout d'un vin
    ajoutvin.addEventListener('click', ()=>{
        if(localStorage.getItem('vin') === null){
        fonctionWine.createObjectWine();
        fonctionWine.addWineToCave(myCaveofWine);
        fonctionWine.registerTable('vin', myCaveofWine);            
        }else if(localStorage.getItem('vin') !== null){
            fonctionWine.createObjectWine();
            myCaveofWine  = localStorage.getItem('vin');
            myCaveofWine  = JSON.parse(myCaveofWine);
            myCaveofWine  = myCaveofWine.sort(fonctionWine.sortChronoName);
            let nameWine   = modal.querySelector('#nom-vin').value.toLowerCase();
                nameWine   = nameWine.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
            let anneeWine  = modal.querySelector('#annee-vin').value;
            let cepageWine = modal.querySelector('#cepage-vin').value.toLowerCase();
                cepageWine = cepageWine.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ù', 'ù');
            fonctionWine.researchWine(myCaveofWine, nameWine, anneeWine, cepageWine);
            if(result == true){
                let numberBottleObject = parseInt(myBottleWine.nbrBouteille);
                let numberBottleCave   = parseInt(myCaveofWine[i].nbrBouteille);
                let sum = numberBottleCave + numberBottleObject;
                myCaveofWine[i].nbrBouteille = sum;
                localStorage.setItem('vin', JSON.stringify(myCaveofWine));
                window.location.reload();
            }else if(result == false){
                fonctionWine.createObjectWine();
                fonctionWine.addWineToCave(myCaveofWine);
                fonctionWine.registerTable('vin', myCaveofWine);
            }
        }
        document.querySelector('.formvin').reset();
    }) 


//Gestion variable bières


    let nombiere;
    let typebiere;
    let paysbiere;
    let nbrbouteillebiere;
    let accordbiere;
    let combiere;

    let cavebiere;
    let tablecavebiere;

//Si ma cave à bière est différent de nul alors affichage au démarrage
    if(localStorage.getItem('biere') !==null){
        fonctionBeer.showBeer(caveBeerToShow);
    }


//Ajout bière

ajoutbiere.addEventListener('click', ()=>{
    //Je définis toutes les valeurs à récupérer
    let nom_biere     = document.querySelector('#nom-biere').value;
    let type_biere    = document.querySelector('#type-biere');
        type_biere    = type_biere.options[type_biere.selectedIndex].text;
    let pays_biere    = document.querySelector('#pays-biere').value;   
    let nbrbout_biere = document.querySelector('#nbrbiere').value;
    let accord_biere  = document.querySelector('#accorbiere').value;
    let com_biere     = document.querySelector('#com-biere').value;

    let identique;

    if(localStorage.getItem('biere') == null){
        nombiere          = [];
        typebiere         = [];
        paysbiere         = [];
        nbrbouteillebiere = [];
        accordbiere       = [];
        combiere          = [];

        cavebiere = [nombiere, typebiere, paysbiere, nbrbouteillebiere, accordbiere, combiere];

        nombiere.push(nom_biere);
        typebiere.push(type_biere);
        paysbiere.push(pays_biere);
        nbrbouteillebiere.push(nbrbout_biere);
        accordbiere.push(accord_biere);
        combiere.push(com_biere);
        cavebiere = [nombiere, typebiere, paysbiere, nbrbouteillebiere, accordbiere, combiere];

        localStorage.setItem('biere', JSON.stringify(cavebiere));

    }else if(localStorage.getItem('biere') !== null){
            for(let b=0; b<=nombiere.length; b++){
                if(nombiere[b] == nom_biere && typebiere == type_biere){

                    cavebiere = JSON.parse(localStorage.getItem('biere'));
                    nombiere          = cavebiere[0];
                    typebiere         = cavebiere[1];
                    paysbiere         = cavebiere[2];
                    nbrbouteillebiere = cavebiere[3];
                    accordbiere       = cavebiere[4];
                    combiere          = cavebiere[5];

                    nbrbouteillebiere.splice(b, b, parseInt(nbrbouteillebiere[b]) + parseInt(nbrbout_biere));
                    localStorage.setItem('biere', JSON.stringify(cavebiere));
                    window.location.reload();
                    return;
                }else{
                    identique = 'faux';
                }
            }
                if(identique === 'faux'){
                    cavebiere = JSON.parse(localStorage.getItem('biere'));

                    nombiere          = cavebiere[0];
                    typebiere         = cavebiere[1];
                    paysbiere         = cavebiere[2];
                    nbrbouteillebiere = cavebiere[3];
                    accordbiere       = cavebiere[4];
                    combiere          = cavebiere[5];

                    nombiere.push(nom_biere);
                    typevin.push(type_biere);
                    paysbiere.push(pays_biere);
                    nbrbouteillebiere.push(nbrbout_biere);
                    accordbiere.push(accord_biere);
                    combiere.push(com_biere);
                    cavebiere = [nombiere, typebiere, paysbiere, nbrbouteillebiere, accordbiere, combiere];
        
                    localStorage.setItem('biere', JSON.stringify(cavebiere));
                }
    }
    
    let tablecavebiere = document.querySelector('#cavebiere');
    let tablecaveall = document.querySelector('#caveall');

    i     = 1;
    indextable = 0;

    nombiere.forEach(function(element){
        if(document.querySelector('.nombiere'+i) === null){
            tablecavebiere.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td>'+element+'</td>'+'<td>'+typebiere[indextable]+'</td><td>'+paysbiere[indextable]+'</td><td>'+nbrbouteillebiere[indextable]+'</td><td>'+accordbiere[indextable]+'</td><td>'+combiere[indextable]+'</td>');
            tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td>'+element+'</td>'+'<td>'+typebiere[indextable]+'</td><td></td><td></td><td>'+paysbiere[indextable]+'</td><td>'+nbrbouteillebiere[indextable]+'</td><td>'+accordbiere[indextable]+'</td><td>'+combiere[indextable]+'</td>');

            i++;
            indextable++;
        }
    })
    document.querySelector('.formbiere').reset();
    window.location.reload();
})



const modifbiere = function(e){
    let name_biere   = modal.querySelector('.titre-biere').textContent.slice(11);
    let type_biere   = modal.querySelector('.type-biere').textContent.slice(7);
    let pays_biere   = modal.querySelector('.pays-biere').textContent.slice(7);

    let accord_biere = modal.querySelector('#accord-biere').value;
    let nbr_biere    = modal.querySelector('#nbr-biere').value;
    let com_biere    = modal.querySelector('#com-biere').value;

    cavebiere         = JSON.parse(localStorage.getItem('biere'));
    nombiere          = cavebiere[0];
    typebiere         = cavebiere[1];
    paysbiere         = cavebiere[2];
    nbrbouteillebiere = cavebiere[3];
    accordbiere       = cavebiere[4];
    combiere          = cavebiere[5];

    for(let mb=0; mb<=nomvin.length; mb++){
        if(nombiere[mb] === name_biere && typebiere[mb] === type_biere && paysbiere[mb] === pays_biere){
            nbrbouteillebiere.splice(mb, 1, nbr_biere);
            accordbiere.splice(mb, 1, accord_biere);
            combiere.splice(mb, 1, com_biere);
            if(nbrbouteillebiere[mb] == 0){
                nombiere.push(nombiere[mb]);
                typebiere.push(typebiere[mb]);
                nbrbouteillebiere.push(nbrbouteillebiere[mb]);
                accordbiere.push(accordbiere[mb]);
                combiere.push(combiere[mb]);
                paysbiere.push(paysbiere[mb]);
                nombiere.splice(mb, 1);
                typebiere.splice(mb, 1);
                nbrbouteillebiere.splice(mb, 1);
                accordbiere.splice(mb, 1);
                combiere.splice(mb, 1);
                paysbiere.splice(mb, 1);
                }else if(nbrbouteillebiere[mb]>0){
                nombiere.unshift(nombiere[mb]);
                typebiere.unshift(typebiere[mb]);
                nbrbouteillebiere.unshift(nbrbouteillebiere[mb]);
                accordbiere.unshift(accordbiere[mb]);
                combiere.unshift(combiere[mb]);
                paysbiere.unshift(paysbiere[mb]);
                nombiere.splice(mb+1, 1);
                typebiere.splice(mb+1, 1);
                nbrbouteillebiere.splice(mb+1, 1);
                accordbiere.splice(mb+1, 1);
                combiere.splice(mb+1, 1);
                paysbiere.splice(mb+1, 1);
            }
            localStorage.setItem('biere', JSON.stringify(cavebiere));
            window.location.reload();
            return;
        }
    }
}
    
//Gestion de la fenêtre modal 
//Définition des variables 

let openModal = document.querySelectorAll('.openModal');
let target;
let modal = null;
const focusSelect = 'button, a, input, textarea, select';
let focusables = [];

const ouvrir = function(e){
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelectorAll(focusSelect));
    modal.style.display=null;
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', 'true')
    modal.querySelector('.js-close').addEventListener('click', close);
    modal.querySelector('.modif').addEventListener('click', ()=>{
        if(modal.querySelector('h2').textContent.indexOf("bière")>0){
            console.log('je suis dans les bières');
            modifbiere(e);
        }else{
            console.log('je suis dans les vins');
            fonctionWine.modifWine();
        }
})
}

const close = function(e){
    e.preventDefault();
    window.setTimeout(function (){
        modal.style.display = 'none';
        modal = null;
    }, 500)
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', 'false');
    modal.querySelector('.js-close').removeEventListener('click', close);
}

const focusInModal = function (e){  //fixe le tab dans la modal
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true){
        index--;
    }else{
        index++;
    }
    if(index>=focusables.lenght){
        index = 0;
    }
    if(index<0){
        index = focus.lenght -1;
    }
    focusables[index].focus()
} 

window.addEventListener('keydown', function (e) {
    if(e.key === 'Escape' || e.key === "Esc"){
        close(e);
    }
    if(e.key === 'Tab' && modal !== null){
        focusInModal(e);
    }
})

openModal.forEach(a =>{
    a.addEventListener('click', ouvrir);
})


 