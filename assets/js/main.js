$(function () {
    configureRecipesMenu();
    configureLangs();
    
    loadData("recipes-ny-2020");

    $("body").removeClass("loading");
})