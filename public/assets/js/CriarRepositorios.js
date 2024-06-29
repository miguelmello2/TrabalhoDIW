document.addEventListener("DOMContentLoaded", function() {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function() {
        navbarCollapse.classList.toggle("show");
    });

    getApiGitHub();
});

// Repositórios
const repositories = document.querySelector('#repositorios .d-flex');

function getApiGitHub() {
    fetch('https://api.github.com/users/miguelmello2/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            data.map(item => {
                let project = document.createElement('div');

                project.innerHTML = `
                    <div class="card" style="width: 18rem; margin-right: 10px;">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description || 'Sem descrição'}</p>
                            <p class="card-text"><strong>${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</strong></p>
                            <div class="card-items">
                                <p class="card-fork"><i class="fa-solid fa-code-fork"></i>${item.forks_count}</p>
                                <p class="card-stars"><i class="fa-regular fa-star"></i>${item.stargazers_count}</p>
                            </div>
                            <a href="repo1.html?id=${item.name}" id="bntVisitar" class="">Visitar</a>
                        </div>
                    </div>
                `;

                repositories.appendChild(project);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os repositórios:', error);
        });
}
