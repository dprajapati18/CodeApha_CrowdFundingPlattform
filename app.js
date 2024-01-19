document.addEventListener('DOMContentLoaded', function () {
    displayProjects();
});

function createProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const goal = document.getElementById('fundingGoal').value;

    if (!title || !description || !goal) {
        alert('Please fill in all fields.');
        return;
    }

    const project = {
        title,
        description,
        goal,
        currentAmount: 0,
        updates: [],
    };

    saveProject(project);
    displayProjects();
    clearForm();
}

function saveProject(project) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function displayProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsList = document.getElementById('projects');
    projectsList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('project');
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Funding Goal: $${project.goal}</p>
            <p>Current Amount: $${project.currentAmount}</p>
            <button onclick="contribute(${index})">Contribute</button>
        `;
        projectsList.appendChild(projectItem);
    });
}

function contribute(index) {
    const amount = parseFloat(prompt('Enter contribution amount ($):'));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid contribution amount.');
        return;
    }

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects[index];
    project.currentAmount += amount;

    const update = {
        timestamp: new Date().toLocaleString(),
        content: `Received a contribution of $${amount}.`,
    };

    project.updates.push(update);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
}

function clearForm() {
    document.getElementById('projectForm').reset();
}
