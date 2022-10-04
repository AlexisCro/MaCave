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

//variable definition
let myBottleWine ={};
let myCaveofWine =[];
let ajoutvin     = document.querySelector('#ajoutvin');
let tablecavevin = document.querySelector('#cavevin');
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

//Class static function 
class fonction{
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

    static binarySearchName(array, thingToFind, start, end){
        median = Math.floor((start+end)/2);
        
        if(start>end || array[median] == undefined ||  array[median].nomVin == undefined){
            return false;
        }

        if(array[median].nomVin.indexOf(thingToFind)>=0){
            indexWineName = median;
            return true;
        }

        if(array[median].nomVin.indexOf(thingToFind) === -1 && thingToFind < array[median].nomVin){
            return this.binarySearchName(array, thingToFind, start, median-1);
        }else if(array[median].nomVin.indexOf(thingToFind) === -1 && thingToFind > array[median].nomVin){
            return this.binarySearchName(array, thingToFind, median+1, end);
        }
    }

    static binarySearchYear(array, thingToFind, start, end){
        median = Math.floor((start+end)/2);
        
        if(start>end || array[median] == undefined ||  array[median].anneeVin == undefined){
            return false;
        }

        if(array[median].anneeVin.indexOf(thingToFind)>=0){
            return true;
        }

        if(array[median].anneeVin.indexOf(thingToFind) === -1 && thingToFind < array[median].anneeVin){
            return this.binarySearchYear(array, thingToFind, start, median-1);
        }else if(array[median].anneeVin.indexOf(thingToFind) === -1 && thingToFind > array[median].anneeVin){
            return this.binarySearchYear(array, thingToFind, median+1, end);
        }
    }

    static binarySearchCepage(array, thingToFind, start, end){
        median = Math.floor((start+end)/2);
        
        if(start>end || array[median] == undefined || array[median].cepageVin == undefined){
            return false;
        }

        if(array[median].cepageVin.indexOf(thingToFind)>=0){
            return true;
        }

        if(array[median].cepageVin.indexOf(thingToFind) === -1 && thingToFind < array[median].cepageVin){
            return this.binarySearchCepage(array, thingToFind, start, median-1);
        }else if(array[median].cepageVin.indexOf(thingToFind) === -1 && thingToFind > array[median].cepageVin){
            return this.binarySearchCepage(array, thingToFind, median+1, end);
        }
    }

    static registerTable(key, cave){
        localStorage.setItem(key, JSON.stringify(cave));
        window.location.reload();
    }

    static showWine(cave){
        cave = JSON.parse(localStorage.getItem('vin'));
            for(let wine of cave){                
                tablecavevin.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td><a href=#'+wine.nomVin+' class="openModal">'+ wine.nomVin +'</a></td>'
                +'<aside id="'+ wine.nomVin +'" class="modal" aria-hidden="true" role="dialog" aria-labelledby="'+ wine.nomVin +'" style="display : none;">'
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

let tablecaveall;

let i;
let indextable;

i     = 1;
indextable = 0;

//Si ma cave à vin n'est pas nul alors affichage au démarrage
    if(localStorage.getItem('vin') !== null){
        fonction.showWine(caveWineToShow);
    }
   /* if(localStorage.getItem('vin') !== null){
        cavevin         = JSON.parse(localStorage.getItem('vin'));
        nomvin          = cavevin[0];
        typevin         = cavevin[1];
        cepagevin       = cavevin[2];
        anneevin        = cavevin[3];
        nbrbouteillevin = cavevin[4];
        accordvin       = cavevin[5];
        comvin          = cavevin[6];
        tablecavevin    = document.querySelector('#cavevin');
        tablecaveall    = document.querySelector('#caveall');

            nomvin.forEach(function(element){
                tablecavevin.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td><a href=#'+element.replaceAll(" ", "_")+i+' class="openModal">'+element+'</a></td>'
                +'<aside id="'+element.replaceAll(" ", "_")+i+'" class="modal" aria-hidden="true" role="dialog" aria-labelledby="'+element+'" style="display : none;">'
                +'<div class="modal-wrapper">'
                +'<h1 id='+element+'>Modification</h1>'
                +'<h2 class="titre-bout">Ma bouteille : <br/>'+ element + '</h2>'
                +'<p class="type-bout">Type : <br/>' + typevin[indextable] + '</p>'
                +'<p class="annee-bout">Année : <br/>' + anneevin[indextable] + '</p>'
                +'<p class="cepage-bout">Cépage : <br/>' + cepagevin[indextable] + '</p>'
                +'<label for="nbr-bout">Nombre de bouteille : </label><br/>'
                +'<input type="number" id="nbr-bout" value="'+nbrbouteillevin[indextable]+'"></input><br/><br/>'
                +'<label for="accord-bout">Accord mets/vins</label><br/>'
                +'<input type="text" id="accord-bout" value="'+accordvin[indextable]+'"</input><br/><br/>'
                +'<label for="com-bout">Commentaires - Avis</label><br/><br/>'
                +'<textarea id="com-bout" row="8" cols="30">'+comvin[indextable]+'</textarea><br/><br/>'
                +'<button class="modif" type="button">Enregistrer</button><br/>'
                +'<button class="js-close" type="button">Fermer</button>'
                +'</aside>'
                +'<td>'+typevin[indextable]+'</td>'
                +'<td>'+anneevin[indextable]+'</td>'
                +'<td>'+cepagevin[indextable]+'</td>'
                +'<td>'+nbrbouteillevin[indextable]+'</td>'
                +'<td>'+accordvin[indextable]+'</td>'
                +'<td>'+comvin[indextable]+'</td>');

                tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td>'+element+'</td>'+'<td>'+typevin[indextable]+'</td><td>'+anneevin[indextable]+'</td><td>'+cepagevin[indextable]+'</td><td></td><td>'+nbrbouteillevin[indextable]+'</td><td>'+accordvin[indextable]+'</td><td>'+comvin[indextable]+'</td>');
                i++;
                indextable++;
            })
    }*/

//Ajout d'un vin
    ajoutvin.addEventListener('click', ()=>{
        fonction.createObjectWine();
        fonction.addWineToCave(myCaveofWine);
        if(localStorage.getItem('vin') === null){
            fonction.registerTable('vin', myCaveofWine);
        }else if(localStorage.getItem('vin') !== null){
            fonction.createObjectWine();
            recupCaveOfWine  = localStorage.getItem('vin');
            recupCaveOfWine  = JSON.parse(recupCaveOfWine);
            let researchYear   = fonction.binarySearchYear(recupCaveOfWine, myBottleWine.anneeVin, 0, recupCaveOfWine.length);
            let researchCepage = fonction.binarySearchCepage(recupCaveOfWine, myBottleWine.cepageVin, 0, recupCaveOfWine.length);
            let researchName   = fonction.binarySearchName(recupCaveOfWine, myBottleWine.nomVin, 0, recupCaveOfWine.length); 

            if(researchName == true && researchCepage == true && researchYear == true){
                let numberBottleObject = parseInt(myBottleWine.nbrBouteille);
                let numberBottleCave   = parseInt(recupCaveOfWine[indexWineName].nbrBouteille);
                let sum = numberBottleCave + numberBottleObject;
                recupCaveOfWine[indexWineName].nbrBouteille = sum;
                localStorage.setItem('vin', JSON.stringify(recupCaveOfWine));
                window.location.reload();
            }else if(researchName == false || researchCepage == false || researchYear == false){
                fonction.createObjectWine();
                fonction.addWineToCave(recupCaveOfWine);
                fonction.registerTable('vin', recupCaveOfWine);
            }
        }
        document.querySelector('.formvin').reset();
    }) 


//Gestion variable bières
    let ajoutbiere = document.querySelector('#ajoutbiere');

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
        cavebiere         = JSON.parse(localStorage.getItem('biere'));
        nombiere          = cavebiere[0];
        typebiere         = cavebiere[1];
        paysbiere         = cavebiere[2];
        nbrbouteillebiere = cavebiere[3];
        accordbiere       = cavebiere[4];
        combiere          = cavebiere[5];
        tablecavebiere    = document.querySelector('#cavebiere');
        tablecaveall      = document.querySelector('#caveall');

        i          = 1;
        indextable = 0;
    
            nombiere.forEach(function(element){
                tablecavebiere.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td><a href="#'+element.replaceAll(" ", "_")+i+'" class="openModal">'+element+'</a></td>'
                +'<aside id="'+element.replaceAll(" ", "_")+i+'" class="modal" aria-hidden="true" role="dialog" aria-labelledby="'+element+'" style="display : none;">'
                +'<div class="modal-wrapper">'
                +'<h1 id="'+element+'">Modification</h1>'
                +'<h2 class="titre-biere">Ma bière : <br/>'+element+'</h2>'
                +'<p class="type-biere">Type : <br/>'+typebiere[indextable]+'</p>'
                +'<p class="pays-biere">Pays : <br/>'+paysbiere[indextable]+'</p>'
                +'<label for="nbr-biere">Nombre de bouteilles</label><br/>'
                +'<input type="number" id="nbr-biere" value="'+nbrbouteillebiere[indextable]+'"></input><br/>'
                +'<label for="accord-biere">Accord mets/bière</label><br/>'
                +'<input type="text" id="accord-biere" value="'+accordbiere[indextable]+'"></input><br/>'
                +'<label for="com-biere">Commentaires - avis</label><br/>'
                +'<textarea id="com-biere" row="8" cols="30">'+combiere[indextable]+'</textarea><br/>'
                +'<button type="button" class="modif">Enregistrer</button><br/><br/>'
                +'<button type="button" class="js-close">Fermer</button>'
                +'</aside>'
                +'<td>'+typebiere[indextable]+'</td>'
                +'<td>'+paysbiere[indextable]+'</td>'
                +'<td>'+nbrbouteillebiere[indextable]+'</td>'
                +'<td>'+accordbiere[indextable]+'</td>'
                +'<td>'+combiere[indextable]+'</td>');
                tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'nombiere'+i+'\'><td>'+element+'</td>'+'<td>'+typebiere[indextable]+'</td><td></td><td></td><td>'+paysbiere[indextable]+'</td><td>'+nbrbouteillebiere[indextable]+'</td><td>'+accordbiere[indextable]+'</td><td>'+combiere[indextable]+'</td>');
                i++;
                indextable++;
            })
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

//Modifications des données bouteilles 
const modifvin = function(e){
    let name_vin   = modal.querySelector('.titre-bout').textContent.slice(15);
    let type_vin   = modal.querySelector('.type-bout').textContent.slice(7);
    let annee_vin  = modal.querySelector('.annee-bout').textContent.slice(8);
    let cepage_vin = modal.querySelector('.cepage-bout').textContent.slice(9);

    let accord_vin = modal.querySelector('#accord-bout').value;
    let nbr_bout   = modal.querySelector('#nbr-bout').value;
    let com_vin    = modal.querySelector('#com-bout').value;

    boisson         = JSON.parse(localStorage.getItem('vin'));
    nomvin          = boisson[0];
    typevin         = boisson[1];
    cepagevin       = boisson[2];
    anneevin        = boisson[3];
    nbrbouteillevin = boisson[4];
    accordvin       = boisson[5];
    comvin          = boisson[6];

    for(let m=0; m<=nomvin.length; m++){
        if(nomvin[m] === name_vin && typevin[m] === type_vin && anneevin[m] == annee_vin && cepagevin[m] === cepage_vin){
            nbrbouteillevin.splice(m, 1, nbr_bout);
            accordvin.splice(m, 1, accord_vin);
            comvin.splice(m, 1, com_vin);
            if(nbrbouteillevin[m] == 0){
                    nomvin.push(nomvin[m]);
                    typevin.push(typevin[m]);
                    nbrbouteillevin.push(nbrbouteillevin[m]);
                    accordvin.push(accordvin[m]);
                    comvin.push(comvin[m]);
                    cepagevin.push(cepagevin[m]);
                    anneevin.push(anneevin[m]);
                    nomvin.splice(m, 1);
                    typevin.splice(m, 1);
                    nbrbouteillevin.splice(m, 1);
                    accordvin.splice(m, 1);
                    comvin.splice(m, 1);
                    cepagevin.splice(m, 1);
                    anneevin.splice(m, 1);
                }else if(nbrbouteillevin[m]>0){
                    nomvin.unshift(nomvin[m]);
                    typevin.unshift(typevin[m]);
                    nbrbouteillevin.unshift(nbrbouteillevin[m]);
                    accordvin.unshift(accordvin[m]);
                    comvin.unshift(comvin[m]);
                    cepagevin.unshift(cepagevin[m]);
                    anneevin.unshift(anneevin[m]);
                    nomvin.splice(m+1, 1);
                    typevin.splice(m+1, 1);
                    nbrbouteillevin.splice(m+1, 1);
                    accordvin.splice(m+1, 1);
                    comvin.splice(m+1, 1);
                    cepagevin.splice(m+1, 1);
                    anneevin.splice(m+1, 1);
                }
            localStorage.setItem('vin', JSON.stringify(boisson));
            window.location.reload();
            return;
            
        }
    }
}

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
            modifvin(e);
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


 