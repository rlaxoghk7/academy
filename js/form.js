//date picker
$(document).ready(function () {
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		//firstDay: 0,
		//minDate: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '년',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		gotoCurrent: false,
		showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
		buttonImage: "../../images/ui/btn_calendar.png", // 버튼 이미지
		buttonImageOnly: true
		
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
 	$('.datepicker').datepicker();
});

// 회원가입 체크
function joinCheck(){
	var form=document.writeForm;
	if(!form.agree1.checked){
		alert("회원가입약관의 내용에 동의해 주세요.");
		form.agree1.focus();
	} else if(!form.agree2.checked){
		alert("개인정보 취급방침의 내용에 동의해 주세요.");
		form.agree2.focus();
	} else {
		form.submit();
	}
}

 // 회원등록
function memberJoin(){
	var form=document.writeForm;
	var formData = new FormData(form);
	var idCheck = /^[A-Za-z0-9]{6,15}$/; 
    var pwCheck = /^(?=.*[a-z])(?=.*[0-9]).{6,15}$/; 
	var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(!form.userid.value) {
		alert("아이디를 입력해 주세요.");
		form.userid.focus();
	} else if(!idCheck.test(form.userid.value)) {
		alert("아이디는 6~15자 이내의 영문, 숫자로 입력해 주세요.");
		form.userid.focus();
	} else if(form.duplicate_check.value=="") {
		alert("아이디 중복확인을 진행해 주세요.");
		form.userid.focus();
	} else if(form.passwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		form.passwd.focus();
	} else if(!pwCheck.test(form.passwd.value)) {
		alert("비밀번호는 6~20자 이내의 영문, 숫자로 입력해 주세요.");
		form.passwd.focus();
	} else if(form.passwd_check.value=="") {
		alert("비밀번호 확인을 입력해 주세요.");
		form.passwd_check.focus();
	} else if(form.passwd.value!=form.passwd_check.value) {
		alert("비밀번호가 일치하지 않습니다.\n정확한 비밀번호를 입력해 주세요.");
		form.passwd_check.focus();
	} else if(form.name.value=="") {
		alert("이름을 입력해 주세요.");
		form.name.focus();
	} else if(!$('input:radio[name=gubun]').is(":checked")) {
		alert("회원구분을 체크해 주세요.");
		form.gubun[0].focus();
	} else if(!form.gubun[0].checked && !form.attach1.value) {
		alert("첨부할 파일을 선택해 주세요.");
		form.attach1.focus();
	} else if(form.byear.value=="") {
		alert("생년월일을 입력해 주세요.");
		form.byear.focus();
	} else if(form.bmonth.value=="") {
		alert("생년월일을 입력해 주세요.");
		form.bmonth.focus();
	} else if(form.bday.value=="") {
		alert("생년월일을 입력해 주세요.");
		form.bday.focus();
	} else if(!$('input:radio[name=birth_gubun]').is(":checked")) {
		alert("양력/음력을 체크해 주세요.");
		form.birth_gubun[0].focus();
	} else if(!$('input:radio[name=gender]').is(":checked")) {
		alert("성별을 체크해 주세요.");
		form.gender[0].focus();
	} else if(form.phone1.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone1.focus();
	} else if(form.phone2.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone2.focus();
	} else if(form.phone3.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone3.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

 // 회원정보수정
function memberModify(){
	var form=document.writeForm;
	var formData = new FormData(form);
	var pwCheck = /^(?=.*[a-z])(?=.*[0-9]).{6,15}$/; 
	var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(form.passwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		form.passwd.focus();
	} else if(!pwCheck.test(form.passwd.value)) {
		alert("비밀번호는 6~20자 이내의 영문, 숫자로 입력해 주세요.");
		form.passwd.focus();
	} else if(form.passwd_check.value=="") {
		alert("비밀번호 확인을 입력해 주세요.");
		form.passwd_check.focus();
	} else if(form.passwd.value!=form.passwd_check.value) {
		alert("비밀번호가 일치하지 않습니다.\n정확한 비밀번호를 입력해 주세요.");
		form.passwd_check.focus();
	} else if(form.email_check.value=="") {
		alert("이메일 중복확인을 진행해 주세요.");
		return;
	} else if(form.bmonth.value=="") {
		alert("생년월일을 입력해 주세요.");
		form.bmonth.focus();
	} else if(form.bday.value=="") {
		alert("생년월일을 입력해 주세요.");
		form.bday.focus();
	} else if(!$('input:radio[name=birth_gubun]').is(":checked")) {
		alert("양력/음력을 체크해 주세요.");
		form.birth_gubun[0].focus();
	} else if(!$('input:radio[name=gender]').is(":checked")) {
		alert("성별을 체크해 주세요.");
		form.gender[0].focus();
	} else if(form.phone1.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone1.focus();
	} else if(form.phone2.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone2.focus();
	} else if(form.phone3.value=="") {
		alert("휴대폰번호를 선택해 주세요.");
		form.phone3.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

 // 학력 및 경력사항 드록
function careerWrite(){
	var form=document.form1;
	var formData = new FormData(form1);
	if(form.career.value=="") {
		alert("학력과 경력, 자격증 등 이력서 내용을 입력해 주세요.");
		form.career.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: formData,
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 회원 아이디 중복 확인
function duplicateCheck(){
	var userid = $("#userid").val();
	var idCheck = /^[A-Za-z0-9]{6,15}$/; 
	if(!userid){
		alert("아이디를 입력해 주세요.");
		$("#userid").focus();
	} else if(!idCheck.test(userid)) {
		alert("아이디는 6~15자 이내의 영문, 숫자로 입력해 주세요.");
		$("#userid").focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: {"mode":"duplicate_check", "userid":userid},
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert('처리중 오류가 발생 하였습니다.');
			}
		});
	}
}

// 이메일 중복 확인
function emailCheck(){
	var userid = $("#userid").val();
	var email1 = $("#email1").val();
	var email2 = $("#email2").val();
	if(!email1){
		alert("이메일을 입력해 주세요.");
		$("#email1").focus();
	} else if(!email2) {
		alert("이메일을 입력해 주세요.");
		$("#email2").focus();
	} else {
		var email = email1+"@"+email2;
		console.log(email);
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: {"mode":"email_check", "userid":userid, "email":email},
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert('처리중 오류가 발생 하였습니다.');
			}
		});
	}
}

// 로그인
function memberLogin() {
	var form = document.writeForm;
	var formData = new FormData(form);
	if(form.userid.value=="") {
		alert("아이디를 입력해주세요.");
		form.userid.focus();
	} else if(form.passwd.value=="") {
		alert("비밀번호를 입력해주세요.");
		form.passwd.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: formData,
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			global: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(data){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

function inputSendit() {
	if(event.keyCode==13) { 
		memberLogin();
	}
}

// 로그아웃
function logOut(){
	$.ajax({
		type: "GET",
		url: "/_exec/member_exe.php",
		data: "mode=logout",
		cache: false,
		global: false,
		success: function(data){
			$("#msg").html(data);
		}
	});
}

// 회원탈퇴
function memberWithdrawal(){
	var form = document.writeForm;
	var formData = new FormData(form);
	if(!form.agree.checked){
		alert("탈퇴신청 동의에 체크해 주세요.");
		form.agree.focus();
	} else if(!$('input:radio[name=reason]').is(":checked")) {
		alert("탈퇴사유를 선택해 주세요.");
		form.reason[0].focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/member_exe.php",
			data: formData,
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(data){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}


/* 강사 마이페이지 */

$(function(){
	// 이력서 첨부하기
	$("#resume_file").change(function(e){
		var form = document.form2;
		var formData = new FormData(form);
		if(confirm('이력서 파일을 업로드 하시겠습니까?')){
			$.ajax({
				type: "POST",
				url: "/_exec/teacher_exe.php",
				data: formData,
				enctype:'multipart/form-data',
				processData:false,
				contentType:false,
				dataType:'text',
				cache: false,
				success: function(data){
					$("#msg").html(data);
				},
				error: function(){
					alert("처리중 오류가 발생 하였습니다.");
				}
			});
		}
    });

	// 이력서 수정하기
	$(".resume_file").change(function(e){
		var idx = $(this).data('idx');
		//console.log(idx);
		var form = eval("document.form_"+idx);
		var formData = new FormData(form);
		if(confirm('이력서 파일을 수정 하시겠습니까?')){
			$.ajax({
				type: "POST",
				url: "/_exec/teacher_exe.php",
				data: formData,
				enctype:'multipart/form-data',
				processData:false,
				contentType:false,
				dataType:'text',
				cache: false,
				success: function(data){
					$("#msg").html(data);
				},
				error: function(){
					alert("처리중 오류가 발생 하였습니다.");
				}
			});
		}
    });

	// 이력서 삭제하기
	$(document).on("click", ".resume-del", function() { 
		var idx = $(this).data('idx');
		if(confirm('이력서 파일을 삭제 하시겠습니까?')){
			$.ajax({
				type: "POST",
				url: "/_exec/teacher_exe.php",
				data: {"mode":"resume_del", "idx":idx},
				cache: false,
				success: function(data){
					$("#msg").html(data);
				},
				error: function(){
					alert("처리중 오류가 발생 하였습니다.");
				}
			});
		}
    });

});

// 강의계획서 작성
function teacherPlanWrite(){
	var form=document.writeForm;
	var formData = new FormData(form);
	if(form.subject.value=="") {
		alert("제목을 입력해 주세요.");
		form.subject.focus();
	} else if(form.course_name.value=="") {
		alert("과정명을 입력해 주세요.");
		form.course_name.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/teacher_exe.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 강의계획서 삭제
function teacherPlanDelete(){
	var form=document.writeForm;
	var idx = form.idx.value;
	console.log(idx);
	if(confirm('강의계획서를 삭제 하시겠습니까?\n삭제시 복구할 수 없습니다.')){
		$.ajax({
			type: "POST",
			url: "/_exec/teacher_exe.php",
			data: {"mode":"plan_del", "idx":idx},
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 강의계획서 세부교육내용 주차 추가하기
function addEduWeek() { 
	var tbl=document.all.eduTable;
	var row_cnt = tbl.rows.length;
	if(row_cnt>10){
		alert('강의 주차는 최대 10주차까지 추가할 수 있습니다.');
		return;
	}
	
	if(row_cnt==1){
	    var row = tbl.insertRow(1);
	} else {
		var row = tbl.insertRow(row_cnt);
	}

    var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	cell1.innerHTML = "<input type='text' name='week[]'>";
	cell2.innerHTML = "<input type='text' name='topic[]'>";
	cell3.innerHTML = "<textarea name='detail_content[]'></textarea>";
 }

// 강의계획서 세부교육내용 주차 삭제
function deleteEduWeek(r) {
	var i = r.parentNode.parentNode.rowIndex;
	document.getElementById('eduTable').deleteRow(i);
}

/* 강사 마이페이지 */

// 원서접수
function processWrite() {
	var form = document.writeForm;
	var formData = new FormData(form);
	if(!form.name.value) {
		alert('성명을 입력해 주세요.');
		form.name.focus();
		return;
	} else if(!form.birth.value) {
		alert('생년월일을 입력해 주세요.');
		form.birth.focus();
		return;
	} else if(!$('input:radio[name=gender]').is(':checked')) {
		alert('성별을 선택해 주세요.');
		form.gender[0].focus();
		return;
	} else if(!form.postcode.value) {
		alert('우편번호를 입력해 주세요.');
		form.postcode.focus();
		return;
	} else if(!form.addr1.value) {
		alert('주소를 입력해 주세요.');
		form.addr1.focus();
		return;
	} else if(!form.addr2.value) {
		alert('상세주소를 입력해 주세요.');
		form.addr2.focus();
		return;
	} else if(!form.phone1.value) {
		alert('휴대폰번호를 입력해 주세요.');
		form.phone1.focus();
		return;
	} else if(!form.phone2.value) {
		alert('휴대폰번호를 입력해 주세요.');
		form.phone2.focus();
		return;
	} else if(!form.phone3.value) {
		alert('휴대폰번호를 입력해 주세요.');
		form.phone3.focus();
		return;
	} else if(!$('input:radio[name=card]').is(':checked')) {
		alert('내일배움카드 소지 유무를 선택해 주세요.');
		form.card[0].focus();
		return;
	} else if(!form.agree.checked) {
		alert('인정보처리방침에 동의해주세요.');
		form.agree.focus();
		return;
	} else {
		var form = document.writeForm;
		form.action ="process_insert.php";
		form.submit();
	}
}

// 구인등록
function jobWrite() {
	var form = document.writeForm;
	var formData = new FormData(form);
	if(!form.subject.value) {
		alert('제목을 입력해 주세요.');
		form.subject.focus();
		return;
	} else if(!form.company.value) {
		alert('회사명을 입력해 주세요.');
		form.company.focus();
		return;
	} else if(!form.ceo.value) {
		alert('대표자를 입력해 주세요.');
		form.ceo.focus();
		return;
	} else if(!form.establish_date.value) {
		alert('설립일을 입력해 주세요.');
		form.establish_date.focus();
		return;
	} else if(!form.postcode.value) {
		alert('우편번호를 입력해 주세요.');
		form.postcode.focus();
		return;
	} else if(!form.addr1.value) {
		alert('주소를 입력해 주세요.');
		form.addr1.focus();
		return;
	} else if(!form.addr2.value) {
		alert('상세주소를 입력해 주세요.');
		form.addr2.focus();
		return;
	} else if(!form.recruit_field.value) {
		alert('모집분야를 입력해 주세요.');
		form.recruit_field.focus();
		return;
	} else if(!form.job_content.value) {
		alert('업무내용을 입력해 주세요.');
		form.job_content.focus();
		return;
	} else if(!$('input:radio[name=gender]').is(':checked')) {
		alert('성별을 선택해 주세요.');
		form.gender[0].focus();
		return;
	} else if(!form.charge_tel.value) {
		alert('담당자 연락처를 입력해 주세요.');
		form.charge_tel.focus();
		return;
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/ajax_process.php",
			data: formData,
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(data){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

//이메일 
function selectEmail(value){
	var form = document.writeForm;
	if(value=="etc"){
		form.email2.readOnly= false;
		form.email2.value="";
		form.email2.focus();
	}else{
		form.email2.readOnly= true;
		form.email2.value=value;
	}
}

// 파일선택
$(document).on("change", "input:file", function(evt) {
	var $this = $(this);
	var id = $(this).attr('id');
	var num = id.substring(id.length-1);

	if(evt.target.files[0].type.match('image.*')) {
		$width = $(this).data("recommend-width");
		$height = $(this).data("recommend-height");

		var file_reader = new FileReader();
		file_reader.onload = function(e) {
			var image = new Image();
			image.src = e.target.result;
			$('#preview_' + $this.attr('id')).attr('src', image.src);
			$('#del_' + $this.attr('id')).removeClass('blind');
		};
		file_reader.readAsDataURL($(this)[0].files[0]);
	} else {
		var file_size = $(this).data('size'); // 파일 사이즈
		var maxSize = file_size * 1024 * 1024; // 업로드 가능 최대 사이즈
		var fileSize = $(this)[0].files[0].size;
		var attach_file=$(this).val().split('/').pop().split('\\').pop();
		var fileName=$(this).parent().parent().find(".attach-file-name");

		if(fileSize > maxSize){
			alert("첨부파일 사이즈는 "+file_size+"MB 이내로 등록 가능합니다.");
			$(this).val("");
			fileName.text("선택된 파일 없음");
			return false;
		} else {
			fileName.text(attach_file);
			if(attach_file === ""){
				fileName.text("선택된 파일 없음");
			}
		}

	}
});

// 선택 이미지 초기화(미리보기)
function delPreviewAttach(no){
	$("#images"+no).val("");
	$("#preview_images"+no).attr("src","../images/no_sub_img.png");
	$("#del_images"+no).addClass("blind");
}

// 이미지 삭제
function delImages(table,dir,idx,no){
	if(confirm('이미지를 삭제 하시겠습니까?')){
		$.ajax({
			type: "GET",
			url: "../lib/ajax_process.php",
			data: "mode=delete_images&table="+table+"&dir="+dir+"&idx="+idx+"&no="+no,
			success: function(data){
				$("#msg").html(data);
			}
		});
	}
}

// 파일 삭제
function delFile(table,dir,idx,no){
	if(confirm('파일을 삭제 하시겠습니까?\n삭제시 복구할 수 없습니다.')){
		$.ajax({
			type: "GET",
			url: "../lib/ajax_process.php",
			data: "mode=delete_file&table="+table+"&dir="+dir+"&idx="+idx+"&no="+no,
			success: function(data){
				$("#msg").html(data);
			}
		});
	}
}


// Ajax 순서변경
function updateRanking(table,idx){
	var ranking = $("#ranking"+idx).val();
	$.ajax({
		type: "GET",
		url: "../lib/ajax_process.php",
		data: "mode=update_ranking&table="+table+"&idx="+idx+"&ranking="+ranking,
		success: function(data){
			$("#msg").html(data);
		}
	});
}

// 데이터 삭제
function deleteData(idx,action){
	var form = document.deleteForm;
	form.idx.value=idx;
	if(confirm('데이터를 삭제 하시겠습니까?\n삭제 시 복구 할 수 없습니다.')){
		form.action = ''+action+'.php';
		form.submit();
	}
}

$(function(){
	// 회원구분 체크
	$("input[name='gubun']").change(function(){
		$num = $(this).data('num');
		$(".add-txt").addClass("blind");
		$(".g"+$num).removeClass("blind");
	});

	
});

$(function(){
 	// 파일 추가
	var file_cnt=$(".view-file").length;
	console.log(file_cnt);
	$(document).on("click", ".file-btn.add", function() { 
		file_cnt++;
		if( file_cnt < 6 ) { 
			$("#filedel"+file_cnt).val(""); 
			$(".file_view"+file_cnt).removeClass("blind"); 
		} else { 
			alert('첨부파일은 5개까지 입력할 수 있습니다'); 
		}
	});

	$(document).on("click", ".file-btn.delete", function() { 
		var num = $(this).data("num");
		if(file_cnt>5){ file_cnt=5;}
		if(( file_cnt ) == num) {
			$("#attach"+num).val("");
			$("#filedel"+num).val("1"); 
			$(".file_view"+num).addClass("blind"); 
			file_cnt--;
			return false;
		} else {
			alert('하단 삭제버턴 클릭 해주세요');
			return false;
		}
	});

});


// 파일선택
$(document).on("change", "input:file", function(evt) {
	var $this = $(this);
	var id = $(this).attr('id');
	var num = id.substring(id.length-1);
	
	var file_size = $(this).data('size'); // 파일 사이즈
	var maxSize = file_size * 1024 * 1024; // 업로드 가능 최대 사이즈
	var fileSize = $(this)[0].files[0].size;
	var attach_file=$(this).val().split('/').pop().split('\\').pop();
	var fileName=$(this).parent().parent().find(".file-name"+num);
	
	if(fileSize > maxSize){
		alert("첨부파일 사이즈는 "+file_size+"MB 이내로 등록 가능합니다.");
		$(this).val("");
		fileName.text("선택된 파일 없음");
		return false;
	} else {
		fileName.text(attach_file);
		if(attach_file === ""){
			fileName.text("선택된 파일 없음");
		}
	}
});


// 다운로드
function download(tb,dir,idx,no,fileName){
	$.ajax({
		type: "POST",
		url: "/_exec/download.php",
		data: {"tb":tb, "dir":dir, "idx":idx, "no":no},
		cache:false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		xhrFields: {
            responseType: 'blob'
        }
	}).done(function(data, textStatus, jqXhr) {
        if (!data) {
            return;
        }
        try {
            var blob = new Blob([data], { type: jqXhr.getResponseHeader('content-type') });
            //var fileName = getFileName(jqXhr.getResponseHeader('content-disposition'));
            //fileName = decodeURI(fileName);
			 
            if (window.navigator.msSaveOrOpenBlob) { // IE 10+
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else { // not IE
                var link = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                link.href = url;
                link.target = '_self';
                if (fileName) link.download = fileName;
                document.body.append(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.error(e)
        }
    });
}

function getFileName (contentDisposition) {
    var fileName = contentDisposition
        .split(';')
        .filter(function(ele) {
            return ele.indexOf('filename') > -1
        })
        .map(function(ele) {
            return ele
                .replace(/"/g, '')
                .split('=')[1]
        });
	return fileName[0] ? fileName[0] : null
}


// 파일 삭제
function delFile(table,dir,idx,no){
	if(confirm('파일을 삭제 하시겠습니까?\n삭제시 복구할 수 없습니다.')){
		$.ajax({
			type: "GET",
			url: "/_exec/ajax_process.php",
			data: "mode=delete_file&table="+table+"&dir="+dir+"&idx="+idx+"&no="+no,
			success: function(data){
				$("#msg").html(data);
			}
		});
	}
}

// 데이터 삭제
function deleteData(tb,dir,idx){
	if(confirm('데이터를 삭제 하시겠습니까?\n삭제시 복구할 수 없습니다.')){
		$.ajax({
			type: "GET",
			url: "/_exec/ajax_process.php",
			data: "mode=del_data&tb="+tb+"&dir="+dir+"&idx="+idx,
			success: function(data){
				$("#msg").html(data);
			}
		});
	}
}

// 온라인상담 작성
function consultingWrite(){
	var form=document.writeForm;
	var formData = new FormData(form);
	if(form.name.value=="") {
		alert("수강생 성명을 입력해 주세요.");
		form.name.focus();
	} else if(form.part1_idx.value=="") {
		alert("희망과정을 선택해 주세요.");
		form.part1_idx.focus();
	} else if(form.part2_idx.value=="") {
		alert("과정을 선택해 주세요.");
		form.part2_idx.focus();
	} else if(!$('input:radio[name=ctype]').is(':checked')) {
		alert("상담 유형을 선택해 주세요.");
		form.ctype[0].focus();
		return;
	} else if(form.tel.value=="") {
		alert("연락처를 입력해 주세요.");
		form.tel.focus();
	} else if(form.content.value=="") {
		alert("기타 참고사항을 입력해 주세요.");
		form.content.focus();
	} else if(!form.agree.checked){
		alert("개인정보 수집·이용에 대한 안내에 동의해 주세요.");
		form.agree.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/ajax_process.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 질문게게시판 작성
function bbsWrite(){
	var form=document.writeForm;
	var formData = new FormData(form);
	if(form.subject.value==""){
		alert("제목을 입력해 주세요.");
		form.subject.focus();
	} else if(form.name.value=="") {
		alert("이름을 입력해 주세요.");
		form.name.focus();
	} else if(form.pwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		form.pwd.focus();
	} else if(form.content.value=="") {
		alert("문의내용을 입력해 주세요.");
		form.content.focus();
	} else if(form.captcha.value=="") {
		alert("스팸방지 숫자를 입력해 주세요.");
		form.captcha.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/bbs_exe.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 입학 Q&A 작성
function bbsWrite2(){
	var form=document.writeForm;
	var formData = new FormData(form);
	if(form.subject.value==""){
		alert("제목을 입력해 주세요.");
		form.subject.focus();
	} else if(form.name.value=="") {
		alert("성명을 입력해 주세요.");
		form.name.focus();
	} else if(form.email1.value=="") {
		alert("이메일을 입력해 주세요.");
		form.email1.focus();
	} else if(form.email2.value=="") {
		alert("이메일을 입력해 주세요.");
		form.email2.focus();
	} else if(form.phone1.value=="") {
		alert("휴대폰번호를 입력해 주세요.");
		form.phone1.focus();
	} else if(form.phone2.value=="") {
		alert("휴대폰번호를 입력해 주세요.");
		form.phone2.focus();
	} else if(form.phone3.value=="") {
		alert("휴대폰번호를 입력해 주세요.");
		form.phone3.focus();
	} else if(form.pwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		form.pwd.focus();
	} else if(form.pwd_check.value=="") {
		alert("비밀번호확인을 입력해 주세요.");
		form.pwd_check.focus();
	} else if(form.pwd.value!=form.pwd_check.value) {
		alert("비밀번호가 일치하지 않습니다.");
		form.pwd_check.focus();
	} else if(form.content.value=="") {
		alert("문의내용을 입력해 주세요.");
		form.content.focus();
	} else if(form.captcha.value=="") {
		alert("스팸방지 숫자를 입력해 주세요.");
		form.captcha.focus();
	} else {
		$.ajax({
			type: "POST",
			url: "/_exec/bbs_exe.php",
			data: formData,
			enctype:'multipart/form-data',
			processData:false,
			contentType:false,
			dataType:'text',
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}

// 질문게게시판 삭제
function bbsDelete(idx){
	var mode = "delete";
	if(confirm('글을 삭제하시겠습니까?')) {
		$.ajax({
			type: "POST",
			url: "/_exec/bbs_exe.php",
			data: {"mode":mode,"idx":idx},
			cache: false,
			success: function(data){
				$("#msg").html(data);
			},
			error: function(){
				alert("처리중 오류가 발생 하였습니다.");
			}
		});
	}
}


// 과정분류 1차 선택
function selectPart1(part1_idx){
	$.ajax({
		type:"GET",
		url:"../../lib/load_part2.php",
		data:"part1_idx="+part1_idx,
		cache: false,
		global: false,
		success:function(data){
			$('#cate2').html(data);
		}
	});
}

// 과정분류 2차 선택
function loadPart2(idx,part1_idx,part2_idx){
	$.ajax({
		type:"GET",
		url:"../../lib/load_part2.php",
		data:"idx="+idx+"&part1_idx="+part1_idx+"&part2_idx="+part2_idx,
		cache: false,
		global: false,
		success:function(data){
			$('#cate2').html(data);
		}
	});
}


// 검색
function search(){
	var form = document.searchForm;
	form.submit();
}


// 이메일 한글 입력 방지
$(document).on("keyup", ".email", function() { 
	$(this).val( $(this).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
});

// 전호번호 하이픈 자동 입력
$(document).on("keyup", ".tel", function() { 
	$(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
});

//숫자만, 영문만 입력
$(document).ready(function() {
	$(".onlynum").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$(".onlyeng").keyup(function(){$(this).val( $(this).val().replace(/[^\!-z]/g,"") );} );
});

$(function(){
	// 로딩바 Start
	$(document).ajaxStart(function() {
		$('#loading-prograss').removeClass('blind');
	});
	
	// 로딩바 Stop
	$(document).ajaxStop(function() {
		$('#loading-prograss').addClass('blind');
	});
})