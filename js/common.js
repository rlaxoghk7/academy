var daram = (function() {
	var language="kor";
	var addr=location.href;
	var getNameFromPath = function(strFilepath) {
		var objRE = new RegExp(/([^\/\\]+)$/);
		var strName = objRE.exec(strFilepath);
		if (strName == null) {
		   return null;
		}
		else {
			return strName[0].split(".")[0];
		}
	}
	var getParameter = function (strParamName){
		 var arrResult = null;
		 if(strParamName){
			 arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
		 }
		 return arrResult && arrResult[1] ? arrResult[1] : null;
	}
	var mod = function (a,b){
		if(a%b < 0) {
			return b+a%b;
		} else {
			return a%b;
		}
	}
	var addZero = function (num) {
		if(num<10){
			return "0"+num;
		} else {
			return num;
		}
	}


	var gnb = function() {
		$("#gnb > .gnbList > li").on("mouseenter",function(e){		
			if($("body").hasClass("pc")){
                $("#gnb > .gnbList > li").removeClass("active");
                $(this).addClass("active");
			}
		})

		$("#header").on("mouseleave",function(e){
			if($("body").hasClass("pc")){
			}
		})

        $("#header .gnbList").on("mouseleave",function(e){
            $("#gnb > .gnbList > li").removeClass("active");
        })

		$("#gnb > .gnbList > li > a").on("click",function(e){		
			if($("body").hasClass("mobile")){
				$(this).siblings(".depth02-wrap").slideToggle();
				e.preventDefault();
				e.stopPropagation();
			} else {
				
			}
		})

        //사이트맵 버튼 클릭 시 토글블라인드
        $(".sitemap-btn").on("click", function() {

        if ($("body").hasClass("pc")) {

                $(".sitemap").toggleClass("blind");
                
            } else {
                
            }
            
        })
        

		$("#header .btnGnbAll").on("click",function(){


			if($("body").hasClass("mobile")){


                $(this).toggleClass("on");
				
				if($(this).hasClass("on")){
					$("#gnb").stop().animate({left:0},"easeOutQuint");
					$("#gnb .depth02").show(); //230809 sic : .depth02 활성화
					$(".cover").fadeIn();
					$("html").addClass("overHidden");
					$("html").on("scroll touchmove mousewheel", function(e){
						e.preventDefault();
						e.stopPropagation();
						return false;
					})

				} else {
					$("#gnb").stop().animate({left:"-100%"},"easeOutQuint",function(){
						$("#gnb .depth02").hide();
					});
					$(".cover").fadeOut();
					$("html").removeClass("overHidden");


				}

			} else {
                

			}

			return false;
		})



	}

    var makeSitemap = function (){
        $(".sitemap").append($("#gnb .gnbList").clone());

    }

	var makeSubTitle = function (subTitleMain,subTitlesub) {

		$(".sub_visual_title dt").text(subTitleMain);
		//$(".sub_visual_title dd").text(subTitlesub);


		//$(".sub_visual_title dt").text("Subtitle Area");
		//$(".sub_visual_title dd").text("Subtitle Area Subtitle Area");

		$(".sub_visual_title dt").textillate({
			in: {
			  initialDelay: 10,
			  effect: 'fadeInRight', 
			  delay: 70,
			}
		});

		$("#sub_visual .sv_cover").addClass("animate");
		$("#sub_visual .bg").addClass("animate");
		$(".sub_visual_title dd").addClass("animate");
	}


	var makeContentsTitle = function (contentsTitle,productDepth) {
		$("#subContents .sub_contents_tit").text(contentsTitle);

		$(".product_wrap .tab > ul > li").on("click",function(){
			var productDepth = $(this).find("a").text();
			$(".product_sub_contents_tit").text(productDepth);
		})
	}

    var makeBreadCrumb  = function (bread01,bread02,mainSel,lnbSel){

        //주소값 추출
        var href01 = $(".gnbList > li").eq(mainSel).find("a").prop('href');
        var href02 = $("#lnb .subLnb li a").eq(lnbSel).prop('href');

        $(".breadCrumb").append("<a href='" + href01 + "'>" + bread01 + "</a>");
        $(".breadCrumb").append("<a href='" + href02 + "'>" + bread02 + "</a>");
        $(".breadCrumb").append("<div class='arrow_sub'></div>");
        $(".arrow_sub").append($("#gnb .gnbList > li").eq(mainSel).find(".depth02 > li > a").clone());
        //슬라이딩 뎁스
        $(".depth_arrow").on("click",function(){
            $(".arrow_sub").toggleClass("active");
        });
	}

	var subVisual = function (mainSel) {
		$("#sub_visual").removeClass();
		$("#sub_visual").addClass("sub_visual0"+(mainSel+1));
	}


	var lnbLoad = function (mainSel,lnbSel) {

		$("#lnb .subLnb").append($("#gnb .gnbList > li").eq(mainSel).find(".depth02 > li").clone());
		$("#lnb .subLnb > li .depth02").remove();
        $("#lnb .subLnb > li").eq(lnbSel).addClass("active");

        //갯수 계산해서 클래스적용
		var lnb_length = $("#lnb .subLnb > li > a").length;
        $("#lnb").addClass("lnb0"+(lnb_length));
        $('.subLnb').clone().removeClass('lnb-pc').addClass('lnb-m').prependTo('.subLnbWrap'); //230517 모바일 요소 추가

	}


	var snbLoad = function (mainSel,lnbSel,tabSel) {
		$("#snb ul").append($("#gnb .gnbList > li").eq(mainSel).find(".depth03").eq(lnbSel).find("li").clone());
		$("#snb li").eq(tabSel).addClass("active");

	}


	
	var lnbFix = function (lnbSel) {
		$("#lnb > ul > li").on("mouseenter",function(e){
			$("#lnb > ul > li").removeClass("on");
			$(this).addClass("on")
		})
		$("#lnb > ul > li").on("mouseleave",function(e){
			$("#lnb > ul > li").removeClass("on")
			$("#lnb > ul > li").eq(lnbSel).addClass("on")
		})
		$("#lnb > ul > li").trigger("mouseleave");
	}



	var snbFix = function (tabSel) {

	}



	var allFix = function (obj){
		var temp=getNameFromPath(addr);
		var defaults={};
		var option=$.extend(defaults,obj);
		var mainSel = option.mainSel;
		var lnbSel = option.lnbSel;
		var tabSel = option.tabSel;
		var depth04Sel = option.depth04Sel;
		var depth01 = $(".gnbList > li").eq(mainSel).clone();
		var depth02 = depth01.find(".depth02 > li > a").eq(lnbSel).clone();
		var depth03 = depth02.find(".depth03 > li").eq(tabSel).clone();
		var depth04 = depth03.find(".depth04 > li").eq(depth04Sel).clone();

		depth01.find("ul").remove();
		depth02.find("ul").remove();
		depth03.find("ul").remove();
		depth04.find("ul").remove();

		depth01.find("li").unwrap();
		depth02.find("li").unwrap();
		depth03.find("li").unwrap();
		depth04.find("li").unwrap();

		var bread01 = depth01.text();
		var bread02 = depth02.text();
		var bread03 = depth03.text();
		var bread04 = depth04.text();
		
		$("#subContents").addClass(temp);
		var subTitleMain = $("#gnb > .gnbList > li").eq(mainSel).children("a").text();
		var subTitleSub = $("#gnb > .gnbList > li").eq(mainSel).children("a").attr("data-eng")
		var contentsTitle = $("#gnb > .gnbList > li").eq(mainSel).find(".depth02 > li > a").eq(lnbSel).text();

		snbLoad(mainSel,lnbSel,tabSel);
		lnbFix(mainSel,lnbSel,tabSel);
		lnbLoad(mainSel,lnbSel,tabSel);
		snbFix(tabSel);
		subVisual(mainSel);
		makeSitemap(mainSel,lnbSel);
		makeSubTitle(subTitleMain,subTitleSub);
		makeContentsTitle(contentsTitle);
		makeBreadCrumb(bread01,bread02,mainSel,lnbSel);
	
	}

	var fix = function() {
		var addr=location.href
		var temp=getNameFromPath(addr);
		var lnbSel = $("#lnbSel").val();
		var tabSel = $("#tabSel").val();
		switch (temp){		

	//---------------------------------------------------------------------------------------				
			case "greeting":								allFix({mainSel:0,lnbSel:0}); break;
			case "vision":								    allFix({mainSel:0,lnbSel:1}); break;
			case "introduce":								    allFix({mainSel:0,lnbSel:2}); break;
			case "orga":								allFix({mainSel:0,lnbSel:3}); break;
			case "history":								    allFix({mainSel:0,lnbSel:4}); break;
			case "prof":								    allFix({mainSel:0,lnbSel:5}); break;
			case "location":								allFix({mainSel:0,lnbSel:6}); break;
			case "news":								allFix({mainSel:0,lnbSel:7}); break;
	//---------------------------------------------------------------------------------------	
			case "process_now":							allFix({mainSel:1,lnbSel:0}); break//$('#lnbSel').val()}); break;
			case "process_ing":							allFix({mainSel:1,lnbSel:1}); break;
			case "process_year":						allFix({mainSel:1,lnbSel:2}); break;
			case "process_now01":							    allFix({mainSel:1,lnbSel:0}); break;
			//case "process01":							    allFix({mainSel:1,lnbSel:1}); break;
			//case "process01_intro":							allFix({mainSel:1,lnbSel:1}); break;
			case "process_ing01":							    allFix({mainSel:1,lnbSel:1}); break;
			//case "process03":							    allFix({mainSel:1,lnbSel:3}); break;
			// case "process05":							    allFix({mainSel:1,lnbSel:3}); break;
			//case "process06":						        allFix({mainSel:1,lnbSel:6}); break;
			// case "process07":						        allFix({mainSel:1,lnbSel:4}); break;
			// case "process08":						        allFix({mainSel:1,lnbSel:5}); break;
	//---------------------------------------------------------------------------------------	
			case "apply_online":							        allFix({mainSel:2,lnbSel:0}); break;
			case "apply_con":									allFix({mainSel:2,lnbSel:1}); break;
			case "apply_qna":									allFix({mainSel:2,lnbSel:2}); break;
			case "apply_check":									allFix({mainSel:2,lnbSel:3}); break;
	//---------------------------------------------------------------------------------------	
			case "edu_01":							    allFix({mainSel:3,lnbSel:0}); break;
			case "edu_02":							    allFix({mainSel:3,lnbSel:1}); break;
			case "edu_03":						        allFix({mainSel:3,lnbSel:2}); break;
			case "edu_04":							    allFix({mainSel:3,lnbSel:3}); break;
			// case "community04":							    allFix({mainSel:3,lnbSel:4}); break;
			// case "community05":							    allFix({mainSel:3,lnbSel:5}); break;
			// case "notice_view":							    allFix({mainSel:3,lnbSel:0}); break;
			// case "qna":									    allFix({mainSel:3,lnbSel:6}); break;
			// case "qna_view":									    allFix({mainSel:3,lnbSel:6}); break;
			// case "qna_write":									    allFix({mainSel:3,lnbSel:6}); break;
	//---------------------------------------------------------------------------------------	
			case "job_01":							    allFix({mainSel:4,lnbSel:0}); break;
			case "job_02":							    allFix({mainSel:4,lnbSel:1}); break;
			case "job_03":						        allFix({mainSel:4,lnbSel:2}); break;
			case "job_04":							    allFix({mainSel:4,lnbSel:3}); break;
			case "job_05":							    allFix({mainSel:4,lnbSel:4}); break;
	//---------------------------------------------------------------------------------------	
			case "community_01":							    allFix({mainSel:5,lnbSel:0}); break;
			case "community_02":							    allFix({mainSel:5,lnbSel:1}); break;
			case "community_03":						        allFix({mainSel:5,lnbSel:2}); break;
			case "community_04":						        allFix({mainSel:5,lnbSel:3}); break;



			default:allFix({mainSel:-1,lnbSel:-1,tabSel:-1}); $("body").removeClass("sub").addClass("main");
		}
	}

/* 230809 sic : 기존 코드 백업
	var resize = function() {
		$(window).on("resize load",function(e){
			var w = $(document).outerWidth(true);
			var lnbEl = $('#lnb');
			console.log(w);
			if(w>1400){
				$("body").addClass("pc");
				$("body").removeClass("tablet");
				$("body").removeClass("mobile");
				$("#gnb").removeAttr("style");
				$("#gnb .depth02").removeAttr("style");
				$(".cover").removeAttr("style");
				$(".btnGnbAll").removeClass("on");
			} else if(w<=1400 && w > 768){
				$("body").addClass("tablet");
				$("body").removeClass("pc");
				$("body").removeClass("mobile");
			} else {
				$("body").addClass("mobile");
				$("body").removeClass("pc");
				$("body").removeClass("tablet");
				$(".section").addClass("active");
                $("#header").addClass("on");
			}
			$("#header").removeAttr("style");

			// 230517 모바일 탭관련 추가 시작
			if(w<=770){
				lnbEl.removeClass('lnb-pc-wrap').addClass('lnb-m-wrap');
				lnbEl.find('.subLnb.lnb-pc').hide().end().find('.subLnb.lnb-m').show();
				var mLnbBox = $('.lnb-m-wrap .subLnbWrap');
				var mlnbNum;
				if ($('#lnb li').hasClass('active')) {
					mlnbNum = $('#lnb li.active').index();
				}
				console.log('lnb' + mlnbNum);

				mLnbBox.sly({
					horizontal: 1,
					itemNav: 'centered',
					smart: 1,
					mouseDragging: 1,
					touchDragging: 1,
					releaseSwing: 1,
					startAt: mlnbNum,
					speed: 300,
					elasticBounds: 1,
					dragHandle: 1,
					dynamicHandle: 1
				});
				mLnbBox.sly('reload');
			} else {
				lnbEl.removeClass('lnb-m-wrap').addClass('lnb-pc-wrap');
				lnbEl.find('.subLnb.lnb-pc').show().end().find('.subLnb.lnb-m').hide();

			}
		})
		$(window).trigger("resize");

	}
 */

/* 230809 sic : 코드 최적화 */
var resize = function() {
	function adjustLayout() {
		var w = $(document).outerWidth(true); // 현재 윈도우 너비 저장
		var lnbEl = $('#lnb'); // lnb 요소 선택
		console.log(w);

		if (w > 1400) {
			$("body").addClass("pc").removeClass("tablet mobile"); // body 클래스 변경
			$("#gnb, #gnb .depth02, .cover").removeAttr("style"); // gnb 및 하위 요소 스타일 초기화
			$(".btnGnbAll").removeClass("on"); // gnb 전체 메뉴 버튼 클래스 초기화
			lnbEl.removeClass('lnb-m-wrap').addClass('lnb-pc-wrap'); // lnb 클래스 변경
			lnbEl.find('.subLnb.lnb-pc').show().end().find('.subLnb.lnb-m').hide(); // lnb 하위 요소 보임/숨김 설정
		} else if (w <= 1400 && w > 960) {
			$("body").addClass("tablet").removeClass("pc mobile"); // body 클래스 변경
			lnbEl.removeClass('lnb-pc-wrap lnb-m-wrap'); // lnb 클래스 초기화
			lnbEl.find('.subLnb').show(); // lnb 하위 요소 보임 설정
		} else {
			$("body").addClass("mobile").removeClass("pc tablet"); // body 클래스 변경
			$(".section").addClass("active"); // section 활성화 클래스 추가
			$("#header").addClass("on"); // header 활성화 클래스 추가
			lnbEl.removeClass('lnb-pc-wrap').addClass('lnb-m-wrap'); // lnb 클래스 변경
			lnbEl.find('.subLnb.lnb-pc').hide().end().find('.subLnb.lnb-m').show(); // lnb 하위 요소 보임/숨김 설정
			var mLnbBox = $('.lnb-m-wrap .subLnbWrap'); // 모바일 lnb 박스 선택
			var mlnbNum = $('#lnb li.active').index(); // 현재 활성화된 lnb 항목의 인덱스 저장
			console.log('lnb' + mlnbNum);

			mLnbBox.sly({
				horizontal: 1,
				itemNav: 'centered',
				smart: 1,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: mlnbNum, // 시작 항목 설정
				speed: 300,
				elasticBounds: 1,
				dragHandle: 1,
				dynamicHandle: 1
			});
			mLnbBox.sly('reload'); // Sly 스크롤러 새로고침
		}
		$("#header").removeAttr("style"); // header 스타일 초기화
	}

	$(window).on("resize load", adjustLayout); // 윈도우 크기 조정 및 로드 시에 함수 실행
	$(window).trigger("resize"); // 초기 로드 시에도 함수 실행
};

$(window).on("load", function() {
	resize(); // 초기 로드 시 resize 함수 실행
});
/* end 230809 sic : 코드 최적화 */

	return {
		gnb:gnb,
		fix:fix,
		resize:resize,

	}
}());

$(function(){
	daram.gnb();
	daram.fix();
	daram.resize();

})





