

let common = {

};

  //设置百叶窗背景
common.initWindowShades = function () {
        $("#main").before('<canvas class="cavs" width="1536" height="735"></canvas>');
        var htmlPd =             '<div id="templatemo_banner_slide" class="container_wapper">'+
                                 '  <div class="camera_wrap camera_emboss" id="camera_slide">'+
                                 '    <!-- 背景图片 -->'+
                                 '    <div data-src="/login/banner_slide_01.jpg"></div>'+
                                 '    <div data-src="/login/banner_slide_02.jpg"></div>'+
                                 '    <div data-src="/login/banner_slide_03.jpg"></div>'+
                                 '    <div data-src="/login/banner_slide_04.jpg"></div>'+
                                 '    <div data-src="/login/banner_slide_05.jpg"></div>'+
                                 '  </div>'+
                                 '</div>'+
                               //  '<script src="/login/jquery-1.7.2.js"></script>'+
                                 '<script src="/login/camera.min.js"></script>'+
                                 '<script src="/login/windowShades.js"></script>';
        $("body").append(htmlPd);
        //设置百叶窗背景
        var height = $("#main").height();
        $("#templatemo_banner_slide").css("margin-top","-"+height+"px");
        $(window).resize(function(){
            var height = $("#main").height();
            $("#templatemo_banner_slide").css("margin-top","-"+height+"px");
        });
};


export default common;
