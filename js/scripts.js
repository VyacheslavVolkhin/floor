


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


	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})


	


	//frm-field-select and filter
	$('.frm-field-select .btn-action-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').parents('.frm-field-select').find('.field-hidden-wrap').slideUp(200);
		} else {
			$(this).addClass('active').parents('.frm-field-select').find('.field-hidden-wrap').slideDown(200);
		}
		return false;
	})
	$('.frm-field-filter .btn-action-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').parents('.frm-field-filter').find('.field-hidden-wrap').slideUp(200);
		} else {
			$(this).addClass('active').parents('.frm-field-filter').find('.field-hidden-wrap').slideDown(200);
		}
		return false;
	})
	$('.btn-filter-section-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').parents('.filter-section-wrap').find('.filter-section-content').slideUp(200);
		} else {
			$(this).addClass('active').parents('.filter-section-wrap').find('.filter-section-content').slideDown(200);
		}
		return false;
	})
	$('.js-btn-filter-toggle').on('click', function() {
		$('.popup-filter-wrap .js-btn-popup-toggle').addClass('active');
		$('body').addClass('filter-show');
		return false;
	})


	//mobile menu
	$('.footer .menu-inner-wrap li .submenu-wrap').each(function() {
		$(this).parent().addClass('submenu');
	})
	$('.footer .menu-inner-wrap li a').on('click', function() {
		if ($(this).next('.submenu-wrap').length>0) {
			if ($(window).innerWidth()<1024) {
				if ($(this).parent().hasClass('open')) {
					$(this).parent().removeClass('open').children('.submenu-wrap').slideUp(200);
				} else {
					$('.footer .menu-inner-wrap li.open').removeClass('open').children('.submenu-wrap').slideUp(200);
					$(this).parent().addClass('open').children('.submenu-wrap').slideDown(200);
				}
				return false;
			}
		}
	})


	//catalog-menu mobile
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

	//catalog menu-desktop
	$('.catalog-menu-wrap>.menu>li').hover(function() {
		$(this).parents('.catalog-inner-wrap').addClass('menu-hovered');
	}, function() {
		$(this).parents('.catalog-inner-wrap').removeClass('menu-hovered');
	})


	//header fixed
	if (!!$('.header-main-panel').offset()) {
		let stickyTop = $('.header-main-panel').offset().top;
		$(window).scroll(function(){
			let windowTop = $(window).scrollTop();
			if (stickyTop < windowTop){
				$('.wrap').addClass('header-fixed');
			}
			else {
				$('.wrap').removeClass('header-fixed');
			}
		});
	}

	//filter fixed
	if (!!$('.list-fixed-box').offset()) {
		let filterTop = $('.list-fixed-box').offset().top;
		$(window).scroll(function(){
			let filterTopFixed = $('.header-main-panel').outerHeight();
			let filterWindowTop = $(window).scrollTop();
			$('.filter-box').css('top', filterTopFixed + $('.list-fixed-box').outerHeight() + 24)
			if (filterTop < (filterWindowTop + filterTopFixed)){
				$('.wrap').addClass('filter-fixed');
			}
			else {
				$('.wrap').removeClass('filter-fixed');
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
			fade: true,
			cssEase: 'linear',
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


	//main-tiles-box
	if (!!$('.main-tiles-box').offset()) {
		$('.main-tiles-box .slider').slick({
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
			prevArrow: '<span class="btn-action-ico btn button-ico-large button-second ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico btn button-ico-large button-second ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: false,
						nextArrow: false,
						dots: true
					}
				},
			]
		});
		
	}

	//tiles-box
	if (!!$('.tiles-box').offset()) {
		if ($(window).innerWidth() < 1024) {
			$('.tiles-box .slider').slick({
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				touchThreshold: 100,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
						}
					},
				]
			});
		}
	}

	//catalog-slider-box
	if (!!$('.catalog-slider-box').offset()) {
		$('.catalog-slider-box .slider').slick({
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: false,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						dots: true,
						prevArrow: false,
						nextArrow: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						dots: true,
						prevArrow: false,
						nextArrow: false
					}
				},
			]
		});
		
	}

	//partners-slider-box
	if (!!$('.partners-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.partners-slider-box .slider').slick({
				dots: false,
				slidesToShow: 6,
				slidesToScroll: 1,
				touchThreshold: 100,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-next"></span>',
			});
		}
	}

	//gallery-slider-box
	if (!!$('.gallery-slider-box').offset()) {
		$('.gallery-slider-box .slider').slick({
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: false,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico btn button-light ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						dots: true,
						variableWidth: true,
						prevArrow: false,
						nextArrow: false,
					}
				},
			]
		});
		
	}


	//delivery-info-box
	if (!!$('.delivery-info-box').offset()) {
		$('.delivery-info-box .slider').slick({
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
			prevArrow: '<span class="btn-action-ico btn button-second ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico btn button-second ico-arrow ico-arrow-next"></span>',
		});
		
	}

	// fancybox slick slider
	let selector = '.gallery-slider-box .slick-slide:not(.slick-cloned) a';
	$(".gallery-slider-box [data-fancybox^=slider-gallery-]").fancybox({
		selector : selector,
		hash: false,
		backFocus : false,
		animationEffect : "fade",
			thumbs: {
			autoStart: false
			},
			buttons: [
				'slideShow',
				'fullScreen',
				'close'
			]
	} );

	
	//#range-slider
	if (!!$('#range-slider').offset()) {
		$('#range-slider').slider({
			range: true,
			min: 0,
			max: 25000,
			values: [4999, 15999],
			slide: function (event, ui) {
				$('#range-slider-min').val(ui.values[0]);
				$('#range-slider-max').val(ui.values[1]);
				if ($('#range-slider-min').val() > 0.6) {
					$('#range-slider-min').addClass('active')
				} else {
					$('#range-slider-min').removeClass('active')
				}
				if ($('#range-slider-max').val() < 1) {
					$('#range-slider-max').addClass('active')
				} else {
					$('#range-slider-max').removeClass('active')
				}
			}
		})
		$('#range-slider-min').change(function() {
			if ($('#range-slider-min').val() > 1) {
				$('#range-slider-min').addClass('active')
			} else {
				$('#range-slider-min').removeClass('active')
			}
		})
		$('#range-slider-max').change(function() {
			if ($('#range-slider-max').val() < 25000) {
				$('#range-slider-max').addClass('active')
			} else {
				$('#range-slider-max').removeClass('active')
			}
		})
		$('#range-slider-min').val($('#range-slider').slider('values', 0));
		$('#range-slider-max').val($('#range-slider').slider('values', 1));
		$('#range-slider-min').bind('focusout', function () {
			if ($(this).val() > $('#range-slider').slider('values', 1)) {
				$(this).val($('#range-slider').slider('values', 0));
			}
			$('#range-slider').slider('values', 0, $(this).val());
		})
		$('#range-slider-max').bind('focusout', function () {
			if ($(this).val() < $('#range-slider').slider('values', 0)) {
				$(this).val($('#range-slider').slider('values', 1));
			}
			$('#range-slider').slider('values', 1, $(this).val());
		})
		$('#range-slider-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range-slider').slider('values', 1)) {
					$(this).val($('#range-slider').slider('values', 0));
				}
				$('#range-slider').slider('values', 0, $(this).val());
			}
		})
		$('#range-slider-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range-slider').slider('values', 0)) {
					$(this).val($('#range-slider').slider('values', 1));
				}
				$('#range-slider').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	
});