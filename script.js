const conteneur = document.createElement('div');
const titre = document.createElement('h1');
const sousTitre = document.createElement('h2');
const divExperiences = document.createElement('div');
const infos = document.createElement('div');
const presentation = document.createElement('p');
const ulSkills = document.createElement('ul');
const competences = document.createElement('h3');
const divSkills = document.createElement('div');
const divGithub = document.createElement('div');
const nomGithub = document.createElement('p');
const titreGithub = document.createElement('h3');
const divBackground = document.createElement('div');
const divPhoto = document.createElement('div');
const imageGithub = document.createElement('img');
const lienGithub = document.createElement('a');
const nbRepo = document.createElement('p');


// Recupere infos.json 
// https://happycoding.io/tutorials/javascript/ajax
var ajaxRequest = new XMLHttpRequest();
ajaxRequest.onreadystatechange = function () {
    if (ajaxRequest.readyState == 4) {
        afficherCV();
    }
}
ajaxRequest.open('GET', 'infos.json', true);
ajaxRequest.responseType = "json";
ajaxRequest.send();

//recupere les infos github 
var githubRequest = new XMLHttpRequest();
githubRequest.onreadystatechange = function () {
    if (githubRequest.readyState == 4) {
        afficherInfoGithub();
    }
}
githubRequest.open('GET', 'https://api.github.com/users/maxence468', true);
githubRequest.responseType = "json";
githubRequest.send();


function afficherCV() {
    //corp du cv
    conteneur.id = "cv";
    document.body.appendChild(conteneur);

    //Titre 
    titre.id = "title";
    titre.textContent = ajaxRequest.response["nom"];
    conteneur.appendChild(titre);

    //Sous titre
    sousTitre.id = "subtitle";
    sousTitre.textContent = ajaxRequest.response["poste"];
    conteneur.appendChild(sousTitre);

    //Div DES EXPERIENCES
    divExperiences.id = "divExperiences";
    conteneur.appendChild(divExperiences);

    ajaxRequest.response["experiences"].forEach(element => {
        //DIV d'une experience 
        const divExperience = document.createElement('div');
        divExperience.className = "experience";
        divExperiences.appendChild(divExperience);

        //div pour le titre et le bouton
        const divTitreExp = document.createElement('div');
        divTitreExp.className = "titreExperience"
        divExperience.appendChild(divTitreExp);

        //NOM de l'experience
        const nomExperience = document.createElement('h3')
        nomExperience.id = element.nomExperience;
        nomExperience.textContent = element.nomExperience
        divTitreExp.appendChild(nomExperience)

        //BOUTON CACHER/AFFICHER 
        const btn = document.createElement('button');
        btn.textContent = ">" 
        btn.id = "btn" + element.nomExperience
        btn.className = "btnHide"
        divTitreExp.appendChild(btn)

        //description
        const description = document.createElement('p');
        description.id = element.description;
        description.textContent = element.description
        divExperience.appendChild(description)

    });

    //Div de la presentation
    infos.id = "infos";
    conteneur.appendChild(infos);

    //TEXTE DE PRESENTATION 
    presentation.id = "presentation";
    let textePresentation = calcDate() + " ans, " + ajaxRequest.response["presentation"];
    presentation.textContent = textePresentation;
    infos.appendChild(presentation);

    //div COMPETENCES 
    divSkills.id = "divSkills";
    conteneur.appendChild(divSkills)

    //EN TETE des competences 
    competences.id = "competences";
    competences.textContent = "Competences :"
    divSkills.appendChild(competences)

    //LISTE DES COMPETENCES 
    ulSkills.id = "ulSkills";
    divSkills.appendChild(ulSkills);

    //AJOUTE CHAQUE COMPETENCES A LA LISTE 
    ajaxRequest.response["competences"].forEach(element => {
        const li = ulSkills.appendChild(document.createElement("li"));
        li.textContent = element;
        li.id = element;
    });

    //DIV GITHUB 
    divGithub.id = "divGithub";
    conteneur.appendChild(divGithub);

    //DIV POUR AVOIR FOND BLEU
    divBackground.id = "divBackground";
    conteneur.appendChild(divBackground)

    //div pour cadrer la photo
    divPhoto.id = "divPhoto";
    conteneur.appendChild(divPhoto);

    //EN TETE DU GITHUB
    titreGithub.id = "titreGithub";
    titreGithub.textContent = "Infos Github :"
    //Ajoute en premier enfant 
    divGithub.prepend(titreGithub);

}

function afficherInfoGithub() {
    nomGithub.id = "nomGithub";
    nomGithub.textContent = "Pseudo : " + githubRequest.response.login;
    divGithub.appendChild(nomGithub)

    imageGithub.id = "imageGithub";
    imageGithub.src = githubRequest.response.avatar_url;
    divPhoto.appendChild(imageGithub);

    nbRepo.id = "nbRepo";
    nbRepo.textContent = githubRequest.response.public_repos + " repositories public"
    divGithub.appendChild(nbRepo)

    lienGithub.id = "lienGithub";
    lienGithub.href = githubRequest.response.html_url
    lienGithub.target = '_blank'
    lienGithub.textContent = "Lien Github"
    divGithub.appendChild(lienGithub)
}

function calcDate() {
    var date = new Date(
        ajaxRequest.response.dateNaissance[0].annee,
        ajaxRequest.response.dateNaissance[0].mois,
        ajaxRequest.response.dateNaissance[0].jour
    );
    return dateAge(date)
}

//https://www.equinode.com/fonctions-javascript/calculer-un-age-avec-javascript#fonction
function dateAge(a) {
    return Math.abs((new Date(Date.now() - a.getTime()).getUTCFullYear()) - 1970);
}

