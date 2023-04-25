// var calc_constants = { // from EBI file
// 	'MIMIMUM_AGE': 18,
// 	'MAXIMUM_AGE': 65,
// 	'MIN_SUMASSURED': 5000000,
// 	'MAX_SUMASSURED': 999900000,
// 	'MIN_Critical_Illness': 100000,
// 	'MAX_Critical_Illness': 10000000,
// 	'MIN_Accidental_Death_Benefit': 100000,
// 	'MAX_Accidental_Death_Benefit': 20000000
// };
var serviceCount = {
	"premium": 0,
	"maxCount": 3
};

var CIStatus = false
var countupdatePanel = 1;
var countPremium_calculation = 1;
var countServiceError = 1;

var quoteSrnObj = {
	pptCounter: 0,
	incmPolcy: true
}
var dynamic_obj_create = {};
var RL_Pay_json = {
	'1': ['Single_Pay', '2041', '0%', '5', 'Single_Pay'],
	'5': ['Limited_Pay_5year', '1457', '40%', '10', 'L_Pay_5'],
	'7': ['Limited_Pay_7year', '1867', '40%', '10', 'L_Pay_7'],
	'10': ['Limited_Pay_10year', '2648', '40%', '10', 'L_Pay_10'],
	'12': ['Limited_Pay_12year', '2648', '40%', '10', 'L_Pay_12'],
	'15': ['Limited_Pay_15year', '2648', '40%', '10', 'L_Pay_15'],
	'20': ['Limited_Pay_20year', '2648', '40%', '10', 'L_Pay_20'],
	'60_age': ['Limited_Pay_60_age', '1742', '25%', '10', 'L_Pay_60_age'],
	'term_5': ['Limited_Pay_term_5_year', '2041', '0%', '10', 'L_Pay_term_5'],
	'RP': ['Regular_Pay', '', '', '', 'R_Pay'],
};
var RLW_Life_Limited_Pay_json = {
	'10': ['Whole_Life_Limited_Pay_10', '1457', '40%', '10', 'WL_Pay_10'],
	'60_age': ['Whole_Life_Limited_Pay_60_age', '1867', '40%', '10', 'WL_Pay_60_age'],
	'WRP': ['Whole_Life_Regular_Pay', '1457', '40%', '10', 'WR_Pay'],
};

var storeBasePremium = {
	'basePremWithoutTax': '',
	'basePremSTax1yr': '',
	'basePremSTax2yr': '',
	'basePremFreq': '',
	'basePPT': '',
	'baseCIAmt': '',
	'baseCIWithSTax': '',
	'baseADBRAmt': '',
	'baseADBRWithSTax': '',
};
// var PPT_validate_JSON = {
// 	"ROP": ["Regular_Pay","Limited_Pay_60_age", "Limited_Pay_5year", "Limited_Pay_7year", "Limited_Pay_10year", "Limited_Pay_12year", "Limited_Pay_15year", "Single_Pay"],
// 	//"ROP": ["Regular_Pay", "Single_Pay", "Limited_Pay_60_age"],
// 	"IB": ["Limited_Pay_60_age","Limited_Pay_15year","Limited_Pay_5year", "Limited_Pay_7year", "Limited_Pay_10year", "Limited_Pay_12year"],
// 	"EROP-LS-60": ["Limited_Pay_20year", "Limited_Pay_12year","Limited_Pay_5year", "Limited_Pay_10year"],
// 	"EROP-LS-70": ["Limited_Pay_60_age", "Limited_Pay_20year","Limited_Pay_5year", "Limited_Pay_10year", "Limited_Pay_12year"],
// 	"ROP-LS": ["Limited_Pay_60_age", "Limited_Pay_15year", "Limited_Pay_5year", "Limited_Pay_7year", "Limited_Pay_10year", "Limited_Pay_12year"],
// }
$(function () {
	calc_globalevent.evnt.QuoteFocus("removePreFix", "input[name=inp-prem], input[name=inpci], input[name=inpadbr]");
	calc_globalevent.evnt.QuoteBlur("lifeCover", "input[name='inp-prem']");
	calc_globalevent.evnt.QuoteBlur("adbr", "input[name='inpadbr']");
	calc_globalevent.evnt.QuoteBlur("ci", "input[name='inpci']");
	calc_globalevent.evnt.QuoteChange("adbr", "input[name='inpadbr']");
	calc_globalevent.evnt.QuoteChange("ci", "input[name='inpci']");
	calc_globalevent.evnt.QuoteChange("policyterm", ".form-group.PolicyTerm select");
	calc_globalevent.evnt.QuoteFocus("PolicyTermSelect", ".form-group.PolicyTerm select");
	calc_globalevent.evnt.QuoteChange("Benefits", "input[name='radiobenefit']");
	calc_globalevent.evnt.QuoteChange("payoutOption", "input[name='repayType']");
	calc_globalevent.evnt.QuoteChange("paymentOption", "input[name='paymentTerm']");
	calc_globalevent.evnt.QuoteChange("paymentFrequency", "input[name='frequency']");
	calc_globalevent.evnt.QuoteChange("lumpRegTerm", ".lumpRegdiv select");
	calc_globalevent.evnt.QuoteChange("wth_optin", "input[name='wth_optin']");
	calc_globalevent.evnt.QuoteChange("payoutYears", "input[name='payoutPer']");
	calc_globalevent.evnt.QuoteChange("monthlyIncomePercentage", "input[name='incomePer']");
	// function call
	calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
	calc_globalevent.evnt.QuoteClick("GraphContent", ".personaPhase4.graph-content");
	calc_globalevent.evnt.QuoteClick("proceedToAppform", ".rec-plan-btn");
	calc_globalevent.evnt.QuoteClick("paymentFrequency", "#premium-freq .modal-footer .btn");
	calc_globalevent.evnt.QuoteClick("paymentFrequency", ".quote-freq-modal .footer .btn");
	calc_globalevent.evnt.QuoteClick("frequencyPop", ".frequency-cont a");
	calc_globalevent.evnt.QuoteClick("premiumBreakup", ".flex .brkp-text");
	calc_globalevent.evnt.QuoteClick("backToLead", ".back-to-lead");
	calc_globalevent.evnt.QuoteClick("prem-return-header", ".prem-return-header button");
	calc_globalevent.evnt.QuoteClick("ebi-button", ".ebi-button");
	//calc_globalevent.evnt.QuoteClick("payout-radio-cont", ".payout-radio-cont .radio-box");
	calc_globalevent.evnt.QuoteClick("lifestagecovertabheaderwrap", ".lifestagecovertabheaderwrap .btn");
	calc_globalevent.evnt.QuoteClick("expandGraph", ".expand-graph-container .expand-graph");
	//calc_globalevent.evnt.QuoteClick("incomePerc", "input[name='incomePer']");
	calc_globalevent.evnt.QuoteClick("payoutPer", "input[name='payoutPer']");
	// calc_globalevent.evnt.QuoteClick("optLeadProceed", ".opt-lead-proceed");
	calc_globalevent.evnt.QuoteClick("addOns", ".add-ons");
	calc_globalevent.evnt.QuoteClick("includeAddOn", ".includeAddOn");
	calc_globalevent.evnt.QuoteClick("viewBrkUpProceed", "#premium-brkup .rec-plan-btn");
	calc_globalevent.evnt.QuoteClick("ebiCheck", ".up-sec .new label");
	calc_globalevent.evnt.QuoteClick("docList", ".doc-handy-text .doc-list");
	calc_globalevent.evnt.QuoteClick("docListBtn", "#handy-doc button");
	calc_globalevent.evnt.QuoteClick("deskPremClose", ".desk-prem-brk button");
	calc_globalevent.evnt.QuoteClick("deskFreqClose", ".quote-freq-modal .btn-close");
	calc_globalevent.evnt.QuoteClick("pptSliderBtn", ".ppt-container .ppt-desk-slider");
	calc_globalevent.evnt.QuoteClick("arrowToaster", ".arrow-toaster");
	calc_globalevent.evnt.QuoteClick("benefitEditIcon", ".edit-icon");
	calc_globalevent.evnt.QuoteClick("benefitaddOn", ".benefitaddOn");
	calc_globalevent.evnt.QuoteClick("CriticalIllnessPopupClose", "#CI-Cover .modal-header .close");
	calc_globalevent.evnt.QuoteClick("AccidentalDeathPopupClose", "#AD-Cover .modal-header .close");
	calc_globalevent.evnt.QuoteClick("Benefits", "input[name='radiobenefit']");
	calc_globalevent.evnt.QuoteClick("ClaimCornerBtn", ".claims-corner-bttn"); 
	calc_globalevent.evnt.QuoteClick("ClaimCornerPopUpClose", "#claimsCornerModal .modal-header .close");
	calc_globalevent.evnt.QuoteClick("ClaimCornerDeathClaim", "#home-tab"); 
	calc_globalevent.evnt.QuoteClick("ClaimCornerAccidentalSuicidalDeathClaim", "#profile-tab"); 
	calc_globalevent.evnt.QuoteClick("ClaimCornerCriticalillnessClaim", "#contact-tab"); 
	calc_globalevent.evnt.QuoteClick("ClaimCornerCall", ".claims-reach-block .tel a"); 
	calc_globalevent.evnt.QuoteClick("ClaimCornerEmail", ".claims-reach-block .mailto a");
	calc_globalevent.evnt.mouseup();
	if (!obj_used_flag.quoteJsLoad) {
		setDefaultValues(true);
		bountryCondition();
		ReasonToBuy();
		// DidYouKnow(); 
		// Validateamount(UserInput.sumAssured, UserInput, "lifeCover");
	}
	// JS start 07102022 

	// anas start 29-11-22
	// $('.dynamic_val_lc').on('click', function(e) {
	$('body').on( 'click', '.dynamic_val_lc', function (evt) {
		let drop_val_lc = $(this).attr("val");
		UserInput.sumAssured = drop_val_lc;
		UserInput.sumAssured = Validateamount(UserInput.sumAssured, UserInput, "lifeCover");
		let el_new = $(this).parents('.dropdown_suggestion_js').parent().find('.new_autosuggest_inp');
		el_new.val(parseInt(UserInput.sumAssured))
		$(this).parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.sumAssured)));
		$(this).parent().parent().parent().parent().parent().next().find(".lc-max-text-js").removeClass('d-none');
		$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
	});
	// $('.dynamic_val_ci').on('click', function(e) {
	$('body').on( 'click', '.dynamic_val_ci', function (evt) {
		evt.preventDefault();
		ciDefaultChanged = true;
		let drop_val_ci = $(this).attr("val");
		ciChangedValue = drop_val_ci;
		UserInput.Critical_Illness_Benefit = drop_val_ci;
		// UserInput.Critical_Illness_Benefit = Validateamount(UserInput.Critical_Illness_Benefit, UserInput, "CIAmount");
		let el_new = $(this).parents('.dropdown_suggestion_js').parent().find('.new_autosuggest_inp');
		
		$(this).parent().parent().parent().parent().parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
		$(this).parent().parent().parent().parent().parent().next().find(".lc-max-text-js").removeClass('d-none');
		$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
		el_new.val(setValFW(parseInt(UserInput.Critical_Illness_Benefit)));
		if (!$("#bene1, #bene3").is(":checked")){
			$("#bene1, #bene3").click();
		}
	});
	// $('.dynamic_val_adbr').on('click', function(e) {
	$('body').on( 'click', '.dynamic_val_adbr', function (evt) {
		evt.preventDefault();
		adbrDefaultChanged = true;
		let drop_val_adbr = $(this).attr("val");
		adbrChangedValue = drop_val_adbr;
		UserInput.Accidental_Death_Benefit = drop_val_adbr;
		// UserInput.Accidental_Death_Benefit = Validateamount(UserInput.Accidental_Death_Benefit, UserInput, "ADBAmount");
		let el_new = $(this).parents('.dropdown_suggestion_js').parent().find('.new_autosuggest_inp');
		el_new.val(setValFW(parseInt(UserInput.Accidental_Death_Benefit)));
		$(this).parent().parent().parent().parent().parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
		$(this).parent().parent().parent().parent().parent().next().find(".lc-max-text-js").removeClass('d-none');
		$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
		if (!$("#bene2, #bene4").is(":checked")){
			$("#bene2, #bene4").click();
		}
	});
	// anas end 29-11-22
	$('.dropdown_suggestion_js').on('hide.bs.dropdown', function () {
		// $(this).parent().find('.new_autosuggest_inp').blur();
	});
	$('.dropdown_suggestion_js').on('show.bs.dropdown', function () {
		$(this).parent().find('.new_autosuggest_inp').focus();
	});
	// JS end 07102022 
	// JS 11102022
	$("#claims-corner-modal-bttn").click(function (event) {
		if (!$(event.target).is(".close")) {
			$(this).parent().find(".close").trigger("click");
		}
		// console.log('close_clkd');
		$(this).hide();
	});
	$("[data-target='#claimsCornerModal']").on('click', function () {
		$("#claims-corner-modal-bttn").fadeIn(600);
	});
});
// code for number to words added by james 11-03-2022
function convertAllNumberToWords(num) {
	var ones = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
	var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
	// if((num = num.toString()).length > 9) return "Overflow: Maximum 9 digits supported";
	n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return;
	var str = "";
	str += n[1] != 0 ? (ones[Number(n[1])] || tens[n[1][0]] + " " + ones[n[1][1]]) + "Crore " : "";
	str += n[2] != 0 ? (ones[Number(n[2])] || tens[n[2][0]] + " " + ones[n[2][1]]) + "Lakhs " : "";
	str += n[3] != 0 ? (ones[Number(n[3])] || tens[n[3][0]] + " " + ones[n[3][1]]) + "Thousand " : "";
	str += n[4] != 0 ? (ones[Number(n[4])] || tens[n[4][0]] + " " + ones[n[4][1]]) + "Hundred " : "";
	str += n[5] != 0 ? (str != "" ? "and " : "") + (ones[Number(n[5])] || tens[n[5][0]] + " " + ones[n[5][1]]) : "";
	return str;
}
// End dropdown number to words added by james 11-03-2022
calc_globalevent.evnt.mouseup = function (e) {
	$(document).on("mouseup", function (e) {
		if (!$(".quote-freq-modal").is(e.target) && $(".quote-freq-modal").has(e.target).length === 0) {
			$(".quote-freq-modal").slideUp();
		}
		if (!$(".desk-prem-brk").is(e.target) && $(".desk-prem-brk").has(e.target).length === 0) {
			$(".desk-prem-brk").slideUp();
		}
	});
}
calc_globalevent.evnt.QuoteFocus = function (obj, objPrnt) {
	$(objPrnt).on("focus", function () {
		if (obj == "removePreFix") {
			var val = $(this).val();
			$(this).data('val', $(this).val());
			if (val.indexOf(" ") != -1) {
				$(this).val(setValWF(val));
			}
		} else if (obj == 'PolicyTermSelect' || obj == 'policyterm') {
			FireDataLayers_Calculator('PolicyTerm_Edit');
		}
		// added by JS 25092022
		// var per25 = (UserInput.sumAssured * 25) / 100;
		// var per50 = (UserInput.sumAssured * 50) / 100;
		// var per75 = (UserInput.sumAssured * 75) / 100;
		// var per100 = (UserInput.sumAssured * 100) / 100;
		// if(($(this).attr("id") === "new_autosuggest_adbr_rop") || ($(this).attr("id") === "new_autosuggest_adbr")) {
		// 	$('#dropdown_suggestion_abdr_rop, #dropdown_suggestion_abdr').html(`
		// 		<option class="dynamic_val dval3" value="${per25}" id="dynamic20">${per25}</option>
		// 		<option class="dynamic_val dval3" value="${per50}" id="dynamic21">${per50}</option>
		// 		<option class="dynamic_val dval3" value="${per75}" id="dynamic22">${per75}</option>
		// 		<option class="dynamic_val dval3" value="${per100}" id="dynamic23">${per100}</option>
		// 	`)
		// }
		// if(($(this).attr("id") === "new_autosuggest_ci_rop") || ($(this).attr("id") === "new_autosuggest_ci")) {
		// 	if(UserInput.sumAssured > 5000000) {
		// 		$('#dropdown_suggestion_ci_rop #dynamic14, #dropdown_suggestion_ci #dynamic14').show();
		// 	} else {
		// 		$('#dropdown_suggestion_ci_rop #dynamic14, #dropdown_suggestion_ci #dynamic14').hide();
		// 	}
		// }
		// if ($(this).parent().next().hasClass("dropdown_suggestion")) {
		//   $(this).parent().next().css("display", "block");
		//   val3 = removeprefixZero($(this).val());
		//   val3 = setValWF($(this).val());
		//   console.log('val3', parseInt(val3));
		//   $(this).val(parseInt(val3));
		// }
		// $(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
		console.log('focus val', val);
		// anas start 29-11-22
		$(this).next().find('.dropdown_suggestion').addClass('show');
		// anas start 31-1-23
		// if (UserInput.AnnualIncome == 400000 && UserInput.PlanType == "IB") {
		// 	$(this).next().find('.dropdown_suggestion').removeClass('show');
		// }
		// anas end 31-1-23
		$(this).parent().next().find(".lc-max-text-js > span").text(val);
		$(this).parent().next().find(".lc-max-text-js").removeClass("d-none");
		// anas end 29-11-22
		// JS end
	});
}
calc_globalevent.evnt.QuoteBlur = function (obj, objPrnt) {
	$(objPrnt).on("blur", function (e) {
		if (obj == 'lifeCover') {
			var val = removeprefixZero($(this).val());
			val = parseInt(setValWF($(this).val()));
			if (val != undefined) {
				UserInput.sumAssured = Validateamount(val, UserInput, "lifeCover");
				console.log('UserInput.sumAssured_new', UserInput.sumAssured);
				$(this).val(setValFW(UserInput.sumAssured));
				obj_dynamicDatalayer.sumAssured = setValWF($(this).data('val'));
				obj_dynamicDatalayer.highSumAssured = setValWF($(this).data('val'));
				UserInput.Accidental_Death_Benefit = Validateamount(UserInput.Accidental_Death_Benefit, UserInput, "ADBAmount");
				UserInput.Critical_Illness_Benefit = Validateamount(UserInput.Critical_Illness_Benefit, UserInput, "CIAmount");
				$("input[name='inp-prem']").val(setValFW(UserInput.sumAssured));
				$("input[name='inpadbr']").val(setValFW(UserInput.Accidental_Death_Benefit));
				$("input[name='inpci']").val(setValFW(UserInput.Critical_Illness_Benefit));
				$(".premVal_text").text(setValFW(UserInput.sumAssured));
				// $(".lc-max-else-content").removeClass('d-none');
				// anas start 29-11-22
				$(this).parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.sumAssured)));
				// anas end 29-11-22
				if (!obj_used_flag.covernote_edit && obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
					setTimeout(function () {
						let userInputsumAssured = parseInt(UserInput.sumAssured);
						let dynamicDatalayersumAssured = parseInt(obj_dynamicDatalayer.sumAssured);
						if (!obj_used_flag.stopfunctioncall && (userInputsumAssured != dynamicDatalayersumAssured)) {
							debugger
							if (userInputsumAssured > dynamicDatalayersumAssured) {
								let dynamicValue = userInputsumAssured - obj_dynamicDatalayer.sumAssured;
								FireDataLayers_Calculator("LifeCover_Increased_" + dynamicValue, dlsec.quoteScreen, "Life Cover Input");
							} else {
								let dynamicValue = dynamicDatalayersumAssured - userInputsumAssured;
								FireDataLayers_Calculator("LifeCover_Decreased_" + dynamicValue, dlsec.quoteScreen, "Life Cover Input");
							}
						}
						// anas start 29-11-22
						$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
						// anas end 29-11-22
					}, 500);
					if (calc_constants.MAX_SUMASSURED == 100000000) {
						$(".lc-max-content").removeClass("d-none");
					}
				}
			} else {
				val = setValWF(val);
				UserInput.sumAssured = Validateamount(val, UserInput, "lifeCover");
				obj_dynamicDatalayer.sumAssured = UserInput.sumAssured;
			}
			$("#max-else-content1, #max-else-content2, #max-else-content3").text(convertAllNumberToWords(UserInput.sumAssured));
			$(".regMonthText").text(addCommas(Math.round(UserInput.sumAssured / 60)));
			UserInput.monthlyIncome = $("input[name='incomePer']:checked").val();
			$('.large-lc-text').text($("input[name='incomePer']:checked").parent().find("label").text());
			var temp_monthlyValue = UserInput.monthlyIncome * UserInput.sumAssured;
			UserInput.monthlyIncomeLifeCover = temp_monthlyValue;
			// $('.small-lc-text1').text(temp_monthlyValue.toFixed(2));
			$('.small-lc-text1').text(temp_monthlyValue);
			$('.small-lc-text2').text(setValFW(12 * temp_monthlyValue));
			updateGraph();
			// anas start 29-11-22
			setTimeout(function () {
				dropdown_logic_adbr_SA_ci();
				$(".ci-max-else-content.lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
				$(".adbr-max-else-content.lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
				calc_globalevent.fn.QuoteFunction("CreateLumpsumDropDown", "");
			}, 500);
			// anas end 29-11-22
		} else if (obj == 'adbr') {
			obj_dynamicDatalayer.adbrValue = UserInput.Accidental_Death_Benefit;
			var adbVal = removeprefixZero($(this).val());
			console.log('adbVal_1', parseInt(adbVal));
			if (adbVal.indexOf(" ") != -1) {
				$(this).val(setValWF(parseInt(adbVal)));
				console.log('adbVal_if_1', parseInt(adbVal), UserInput.Accidental_Death_Benefit);
			} else {
				console.log('adbVal_if_2', parseInt(adbVal), UserInput.Accidental_Death_Benefit);
				$(this).val(parseInt(adbVal));
			}
			if ($(this).val() == "") $(this).val(UserInput.Accidental_Death_Benefit);
			if (parseInt(adbVal) != undefined && adbVal.indexOf(" ") == -1) {
				UserInput.Accidental_Death_Benefit = Validateamount(adbVal, UserInput, "ADBAmount");
				if (parseInt(adbVal) > 20000000) {
					$(".quote_form_ADBRbenefits_attext_error").show();
				}
			} else {
				adbVal = setValWF(adbVal);
				UserInput.Accidental_Death_Benefit = Validateamount(adbVal, UserInput, "ADBAmount");
			}
			UserInput.Accidental_Death_Benefit = Validateamount(adbVal, UserInput, "ADBAmount");
			// anas start 29-11-22
			// console.log('adbVal_2', parseInt(adbVal));
			// $(this).parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
			// $(this).parent().next().find(".lc-max-text-js").removeClass('done');
			// $(".adbr-max-else-content").removeClass('d-none');
			// $(".adbr-max-else-content > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
			// anas end 29-11-22
			$(this).val(setValFW(UserInput.Accidental_Death_Benefit));
			$("input[name='inpadbr']").val(setValFW(UserInput.Accidental_Death_Benefit));
			$(this).parent().next().find(".lc-max-text-js > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
			e.stopPropagation();
			if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr) {
				setTimeout(function () {
					var userInputAdbr = parseInt(UserInput.Accidental_Death_Benefit);
					var dynamicDatalayerAdbr = parseInt(obj_dynamicDatalayer.adbrValue);
					if (userInputAdbr != dynamicDatalayerAdbr) {
						if (userInputAdbr > dynamicDatalayerAdbr) {
							dynamicValue = userInputAdbr - dynamicDatalayerAdbr;
							FireDataLayers_Calculator("AddOn_Increased_" + dynamicValue, dlsec.quoteScreen, "Add-On Accidential Death Input");
						} else {
							dynamicValue = dynamicDatalayerAdbr - userInputAdbr;
							FireDataLayers_Calculator("AddOn_Decreased_" + dynamicValue, dlsec.quoteScreen, "Add-On Accidential Death Input");
						}
					}
					// anas start 29-11-22
					$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
					// anas end 29-11-22
				}, 500);
			}
			// anas start 13-1-23
			if (!obj_used_flag.prefillfunctioncall) {
				setTimeout(function () {
					calc_globalevent.fn.QuoteFunction("UpdatePremium");
				}, 1000);
			}
			// anas end 13-1-23
		} else if (obj == 'ci') {
			obj_dynamicDatalayer.ciValue = UserInput.Critical_Illness_Benefit;
			var ciVal = removeprefixZero($(this).val());
			if (ciVal.indexOf(" ") != -1) {
				$(this).val(setValWF(ciVal));
			}
			if ($(this).val() == "") $(this).val(UserInput.Critical_Illness_Benefit);
			var ciVal = removeprefixZero($(this).val());
			if (parseInt(ciVal) != undefined && ciVal.indexOf(" ") == -1) {
				// UserInput.Critical_Illness_Benefit = Validateamount(ciVal, UserInput, "CIAmount");
				if (parseInt(ciVal) > 10000000) {
					$(".quote_form_ADBRbenefits_attext_error").show();
				}
			} else {
				ciVal = setValWF(ciVal);
				// UserInput.Critical_Illness_Benefit = Validateamount(ciVal, UserInput, "CIAmount");
			}
			UserInput.Critical_Illness_Benefit = Validateamount(ciVal, UserInput, "CIAmount");
			$("input[name='inpci']").val(setValFW(UserInput.Critical_Illness_Benefit));
			// anas start 29-11-22
			// $(".ci-max-else-content").removeClass('d-none');
			if ((personality == "employee" && UserInput.staff == "Yes") && ciVal>1000000){
				// $(".ci-max-else-content > span").text("Offer is Valid only up to 10 Lakh");
				$(".ci-max-else-content").html(`<span
					id="ci-max-content1">Offer is Valid only up to 10 Lakh</span>`);
			}
			else {
				// $(".ci-max-else-content > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
				$(".ci-max-else-content").html(`<span
					id="ci-max-content1">${convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit))}</span> only`);
			}
			
			// anas end 29-11-22
			e.stopPropagation();
			if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr) {
				setTimeout(function () {
					var userInputCi = parseInt(UserInput.Critical_Illness_Benefit);
					var dynamicDatalayerCi = parseInt(obj_dynamicDatalayer.ciValue);
					if (userInputCi != dynamicDatalayerCi) {
						if (userInputCi > dynamicDatalayerCi) {
							dynamicValue = userInputCi - dynamicDatalayerCi;
							FireDataLayers_Calculator("AddOn_Increased_" + dynamicValue, dlsec.quoteScreen, "Add-On Critical Illness input");
						} else {
							dynamicValue = dynamicDatalayerCi - userInputCi;
							FireDataLayers_Calculator("AddOn_Decreased_" + dynamicValue, dlsec.quoteScreen, "Add-On Critical Illness input");
						}
					}
					// anas start 29-11-22
					$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
					// anas end 29-11-22
				}, 500);
			}
			// anas start 13-1-23
			if (!obj_used_flag.prefillfunctioncall) {
				setTimeout(function () {
					calc_globalevent.fn.QuoteFunction("UpdatePremium");
				}, 1000);
			}
			// anas end 13-1-23
		}
		// anas start 13-1-23
		// if(!obj_used_flag.prefillfunctioncall) {
		// 	setTimeout(function() {
		// 		calc_globalevent.fn.QuoteFunction("UpdatePremium");
		// 	}, 1000);
		// }
		// anas end 13-1-23
	});
	$(objPrnt).keyup(function () {
		if (obj == 'lifeCover') {
			var lc_val_lc = parseInt(removeprefixZero($(this).val()));
			lc_val_lc = Validateamount(lc_val_lc, UserInput, "LifeAmont");
			if ((lc_val_lc != undefined) && (lc_val_lc != '')) {
				$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
				$(".lc-max-else-content").removeClass('d-none');
				$(".lc-max-else-content > span").text(convertAllNumberToWords(lc_val_lc));
			} else if (lc_val_lc == '') {
				$(".lc-max-content").addClass("d-none");
				$(".lc-max-else-content").addClass("d-none");
			}
		} else if (obj == 'adbr') {
			var lc_val_adbr = parseInt(removeprefixZero($(this).val()));
			lc_val_adbr = Validateamount(lc_val_adbr, UserInput, "ADBAmount");
			if ((lc_val_adbr != undefined) && (lc_val_adbr != '')) {
				$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
				$(".adbr-max-else-content").removeClass('d-none');
				$(".adbr-max-else-content > span").text(convertAllNumberToWords(lc_val_adbr));
			} else if (lc_val_adbr == "") {
				$(".adbr-max-content").addClass("d-none");
				$(".adbr-max-else-content").addClass("d-none");
			}	
		} else if (obj == 'ci') {
			var lc_val_ci = parseInt(removeprefixZero($(this).val()));
			lc_val_ci = Validateamount(lc_val_ci, UserInput, "CIAmount");
			if ((lc_val_ci != undefined) && (lc_val_ci != '')) {
				$(".dropdown_suggestion_js .dropdown_suggestion").removeClass('show');
				$(".ci-max-else-content").removeClass('d-none');
				
				if ((personality == "employee" && UserInput.staff == "Yes") && lc_val_ci>1000000){
					// $(".ci-max-else-content > span").text("Offer is Valid only up to 10 Lakh");
					$(".ci-max-else-content").html(`<span
					id="ci-max-content1">Offer is Valid only up to 10 Lakh</span>`);

				}
				else {
					$(".ci-max-else-content").html(`<span
					id="ci-max-content1">${convertAllNumberToWords(lc_val_ci)}</span> only`);
					// $(".ci-max-else-content > span").text(convertAllNumberToWords(lc_val_ci));
				}
			} else if (lc_val_ci == '') {
				$(".ci-max-content").addClass("d-none");
				$(".ci-max-else-content").addClass("d-none");
			}	
		}
	});
}
calc_globalevent.evnt.QuoteChange = function (obj, objPrnt) {
	$(objPrnt).on("change", function () {
		if (obj == 'policyterm') {
			quoteSrnObj.incmPolcy = false;
			obj_dynamicDatalayer.lifeCoverduration = UserInput.term;
			UserInput.term = parseInt($(this).val());
			$(".quote_form_policyterm").text(UserInput.term + ' years');
			var paymenttermval = $("input[type=radio][name=paymentTerm]:checked").val();
			var PPT = "";
			if ($('#Whole_Life').is(':selected')) {
				cal_obj.maxPolicyTerm = 99;
				if (paymenttermval == "Regular_Pay" || paymenttermval == "Whole_Life_Regular_Pay") {
					paymenttermval = "Whole_Life_Regular_Pay";
					PPT = UserInput.term;
				} else if (paymenttermval == "Whole_Life_Limited_Pay_60_age") {
					paymenttermval = "Whole_Life_Limited_Pay_60_age";
					PPT = 60 - UserInput.age;
				} else {
					paymenttermval = "Whole_Life_Limited_Pay_10";
					PPT = 10;
				}
				$(".ppt-container .regular-limited").addClass("d-none");
				$(".ppt-container .wl-regular-limited").removeClass("d-none");
				$(".desk-cont .ppt-container").addClass("wholeLife-pdg");
				$(".ppt-insider").removeClass("ppt-class");
			} else {
				$(".ppt-container .wl-regular-limited").addClass("d-none");
				$(".ppt-container .regular-limited").removeClass("d-none");
				$(".desk-cont .ppt-container").removeClass("wholeLife-pdg");
				if (paymenttermval == "Whole_Life_Regular_Pay") {
					paymenttermval = "Regular_Pay";
					PPT = UserInput.term;
				} else if (paymenttermval == "Single_Pay") {
					paymenttermval = "Single_Pay";
				} else if (paymenttermval == "Whole_Life_Limited_Pay_10" || paymenttermval == "Whole_Life_Limited_Pay_60_age") {
					if (UserInput.term < 10) {
						paymenttermval = "Regular_Pay";
						PPT = UserInput.term;
					} else {
						paymenttermval = "Limited_Pay_5year";
						PPT = 5;
					}
				} else if (UserInput.term < 10 && (paymenttermval != "Regular_Pay" || paymenttermval != "Regular_Pay")) {
					paymenttermval = "Regular_Pay";
					PPT = UserInput.term;
				}
				glb_temp_policy = UserInput.term;
				cal_obj.maxPolicyTerm = 85;
			}
			if (paymenttermval != undefined && paymenttermval != "" && UserInput.premiumPaymentOption != paymenttermval) {
				$("input[type=radio][name=paymentTerm][value='" + paymenttermval + "']").prop("checked", true).change();
				UserInput.premiumPaymentOption = paymenttermval;
			}
			calc_globalevent.fn.Function("updateAllTerm", "");
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
			$(".PolicyTerm select").val(UserInput.term);
			if (!mobileView) {
				calc_globalevent.fn.QuoteFunction("pptSpace");
			}
			var userInputlifecover = parseInt(UserInput.term);
			var dynamicDatalayerlifecover = parseInt(obj_dynamicDatalayer.lifeCoverduration);
			if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.covernote_edit) {
				if (userInputlifecover != dynamicDatalayerlifecover) {
					// $(".policy-cover-cont .recommended").addClass("d-none");
					if (userInputlifecover > dynamicDatalayerlifecover) {
						var diffInTerm = userInputlifecover - dynamicDatalayerlifecover;
						FireDataLayers_Calculator("PolicyTerm_Increased_" + diffInTerm + "years", dlsec.quoteScreen, "Policy Term Dropdown");
					} else if (userInputlifecover < dynamicDatalayerlifecover) {
						var diffInTerm = dynamicDatalayerlifecover - userInputlifecover;
						FireDataLayers_Calculator("PolicyTerm_Decreased_" + diffInTerm + "years", dlsec.quoteScreen, "Policy Term Dropdown");
					}
				}
			}
			updateGraph();
			bountryCondition();
		} else if (obj == "Benefits") {
			if ($("#bene1, #bene3").is(":checked") && $("#bene2, #bene4").is(":checked")) {
				UserInput.Plan = 'AllInOne';
			} else if (!$("#bene1, #bene3").is(":checked") && $("#bene2, #bene4").is(":checked")) {
				UserInput.Plan = 'LifePlus';
			} else if ($("#bene1, #bene3").is(":checked") && !$("#bene2, #bene4").is(":checked")) {
				UserInput.Plan = 'LifenHealth';
			} else if (!$("#checkbox-1").is(":checked") && !$("#checkbox-2").is(":checked")) {
				UserInput.Plan = 'LifeAmont';
			}
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
			if (!mobileView) calc_globalevent.fn.QuoteFunction("pptSpace");
			// if(obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
			// 	// $(".policy-cover-cont .recommended").addClass("d-none");
			// 	// FireDataLayers_Calculator('AddOn_Selected', dlsec.quoteScreen);
			// 	if($(this).parent().hasClass("cibox")) {
			// 		($("#bene1, #bene3").is(":checked")) ? FireDataLayers_Calculator('CriticalIllness_Selected', dlsec.quoteScreen, "CriticalIllness_Checkbox_Checked"):FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "CriticalIllness_Checkbox_Unchecked");
			// 	} else if($(this).parent().hasClass("adbrbox")) {
			// 		($("#bene2, #bene4").is(":checked")) ? FireDataLayers_Calculator('AccidentalDeath_Selected', dlsec.quoteScreen, "AccidentalDeath_Checkbox_Checked"): FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "AccidentalDeath_Checkbox_Unchecked");
			// 	}
			// }
		} else if (obj == "payoutOption") {
			obj_dynamicDatalayer.payoutOptions = UserInput.PayoutOptions == "LumpsumIncome" ? "LRIncome" : UserInput.PayoutOptions == "IncreasingIncome" ? "IIncome" : UserInput.PayoutOptions == "RegularIncome" ? "RIncome" : UserInput.PayoutOptions;
			UserInput.PayoutOptions = $(this).val();
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
				// setTimeout(function () {
				// 	calc_globalevent.fn.QuoteFunction("UpdatePremium");
				// }, 500);
			}
			if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
				// $(".policy-cover-cont .recommended").addClass("d-none");
				FireDataLayers_Calculator('PayoutOption_Selected', dlsec.quoteScreen);
				var dymanicVar = UserInput.PayoutOptions == "LumpsumIncome" ? "LRIncome" : UserInput.PayoutOptions == "IncreasingIncome" ? "IIncome" : UserInput.PayoutOptions == "RegularIncome" ? "RIncome" : UserInput.PayoutOptions;
				var changeInPayoutOption = obj_dynamicDatalayer.payoutOptions + "To" + dymanicVar;
				FireDataLayers_Calculator("PayoutOption_" + changeInPayoutOption, dlsec.quoteScreen);
			}
		} else if (obj == "paymentOption") {
			obj_dynamicDatalayer.premiumPaymentOption = UserInput.premiumPaymentOption;
			UserInput.premiumPaymentOption = $(this).val();
			if (UserInput.premiumPaymentOption == "Single_Pay") {
				$("input[type=radio][name=frequency][value=yearly]").prop("checked", true);
				$("input[type=radio][name=frequency]").prop("disabled", true);
				// $("input[type=checkbox][name=radiobenefit][value=CI]").prop({
				// 	"checked": false,
				// 	"disabled": true
				// });
				UserInput.PaymentFrequency = "yearly";
				$(".frequency-cont a").text((UserInput.PaymentFrequency).charAt(0).toUpperCase() + (UserInput.PaymentFrequency).slice(1));
				// if(UserInput.term > 20) {
				// 	UserInput.term = Math.min(20, 75 - UserInput.age);
				// }
			} else {
				// $("input[type=checkbox][name=radiobenefit][value=CI]").prop("disabled", false);
				$("input[type=radio][name=frequency]").prop("disabled", false);
			}
			calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
			$('.ppt-insider .field-box').removeClass('activelink');
			$(this).parent().addClass('activelink');
			if ($(window).width() > 768) {
				if ($(this).parent().hasClass("Single_Pay")) {
					$('.ppt-slider').scrollLeft(0);
					// $('.ppt-insider .field-box').css('transform', 'translate3d(0px, 0px, 0px)');
				} else if ($(this).parent().hasClass("L_Pay_5") || $(this).parent().hasClass("L_Pay_7")) {
					// $('.ppt-insider .field-box').css('transform', 'translate3d(100px, 0px, 0px)');
					$('.ppt-slider').scrollLeft(0);
				} else if ($(this).parent().hasClass("L_Pay_10") || $(this).parent().hasClass("L_Pay_12") || $(this).parent().hasClass("L_Pay_15") || $(this).parent().hasClass("L_Pay_20") || $(this).parent().hasClass("R_Pay")) {
					// $('.ppt-insider .field-box').css('transform', 'translate3d(-300px, 0px, 0px)');
					$('.ppt-slider').scrollLeft(300);
				} else if ($(this).parent().hasClass("L_Pay_60_age") || $(this).parent().hasClass("L_Pay_term_5") || $(this).parent().hasClass("WR_Pay") || $(this).parent().hasClass("WL_Pay_10") || $(this).parent().hasClass("WL_Pay_60_age")) {
					// $('.ppt-insider .field-box').css('transform', 'translate3d(-600px, 0px, 0px)');
					$('.ppt-slider').scrollLeft(600);
				}
			} else {
				if ($(this).parent().hasClass("Single_Pay") || $(this).parent().hasClass("L_Pay_5")) {
					$('.ppt-slider').scrollLeft(0);
				} else if ($(this).parent().hasClass("L_Pay_7") || $(this).parent().hasClass("L_Pay_10")) {
					$('.ppt-slider').scrollLeft(275);
				} else if ($(this).parent().hasClass("L_Pay_12") || $(this).parent().hasClass("L_Pay_15")) {
					$('.ppt-slider').scrollLeft(550);
				} else if ($(this).parent().hasClass("L_Pay_20") || $(this).parent().hasClass("R_Pay")) {
					$('.ppt-slider').scrollLeft(825);
				} else if ($(this).parent().hasClass("L_Pay_60_age") || $(this).parent().hasClass("L_Pay_term_5") || $(this).parent().hasClass("WR_Pay") || $(this).parent().hasClass("WL_Pay_10") || $(this).parent().hasClass("WL_Pay_60_age")) {
					$('.ppt-slider').scrollLeft(1100);
				}
				// if ($(this).parent().hasClass("Single_Pay")) {
				// 	$('.ppt-insider .field-box').css('transform', 'translate3d(0px, 0px, 0px)');
				// } else if ($(this).parent().hasClass("L_Pay_5")) {
				// 	$('.ppt-insider .field-box').css('transform', 'translate3d(-5px, 0px, 0px)');
				// } else if ($(this).parent().hasClass("R_Pay")) {
				// 	$('.ppt-insider .field-box').css('transform', 'translate3d(-870px, 0px, 0px)');
				// } 
				// if($('.prem-return-header-wrap button.text-orange').hasClass('returnOfPremiumButton')){
				// 	if ($(this).parent().hasClass("L_Pay_7")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-200px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_10")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-300px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_12")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-500px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_15")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-675px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_20")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-700px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_60_age") || $(this).parent().hasClass("L_Pay_term_5") || $(this).parent().hasClass("WR_Pay") || $(this).parent().hasClass("WL_Pay_10") || $(this).parent().hasClass("WL_Pay_60_age")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-870px, 0px, 0px)');
				// 	}
				// } else {
				// 	if ($(this).parent().hasClass("L_Pay_7")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-115px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_10")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-75px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_12")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-145px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_15")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-145px, 0px, 0px)');
				// 	} else if ($(this).parent().hasClass("L_Pay_20")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-350px, 0px, 0px)');
				// 	}else if ($(this).parent().hasClass("L_Pay_60_age") || $(this).parent().hasClass("L_Pay_term_5") || $(this).parent().hasClass("WR_Pay") || $(this).parent().hasClass("WL_Pay_10") || $(this).parent().hasClass("WL_Pay_60_age")) {
				// 		$('.ppt-insider .field-box').css('transform', 'translate3d(-670px, 0px, 0px)');
				// 	}
				// }
			}
			setTimeout(() => {
				if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
					// $(".policy-cover-cont .recommended").addClass("d-none");
					FireDataLayers_Calculator('PaymentTerm_Selected', dlsec.quoteScreen, "PaymentTerm_Limited_Pay_Radio_Btn");
					var premiumPaymentOption = obj_dynamicDatalayer.premiumPaymentOption + "To" + UserInput.premiumPaymentOption;
					FireDataLayers_Calculator("PaymentTerm_" + premiumPaymentOption, dlsec.quoteScreen, "PaymentTerm_Limited_Pay_Radio_Btn");
				}
			}, 2000);
		} else if (obj == "lumpRegTerm") {
			var lumpsumAmount = $(this).val();
			$('.lumpRegdiv select').val(lumpsumAmount);
			var LumpsumAmt, LumpsumIncAmt;
			var lumpsumPer = $(this).find(":selected").attr("data-attr");
			UserInput.LumpsumPer = parseInt(lumpsumPer);
			UserInput.IncomePer = 100 - parseInt(lumpsumPer);
			LumpsumAmt = UserInput.sumAssured * (UserInput.LumpsumPer / 100);
			//LumpsumIncAmt = ((UserInput.sumAssured * (UserInput.IncomePer / 100)) / 10) / 12; //per month
			LumpsumIncAmt = (UserInput.sumAssured * (UserInput.IncomePer / 100)) / 60; //per month
			$('.regperM').html(addCommas(Math.round(LumpsumIncAmt)));
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
		} else if (obj == "wth_optin") {
			if ($(this).is(":checked")) {
				UserInput.whatsapp_optin = "Yes";
				$("input[name=wth_optin]").prop("checked", true);
			} else {
				UserInput.whatsapp_optin = "No";
				$("input[name=wth_optin]").prop("checked", false);
			}
			PrefillUserJson.whatsapp_optin = UserInput.whatsapp_optin;
			FireDataLayers_Calculator('WhatsAppQuote_Selected', dlsec.quoteScreen, "WhatsAppQuote_Checkbox");
		} else if (obj == "payoutYears") {
			UserInput.RetirementAge = $(this).val();
			//if($.inArray(UserInput.premiumPaymentOption, PPT_validate_JSON[UserInput.PlanType]) == -1) {
			calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
			// if(!obj_used_flag.prefillfunctioncall) {
			// 	calc_globalevent.fn.QuoteFunction("UpdatePremium");
			// }
			if (!obj_used_flag.prefillfunctioncall) {
				var temp_plan = UserInput.PlanType;
				if (UserInput.PlanType == "EROP-LS") {
					temp_plan = "EROP-LS-" + UserInput.RetirementAge;
				}
				let temp_paymentOpption = validatePPOption(temp_plan);
				UserInput.premiumPaymentOption = temp_paymentOpption;
				$('.ppt-insider .field-box').removeClass('activelink');
				$("input[type=radio][name=paymentTerm][value='" + UserInput.premiumPaymentOption + "']").prop("checked", true).parent().addClass('activelink');
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
			$(".retireementAge-txt").text(UserInput.RetirementAge);
		} else if (obj == "monthlyIncomePercentage") {
			UserInput.monthlyIncome = $(this).val();
			$('.large-lc-text').text($(this).parent().find("label").text());
			var temp_monthlyValue = UserInput.monthlyIncome * UserInput.sumAssured;
			UserInput.monthlyIncomeLifeCover = temp_monthlyValue;
			// $('.small-lc-text1').text(temp_monthlyValue.toFixed(2));
			$('.small-lc-text1').text(temp_monthlyValue);
			$('.small-lc-text2').text(setValFW(12 * temp_monthlyValue));
			calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
		} else if(obj == "ci"){
			ciDefaultChanged = true;
			ciChangedValue = Validateamount($(this).val(), UserInput, "CIAmount");
		} else if(obj == "adbr"){
			adbrDefaultChanged = true;
			adbrChangedValue = Validateamount($(this).val(), UserInput, "ADBAmount");
		}
	});
}



calc_globalevent.fn.QuoteFunction = function (fnName, param) {
	if (fnName == "createPolciyTermDropdown") {
		var minPolicyTerm = 5;
		var maxPolicyTerm = 40;
		var minMaturityAge = 65;
		var temp_policyterm_arr = [];
		if (UserInput.PlanType == "ROP") { //Pragati 18-08-2022
			if (UserInput.premiumPaymentOption == "Limited_Pay_5year") {
				minPolicyTerm = 10;
				minMaturityAge = 28;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_7year") {
				minPolicyTerm = 12;
				minMaturityAge = 30;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_10year") {
				minPolicyTerm = 15;
				minMaturityAge = 33;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_12year") {
				minPolicyTerm = 17;
				minMaturityAge = 35;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_15year") {
				minPolicyTerm = 20;
				minMaturityAge = 38;
			} else if (UserInput.premiumPaymentOption == "Single_Pay") {
				minPolicyTerm = 5;
				minMaturityAge = 23;
			} else if (UserInput.premiumPaymentOption == "Regular_Pay") {
				minPolicyTerm = 10;
				minMaturityAge = 28;
				// } else if(UserInput.premiumPaymentOption == "Limited_Pay_60_age") {
			} else {
				minPolicyTerm = 10;
				minMaturityAge = 65;
			}
		} else if (UserInput.PlanType == "EROP-LS") { //Pragati 18-08-2022
			if (parseInt(UserInput.RetirementAge) == 60) {
				minMaturityAge = 65;
				if (UserInput.premiumPaymentOption == "Limited_Pay_5year") {
					minPolicyTerm = 15;
				} else if (UserInput.premiumPaymentOption == "Limited_Pay_10year") {
					minPolicyTerm = 20;
				} else if (UserInput.premiumPaymentOption == "Limited_Pay_12year") {
					minPolicyTerm = 22;
				} else if (UserInput.premiumPaymentOption == "Limited_Pay_20year") {
					minPolicyTerm = 30;
				}
			} else { //Pragati 18-08-2022
				minMaturityAge = 75;
				if (UserInput.premiumPaymentOption == "Limited_Pay_12year") {
					minPolicyTerm = 27;
				} else if (UserInput.premiumPaymentOption == "Limited_Pay_20year") {
					minPolicyTerm = 35;
					// } else if(UserInput.premiumPaymentOption == "Limited_Pay_5year" || UserInput.premiumPaymentOption == "Limited_Pay_10year" || UserInput.premiumPaymentOption == "Limited_Pay_60_age") {
				} else {
					minPolicyTerm = 25;
				}
			}
		} else if (UserInput.PlanType == "ROP-LS") { //Pragati 18-08-2022
			minMaturityAge = 65;
			if (UserInput.premiumPaymentOption == "Limited_Pay_12year") {
				minPolicyTerm = 17;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_15year") {
				minPolicyTerm = 20;
				// } else if(UserInput.premiumPaymentOption == "Limited_Pay_5year" || UserInput.premiumPaymentOption == "Limited_Pay_7year" || UserInput.premiumPaymentOption == "Limited_Pay_10year" || UserInput.premiumPaymentOption == "Limited_Pay_60_age") {
			} else {
				minPolicyTerm = 15;
			}
		} else if (UserInput.PlanType == "IB") { //Pragati 18-08-2022
			if (UserInput.premiumPaymentOption == "Limited_Pay_7year") {
				minPolicyTerm = 12;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_10year") {
				minPolicyTerm = 15;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_12year") {
				minPolicyTerm = 17;
			} else if (UserInput.premiumPaymentOption == "Limited_Pay_15year") {
				minPolicyTerm = 20;
				// } else if(UserInput.premiumPaymentOption == "Limited_Pay_5year" || UserInput.premiumPaymentOption == "Limited_Pay_60_age") {
			} else {
				minPolicyTerm = 10;
			}
			if (UserInput.monthlyIncome == "0.003") {
				minMaturityAge = 65;
				temp_policyterm_arr = [65, 70, 75, 80, 85];
			} else if (UserInput.monthlyIncome == "0.002") {
				minMaturityAge = 70;
				temp_policyterm_arr = [70, 75, 80, 85];
			} else {
				minMaturityAge = 75;
				temp_policyterm_arr = [75, 80, 85];
			}
			if (quoteSrnObj.incmPolcy && parseInt(UserInput.age) >= 40) {
				minMaturityAge = 70;
			}
		}
		var htmldrp = "";
		// for(var i = minPolicyTerm; i <= maxPolicyTerm; i++) {
		// 	if(i == UserInput.term) {
		// 		htmldrp += '<option value="' + i + '" selected>' + i + ' years </option>';
		// 	} else {
		// 		htmldrp += '<option value="' + i + '">' + i + ' years </option>';
		// 	}
		// }
		var temp_min_policyterm = minMaturityAge - parseInt(UserInput.age);
		if (temp_min_policyterm <= 40) {
			var htmldrp = "";
			temp_min_policyterm = Math.max(temp_min_policyterm, minPolicyTerm)
			for (var i = temp_min_policyterm; i <= maxPolicyTerm; i++) {
				if (UserInput.PlanType == "IB") {
					if ($.inArray(i + parseInt(UserInput.age), temp_policyterm_arr) != -1) {
						htmldrp += '<option value="' + i + '">' + i + ' years </option>';
						// UserInput.term = i;
					}
				} else {
					htmldrp += '<option value="' + i + '">' + i + ' years </option>';
				}
			}
		}
		// if(UserInput.term < temp_min_policyterm && temp_min_policyterm <= 40){
		if (UserInput.term < temp_min_policyterm) {
			UserInput.term = temp_min_policyterm;
			calc_globalevent.fn.Function("updateAllTerm", "");
		}
		$('.form-group.PolicyTerm select').children().remove();
		$('.form-group.PolicyTerm select').html(htmldrp);
		if (quoteSrnObj.incmPolcy && $(".PlanType-IB").hasClass("text-orange")) {
			UserInput.term = parseInt($(".PolicyTerm select").val());
		} else {
			var term1 = parseInt($(".PolicyTerm select").val());
			var term2 = UserInput.term;
			$(".PolicyTerm select").val(UserInput.term)
			$(".PolicyTerm select").val() == null ? UserInput.term = term1 : UserInput.term = term2;
			$(".PolicyTerm select").val(UserInput.term);
		}
		updateGraph();
	} else if (fnName == "CreateLumpsumDropDown") {
		var perc = 0;
		var LumpsumAmt;
		var htmlstr = '';
		for (var i = 1; i <= 19; i++) {
			perc = perc + 5;
			LumpsumAmt = UserInput.sumAssured * (perc / 100);
			LumpsumAmt = Math.round(LumpsumAmt);
			if (i == 1) {
				htmlstr = '<option data-attr=' + perc + ' value=' + LumpsumAmt + '>' + setValFW(LumpsumAmt) + '</option>';
			} else if (i == 10) {
				htmlstr += '<option selected="true" data-attr=' + perc + ' value=' + LumpsumAmt + '>' + setValFW(LumpsumAmt) + '</option>';
			} else {
				htmlstr += '<option data-attr=' + perc + ' value=' + LumpsumAmt + '>' + setValFW(LumpsumAmt) + '</option>';
			}
		}
		$('.lumpRegdiv select').html(htmlstr);
		var percent = Math.round((UserInput.sumAssured / 100 * 50));
		if (UserInput.LumpsumPer != "" && UserInput.LumpsumPer != undefined && !isNaN(UserInput.LumpsumPer)) percent = (UserInput.sumAssured / 100 * UserInput.LumpsumPer);
		$('.lumpRegdiv select').val(percent).change();
	} else if (fnName == "UpdatePremium") {
		calc_globalevent.fn.Function("updateAllTerm", "");
		calc_globalevent.fn.QuoteFunction("UpdatePanel", true);
		var temp_resp = validatePlanType(UserInput);
		UserInput.PPT = calc_globalevent.fn.Function("PPTDisection", UserInput);
		if (UserInput.PPT == 1) {
			$(".discount-num").text("0.5");
		} else {
			$(".discount-num").text("0.7");
		}
		if (temp_resp.response == "success") {
			$("#loader-prem").show();
			ServiceGetPremium(UserInput, "", function (response) {
				setTimeout(function () {
					$("#loader-prem").hide();
				}, 1000);
				if (response.status == "Success") {
					Validation_Flag.serviceLoadFlag = true;
					OutputObjHold = response.OutputObjHold;
					$(".premiumPaymentTerm-error").addClass("d-none");
					$(window).width() > 768 ? $('.ppt-container').parent('.desk-cont').css({
						'background': '#FFFFFF',
						'border': '1.7846px solid #E6E6E6'
					}) : '';
					$('.quote-form-pmtext').text(addCommas(OutputObjHold.TotalPremium));
					$(".premium-error-hide").removeClass("d-none");
					$(".premium-error-show, .policyTerm-error").addClass("d-none");
					$(".rec-plan-btn").removeClass("disabled");
					AdbrCi();
					Glb_obj.Glb_Premium = OutputObjHold.TotalPremium;
					Glb_obj.Glb_ModalPremium = OutputObjHold.BasePremiumAmt;
					Glb_obj.Glb_premtax = OutputObjHold.PremiumAmt_withSTax;
					PrefillUserJson.Premium = OutputObjHold.TotalPremium;
					UserInput.Premium = OutputObjHold.TotalPremium;
					Validation_Flag.prem = true;
					// pushpendra start 10-01-23 
					var basePremWithoutTax = OutputObjHold.BasePremiumAmt;
					var basePremSTax1yr = Math.ceil((OutputObjHold.BasePremiumAmt * 4.50) / 100);
					var basePremSTax2yr = Math.ceil((OutputObjHold.BasePremiumAmt * 2.25) / 100);
					var pay_for = UserInput.PPT;
					var baseCIWithoutTax = OutputObjHold.BaseCIAmt;
					var baseCIWithTax = Math.ceil((OutputObjHold.BaseCIAmt * 18) / 100);
					var baseADBRWithoutTax = OutputObjHold.BaseADBR;
					var baseADBRWithTax = Math.ceil((OutputObjHold.BaseADBR * 18) / 100);
					// pushpendra start 29-11-22
					var temp_f = UserInput.PaymentFrequency == "monthly" ? 12 : UserInput.PaymentFrequency == "half-yearly" ? 2 : 1;
					var temp_yearlyIncome = UserInput.monthlyIncome * UserInput.sumAssured * 12;
					var temp_policyTillAge = parseInt(UserInput.age) + parseInt(UserInput.term);
					var basePremWithTax =
						(
							((basePremWithoutTax + basePremSTax1yr) * temp_f) +
							((basePremWithoutTax + basePremSTax2yr) * temp_f * (pay_for - 1))
							+
							((baseCIWithoutTax + baseCIWithTax + baseADBRWithoutTax + baseADBRWithTax) * temp_f * pay_for)
						)
					// var temp_totalPremiumPaid = (basePremWithTax * temp_f * UserInput.PPT);
					var temp_return = addCommas(Math.round(parseInt((parseInt(OutputObjHold.BasePremiumAmt) * temp_f) * parseInt(UserInput.PPT)) * 1.05));
					// var temp_return_income = (((((parseInt(UserInput.age) + parseInt(UserInput.term)) - 60) * UserInput.monthlyIncome * UserInput.sumAssured * 12) / ((60 - parseInt(UserInput.age)) * parseInt(OutputObjHold.BasePremiumAmt) * temp_f)) * 100).toFixed(2)
					// pushpendra end 10-01-23
					var temp_return_income = (((temp_yearlyIncome * (temp_policyTillAge - 60)) / basePremWithTax) * 100).toFixed(2)
					$('.fixed-premium-calculate').text("â‚¹" + temp_return); //for plans other than Income
					$('.fixed-premium-calculate-income').text(temp_return_income); //for Income 23-09-2022
					// pushpendra end 29-11-22
					CreateCookie();
				} else {
					if(response.error_msg == "Critical illness Benefit is not available under this payment term. Please choose different Premium Payment term to avail Critical illness benefit.") {
						$("#bene1, #bene3").prop('checked', false).change();
					}
					Validation_Flag.serviceLoadFlag = false;
					$(".premiumPaymentTerm-error").removeClass("d-none");
					$(window).width() > 768 ? $('.ppt-container').parent('.desk-cont').css({
						'background': '#F2F4F5',
						'border': 'none'
					}) : '';
					$(".premium-error-hide").addClass("d-none");
					$(".premium-error-show").text(response.error_msg).removeClass("d-none");
					$(".policyTerm-error").removeClass("d-none");
					$(".rec-plan-btn").addClass("disabled");
				}
			});
		} else {
			$("#loader-prem").hide();
			obj_used_flag.quote_webservice_respond = true;
			$(".premiumPaymentTerm-error").removeClass("d-none");
			$(window).width() > 768 ? $('.ppt-container').parent('.desk-cont').css({
				'background': '#F2F4F5',
				'border': 'none'
			}) : '';
			$(".premium-error-hide").addClass("d-none");
			$(".premium-error-show").text(temp_resp.error_msg).removeClass("d-none");
			$(".policyTerm-error").removeClass("d-none");
			$(".rec-plan-btn").addClass("disabled");
		}
		// DidYouKnow();
	} else if (fnName == "UpdatePanel") {
		PrefillUserJson = JSON.parse(JSON.stringify(UserInput));
		PrefillUserJson.Nominee = {
			'gender': Glb_obj.Glb_NomineeGender,
			'relation': Glb_obj.Glb_NomineeRelation
		};
		var UpdatePanelInput = jQuery.extend(true, {}, UserInput);
		var payment_option = "RP";
		var payment_obj = RL_Pay_json;
		var temp_obj = {
			"total_hit": 0,
			"webservice_respond": 0
		}
		/* CI ADB premium calculation */
		var temp_resp = validatePlanType(UserInput);
		if (temp_resp.response == "success") {
			var AllInOneInput = JSON.parse(JSON.stringify(UserInput));
			// console.log('AllInOneInput', AllInOneInput);

			AllInOneInput.Plan = "LifenHealth";
			var AllInOne_OutputObjHold;
			ServiceGetPremium(AllInOneInput, "", function (response) {
				// console.log('response', response);
				// console.log('response.status', response.status);

				if (response.status == "Success") {
                    $("#bene1, #bene3").prop("disabled", false);
					if(CIStatus){
						// $("#bene1").prop("checked",true)
                        $("#bene1").click()
					}else{
						$("#bene1").prop("checked",false)
					}
					console.log('ci', response);
					AllInOne_OutputObjHold = response.OutputObjHold;
					//if (!AllInOne_OutputObjHold.error) {
					var ciVal = AllInOne_OutputObjHold.BaseCIAmt + AllInOne_OutputObjHold.CIWithSTax;
					//var adbrVal = AllInOne_OutputObjHold.BaseADBR + AllInOne_OutputObjHold.ADBRateWithSTax;
					if (isNaN(ciVal)) {
						Glb_obj.Glb_ciPremium = "";
					} else {
						Glb_obj.Glb_ciPremium = ciVal;
						$(".ciWithTaxPremium").text(addCommas(ciVal) + " / " + obj_used_flag.freqText);
						$(".ci-amount").text(setValFW(UserInput.Critical_Illness_Benefit));
						if (UserInput.premiumPaymentOption == "Regular_Pay") {
							$(".ben-text-ci").text(Math.min(parseInt(UserInput.term), 85 - UserInput.age, 40)); //Pragati 18-08-2022
						} else {
							$(".ben-text-ci").text(Math.min(parseInt(UserInput.term), 15));
						}
						if (UserInput.premiumPaymentOption == "Limited_Pay_12year" || UserInput.premiumPaymentOption == "Limited_Pay_15year" || UserInput.premiumPaymentOption == "Limited_Pay_20year") { //Pragati 18-08-2022
							$("#bene1, #bene3").prop("checked", false);
							$("#bene1, #bene3").prop("disabled", true);
						}
					}
				} else {
					if ($("#bene1, #bene3").is(":checked")) {
						$("#bene1, #bene3").prop("checked", false);
						if (UserInput.Plan == "AllInOne") {
							UserInput.Plan = "LifePlus";
						} else {
							UserInput.Plan = "LifeAmont"
						}
					}
					$("#bene1, #bene3").prop("disabled", true);
					$(".premium-error-show").text(response.error_msg).removeClass("d-none");
				}
			});

			AllInOneInput.Plan = "LifePlus";
			ServiceGetPremium(AllInOneInput, "", function (response) {
				if (response.status == "Success") {
					$("#bene2, #bene4").prop("disabled", false);
					AllInOne_OutputObjHold = response.OutputObjHold;
					var adbrVal = AllInOne_OutputObjHold.BaseADBR + AllInOne_OutputObjHold.ADBRateWithSTax;
					if (isNaN(adbrVal)) {
						Glb_obj.Glb_adbPremium = "";
					} else {
						Glb_obj.Glb_adbPremium = adbrVal;
						$(".adbWithTaxPremium").text(addCommas(adbrVal) + " / " + obj_used_flag.freqText);
						$(".ben-text-adbr").text(Math.min(parseInt(UserInput.term), 80 - UserInput.age, 40)); //Pragati 18-08-2022
					}
					//}
				} else {
					if ($("#bene2, #bene4").is(":checked")) {
						$("#bene2, #bene4").prop("checked", false);
						if (UserInput.Plan == "AllInOne") {
							UserInput.Plan = "LifenHealth";
						} else {
							UserInput.Plan = "LifeAmont"
						}
					}
					// anas start 28-11-22
					// $("#bene2, #bene4").prop("disabled", true);
					// anas end 28-11-22
				}
			});
		}
		/* CI ADB premium calculation */
		for (var key in payment_obj) {
			var temp_key = UpdatePanelInput.PlanType;
			if (temp_key == "EROP-LS") {
				temp_key = "EROP-LS-" + UserInput.RetirementAge;
			}
			UpdatePanelInput.premiumPaymentOption = payment_obj[key][0];
			UpdatePanelInput.PPT = key;
			if (UpdatePanelInput.PPT == "60_age") UpdatePanelInput.PPT = 60 - UpdatePanelInput.age;
			else if (UpdatePanelInput.PPT == "term_5") UpdatePanelInput.PPT = UpdatePanelInput.term - 5;
			else if (UpdatePanelInput.PPT == "RP" || UpdatePanelInput.PPT == "WRP") UpdatePanelInput.PPT = UpdatePanelInput.term;
			var temp_term = UpdatePanelInput.term;
			if (UpdatePanelInput.PPT == "1") {
				$('.' + payment_obj[key][4] + ' .quote_form_ppt').text("Once");
				UpdatePanelInput.PaymentFrequency = "yearly";
			} else {
				UpdatePanelInput.PaymentFrequency = UserInput.PaymentFrequency;
				$('.' + payment_obj[key][4] + ' .quote_form_ppt').text(UpdatePanelInput.PPT + " Years");
			}
			$('.' + payment_obj[key][4]).removeClass("d-none");
			// $('.' + payment_obj[key][4] + ' .save-percent').hide();
			var temp_resp = validatePlanType(UpdatePanelInput);
			// dynamic_obj_create[payment_obj[key][4]] = [];
			if (temp_resp.response == "success") {
				if ($.inArray(UpdatePanelInput.premiumPaymentOption, PPT_validate_JSON[temp_key]) != -1) {
					dynamic_obj_create[payment_obj[key][4]] = [];
					if (key == "60_age" && (UpdatePanelInput.PPT == 1 || UpdatePanelInput.PPT == 5 || UpdatePanelInput.PPT == 7 || UpdatePanelInput.PPT == 10 || UpdatePanelInput.PPT == 12 || UpdatePanelInput.PPT == 15)) {
						// dynamic_obj_create[payment_obj[key][4]][0] = "";
						// dynamic_obj_create[payment_obj[key][4]][1] = UpdatePanelInput.PPT;
						$('.' + payment_obj[key][4]).addClass("d-none");
					} else {
						ServiceGetPremium(UpdatePanelInput, key, function (response) {
							if (response.status == "Success") {
								var output_obj = response.OutputObjHold;
								dynamic_obj_create[payment_obj[response.key][4]][0] = output_obj.TotalPremium;
								dynamic_obj_create[payment_obj[response.key][4]][1] = response.PPT;
								$('.' + payment_obj[response.key][4] + ' .prem-amnt').text(addCommas(output_obj.TotalPremium));
								$('.' + payment_obj[response.key][4]).removeClass("d-none");
							} else {
								dynamic_obj_create[payment_obj[response.key][4]][0] = "";
								dynamic_obj_create[payment_obj[response.key][4]][1] = response.PPT;
								$('.' + payment_obj[response.key][4]).addClass("d-none");
							}
							temp_obj.webservice_respond += 1;
						});
					}
				} else {
					$('.' + payment_obj[key][4]).addClass("d-none");
				}
			} else {
				$('.' + payment_obj[key][4]).addClass("d-none");
			}
			UpdatePanelInput.term = temp_term;
		}
		/* Regular Limited pay premium calculation */
		calc_globalevent.fn.QuoteFunction("Premium_calculation", UpdatePanelInput);
		


		console.log('countest updatePanel', countupdatePanel++);

	} else if (fnName == "Premium_calculation") {
		var UpdatePanelInput = param;
		var payment_obj = RL_Pay_json;
		var temp_obj = {
			"total_hit": 0,
			"webservice_respond": 0
		}

		for (var key in payment_obj) {
			var temp_key = UpdatePanelInput.PlanType;
			if (temp_key == "EROP-LS") {
				temp_key = "EROP-LS-" + UserInput.RetirementAge;
			}
			UpdatePanelInput.premiumPaymentOption = payment_obj[key][0];

			UpdatePanelInput.PPT = key;
			if (UpdatePanelInput.PPT == "60_age") {
				UpdatePanelInput.PPT = 60 - UpdatePanelInput.age;
			} else if (UpdatePanelInput.PPT == "term_5") {
				UpdatePanelInput.PPT = UpdatePanelInput.term - 5;
			} else if (UpdatePanelInput.PPT == "RP" || UpdatePanelInput.PPT == "WRP") {
				UpdatePanelInput.PPT = UpdatePanelInput.term;
			}
			var temp_term = UpdatePanelInput.term;
			if (UpdatePanelInput.PPT == "1") {
				$('.' + payment_obj[key][4] + ' .quote_form_ppt').text("Once");
				UpdatePanelInput.PaymentFrequency = "yearly";
			} else {
				UpdatePanelInput.PaymentFrequency = UserInput.PaymentFrequency;
				$('.' + payment_obj[key][4] + ' .quote_form_ppt').text(UpdatePanelInput.PPT + " Years");
			}
			$('.' + payment_obj[key][4]).removeClass("d-none");
			var temp_resp = validatePlanType(UpdatePanelInput);
			if (temp_resp.response == "success") {
				if ($.inArray(UpdatePanelInput.premiumPaymentOption, PPT_validate_JSON[temp_key]) != -1) {
					dynamic_obj_create[payment_obj[key][4]] = [];
					if (key == "60_age" && (UpdatePanelInput.PPT == 1 || UpdatePanelInput.PPT == 5 || UpdatePanelInput.PPT == 7 || UpdatePanelInput.PPT == 10 || UpdatePanelInput.PPT == 12 || UpdatePanelInput.PPT == 15)) {
						$('.' + payment_obj[key][4]).addClass("d-none");
					} else {
						ServiceGetPremium(UpdatePanelInput, key, function (response) {
							if (response.status == "Success") {
								// anas start 1-12-22

								var output_obj = response.OutputObjHold;

								dynamic_obj_create[payment_obj[response.key][4]][0] = output_obj.TotalPremium;
								dynamic_obj_create[payment_obj[response.key][4]][1] = response.PPT;

								$('.' + payment_obj[response.key][4] + ' .prem-amnt').text(addCommas(output_obj.TotalPremium));
								$('.' + payment_obj[response.key][4]).removeClass("d-none");

								// var RegularTotalPremium = UpdatePanelInput.PlanType === 'ROP' ? dynamic_obj_create["R_Pay"][0] : 0;

								var PPT = dynamic_obj_create[payment_obj[response.key][4]][1];
								var limited_total_prem = dynamic_obj_create[payment_obj[response.key][4]][0];
								var KeyNew = 0;
								if (UpdatePanelInput.PlanType !== 'ROP') {
									for (var key1 in dynamic_obj_create) {
										delete dynamic_obj_create['R_Pay']
										delete dynamic_obj_create['Single_Pay']
										if (key1 !== 'R_Pay' && key1 !== 'Single_Pay') {
											limited_total_prem = dynamic_obj_create[key1][1];
											KeyNew = Math.max(limited_total_prem, KeyNew)
										}
									}
								}
								// var frequency = '';
								// var largestLimitedPayPremium = UpdatePanelInput.PlanType !== 'ROP' && key1 !== 'R_Pay' && key1 !== 'Single_Pay' ? dynamic_obj_create[key1][0] : 0; //just for limited pay

								// UpdatePanelInput.PaymentFrequency == 'monthly' ? frequency = 12 : UpdatePanelInput.PaymentFrequency == 'half-yearly' ? frequency = 2 : frequency = 1;
								// var RegularYTotalPremium = (UpdatePanelInput.PlanType === 'ROP' ? RegularTotalPremium : largestLimitedPayPremium) * UpdatePanelInput.term * frequency;
								// var limited_total_prem_new = dynamic_obj_create[payment_obj[response.key][4]][0];
								// var limitTotalPrem = (limited_total_prem_new * PPT * frequency);
								// PremiumSave = RegularYTotalPremium - limitTotalPrem;
								// attrValue = Math.round((PremiumSave / RegularYTotalPremium) * 100);

								// var prem_without_tax_lp = UpdatePanelInput.PlanType !== 'ROP' && key1 !== 'R_Pay' && key1 !== 'Single_Pay' ? dynamic_obj_create[key1][0] : 0;
								// var prem_without_tax_rp = RegularTotalPremium;
								// var prem_without_tax = OutputObjHold.BasePremiumAmt;  //(A)
								// var prem_payment_term = PPT;  //(B)
								// var prem_freq = UpdatePanelInput.PaymentFrequency == 'monthly' ? 12 : UpdatePanelInput.PaymentFrequency == 'half-yearly' ? 2 : 1;   //(C)

								// var basePremWithoutTax = output_obj.BasePremiumAmt;
								// var basePremiumAmt_withSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// var basePremiumAmt_withSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// var prem_freq = UpdatePanelInput.PaymentFrequency == 'monthly' ? 12 : UpdatePanelInput.PaymentFrequency == 'half-yearly' ? 2 : 1;
								// var prem_payment_term = PPT;
								// console.log('UserInput.PlanType', UserInput.PlanType);
								// console.log('prem_payment_term', prem_payment_term);

								// var baseCIWithoutTax = output_obj.BaseCIAmt;
								// var baseCIWithTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// var baseADBRWithoutTax = output_obj.BaseADBR;
								// var baseADBRWithTax = Math.ceil((output_obj.BaseADBR * 18) / 100);

								// if (UserInput.PlanType === "ROP") {
								// 	if (UserInput.term == prem_payment_term) {
								// 		storeBasePremium.basePremWithoutTax = output_obj.BasePremiumAmt;
								// 		storeBasePremium.basePremSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// 		storeBasePremium.basePremSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// 		storeBasePremium.basePremFreq = prem_freq;
								// 		storeBasePremium.basePPT = prem_payment_term;
								// 		storeBasePremium.baseCIAmt = output_obj.BaseCIAmt;
								// 		storeBasePremium.baseCIWithSTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// 		storeBasePremium.baseADBRAmt = output_obj.BaseADBR;
								// 		storeBasePremium.baseADBRWithSTax = Math.ceil((output_obj.BaseADBR * 18) / 100);
								// 	}
								// } else if (UserInput.PlanType === "IB") {
								// 	var base = 60 - UserInput.age;
								// 	if (base == prem_payment_term) {
								// 		storeBasePremium.basePremWithoutTax = output_obj.BasePremiumAmt;
								// 		storeBasePremium.basePremSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// 		storeBasePremium.basePremSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// 		storeBasePremium.basePremFreq = prem_freq;
								// 		storeBasePremium.basePPT = prem_payment_term;
								// 		storeBasePremium.baseCIAmt = output_obj.BaseCIAmt;
								// 		storeBasePremium.baseCIWithSTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// 		storeBasePremium.baseADBRAmt = output_obj.BaseADBR;
								// 		storeBasePremium.baseADBRWithSTax = Math.ceil((output_obj.BaseADBR * 18) / 100);
								// 	}
								// } else if (UserInput.PlanType === "ROP-LS") {
								// 	var base = 60 - UserInput.age;
								// 	if (base == prem_payment_term) {
								// 		storeBasePremium.basePremWithoutTax = output_obj.BasePremiumAmt;
								// 		storeBasePremium.basePremSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// 		storeBasePremium.basePremSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// 		storeBasePremium.basePremFreq = prem_freq;
								// 		storeBasePremium.basePPT = prem_payment_term;
								// 		storeBasePremium.baseCIAmt = output_obj.BaseCIAmt;
								// 		storeBasePremium.baseCIWithSTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// 		storeBasePremium.baseADBRAmt = output_obj.BaseADBR;
								// 		storeBasePremium.baseADBRWithSTax = Math.ceil((output_obj.BaseADBR * 18) / 100);
								// 	}
								// } else if (UserInput.PlanType === "EROP-LS") {
								// 	// var base = 20;
								// 	if (UserInput.RetirementAge == 60 && prem_payment_term == 20) {
								// 		storeBasePremium.basePremWithoutTax = output_obj.BasePremiumAmt;
								// 		storeBasePremium.basePremSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// 		storeBasePremium.basePremSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// 		storeBasePremium.basePremFreq = prem_freq;
								// 		storeBasePremium.basePPT = prem_payment_term;
								// 		storeBasePremium.baseCIAmt = output_obj.BaseCIAmt;
								// 		storeBasePremium.baseCIWithSTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// 		storeBasePremium.baseADBRAmt = output_obj.BaseADBR;
								// 		storeBasePremium.baseADBRWithSTax = Math.ceil((output_obj.BaseADBR * 18) / 100);
								// 	}
								// } else if (UserInput.PlanType === "EROP-LS") {
								// 	var base = 60 - UserInput.age;
								// 	if (UserInput.RetirementAge == 70 && base == prem_payment_term) {
								// 		storeBasePremium.basePremWithoutTax = output_obj.BasePremiumAmt;
								// 		storeBasePremium.basePremSTax1yr = Math.ceil((output_obj.BasePremiumAmt * 4.50) / 100);
								// 		storeBasePremium.basePremSTax2yr = Math.ceil((output_obj.BasePremiumAmt * 2.25) / 100);
								// 		storeBasePremium.basePremFreq = prem_freq;
								// 		storeBasePremium.basePPT = prem_payment_term;
								// 		storeBasePremium.baseCIAmt = output_obj.BaseCIAmt;
								// 		storeBasePremium.baseCIWithSTax = Math.ceil((output_obj.BaseCIAmt * 18) / 100);
								// 		storeBasePremium.baseADBRAmt = output_obj.BaseADBR;
								// 		storeBasePremium.baseADBRWithSTax = Math.ceil((output_obj.BaseADBR * 18) / 100);
								// 	}
								// }
								// console.log('output_obj', output_obj);

								// console.log(
								// 	'storeBasePremium.basePremWithoutTax', storeBasePremium.basePremWithoutTax, 'storeBasePremium.basePremSTax1y', storeBasePremium.basePremSTax1yr,
								// 	'storeBasePremium.basePremFreq', storeBasePremium.basePremFreq,
								// 	'storeBasePremium.basePremWithoutTax', storeBasePremium.basePremWithoutTax, 'storeBasePremium.basePremSTax2yr', storeBasePremium.basePremSTax2yr,
								// 	'storeBasePremium.basePPT', storeBasePremium.basePPT,
								// 	'storeBasePremium.baseCIAmt', storeBasePremium.baseCIAmt,
								// 	'storeBasePremium.baseCIWithSTax', storeBasePremium.baseCIWithSTax,
								// 	'storeBasePremium.baseADBRAmt', storeBasePremium.baseADBRAmt,
								// 	'storeBasePremium.baseADBRWithSTax', storeBasePremium.baseADBRWithSTax
								// );

								// var basePremWithTax =
								// 	(
								// 		((storeBasePremium.basePremWithoutTax + storeBasePremium.basePremSTax1yr) * storeBasePremium.basePremFreq) +
								// 		((storeBasePremium.basePremWithoutTax + storeBasePremium.basePremSTax2yr) * storeBasePremium.basePremFreq * (storeBasePremium.basePPT - 1))
								// 		+
								// 		((storeBasePremium.baseCIAmt + storeBasePremium.baseCIWithSTax + storeBasePremium.baseADBRAmt + storeBasePremium.baseADBRWithSTax) * storeBasePremium.basePremFreq * storeBasePremium.basePPT)
								// 	)
								// if (UserInput.PlanType === "ROP" && prem_payment_term == 1) {
								// 	var premWithTax = (
								// 		basePremWithoutTax + basePremiumAmt_withSTax1yr + baseCIWithoutTax + baseCIWithTax + baseADBRWithoutTax + baseADBRWithTax
								// 	)
								// 	// console.log('basePremiumAmt_withSTax2yr', basePremiumAmt_withSTax2yr);
								// } else {
								// 	var premWithTax = (
								// 		((basePremWithoutTax + basePremiumAmt_withSTax1yr) * prem_freq) +
								// 		((basePremWithoutTax + basePremiumAmt_withSTax2yr) * prem_freq * (prem_payment_term - 1)) +
								// 		((baseCIWithoutTax + baseCIWithTax + baseADBRWithoutTax + baseADBRWithTax) * prem_freq * prem_payment_term)
								// 	);
								// }

								// var save = basePremWithTax - premWithTax;
								// console.log('save', basePremWithTax, premWithTax);

								// var savePerc = ((basePremWithTax - premWithTax) / basePremWithTax) * 100;
								// console.log('savePerc', basePremWithTax, premWithTax, basePremWithTax);

								// console.log(
								// 	'basePremWithoutTax', basePremWithoutTax,
								// 	'basePremiumAmt_withSTax1yr', basePremiumAmt_withSTax1yr,
								// 	'basePremiumAmt_withSTax2yr', basePremiumAmt_withSTax2yr,
								// 	'prem_freq', prem_freq,
								// 	'prem_payment_term', prem_payment_term,
								// 	'baseCIWithoutTax', baseCIWithoutTax,
								// 	'baseCIWithTax', baseCIWithTax,
								// 	'baseADBRWithoutTax', baseADBRWithoutTax,
								// 	'baseADBRWithTax', baseADBRWithTax,
								// );

								// // console.log('basePremWithTax', basePremWithTax, 'premWithTax', premWithTax, 'UserInput.term', UserInput.term, 'save', save, 'savePerc', savePerc);


								// if (savePerc > 0) {
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent').removeClass('d-none');
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent span').html("Save &#8377;" + addCommas(Math.round(save)) + " (" + Math.round(savePerc) + "%)");
								// } else {
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent').addClass('d-none');
								// }
								// anas end 1-12-22
								
								// if(attrValue > 0) {
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent span').html("Save &#8377;" + addCommas(PremiumSave) + " (" + attrValue + "%)");
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent').show();
								// } else {
								// 	$('.' + payment_obj[response.key][4] + ' .save-percent').hide();
								// }
							} else {
								dynamic_obj_create[payment_obj[response.key][4]][0] = "";
								dynamic_obj_create[payment_obj[response.key][4]][1] = response.PPT;
								$('.' + payment_obj[response.key][4]).addClass("d-none");
							}
							temp_obj.webservice_respond += 1;
						});
					}
				} else {
					$('.' + payment_obj[key][4]).addClass("d-none");
				}
			} else {
				$('.' + payment_obj[key][4]).addClass("d-none");
			}
			UpdatePanelInput.term = temp_term;
		}
		console.log('countest Premium_calculation', countPremium_calculation++);
	} else if (fnName == "returnPPT") {
		var PPT = "";
		if (param.premiumPaymentOption == "Limited_Pay_5year") PPT = 5;
		else if (UserInput.premiumPaymentOption == "Limited_Pay_7year") PPT = 7;
		else if (UserInput.premiumPaymentOption == "Limited_Pay_10year") PPT = 10;
		else if (UserInput.premiumPaymentOption == "Limited_Pay_term_5_year") PPT = UserInput.term - 5;
		else if (UserInput.premiumPaymentOption == "Limited_Pay_60_age") PPT = 60 - UserInput.age;
		else if (UserInput.premiumPaymentOption == "Whole_Life_Limited_Pay_60_age") PPT = 60 - UserInput.age;
		else if (UserInput.premiumPaymentOption == "Whole_Life_Limited_Pay_10") PPT = 10;
		else if (UserInput.premiumPaymentOption == "Whole_Life_Regular_Pay") PPT = 99 - UserInput.age;
		else PPT = UserInput.term;
		return PPT;
	}
	//  else if(fnName == "pptSpace") {
	// 	if($('.ppt-insider .field-box.d-none').length > 5) {
	// 		$(".ppt-insider").css("justify-content", "space-evenly");
	// 	} else {
	// 		$(".ppt-insider").css("justify-content", "space-between");
	// 	}
	// }
}
calc_globalevent.evnt.QuoteClick = function (obj, objPrnt) {
	$(objPrnt).on("click", function (e) {
		if (obj == "proceedToAppform") {
			if (!$(this).hasClass("disabled")) {
				// if(Validation_Flag.premiumWithoutQuote && (!Validation_Flag.mob || !Validation_Flag.email)) {
				// 	$("#lead-optional-pop").modal("show");
				// 	$("input[name=mobileno].lead-optional-mobileno").val(UserInput.MobileNo).keyup().blur();
				// 	$("input[name=emailid].lead-optional-emailid").val(UserInput.EmailId).keyup().blur();
				// 	FireDataLayers_Calculator('PersonalDetails_PopUPOpen', dlsec.quoteScreen, 'Proceed');
				// } else {
				// 	if(Validation_Flag.premiumWithoutQuote) {
				// 		$("#lead-optional-pop").modal("hide");
				// 		if(obj_dynamicDatalayer.mobile && !obj_dynamicDatalayer.email) {
				// 			FireDataLayers_Calculator('EmailSubmitted_MandatoryPopUp', dlsec.leadOptEmail, 'Proceed');
				// 		} else if(obj_dynamicDatalayer.email && !obj_dynamicDatalayer.mobile) {
				// 			FireDataLayers_Calculator('LeadSubmitted_Mobile_MandatoryPopUp', dlsec.leadOptMob, 'Proceed');
				// 		} else if(!obj_dynamicDatalayer.mobile && !obj_dynamicDatalayer.email) {
				// 			FireDataLayers_Calculator('LeadSubmitted_MandatoryPopUp', dlsec.quoteScreen, 'Proceed');
				// 		}
				// 		if(Validation_Flag.mob) $(".whatsapp_optin.whats-quote").removeClass("d-none");
				// 		calc_globalevent.fn.Function("leadWs");
				// 	}
				// 	// else {
				// 	// 	FireDataLayers_Calculator('ProceedToApplication', dlsec.calFinal, 'Proceed');
				// 	// }
				// 	FireDataLayers_Calculator('ProceedToApplication', dlsec.calFinal, 'Proceed');
				// 	var LoadAppFormFiles_Interval = setInterval(function() {
				// 		// if(!$("#loader").is(":visible")) $("#loader").show();
				// 		// if (typeof UserDataJSON == "object" && typeof PopulateAppForm == "function" && typeof Messageorder_cust == "object" && typeof configFieldsInfo == "object") {
				// 		// 	clearInterval(LoadAppFormFiles_Interval);
				// 		// 	$("#loader").hide();
				// 		// 	if (UserInput.MobileNo != "" && UserInput.EmailId != "") {
				// 		// 		FireDataLayers_Calculator("ProceedToApplication");
				// 		// 	}
				// 		// 	proceedToAppform();
				// 		// 	LoadAppFormFiles = true;
				// 		// 	/* Calculator hide part */
				// 		// 	$(".cont-right-sec-3, .cont-right-layer").removeClass("active");
				// 		// 	$(".mainContainer, .cont-right-mob,.limited-tooltip").fadeOut();
				// 		// 	$(".cont-bg-top .cont-bg, header .quick-guide-box .guidemargin").hide();
				// 		// 	$('.quick-guide-box .languagedropdown,.ex-cust-toaster').hide();
				// 		// 	$(".pr-container,.pr-container-mob").fadeOut();
				// 		// 	if (mobileView) {
				// 		// 		// $("custom-application-form.mob-topview").css("margin-top","0");
				// 		// 		$(".header-flex").css('display', 'flex');
				// 		// 		$("custom-application-form .appNumDiv.for-appform-mobile .talkToExpert").hide();
				// 		// 	} else {
				// 		// 		$(".header-flex").css('display', 'flex');
				// 		// 	}
				// 		// 	/* Calculator hide part */
				// 		// 	//$(".cal-hide, header.header-cont").hide();
				// 		// }
				// 		if(typeof Prefill_Appform == "function" && typeof Messageorder == "object" && typeof configFieldsInfo == "object" && typeof initMessageOrder == "function" && typeof UpdateAnswer == "function" && typeof PopulateAppForm == "function" && typeof FireDataLayers_Calculator_Appform == "function") {
				// 			clearInterval(LoadAppFormFiles_Interval);
				// 			calc_to_appform_land();
				// 			$("#loader").hide();
				// 		}
				// 	})
				// }
				// anas 
				// if (obj == "proceedToAppform") {
				if ($("#EBI_Conscent").is(":checked")) {
					if (Validation_Flag.premiumWithoutQuote && (!Validation_Flag.mob || !Validation_Flag.email)) {
						$("#lead-optional-pop").modal("show");
						$("input[name=mobileno]").val(UserInput.MobileNo).keyup().blur();
						$("input[name=emailid]").val(UserInput.EmailId).keyup().blur();
						FireDataLayers_Calculator('PersonalDetails_PopUPOpen', dlsec.quoteScreen, 'Proceed');
					} else {
						if (Validation_Flag.premiumWithoutQuote) {
							$("#lead-optional-pop").modal("hide");
							if (obj_dynamicDatalayer.mobile && !obj_dynamicDatalayer.email) {
								FireDataLayers_Calculator('EmailSubmitted_MandatoryPopUp', dlsec.leadOptEmail, 'Proceed');
							} else if (obj_dynamicDatalayer.email && !obj_dynamicDatalayer.mobile) {
								FireDataLayers_Calculator('LeadSubmitted_Mobile_MandatoryPopUp', dlsec.leadOptMob, 'Proceed');
							} else if (!obj_dynamicDatalayer.mobile && !obj_dynamicDatalayer.email) {
								FireDataLayers_Calculator('LeadSubmitted_MandatoryPopUp', dlsec.quoteScreen, 'Proceed');
							}
							if (Validation_Flag.mob) $(".whatsapp_optin.whats-quote").removeClass("d-none");
							calc_globalevent.fn.Function("leadWs");
						}
						// else {
						// 	FireDataLayers_Calculator('ProceedToApplication', dlsec.calFinal, 'Proceed');
						// }
						FireDataLayers_Calculator('ProceedToApplication', dlsec.calFinal, 'Proceed');
						var LoadAppFormFiles_Interval = setInterval(function () {
							// if(!$("#loader").is(":visible")) $("#loader").show();
							// if (typeof UserDataJSON == "object" && typeof PopulateAppForm == "function" && typeof Messageorder_cust == "object" && typeof configFieldsInfo == "object") {
							// 	clearInterval(LoadAppFormFiles_Interval);
							// 	$("#loader").hide();
							// 	if (UserInput.MobileNo != "" && UserInput.EmailId != "") {
							// 		FireDataLayers_Calculator("ProceedToApplication");
							// 	}
							// 	proceedToAppform();
							// 	LoadAppFormFiles = true;
							// 	/* Calculator hide part */
							// 	$(".cont-right-sec-3, .cont-right-layer").removeClass("active");
							// 	$(".mainContainer, .cont-right-mob,.limited-tooltip").fadeOut();
							// 	$(".cont-bg-top .cont-bg, header .quick-guide-box .guidemargin").hide();
							// 	$('.quick-guide-box .languagedropdown,.ex-cust-toaster').hide();
							// 	$(".pr-container,.pr-container-mob").fadeOut();
							// 	if (mobileView) {
							// 		// $("custom-application-form.mob-topview").css("margin-top","0");
							// 		$(".header-flex").css('display', 'flex');
							// 		$("custom-application-form .appNumDiv.for-appform-mobile .talkToExpert").hide();
							// 	} else {
							// 		$(".header-flex").css('display', 'flex');
							// 	}
							// 	/* Calculator hide part */
							// 	//$(".cal-hide, header.header-cont").hide();
							// }
							// if(typeof Prefill_Appform == "function" && typeof Messageorder == "object" && typeof configFieldsInfo == "object" && typeof initMessageOrder == "function" && typeof UpdateAnswer == "function" && typeof PopulateAppForm == "function" && typeof FireDataLayers_Calculator_Appform == "function") {
							// 	clearInterval(LoadAppFormFiles_Interval);
							// 	calc_to_appform_land();
							// 	$("#loader").hide();
							// }
							if (typeof UserDataJSON == "object" && typeof PopulateAppForm == "function" && typeof Messageorder_cust == "object" && typeof configFieldsInfo == "object" && typeof convertNumberToWords == "function") {
								clearInterval(LoadAppFormFiles_Interval);
								$("#loader").hide();
								proceedToAppform();
								$('.application-form-main .icici-pru-logo .logo').attr('href', 'https://www.iciciprulife.com/term-insurance-plans/return-of-premium-term-plan.html?UID=1309')
								$('#Appform_Help .buy-policy-number').html('1800 267 9777')
								$(window).scrollTop(0);
								$(".ex-cust-toaster").fadeOut();
								// for hotjar landing page 5-12-22 start
								if (obj_used_flag.hotjarLoad == false) {
									window.hj = window.hj || function () { (hj.q = hj.q || []).push(arguments) };
									hj('event', 'iprop_afp');
									obj_used_flag.hotjarLoad = true;
								}
								// for hotjar landing page 5-12-22 end
							} else if (!$("#loader").is(":visible")) {
								$("#loader").show();
							}
						})
					}
				} else {
					$(".rec-plan-btn").addClass("disabled");
					$(".up-sec").addClass("suit_error");
					$(".up-sec .error").show();
				}
				// }
			}
		} else if (obj == "ebiCheck") {
			$(".rec-plan-btn").removeClass("disabled");
			$(".up-sec").removeClass("suit_error");
			$(".up-sec .error").hide();
		} else if (obj == "paymentFrequency") {
			obj_dynamicDatalayer.paymentfrequency = UserInput.PaymentFrequency;
			if (obj_dynamicDatalayer.paymentfrequency == "half-yearly") {
				obj_dynamicDatalayer.paymentfrequency = "6Months"
			}
			UserInput.PaymentFrequency = $("input[name='frequency']:checked").val();
			$(".frequency-cont a").text((UserInput.PaymentFrequency).charAt(0).toUpperCase() + (UserInput.PaymentFrequency).slice(1));
			(UserInput.PaymentFrequency == "yearly") ? obj_used_flag.freqText = "year" : (UserInput.PaymentFrequency == "monthly") ? obj_used_flag.freqText = "month" : obj_used_flag.freqText = "half-year";
			$(".frequency-text").text(obj_used_flag.freqText);
			calc_globalevent.fn.QuoteFunction("UpdatePremium");
			let dyVar = UserInput.PaymentFrequency == "half-yearly" ? "6Month" : UserInput.PaymentFrequency;
			let chgFreq = obj_dynamicDatalayer.paymentfrequency + "To" + dyVar;
			if ($(window).width() >= 768) {
				$(".quote-freq-modal").slideUp();
			}
			(mobileView) ? FireDataLayers_Calculator("PaymentFrequency_" + chgFreq, dlsec.quoteScreen, "Proceed") : FireDataLayers_Calculator("PaymentFrequency_" + chgFreq, dlsec.quoteScreen, "Save");
			$(".js_Frequency").text(UserInput.PaymentFrequency);
		} else if (obj == "frequencyPop") {
			if ($(window).width() <= 768) {
				$("#premium-freq").modal("show");
			} else {
				$(".quote-freq-modal").slideDown();
			}
			$("input[type=radio][name=frequency][value='" + UserInput.PaymentFrequency + "']").prop("checked", true);
		} else if (obj == "premiumBreakup") {
			$(".premium-brkup .freq-text").text(obj_used_flag.freqText);
			$(".premium-brkup .bs-prem .baseprem").text(addCommas(Glb_obj.Glb_ModalPremium + Glb_obj.Glb_premtax));
			$(".premium-brkup .ci-prem .quote_form_addbenefits_attextval").text(addCommas(Glb_obj.Glb_ciPremium));
			$(".premium-brkup .adbr-prem .quote_form_addbenefits_attextval").text(addCommas(Glb_obj.Glb_adbPremium));
			$(".premium-brkup .ci-prem, .premium-brkup .adbr-prem").addClass("d-none");
			if (UserInput.Plan == "AllInOne") {
				$(".premium-brkup .ci-prem, .premium-brkup .adbr-prem").removeClass("d-none");
			} else if (UserInput.Plan == "LifenHealth") {
				$(".premium-brkup .ci-prem").removeClass("d-none");
			} else if (UserInput.Plan == "LifePlus") {
				$(".premium-brkup .adbr-prem").removeClass("d-none");
			}
			if ($(window).width() <= 768) {
				$("#premium-brkup").modal("show");
			} else {
				$(".desk-prem-brk").slideDown();
			}
			FireDataLayers_Calculator('ViewBreakup_clicked', dlsec.viewBrkUp, 'View Break Up');
			FireDataLayers_Calculator('ViewBreakup_PopupOpen', dlsec.viewBrkUp, 'View Break Up');
		} else if (obj == "backToLead") {
			$(".quote-screen-page").css("display", "none");
			$(".section-sh").css("display", "block");
			if (mobileView) {
				$(".first-page-container").css("display", "block");
				$(".main-container").css("padding-bottom", "100px");
				$(".float-mob").css("display", "none");
			} else {
				$(".first-page-container").css("display", "flex");
			}
			$('#CI-Cover .modal-footer button').removeClass('ciAddOn ciAddoncss ciIncluded');
			obj_used_flag.btocalfp = false;
			obj_used_flag.benefitflag = true;
			FireDataLayers_Calculator("Back_Selected", dlsec.quoteScreen, "Back");
		} else if (obj == "prem-return-header") {
			if (!$(this).hasClass("text-orange") && !$(this).hasClass("disabled")) {
				// anas start
				$('#QuoteScreenSection .plan-content, .lifeStageCoverBlock, .income-graph-cover.mobile-remove, .maturity-graph-cover.mobile-remove, .early-graph-cover.mobile-remove, .rop-graph-cover.mobile-remove').removeClass('d-block');
				$('#QuoteScreenSection .prem-return-header button').removeClass('btn-primary text-orange');
				$('.expand-graph-container').removeClass('expand');
				$(this).addClass('btn-primary text-orange');
				UserInput.RetirementAge = "60";
				if ($(this).hasClass('returnOfPremiumButton')) {
					$('.returnOfPremiumBlock, .rop-graph-cover.mobile-remove').addClass('d-block');
					$('.rop-graph-cover.desktop-remove').removeClass('d-block');
					$('.rop-graph-cover.desktop-remove').addClass('d-none');
					$('.policy-cover-cont').addClass('mb-4');
					//$('#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').hide();
					//$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_7,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_15,#QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_60_age,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_term_5').hide();
					UserInput.PlanType = "ROP";
					UserInput.monthlyIncome = "0"
					dropdown_logic_adbr_SA_ci();
					FireDataLayers_Calculator("CustomisePlan_returnOfPremium", dlsec.quoteScreen, "Return Of Premium");
				} else if ($(this).hasClass('lifeStageCoverButton')) {
					$('.plan-content, .rop-graph-cover.mobile-remove, .income-graph-cover.mobile-remove, .maturity-graph-cover.mobile-remove, .early-graph-cover.mobile-remove').addClass('d-none');
					$('.returnOfPremiumBlock').addClass('d-none')
					$('.early-graph-cover.desktop-remove').removeClass("d-block");
					$('.lifeStageCoverBlock').addClass('d-block');
					$('.lifeStageCoverBlock-early').removeClass('d-none');
					$('.early-block.life-cover-cont.early-below').hide();
					if ($('.lifestagecovertabheaderwrap button.earlyRopBlock').hasClass('active')) {
						$('.policy-cover-cont').removeClass('mb-4');
						$('.maturity-block.expand-graph-container.maturity-below').hide();
						if ($(window).width() > 768) {
							if ($("input[name=payoutPer]:checked").parent().hasClass("Sixty_Years")) {
								$('.selectYear').text("at the age 60 on survival");
								if (UserInput.age < 35) {
									$('.early-graph-cover.Below35_60Years_Early').addClass("d-block");
								} else {
									$('.early-graph-cover.Above35_60Years_Early').addClass("d-block");
								}
							} else {
								$('.selectYear').text("at the age 70 on survival");
								if (UserInput.age < 35) {
									$('.early-graph-cover.Below35_70Years_Early').addClass("d-block");
								} else {
									$('.early-graph-cover.Above35_70Years_Early').addClass("d-block");
								}
							}
						}
						UserInput.PlanType = "EROP-LS";
						UserInput.RetirementAge = $("input[name=payoutPer]:checked").val();
						$(".retireementAge-txt").text(UserInput.RetirementAge);
						//updateGraph();
						if (!obj_used_flag.prefillfunctioncall) {
							FireDataLayers_Calculator("CustomisePlan_LifeStageCover", dlsec.quoteScreen, "Early Return Of Premiums");
						}
					} else if ($('.lifestagecovertabheaderwrap button.ropMaturityBlock ').hasClass('active')) {
						$('.policy-cover-cont').addClass('mb-4');
						$('.selectYear').text("after your policy term");
						if ($(window).width() > 768) {
							$('.maturity-graph-cover.mobile-remove').removeClass("d-block");
							if (UserInput.age < 35) {
								$('.maturity-graph-cover.Below35_Maturity').addClass("d-block");
							} else {
								$('.maturity-graph-cover.Above35_Maturity').addClass("d-block");
							}
						}
						UserInput.PlanType = "ROP-LS";
						FireDataLayers_Calculator("CustomisePlan_LifeStageCover", dlsec.quoteScreen, "Return Of Premiums");
					}
					//$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay, #QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').hide();
					//$('#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_7,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_15,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_60_age').show();
					// UserInput.Accidental_Death_Benefit = Validateamount(UserInput.Accidental_Death_Benefit, UserInput, "ADBAmount");
					// UserInput.Critical_Illness_Benefit = Validateamount(UserInput.Critical_Illness_Benefit, UserInput, "CIAmount");
					// $("input[name='inpadbr']").val(setValFW(UserInput.Accidental_Death_Benefit));
					// $(".adbr-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
					// $("input[name='inpci']").val(setValFW(UserInput.Critical_Illness_Benefit));
					// $(".ci-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
					dropdown_logic_adbr_SA_ci();
					UserInput.monthlyIncome = "0";
				} else {
					$('.plan-content, .lifeStageCoverBlock, .maturity-graph-cover.mobile-remove, .rop-graph-cover.mobile-remove, .early-graph-cover.mobile-remove').addClass('d-none');
					$('.policy-cover-cont').removeClass('mb-4');
					$('.incomeBlock, .income-graph-cover.mobile-remove').addClass('d-block');
					$('.income-graph-cover.desktop-remove').removeClass('d-block');
					$('.income-graph-cover.desktop-remove').addClass('d-none');
					//$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay, #QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').hide();
					//$('#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_7,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_15,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_60_age').show();
					UserInput.PlanType = "IB";
					UserInput.monthlyIncome = $("input[name='incomePer']:checked").val();
					$('.large-lc-text').text($("input[name='incomePer']:checked").parent().find("label").text());
					var temp_monthlyValue = UserInput.monthlyIncome * UserInput.sumAssured;
					UserInput.monthlyIncomeLifeCover = temp_monthlyValue;
					// $('.small-lc-text1').text(temp_monthlyValue.toFixed(2));
					$('.small-lc-text1').text(temp_monthlyValue);
					$('.small-lc-text2').text(setValFW(12 * temp_monthlyValue));
					dropdown_logic_adbr_SA_ci();
					FireDataLayers_Calculator("CustomisePlan_income", dlsec.quoteScreen, "Income");
				}
				UserInput.Accidental_Death_Benefit = Validateamount(UserInput.Accidental_Death_Benefit, UserInput, "ADBAmount");
				UserInput.Critical_Illness_Benefit = Validateamount(UserInput.Critical_Illness_Benefit, UserInput, "CIAmount");
				$("input[name='inpadbr']").val(setValFW(UserInput.Accidental_Death_Benefit));
				$(".adbr-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
				$("input[name='inpci']").val(setValFW(UserInput.Critical_Illness_Benefit));
				$(".ci-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
				//if($.inArray(UserInput.premiumPaymentOption, PPT_validate_JSON[UserInput.PlanType]) == -1) {
				if (!obj_used_flag.prefillfunctioncall) { //Pragati 18-08-2022
					var temp_plan = UserInput.PlanType;
					if (UserInput.PlanType == "EROP-LS") {
						temp_plan = "EROP-LS-" + UserInput.RetirementAge;
					}
					let temp_paymentOpption = validatePPOption(temp_plan);
					UserInput.premiumPaymentOption = temp_paymentOpption;
					$('.ppt-insider .field-box').removeClass('activelink');
					$("input[type=radio][name=paymentTerm][value='" + UserInput.premiumPaymentOption + "']").prop("checked", true).parent().addClass('activelink');
					calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
					calc_globalevent.fn.QuoteFunction("UpdatePremium");
				}
				ReasonToBuy();
				$(".retireementAge-txt").text(UserInput.RetirementAge);
				updateGraph();
			}
		} else if (obj == "ebi-button") {
			try {
				FireDataLayers_Calculator('EBI_Download');
				ReStructurePdtS("add");
				Service_PDF();
			} catch (e) { }
		}
		//  else if(obj == "payout-radio-cont") {
		// 	if($(this).parent().hasClass('Sixty_Years')) {
		// 		$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_7,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_15,#QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_60_age,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_term_5').hide();
		// 		$('#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').show();
		// 	} else {
		// 		$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_7,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_15,#QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_term_5').hide();
		// 		$('#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_60_age, #QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').show();
		// 	}
		// } 
		else if (obj == "lifestagecovertabheaderwrap") {
			if (!$(this).hasClass("active")) {
				//$('#QuoteScreenSection .ppt-slider .regular-limited.Single_Pay, #QuoteScreenSection .ppt-slider .regular-limited.R_Pay,#QuoteScreenSection .ppt-slider .regular-limited.L_Pay_20').hide();
				$('.early-block, .maturity-block, .income-graph-cover.mobile-remove, .maturity-graph-cover, .early-graph-cover, .rop-graph-cover.mobile-remove').removeClass('d-none d-block');
				$('.lifeStageCoverBlock .lifestagecovertabheaderwrap button').removeClass('active');
				$('.lifeStageCoverBlock .expand-graph-container').removeClass('expand')
				$(this).addClass('active');
				if ($(this).hasClass('ropMaturityBlock')) {
					$('.maturity-block.expand-graph-container.maturity-below').hide();
					$('.early-block.life-cover-cont.early-below').hide();
					$('.lifeStageCoverBlock .expand-graph-container').removeClass('expand')
					$('.maturity-block, .maturity-graph-cover').addClass('d-block');
					$('.early-block, .rop-graph-cover.mobile-remove, .income-graph-cover.mobile-remove, .early-graph-cover').addClass('d-none');
					$('.early-graph-cover.Below35_60Years_Early, .early-graph-cover.Above35_60Years_Early, .early-graph-cover.Above35_70Years_Early, .early-graph-cover.Below35_70Years_Early').removeClass("d-block");
					$('.maturity-graph-cover.Above35_Maturity, .maturity-graph-cover.Below35_Maturity').removeClass("d-block");
					$('.policy-cover-cont').addClass('mb-4');
					$('.selectYear').text("after your policy term");
					UserInput.PlanType = "ROP-LS";
					UserInput.RetirementAge = "0";
					FireDataLayers_Calculator("ROPAtMaturity_Selected", dlsec.quoteScreen, "Return Of Premiums");
					if ($(window).width() > 768) {
						if (UserInput.age < 35) {
							$('.maturity-graph-cover.Below35_Maturity').addClass("d-block");
						} else {
							$('.maturity-graph-cover.Above35_Maturity').addClass("d-block");
						}
					}
				} else {
					$('.lifeStageCoverBlock .expand-graph-container').removeClass('expand')
					$('.maturity-block.expand-graph-container.maturity-below').hide();
					$('.early-block, .early-graph-cover').addClass('d-block');
					$('.maturity-block, .rop-graph-cover.mobile-remove, .income-graph-cover.mobile-remove, .maturity-graph-cover').addClass('d-none');
					$('.early-graph-cover.Below35_60Years_Early, .early-graph-cover.Above35_60Years_Early, .early-graph-cover.Above35_70Years_Early, .early-graph-cover.Below35_70Years_Early').removeClass("d-block");
					$('.maturity-graph-cover.Above35_Maturity, .maturity-graph-cover.Below35_Maturity').removeClass("d-block");
					$('.policy-cover-cont').removeClass('mb-4');
					UserInput.PlanType = "EROP-LS";
					UserInput.RetirementAge = $("input[name=payoutPer]:checked").val();
					if (!obj_used_flag.prefillfunctioncall) {
						FireDataLayers_Calculator("EarlyROP_Selected", dlsec.quoteScreen, "Early Return Of Premiums");
					}
					if ($(window).width() > 768) {
						if ($("input[name=payoutPer]:checked").parent().hasClass("Sixty_Years")) {
							$('.selectYear').text("at the age 60 on survival");
							if (UserInput.age < 35) {
								$('.early-graph-cover.Below35_60Years_Early').addClass("d-block");
							} else {
								$('.early-graph-cover.Above35_60Years_Early').addClass("d-block");
							}
						} else {
							$('.selectYear').text("at the age 70 on survival");
							if (UserInput.age < 35) {
								$('.early-graph-cover.Below35_70Years_Early').addClass("d-block");
							} else {
								$('.early-graph-cover.Above35_70Years_Early').addClass("d-block");
							}
						}
					}
				}
				//if($.inArray(UserInput.premiumPaymentOption, PPT_validate_JSON[UserInput.PlanType]) == -1) {
				UserInput.Accidental_Death_Benefit = Validateamount(UserInput.Accidental_Death_Benefit, UserInput, "ADBAmount");
				UserInput.Critical_Illness_Benefit = Validateamount(UserInput.Critical_Illness_Benefit, UserInput, "CIAmount");
				$("input[name='inpadbr']").val(setValFW(UserInput.Accidental_Death_Benefit));
				$(".adbr-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Accidental_Death_Benefit)));
				$("input[name='inpci']").val(setValFW(UserInput.Critical_Illness_Benefit));
				$(".ci-max-text > span").text(convertAllNumberToWords(parseInt(UserInput.Critical_Illness_Benefit)));
				calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
				// if(!obj_used_flag.prefillfunctioncall) {
				// 	calc_globalevent.fn.QuoteFunction("UpdatePremium");
				// }
				if (!obj_used_flag.prefillfunctioncall) {
					var temp_plan = UserInput.PlanType;
					if (UserInput.PlanType == "EROP-LS") {
						temp_plan = "EROP-LS-" + UserInput.RetirementAge;
					}
					let temp_paymentOpption = validatePPOption(temp_plan);
					UserInput.premiumPaymentOption = temp_paymentOpption;
					$('.ppt-insider .field-box').removeClass('activelink');
					$("input[type=radio][name=paymentTerm][value='" + UserInput.premiumPaymentOption + "']").prop("checked", true).parent().addClass('activelink');
					calc_globalevent.fn.QuoteFunction("UpdatePremium");
				}
				$(".retireementAge-txt").text(UserInput.RetirementAge);
			}
		} else if (obj == "expandGraph") {
			$('.early-graph-cover, .income-graph-cover, .maturity-graph-cover, .rop-graph-cover').removeClass('d-block');
			$('.early-graph-cover, .income-graph-cover, .maturity-graph-cover, .rop-graph-cover').removeClass('d-none');
			// $(this).html("View Graph")
			if ($(this).parent().hasClass('expand')) {
				// $(this).html("View Graph")
				$(this).parent().removeClass('expand');
				if ($(this).hasClass('rop-button')) {
					$('.rop-graph-cover').addClass('d-none');
				} else if ($(this).hasClass('income-button')) {
					$('.income-graph-cover').addClass('d-none');
				} else if ($(this).hasClass('maturity-button')) {
					$('.maturity-graph-cover').addClass('d-none');
					$('.maturity-graph-cover.Above35_Maturity, .maturity-graph-cover.Below35_Maturity').addClass("d-none");
				} else if ($(this).hasClass('early-button')) {
					$('.early-graph-cover').addClass('d-none');
					$('.early-graph-cover.Below35_60Years_Early, .early-graph-cover.Above35_60Years_Early, .early-graph-cover.Below35_70Years_Early').addClass("d-none");
				}
			} else {
				// $(this).html("Hide Graph");
				$(this).parent().addClass('expand');
				if ($(this).hasClass('rop-button')) {
					$('.rop-graph-cover').addClass('d-block');
					FireDataLayers_Calculator("ReturnOfPremium_ViewGraph", dlsec.quote, "View Graph");
				} else if ($(this).hasClass('income-button')) {
					$('.income-graph-cover').addClass('d-block');
					FireDataLayers_Calculator("Income_ViewGraph", dlsec.quote, "View Graph");
				} else if ($(this).hasClass('maturity-button')) {
					$('.selectYear').text("after your policy term");
					if ($(window).width() <= 768) {
						if (UserInput.age < 35) {
							$('.maturity-graph-cover.Below35_Maturity').addClass("d-block");
						} else {
							$('.maturity-graph-cover.Above35_Maturity').addClass("d-block");
						}
					} else {
						$('.maturity-graph-cover').addClass('d-block');
					}
					FireDataLayers_Calculator("LifeStageCover_ViewGraph", dlsec.quote, "View Graph");
				} else if ($(this).hasClass('early-button')) {
					if ($(window).width() <= 768) {
						if ($("input[name=payoutPer]:checked").parent().hasClass("Sixty_Years")) {
							$('.selectYear').text("at the age 60 on survival");
							if (UserInput.age < 35) {
								$('.early-graph-cover.Below35_60Years_Early').addClass("d-block");
							} else {
								$('.early-graph-cover.Above35_60Years_Early').addClass("d-block");
							}
						} else {
							$('.selectYear').text("at the age 70 on survival");
							if (UserInput.age < 35) {
								$('.early-graph-cover.Below35_70Years_Early').addClass("d-block");
							} else {
								$('.early-graph-cover.Above35_70Years_Early').addClass("d-block");
							}
						}
					} else {
						$('.early-graph-cover').addClass('d-block');
					}
					FireDataLayers_Calculator("LifeStageCover_ViewGraph", dlsec.quote, "View Graph");
				}
			}
		} else if (obj == 'payoutPer') {
			$('.early-graph-cover').removeClass("d-block d-none");
			$("input[name='payoutPer']").prop("checked", false);
			$(this).prop("checked", true);
			if ($(this).parent().hasClass("Sixty_Years")) {
				// $('.early-graph-calc .js_userAge60').text(60);
				// if($(window).width() <= 768) {
				$('.selectYear').text("at the age 60 on survival");
				if (UserInput.age < 35) {
					$('.early-graph-cover.Below35_60Years_Early').addClass("d-block");
					$('.early-graph-cover.Below35_60Years_Early').siblings('.expand-graph-container').addClass("expand");
				} else {
					$('.early-graph-cover.Above35_60Years_Early').addClass("d-block");
					$('.early-graph-cover.Above35_60Years_Early').siblings('.expand-graph-container').addClass("expand");
				}
				// }
			} else {
				// $('.early-graph-calc .js_userAge60').text(70);
				// if ($(window).width() <= 768){
				$('.selectYear').text("at the age 70 on survival");
				if (UserInput.age < 35) {
					$('.early-graph-cover.Below35_70Years_Early').addClass("d-block");
					$('.early-graph-cover.Below35_70Years_Early').siblings('.expand-graph-container').addClass("expand");
				} else {
					$('.early-graph-cover.Above35_70Years_Early').addClass("d-block");
					$('.early-graph-cover.Above35_70Years_Early').siblings('.expand-graph-container').addClass("expand");
				}
				// }
			}
			updateGraph();
		}
		// else if (obj == "optLeadProceed") {
		// 	if (Validation_Flag.mob && Validation_Flag.email) {
		// 		$("#lead-optional-pop").modal("hide");
		// 		if (Validation_Flag.mob) {
		// 			$(".whatsapp_optin.whats-quote").removeClass("d-none");
		// 		}
		// 		$(".rec-plan-btn").click();
		// 	}
		// } 
		else if (obj == "addOns" || obj == "editIcon") {
			e.preventDefault();
		} else if (obj == "includeAddOn") {
			if ($(this).hasClass("ciAddOn") && $(this).hasClass("ciAddOn")) {
				if (!$("#bene1, #bene3").is(":checked")) $("#bene1, #bene3").prop("checked", true).change();
				$("#CI-Cover").modal("hide");
				if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
					if ($('#bene1, #bene3').parent().hasClass("cibox")) {
						($("#bene1, #bene3").is(":checked")) ? FireDataLayers_Calculator('CriticalIllness_Selected', dlsec.quoteScreen, "CriticalIllness_Checkbox_Checked") : FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "CriticalIllness_Checkbox_Unchecked");
					}
				}
			} else if ($(this).hasClass("adbrAddOn")) {
				if ($("#bene2, #bene4").is(":checked")) FireDataLayers_Calculator("AccidentalDeathCover_Ok", dlsec.quote, "Ok");
				if (!$("#bene2, #bene4").is(":checked")) $("#bene2, #bene4").prop("checked", true).change();
				$("#AD-Cover").modal("hide");
				if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
					if ($('#bene2, #bene4').parent().hasClass("adbrbox")) {
						($("#bene2, #bene4").is(":checked")) ? FireDataLayers_Calculator('AccidentalDeath_Selected', dlsec.quoteScreen, "AccidentalDeath_Checkbox_Checked") : FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "AccidentalDeath_Checkbox_Unchecked");
					}
				}
			}
			if ($(this).hasClass("beneCi")) {
				$("#CI-Cover").modal("hide");
			}
		} else if (obj == "viewBrkUpProceed") {
			FireDataLayers_Calculator("ViewBreakup_Proceed", dlsec.viewBrkUp, "Proceed");
			$("#premium-brkup").modal("hide");
		} else if (obj == "docList") {
			FireDataLayers_Calculator("DocList_Clicked", dlsec.docList, "Keep these documents handy");
			FireDataLayers_Calculator("DocList_Opened", dlsec.docList, "Keep these documents handy");
		} else if (obj == "docListBtn") {
			let valueObj = calc_globalevent.fn.Function("findPopUpBtn", $(this));
			if (valueObj.flag) {
				FireDataLayers_Calculator("DocList_GotIt", dlsec.docList, valueObj);
			} else {
				FireDataLayers_Calculator("DocList_Closed", dlsec.docList, valueObj);
			}
		} else if (obj == "deskPremClose") {
			$(".desk-prem-brk").slideUp();
			FireDataLayers_Calculator("ViewBreakup_close", dlsec.viewBrkUp, "");
		} else if (obj == "deskFreqClose") {
			$(".quote-freq-modal").slideUp();
		} else if (obj == "pptSliderBtn") {
			$(".ppt-insider").addClass("ppt-class");
			if ($('.ppt-insider .field-box.d-none').length > 3) {
				$(".ppt-desk-slider.ppt-left,.ppt-desk-slider.ppt-right").removeClass("ppt-disabled");
				if ($(this).hasClass("ppt-right")) {
					quoteSrnObj.pptCounter = ++quoteSrnObj.pptCounter;
					if (quoteSrnObj.pptCounter == 1) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(-160px,0,0)").removeClass("adj-sldr");
						$(".ppt-desk-slider.ppt-left").removeClass("ppt-disabled");
						$(".ppt-desk-slider.ppt-right").addClass("ppt-disabled");
					}
				} else if ($(this).hasClass("ppt-left")) {
					quoteSrnObj.pptCounter = --quoteSrnObj.pptCounter;
					if (quoteSrnObj.pptCounter == 0) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(0,0,0)").removeClass("adj-sldr");
						$(".ppt-desk-slider.ppt-left").addClass("ppt-disabled");
						$(".ppt-desk-slider.ppt-right").removeClass("ppt-disabled");
					}
				}
			} else {
				$(".ppt-desk-slider.ppt-left,.ppt-desk-slider.ppt-right").removeClass("ppt-disabled");
				if ($(this).hasClass("ppt-right")) {
					quoteSrnObj.pptCounter = ++quoteSrnObj.pptCounter;
					if (quoteSrnObj.pptCounter == 1) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(-180px,0,0)");
						$(".ppt-desk-slider.ppt-left").removeClass("ppt-disabled");
					} else if (quoteSrnObj.pptCounter == 2) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(-340px,0,0)");
						$(".ppt-desk-slider.ppt-right").addClass("ppt-disabled");
					}
				} else if ($(this).hasClass("ppt-left")) {
					quoteSrnObj.pptCounter = --quoteSrnObj.pptCounter;
					if (quoteSrnObj.pptCounter == 0) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(0,0,0)");
						$(".ppt-desk-slider.ppt-left").addClass("ppt-disabled");
					} else if (quoteSrnObj.pptCounter == 1) {
						$(".ppt-insider.ppt-class").css("transform", "translate3d(-180px,0,0)");
						$(".ppt-desk-slider.ppt-right").removeClass("ppt-disabled");
					}
				}
			}
			calc_globalevent.fn.QuoteFunction("createPolciyTermDropdown", "");
			if (!obj_used_flag.prefillfunctioncall) {
				calc_globalevent.fn.QuoteFunction("UpdatePremium");
			}
		} else if (obj == "arrowToaster") {
			if ($(this).hasClass("in")) {
				$(".toaster-insider").slideUp();
				$(".arrow-toaster").addClass("out").removeClass("in");
				$(".toaster-arrow-img").css("transform", "rotate(180deg)");
				FireDataLayers_Calculator("Toaster_EC_PopupClose", dlsec.quoteScreen, '');
			} else if ($(this).hasClass("out")) {
				$(".toaster-insider").slideDown();
				$(".arrow-toaster").addClass("in").removeClass("out");
				$(".toaster-arrow-img").css("transform", "rotate(0deg)");
				FireDataLayers_Calculator("Toaster_EC_PopupOpen", dlsec.quoteScreen, '');
			}
		} else if (obj == "benefitEditIcon") {
			if ($(this).hasClass("edt-ci")) {
				$("input[name=inpci]").focus();
			} else if ($(this).hasClass("edt-adbr")) {
				$("input[name=inpadbr]").focus();
			} else if ($(this).hasClass("edt-lifeCover")) {
				$("input[name=inp-prem]").focus();
			}
			e.stopPropagation();
		} else if (obj == "benefitaddOn") {
			obj_used_flag.benefitflag = false;
			let benefitIcon = $(this).attr("addOns-attr");
			if (benefitIcon == "ci") {
				FireDataLayers_Calculator("CriticalIllness_Information", dlsec.quote, "CriticalIllness_Information_Icon");
				FireDataLayers_Calculator("CriticalIllness_PopupOpen", dlsec.quote);
				($("#bene1, #bene3").is(":checked")) ? $('#CI-Cover .modal-footer button').addClass('ciAddOn ciIncluded').removeClass("ciAddoncss") : $('#CI-Cover .modal-footer button').addClass('ciAddOn ciAddoncss').removeClass("ciIncluded");
			} else if (benefitIcon == "adbr") {
				FireDataLayers_Calculator("AccidentalDeath_Information", dlsec.quote, "AccidentalDeath_Information_Icon");
				FireDataLayers_Calculator("AccidentalDeath_PopupOpen", dlsec.quote);
				($("#bene2, #bene4").is(":checked")) ? $('#AD-Cover .modal-footer button').text("Ok") : $('#AD-Cover .modal-footer button').text("Include Add On");
			}
		} else if (obj == "GraphContent") {
			if ($(this).siblings(".graph-section").hasClass("aniDown") == true || $(this).parent().hasClass("aniDown") == true) {
				// $(this).siblings(".graph-section").removeClass("aniDown");
				$(this).parent().removeClass("aniDown");
				$(this).parent().siblings(".graphDownArrow").show();
			} else {
				$(this).siblings(".graph-section").addClass("aniDown");
				// $(this).parent().addClass("aniDown");
				$(this).hide();
			}
		} else if (obj == "CriticalIllnessPopupClose") {
			FireDataLayers_Calculator("CriticalIllness_PopupClose", dlsec.quote, "CriticalIllness_PopupClose_Icon");
		} else if (obj == "AccidentalDeathPopupClose") {
			FireDataLayers_Calculator("AccidentalDeath_PopupClose", dlsec.quote, "AccidentalDeath_PopupClose_Icon");
		} else if (obj == "Benefits") {
			if (obj_used_flag.nextscreenflag && obj_used_flag.secondLeadScr && !obj_used_flag.stopfunctioncall && !obj_used_flag.prefillfunctioncall) {
				if ($(this).parent().hasClass("cibox")) {
					if(CIStatus){
						CIStatus = false
					}else{
						CIStatus = true
					}
					($("#bene1, #bene3").is(":checked")) ? FireDataLayers_Calculator('AddOn_Selected', dlsec.quoteScreen, 'CriticalIllness_Checkbox_Checked') : FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "CriticalIllness_Checkbox_Unchecked");
				} else if ($(this).parent().hasClass("adbrbox")) {
					($("#bene2, #bene4").is(":checked")) ? FireDataLayers_Calculator('AddOn_Selected', dlsec.quoteScreen, 'AccidentalDeath_Checkbox_Checked') : FireDataLayers_Calculator('AddOn_Removed', dlsec.quoteScreen, "AccidentalDeath_Checkbox_Unchecked");
				}
			}
		} else if (obj == "ClaimCornerBtn") {
			FireDataLayers_Calculator("ClaimCorner_Selected", dlsec.quote, "Claim Corner Selected");
			FireDataLayers_Calculator("ClaimCorner_PopupOpen", dlsec.quote, "Claim Corner Pop Up Open");
		} else if (obj == "ClaimCornerPopUpClose") {
			FireDataLayers_Calculator("ClaimCorner_PopupClose", dlsec.quote, "Claim Corner Pop Up Close");
		} else if (obj == "ClaimCornerDeathClaim") {
			FireDataLayers_Calculator("DeathClaim_Selected", dlsec.quote, "Claim Corner Death Claim Selected");
		} else if (obj == "ClaimCornerAccidentalSuicidalDeathClaim") {
			FireDataLayers_Calculator("Accidental&SuicidalDeath_Selected", dlsec.quote, "Claim Corner Accidental & Suicidal Death Selected");
		} else if (obj == "ClaimCornerCriticalillnessClaim") {
			FireDataLayers_Calculator("CriticalillnessClaim_Selected", dlsec.quote, "Claim Corner Critical illness Claim Selected");
		} else if (obj == "ClaimCornerCall") {
			FireDataLayers_Calculator("Call_Selected", dlsec.quote, "Claim Corner Call Selected");
		} else if (obj == "ClaimCornerEmail") {
			FireDataLayers_Calculator("SendUsEmail_Selected", dlsec.quote, "Claim Corner Send Us Email Selected");
		}
	});
}
// function to get json for Premium and PDf services
function GetQuoteson(UserInput_copy) {
	var dob = UserInput_copy.dob.split("/");
	var dobPass = dob[2] + "-" + dob[1] + "-" + dob[0];
	var Selected_PlanToPass, CriticalIllnessBenefit, AccidentalDeathBenefit;
	if (UserInput_copy.Plan == "AllInOne" || UserInput_copy.Plan == "All in One") {
		Selected_PlanToPass = "All in One";
		CriticalIllnessBenefit = UserInput_copy.Critical_Illness_Benefit;
		AccidentalDeathBenefit = UserInput_copy.Accidental_Death_Benefit;
		// ADB_term  =  UserInput_copy.ADHBterm
	} else if (UserInput_copy.Plan == "LifenHealth" || UserInput_copy.Plan == "Life and Health") {
		Selected_PlanToPass = "Life and Health";
		AccidentalDeathBenefit = 0;
		CriticalIllnessBenefit = UserInput_copy.Critical_Illness_Benefit;
		// ADB_term  =  0;
	} else if (UserInput_copy.Plan == "LifePlus" || UserInput_copy.Plan == "Life Plus") {
		Selected_PlanToPass = "Life Plus";
		CriticalIllnessBenefit = 0;
		AccidentalDeathBenefit = UserInput_copy.Accidental_Death_Benefit;
		// ADB_term  =  UserInput_copy.ADHBterm;
	} else if (UserInput_copy.Plan == "LifeAmont" || UserInput_copy.Plan == "Life") {
		Selected_PlanToPass = "Life";
		AccidentalDeathBenefit = 0;
		CriticalIllnessBenefit = 0;
		// ADB_term  =  0;
	}
	var PayoutOptionsToPass, lumsum_pre;
	if (UserInput_copy.PayoutOptions == "RegularIncome" || UserInput_copy.PayoutOptions == "Income") {
		//LifeInsPremium = iProtectObject.Income_Annual_Premium;
		PayoutOptionsToPass = "Income";
		lumsum_pre = 0;
	} else if (UserInput_copy.PayoutOptions == "IncreasingIncome" || UserInput_copy.PayoutOptions == "Increasing Income") {
		//LifeInsPremium = iProtectObject.IncreasingIncome_Annual_Premium;
		PayoutOptionsToPass = "Increasing Income";
		lumsum_pre = 0;
	} else if (UserInput_copy.PayoutOptions == "LumpSum" || UserInput_copy.PayoutOptions == "Lump-Sum") {
		//LifeInsPremium = iProtectObject.LumpSum_Annual_Premium;
		PayoutOptionsToPass = "Lump-Sum";
		lumsum_pre = 0;
	} else if (UserInput_copy.PayoutOptions == "LumpsumIncome" || UserInput_copy.PayoutOptions == "Lump-Sum-Income") {
		//LifeInsPremium = iProtectObject.LumpsumIncome_Annual_Premium;
		PayoutOptionsToPass = "Lump-Sum-Income";
		lumsum_pre = UserInput_copy.LumpsumPer;
	}
	var ppt;
	var PremiumPaymentOptionToPass;
	UserInput.productId = "T63"; // var productcode = "T63";	// 07-10
	if (UserInput_copy.premiumPaymentOption == "Limited_Pay" || UserInput_copy.premiumPaymentOption == "Limited_Pay_5year" || UserInput_copy.premiumPaymentOption == "Limited_Pay_7year" || UserInput_copy.premiumPaymentOption == "Limited_Pay_10year" || UserInput_copy.premiumPaymentOption == "Limited_Pay_12year" || UserInput_copy.premiumPaymentOption == "Limited_Pay_15year" || UserInput_copy.premiumPaymentOption == "Limited_Pay_20year" || UserInput_copy.premiumPaymentOption == "Limited Pay") {
		PremiumPaymentOptionToPass = "Limited Pay";
	} else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Limited_Pay_60_age" || UserInput_copy.premiumPaymentOption == "Limited Whole life") {
		PremiumPaymentOptionToPass = "Limited Whole life";
	} else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Limited_Pay_10" || UserInput_copy.premiumPaymentOption == "Limited Whole life 10") {
		PremiumPaymentOptionToPass = "Limited Whole life 10";
	} else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_60_age" || UserInput_copy.premiumPaymentOption == "Limited Pay 60") {
		PremiumPaymentOptionToPass = "Limited Pay 60";
	} else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_term_5_year" || UserInput_copy.premiumPaymentOption == "Limited Pay Term") {
		PremiumPaymentOptionToPass = "Limited Pay Term";
	} else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Regular_Pay" || UserInput_copy.premiumPaymentOption == "Regular Whole life") {
		PremiumPaymentOptionToPass = "Regular Whole life";
	} else if (UserInput_copy.premiumPaymentOption == "Single_Pay" || UserInput_copy.premiumPaymentOption == "Single Pay") {
		PremiumPaymentOptionToPass = "Single Pay";
	} else {
		PremiumPaymentOptionToPass = "Regular Pay";
	}
	if (UserInput_copy.premiumPaymentOption == "Limited_Pay_5year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 5)) ppt = 5;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_7year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 7)) ppt = 7;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_10year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 10)) ppt = 10;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_12year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 12)) ppt = 12;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_15year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 15)) ppt = 15;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_20year" || (UserInput_copy.premiumPaymentOption == "Limited Pay" && UserDataJSON["productSelection"].premiumPayingTerm == 20)) ppt = 20;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_60_age" || UserInput_copy.premiumPaymentOption == "Limited Pay 60") ppt = 60 - UserInput_copy.age;
	else if (UserInput_copy.premiumPaymentOption == "Limited_Pay_term_5_year" || UserInput_copy.premiumPaymentOption == "Limited Pay Term") ppt = UserInput_copy.term - 5;
	else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Limited_Pay_10" || UserInput_copy.premiumPaymentOption == "Limited Whole life 10") ppt = 10;
	else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Limited_Pay_60_age" || UserInput_copy.premiumPaymentOption == "Limited Whole life") ppt = 60 - UserInput_copy.age;
	else if (UserInput_copy.premiumPaymentOption == "Whole_Life_Regular_Pay" || UserInput_copy.premiumPaymentOption == "Regular Whole life") ppt = 99 - UserInput_copy.age;
	else if (UserInput_copy.premiumPaymentOption == "Single_Pay" || UserInput_copy.premiumPaymentOption == "Single Pay") {
		ppt = 1;
		// PaymentfrequencyToPass = "Yearly";
		UserInput.productId = "T62"; // productcode = "T62";	// 07-10
	} else {
		ppt = UserInput_copy.term;
	}
	return {
		"FirstName": "",
		"LastName": "",
		"DateOfBirth": dobPass,
		"Gender": UserInput_copy.gender,
		"MaritalStatus": "",
		"Staff": UserInput.staff == "No" ? "0" : "1",
		"ServiceTaxNotApplicable": "0",
		"ProductDetails": {
			"Product": {
				"ProductType": "TRADITIONAL",
				"ProductName": "ICICI Pru iProtect Return of Premium",
				"ProductCode": UserInput.productId, //	productcode,	//07-10
				"ModeOfPayment": UserInput_copy.PaymentFrequency,
				"ModalPremium": "0",
				"AnnualPremium": "0",
				"Term": UserInput_copy.term,
				"DeathBenefit": UserInput_copy.sumAssured,
				"PremiumPaymentTerm": ppt,
				"Tobacco": UserInput_copy.useTobacco == 'NonSmoker' ? "0" : "1",
				"SalesChannel": UserInput.channel == "BOL" ? "7" : "4", // 7 for BOL, 4 for Others
				"PremiumPaymentOption": PremiumPaymentOptionToPass, //"Regular Pay",
				"ADHB": AccidentalDeathBenefit,
				"PlanType": UserInput.PlanType,
				"LifeCoverOption": Selected_PlanToPass,
				"CIBenefit": CriticalIllnessBenefit,
				"DeathBenefitOption": PayoutOptionsToPass,
				"RetirementAge": UserInput.RetirementAge,
				"LumpsumPercentage": lumsum_pre,
				"IPSDiscount": UserInput.staff == "No" ? "false" : "true", // if staff = yes then true else false
				"MonthlyIncPer": UserInput.monthlyIncome,
				"LoyaltyBenefit": UserInput.ExistingCustomer == "Yes" ? "true" : "false",
				"LumpSumAmount": "2486914"
			}
		}
	};
}
// function to get permium from web service
function ServiceGetPremium(UserInput_copy, retn_key, callback) {
	var request = GetQuoteson(UserInput_copy);
	if (ipru_getParameterByName('applicationState') == "resume") {
		$("#loader").show();
	} else {
		if (obj_used_flag.loaderCallFlag && !obj_used_flag.grpLinkClicked) {
			//$("#loader-prem").show();
			calc_globalevent.fn.Function("newPremiumLoader");
		}
	}
	$.ajax({
		method: "POST",
		url: "https://api.iciciprulife.com/v2/quote/json?apikey=PPhriyiEXWRktpq9QTeYotpXu8TIaO3v",
		data: JSON.stringify(request),
		contentType: 'application/json',
		success: function (response) {
			serviceCount.premium = 0;
			var finalVal = [];
			obj_used_flag.quote_webservice_respond = true;
			if (response["ErrorCode"] == "E00") {
				// console.log("ServiceGetPremium => ", response);
				finalVal["BasePremiumAmt"] = response["PremiumSummary"]["BasePremium"]; // response["PremiumSummary"]["ModalPremium"], response["PremiumSummary"]["SumInstallmentPremium"]
				finalVal["PremiumAmt_withSTax"] = response["PremiumSummary"]["ServiceTax"];
				finalVal["BaseADBR"] = response["PremiumSummary"]["ADBRPremium"];
				finalVal["ADBRateWithSTax"] = response["PremiumSummary"]["ServiceTax_ADB"];
				finalVal["BaseCIAmt"] = response["PremiumSummary"]["CIRPremium"];
				finalVal["CIWithSTax"] = response["PremiumSummary"]["ServiceTax_CI"];
				finalVal["AnnualPremium"] = response["PremiumSummary"]["SumAnnualPremium"];
				finalVal["TotalPremium"] = response["PremiumSummary"]["SumTotalPremium"]; // TotalBasePremium + TotalPremium_ADB
				callback({
					"status": "Success",
					"OutputObjHold": finalVal,
					"key": retn_key,
					"PPT": response["PremiumSummary"].PremiumPaymentTerm
				});
			} else {
				//console.log("ServiceGetPremium Fail => ", response);
				//finalVal["error"] = response["ErrorMessage"];
				callback({
					status: "Error",
					"error_msg": response["ErrorMessage"],
					"key": retn_key,
					"PPT": ""
				});
			}
			// setTimeout(function() {
			// 	$("#loader-prem").hide();
			// 	obj_used_flag.loaderCallFlag = true;
			// }, 3000);
			obj_used_flag.loaderCallFlag = true;

		},
		error: function (response) {
			obj_used_flag.quote_webservice_respond = true;
			console.log("ServiceGetPremium Error: ", response);
			console.log('countServiceError', countServiceError++);
			if (serviceCount.premium > serviceCount.maxCount) {
				callback({
					status: "Error",
					"key": retn_key,
					"PPT": "",
					"error_msg": "This service temporary not available, please try after some time"
				});
				//$("#loader-prem").hide();
			} else {
				serviceCount.premium++;
				ServiceGetPremium(UserInput_copy, retn_key, callback);
			}
		}
	});
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	var z = 0;
	var len = String(x1).length;
	var num = parseInt((len / 2) - 1);
	while (rgx.test(x1)) {
		if (z > 0) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		} else {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
			rgx = /(\d+)(\d{2})/;
		}
		z++;
		num--;
		if (num == 0) {
			break;
		}
	}
	return x1 + x2;
}

function removeCommas(numWidCommas) {
	var numWidoutCommas = numWidCommas.replace(/[,]/g, '');
	return numWidoutCommas;
}

function setValWF(val) { //set value Words to Figures
	//console.log(val);
	if (val != undefined) {
		var returnvalue = '';
		var slice1 = '';
		//console.log(val);
		val = val.toLowerCase();
		// commented by anas 17-3-22
		// if(val.indexOf('Crores') > 0 || val.indexOf('crores') > 0) {
		// 	slice1 = val.replace(/[^0-9]/g, '');
		// 	returnvalue = slice1 + '00000';
		// 	//console.log(slice1);
		// } else if(val.indexOf('Lakhs') > 0 || val.indexOf('lakhs') > 0) {
		// 	slice1 = val.replace(/[^0-9]/g, '');
		// 	returnvalue = slice1 + '000';
		// } else if(val.indexOf('Crore') > 0 || val.indexOf('crore') > 0) {
		// 	slice1 = val.replace(/[^0-9]/g, '');
		// 	returnvalue = slice1 + '00000';
		// } else if(val.indexOf('Lakh') > 0 || val.indexOf('lakh') > 0) {
		// 	slice1 = val.replace(/[^0-9]/g, '');
		// 	returnvalue = slice1 + '000';
		// } else {
		// 	returnvalue = removeCommas(val);
		// }
		if (val.indexOf('Crores') > 0 || val.indexOf('crores') > 0) {
			slice1 = val.replace(/[^0-9]/g, '');
			if (slice1.length == 4 || slice1.length == 3) returnvalue = slice1 + '00000';
			else returnvalue = slice1 + '0000000';
			//console.log(slice1);
		} else if (val.indexOf('Lakhs') > 0 || val.indexOf('lakhs') > 0) {
			slice1 = val.replace(/[^0-9]/g, '');
			if (slice1.length == 4) returnvalue = slice1 + '000';
			else returnvalue = slice1 + '00000';
		} else if (val.indexOf('Crore') > 0 || val.indexOf('crore') > 0) {
			slice1 = val.replace(/[^0-9]/g, '');
			if (slice1.length == 4 || slice1.length == 3) returnvalue = slice1 + '00000';
			else returnvalue = slice1 + '0000000';
		} else if (val.indexOf('Lakh') > 0 || val.indexOf('lakh') > 0) {
			slice1 = val.replace(/[^0-9]/g, '');
			if (slice1.length == 4) {
				if (slice1 === '4999') 
				returnvalue = slice1 + '999';
				else {
					returnvalue = slice1 + '000';
				}
			} else if(slice1.length == 3) {
				returnvalue = slice1 + '000'
			} else returnvalue = slice1 + '00000';
		} else {
			returnvalue = removeCommas(val);
		}
		return returnvalue;
	}
}

function removeprefixZero(inputStr) {
	var inpStr = inputStr.replace(/^0+/, '');
	return inpStr;
}

function Validateamount(objVal, obj, valuetobechanged) {
	if (valuetobechanged == "lifeCover") {
		if (!isNaN(parseInt(objVal)) && parseInt(objVal) != undefined) {
			$('.max-lifecover-error').addClass("d-none");
			if (parseInt(objVal) < calc_constants.MIN_SUMASSURED) {
				return calc_constants.MIN_SUMASSURED;
			} else if (parseInt(objVal) > calc_constants.MAX_SUMASSURED) {
				$('.max-lifecover-error').removeClass("d-none");
				$(".max-lifeCover-amt").text(setValFW(calc_constants.MAX_SUMASSURED));
				// setTimeout(function() {
				// 	$('.max-lifecover-error').addClass("d-none");
				// }, 10000);
				return calc_constants.MAX_SUMASSURED;
			} else {
				return objVal;
			}
		} else {
			return calc_constants.MIN_SUMASSURED;
		}
	}
	if (valuetobechanged == "ADBAmount") {
		if (!isNaN(parseInt(objVal)) && parseInt(objVal) != undefined) {
			if (parseInt(objVal) < parseInt(calc_constants.MIN_Accidental_Death_Benefit) || parseInt(obj.sumAssured) <= parseInt(calc_constants.MIN_Accidental_Death_Benefit)) return objVal = calc_constants.MIN_Accidental_Death_Benefit;
			else if (parseInt(objVal) > parseInt(calc_constants.MAX_Accidental_Death_Benefit) || parseInt(objVal) > parseInt(obj.sumAssured)) {
				if (UserInput.PlanType == "EROP-LS" || UserInput.PlanType == 'ROP-LS') {
					return Math.min(obj.sumAssured, parseInt(obj.sumAssured) / 2, calc_constants.MAX_Accidental_Death_Benefit);
				} else {
					return Math.min(obj.sumAssured, calc_constants.MAX_Accidental_Death_Benefit);
				}
			} else {
				if ((UserInput.PlanType == "EROP-LS" || UserInput.PlanType == 'ROP-LS')) {
					return Math.min(parseInt(objVal), parseInt(obj.sumAssured) / 2);
				} else {
					return parseInt(objVal);
				}
			}
		} else return calc_constants.MIN_Accidental_Death_Benefit;
	}
	if (valuetobechanged == "CIAmount") {
		if (!isNaN(parseInt(objVal)) && parseInt(objVal) != undefined) {
			if (parseInt(objVal) < parseInt(calc_constants.MIN_Critical_Illness) || parseInt(obj.sumAssured) <= parseInt(calc_constants.MIN_Critical_Illness)) return objVal = calc_constants.MIN_Critical_Illness;
			else if (parseInt(objVal) > parseInt(calc_constants.MAX_Critical_Illness) || parseInt(objVal) > parseInt(obj.sumAssured)) {
				if (UserInput.PlanType == "EROP-LS" || UserInput.PlanType == 'ROP-LS') {
					return Math.min(obj.sumAssured, parseInt(obj.sumAssured) / 2, calc_constants.MAX_Critical_Illness)
				} else {
					return Math.min(obj.sumAssured, calc_constants.MAX_Critical_Illness)
				}
			} else {
				if ((UserInput.PlanType == "EROP-LS" || UserInput.PlanType == 'ROP-LS')) {
					return Math.min(parseInt(objVal), parseInt(obj.sumAssured) / 2)
				} else {
					return parseInt(objVal);
				}
			}
		} else return calc_constants.MIN_Critical_Illness;
	}
}

function DatePrevYear(BirthDate) {
	var splitDate = BirthDate.split("/"); //split date came from datepicker
	var dd = splitDate[0];
	var mm = splitDate[1];
	var yyyy = splitDate[2];
	temp_Current_dob = splitDate[0] + " ";
	if (splitDate[1] == "01") temp_Current_dob += "Jan ";
	else if (splitDate[1] == "02") temp_Current_dob += "Feb ";
	else if (splitDate[1] == "03") temp_Current_dob += "Mar ";
	else if (splitDate[1] == "04") temp_Current_dob += "Apr ";
	else if (splitDate[1] == "05") temp_Current_dob += "May ";
	else if (splitDate[1] == "06") temp_Current_dob += "Jun ";
	else if (splitDate[1] == "07") temp_Current_dob += "Jul ";
	else if (splitDate[1] == "08") temp_Current_dob += "Aug ";
	else if (splitDate[1] == "09") temp_Current_dob += "Sep ";
	else if (splitDate[1] == "10") temp_Current_dob += "Oct ";
	else if (splitDate[1] == "11") temp_Current_dob += "Nov ";
	else if (splitDate[1] == "12") temp_Current_dob += "Dec ";
	temp_Current_dob += splitDate[2];
	var date = new Date(temp_Current_dob);
	return (dd + '/' + mm + '/' + (date.getFullYear() - 1).toString());
}
// function validatePlanType(param_userinput, key) {
// 	var temp_param = true;
// 	var temp_age = parseInt(param_userinput.age);
// 	var temp_maturity = temp_age + parseInt(param_userinput.term);
// 	var temp_obj = {
// 		"min_ageAtEntry": 0,
// 		"max_ageAtEntry": 0,
// 		"min_maturityAge": 0,
// 		"max_maturityAge": 0,
// 	}
// 	if(param_userinput.PlanType == "IB") {
// 		temp_obj.min_ageAtEntry = 25;
// 		if(UserInput.monthlyIncome == "0.001") {
// 			temp_obj.min_maturityAge = 75;
// 			temp_obj.max_maturityAge = 85;
// 		} else if(UserInput.monthlyIncome == "0.002") {
// 			temp_obj.min_maturityAge = 70;
// 			temp_obj.max_maturityAge = 85;
// 		} else if(UserInput.monthlyIncome == "0.003") {
// 			temp_obj.min_maturityAge = 65;
// 			temp_obj.max_maturityAge = 85;
// 		}
// 		if(param_userinput.premiumPaymentOption == "Limited_Pay_5year") {
// 			temp_obj.max_ageAtEntry = 55;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_7year") {
// 			temp_obj.max_ageAtEntry = 53;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_10year") {
// 			temp_obj.max_ageAtEntry = 50;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_12year") {
// 			temp_obj.max_ageAtEntry = 48;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_15year") {
// 			temp_obj.max_ageAtEntry = 45;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_60_age") {
// 			temp_obj.max_ageAtEntry = 50;
// 		}
// 	} else if(param_userinput.PlanType == "ROP-LS") {
// 		temp_obj.min_ageAtEntry = 25;
// 		temp_obj.min_maturityAge = 65;
// 		temp_obj.max_maturityAge = 85;
// 		if(param_userinput.premiumPaymentOption == "Limited_Pay_5year") {
// 			temp_obj.max_ageAtEntry = 50;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_7year") {
// 			temp_obj.max_ageAtEntry = 50;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_10year") {
// 			temp_obj.max_ageAtEntry = 50;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_12year") {
// 			temp_obj.max_ageAtEntry = 48;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_15year") {
// 			temp_obj.max_ageAtEntry = 45;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_60_age") {
// 			temp_obj.max_ageAtEntry = 50;
// 		}
// 	} else if(param_userinput.PlanType == "EROP-LS") {
// 		temp_obj.min_ageAtEntry = 25;
// 		temp_obj.max_maturityAge = 85;
// 		if(param_userinput.RetirementAge == "60") {
// 			temp_obj.min_maturityAge = 65;
// 			if(param_userinput.premiumPaymentOption == "Limited_Pay_5year") {
// 				temp_obj.max_ageAtEntry = 50;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_10year") {
// 				temp_obj.max_ageAtEntry = 45;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_12year") {
// 				temp_obj.max_ageAtEntry = 43;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_20year") {
// 				temp_obj.max_ageAtEntry = 35;
// 			}
// 		} else {
// 			temp_obj.min_ageAtEntry = 35;
// 			temp_obj.min_maturityAge = 75;
// 			if(param_userinput.premiumPaymentOption == "Limited_Pay_5year") {
// 				temp_obj.max_ageAtEntry = 50;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_10year") {
// 				temp_obj.max_ageAtEntry = 50;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_12year") {
// 				temp_obj.max_ageAtEntry = 48;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_20year") {
// 				temp_obj.max_ageAtEntry = 40;
// 			} else if(param_userinput.premiumPaymentOption == "Limited_Pay_60_age") {
// 				temp_obj.max_ageAtEntry = 50;
// 			}
// 		}
// 	} else if(param_userinput.PlanType == "ROP") {
// 		temp_obj.min_ageAtEntry = 18;
// 		temp_obj.max_ageAtEntry = 65;
// 		temp_obj.max_maturityAge = 85;
// 		if(param_userinput.premiumPaymentOption == "Limited_Pay_5year") {
// 			temp_obj.min_maturityAge = 28;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_7year") {
// 			temp_obj.min_maturityAge = 30;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_10year") {
// 			temp_obj.min_maturityAge = 33;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_12year") {
// 			temp_obj.min_maturityAge = 35;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_15year") {
// 			temp_obj.min_maturityAge = 38;
// 		} else if(param_userinput.premiumPaymentOption == "Limited_Pay_60_age") {
// 			temp_obj.min_maturityAge = 65;
// 		} else if(param_userinput.premiumPaymentOption == "Regular_Pay") {
// 			temp_obj.min_maturityAge = 28;
// 		} else if(param_userinput.premiumPaymentOption == "Single_Pay") {
// 			temp_obj.min_maturityAge = 23;
// 		}
// 	}
// 	var temp_status = {
// 		"response": "",
// 		"error_msg": ""
// 	};
// 	if(temp_age < temp_obj.min_ageAtEntry || temp_age > temp_obj.max_ageAtEntry) {
// 		temp_status.response = "error";
// 		temp_status.error_msg = "Minimum and maximum age at entry should be " + temp_obj.min_ageAtEntry + " to " + temp_obj.max_ageAtEntry + " years.";
// 	} else if(temp_maturity < temp_obj.min_maturityAge || temp_maturity > temp_obj.max_maturityAge) {
// 		temp_status.response = "error";
// 		temp_status.error_msg = "Minimum and maximum maturity age should be " + temp_obj.min_maturityAge + " to " + temp_obj.max_maturityAge + " years.";
// 	} else {
// 		temp_status.response = "success";
// 		temp_status.error_msg = "";
// 	} 
// 	temp_status.error_msg = "This plan is not available ";
// 	return temp_status;
// }
function bountryCondition() {
	var temp_age = parseInt(UserInput.age);
	var temp_maturity = temp_age + parseInt(UserInput.term);
	if (temp_age >= 25 && temp_age <= 55 && temp_maturity >= 65 && temp_maturity <= 85) {
		$(".PlanType-IB").removeClass("disabled");
		$("input[name=incomePer]").prop("disabled", true);
		if (temp_maturity >= 75 && temp_maturity <= 80) {
			$("input[name=incomePer][value='0.001']").prop("disabled", false);
		}
		if (temp_maturity >= 70 && temp_maturity <= 75) {
			$("input[name=incomePer][value='0.002']").prop("disabled", false);
		}
		if (temp_maturity >= 65 && temp_maturity <= 85) {
			$("input[name=incomePer][value='0.003']").prop("disabled", false);
		}
	} else {
		$(".PlanType-IB").addClass("disabled");
	}
	// push to uat	18-04-2022
	if ((temp_age >= 25 && temp_age <= 50) && (temp_maturity >= 65 && temp_maturity <= 85)) {
		//$("input[name=payoutPer]").prop("disabled",true);
		//var temp_arr = [];
		$("input[name=payoutPer][value='70'], input[name=payoutPer][value='60']").prop("disabled", true);
		if (temp_maturity >= 75) {
			$(".PlanType-EROP-LS").removeClass("disabled");
			$("input[name=payoutPer][value='70']").prop("disabled", false);
			//temp_arr.push("70");
		}
		if (temp_maturity >= 65) {
			$(".PlanType-ROP-LS").removeClass("disabled");
			$("input[name=payoutPer][value='60']").prop("disabled", false);
			//temp_arr.push("60");
		}
		//var temp_val = $("input[name=payoutPer]:checked").val();
		//if(temp_val)
	} else {
		$(".PlanType-EROP-LS, .PlanType-ROP-LS").addClass("disabled");
	}
}

// pushpendra start 29-11-22
function AdbrCi() {
	if ($("#bene1, #bene3").prop("disabled") === true) { // CI (disabled)
		if (UserInput.PlanType === "ROP") { // ROP Vanilla
			$(".AdbrCi").show();
			// $('.AdbrCi_head1').html(`For IP ROP Vanilla :`);
			// $('.AdbrCi_text1').html(`Critical illness cover is not available for Limited Pay 12 & 15 years`);
			// $('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			if (UserInput.age >= 18 && UserInput.age <= 24) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			} else if (UserInput.age >= 25 && UserInput.age <= 49) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & ` + (60 - UserInput.age) + ` years`);
			} else if (UserInput.age >= 50) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			}

			$('.cibox .benefit-sec .img-fluid').attr('src', 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/testing/Pragati/term-insurance-plans/TP-ROP-new/images/nudge-icon-1.svg');
		} else if (UserInput.PlanType === "IB") { // ROP Income
			$(".AdbrCi").show();
			// $('.AdbrCi_head1').html(`For IP ROP Income :`);
			// $('.AdbrCi_text1').html(`Critical illness cover is not available for Limited Pay 12 & 15 years`);
			// $('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			if (UserInput.age >= 25 && UserInput.age <= 45) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & ` + (60 - UserInput.age) + ` years`);
			} else if (UserInput.age >= 46 && UserInput.age <= 48) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & ` + (60 - UserInput.age) + ` years`);
			} else if (UserInput.age == 49) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay ` + (60 - UserInput.age) + `  years`);
			} else {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			}
			$('.cibox .benefit-sec .img-fluid').attr('src', 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/testing/Pragati/term-insurance-plans/TP-ROP-new/images/nudge-icon-1.svg');
		} else if (UserInput.PlanType === "ROP-LS") { // ROP Life Stage
			$(".AdbrCi").show();
			// $('.AdbrCi_head1').html(`For IP ROP Life Stage :`);
			// $('.AdbrCi_text1').html(`Critical illness cover is not available for Limited Pay 12 & 15 years`);
			// $('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			if (UserInput.age >= 25 && UserInput.age <= 45) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & ` + (60 - UserInput.age) + ` years`);
			} else if (UserInput.age >= 46 && UserInput.age <= 48) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & ` + (60 - UserInput.age) + ` years`);
			} else if (UserInput.age == 49) {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay ` + (60 - UserInput.age) + `  years`);
			} else {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 15 years`);
			}
			$('.cibox .benefit-sec .img-fluid').attr('src', 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/testing/Pragati/term-insurance-plans/TP-ROP-new/images/nudge-icon-1.svg');
		} else if (UserInput.PlanType === "EROP-LS") { // ROP Early Life Stage
			$(".AdbrCi").show();
			// $('.AdbrCi_head1').html(`For IP ROP Early Life Stage :`);
			// $('.AdbrCi_text1').html(`Critical illness cover is not available for Limited Pay 12, 15 & 20 years`);
			// $('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & 20 years`);
			if (UserInput.RetirementAge == '60') {
				if (UserInput.age >= 25 && UserInput.age <= 35) {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & 20 years`);
				} else if (UserInput.age >= 36 && UserInput.age <= 43) {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 years`);
				} else {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & 20 years`);
				}
			} else if (UserInput.RetirementAge == '70') {
				if (UserInput.age >= 35 && UserInput.age <= 40) {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 20 & ` + (60 - UserInput.age) + ` years`);
				} else if (UserInput.age >= 41 && UserInput.age <= 48) {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12 & ` + (60 - UserInput.age) + ` years`);
				} else if (UserInput.age == 49) {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay ` + (60 - UserInput.age) + ` years`);
				} else {
					$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & 20 years`);
				}
			} else {
				$('.cibox .benefit-sec .ben-text').html(`Not for Limited Pay 12, 15 & 20 years`);
			}
			$('.cibox .benefit-sec .img-fluid').attr('src', 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/testing/Pragati/term-insurance-plans/TP-ROP-new/images/nudge-icon-1.svg');
		}
	} else {
		// $(".AdbrCi").hide();
		$('.cibox .benefit-sec .ben-text').html(`Benefit active for <br /><span class="ben-text-ci"></span> years`)
		// anas start 31-1-23
		if (UserInput.premiumPaymentOption == "Regular_Pay") {
			$(".ben-text-ci").text(Math.min(parseInt(UserInput.term), 85 - UserInput.age, 40));
		} else {
			$(".ben-text-ci").text(Math.min(parseInt(UserInput.term), 15));
		}
		// anas end 31-1-23

		$('.cibox .benefit-sec .img-fluid').attr('src', 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/testing/Pragati/term-insurance-plans/TP-ROP-new/images/ben-star-new.svg');
	}
}
// pushpendra end 29-11-22

function ReasonToBuy() {
	if (UserInput.PlanType !== "ROP") {
		if (UserInput.age >= 25 && UserInput.age <= 34) {
			if (UserInput.PlanType === "IB") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`No more worrying about income post retirement with our return of premium term plan`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-8.svg')
				$('.buy_text2').html(`Tax-free maturity benefit and also save up to 54600<sup>2b</sup> on premiums of Life Cover & Critical illnesses`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-4.svg')
			} else {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Increase the level of your security by 5% every year till age 55 and cover all your important life stages`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-7.svg')
				$('.buy_text2').html(`Lock in lower premiums now as your premiums will increase with age`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-3.svg')
			}
		} else if (UserInput.age >= 35 && UserInput.age <= 44) {
			if (UserInput.PlanType === "IB") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Get a fixed monthly income post retirement along with the security of a life cover `);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-9.svg')
				$('.buy_text2').html(`Tax-free maturity benefit and also save up to 54600<sup>2b</sup> on premiums of Life Cover & Critical illnesses`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-4.svg')
			} else {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Increase the level of your security by 5% every year till age 55 and cover all your important life stages`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-7.svg')
				$('.buy_text2').html(`Ensure that your child's higher education fees is taken care of even in your absence `);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-6.svg')
			}
		} else if (UserInput.age >= 45) {
			if (UserInput.PlanType === "IB") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`No more worrying about income post retirement with our return of premium term plan`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-8.svg')
				$('.buy_text2').html(`Tax-free maturity benefit and also save up to 54600<sup>2b</sup> on premiums of Life Cover & Critical illnesses`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-4.svg')
			} else {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Increase the level of your security by 5% every year till age 55 and cover all your important life stages`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-7.svg')
				$('.buy_text2').html(`Secure your home loan EMIs with a term plan in your absence`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-10.svg')
			}
		}
	} else {
		if (UserInput.age >= 18 && UserInput.age <= 24) {
			$(".reason_to_buy").show();
			$('.buy_text1').html(`Gift your parents an assurance of income + security in their second innings of life`);
			$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-2.svg')
			$('.buy_text2').html(`Lock in lower premiums now as your premiums will increase with age`);
			$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-3.svg')
		} else if (UserInput.age >= 25 && UserInput.age <= 29) {
			if (UserInput.AnnualIncome >= "300000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Lock in lower premiums now as your premiums will increase with age`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-3.svg')
				$('.buy_text2').html(`Gift your parents an assurance of income + security in their second innings of life`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-2.svg')
			} else if (UserInput.AnnualIncome >= "1000000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Tax-free maturity benefit and also save up to 54600<sup>2b</sup> on premiums of Life Cover & Critical illnesses`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-4.svg')
				$('.buy_text2').html(`Lock in lower premiums now as your premiums will increase with age`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-3.svg')
			}
		} else if (UserInput.age >= 30 && UserInput.age <= 40) {
			if (UserInput.AnnualIncome >= "300000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`What you pay is what you get with this insurance plan as we return 105% of your premiums<sup>3</sup>`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-5.svg')
				$('.buy_text2').html(`Ensure that your child's higher education fees is taken care of even in your absence `);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-6.svg')
			} else if (UserInput.AnnualIncome >= "1000000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Ensure that your child's higher education fees is taken care of even in your absence `);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-6.svg')
				$('.buy_text2').html(`Secure your home loan EMIs with a term plan in your absence`);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-10.svg')
			}
		} else if (UserInput.age >= 41) {
			if (UserInput.AnnualIncome >= "300000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Secure your home loan EMIs with a term plan in your absence`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-10.svg')
				$('.buy_text2').html(`Ensure that your child's higher education fees is taken care of even in your absence `);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-6.svg')
			} else if (UserInput.AnnualIncome >= "1000000") {
				$(".reason_to_buy").show();
				$('.buy_text1').html(`Secure your home loan EMIs with a term plan in your absence`);
				$('.buy_img1').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-10.svg')
				$('.buy_text2').html(`Ensure that your child's higher education fees is taken care of even in your absence `);
				$('.buy_img2').attr("src", 'https://www.iciciprulife.com/content/icici-prudential-life-insurance/term-insurance-plans/TP-ROP-new/images/reason-to-buy-6.svg')
			}
		}
	}
}

function DidYouKnow() {
	let temp_age = parseInt(UserInput.age);
	let temp_maturity = temp_age + parseInt(UserInput.term);
	let temp_earlyMaturity = temp_age + 40;
	let temp_sumAssured = parseInt(UserInput.sumAssured);
	let temp_AnnualIncome = parseInt(UserInput.AnnualIncome);
	if (UserInput.PlanType !== "ROP") {
		if ((temp_sumAssured < 10 * temp_AnnualIncome) && (temp_sumAssured >= parseInt(calc_constants.MIN_SUMASSURED))) { //	SA - (Less than 10 times income)
			if ($("#bene1, #bene3").is(":checked")) { // CI - (Yes)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term till age 75 to enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term till age 75 to enjoy all the plan benefits to its fullest`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				}
			} else { // CI - (No)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						}
					}
				}
			}
		} else if ((temp_sumAssured >= 10 * temp_AnnualIncome) && (temp_sumAssured <= parseInt(calc_constants.MAX_SUMASSURED))) { //	SA - (At least 10 times income / boundary condition of education or other city)
			if ($("#bene1, #bene3").is(":checked")) { // CI - (Yes)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`You are just 10 minutes away from safeguarding your family's financial security`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				}
			} else { // CI - (No)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity >= 65) && (temp_maturity < 75) && !(temp_earlyMaturity <= 75)) { // PT - (Between 65 to 74 (except for customers whose age+40<=75))
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`Choose Policy Term till age 75 and enjoy all the plan benefits to its fullest`);
							}
						} else if ((temp_earlyMaturity <= 75) && (temp_maturity >= 75)) { // PT - (Customers whose age+40<=75, Till age 75 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				}
			}
		}
	} else { // UserInput.PlanType === "ROP"
		if ((temp_sumAssured < 10 * temp_AnnualIncome) && (temp_sumAssured >= parseInt(calc_constants.MIN_SUMASSURED))) { //	SA - (Less than 10 times income)
			if ($("#bene1, #bene3").is(":checked")) { // CI - (Yes)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`You can save on premium by choosing Limited Pay for 10 years, where you pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						}
					}
				}
			} else { // CI - (No)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Life cover should be at least 10-15 times of your current annual income to fulfill all major responsibilities`);
								$('.know_text2').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						}
					}
				}
			}
		} else if ((temp_sumAssured >= 10 * temp_AnnualIncome) && (temp_sumAssured <= parseInt(calc_constants.MAX_SUMASSURED))) { //	SA - (At least 10 times income / boundary condition of education or other city)
			if ($("#bene1, #bene3").is(":checked")) { // CI - (Yes)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`You are just 10 minutes away from safeguarding your family's financial security`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				}
			} else { // CI - (No)
				if ($("#bene2, #bene4").is(":checked")) { // ADBR - (Yes)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text2').html(`Dedicated Relationship Manager will be assigned to you for a seamless onboarding `);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				} else { // ADBR - (No)
					if (UserInput.premiumPaymentOption === "Limited_Pay_5year" || UserInput.premiumPaymentOption === "Limited_Pay_7year" || UserInput.premiumPaymentOption === "Limited_Pay_10year") { // PPT - (Limited Pay 5,7 or 10)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Regular_Pay") { // PPT - (Regular Pay)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`About 43%<sup>//</sup> of our online customers chose optional Critical Illness rider with their policy`);
								$('.know_text3').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
							}
						}
					} else if (UserInput.premiumPaymentOption === "Limited_Pay_12year" || UserInput.premiumPaymentOption === "Limited_Pay_15year" || UserInput.premiumPaymentOption === "Limited_Pay_20year" || UserInput.premiumPaymentOption === "Limited_Pay_60_age") { // PPT - (Limited Pay 12, 15, 20, till age 60)
						if ((temp_maturity <= 65) && !(temp_earlyMaturity <= 65)) { // PT - (Less than till age 65 (except for customers whose age+40<=65) )
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`We recommend you choose Policy Term at least till age of 65 to cover all your major responsibility ages`);
							}
						} else if ((temp_earlyMaturity <= 65) && (temp_maturity >= 65)) { // PT - (Customers whose age+40<=65, Till age 65 & above)
							if (UserInput.PayoutOptions === "RegularIncome") { // Nominee - (Regular)
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$('.know_text3').html(`About 73%<sup>//</sup> of our customer choose to give their nominee Lump-Sum payout to take care of all high value expenses`);
							} else { // Nominee - ("Lump-sum" or "Lump-sum + regular income")
								$(".did_you_know").show();
								$(".know_head").html(`Did you Know?`);
								$('.know_text1').html(`About 55%<sup>//</sup> of our online customers Purchase optional Accidental Death Benefit with their policy `);
								$('.know_text2').html(`Save on premiums by choosing Limited Pay for 10 years. Pay for limited time period and get cover for the complete policy term`);
								$(".know_text3").html(`Our Medical Checkup process is completely safe and our Health Partners follow all the safety protocols.`);
								// $('.know_text3').html(`Our Health Partners follow all the safety protocols during medical checkup, be it a visit to your residence or at the Diagnostic center. <div class="free_medical_wrp"> <a href="javascript:void(0)" data-toggle="modal" data-target="#Free-Medical-Checkup" class="free_medical">Learn More</a> </div>`);
							}
						}
					}
				}
			}
		}
	}
}