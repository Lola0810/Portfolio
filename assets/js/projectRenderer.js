const initProjects = (filteredProjects) => {
    const tag = getTagFromURL();

    const container = document.querySelector('.container_cards.projects');
    
    filteredProjects.forEach(project => {
        // Create the article element
        const projectCard = document.createElement("article");
        projectCard.classList.add("project-card", "hidden");

        projectCard.id = project.title;

        // Create the image container div
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("project-image-container", "hover");

        // Create the image placeholder div
        const imagePlaceholder = document.createElement("img");
        imagePlaceholder.classList.add("project-image-placeholder");
        imagePlaceholder.style.cursor = "pointer";
        imagePlaceholder.onclick = () => {
            window.location.href = `./projects/${project.redirect}`;
        };
        imagePlaceholder.src = `../assets/images/thumbnail/${project.thumbnail}`;

        // Append the placeholder inside the container
        imageContainer.appendChild(imagePlaceholder);

        // Create the project title
        const projectTitle = document.createElement("a");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = project.title;
        projectTitle.onclick = () => {
            window.location.href = `./projects/${project.redirect}`;
        };

        // Create the project tags container
        const projectTags = document.createElement("div");
        projectTags.classList.add("project-tags");

        // Create individual tags
        project.type.forEach(tag => {
            const tagElement = document.createElement("span");
            tagElement.classList.add("project-tag");
            tagElement.textContent = TAGS[tag];
            projectCard.classList.add(tag.toLowerCase());
            projectTags.appendChild(tagElement);
        });

        // Assemble everything into the article
        projectCard.appendChild(imageContainer);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectTags);

        // Append the article to the body (or any specific container)
        container.appendChild(projectCard);
    });

    tag ? filterProjects(tag) : filterProjects("all");
}

const getTagFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tag');
}

const filterProjects = (type) => {
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(type).classList.add("active");
    if(type === "all") {
        document.querySelectorAll(".project-card").forEach(project => {
            project.classList.remove("hidden");
        });
        return;
    }
    document.querySelectorAll(".project-card").forEach(project => {
        project.classList.add("hidden");
    });
    document.querySelectorAll(`.${type}`).forEach(project => {
        project.classList.toggle("hidden");
    });
}

initProjects(PROJECTS);