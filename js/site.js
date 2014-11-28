$(document).ready(function(){
    //---------------------------------------change page---------------------------------------
    var goToHomePage = function(){
        loadHomeData();
        $("#searchForm").show();
        $("#homePage").show();
    };

    $(".home").click(goToHomePage);

    var goToSearchPage = function(){
        $("#errorMessage").hide();
        $("#searchForm").hide();
        $("#homePage").hide();
    };

    $("#searchButton").click(goToSearchPage);
    $("#searchLink").click(goToSearchPage);

    $("#errorMessage").click(function(){
        $("#errorMessage").hide();
    });

    //------------------------------------handlebars--------------------------------------------
    var featuredProductsTemplate = Handlebars.compile($("#featuredProducts").html());
    var viewFeaturedProducts = function(data) {
        console.log(featuredProductsTemplate(data));
        $("#products")
            .html(featuredProductsTemplate(data))
            .show();
    };

    //------------------------------------JSON-----------------------------------------------
    var loadHomeData = function() {
        $("#errorMessage").hide();
        $("#products").hide();

        $.getJSON("json/featured-products.json", function (data) {
            console.log(data);
            viewFeaturedProducts(data);
        }).fail(function () {
            $("#errorMessage")
                .text("Can not load resources.")
                .show();
        });
    };

    //----------------------------------------Initialization------------------------------
    goToHomePage();
});