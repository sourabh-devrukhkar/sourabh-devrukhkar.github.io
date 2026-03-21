const username = "sourabh-devrukhkar";
const projectsContainer = document.getElementById("projects");

async function fetchProjects() {
  try {
    projectsContainer.innerHTML = "<p style='text-align:center; width:100%; color:#94a3b8;'>Loading projects...</p>";
    
    // Fetch the projects from GitHub
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    if (!response.ok) throw new Error("GitHub API limit reached or network error.");
    
    const data = await response.json();

    /** * FILTER LOGIC:
     * 1. !repo.fork -> Excludes projects you just copied from others
     * 2. repo.name !== username -> Excludes the 'profile' repository
     * 3. repo.name !== `${username}.github.io` -> Excludes THIS website repository
     */
    const softwareProjects = data.filter(repo => 
      !repo.fork && 
      repo.name !== username && 
      repo.name !== `${username}.github.io`
    );
    
    let output = "";

    // Build the HTML cards
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
