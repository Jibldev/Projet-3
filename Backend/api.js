async function fetchDataFromAPI() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        console.log('Données récupérées :', data); // Affiche les données dans la console du navigateur
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
  }
fetchDataFromAPI();

// Ajout des images via l'API !-> //

//Récupération des projets eventuellement stockées dans le localStorage
let project = window.localStorage.getItem('project');

if (project === null) {
    // Récupération des projets depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    project = await reponse.json();
    // Transformation des projets en JSON
    const projectvalue = JSON.stringify(project);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("project", projectvalue);
} else {
    project = JSON.parse(project);
}


// Création de la fonction qui récupère les projets !-> //



