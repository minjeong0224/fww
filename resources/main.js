$(function(){
	let n=0;
	let pos=0;
	let resizeTimer;
	let timer;
	let dragn = 0; // 혹은 필요한 초기 값으로 설정


	$(".keyvisual li").eq(n).addClass("active");
	$(".page_controller").addClass("active");

	$(window).resize(function(){
		clearTimeout(resizeTimer);

		resizeTimer=setTimeout(function(){
			h=$(window).height();
			pos=n*h;
			$("html").stop().animate({"scrollTop":pos}, 500);
		}, 100);
	});
	$(window).trigger("resize");

	$("body").mousewheel(function(e, delta){
		if($("html").is(":animated")) return;

		if(delta > 0){
			if(n > 0){
				n=n-1;
			}
		}
		else{
			if(n < 7){
				n=n+1;
			}
		}

		h=$(window).height();
		pos=n*h;

		if(n == 0){
			$(".menu_zone").removeClass("fixed");
			$(".page_controller").addClass("active");
		}
		else{
			$(".menu_zone").addClass("fixed");
			$(".page_controller").removeClass("active");

			if(n == 3){
				$(".page_controller").addClass("color");
			}
			else if(n == 7){
				$(".page_controller").addClass("color");
			}
			else{
				$(".page_controller").removeClass("color");
			}
		}

		$("html").stop().animate({"scrollTop":pos}, 500, function(){
			$(".page_controller li").removeClass("active");
			$(".page_controller li").eq(n-1).addClass("active");
			$("div[id^=page]").removeClass("active");
			$(".page"+n).addClass("active");
		});
	});

	$(".menu_zone").mouseenter(function(){
		$(".menu_zone").addClass("over");
	});
	$(".menu_zone").mouseleave(function(){
		$(".menu_zone").removeClass("over");
	});
	$(".show li").mouseenter(function(){
		$(this).addClass("over");
	});
	$(".show li").mouseleave(function(){
		$(".show li").removeClass("over");
	});
	$(".page_controller li").mouseenter(function(){
		$(this).addClass("over");
	});
	$(".page_controller li").mouseleave(function(){
		$(".page_controller li").removeClass("over");
	});
	$(".rental li").mouseenter(function(){
		$(this).addClass("over");
	});
	$(".rental li").mouseleave(function(){
		$(".rental li").removeClass("over");
	});
	$(".top_btn").mouseenter(function(){
		$(this).addClass("over");
	});
	$(".top_btn").mouseleave(function(){
		$(this).removeClass("over");
	});

	let slideN=0;

	$(".keyvisual li").eq(slideN).addClass("active");
	$(".controller li").eq(slideN).addClass("on");

	$(".controller li").click(function(e){
		e.preventDefault();
		slideN=$(this).index();

		$(".controller li").removeClass("on");
		$(".controller li").eq(slideN).addClass("on");
		$(".keyvisual li").removeClass("active");
		$(".keyvisual li").eq(slideN).addClass("active");
	});

	$(".main_scroll").click(function(){
		if($("html").is(":animated")) return;

		n=1;
		pos=n*h;

		$(".menu_zone").addClass("fixed");
		$(".page_controller").removeClass("active");
		$(".page"+n).addClass("active");

		$("html").animate({"scrollTop":pos}, 500, function(){
			$(".page_controller li").removeClass("active");
			$(".page_controller li").eq(n-1).addClass("active");
		});
	});

	$(".top_btn").click(function(e){
		e.preventDefault();
		n=0;
		$("html").animate({"scrollTop":0}, 500);
	});

// pc_drag

	let pcxDown;
	let  pcyDown;
	let down=false;
	let  pcdirection="";
	let  pcdragn=0;
	let  pctotal=6;
	let  pcpos=0;
	let  pcmoving=false;
	let  pctimer;
	let  pcdistance;

	$(".btns .right_btn").addClass("active");
	$(".page3_back").addClass("case0");
	$(".page3_front").addClass("case0");

	$(window).resize(function(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			distance=$(".page_content > ul > li").width();
			pos=distance*(-1)*dragn;
			$(".page_content").animate({left:pos}, 200);
		}, 50);
	});
	$(window).trigger("resize");

	$(".page_content").mousedown(function(e){
		down=true;
		xDown=e.clientX;
		yDown=e.clientY;
		// console.log(xDown+" : "+yDown);
	});
	$(".page3 .inner").mouseup(function(){
		down=false;
		moving=false;
	});
	$(".page3 .inner").mouseleave(function(){
		down=false;
		moving=false;
	});
	$(".page_content").mousemove(function(e){
		if($(".page_content").is(":animated") || $(".page3_front").is(":animated")) return;

		if(down == false) return;

		if(moving == true) return;
		moving=true;

		direction=swipeAPI(e, xDown, yDown);
		// console.log("direction : "+direction);

		if(direction == "right"){
			if(dragn > 0){
				dragn-=1;
			}
			else{
				return;
			}
		}
		else if(direction == "left"){
			if(dragn < (total-1)){
				dragn+=1;
			}
			else{
				return;
			}
		}
		dragUI(dragn);
	});
	$(".btns li").click(function(){
		if($(".page_content").is(":animated") || $(".page3_front").is(":animated")) return;

		if(moving == true) return;
		moving=true;

		if($(this).index() == 0){
			if(dragn > 0){
				dragn=dragn-1;
			}
		}
		else{
			if(dragn < (total-1)){
				dragn=dragn+1;
			}
		}
		dragUI(dragn);
	});
	function dragUI(n){
		pos=distance*(-1)*n;

		$(".page_content").animate({left:pos}, 400, function(){
			if(n == 0){
				$(".btns .left_btn").removeClass("active");
				$(".btns .right_btn").addClass("active");
			}
			else if(n == (total-1)){
				$(".btns .left_btn").addClass("active");
				$(".btns .right_btn").removeClass("active");
			}
			else{
				$(".btns .left_btn").addClass("active");
				$(".btns .right_btn").addClass("active");
			}

			$(".page3_front").attr({class:"page3_front case"+n});

			$(".page3_front").fadeIn(600, function(){
				moving=false;
				$(".page3_back").attr({class: "page3_back case" +n});
				$(".page3_front").hide();
			});
		});
	}
	function swipeAPI(evt, xd, yd){
		let moveDirection="";
		let xUp=evt.clientX;
		let yUp=evt.clientY;
		let xDiff=xd-xUp;
		let yDiff=yd-yUp;

		if(Math.abs(xDiff) > Math.abs(yDiff)){
			if(xDiff > 0){
				moveDirection="left";
			}
			else{
				moveDirection="right";
			}
		}
		else{
			if(yDiff > 0){
				moveDirection="up"
			}
			else{
				moveDirection="down";
			}
		}
		return moveDirection;
	}

// sec3 slide

	let swiper = new Swiper(".mySwiper", {
		direction: "vertical",
		slidesPerView: 1,
		spaceBetween: 30,
		mousewheel: true,
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
	});






	// mobile_drag

	let mobilexDown;
	let mobileyDown;
	let mobiledirection="";
	let mobiledragn=0;
	let mobiletotal=6;
	let mobilepos=0;
	let mobilemoving=false;
	let mobiletimer;
	let mobiledistance;

	$(".btns .right_btn").addClass("active");
	$(".page3_back").addClass("case0");
	$(".page3_front").addClass("case0");

	$(window).resize(function(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			distance=$(".page_content > ul > li").width();
			pos=distance*(-1)*dragn;
			$(".page_content").animate({left:pos}, 200);
		}, 50);
	});
	$(window).trigger("resize");

	$(".page_content").on("touchstart", function(e){
		let evt=e.originalEvent;
		xDown=evt.touches[0].clientX;
		yDown=evt.touches[0].clientY;
		// console.log(xDown+" : "+yDown);
	});
	$(".page_content").on("touchmove", function(e){
		let evt=e.originalEvent;

		if(moving == true) return;

		direction=swipeAPI(evt, xDown, yDown);
		// console.log("direction : "+direction);

		if(direction == "right"){
			if(dragn > 0){
				dragn-=1;
			}
			else{
				return;
			}
		}
		else if(direction == "left"){
			if(dragn < (total-1)){
				dragn+=1;
			}
			else{
				return;
			}
		}
		moving=true;
		dragUI(dragn);
	});
	$(".btns li").click(function(){
		if(moving == true) return;
		moving=true;

		if($(this).index() == 0){
			if(dragn > 0){
				dragn=dragn-1;
			}
		}
		else{
			if(dragn < (total-1)){
				dragn=dragn+1;
			}
		}
		dragUI(dragn);
	});
	function dragUI(n){
		pos=distance*(-1)*n;

		$(".page_content").animate({left:pos}, 400, function(){
			if(n == 0){
				$(".btns .left_btn").removeClass("active");
				$(".btns .right_btn").addClass("active");
			}
			else if(n == (total-1)){
				$(".btns .left_btn").addClass("active");
				$(".btns .right_btn").removeClass("active");
			}
			else{
				$(".btns .left_btn").addClass("active");
				$(".btns .right_btn").addClass("active");
			}

			$(".page3_front").attr({class:"page3_front case"+n});

			$(".page3_front").fadeIn(600, function(){
				moving=false;
				$(".page3_back").attr({class: "page3_back case" +n});
				$(".page3_front").hide();
			});
		});
	}
	function swipeAPI(evt, xd, yd){
		let moveDirection="";
		let xUp=evt.touches[0].clientX;
		let yUp=evt.touches[0].clientY;
		let xDiff=xd-xUp;
		let yDiff=yd-yUp;

		if(Math.abs(xDiff) > Math.abs(yDiff)){
			if(xDiff > 0){
				moveDirection="left";
			}
			else{
				moveDirection="right";
			}
		}
		else{
			if(yDiff > 0){
				moveDirection="up"
			}
			else{
				moveDirection="down";
			}
		}
		return moveDirection;
	}
	
	AOS.init({
		easing: "ease-in-out-sine",
		once: true
	});



// let documentBody = document.querySelector('body')

// let mySwiper = new Swiper ('.swiper-container', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: false,
//     mousewheel: true,
//     // sensitivity: 0.1,
//     keyboard: true,
//     releaseOnEdges: true,
//     on: {
// 		reachEnd: function () {
// 			documentBody.setAttribute("style", "overflow: auto;");
// 		},
// 	},

// 	});
});
