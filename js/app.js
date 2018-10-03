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
});