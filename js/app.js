document.addEventListener('DOMContentLoaded', function() {
	// Konstruktor Slidera
	function Slider(selector, pauseTime) {
		this.slider = document.querySelector(selector);
		this.slides = this.slider.querySelectorAll('.intro__slide');
		this.current = 0; //nr aktualnego slajdu
		this.time = null; // tutaj podstawię interval

		if (typeof pauseTime !== 'number') {
			pauseTime = 3000;
		}
		this.pauseTime = pauseTime;

		// podpinamy i wyłapujemy przyciski
		this.createButtons();

		// automatycznie przełączamy slajd po wejściu na stronę
		this.time = setTimeout(
			function() {
				this.nextSlide();
			}.bind(this),
			this.pauseTime
		);
	}

	// Metoda dla Slidera zmieniająca slajd na poprzedni
	Slider.prototype.prevSlide = function() {
		// usuwamy klasę wszystkim slajdom
		for (var el of this.slides) {
			el.classList.remove('intro__slide--active');
		}

		// liczymy obecny slajd
		this.current--;
		if (this.current < 0) {
			this.current = this.slides.length - 1;
		}

		// dodajemy klasę obecnemu slajdowi
		this.slides[this.current].classList.add('intro__slide--active');

		clearTimeout(this.time);
		this.time = setTimeout(
			function() {
				this.nextSlide();
			}.bind(this),
			this.pauseTime
		);
	};

	// Metoda dla Slidera zmieniająca slajd na następny
	Slider.prototype.nextSlide = function() {
		// usuwamy klasę wszystkim slajdom
		for (var el of this.slides) {
			el.classList.remove('intro__slide--active');
		}

		// liczymy obecny slajd
		this.current++;
		if (this.current > this.slides.length - 1) {
			this.current = 0;
		}
		// dodajemy klasę obecnemu slajdowi
		this.slides[this.current].classList.add('intro__slide--active');

		clearTimeout(this.time);
		this.time = setTimeout(
			function() {
				this.nextSlide();
			}.bind(this),
			this.pauseTime
		);
	};

    // metoda dla Slidera tworząca przyciski
	Slider.prototype.createButtons = function() {
		this.btnPrev = this.slider.querySelector('.control--prev');
		this.btnNext = this.slider.querySelector('.control--next');

		var self = this;

        // podpięcie przyciskowi wstecz zmiany na poprzedni slajd
		this.btnPrev.addEventListener('click', function(e) {
			self.prevSlide();
		});

        // podpięcie przyciskowi następny zmiany na następny slajd
		this.btnNext.addEventListener('click', function(e) {
			self.nextSlide();
		});
    };

	var s1 = new Slider('#intro-slider', 5000);



	// KALKULATOR ZAMÓWIENIA
    // Konstruktor wyboru zamówienia
	var DropdownSelect = function(selector, number) {
		this.listWrapper = document.querySelector(selector); // pobranie ze strony kontenera z listą
		this.arrowBtn = this.listWrapper.querySelector('.list_arrow'); // pobranie strzałki otwierającej dropdown
		this.listPanel = this.listWrapper.querySelector('.list_panel'); // pobranie listy z opcjami do wyboru
		this.options = this.listPanel.querySelectorAll('li'); // pobranie opcji
		this.label = this.listWrapper.querySelector('.list_label'); // pobranie labela dla rodzaju opcji
		this.nameColumn = document.querySelectorAll('.panel_left span'); // pobranie miejsc, w które ma zostać wpisana nazwa opcji
		this.priceColumn = document.querySelectorAll('.panel_right span'); // pobranie miejsca, w które ma zostać wpisana cena opcji

        this.summaryTransportName = document.querySelector('span.transport'); // pobranie miejsca na wpisanie nazwy usługi transport

        this.summaryTransportValue = document.querySelector(".transport.value"); // pobranie miejsca na wpisanie ceny transportu

        this.transport = document.querySelector('#transport'); //pobranie pola wyboru transportu

		this.openDropdown(); // wywołanie metody otwarcia listy dropdown
        this.labelSelect(number); //wywołanie metody wyboru opcji
        this.selectTransport(); // wywołanie metody wyboru transportu
    };

    // funkcja kalkulatora
    function calculator() {
        var values = document.querySelectorAll(".panel_right .value"); // kolumna z cenami wybranych opcji
        var totalPrice = document.querySelector('.sum strong'); // miejsce na łączny koszt zamówienia
        var sum = 0; // początkowa suma
        for (var el of values) { // pętla po wartościach wybranych opcji
            sum += Number(el.innerText); // zamiana tekstu na liczby i dodanie ich do początkowej sumy
        }
        totalPrice.innerText = sum; // wypisanie sumy w miejscu do tego wyznaczonym
    }

    // metoda dla wyboru zamówienia - otwarcie listy
	DropdownSelect.prototype.openDropdown = function() {
        var self = this;

		this.arrowBtn.addEventListener('click', function(e) {
			self.listPanel.classList.toggle('opened'); // otwarcie listy dropdown po naciśnięciu strzałki
		});
	};

    // metoda dla wyboru zamówienia - wybór opcji
	DropdownSelect.prototype.labelSelect = function(number) {
		var self = this;

		for (var el of this.options) {
			el.addEventListener('click', function(e) {
				self.label.innerText = this.innerText; // Zmiana tekstu w liście dropdown na wybraną opcję
				self.listPanel.classList.remove('opened'); // zamknięcie listy dropdown po wybraniu opcji
				self.nameColumn[number].innerText = this.innerHTML; // wpisanie do kolumny podsumowania nazwy wybranej opcji
                self.priceColumn[number].innerText = this.dataset.price; // wpisanie do kolumny podsumowania ceny wybranej opcji
                calculator(); // wywołanie funkcji kalkulatora
			});
		}
	};

    // metoda dla wyboru zamówienia - wybór transportu
	DropdownSelect.prototype.selectTransport = function() {
		var self = this;
		this.transport.addEventListener('change', function(e) {
			if (self.transport.checked == true) {
				self.summaryTransportName.innerText = 'Transport';
				self.summaryTransportValue.innerText = this.dataset.transportPrice;
			} else {
				self.summaryTransportName.innerText = '';
				self.summaryTransportValue.innerText = '';
            }
            calculator(); // wywołanie funkcji kalkulatora po zaznaczeniu checkboxa
		});
	};

	var dropdownType = new DropdownSelect('.chair-type', 0);
	var dropdownColor = new DropdownSelect('.chair-color', 1);
	var dropdownTextile = new DropdownSelect('.chair-textile', 2);
});
