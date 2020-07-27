import $ from 'jquery'

window.jQuery = $;
window.$ = $;

import MaskInput from 'mask-input';
import 'select2';
import Swiper from '../../node_modules/swiper/swiper-bundle.min';

/*
ON LOAD PAGE FUNCTION
*/

jQuery(window).on('load', function () {

    $('body').removeClass('is-load');

});

/*
INITIALIZATION FUNCTIONS
*/

jQuery(document).ready(function ($) {

    const maskInput = new MaskInput(document.querySelector('input[name=phone]'), {
        mask: '+380 00 000 00 00',

        maskChar: '_',
    });

    $('select').select2({
        minimumResultsForSearch: 20,
        placeholder: "Select 1"
    });
    let inputs = $('input'),
        formEl = $('form');

    inputs.on('focus', function () {
        $(this).closest('div').addClass('is-focus')
    })
    inputs.on('change', function () {
        $(this).closest('div').removeClass('is-focus')
    })

    $.each(formEl, function (k, _el) {
        $(_el).on('submit', function (e) {
            e.preventDefault()
            let errors = validateFormFields(this)
            if (errors) return;
        })
    })

    $.each(formEl.find('input'), function () {
        $(this).on('input', function (e) {
            validateSingleField(this)
        })
    })


    $('footer form').on('submit', function () {

        if (!$(this).find('div').hasClass('error')) {
            $('.subscription-popup').addClass('is-active')
            setTimeout(
                submitfooterPopup, 3000);

        }
    })

    // end submit search-form

        //add data attr


            let centerBoxHeader = $(".center-box--header");
            $('.сard-product--content--el-add .comparison').on('click', function (){
                $(this).addClass('is-active')
                let quantityCom =  centerBoxHeader.find(".comparison").attr("data-quantity"),
                    parseQnCom  = parseInt(quantityCom);

                $('.comparison').attr('data-quantity', parseQnCom + 1);

            })

            $('.сard-product--content--el-add .favorites').on('click', function (){
                $(this).addClass('is-active')
                let quantityFav = centerBoxHeader.find(".favorites").attr("data-quantity"),
                    parseQnFav  = parseInt(quantityFav);
                $('.favorites').attr('data-quantity', parseQnFav + 1);
            })


        //end add data attr

    //mobile-menu

    $('.nav-content .burger').on('click', function (){
        $('.top-menu--gray-container').addClass('is-active')
    })
    $('.categories-menu--button .burger').on('click', function (){
        $('.bottom-box--header__categories-menu ul').toggleClass('is-active')
    })
    $('.top-menu--gray-container .close').on('click',function (){
        $('.top-menu--gray-container').removeClass('is-active')
    })

    $('.all-categories').on('click', function (){
        $('.bottom-box--header__search--categories').slideToggle()
    })

    //end mobile-menu



    //all-categories

    $('.reset-form').one('click', function () {
        $(".select2-hidden-accessible").val("").trigger("change");
        $(this).closest('.categories-tabs--container-el').find('form')[0].reset();
    })

    $('.categories__menu').on('click', 'li:not(.is-active)', function () {
        $(this)
            .addClass('is-active')
            .siblings()
            .removeClass('is-active')
            .closest('.bottom-box--header__search--categories')
            .find('.categories-tabs--el')
            .removeClass('is-active')
            .eq($(this).index())
            .addClass('is-active');
    });

    $('.categories-tabs--el__menu').on('click', 'li:not(.is-active)', function () {
        $(this)
            .addClass('is-active')
            .siblings()
            .removeClass('is-active')
            .closest('.categories-tabs--el')
            .find('.categories-tabs--container-el')
            .removeClass('is-active')
            .eq($(this).index())
            .addClass('is-active');
    });


    //end all-categories


    //visible password

    $('body').on('click', '.password-checkbox', function () {
        if ($(this).is(':checked')) {
            $('.password-input').attr('type', 'text');
        } else {
            $('.password-input').attr('type', 'password');
        }
    });
    // end visible password

    // popup

    $('.authorization-el').on('click', function () {
        $('.popup-login-in').addClass('is-active')
    })
    $('.center-box--header__connection span').on('click', function () {
        $('.popup-call').addClass('is-active')
    })


    //comparison

    $('.comparison').on('click', function () {
        $(this)
            .addClass('is-active')
            .promise()
            .done(function (e) {
                e.html((e.hasClass('is-active') ? 'В сравнении' : 'Сравнить товар'))
            });
    })

    // end comparison

    //favorites

    $('.favorites').on('click', function () {
        $(this)
            .addClass('is-active')
            .promise()
            .done(function (e) {
                e.html((e.hasClass('is-active') ? 'В избранном' : 'В избранное'))
            });
    })

    //end favorites


    // swiper slider

    new Swiper('.slider-product--js', {
        slidesPerView: 4,
        spaceBetween: 0,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            620: {
                slidesPerView: 2
            },
            925: {
                slidesPerView: 3
            },
            1210: {
                slidesPerView: 4
            }
        }
    })

    //end swiper slider

});

/*
ON SCROLL PAGE FUNCTIONS
*/

jQuery(window).on('scroll', function () {


});

$(document).mouseup(function (e){
    let popup1 = $(".popup-login-in > .login-in--content"),
        popup2 = $(".popup-call > .login-in--content");

    if (!popup1.is(e.target)
        && popup1.has(e.target).length === 0) {
        $(".popup-login-in ").removeClass('is-active');
    }
    if (!popup2.is(e.target)
        && popup2.has(e.target).length === 0) {
        $(".popup-call").removeClass('is-active');
    }
});


function validateFormFields(form) {
    let _ = $(form),
        error = false;

    $.each(_.find('input'), function (key, el) {
        error = validateSingleField(el);
    });
    return error;
}

function validateSingleField(el) {
    let _el = $(el),
        _ln = _el.val().length,
        _nm = _el.attr('name'),
        _vl = _el.val(),
        error = false,

        _emValPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    _el.closest('div').removeClass('error');
    switch (_nm) {
        case 'name':
            if (_ln < 2) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'search':
            if (_ln < 2) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'password':
            if (_ln < 4) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'login':
            if (_ln < 4) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'quantityFrom':
            if (_vl < 0) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'upTo':
            if (_vl > 250000) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'email':
            if (!_emValPattern.test(_vl) || !_ln) {
                _el.closest('div').addClass('error');
                error = true;
            } else {
                _el.closest('div').removeClass('error');
            }
            break;
        case 'phone':
            if (_ln < 17) {

                _el.closest('div').addClass('error')

                error = true;
            }
            break;
        default:
            error = false;

    }
    return error;
}

function submitfooterPopup() {
    $('.subscription-popup').removeClass('is-active')
}
