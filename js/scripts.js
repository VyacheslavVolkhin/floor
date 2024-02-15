


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.site-menu-wrap')) {
				document.body.classList.add('menu-show')
				window.scrollTo({top: 0, behavior: 'smooth'});
				e.preventDefault()
				e.stopPropagation()
			}
			if (this.closest('.catalog-inner-wrap')) {
				document.body.classList.add('menu-show')
				window.scrollTo({top: 0, behavior: 'smooth'});
				//let catTop = document.querySelector('.catalog-content-block').getBoundingClientRect().y
				let catTop = document.querySelector('.header').clientHeight
				document.querySelector('.catalog-content-block').style.top = Math.round(catTop) + 'px'
				e.preventDefault()
				e.stopPropagation()
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.querySelector('.button-title').innerHTML = ''
			popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.querySelector('.button-title').innerHTML = ''
				popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})

//select style
if (document.querySelector(".form-select")) {
	NiceSelect.bind(document.querySelector(".form-select"), {
		searchable: false, 
		placeholder: 'Выберите', 
		searchtext: 'zoek', 
		selectedtext: 'geselecteerd'
	});
}


//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0;i < tglButtons.length;i++) {
	tglButtons[i].addEventListener('click', function(e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
$(document).ready(function(){


	//catalog-menu-mobile
	$('.catalog-inner-wrap .btn-menu').on('click', function() {
		if ($(window).innerWidth() < 1024) {
			$(this).next('.catalog-submenu-outer-wrap').addClass('mobile-active');
			return false;
		}
	})
	$('.catalog-submenu-back .btn-action-back').on('click', function() {
		$('.catalog-submenu-outer-wrap.mobile-active').removeClass('mobile-active');
		return false
	})


	//header fixed
	if (!!$('.header-main-panel').offset()) {
		let stickyTop = $('.header-main-panel').offset().top;
		$(window).scroll(function(){
			var windowTop = $(window).scrollTop();
			if (stickyTop < windowTop){
				$('.wrap').addClass('header-fixed');
			}
			else {
				$('.wrap').removeClass('header-fixed');
			}
		});
	}
	
	
	//items-slider-box
	if (!!$('.items-slider-box').offset()) {
		$('.items-slider-box .slider').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: false,
						nextArrow: false,
					}
				},
			]
		});
		
	}
	if (!!$('.item-tile-catalog').offset()) {
		$('.item-tile-catalog .tile-slider').slick({
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: false,
			nextArrow: false,
		});
		
	}
	//item-tile-catalog
	$('.item-tile-catalog .tile-button-info .btn').on('click', function() {
		if ($(window).innerWidth() < 1024) {
			if ($(this).hasClass('active')) {
				$(this).parents('.item-tile-catalog').removeClass('active');
				$(this).removeClass('active');
				$(this).parents('.item-tile-catalog').find('.tile-delivery-info-wrap').slideDown(200);
				$(this).parents('.item-tile-catalog').find('.tile-photo-wrap').slideDown(200);
				$(this).parents('.item-tile-catalog').find('.tile-features-wrap').slideUp(200);
				$(this).parents('.item-tile-catalog').find('.tile-colors-wrap').slideUp(200);
			} else {
				$(this).parents('.item-tile-catalog').addClass('active');
				$(this).addClass('active');
				$(this).parents('.item-tile-catalog').find('.tile-delivery-info-wrap').slideUp(200);
				$(this).parents('.item-tile-catalog').find('.tile-photo-wrap').slideUp(200);
				$(this).parents('.item-tile-catalog').find('.tile-features-wrap').slideDown(200);
				$(this).parents('.item-tile-catalog').find('.tile-colors-wrap').slideDown(200);
			}
		}
		return false;
	})


	//catalog-slider-wrap
	if (!!$('.header .catalog-slider-wrap').offset()) {
		$('.header .catalog-slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn button-gray-light btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn button-gray-light btn-action-ico ico-arrow ico-arrow-next"></span>',
		});
		
	}


	//menu more
	$('.catalog-submenu-section-more a').on('click', function() {
		$(this).parents('.catalog-submenu-section').toggleClass('show-all');
		return false;
	})
});