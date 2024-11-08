// Fonction pour filtrer les projets par type et gérer les styles des boutons
function filterProjects(type) {
    // Si "all", on affiche tous les projets
    const filteredProjects = type === "all" ? PROJECTS : PROJECTS.filter(project => project.type === type);

    // Vider le conteneur avant de le remplir avec les projets filtrés
    const container = document.querySelector('.container_cards.projects');
    container.innerHTML = "";  // Vider le conteneur existant

    // Remplir le conteneur avec les projets filtrés
    fillContainer(container, filteredProjects);

    // Gérer le style actif des boutons : enlever la classe 'active' de tous les boutons
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');  // Retirer la classe active de tous les boutons
    });

    // Ajouter la classe 'active' uniquement au bouton cliqué
    const activeButton = document.querySelector(`.filter-buttons button[onclick="filterProjects('${type}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Initialiser les projets affichés
filterProjects('all'); // Affiche tous les projets par défaut

// Fonction pour remplir un conteneur avec des projets
function fillContainer(container, data) {
    data.forEach(project => {
        container.insertAdjacentHTML("afterbegin", `
            <div data-project-id="${project.title}" class="card">
                <!-- Image pour visualiser le projet -->
                <img src="../assets/images/seemore3.svg" class="overlay" alt="Voir plus" />
                <div class="image">
                    <img src="../assets/images/thumbnail/${project.thumbnail}" alt>
                </div>
                
                <!-- Description du projet -->
                <div class="description">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                </div>
            </div>
        `);
        document.querySelector(`.card[data-project-id="${project.title}"]`)
            .onclick = () => openDetails(project);
    });
}

// Fonction pour afficher les détails d'un projet dans une pop-up
function openDetails(project) {
    document.body.style.overflowY = "hidden";
    document.body.insertAdjacentHTML("beforeend", `
        <div data-for-project-id="${project.title}" class="pop-up ${project.class}">
            <div>
                <span class="close">&times;</span>
                
                <img class="image_visuel" src="../assets/images/thumbnail/${project.thumbnail}" alt>
                <div class="contenu_projet">
                    <h2>${project.title}</h2>
                    <h4>Période: ${project.duration.start} - ${project.duration.end}</h4>
                    <h4>Cadre: </h4>
                    <p> 
                        ${project.baseline}
                    </p>
                    <h4>Les missions</h4>
                    <ul>
                        ${project.assignments
                            .map(assignment => `<li>${assignment}</li>`)
                            .join("")
                        }
                    </ul>
                    <h4>Technologies utilisées</h4>
                    <ul>
                        ${project.technologies
                            .map(technology => `<li>${technology}</li>`)
                            .join("")
                        }
                    </ul>

                    <h4>Savoir être</h4>
                    <p>
                        ${project.softskill}
                    </p>
                </div>
            </div>
        </div>
    `);
    document.querySelector(`[data-for-project-id="${project.title}"] .close`)
        .onclick = event => {
            event.target.parentElement.parentElement.remove();
            document.body.style.overflowY = "visible";
        }
}