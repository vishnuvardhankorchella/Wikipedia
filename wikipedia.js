let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        description,
        link,
        title
    } = result;
    //Div container
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);
    //Anchor Heading
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    //Break Element
    let titleBreak = document.createElement("br");
    resultItemEl.appendChild(titleBreak);

    //Anchor link
    let resultLinkEl = document.createElement("a");
    resultLinkEl.href = link;
    resultLinkEl.target = "_blank";
    resultLinkEl.textContent = link;
    resultLinkEl.classList.add("result-url");
    resultItemEl.appendChild(resultLinkEl);

    //Line break 
    let lineBreak = document.createElement("br");
    resultItemEl.appendChild(lineBreak);

    //Description 

    let resultDescription = document.createElement("p");
    resultDescription.classList.add("link-description");
    resultDescription.textContent = description;
    resultItemEl.appendChild(resultDescription);



}

function displayResult(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResultEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });

    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);