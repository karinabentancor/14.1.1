document.getElementById('inputSearch').addEventListener('input', () => {
    const search = document.getElementById('inputSearch').value.trim().toLowerCase();
    if (search) buscar(search);
    else showResults([]); 
});

async function buscar(search) {
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(search)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            showResults(data.collection.items);
        })
        .catch(error => {
            console.error('Error:', error);
            showResults([]); 
        });
}

function showResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = items.length 
        ? items.map(item => `
            <div class="col">
                <div class="card">
                    <img src="${item.links[0]?.href || ''}" class="card-img-top" alt="${item.data[0]?.title || 'Sin título'}">
                    <div class="card-body">
                        <h5 class="card-title">${item.data[0]?.title || 'Sin título'}</h5>
                        <p class="card-text">${item.data[0]?.description || 'Sin descripción disponible.'}</p>
                    </div>
                </div>
            </div>`).join('') 
        : '<p>No se encontraron resultados.</p>';
}
