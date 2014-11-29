$(document).ready(function(){
    //---------------------------------------change page---------------------------------------
    var goToHomePage = function(){
        loadHomeData();
        $("#searchForm").show();
        $("#homePage").show();
        $("#searchPage").hide();
    };

    $(".home").click(goToHomePage);

    var goToSearchPage = function(){
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


    goToSearchPage();
});