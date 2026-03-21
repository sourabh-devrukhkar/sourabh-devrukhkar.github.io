const username = "sourabh-devrukhkar";
const projectsContainer = document.getElementById("projects");

async function fetchProjects() {
  try {
    projectsContainer.innerHTML = "<p style='text-align:center; width:100%; color:#94a3b8;'>Loading projects...</p>";
    
    // Fetch the projects from GitHub
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    if (!response.ok) throw new Error("GitHub API limit reached or network error.");
    
    const data = await response.json();

    // Filter out forks and the profile README repo
    const softwareProjects = data.filter(repo => !repo.fork && repo.name !== username);
    
    let output = "";

    // Build the HTML cards directly from the GitHub data
    softwareProjects.forEach(project => {
      output += `
        <div class="card">
          <h3>${project.name}</h3>
          <p>${project.description || "No description available"}</p>
          <div style="display: flex; gap: 15px; margin-top: 10px; font-size: 13px; color: #cbd5e1;">
          </div>
          <a href="${project.html_url}" target="_blank">View Project &rarr;</a>
        </div>
      `;
    });

    projectsContainer.innerHTML = output;

  } catch (error) {
    projectsContainer.innerHTML = `<p style='text-align:center; width:100%; color:#ef4444;'>Error loading projects: ${error.message}</p>`;
  }
}

fetchProjects();