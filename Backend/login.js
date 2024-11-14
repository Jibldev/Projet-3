// Création du login //

document.getElementById("connexion").addEventListener("click", function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire
  
  // Récupérer les valeurs des champs
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  // Exemple de vérification (utilisez vos propres critères de validation ou API)
  if (email === "sophie.bluel@test.tld" && password === "S0phie") {
    // Connexion réussie
    localStorage.setItem("isAuthenticated", "true"); // Stocke l'état de connexion
    window.location.href = "index.html"; // Redirige vers la page principale
  } else {
    // Afficher le message d'erreur
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
});