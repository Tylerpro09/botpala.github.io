let data = [];
let currentPage = 1;
const resultsPerPage = 5;

// Cargar los datos desde el archivo JSON
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
    })
    .catch(error => console.error('Error al cargar los datos:', error));

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filterDate = document.getElementById('filter-date').value;
    const results = document.getElementById('results');
    results.innerHTML = '';

    const filteredData = data.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
        const matchesDate = !filterDate || item.date === filterDate;
        return matchesQuery && matchesDate;
    });

    const totalPages = Math.ceil(filteredData.length / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedData = filteredData.slice(start, end);

    if (paginatedData.length > 0) {
        paginatedData.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result');
            
            const title = document.createElement('div');
            title.classList.add('result-title');
            title.textContent = item.title;

            const url = document.createElement('div');
            url.classList.add('result-url');
            url.textContent = item.url;

            const content = document.createElement('div');
            content.textContent = item.content.substring(0, 150) + "...";

            resultItem.appendChild(title);
            resultItem.appendChild(url);
            resultItem.appendChild(content);

            results.appendChild(resultItem);
        });

        displayPagination(totalPages);
    } else {
        results.textContent = 'No se encontraron resultados.';
    }
}

function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            search();
        };
        pagination.appendChild(pageButton);
    }
}
