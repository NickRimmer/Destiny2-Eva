let dataItems = {};
let currentItemIndex = localStorage.getItem("itemIndex") || 0;
let currentLang = localStorage.getItem("lang") || "en";
let currentDataName;

function loadData(name) {
    $.getJSON(`/assets/json/${name}-${currentLang}.json`, function (data) {
        dataItems = data;
        updateRecipesList();
        showItem(Math.min(currentItemIndex, dataItems.recipes.length));
        currentDataName = name;
    });
}

function updateRecipesList() {
    const el = $(".recipes .recipes-list .items");
    el.html("");

    //TODO: sort recipes
    $.each(dataItems.recipes, (i, data) => {
        const link = $(`<a href="javascript:void(0)">${data.title}</a>`);
        link.on("click", (e) => {
            showItem(i);
        });
        el.append(link);
    })
}

function buildItemCard(data) {
    const el = $("#templates > .item-card").clone();

    $("img", el).attr("src", data.image);
    $(".title", el).html(data.title);
    $(".description", el).html(data.description);

    return el;
}

function showItem(i) {
    const item = dataItems.recipes[i];
    const cookie = buildItemCard(item);
    $(".recipes .selector .cookie-item").html(cookie);

    const ingredients = item.ingredients.map(x => buildItemCard(dataItems.ingredients[x]));
    $(".ingredients .items").html(ingredients);
    
    currentItemIndex = i;
    localStorage.setItem("itemIndex", currentItemIndex)
}

function setLang(lang) {
    localStorage.setItem("lang", lang);
    currentLang = lang;
    loadData(currentDataName);
}