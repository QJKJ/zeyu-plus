//zhouzeyu
jQuery(function(){
    $ = jQuery ;
    //templatemo_banner_slide camera function
    $('#templatemo_banner_slide > div').camera({
        height: 'auto',
        loader: 'bar',
        playPause: false,
        pagination: false,
        thumbnails: false,
        hover: false,
        opacityOnGrid: false,
        imagePath: 'images/'
    });
    //banner slider height window height
    //(top banner height + logo height + main menu height )

    changebg();

    //banner slider caption margin top
    //(window height - (top banner height + logo height + main menu height ) - caption height ) / 2
    banner_h1_margin_top = (($(window).height()-280) - 285)/2;
    $(".camera_caption h1").css("marginTop",banner_h1_margin_top);
    $(window).resize(function(){
        banner_h1_margin_top = (($(window).height()-280) - 285)/2;
        $(".camera_caption h1").css("marginTop",banner_h1_margin_top);
    });
    //mobile menu and desktop menu
    hide_left = $(document).width();
    $("#mobile_menu").css({left: hide_left});
    $("#mobile_menu").hide();
    $("#mobile_menu_btn a").click(function(){
        if($('#mobile_menu').is(':visible')) {
            hide_left = $(document).width();
            $("#mobile_menu").animate({left: hide_left},1000,function(){
                $("#mobile_menu").hide();
            });
        }else{
            $("#mobile_menu").show();
            show_left = $(document).width() - 250 ;
            $("#mobile_menu").animate({left: show_left},1000);
        }
        return false;
    });
    jQuery.fn.anchorAnimate = function(settings) {
        settings = jQuery.extend({
            speed : 1100
        }, settings);
        return this.each(function(){
            var caller = this
            $(caller).click(function (event){
                event.preventDefault();
                var locationHref = window.location.href;
                var elementClick = $(caller).attr("href");
                var destination = $(elementClick).offset().top ;
                $("#menu_mobile_list").fadeOut() ;
                $("html,body").stop().animate({ scrollTop: destination}, settings.speed, function(){
                    // Detect if pushState is available
                    if(history.pushState) {
                        history.pushState(null, null, elementClick);
                    }
                });
                return false;
            });
        });
    }
    //animate scroll function calll
    $("#mobile_menu a").anchorAnimate();
    //main menu auto select and animate scroll
    //define main menu position
    if($(document).scrollTop() > ($(window).height()-105)){
        $("#templatemo_main_menu").css({"position":"fixed","top":"0"});
    }else{
        menu_top = $(window).height() - 105;
        $("#templatemo_main_menu").css({"position":"absolute","top":menu_top});
    }
    $(window).scroll(function(){
        if($(this).scrollTop() > ($(this).height()-105)){
            $("#templatemo_main_menu").css({"position":"fixed","top":"0"});
        }else{
            menu_top = $(this).height() - 105;
            $("#templatemo_main_menu").css({"position":"absolute","top":menu_top});
        }
    });
    $(window).resize(function(){
        if($(this).scrollTop() > ($(this).height()-105)){
            $("#templatemo_main_menu").css({"position":"fixed","top":"0"});
        }else{
            menu_top = $(this).height() - 105;
            $("#templatemo_main_menu").css({"position":"absolute","top":menu_top});
        }
    });


    //event
    $(document).scroll(function(){
		return false;
        document_top = $(document).scrollTop();
        event_wapper_top = $("#templatemo_upcomming_event").position().top;
        if(document_top<event_wapper_top){
            event_animate_num = event_wapper_top - document_top;
            event_animate_alpha = (1/event_wapper_top)*(document_top);
            $("#templatemo_upcomming_event .event_animate_left").css({'left': -event_animate_num,'opacity':event_animate_alpha});
            $("#templatemo_upcomming_event .event_animate_right").css({'left':event_animate_num,'opacity':event_animate_alpha});
        }else{
            $("#templatemo_upcomming_event .event_animate_left").css({'left': 0,'opacity':1});
            $("#templatemo_upcomming_event .event_animate_right").css({'left':0,'opacity':1});
        }

    });
    //pricing
    $(document).scroll(function(){
		return false;
        document_top = $(document).scrollTop()-1000;
        event_wapper_top = $("#templatemo_pricing").position().top-1110;
        if(document_top<event_wapper_top){
            degree = (360/event_wapper_top)*(document_top);
            event_animate_num = event_wapper_top - document_top;
            event_animate_alpha = (1/event_wapper_top)*(document_top);
            $("#templatemo_pricing .pricing_icon_wapper span").css({
                        '-webkit-transform': 'rotate(' + degree + 'deg)',
                        '-moz-transform': 'rotate(' + degree + 'deg)',
                        '-ms-transform': 'rotate(' + degree + 'deg)',
                        '-o-transform': 'rotate(' + degree + 'deg)',
                        'transform': 'rotate(' + degree + 'deg)',
            });
            $("#templatemo_pricing .pricing_icon_wapper").css({
                        'opacity':event_animate_alpha
            });
        }else{
            $("#templatemo_pricing .pricing_icon_wapper span").css({
                        '-webkit-transform': 'rotate(' + 360 + 'deg)',
                        '-moz-transform': 'rotate(' + 360 + 'deg)',
                        '-ms-transform': 'rotate(' + 360 + 'deg)',
                        '-o-transform': 'rotate(' + 360 + 'deg)',
                        'transform': 'rotate(' + 360 + 'deg)',
            });
            $("#templatemo_pricing .pricing_icon_wapper").css({
                        'opacity':1
            });
        }
    });
    //blog
    $(document).scroll(function(){
		return false;
        document_top = $(document).scrollTop()-2000;
        event_wapper_top = $("#templatemo_blog").position().top-2110;
        if(document_top<event_wapper_top){
            event_animate_num = event_wapper_top - document_top;
            event_animate_alpha = (1/event_wapper_top)*(document_top);
            $("#templatemo_blog .event_animate_left").css({'left': -event_animate_num,'opacity':event_animate_alpha});
            $("#templatemo_blog .event_animate_right").css({'left':event_animate_num,'opacity':event_animate_alpha});
        }else{
            $("#templatemo_blog .event_animate_left").css({'left': 0,'opacity':1});
            $("#templatemo_blog .event_animate_right").css({'left':0,'opacity':1});
        }
    });
    //contact
    $(document).scroll(function(){
		return false;
        document_top = $(document).scrollTop()-3000;
        event_wapper_top = $("#templatemo_contact").position().top-3110;
        if(document_top<event_wapper_top){
            event_animate_alpha = (1/event_wapper_top)*(document_top);
            $("#templatemo_contact p, #templatemo_contact_map_wapper").css({'opacity':event_animate_alpha});
        }else{
            $("#templatemo_contact p, #templatemo_contact_map_wapper").css({'opacity':1});
        }
    });

});



//google map
function initialize(){
    //define map
    var map;
    //lat lng
    myLatlng = new google.maps.LatLng(16.800000, 96.150000);
    //define style
    var styles = [
        {
            //set all color
            featureType: "all",
            stylers: [{ hue: "#35a9d8" }]
        },
        {
            //hide business
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];
    //map options
    var mapOptions = {
        zoom: 14,
        center: myLatlng ,
        mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']} ,
        panControl: false , //hide panControl
        zoomControl: false , //hide zoomControl
        mapTypeControl: false , //hide mapTypeControl
        scaleControl: false , //hide scaleControl
        streetViewControl: false , //hide streetViewControl
        overviewMapControl: false , //hide overviewMapControl
    }
    //adding attribute value
    map = new google.maps.Map(document.getElementById('templatemo_contact_map'), mapOptions);
    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    //add marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Welcome to Yangon'
    });
}

function changebg(){
    banner_slider_height = $(window).outerHeight()-285;

	var bheight = document.documentElement.clientHeight;
	if(bheight == 0){bheight = 1000;}
    banner_slider_height = (banner_slider_height<bheight) ? bheight : banner_slider_height;
    $("#templatemo_banner_slide > div").height(banner_slider_height);
    $("#templatemo_banner_slide").height(banner_slider_height);
    $(window).resize(function(){
        banner_slider_height = $(window).outerHeight()-285;
        banner_slider_height = (banner_slider_height<bheight) ? bheight : banner_slider_height;
        $("#templatemo_banner_slide > div").height(banner_slider_height);
        $("#templatemo_banner_slide").height(banner_slider_height);
    });
}
window.onresize=function(){
	changebg();
}

//ban
try{
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {

    }else{
        $(function(){
  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
  canvas.width = $(window).width();
  canvas.height = $(window).height();
  ctx.lineWidth = .3;
  ctx.strokeStyle = (new Color(150)).style;

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 250,
    distance: 100,
    d_radius: 150,
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }

  function createColorStyle(r,g,b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
  }

  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;

    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }

  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
  }

  Dot.prototype = {
    draw: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI, false);
      ctx.fill();
    }
  };

  function createDots(){
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for(i = 0; i < dots.nb; i++){

      var dot = dots.array[i];

      if(dot.y < 0 || dot.y > canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
      }
      else if(dot.x < 0 || dot.x > canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function connectDots() {
    for(i = 0; i < dots.nb; i++){
      for(j = 0; j < dots.nb; j++){
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
          if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function drawDots() {
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
      dot.draw();
    }
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();

    requestAnimationFrame(animateDots);
  }

  $('canvas').on('mousemove', function(e){
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });

  $('canvas').on('mouseleave', function(e){
    mousePosition.x = canvas.width / 2;
    mousePosition.y = canvas.height / 2;
  });

  createDots();
  requestAnimationFrame(animateDots);
});
    }
}catch(e){}