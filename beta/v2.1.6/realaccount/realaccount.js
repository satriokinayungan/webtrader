define(["jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash","moment"],function(a,b,c,d,e,f){function g(a){l=a,a.click(function(){j?j.moveToTop():require(["text!realaccount/realaccount.html"],h)})}function h(b){b=a(b),j=c.createBlankWindow(b,{title:"Real account opening",resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:350,height:930,close:function(){j.dialog("destroy"),j.trigger("dialogclose"),j.remove(),j=null},open:function(){},destroy:function(){k&&k.unbind(),k=null}}),i(b),j.dialog("open");var d=j.dialog("widget").offset();d.top=110,j.dialog("option","position",{my:d.left,at:d.top}),j.dialog("widget").css({left:d.left+"px",top:d.top+"px"}),j.fixFooterPosition()}function i(c){var g=(b.app_id,{route:{value:"user"},empty_fields:{validate:!1,clear:e.debounce(function(){g.empty_fields.validate=!1},4e3),show:function(){g.empty_fields.validate=!0,g.empty_fields.clear()}},company:{type:"normal",financial:void 0,gaming:void 0},risk:{visible:!1},user:{disabled:!1,salutation:"Mr",salutation_array:["Mr","Mrs","Ms","Miss"],first_name:"",last_name:"",date_of_birth:f().format("YYYY-MM-DD"),yearRange:"-100:+0",showButtonPanel:!1,residence:"-",residence_name:"-",address_line_1:"",address_line_2:"",city_address:"",state_address:"-",state_address_array:[{text:"-",value:"-"}],address_postcode:"",phone:"",secret_question_inx:5,secret_question_array:["Mother's maiden name","Name of your pet","Name of first love","Memorable town/city","Memorable date","Favourite dish","Brand of first car","Favourite artist"],secret_answer:""},financial:{experience_array:["0-1 year","1-2 years","Over 3 years"],frequency_array:["0-5 transactions in the past 12 months","6-10 transactions in the past 12 months","40 transactions or more in the past 12 months"],forex_trading_experience:"",forex_trading_frequency:"",indices_trading_experience:"",indices_trading_frequency:"",commodities_trading_experience:"",commodities_trading_frequency:"",stocks_trading_experience:"",stocks_trading_frequency:"",other_derivatives_trading_experience:"",other_derivatives_trading_frequency:"",other_instruments_trading_experience:"",other_instruments_trading_frequency:"",employment_industry_array:["Construction","Education","Finance","Health","Tourism","Other"],employment_industry:"",education_level_array:["Primary","Secondary","Tertiary"],education_level:"",income_source_array:["Salaried Employee","Self-Employed","Investments & Dividends","Pension","Other"],income_source:"",net_income_array:["Less than $25,000","$25,000 - $50,000","$50,001 - $100,000","$100,001 - $500,000","Over $500,000"],net_income:"",estimated_worth_array:["Less than $100,000","$100,000 - $250,000","$250,001 - $500,000","$500,001 - $1,000,000","Over $1,000,000"],estimated_worth:"",accepted:!1,disabled:!1}});g.user.is_valid=function(){var a=g.user;return""!==a.first_name&&""!==a.last_name&&f(a.date_of_birth,"YYYY-MM-DD",!0).isValid()&&"-"!==a.residence&&""!==a.address_line_1&&""!==a.city_address&&/^[^+]{0,20}$/.test(a.address_postcode)&&""!==a.phone&&/^\+?[0-9\s]{6,35}$/.test(a.phone)&&/.{4,8}$/.test(a.secret_answer)},g.user.click=function(){return g.user.is_valid()?"normal"===g.company.type?void g.user.new_account_real():void g.route.update("financial"):void g.empty_fields.show()},g.user.new_account_real=function(){var c=g.user,d={new_account_real:1,salutation:c.salutation,first_name:c.first_name,last_name:c.last_name,date_of_birth:c.date_of_birth,residence:c.residence,address_line_1:c.address_line_1,address_line_2:c.address_line_2||void 0,address_city:c.city_address,address_state:c.state_address||void 0,address_postcode:c.address_postcode||void 0,phone:c.phone,secret_question:c.secret_question_array[c.secret_question_inx],secret_answer:c.secret_answer.replace('""',"'")};b.send(d).then(function(c){g.user.disabled=!0;var d=c.new_account_real;return oauth=local_storage.get("oauth"),oauth.push({id:d.client_id,token:d.oauth_token,is_virtual:d.is_virtual}),local_storage.set("oauth",oauth),a.growl.notice({message:"Account successfully created"}),a.growl.notice({message:"Switching to your new account ..."}),b.switch_account(d.client_id).then(function(){j.dialog("destroy"),l.hide()})})["catch"](function(a){g.user.disabled=!1,m(a)})},g.financial.all_selected=function(){var a=g.financial;return""!==a.forex_trading_experience&&""!==a.forex_trading_frequency&&""!==a.indices_trading_experience&&""!==a.indices_trading_frequency&&""!==a.commodities_trading_experience&&""!==a.commodities_trading_frequency&&""!==a.stocks_trading_experience&&""!==a.stocks_trading_frequency&&""!==a.other_derivatives_trading_experience&&""!==a.other_derivatives_trading_frequency&&""!==a.other_instruments_trading_experience&&""!==a.other_instruments_trading_frequency&&""!==a.employment_industry&&""!==a.education_level&&""!==a.income_source&&""!==a.net_income&&""!==a.estimated_worth},g.financial.click=function(){return g.financial.all_selected()?g.financial.accepted?void(g.risk.visible=!0):void a.growl.error({message:"Binary.com terms and conditions unchecked."}):(g.empty_fields.show(),void a.growl.error({message:"Not all financial information are completed"}))},g.financial.create_request=function(){var a=g.user,b=g.financial,c={new_account_maltainvest:1,salutation:a.salutation,first_name:a.first_name,last_name:a.last_name,date_of_birth:a.date_of_birth,residence:a.residence,address_line_1:a.address_line_1,address_line_2:a.address_line_2||void 0,address_city:a.city_address,address_state:a.state_address||void 0,address_postcode:a.address_postcode||void 0,phone:a.phone,secret_question:a.secret_question_array[a.secret_question_inx],secret_answer:a.secret_answer.replace('""',"'"),affiliate_token:"",forex_trading_experience:b.forex_trading_experience,forex_trading_frequency:b.forex_trading_frequency,indices_trading_experience:b.indices_trading_experience,indices_trading_frequency:b.indices_trading_frequency,commodities_trading_experience:b.commodities_trading_experience,commodities_trading_frequency:b.commodities_trading_frequency,stocks_trading_experience:b.stocks_trading_experience,stocks_trading_frequency:b.stocks_trading_frequency,other_derivatives_trading_experience:b.other_derivatives_trading_experience,other_derivatives_trading_frequency:b.other_derivatives_trading_frequency,other_instruments_trading_experience:b.other_instruments_trading_experience,other_instruments_trading_frequency:b.other_instruments_trading_frequency,employment_industry:b.employment_industry,education_level:b.education_level,income_source:b.income_source,net_income:b.net_income,estimated_worth:b.estimated_worth,accept_risk:1};return c},g.financial.new_account_maltainvest=function(){g.financial.create_request()},g.risk.accept=function(){var c=g.financial.create_request();g.risk.visible=!1,g.financial.disabled=!0,b.send(c).then(function(c){var d=c.new_account_maltainvest;return oauth=local_storage.get("oauth"),oauth.push({id:d.client_id,token:d.oauth_token,is_virtual:d.is_virtual}),local_storage.set("oauth",oauth),a.growl.notice({message:"Account successfully created"}),a.growl.notice({message:"Switching to your new account ..."}),b.switch_account(d.client_id).then(function(){j.dialog("destroy"),l.hide()})})["catch"](function(a){g.financial.disabled=!1,m(a)})},g.risk.decline=function(){g.risk.visible=!1},g.route.update=function(a){var b={user:930,financial:1390};g.route.value=a,j.dialog("option","height",b[a]),j.dialog("widget").trigger("dialogresizestop")},k=d.bind(c[0],g);var h=b.send({get_settings:1}).then(function(a){g.user.residence=a.get_settings.country_code,g.user.residence_name=a.get_settings.country})["catch"](m);h.then(function(){return b.cached.send({residence_list:1})}).then(function(a){var b=e.find(a.residence_list,{value:g.user.residence});g.user.phone="+"+b.phone_idd})["catch"](m),h.then(function(){return b.cached.send({states_list:g.user.residence})}).then(function(a){g.user.state_address_array=a.states_list,g.user.state_address=a.states_list[0].value})["catch"](m),h.then(function(){return b.cached.send({landing_company:g.user.residence})}).then(function(a){var b=a.landing_company.financial_company,c=a.landing_company.gaming_company;g.company.financial=b,g.company.gaming=c,g.company.type=b&&!c&&"maltainvest"===b.shortcode?"maltainvest":"normal"})["catch"](m)}require(["text!realaccount/realaccount.html"]),require(["css!realaccount/realaccount.css"]);var j=null,k=null,l=null,m=function(b){a.growl.error({message:b.message})};return{init:g}});