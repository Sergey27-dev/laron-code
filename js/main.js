$(document).ready(function(){
	const swiper = new Swiper('.main-swiper', {
  		 pagination: {
          el: ".main-swiper-pagination",
          type: "progressbar",
        },
    });
    const swp = new Swiper('.main-swiper', {
      pagination: {
        el:".fraction",
        type: "fraction"
      }
    });
    const brandSwiper = new Swiper(".brand-swiper", {
      pagination: {
        el: ".brand-swiper-pagination"
      }
    });
    const orderingSwiper = new Swiper('.ordering-swiper',{
      pagination: {
        el: ".ordering-pagination"
      }
    });
    const tableSwiper = new Swiper('.table-swiper', {
      pagination: {
        el: ".table-swiper-pagination"
      }
    });

  swiper.on('slideChangeTransitionEnd', function () {
    var currentSlideOf = ($(".swiper-slide-active").attr("aria-label"));
    var current = currentSlideOf[0];
    $('.swiper-pagination-current').text(current);
  });

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });

  $('#submit-btn').click(function(){
    var user_name = $('#name').val();
    var user_message = $('#message').val();
    var user_tel = $('#tel').val();
    var user_email = $('#email').val();

    var error = 0;
    var captcha = grecaptcha.getResponse();
    if (!captcha.length) {
      $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
      $('#recaptchaError').show();
      error++;
    } else {
      $('#recaptchaError').text('');
    }

    $('.full').each(function (i){
      if($(this).val()==""){
        error++;
        $(this).addClass("error");
      }else{
        $(this).removeClass("error");
      }
    });

    if(!$('.custom-checkbox').prop('checked')){
      error++;
      $('#polError').text('* Поле обязательно к заполнению');
    }else {
      $('#polError').text('');
    }

    if(error) {
      return false;
    }

    $.ajax({
      url: "call.php",
      type: "post",
      data: {
        "name" : user_name,
        "message" : user_message,
        "tel" : user_tel,
        "email" : user_email,
        "captcha" : captcha
      },
      beforeSend: function () {
        $('#submit-btn').prop('value', 'Отправка')
      },
      error: function(){
        console.log("error");
      },
      success: function(result) {
        grecaptcha.reset();
        $('#call-back form').css({"display":"none"});
        $('#call-back form').trigger('reset');
        $('#call-back').append('<div class="success">Ваша заявка принята, в ближайшее время c Вами свяжутся</div>')
      }
    });
  });

  $('#submit-order').click(function(){
    var user_name = $('#order #name').val();
    var kol = $('#order #kol').val();
    var user_tel = $('#order #tel').val();
    var user_email = $('#order #email').val();
    var option = $('#order #selectProduct').val();

    var error = 0;
    var captcha = grecaptcha.getResponse(1);
    if (!captcha.length) {
      $('#orderRecaptchaError').text('* Вы не прошли проверку "Я не робот"');
      $('#orderRecaptchaError').show();
      error++;
      grecaptcha.reset();
    } else {
      $('#recaptchaError').text('');
    }

    $('.orderInput').each(function (i){
      if($(this).val()==""){
        error++;
        $(this).addClass("error");
      }else{
        $(this).removeClass("error");
      }
    });

    if(!$('.order-checkbox').prop('checked')){
      error++;
      $('#orderPolError').text('* Поле обязательно к заполнению');
    }else {
      $('#orderPolError').text('');
    }

    if(error) {
      return false;
    }

    $.ajax({
      url: "call.php",
      type: "post",
      data: {
        "name" : user_name,
        "kol" : kol,
        "tel" : user_tel,
        "email" : user_email,
        "captcha" : captcha,
        "option" : option
      },
      beforeSend: function () {
        $('#submit-order').prop('value', 'Отправка');
      },
      error: function(){
        console.log("error");
      },
      success: function(result) {
        $('#order form').css({"display" : "none"});
        $('#order form').trigger('reset');
        $('#order').append("<div class='success'>Ваша заявка отправлена</div>")
        grecaptcha.reset(1);
      }
    });
  });

  $(".start-video").css({
    "top" : $(".video").height()/2 - $(".start-video").width()/2,
    "left" : $(".video").width()/2 - $(".start-video").width()/2
  });

  $(".video2 .start-video").css({
    "top" : $(".video2 > img:nth-child(2)").height()/2 - $(".video2 .start-video").width()/2,
    "left" : $(".video2 > img:nth-child(2)").width()/2 - $(".video2 .start-video").width()/2
  });

  $(window).resize(function (){
    $(".start-video").css({
      "top" : $(".video").height()/2 - $(".start-video").width()/2,
      "left" : $(".video").width()/2 - $(".start-video").width()/2
    });

    $(".video2 .start-video").css({
      "top" : $(".video2 > img:nth-child(2)").height()/2 - $(".video2 .start-video").width()/2,
      "left" : $(".video2 > img:nth-child(2)").width()/2 - $(".video2 .start-video").width()/2
    });
  })

  $("span.privacy-link").click(function (event) {
    event.preventDefault();
    $("#overlay").fadeIn(297, function () {
      $("#privacy")
          .css("display", "block")
          .animate({ opacity: 1 }, 198);
    });
  });

  $("#privacy__close, #overlay").click(function () {
    $("#privacy").animate({ opacity: 0 }, 198, function () {
      $(this).css("display", "none");
      $("#overlay").fadeOut(297);
    });
  });

  $("a.checkout").click(function (event){
    event.preventDefault();
    $("#overlay").fadeIn(297, function () {
      $("#order")
          .css("display", "block")
          .animate({ opacity: 1 }, 198);
    });
    var product = $(this).attr('value');
    $('#selectProduct').val(product);
  });

  $("#privacy__close, #overlay").click(function () {
    $("#order").animate({ opacity: 0 }, 198, function () {
      $(this).css("display", "none");
      $("#overlay").fadeOut(297);
    });
    $("#video-comparison").animate({ opacity: 0 }, 198, function () {
      $(this).css("display", "none");
      frame = document.getElementById("video-comparison").contentWindow
      frame.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');

      $("#overlay").fadeOut(297);
    });
    $("#production-video").animate({ opacity: 0 }, 198, function () {
      $(this).css("display", "none");
      frame = document.getElementById("production-video").contentWindow
      frame.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      $("#overlay").fadeOut(297);
    });
  });

  $(".video").click(function (){
    $("#overlay").fadeIn(297, function () {
      $("#video-comparison").css({
            "display": "block",
            "width" : "80%",
          })
          .animate({ opacity: 1 }, 198);
      $("#video-comparison").css("height" , $("#video-comparison").width()/1.777)
    });
  });
  $(".video2").click(function (){
    $("#overlay").fadeIn(297, function () {
      $("#production-video")
          .css({
            "display": "block",
            "width" : "80%",
          })
          .animate({ opacity: 1 }, 198);
      $("#production-video").css("height" , $("#production-video").width()/1.777)
    });
  });


  $(".video2").click(function (){
    $("#overlay").fadeIn(297, function () {
      $("#production-video")
          .css("display", "block")
          .animate({ opacity: 1 }, 198);
    });
  });

  $(".header-burger").click(function (e) {
      $(".header-burger, nav").toggleClass('active');
  })

  $(document).click(function (e) {
    if (!$("nav").is(e.target) && !$(".header-burger").is(e.target) && !$("nav ul").is(e.target)) {
      if($("nav").hasClass("active"))
      $(".header-burger, nav").toggleClass('active');
    }
  })
});

//Инициализация капч
var onloadCallback = function () {
    const call = grecaptcha.render('call-captcha', {
      'sitekey': '6LcrqlggAAAAAIJnnYHclmoHKS0YawRUomax9WDA'
    });
    const order = grecaptcha.render('order-captcha', {
      'sitekey': '6LcrqlggAAAAAIJnnYHclmoHKS0YawRUomax9WDA'
    });
}





