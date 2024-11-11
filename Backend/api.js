async function afficherProjets() {
    const container = document.querySelector(".gallery"); 

    // Récupération des projets depuis l'API ou le localStorage
    let projets = localStorage.getItem('project');
    if (!projets) {
        const response = await fetch("http://localhost:5678/api/works");
        projets = await response.json();
        localStorage.setItem('project', JSON.stringify(projets));
    } else {
        projets = JSON.parse(projets);
    }

    // Parcours de chaque projet et création de l'élément <figure>
    projets.forEach(projet => {
        const figure = document.createElement('figure');

        // Ajout de l'image du projet
        const img = document.createElement('img');
        img.src = projet.imageUrl; 
        img.alt = projet.title;
        figure.appendChild(img);

        // Ajout du titre du projet
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = projet.title;
        figure.appendChild(figcaption);

        // Ajout de <figure> dans le conteneur
        container.appendChild(figure);
    });
}

// Appel de la fonction pour afficher les projets
afficherProjets();
