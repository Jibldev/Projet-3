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
    activerBouton(boutonTous);
    afficherProjets("all");
  });
  filtersContainer.appendChild(boutonTous);

  // Récupère les catégories et crée un bouton pour chacune
  const categories = await fetchCategories();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("data-category", category.name);
    button.textContent = category.name;
    button.addEventListener("click", () => {
      activerBouton(button);
      afficherProjets(category.name);
    });
    filtersContainer.appendChild(button);
  });
}

// Fonction pour activer le bouton sélectionné et désactiver les autres
function activerBouton(boutonActif) {
  document.querySelectorAll("#filters .button").forEach((btn) => {
    btn.classList.remove("active");
  });
  boutonActif.classList.add("active");
}

// Fonction pour afficher les projets
async function afficherProjets(category = "all") {
  const container = document.querySelector(".gallery");
  container.innerHTML = "";

  let projets = localStorage.getItem("project");
  if (!projets) {
    const response = await fetch("http://localhost:5678/api/works");
    projets = await response.json();
    localStorage.setItem("project", JSON.stringify(projets));
  } else {
    projets = JSON.parse(projets);
  }

  const projetsFiltres =
    category === "all"
      ? projets
      : projets.filter((projet) => projet.category.name === category);
  projetsFiltres.forEach((projet) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = projet.title;
    figure.appendChild(figcaption);

    container.appendChild(figure);
  });
}

// Fonction pour gérer la connexion/déconnexion
function updateAuthLink() {
  const authLink = document.getElementById("auth-link");
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.addEventListener("click", handleLogout);
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
    authLink.removeEventListener("click", handleLogout);
  }
}

function handleLogout(event) {
  event.preventDefault();
  localStorage.removeItem("authToken");
  updateAuthLink();
  window.location.href = "login.html";
}



// Fonction pour afficher les projets dans la modale
function afficherProjetsDansModale(projets) {
  const modalGallery = document.querySelector(".modal .gallery");
  modalGallery.innerHTML = ""; // Vider le conteneur de la galerie dans la modale

  projets.forEach((projet) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = projet.title;
    figure.appendChild(figcaption);

    modalGallery.appendChild(figure);
  });
}

// Code pour gérer l'ouverture de la modale
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".edit-button");
  const editModal = document.getElementById("edit-modal");
  const closeButton = document.querySelector(".close-button");

  // Récupération des projets depuis le localStorage ou l'API
  let projets = JSON.parse(localStorage.getItem("project")) || [];

  // Afficher la modale et les projets dedans au clic sur "Modifier les projets"
  editButton.addEventListener("click", () => {
    afficherProjetsDansModale(projets); // Appelle la fonction pour afficher les projets dans la modale
    editModal.style.display = "flex";
  });

  // Fermer la modale au clic sur le bouton de fermeture
  closeButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Fermer la modale en cliquant en dehors de celle-ci
  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    }
  });
});

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await afficherBoutonsFiltres(); // Charge les boutons de filtrage en premier
    await afficherProjets(); // Puis charge les projets dans la galerie

    // Initialisation de l'authentification et de la modale après avoir chargé le contenu principal
    updateAuthLink();
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la page :", error);
  }
});

// Check if log or not for button //
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".edit-button");

  // Fonction pour vérifier si l'utilisateur est connecté
  function checkAuthentication() {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // Affiche le bouton si l'utilisateur est connecté
      editButton.style.display = "block";
    } else {
      // Masque le bouton si l'utilisateur n'est pas connecté
      editButton.style.display = "none";
    }
  }

  checkAuthentication(); // Appel initial pour vérifier l'état de connexion

  // Event listener pour ouvrir la modale si l'utilisateur est connecté
  editButton.addEventListener("click", () => {
    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "flex";
  });
});