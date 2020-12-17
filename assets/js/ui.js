const langs = ["en", "ru"];

function openRecipesMenu() {
    $(".common-container").addClass("recipes-opened");
}

function closeRecipesMenu() {
    $(".common-container").removeClass("recipes-opened");
}

function configureRecipesMenu() {
    // click to open
    $(".recipes .selector").on("click", openRecipesMenu);

    // auto close on click outside of menu
    $(window).on("click", closeRecipesMenu);
    $(".recipes .selector").on("click", (e) => { e.stopPropagation() });
}

function configureLangs() {
    const langElements = langs.map((l) => {
        const a = $(`<a href="javascript:void(0)" class="${l}"></a>`);
        a.on("click", () => setLang(l));

        return a;
    });

    $(".footer .langs").html(langElements);
}