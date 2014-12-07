$(document).ready(function(){
    //---------------------------------------change page---------------------------------------
    var goToHomePage = function(){
        loadHomeData();
        $("#searchPage").hide();
        $("#searchForm").show();
        $("#homePage").show();
    };

    $(".home").click(goToHomePage);

    var goToSearchPage = function(){
        loadSearchData();
        $("#errorMessage").hide();
        $("#searchForm").hide();
        $("#homePage").hide();
        $("#searchPage").show();
    };

    $("#searchButton").click(goToSearchPage);
    $("#searchLink").click(goToSearchPage);

    $("#errorMessage").click(function(){
        $("#errorMessage").hide();
    });

    //------------------------------------handlebars--------------------------------------------
    var featuredProductsTemplate = Handlebars.compile($("#featuredProducts").html());
    var viewFeaturedProducts = function(data) {
        $("#products")
            .html(featuredProductsTemplate(data))
            .show();
    };

    var searchedProductsTemplate = Handlebars.compile($("#searchedProducts").html());
    var viewSearchedProducts = function(data) {
        $("#products")
            .html(searchedProductsTemplate(data))
            .show();
    };

    //------------------------------------JSON-----------------------------------------------
    var loadHomeData = function() {
        $("#errorMessage").hide();
        $("#products").hide();

        $.getJSON("json/featured-products.json", function (data) {
            viewFeaturedProducts(data);
        }).fail(function () {
            $("#errorMessage")
                .text("Can not load resources.")
                .show();
        });
    };

    var loadSearchData = function() {
        $("#errorMessage").hide();
        $("#products").hide();

        $.getJSON("json/search-results.json", function (data) {
            viewSearchedProducts(data);
        }).fail(function () {
            $("#errorMessage")
                .text("Can not load resources.")
                .show();
        });
    };

    //----------------------------------------Initialization------------------------------
    $("#category li").click(function(event){
        $("#category input").val(event.currentTarget.innerText);
    });

    $("#priceSlider")
        .slider({
            min: 0,
            max: 10000,
            step: 1,
            value: [0, 10000],
            tooltip: 'hide',
            handle: 'triangle'
        })
        .on('slide', function(event) {
            $("#priceFrom").val(event.value[0]);
            $("#priceTo").val(event.value[1]);
        });
    $(".slider.slider-horizontal").width("100%");
    $("#priceFrom, #priceTo").change(function() {
        $("#priceSlider").slider('setValue', [
            $("#priceFrom").val(),
            $("#priceTo").val()
        ])
    });

    $('#closeDatePicker').datetimepicker({
            pickTime: false,
            defaultDate: new Date()
    });

    var updateTimer = function () {
        $('.currentTime').text(moment().format('HH:mm'));
    };
    updateTimer();
    setInterval(updateTimer, 1000);

    goToHomePage();
});