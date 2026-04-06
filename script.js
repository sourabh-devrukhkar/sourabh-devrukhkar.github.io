const username = "sourabh-devrukhkar";
let allRepos = [];

// Pre-load data for instant category switching
async function loadRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        allRepos = await response.json();
    } catch (e) {
        console.error("Connection to GitHub failed.");
    }
}

function showCategory(type) {
    const selector = document.querySelector('.category-selector');
    const viewer = document.getElementById('project-viewer');
    const grid = document.getElementById('portfolio-grid');
    const title = document.getElementById('category-title');

    // Smooth transition
    selector.style.display = 'none';
    viewer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    grid.innerHTML = ''; 

    if (type === 'research') {
        title.innerText = "Kinematics & R&D";
        
        // STATIC RESEARCH PROJECTS
        grid.innerHTML = `
            <div class="bento-item">
                <h3>Cable-Driven Robotic Arm</h3>
                <p>Kinematic development for wheelchairs. Published research focusing on cable-actuation for medical assistive devices.</p>
                <a href="documents/CDRA_Paper.pdf" target="_blank" class="cta-link">View Documentation &rarr;</a>
            </div>
            <div class="bento-item">
                <h3>Smart Parking Mechanics</h3>
                <p>Real-time slot monitoring using infrared sensor fusion and structural optimization.</p>
                <a href="documents/SmartParking.pdf" target="_blank" class="cta-link">Infographic &rarr;</a>
            </div>
            <div class="bento-item">
                <h3>Industrial Thermo-Control</h3>
                <p>Smart thermal regulation system designed for industrial environmental control and plant safety.</p>
                <a href="documents/ThermoClock.pdf" target="_blank" class="cta-link">Case Study &rarr;</a>
            </div>
        `;
        
        // FILTER: CAD / MECHANICAL REPOS
        filterGitHubRepos(['helmet', 'capsule', 'drone', 'cad', 'mechanical']);
    } else {
        title.innerText = "Embedded Intelligence";
        
        // FILTER: ROBOTICS / SOFTWARE REPOS
        filterGitHubRepos(['ros', 'esp32', 'corrosion', 'simulation', 'arduino', 'control', 'navigator']);
    }
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
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description || 'Implementation of high-performance mechatronic logic and system integration.'}</p>
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
