document.addEventListener('DOMContentLoaded', function() {

    // Konstruktor Slidera
    function Slider(selector, pauseTime) {
        this.slider = document.querySelector(selector);
        this.slides = this.slider.querySelectorAll(".intro__slide");
        this.current = 0; //nr aktualnego slajdu
        this.time = null; // tutaj podstawię interval

        if (typeof pauseTime !== "number") {
            pauseTime = 3000;
        }
        this.pauseTime = pauseTime;

        // podpinamy i wyłapujemy przyciski
        this.createButtons();

        // automatycznie przełączamy slajd po wejściu na stronę
        this.time = setTimeout(function() {
            this.nextSlide();
        }.bind(this), this.pauseTime);

    }


    // Metoda dla Slidera zmieniająca slajd na poprzedni
    Slider.prototype.prevSlide = function() {

        // usuwamy klasę wszystkim slajdom
        for (var el of this.slides) {
            el.classList.remove("intro__slide--active");
        }

        // liczymy obecny slajd
        this.current--;
        if (this.current < 0) {
            this.current = this.slides.length - 1;
        }

        // dodajemy klasę obecnemu slajdowi
        this.slides[this.current].classList.add("intro__slide--active");

        clearTimeout(this.time);
        this.time = setTimeout(function() {
            this.nextSlide();
        }.bind(this), this.pauseTime)
    };

    // Metoda dla Slidera zmieniająca slajd na następny
    Slider.prototype.nextSlide = function() {

        // usuwamy klasę wszystkim slajdom
        for (var el of this.slides) {
            el.classList.remove("intro__slide--active");
        }

        // liczymy obecny slajd
        this.current++;
        if (this.current > this.slides.length - 1) {
            this.current = 0;
        }
        // dodajemy klasę obecnemu slajdowi
        this.slides[this.current].classList.add("intro__slide--active");

        clearTimeout(this.time);
        this.time = setTimeout(function() {
            this.nextSlide();
        }.bind(this), this.pauseTime);
    };



    Slider.prototype.createButtons = function() {
        this.btnPrev = this.slider.querySelector(".control--prev");
        this.btnNext = this.slider.querySelector(".control--next");

        var self = this;

        this.btnPrev.addEventListener('click', function(e) {
            self.prevSlide();
        });

        this.btnNext.addEventListener('click', function(e) {
            self.nextSlide();
        });


    };
    var s1 = new Slider('#intro-slider', 5000);


    // KALKULATOR

    // var lists = document.querySelectorAll(".drop_down_list");

    // var summary = document.querySelector(".summary_panel");
    // var namePanel = summary.querySelector(".panel_left");
    // var pricePanel = summary.querySelector(".panel_right");
    // var namePanelSpans = namePanel.querySelectorAll("span");
    // var pricePanelSpans = pricePanel.querySelectorAll("span");
    // var transport = document.querySelector("#transport");

    // function Order(selector) {
    //     this.option = document.querySelector(selector);
    //     this.
    // }





    // var selectType = document.querySelector(".list_arrow:first-child");
    // var typeList = document.querySelector(".list_panel:first-of-type");
    // var selectColor = document.querySelector(".list_arrow:nth-of-type(2)");
    // var colorList = document.querySelector(".list_arrow:nth-of-type(2)");
    // var selectTextile = document.querySelector(".list_arrow:nth-of-type(3)");
    // var textileList = document.querySelector(".list_arrow:nth-of-type(3)");

    // console.log(selectType);
    // selectType.addEventListener('click', function(e) {

    //     if (typeList.style.display == "none") {
    //         typeList.style.display = "block";
    //     } else if (typeList.style.display == "block") {
    //         typeList.style.display = "none";
    //     }
    // });

});