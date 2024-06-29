async function getGitHubProfile() {
    try {
        const profileResponse = await fetch(`https://api.github.com/users/miguelmello2`);
        if (!profileResponse.ok) {
            throw new Error('Erro ao carregar perfil do GitHub');
        }
        const profile = await profileResponse.json();

        document.getElementById('profile-photo').src = profile.avatar_url;
        document.getElementById('profile-name').textContent = profile.name || 'Nome não disponível';
        document.getElementById('profile-bio').textContent = profile.bio || 'Biografia não disponível';
        document.getElementById('profile-location').textContent = profile.location || 'Localização não disponível';
        document.getElementById('profile-url').href = profile.html_url;
        document.getElementById('profile-url').textContent = profile.html_url;
        document.getElementById('profile-link').href = profile.html_url;

        const followersResponse = await fetch(profile.followers_url);
        if (!followersResponse.ok) {
            throw new Error('Erro ao buscar número de seguidores');
        }
        const followersData = await followersResponse.json();
        const followersCount = followersData.length;

        const followersElement = document.querySelector('.followers');
        followersElement.innerHTML = `
            <i class="fa-solid fa-user"></i>
            <p>${followersCount}</p>
           <span>${followersCount > 1 ? 'Seguidores' : 'Seguidor'}</span>
        `;

    } catch (error) {
        console.error('Erro ao buscar perfil do GitHub:', error);
    }
}

getGitHubProfile();
