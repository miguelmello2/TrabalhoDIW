async function getWorkmates() {
    const workmatesSection = document.querySelector("#colegas-section");

    const jsonServer = "http://localhost:3000/colegas";

    try {
        const response = await fetch(jsonServer);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        data.forEach(workmate => {
            const workmateHTML = `
                <div class="col mb-4 text-center"> 
                    <a href="${workmate.html_url}">
                        <img id="profile-photo" src="${workmate.avatar_url}" class="rounded-circle border">
                    </a>
                    <p class="mt-2">${workmate.name || workmate.login}</p> 
                </div>
            `;

            workmatesSection.innerHTML += workmateHTML;
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert("Por favor, abra o JSON Server!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getWorkmates();
});