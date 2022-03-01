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

//Gestion apparition filtres
let filterbutton = document.querySelector('.filter');
let filterbox    = document.querySelector('.filterbox');

filterbutton.addEventListener('click',()=>{
    filterbox.classList.toggle('filtervisibility');
})

//Lors d'un ajout de vin 
//Déclaration des variables 

let ajoutvin   = document.querySelector('#ajoutvin');

let nomvin;
let typevin;
let anneevin;
let cepagevin;
let nbrbouteillevin;
let accordvin;
let comvin;

let cavevin;

let tablecavevin;
let tablecaveall;

let i;
let indextable;

i     = 1;
indextable = 0;

//Si ma cave à vin n'est pas nul alors affichage au démarrage
    if(localStorage.getItem('vin') !== null){
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
        
        let listcepage;

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
                
                //Gestion des cépages en fonction des bouteilles utilisateur
                let filtercepagevalue = cepagevin[indextable].toUpperCase();
                
                if(filtercepagevalue !== null){
                    if(listcepage == null){
                        listcepage = filtercepagevalue;
                        
                    }else{
                        if(listcepage.indexOf(filtercepagevalue)== -1){
                        listcepage = listcepage + "," + filtercepagevalue;
                        }else{
                            listcepage = listcepage;
                        }
                    }
                }
                
                i++;
                indextable++;
            })

            let listHtmlFilterCepage = document.querySelector('#filtercepage');
            let tablelistcepage = listcepage.split(',');
            tablelistcepage.forEach(function(element){
                listHtmlFilterCepage.insertAdjacentHTML('beforeend', '<input type="checkbox" id="'+element+'" value="'+element+'"><label for="'+element+'">'+element.toLowerCase()+'</label><br/>');
            })
            
    }

//Ajout d'un vin
    ajoutvin.addEventListener('click', ()=>{
        //Je définis toutes les valeurs à récupérer
        let nom_vin     = document.querySelector('#nom-vin').value;
        let type_vin    = document.querySelector('#type-vin');
            type_vin    = type_vin.options[type_vin.selectedIndex].text;
        let cepage_vin   = document.querySelector('#cepage-vin').value;   
        let annee_vin   = document.querySelector('#annee-vin').value;
        let nbrbout_vin = document.querySelector('#nbrvin').value;
        let accord_vin  = document.querySelector('#accordvin').value;
        let com_vin     = document.querySelector('#com-vin').value;

        let identique;

        if(localStorage.getItem('vin') == null){
            nomvin          = [];
            typevin         = [];
            cepagevin       = [];
            anneevin        = [];
            nbrbouteillevin = [];
            accordvin       = [];
            comvin          = [];

            cavevin = [nomvin, typevin, cepagevin, anneevin, cepagevin, nbrbouteillevin, accordvin, comvin];

            nomvin.push(nom_vin);
            typevin.push(type_vin);
            cepagevin.push(cepage_vin);
            anneevin.push(annee_vin);
            nbrbouteillevin.push(nbrbout_vin);
            accordvin.push(accord_vin);
            comvin.push(com_vin);
            cavevin = [nomvin, typevin, cepagevin, anneevin, nbrbouteillevin, accordvin, comvin];

            localStorage.setItem('vin', JSON.stringify(cavevin));

        }else if(localStorage.getItem('vin') !== null){
                for(let v=0; v<=nomvin.length; v++){
                    if(nomvin[v] == nom_vin && typevin == type_vin && anneevin == annee_vin && cepagevin == cepage_vin){

                        cavevin = JSON.parse(localStorage.getItem('vin'));
                        nomvin          = cavevin[0];
                        typevin         = cavevin[1];
                        cepagevin       = cavevin[2];
                        anneevin        = cavevin[3];
                        nbrbouteillevin = cavevin[4];
                        accordvin       = cavevin[5];
                        comvin          = cavevin[6];

                        nbrbouteillevin.splice(v, v, parseInt(nbrbouteillevin[v]) + parseInt(nbrbout_vin));
                        localStorage.setItem('vin', JSON.stringify(cavevin));
                        window.location.reload();
                        return;
                    }else{
                        identique = 'faux';
                    }
                }
                    if(identique === 'faux'){
                        cavevin = JSON.parse(localStorage.getItem('vin'));

                        nomvin          = cavevin[0];
                        typevin         = cavevin[1];
                        cepagevin       = cavevin[2];
                        anneevin        = cavevin[3];
                        nbrbouteillevin = cavevin[4];
                        accordvin       = cavevin[5];
                        comvin          = cavevin[6];

                        nomvin.push(nom_vin);
                        typevin.push(type_vin);
                        cepagevin.push(cepage_vin);
                        anneevin.push(annee_vin);
                        nbrbouteillevin.push(nbrbout_vin);
                        accordvin.push(accord_vin);
                        comvin.push(com_vin);
                        cavevin = [nomvin, typevin, cepagevin, anneevin, nbrbouteillevin, accordvin, comvin];
            
                        localStorage.setItem('vin', JSON.stringify(cavevin));
                    }
        }
        
        let tablecavevin = document.querySelector('#cavevin');
        let tablecaveall = document.querySelector('#caveall');

        i     = 1;
        indextable = 0;

        nomvin.forEach(function(element){
            if(document.querySelector('.domainevin'+i) === null){
                tablecavevin.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td>'+element+'</td>'+'<td>'+typevin[indextable]+'</td><td>'+anneevin[indextable]+'</td><td>'+cepagevin[indextable]+'</td><td>'+nbrbouteillevin[indextable]+'</td><td>'+accordvin[indextable]+'</td><td>'+comvin[indextable]+'</td>');
                tablecaveall.insertAdjacentHTML('beforeend', '<tr  class=\'domainevin'+i+'\'><td>'+element+'</td>'+'<td>'+typevin[indextable]+'</td><td>'+anneevin[indextable]+'</td><td>'+cepagevin[indextable]+'</td><td></td><td>'+nbrbouteillevin[indextable]+'</td><td>'+accordvin[indextable]+'</td><td>'+comvin[indextable]+'</td>');

                i++;
                indextable++;
            }
        })
        document.querySelector('.formvin').reset();
        window.location.reload();
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

        let listtypebeer;

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
                
                //Gestion des types de bières en fonction des bouteilles utilisateur
                let filtercolorbeervalue = typebiere[indextable].toUpperCase();
                
                if(filtercolorbeervalue !== null){
                    if(listtypebeer == null){
                        listtypebeer = filtercolorbeervalue;
                        
                    }else{
                        if(listtypebeer.indexOf(filtercolorbeervalue)== -1){
                        listtypebeer = listtypebeer + "," + filtercolorbeervalue;
                        }else{
                            listtypebeer = listtypebeer;
                        }
                    }
                }
                
                i++;
                indextable++;
            })

            let listHtmlFilterTypeBeer = document.querySelector('#filtercolorbeer');
            let tablelisttypebeer = listtypebeer.split(',');
            tablelisttypebeer.forEach(function(element){
                listHtmlFilterTypeBeer.insertAdjacentHTML('beforeend', '<input type="checkbox" id="'+element+'" value="'+element+'"><label for="'+element+'">'+element.toLowerCase()+'</label><br/>');
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
            modifbiere(e);
        }else{
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

//Gestion recherche de via filtre
let filtervalidbutton = document.querySelector('.filtervalid');
filtervalidbutton.addEventListener('click', ()=>{
    let cavevin = JSON.parse(localStorage.getItem('vin'));
    let nomvin           = cavevin[0];
    let typevin          = cavevin[1];
    let cepagevin        = cavevin[2];
    let anneevin         = cavevin[3];
    let nbrbouteillevin  = cavevin[4];
    let accordvin        = cavevin[5];
    let comvin           = cavevin[6];
    let tablerecapfilter = document.querySelector('#recapfilter');
    let divColor         = document.querySelector('#colorvin');
    let divColorNodes    = divColor.childNodes; 
    let divCep           = document.querySelector('#filtercepage');
    let divCepNodes      = divCep.childNodes;
    let colorVinValue; 
    let cepVinValue;
    let ifilter          = 0;

  

            divColorNodes.forEach(function(element){
                if(element.type == "checkbox"){
                    if(element.checked == true){
                            colorVinValue = element.value;
                    }
                }
            })

            divCepNodes.forEach(function(element){
                if(element.type == "checkbox"){
                    if(element.checked == true){
                        cepVinValue = element.value;
                        console.log(cepVinValue);
                    }
                }
            })

            nomvin.forEach(function(element){
                console.log(cepagevin[ifilter]);
                console.log(cepVinValue);
                if(colorVinValue !== undefined && cepVinValue == undefined){
                    if(typevin[ifilter].toLowerCase().replace("é", "e") == colorVinValue.toLowerCase().replace("é", "e")){
                        tablerecapfilter.insertAdjacentHTML('beforeend', '<tr><td id='+nomvin[ifilter]+ifilter+'>'+nomvin[ifilter]+'</td><td>'+typevin[ifilter]+'</td><td>'+cepagevin[ifilter]+'</td><td>'
                        +anneevin[ifilter]+'</td><td>'+nbrbouteillevin[ifilter]+'</td><td>'+accordvin[ifilter]+'</td><td>'+comvin[ifilter]+'</td></tr>');
                    }
                }else{
                    if(colorVinValue == undefined && cepVinValue !== undefined){
                        if(cepagevin[ifilter].toUpperCase() == cepVinValue.toUpperCase()){
                            tablerecapfilter.insertAdjacentHTML('beforeend', '<tr><td id='+nomvin[ifilter]+ifilter+'>'+nomvin[ifilter]+'</td><td>'+typevin[ifilter]+'</td><td>'+cepagevin[ifilter]+'</td><td>'
                            +anneevin[ifilter]+'</td><td>'+nbrbouteillevin[ifilter]+'</td><td>'+accordvin[ifilter]+'</td><td>'+comvin[ifilter]+'</td></tr>');
                        }  
                    }else{
                        if(colorVinValue !== undefined && cepVinValue !== undefined){
                            if(typevin[ifilter].toLowerCase().replace("é", "e") == colorVinValue.toLowerCase().replace("é", "e") && cepagevin[ifilter].toUpperCase() == cepVinValue.toUpperCase()){
                                tablerecapfilter.insertAdjacentHTML('beforeend', '<tr><td id='+nomvin[ifilter]+ifilter+'>'+nomvin[ifilter]+'</td><td>'+typevin[ifilter]+'</td><td>'+cepagevin[ifilter]+'</td><td>'
                                +anneevin[ifilter]+'</td><td>'+nbrbouteillevin[ifilter]+'</td><td>'+accordvin[ifilter]+'</td><td>'+comvin[ifilter]+'</td></tr>');
                            }
                        }
                    }
                }
                ifilter++;
            })
        
})

//Selecteur pour le button dans la modal filtre

let closeFilter = document.querySelector('#filterresult').lastElementChild.childNodes[13];

 const reloadCloseFilter = function (e){
    e.preventDefault;
    window.location.reload();
}

closeFilter.addEventListener('click', reloadCloseFilter);
 