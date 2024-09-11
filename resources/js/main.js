$(function() {
    let n = 0;  // 섹션 번호
    let pos = 0;  // 스크롤 위치
    let tabCheck = false;  // 탭 
    let lastScrollTop = 0; // 스크롤 방향
    let slideN = 0;  // 슬라이드 인덱스

    $(".keyvisual li").eq(n).addClass("active");
    $(".page_controller").addClass("active");

    // 마우스 휠 이벤트
    $("body").mousewheel(function(e, delta) {
        if($("html").is(":animated")) return;

        if(delta > 0) { // 위로 스크롤
            if(n > 0) {
                n = n - 1;    
            }
        } else { // 아래로 스크롤
            if(n < 7) {
                n = n + 1;
            }
        }

        let h = $(window).height();
        pos = n * h;

        if(n == 0) {
            $(".menu_zone").removeClass("fixed");
        } else {
            $(".menu_zone").addClass("fixed");
        }
    });

    // 메뉴 오버
    $(".menu_zone").mouseenter(function() {
        $(".menu_zone").addClass("over");
    });
    $(".menu_zone").mouseleave(function() {
        $(".menu_zone").removeClass("over");
    });

    // 스크롤 고정
    $(window).on("scroll", function() {
        let currentScroll = $(this).scrollTop();

        // 헤더일 때 보이게하기
        if (currentScroll === 0) {
            $(".menu_zone").removeClass("fixed").css("top", "0");
        } 
        // 아래로 스크롤할 때
        else if (currentScroll > lastScrollTop) {
            $(".menu_zone").addClass("fixed").css("top", "0");
        } 
        // 위로 스크롤할 때
        else {
            $(".menu_zone").removeClass("fixed").css("top", "-100px");
        }

        lastScrollTop = currentScroll; // 마지막 스크롤 위치 업데이트
    });

    // 메인페이지 
    $(".keyvisual li").eq(slideN).addClass("active");
    $(".controller li").eq(slideN).addClass("on");

    $(".controller li").click(function(e) {
        e.preventDefault();
        slideN = $(this).index();

        $(".controller li").removeClass("on");
        $(".controller li").eq(slideN).addClass("on");
        $(".keyvisual li").removeClass("active");
        $(".keyvisual li").eq(slideN).addClass("active");
    });


    // 모바일 탭
    $("header .tab").on("click", function() {
        if (!tabCheck) {
            $(this).addClass("active");
            $(".mobile").fadeIn();  // 모바일 메뉴 표시
            $("body").addClass("fixed");
            tabCheck = true;
        } else {
            $(this).removeClass("active");
            $(".mobile").fadeOut();  // 모바일 메뉴 숨김
            $("body").removeClass("fixed");
            tabCheck = false;
        }
    });

    // 리사이즈
    $(window).on("resize", function() {
        let winw = $(window).width();

        if (winw > 1000 && tabCheck) {
            $("header .tab").removeClass("active");
            $(".mobile").fadeOut(); 
            $("body").removeClass("fixed");
            tabCheck = false;
        }
    });

    // AOS
    AOS.init({
        easing: "ease-in-out-sine",
        once: true
    });
});
