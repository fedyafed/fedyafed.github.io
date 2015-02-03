"use strict";!function(){angular.module("auction",["ngRoute","restangular","auction.templates"]).config(["$routeProvider",function(a){var b=function(a){return a+" | Auction"};a.when("/",{templateUrl:"views/home.html",title:b("Home"),controller:"HomeController",controllerAs:"ctrl"}).when("/search",{templateUrl:"views/search.html",title:b("Search"),reloadOnSearch:!1,controller:"SearchController",controllerAs:"ctrl"}).when("/product/:productId",{templateUrl:"views/product.html",title:b("Product"),controller:"ProductDetailsController",controllerAs:"ctrl",resolve:{product:["ProductService","$route",function(a,b){return a.getProductById(parseInt(b.current.params.productId)).then(function(a){return a},function(){return null})}]}}).otherwise({redirectTo:"/"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("data"),a.setRequestSuffix(".json")}]).run(["$rootScope",function(a){a.$on("$routeChangeSuccess",function(b,c){a.title=c.$$route.title,a.$emit("cleanErrors")})}])}(),function(){var a=["ProductService","$rootScope",function(a,b){this.ProductService=a,this.$rootScope=b,this.products=[],a.listProducts().then(function(a){this.products=a}.bind(this),function(){this.$rootScope.$emit("error",["Can not load products"])}.bind(this))}];a.$inject=["ProductService","$rootScope"],angular.module("auction").controller("HomeController",a)}(),function(){var a=["ProductService","$rootScope","$scope",function(a,b,c){this.ProductService=a,this.$rootScope=b,this.products=[],this.refreshPage=function(){this.ProductService.searchProducts().then(function(a){this.products=a,a&&0!==a.length||this.$rootScope.$emit("error",["Products not found"])}.bind(this),function(){this.$rootScope.$emit("error",["Can not load products"])}.bind(this))};var d=b.$on("$routeUpdate",function(){this.refreshPage()}.bind(this));c.$on("$destroy",function(){d()}),this.refreshPage()}];a.$inject=["ProductService","$rootScope","$scope"],angular.module("auction").controller("SearchController",a)}(),function(){var a=["product","$rootScope",function(a,b){this.product=a,this.isSearchFormVisible=!1,a||(b.$emit("error",["Product not found"]),this.isSearchFormVisible=!0)}];a.$inject=["product","$rootScope"],angular.module("auction").controller("ProductDetailsController",a)}(),function(){var a=["Restangular","SearchService",function(a,b){this.listProducts=function(){return a.all("products").getList()},this.searchProducts=function(){return a.all("products").getList(b.getCleanSearch())},this.getProductById=function(b){return a.one("products",b).get()}}];a.$inject=["Restangular","SearchService"],angular.module("auction").service("ProductService",a)}(),function(){var a=["$location","$rootScope",function(a,b){this.SEARCH_DEFAULTS={lowPrice:0,highPrice:500,name:"",category:"",closeDate:"",bidNum:null},this.search={},this.urlToSearch=function(){if("/search"===a.path()){var b=a.search();for(var c in this.SEARCH_DEFAULTS)this.SEARCH_DEFAULTS.hasOwnProperty(c)&&(this.search[c]="undefined"==typeof b[c]?this.SEARCH_DEFAULTS[c]:b[c]);this.search.closeDate&&(this.search.closeDate=this.search.closeDate.replace(new RegExp("-","g"),"/")),this.search.bidNum&&(this.search.bidNum=parseInt(this.search.bidNum)),this.search.lowPrice&&(this.search.lowPrice=parseInt(this.search.lowPrice)),this.search.highPrice&&(this.search.highPrice=parseInt(this.search.highPrice))}}.bind(this),this.urlToSearch(),b.$on("$routeUpdate",this.urlToSearch),b.$on("$routeChangeStart",this.urlToSearch),this.getCleanSearch=function(){var a={};for(var b in this.search)this.search.hasOwnProperty(b)&&this.search[b]!==this.SEARCH_DEFAULTS[b]&&"undefined"!=typeof this.search[b]&&(a[b]=this.search[b]);return a.closeDate&&(a.closeDate=a.closeDate.replace(new RegExp("/","g"),"-")),a},this.showSearch=function(b){this.search=b,"/search"!==a.path()&&a.path("search"),a.search(this.getCleanSearch())},this.getSearch=function(){return this.search},this.getPriceRange=function(){return[this.SEARCH_DEFAULTS.lowPrice,this.SEARCH_DEFAULTS.highPrice]}}];a.$inject=["$location","$rootScope"],angular.module("auction").service("SearchService",a)}(),function(){angular.module("auction").directive("auctionNavbar",function(){return{scope:{},restrict:"E",templateUrl:"views/directive/Navbar.html",controller:["SearchService",function(a){this.find=function(){var b=a.getSearch();b.name=this.searchName,a.showSearch(b),this.searchName=""}}],controllerAs:"ctrl"}})}(),function(){angular.module("auction").directive("auctionFooter",function(){return{scope:!1,restrict:"E",templateUrl:"views/directive/Footer.html"}})}(),function(){angular.module("auction").directive("showError",function(){return{scope:!0,restrict:"E",templateUrl:"views/directive/ShowError.html",controller:["$rootScope","$scope",function(a,b){b.errors=[],b.closeError=function(a){b.errors.splice(a,1)},a.$on("error",function(a,c){c.forEach(function(a){b.errors.indexOf(a)<0&&b.errors.push(a)})}),a.$on("cleanErrors",function(){b.errors=[]})}]}})}(),function(){angular.module("auction").directive("priceRange",function(){return{restrict:"E",scope:{min:"@",max:"@",step:"@",low:"=",high:"="},templateUrl:"views/directive/PriceRangeDirective.html",link:function(a,b){var c=angular.element(b).find('input[type="text"]'),d=parseInt(a.min)||0,e=parseInt(a.max)||100,f=parseInt(a.step)||(e-d)/100;a.Min=d,a.Max=e,a.Step=f,a.low=parseInt(a.low)||d,a.high=parseInt(a.high)||e;var g=c.slider({min:d,max:e,step:f,value:[a.low,a.high],tooltip:"hide",handle:"triangle"});g.on("slideStop",function(b){b.value[0]!==a.low&&a.$apply(a.low=b.value[0]),b.value[1]!==a.high&&a.$apply(a.high=b.value[1])}),a.$watch("low",function(b){var c=parseInt(b);(isNaN(c)||c<a.Min)&&(c=a.Min),c>a.high&&(c=a.high),a.low=c,g.slider("setValue",[a.low,a.high])}),a.$watch("high",function(b){var c=parseInt(b);c<a.low&&(c=a.low),(isNaN(c)||c>a.Max)&&(c=a.Max),a.high=c,g.slider("setValue",[a.low,a.high])})}}})}(),function(){angular.module("auction").directive("searchForm",function(){return{restrict:"E",scope:!0,templateUrl:"views/directive/SearchFormDirective.html",controller:["SearchService","$scope",function(a){this.search=a.getSearch(),this.priceRange=a.getPriceRange(),this.find=function(){a.showSearch(this.search)}}],controllerAs:"ctrl"}})}(),function(){angular.module("auction").directive("datePicker",function(){return{restrict:"E",scope:{date:"=",fromDate:"@",toDate:"@"},templateUrl:"views/directive/DatePickerDirective.html",link:function(a,b){var c=a.fromDate||"",d=a.toDate||"";a.datePicker=angular.element(b).find("input"),a.datePicker.datepicker({format:"mm/dd/yyyy",startDate:c,endDate:d})},controller:["$scope",function(a){a.showDatePicker=function(){a.datePicker.datepicker("show")}}]}})}();