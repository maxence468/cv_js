const conteneur = document.createElement('div');
const titre = document.createElement('h1');
const sousTitre = document.createElement('h2');
const profile = document.createElement('div');
const profileDesc = document.createElement('p');

const infos = document.createElement('div');
const presentation = document.createElement('p');

const skills = document.createElement('ul');

const divExperience = document.createElement('div');


async function getData() {
    const response = await fetch('infos.json');
    profil = await response.json();
    return profil
}

getData()
const test = getData();
test.then(value => console.log(value))




function afficherCV() {
    conteneur.id = "cv";
    document.body.appendChild(conteneur);

    titre.id = "title";
    titre.textContent = profil["nom"];
    conteneur.appendChild(titre);

    sousTitre.id = "subtitle";
    sousTitre.textContent = profil["poste"];
    conteneur.appendChild(sousTitre);

    profile.id = "profile";
    conteneur.appendChild(profile);

    profileDesc.id = "profileDesc";
    profileDesc.textContent = profil["profile"];
    profile.appendChild(profileDesc);

    infos.id = "infos";
    conteneur.appendChild(infos);

    presentation.id = "presentation";
    presentation.textContent = profil["presentation"];
    infos.appendChild(presentation);

    skills.id = "skills";
    conteneur.appendChild(skills);

    profil["competences"].forEach(element => {
        const li = skills.appendChild(document.createElement("li"))
        li.textContent = element
        li.id = element
    });
}

// afficherCV();