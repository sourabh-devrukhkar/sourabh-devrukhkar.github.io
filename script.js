const username = "sourabh-devrukhkar";
let allRepos = [];

async function loadRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        allRepos = await response.json();
    } catch (e) {
        console.error("Connection failed.");
    }
}

async function showCategory(type) {
    const selector = document.querySelector('.category-selector');
    const viewer = document.getElementById('project-viewer');
    const grid = document.getElementById('portfolio-grid');
    const title = document.getElementById('category-title');

    selector.style.display = 'none';
    viewer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    grid.innerHTML = ''; 

    // Load Offline Projects
    try {
        const registryResponse = await fetch('projects.json');
        const offlineProjects = await registryResponse.json();
        
        offlineProjects.filter(p => p.category === type).forEach(project => {
            grid.innerHTML += `
                <div class="bento-item">
                    <div class="card-meta" style="font-size:0.7rem; color:#555; margin-bottom:10px; font-weight:700;">${project.tech}</div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="cta-link">View Documentation &rarr;</a>
                </div>`;
        });
    } catch (e) { console.log("Registry fetch skipped."); }

    // Filter GitHub Repos
    const keywords = type === 'research' ? ['helmet', 'cad', 'mechanical', 'capsule', 'drone'] : ['ros', 'esp32', 'control', 'embedded', 'arduino', 'simulation'];
    filterGitHubRepos(keywords);
}

function filterGitHubRepos(keywords) {
    const grid = document.getElementById('portfolio-grid');
    const filtered = allRepos.filter(repo => 
        !repo.fork && 
        repo.name.toLowerCase() !== username.toLowerCase() &&
        repo.name !== `${username}.github.io` &&
        keywords.some(key => repo.name.toLowerCase().includes(key))
    );

    filtered.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'bento-item';
        card.innerHTML = `
            <div class="card-meta" style="font-size:0.7rem; color:#555; margin-bottom:10px; font-weight:700;">${repo.language ? repo.language.toUpperCase() : 'SOURCE CODE'}</div>
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description || 'Implementation of high-performance mechatronic logic.'}</p>
            <a href="${repo.html_url}" target="_blank" class="cta-link">View Repository &rarr;</a>
        `;
        grid.appendChild(card);
    });
}

function hideCategory() {
    document.querySelector('.category-selector').style.display = 'flex';
    document.getElementById('project-viewer').style.display = 'none';
}

loadRepos();
