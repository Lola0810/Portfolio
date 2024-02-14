// remplir les containeurs
for(const [className, data] of [["projects", PROJECTS], ["designs", DESIGNS]])
    fillContainer(document.querySelector(`.container_cards.${className}`), data);


function fillContainer(container, data) {
    data.forEach(project => {
        container.insertAdjacentHTML("afterbegin", `
            <div data-project-id="${project.title}" class="card">
                <!-- Image pour visualiser le projet -->
                <div class="image">
                    <img src="../assets/images/thumbnail/${project.thumbnail}" alt>
                </div>
                
                <!-- Description du projet -->
                <div class="description">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                </div>
    
                <div class="flex_right">
                    <!-- Bouton voir plus -->
                    <button class="seemore">EN SAVOIR PLUS</button>
                </div>
            </div>
        `);
        document.querySelector(`[data-project-id="${project.title}"] button`)
            .onclick = () => openDetails(project);
    });
    
}
function openDetails(project) {
    document.body.style.overflowY = "hidden";
    document.body.insertAdjacentHTML("beforeend", `
        <div data-for-project-id="${project.title}" class="pop-up ${project.class}">
            <div>
                <span class="close">&times;</span>
                
                <img class="image_visuel" src="../assets/images/thumbnail/${project.thumbnail}" alt>
                <div class="contenu_projet">
                    <h2>${project.title}</h2>
                    <h4>Année: ${project.duration.start} - ${project.duration.end}</h4>
                    <h4>Cadre: ${project.baseline} 
                    <h4>Les missions</h4>
                    <ul>
                        ${project.assignments
                            .map(assigment => `<li>${assigment}</li>`)
                            .join("")
                        }
                    </ul>
                    <h4>Technologies utilisées</h4>
                    <ul>
                        ${project.technologies
                            .map(technologies => `<li>${technologies}</li>`)
                            .join("")
                        }
                    </ul>
                    <h4>Note</h4>
                    <ul>
                        ${project.note
                            .map(note => `<li>${note}</li>`)
                            .join("")
                        }
                    </ul>
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