// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}

// Fonction pour afficher les boutons de filtre en fonction des catégories
async function afficherBoutonsFiltres() {
  const filtersContainer = document.getElementById("filters");

  // Ajoute un bouton "Afficher tous" pour afficher tous les projets
  const boutonTous = document.createElement("button");
  boutonTous.classList.add("button");
  boutonTous.setAttribute("data-category", "all");
  boutonTous.textContent = "Tous";
  boutonTous.addEventListener("click", () => {
    activerBouton(boutonTous); // Active le bouton "Tous"
    afficherProjets("all");
  });
  filtersContainer.appendChild(boutonTous);

  // Récupère les catégories et crée un bouton pour chacune
  const categories = await fetchCategories();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("data-category", category.name); // Utilise le nom de la catégorie pour le filtre
    button.textContent = category.name;
    button.addEventListener("click", () => {
      activerBouton(button); // Active le bouton de la catégorie sélectionnée
      afficherProjets(category.name);
    });
    filtersContainer.appendChild(button);
  });
}

// Fonction pour activer le bouton sélectionné et désactiver les autres
function activerBouton(boutonActif) {
  // Supprime la classe "active" de tous les boutons
  document.querySelectorAll("#filters .button").forEach((btn) => {
    btn.classList.remove("active");
  });
  // Ajoute la classe "active" au bouton cliqué
  boutonActif.classList.add("active");
}

// Fonction pour afficher les projets
async function afficherProjets(category = "all") {
  const container = document.querySelector(".gallery");
  container.innerHTML = ""; // Vider le conteneur avant d'ajouter les éléments filtrés

  // Récupération des projets depuis l'API ou le localStorage
  let projets = localStorage.getItem("project");
  if (!projets) {
    const response = await fetch("http://localhost:5678/api/works");
    projets = await response.json();
    localStorage.setItem("project", JSON.stringify(projets));
  } else {
    projets = JSON.parse(projets);
  }

  // Filtrer les projets si une catégorie spécifique est choisie
  const projetsFiltres =
    category === "all"
      ? projets
      : projets.filter((projet) => projet.category.name === category);

  // Parcours de chaque projet filtré et création de l'élément <figure>
  projetsFiltres.forEach((projet) => {
    const figure = document.createElement("figure");

    // Ajout de l'image du projet
    const img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figure.appendChild(img);

    // Ajout du titre du projet
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = projet.title;
    figure.appendChild(figcaption);

    // Ajout de <figure> dans le conteneur
    container.appendChild(figure);
  });
}

// Appel de la fonction pour afficher les boutons et les projets au chargement de la page
afficherBoutonsFiltres();
afficherProjets();
