let searchInputEle = document.getElementById("searchInput");
let firstContainer = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function showSearchResults(res) {
    // Creating the result container
    let resContainer = document.createElement("div");
    resContainer.classList.add("result-item");

    // Tite Element
    let {
        link,
        title,
        description
    } = res;
    let titleEle = document.createElement("a");
    titleEle.href = link;
    titleEle.target = "_blank";
    titleEle.textContent = title;
    titleEle.classList.add("result-title");

    // Break Element
    let break1 = document.createElement("br");

    // URL Element
    let urlEle = document.createElement("a");
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.textContent = link;
    urlEle.classList.add("result-url");

    // Break Element
    let break2 = document.createElement("br");

    // Description Element
    let descEle = document.createElement("p");
    descEle.textContent = description + "...";
    descEle.classList.add("link-description");

    firstContainer.appendChild(resContainer);
    resContainer.appendChild(titleEle);
    resContainer.appendChild(break1);
    resContainer.appendChild(urlEle);
    resContainer.appendChild(break2);
    resContainer.appendChild(descEle);
}

function displayResults(searchRes) {
    spinnerEle.classList.toggle("d-none");
    for (let res of searchRes) {
        showSearchResults(res);
    }
}

function wikiSearch(event) {
    if (event.key === "Enter") {
        spinnerEle.classList.toggle("d-none");
        firstContainer.textContent = "";
        let inpVal = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inpVal;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEle.addEventListener("keydown", wikiSearch);