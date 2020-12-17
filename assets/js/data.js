let dataItems = {};

function loadData(name) {
    const lang = "en";
    $.getJSON(`/assets/json/${name}-${lang}.json`, function (data) {
        dataItems = data;
        updateRecipesList();
        showItem(0);
    });
}

function recipesComparer(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function updateRecipesList() {
    const el = $(".recipes .recipes-list .items");
    el.html("");

    //TODO: sort recipes
    $.each(dataItems.recipes.sort(recipesComparer), (i, data) => {
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
}