function getRepoDetails() {
    const params = new URLSearchParams(window.location.search);
    const repo = params.get("id");

    if (!repo) {
        document.querySelector('.repo-details').innerHTML = '<p>Repositório não encontrado.</p>';
        return;
    }

    const repoApi = `https://api.github.com/repos/miguelmello2/${repo}`;

    fetch(repoApi)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro ao carregar repositório.');
            }
            return resp.json();
        })
        .then(repos => {
            const repoName = document.querySelector(".repo-name");
            const repoOwner = document.querySelector(".repo-owner");
            const repoDescription = document.querySelector(".description");
            const releasedDate = document.querySelector(".releasedDate");
            const languages = document.querySelector(".languages");
            const url = document.querySelector("#url");
            const repoInfo = document.querySelector('.repo-info');
            const license = document.querySelector(".license");

            repoName.textContent = `Repositório: ${repos.name}`;
            repoOwner.src = `${repos.owner ? repos.owner["avatar_url"] : ''}`;
            repoDescription.textContent = repos.description || "Sem descrição";
            releasedDate.textContent = `${Intl.DateTimeFormat('pt-BR').format(new Date(repos.created_at))}`;
            languages.textContent = repos.language || "Sem linguagem de programação";
            url.textContent = "Acessar";
            url.href = repos.html_url;

            let str = `<p class="fork"><i class="fa-solid fa-code-fork"></i>${repos.forks_count}</p>
                        <p class="watchers"><i class="fa-solid fa-eye"></i>${repos.watchers || 0}</p>
                        <p class="star"><i class="fa-regular fa-star"></i>${repos.stargazers_count}</p>`;
            repoInfo.innerHTML += str;

            license.innerHTML = `<h2>Licença:</h2>
                                <p class="license-item"><i class="fa-solid fa-scale-balanced"></i>${repos.license ? repos.license["name"] : 'Não há licença'}</p>`;
        })
        .catch(error => {
            console.error('Erro ao obter dados do repositório:', error);
            document.querySelector('.repo-details').innerHTML = '<p>Erro ao carregar repositório. Por favor, tente novamente mais tarde.</p>';
        });
}

document.addEventListener('DOMContentLoaded', getRepoDetails);
