window.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector(".form");
    let list = document.querySelector(".list__items");
    let input = document.querySelector(".form__input");
    let notFound = document.querySelector(".not_found")
    let count = document.querySelector(".total__count");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let repName = document.querySelector(".form__input").value;
        searchRep(repName);
    });
    



    async function searchRep(name) {
        if (list.firstChild) {
            list.replaceChildren();
        }
        if (notFound.firstChild) {
            notFound.replaceChildren();
        }
        return await fetch(`https://api.github.com/search/repositories?q=${name}`)
        .then(response => {
            if (response.ok) {
                response.json()
                .then(response => {
                    console.log(response);
                    if (response.total_count !== 0) {
                        response.items.forEach(item => {
                            list.innerHTML += `
                            <li class="list__item">
                                <div class="list__wrapper">
                                    <div class="list__image">
                                        <img src='${item['owner']['avatar_url']}' class="img">
                                    </div>
                                    <a href="${item['svn_url']}" class="list__name" target="_blank">${item['name']}</a>
                                    <div class="list__owner">Owner: ${item['owner']['login']}</div>
                                </div>
                            </li>`;
                            count.innerHTML = `Всего репозиториев: ${response.total_count}`
                        });
                    } else {
                        notFound.innerHTML = '<div class="result">Ничего не найдено</div';
                        count.innerHTML = ``
                    }
                })
            }
        })
    }
});