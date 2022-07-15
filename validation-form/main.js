//============================================= Passport Type Form ===========================================

const official_passport = document.getElementById('official-passport');
const ordinary_passport = document.getElementById('ordinary-passport');
const official_passport_show = document.querySelector('.official-passport-show')

official_passport.addEventListener('click', () => {
    official_passport_show.style.display = 'block';
});

ordinary_passport.addEventListener('click', () => {
    official_passport_show.style.display = 'none';
});

function myFunction() {
    var select_supporting_doc = document.getElementById('select-supporting-doc').value;
    var payment_required_no = document.getElementById('payment-required-no');
    var payment_required_yes = document.getElementById('payment-required-yes');

    if(select_supporting_doc == 'noc'){
        payment_required_no.disabled = true;
        payment_required_yes.disabled = true;
        payment_required_yes.checked = true;
    }
    else{
        payment_required_no.disabled = false;
        payment_required_yes.disabled = false;
    }
}


//===================================== Personal Information =============================================

const url= 'country_code.json';
const apply_for = document.getElementById('apply-for');
const full_name = document.getElementById('full-name');
const given_name = document.getElementById('given-name');
const surname = document.getElementById('surname');

apply_for.addEventListener('click', () => {
    if(apply_for.checked == true){
        full_name.disabled = true;
        full_name.value = 'Nishan Ahmed';
        given_name.disabled = true;
        given_name.value = 'Nishan';
        surname.disabled = true;
        surname.value = 'Ahmed';
    }
    else{
        full_name.disabled = false;
        full_name.value = '';
        given_name.disabled = false;
        given_name.value = '';
        surname.disabled = false;
        surname.value = '';
    }
});



const mobile_num = document.getElementById('mobile-num');
const country_code = document.getElementById('country-code');
let code_list;

// Fetching Country name

fetch(url)
.then(res => {
    if (!res) {
        const message = `Error ${res.status}`
        throw new Error(message)
    }
    return res.json();
})
.then((data) => {
    get_country_code_list(data);
    get_country_list_of_birth(data);
    get_issuing_country_list(data);
})

// List of country and country phone code

function get_country_code_list(lists){
    code_list = '<option selected></option>';
    lists.forEach((item) => {
        code_list += `
        <option value="${item.code}">${item.name} ${item.code}</option>
        ` ;
        country_code.innerHTML = code_list;
    });
}

// get code value from country code to mobile number input field

function get_code_to_mobile(){
    mobile_num.value = country_code.value;  
}

mobile_num.addEventListener('keydown', (e) => {
    if (e.code == 8 && mobile_num.focus && mobile_num.value.length < 4) {
        e.preventDefault();
    }
    if(mobile_num.value.length > 12){
        document.getElementById('sms').disabled = false;
    }
});

const district_by_birth = document.getElementById('district-by-birth');
const dist = document.getElementById('dist')
const country_by_birth = document.getElementById('country-by-birth')
let birth_country_list;

function get_country_list_of_birth(lists){
    birth_country_list = '<option selected></option>';
    lists.forEach((item) => {
        birth_country_list += `
        <option value="${item.name}">${item.name}</option>
        ` ;
        country_by_birth.innerHTML = birth_country_list;
    });
}

function check_country(){
    if(country_by_birth.value == 'Bangladesh'){
        district_by_birth.style.display = 'block';
        dist.style.display = 'none'
    }
    else{
        district_by_birth.style.display = 'none';
        dist.style.display = 'block'
    }
}

// List of district for birth place

const district_api_url = 'https://bdapis.herokuapp.com/api/v1.0/districts'
let district_list;

fetch(district_api_url)
.then(res => {
    if (!res) {
        const message = `Error ${res.status}`
        throw new Error(message)
    }
    return res.json();
})
.then((data) => get_district_list(data))

function get_district_list(lists){
    lists = Object.values(lists);
    district_list = '<option selected></option>';

    lists[1].forEach((item) => {
        district_list += `
        <option value="${item._id}">${item.district}</option>
        ` ;
        district_by_birth.innerHTML = district_list;
    });
}

//===================================== Address =============================================

const check_present_address = document.getElementById("check-present-address");

const district_address = document.getElementById('district-address');
const city = document.getElementById('city');
const road = document.getElementById('road');
const post_office = document.getElementById('post-office');
const post_code = document.getElementById('post-code');
const police_station = document.getElementById('police-station');
const present_district_address = document.getElementById('present-district-address');
const present_city = document.getElementById('present-city');
const present_road = document.getElementById('present-road');
const present_post_office = document.getElementById('present-post-office');
const present_post_code = document.getElementById('present-post-code');
const present_police_station = document.getElementById('present-police-station')

check_present_address.addEventListener('click', (e) => {
    if(check_present_address.checked == true){
        present_district_address.value = district_address.value;
        present_district_address.disabled = true;
        present_city.value = city.value;
        present_city.disabled = true;
        present_road.value = road.value;
        present_road.disabled = true;
        present_post_office.value = post_office.value;
        present_post_office.disabled = true;
        present_post_code.value = post_code.value;
        present_post_code.disabled = true;
        present_police_station.value = police_station.value;
        present_police_station.disabled = true;
    }
    else{
        present_district_address.value = '';
        present_district_address.disabled = false;
        present_city.value = '';
        present_city.disabled = false;
        present_road.value = '';
        present_road.disabled = false;
        present_post_office.value = '';
        present_post_office.disabled = false;
        present_post_code.value = '';
        present_post_code.disabled = false;
        present_police_station.value = '';
        present_police_station.disabled = false;
    }
})



//===================================== ID Documents =============================================

//Checking passport type
const mrp_passport = document.getElementById('mrp-passport');
const e_passport = document.getElementById('e-passport');
const no_passport = document.getElementById('no-passport')
const passport_request = document.getElementById('passport-request');

mrp_passport.addEventListener('click', () => {
    passport_request.style.display = 'block';
});

e_passport.addEventListener('click', () => {
    passport_request.style.display = 'block';
});

no_passport.addEventListener('click', () => {
    passport_request.style.display = 'none';
});

// Checking wether have another country passport
const dont_have_other_country_passport = document.getElementById('dont-have');
const have_other_country_passport = document.getElementById('have-passport');
const country_issue = document.getElementById('country-issue');


dont_have_other_country_passport.addEventListener('click', () => {
    country_issue.style.display = 'none';
});

have_other_country_passport.addEventListener('click', () => {
    country_issue.style.display = 'block';
});

// Fetching country list to select other country which has issue
const issuing_country = document.getElementById('issuing-country-list');
let issuing_countries_list;

function get_issuing_country_list(lists){
    issuing_countries_list = '<option selected></option>';
    lists.forEach((item) => {
        issuing_countries_list += `
        <option value="${item.name}">${item.name}</option>
        ` ;
        issuing_country.innerHTML = issuing_countries_list;
    });
}

//===================================== Parental Information =============================================

// Fetching Nationality API for Father, Mother and Guardian
const nationality_api_url = 'nationality.json'
const fathers_nationality = document.getElementById('fathers-nationality');
const mothers_nationality = document.getElementById('mothers-nationality');
const guardians_nationality = document.getElementById('guardians-nationality');
let fathers_nationality_list, mothers_nationality_list, guardians_nationality_list;

fetch(nationality_api_url)
.then(res => {
    if (!res) {
        const message = `Error ${res.status}`
        throw new Error(message)
    }
    return res.json();
})
.then((nationality_lists) => {
    get_fathers_nationality_list(nationality_lists);
    get_mothers_nationality_list(nationality_lists);
    get_guardians_nationality_list(nationality_lists);
});

// Fathers nationality
function get_fathers_nationality_list(lists){
    fathers_nationality_list = '<option selected></option>';
    lists.forEach((item) => {
        fathers_nationality_list += `
        <option value="${item.nationality}">${item.nationality}</option>
        ` ;
        fathers_nationality.innerHTML = fathers_nationality_list;
    });
}

// Mothers nationality
function get_mothers_nationality_list(lists){
    mothers_nationality_list = '<option selected></option>';
    lists.forEach((item) => {
        mothers_nationality_list += `
        <option value="${item.nationality}">${item.nationality}</option>
        ` ;
        mothers_nationality.innerHTML = mothers_nationality_list;
    });
}

// Guardians nationality
function get_guardians_nationality_list(lists){
    guardians_nationality_list = '<option selected></option>';
    lists.forEach((item) => {
        guardians_nationality_list += `
        <option value="${item.nationality}">${item.nationality}</option>
        ` ;
        guardians_nationality.innerHTML = guardians_nationality_list;
    });
}

// Blocking input fields

const father_unknown = document.getElementById('father-unknown')
const fathers_name = document.getElementById('fathers-name')
const fathers_profession = document.getElementById('fathers-profession')
const fathers_nid = document.getElementById('fathers-nid')

const mother_unknown = document.getElementById('mother-unknown')
const mothers_name = document.getElementById('mothers-name')
const mothers_profession = document.getElementById('mothers-profession')
const mothers_nid = document.getElementById('mothers-nid')

const guardian_unknown = document.getElementById('guardian-unknown');
const guardians_name = document.getElementById('guardians-name')
const guardians_profession = document.getElementById('guardians-profession')
const guardians_nid = document.getElementById('guardians-nid')

father_unknown.addEventListener('click', () => {
    if(father_unknown.checked == true){
        fathers_name.disabled = true;
        fathers_name.value = '';
        fathers_profession.disabled = true;
        fathers_profession.value = '';
        fathers_nationality.disabled = true;
        fathers_nationality.value = '';
        fathers_nid.disabled = true;
        fathers_nid.value = '';
        
    }
    else{
        fathers_name.disabled = false;
        fathers_profession.disabled = false;
        fathers_nationality.disabled = false;
        fathers_nid.disabled = false;
    }
});

mother_unknown.addEventListener('click', () => {
    if(mother_unknown.checked == true){
        mothers_name.disabled = true;
        mothers_name.value = '';
        mothers_profession.disabled = true;
        mothers_profession.value = '';
        mothers_nationality.disabled = true;
        mothers_nationality.value = '';
        mothers_nid.disabled = true;
        mothers_nid.value = '';
    }
    else{
        mothers_name.disabled = false;
        mothers_profession.disabled = false;
        mothers_nationality.disabled = false;
        mothers_nid.disabled = false;
    }
});

guardian_unknown.addEventListener('click', () => {
    if(guardian_unknown.checked == true){
        guardians_name.disabled = true;
        guardians_name.value = '';
        guardians_profession.disabled = true;
        guardians_profession.value = '';
        guardians_nationality.disabled = true;
        guardians_nationality.value = '';
        guardians_nid.disabled = true;
        guardians_nid.value = '';
    }   
    else{
        guardians_name.disabled = false;
        guardians_profession.disabled = false;
        guardians_nationality.disabled = false;
        guardians_nid.disabled = false;
    }
});


//============================================ Validation ==============================================

// const validations = {
//     step1 : {
//         passport_type : {
//             rules : ['required'],
//             messages : {
//                 'required' : 'Passport Type is required.'
//             }
//         },
//         supporting_doc : {
//             rules : ['required_if:passport_type=official'],
//             messages : {
//                 'required_if' : {
//                     'passport_type=official' : 'Supporting document is required'
//                 }
//             }
//         },
//     },
// };

const forms = document.querySelectorAll('.form');

forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        $("body, html").animate({
            scrollTop: $(document).height(0)
        }, 0)
        
        const step = form.getAttribute('data-step')

        if(step == 'step1'){
            passportTypeValidate();
            if(passportTypeCheck() && passportTypeValidate()){
                
                document.getElementById('v-pills-ps-type-tab').classList.remove('active');
                document.getElementById('v-pills-ps-type').classList.remove('active');
                document.getElementById('v-pills-ps-type').classList.remove('show');

                document.getElementById('v-pills-ps-i-tab').classList.remove('disabled');
                document.getElementById('v-pills-ps-i-tab').classList.add('active');

                document.getElementById('v-pills-ps-i').classList.add('show');
                document.getElementById('v-pills-ps-i').classList.add('active');  
            }
        }
        if(step == 'step2'){
            personalInformationValidate();
            if(personalInformationCheck() && personalInformationValidate()){
        
                document.getElementById('v-pills-ps-i-tab').classList.remove('active');
                document.getElementById('v-pills-ps-i').classList.remove('active');
                document.getElementById('v-pills-ps-i').classList.remove('show');

                document.getElementById('v-pills-address-tab').classList.remove('disabled');
                document.getElementById('v-pills-address-tab').classList.add('active');

                document.getElementById('v-pills-address').classList.add('show');
                document.getElementById('v-pills-address').classList.add('active');  
            }
        }
        if(step == 'step3'){
            addressValidate()
            if(addressCheck() && addressValidate()){
                
                document.getElementById('v-pills-address-tab').classList.remove('active');
                document.getElementById('v-pills-address').classList.remove('active');
                document.getElementById('v-pills-address').classList.remove('show');
                
                document.getElementById('v-pills-id-doc-tab').classList.remove('disabled');
                document.getElementById('v-pills-id-doc-tab').classList.add('active');

                document.getElementById('v-pills-id-doc').classList.add('show');
                document.getElementById('v-pills-id-doc').classList.add('active');
            }
        }
        if(step == 'step4'){
            idDocumentsValidate();
            if(idDocumentsCheck() && idDocumentsValidate()){
                
                document.getElementById('v-pills-id-doc-tab').classList.remove('active');
                document.getElementById('v-pills-id-doc').classList.remove('active');
                document.getElementById('v-pills-id-doc').classList.remove('show');
                
                document.getElementById('v-pills-p-i-tab').classList.remove('disabled');
                document.getElementById('v-pills-p-i-tab').classList.add('active');

                document.getElementById('v-pills-p-i').classList.add('show');
                document.getElementById('v-pills-p-i').classList.add('active');
            }
        }
        if(step == 'step5'){
            parentalInformationValidate();
            if(parentalInformationCheck() && parentalInformationValidate()){
                
                document.getElementById('v-pills-p-i-tab').classList.remove('active');
                document.getElementById('v-pills-p-i').classList.remove('active');
                document.getElementById('v-pills-p-i').classList.remove('show');
                
                document.getElementById('v-pills-s-i-tab').classList.remove('disabled');
                document.getElementById('v-pills-s-i-tab').classList.add('active');

                document.getElementById('v-pills-s-i').classList.add('show');
                document.getElementById('v-pills-s-i').classList.add('active');
            }
        }
        if(step == 'step6'){
            spouseInformationValidate()
            if(spouseInformationCheck() && spouseInformationValidate()){
                
                document.getElementById('v-pills-s-i-tab').classList.remove('active');
                document.getElementById('v-pills-s-i').classList.remove('active');
                document.getElementById('v-pills-s-i').classList.remove('show');
                
                document.getElementById('v-pills-emerge-contact-tab').classList.remove('disabled');
                document.getElementById('v-pills-emerge-contact-tab').classList.add('active');
                document.getElementById('v-pills-emerge-contact').classList.add('show');
                document.getElementById('v-pills-emerge-contact').classList.add('active');
            }
        }
        if(step == 'step7'){
            emergencyContactValidate();
            if(emergencyContactCheck() && emergencyContactValidate()){
                alert('Form submitted');
            }
            
            
        }

        // if(validations[step]){
        //     Object.keys(validations[step]).forEach((input) => {
        //         validations[step][input].rules.forEach((rule) => {
        //             if(rule == 'required'){
        //                 var message = validations[step][input].messages[rule];
        //                 console.log(message);
        //             }
        //             else if(rule.indexOf('required_if') > -1 ){
        //                 let dependant_input_fields =  rule.split(':')
        //                 console.log(dependant_input_fields);
        //                 if( dependant_input_fields[1] == 'passport_type=official' ){
        //                     let text = validations[step][input].messages['required_if'][dependant_input_fields[1]];
        //                     console.log(text)
        //                 }
        //             }
        //         })
        //     })
            
        // }
    });
});

let retrievedPassportTypeData, retrievedPersonalInformationData, retrievedAddressData, retrievedIdDocumentsData, retrievedParentalInformationData, retrievedSpouseInformationData, retrievedEmergencyContactData;


function passportTypeCheck(){
    const ordinaryPassportValue = document.getElementById('ordinary-passport')
    const officialPassportValue = document.getElementById('official-passport');
    const supporting_doc_value = document.getElementById('select-supporting-doc');
    const payReqNoValue = document.getElementById('payment-required-no');
    const payReqYesValue = document.getElementById('payment-required-yes');
    let checkPassport, checkPayReqValue;

    if(ordinaryPassportValue.checked){
        checkPassport = ordinaryPassportValue;

        storePassportTypeData = {
            passport_type : checkPassport.value,
        }
        // Put the object into storage
        localStorage.setItem('storePassportTypeData', JSON.stringify(storePassportTypeData));
    }
    
    if(officialPassportValue.checked){
        checkPassport = officialPassportValue;
        if(payReqNoValue.checked){
            checkPayReqValue = payReqNoValue.value;
        }
    
        if(payReqYesValue.checked){
            checkPayReqValue = payReqYesValue.value;
        }

        storePassportTypeData = {
            passport_type : checkPassport.value,
            supporting_doc_value : supporting_doc_value.value,
            checkPayReqValue : checkPayReqValue,
        }

        // Put the object into storage
        localStorage.setItem('storePassportTypeData', JSON.stringify(storePassportTypeData));
    }
    return true    
}

function personalInformationCheck(){
    const gender = document.getElementById('gender');
    const full_name = document.getElementById('full-name');
    const given_name = document.getElementById('given-name');
    const surname = document.getElementById('surname');
    const profession = document.getElementById('profession');
    const religion = document.getElementById('religion');
    const country_code = document.getElementById('country-code');
    const mobile_num = document.getElementById('mobile-num');
    const country_by_birth = document.getElementById('country-by-birth');
    const district_by_birth = document.getElementById('district-by-birth');
    const dist = document.getElementById('dist');
    const birth_date = document.getElementById('birth-date');
    const citizenship = document.getElementById('citizenship');

    const select_values = document.querySelectorAll('.select2-selection__choice__display');
   
    let map = [];

    select_values.forEach(function(item){
        item = item.textContent;
        map.push(item);
        
    });
    console.log(map);

    var storePersonalInformationData = {
        gender : gender.value,
        full_name : full_name.value,
        given_name : given_name.value,
        surname : surname.value,
        profession : profession.value,
        religion : religion.value,
        country_code : country_code.value,
        mobile_num : mobile_num.value,
        country_by_birth : map,
        district_by_birth : district_by_birth.value,
        dist : dist.value,
        birth_date : birth_date.value,
        citizenship : citizenship.value
    }

    // Put the object into storage
    localStorage.setItem('storePersonalInformationData', JSON.stringify(storePersonalInformationData));

    // Retrieve the object from storage
    retrievedPersonalInformationData = localStorage.getItem('storePersonalInformationData');
    retrievedPersonalInformationData = JSON.parse(retrievedPersonalInformationData);

    return true;

}

function addressCheck(){
    const district_address = document.getElementById('district-address').value;
    const city = document.getElementById('city').value;
    const road = document.getElementById('road').value;
    const post_office = document.getElementById('post-office').value;
    const post_code = document.getElementById('post-code').value;
    const police_station = document.getElementById('police-station').value;
    const present_district_address = document.getElementById('present-district-address').value;
    const present_city = document.getElementById('present-city').value;
    const present_road = document.getElementById('present-road').value;
    const present_post_office = document.getElementById('present-post-office').value;
    const present_post_code = document.getElementById('present-post-code').value;
    const present_police_station = document.getElementById('present-police-station').value
    const regional_passport = document.getElementById('regional-passport');
    const bd_mission_passport = document.getElementById('bd-mission-passport');
    let availablePassport;

    if(regional_passport.checked){
        availablePassport = regional_passport.value;
    }
    if(bd_mission_passport.checked){
        availablePassport = bd_mission_passport.value;
    }

    storeAddressData = {
        district_address : district_address,
        city : city,
        road : road,
        post_office : post_office,
        post_code : post_code,
        police_station : police_station,
        present_district_address : present_district_address,
        present_city : present_city,
        present_road : present_road,
        present_post_office : present_post_office,
        present_post_code : present_post_code,
        present_police_station : present_police_station,
        availablePassport : availablePassport,
    }

    // Put the object into storage
    localStorage.setItem('storeAddressData', JSON.stringify(storeAddressData));

    return true;
}

function idDocumentsCheck(){
    const mrp_passport = document.getElementById('mrp-passport');
    const e_passport = document.getElementById('e-passport');
    const no_passport = document.getElementById('no-passport');
    const reissue_reason = document.getElementById('reissue-reason').value;
    const previous_passport_number = document.getElementById('previous-passport-number').value;
    const issue_date = document.getElementById('issue-date').value;
    const expire_date = document.getElementById('expire-date').value;
    const dont_have = document.getElementById('dont-have');
    const have_passport = document.getElementById('have-passport');
    const issuing_country_list = document.getElementById('issuing-country-list').value
    const foreign_passport_number = document.getElementById('foreign-passport-number').value
    const birth_register_number = document.getElementById('birth-register-number').value;
    let passportCategory, havePassport;

    if(mrp_passport.checked){
        passportCategory = mrp_passport.value;
    }
    if(e_passport.checked){
        passportCategory = e_passport.value;
    }
    if(no_passport.checked){
        passportCategory = no_passport.value;
    }
    
    if(dont_have.checked){
        havePassport = dont_have.value;
    }
    if(have_passport.checked){
        havePassport = have_passport.value;
    }

    storeIdDocumentsData = {
        passportCategory : passportCategory,
        reissue_reason : reissue_reason,
        previous_passport_number : previous_passport_number,
        issue_date : issue_date,
        expire_date : expire_date,
        havePassport : havePassport,
        issuing_country_list : issuing_country_list,
        foreign_passport_number : foreign_passport_number,
        birth_register_number : birth_register_number
    }

    // Put the object into storage
    localStorage.setItem('storeIdDocumentsData', JSON.stringify(storeIdDocumentsData));

    return true;
}

function parentalInformationCheck(){
    const fathers_name = document.getElementById('fathers-name').value;
    const fathers_profession = document.getElementById('fathers-profession').value;
    const fathers_nationality = document.getElementById('fathers-nationality').value;
    const fathers_nid = document.getElementById('fathers-nid').value;

    const mothers_name = document.getElementById('mothers-name').value;
    const mothers_profession = document.getElementById('mothers-profession').value;
    const mothers_nationality = document.getElementById('mothers-nationality').value;
    const mothers_nid = document.getElementById('mothers-nid').value;

    const guardians_name = document.getElementById('guardians-name').value;
    const guardians_profession = document.getElementById('guardians-profession').value;
    const guardians_nationality = document.getElementById('guardians-nationality').value;
    const guardians_nid = document.getElementById('guardians-nid').value;

    storeParentalInformation = {
        fathers_name : fathers_name,
        fathers_profession : fathers_profession,
        fathers_nationality : fathers_nationality,
        fathers_nid : fathers_nid,
        mothers_name : mothers_name,
        mothers_profession : mothers_profession,
        mothers_nationality : mothers_nationality,
        mothers_nid : mothers_nid,
        guardians_name : guardians_name,
        guardians_profession : guardians_profession,
        guardians_nationality : guardians_nationality,
        guardians_nid : guardians_nid,
    }

    // Put the object into storage
    localStorage.setItem('storeParentalInformation', JSON.stringify(storeParentalInformation));

    return true;
    
}

function spouseInformationCheck(){
    const marriage_status = document.getElementById('marriage-status').value;

    storeSpouseInformationData = {
        marriage_status : marriage_status,
    }

    // Put the object into storage
    localStorage.setItem('storeSpouseInformationData', JSON.stringify(storeSpouseInformationData));

    return true;
}

function emergencyContactCheck(){
    const emergency_person = document.getElementById('emergency-person').value;
    const emerge_person_name = document.getElementById('emerge-person-name').value;
    const emergency_person_district_address = document.getElementById('emergency-person-district-address').value;
    const emergency_person_city = document.getElementById('emergency-person-city').value;
    const emergency_person_road = document.getElementById('emergency-person-road').value;
    const emergency_person_post_office = document.getElementById('emergency-person-post-office').value;
    const emergency_person_post_code = document.getElementById('emergency-person-post-code').value;
    const emergency_person_police_station = document.getElementById('emergency-person-police-station').value;
    const emergency_person_email = document.getElementById('emergency-person-email').value;
    const emergency_person_country_code = document.getElementById('emergency-person-country-code').value;
    const emergency_person_mobile_num = document.getElementById('emergency-person-mobile-num').value;

    storeEmergencyContact = {
        emergency_person : emergency_person,
        emerge_person_name : emerge_person_name,
        emergency_person_district_address : emergency_person_district_address,
        emergency_person_city : emergency_person_city,
        emergency_person_road : emergency_person_road,
        emergency_person_post_office : emergency_person_post_office,
        emergency_person_post_code : emergency_person_post_code,
        emergency_person_police_station : emergency_person_police_station,
        emergency_person_email : emergency_person_email,
        emergency_person_country_code : emergency_person_country_code,
        emergency_person_mobile_num : emergency_person_mobile_num,
    }

    // Put the object into storage
    localStorage.setItem('storeEmergencyContact', JSON.stringify(storeEmergencyContact));

    return true;

}

function populateData(){

    document.getElementById('v-pills-ps-i-tab').classList.remove('disabled');
    document.getElementById('v-pills-address-tab').classList.remove('disabled');
    document.getElementById('v-pills-id-doc-tab').classList.remove('disabled');
    document.getElementById('v-pills-p-i-tab').classList.remove('disabled');
    document.getElementById('v-pills-s-i-tab').classList.remove('disabled');
    document.getElementById('v-pills-emerge-contact-tab').classList.remove('disabled');
        

    // passport type
    const ordinaryPassportValue = document.getElementById('ordinary-passport')
    const officialPassportValue = document.getElementById('official-passport');
    const supporting_doc_value = document.getElementById('select-supporting-doc');
    const payReqNoValue = document.getElementById('payment-required-no');
    const payReqYesValue = document.getElementById('payment-required-yes');

    //personal Information
    const gender = document.getElementById('gender');
    const full_name = document.getElementById('full-name');
    const given_name = document.getElementById('given-name');
    const surname = document.getElementById('surname');
    const profession = document.getElementById('profession');
    const religion = document.getElementById('religion');
    const country_code = document.getElementById('country-code');
    const mobile_num = document.getElementById('mobile-num');
    const country_by_birth = document.getElementById('country-by-birth');
    const district_by_birth = document.getElementById('district-by-birth');
    const dist = document.getElementById('dist');
    const birth_date = document.getElementById('birth-date');
    const citizenship = document.getElementById('citizenship');
    const select_li = document.querySelector('.select2-selection__choice');

    //address
    const district_address = document.getElementById('district-address');
    const city = document.getElementById('city');
    const road = document.getElementById('road');
    const post_office = document.getElementById('post-office');
    const post_code = document.getElementById('post-code');
    const police_station = document.getElementById('police-station');
    const present_district_address = document.getElementById('present-district-address');
    const present_city = document.getElementById('present-city');
    const present_road = document.getElementById('present-road');
    const present_post_office = document.getElementById('present-post-office');
    const present_post_code = document.getElementById('present-post-code');
    const present_police_station = document.getElementById('present-police-station')
    const regional_passport = document.getElementById('regional-passport');
    const bd_mission_passport = document.getElementById('bd-mission-passport');

    //ID Documents
    const mrp_passport = document.getElementById('mrp-passport');
    const e_passport = document.getElementById('e-passport');
    const no_passport = document.getElementById('no-passport');
    const reissue_reason = document.getElementById('reissue-reason');
    const previous_passport_number = document.getElementById('previous-passport-number');
    const issue_date = document.getElementById('issue-date');
    const expire_date = document.getElementById('expire-date');
    const dont_have = document.getElementById('dont-have');
    const have_passport = document.getElementById('have-passport');
    const issuing_country_list = document.getElementById('issuing-country-list')
    const foreign_passport_number = document.getElementById('foreign-passport-number')
    const birth_register_number = document.getElementById('birth-register-number');

    //parental Inforamtion
    const fathers_name = document.getElementById('fathers-name');
    const fathers_profession = document.getElementById('fathers-profession');
    const fathers_nationality = document.getElementById('fathers-nationality');
    const fathers_nid = document.getElementById('fathers-nid');
    const mothers_name = document.getElementById('mothers-name');
    const mothers_profession = document.getElementById('mothers-profession');
    const mothers_nationality = document.getElementById('mothers-nationality');
    const mothers_nid = document.getElementById('mothers-nid');
    const guardians_name = document.getElementById('guardians-name');
    const guardians_profession = document.getElementById('guardians-profession');
    const guardians_nationality = document.getElementById('guardians-nationality');
    const guardians_nid = document.getElementById('guardians-nid');

    //spouse Information
    const marriage_status = document.getElementById('marriage-status');

    //emergency contact
    const emergency_person = document.getElementById('emergency-person');
    const emerge_person_name = document.getElementById('emerge-person-name');
    const emergency_person_district_address = document.getElementById('emergency-person-district-address');
    const emergency_person_city = document.getElementById('emergency-person-city');
    const emergency_person_road = document.getElementById('emergency-person-road');
    const emergency_person_post_office = document.getElementById('emergency-person-post-office');
    const emergency_person_post_code = document.getElementById('emergency-person-post-code');
    const emergency_person_police_station = document.getElementById('emergency-person-police-station');
    const emergency_person_email = document.getElementById('emergency-person-email');
    const emergency_person_country_code = document.getElementById('emergency-person-country-code');
    const emergency_person_mobile_num = document.getElementById('emergency-person-mobile-num');

    // Retrieve Passport type from storage
    retrievedPassportTypeData = localStorage.getItem('storePassportTypeData');
    retrievedPassportTypeData = JSON.parse(retrievedPassportTypeData)

    if(retrievedPassportTypeData.passport_type == 'official'){
        official_passport_show.style.display = 'block';
        officialPassportValue.checked = true;
        supporting_doc_value.value = retrievedPassportTypeData.supporting_doc_value;
        if(retrievedPassportTypeData.checkPayReqValue == 'yes'){
            payReqYesValue.checked = true;
            
        }
        else{
            payReqNoValue.checked = true;
        }
    }
    else{
        ordinaryPassportValue.checked = true;
    }


    // Retrieve Personal Information from storage
    retrievedPersonalInformationData = localStorage.getItem('storePersonalInformationData');
    retrievedPersonalInformationData = JSON.parse(retrievedPersonalInformationData);

    gender.value = retrievedPersonalInformationData.gender;
    full_name.value = retrievedPersonalInformationData.full_name;
    given_name.value = retrievedPersonalInformationData.given_name;
    surname.value = retrievedPersonalInformationData.surname;
    profession.value = retrievedPersonalInformationData.profession;
    religion.value = retrievedPersonalInformationData.religion;
    country_code.value = retrievedPersonalInformationData.country_code;
    mobile_num.value = retrievedPersonalInformationData.mobile_num;
    country_by_birth.value = retrievedPersonalInformationData.country_by_birth;
    check_country();
    district_by_birth.value = retrievedPersonalInformationData.district_by_birth;
    dist.value = retrievedPersonalInformationData.dist;
    birth_date.value = retrievedPersonalInformationData.birth_date;
    citizenship.value = retrievedPersonalInformationData.citizenship;

    multi_values = retrievedPersonalInformationData.country_by_birth

    let data = '';
        multi_values.forEach((item, i) => {
            console.log(item)
            console.log(i)
            console.log(select_li)
            data += `
            <li class="select2-selection__choice" data-select2-id="select2-data-5-o3ab"><button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-country-by-birth-container-choice-ditp-vq78"><span aria-hidden="true">×</span></button><span class="select2-selection__choice__display" id="select2-country-by-birth-container-choice-ditp-vq78">${item}</span></li>
            `
            //select_li.children[1].innerText = item
            document.getElementById('select2-country-by-birth-container').innerHTML = data;
            
        })
    

    // Retrieve Address Information from storage
    retrievedAddressData = localStorage.getItem('storeAddressData');
    retrievedAddressData = JSON.parse(retrievedAddressData);

    district_address.value = retrievedAddressData.district_address
    city.value = retrievedAddressData.city
    road.value = retrievedAddressData.road
    post_office.value = retrievedAddressData.post_office
    post_code.value = retrievedAddressData.post_code
    police_station.value = retrievedAddressData.police_station
    present_district_address.value = retrievedAddressData.present_district_address
    present_city.value = retrievedAddressData.present_city
    present_road.value = retrievedAddressData.present_road
    present_post_office.value = retrievedAddressData.present_post_office
    present_post_code.value = retrievedAddressData.present_post_code
    present_police_station.value = retrievedAddressData.present_police_station

    if(retrievedAddressData.availablePassport == 'regional'){
        regional_passport.checked = true;
    }
    else{
        bd_mission_passport.checked = true;
    }

    // Retrieve ID Document Information from storage
    retrievedIdDocumentsData = localStorage.getItem('storeIdDocumentsData');
    retrievedIdDocumentsData = JSON.parse(retrievedIdDocumentsData)

    if(retrievedIdDocumentsData.passportCategory == 'mrp-passport'){
        mrp_passport.checked = true;
        document.getElementById('passport-request').style.display = 'block';
    }
    else if(retrievedIdDocumentsData.passportCategory == 'e-passport'){
        e_passport.checked = true;
        document.getElementById('passport-request').style.display = 'block';
    }
    else{
        no_passport.checked = true;
    }

    reissue_reason.value = retrievedIdDocumentsData.reissue_reason;
    previous_passport_number.value = retrievedIdDocumentsData.previous_passport_number;
    issue_date.value = retrievedIdDocumentsData.issue_date;
    expire_date.value = retrievedIdDocumentsData.expire_date;
    issuing_country_list.value = retrievedIdDocumentsData.issuing_countries_list;
    foreign_passport_number.value = retrievedIdDocumentsData.foreign_passport_number;
    birth_register_number.value = retrievedIdDocumentsData.birth_register_number;

    if(retrievedIdDocumentsData.havePassport == 'yes'){
        have_passport.checked = true;
        document.getElementById('country-issue').style.display = 'block';
    }
    else{
        dont_have.checked = true;
    }

    // Retrieve Parental Information from storage
    retrievedParentalInformationData = localStorage.getItem('storeParentalInformation');
    retrievedParentalInformationData = JSON.parse(retrievedParentalInformationData);

    fathers_name.value = retrievedParentalInformationData.fathers_name
    fathers_profession.value = retrievedParentalInformationData.fathers_profession
    fathers_nationality.value = retrievedParentalInformationData.fathers_nationality
    fathers_nid.value = retrievedParentalInformationData.fathers_nid
    mothers_name.value = retrievedParentalInformationData.mothers_name
    mothers_profession.value = retrievedParentalInformationData.mothers_profession
    mothers_nationality.value = retrievedParentalInformationData.mothers_nationality
    mothers_nid.value = retrievedParentalInformationData.mothers_nid
    guardians_name.value = retrievedParentalInformationData.guardians_name
    guardians_profession.value = retrievedParentalInformationData.guardians_profession
    guardians_nationality.value = retrievedParentalInformationData.guardians_nationality
    guardians_nid.value = retrievedParentalInformationData.guardians_nid

    // Retrieve Spouse Information from storage
    retrievedSpouseInformationData = localStorage.getItem('storeSpouseInformationData');
    retrievedSpouseInformationData = JSON.parse(retrievedSpouseInformationData);

    marriage_status.value  = retrievedSpouseInformationData.marriage_status

    // Retrieve Emergency Contact Information from storage
    retrievedEmergencyContactData = localStorage.getItem('storeEmergencyContact');
    retrievedEmergencyContactData = JSON.parse(retrievedEmergencyContactData);

    emergency_person.value = retrievedEmergencyContactData.emergency_person
    emerge_person_name.value = retrievedEmergencyContactData.emerge_person_name
    emergency_person_district_address.value = retrievedEmergencyContactData.emergency_person_district_address
    emergency_person_city.value = retrievedEmergencyContactData.emergency_person_city
    emergency_person_road.value = retrievedEmergencyContactData.emergency_person_road
    emergency_person_post_office.value = retrievedEmergencyContactData.emergency_person_post_office
    emergency_person_post_code.value = retrievedEmergencyContactData.emergency_person_post_code
    emergency_person_police_station.value = retrievedEmergencyContactData.emergency_person_police_station
    emergency_person_email.value = retrievedEmergencyContactData.emergency_person_email
    emergency_person_country_code.value = retrievedEmergencyContactData.emergency_person_country_code
    emergency_person_mobile_num.value = retrievedEmergencyContactData.emergency_person_mobile_num
}

//retrievedPassportTypeData, retrievedPersonalInformationData, retrievedAddressData, retrievedIdDocumentsData, retrievedParentalInformationData, retrievedSpouseInformationData, retrievedEmergencyContactData;


// Validation of Forms

function setErrormessage(parent, message){
    const small = parent.querySelector('small');
    small.innerHTML = message;
}

function setSuccess(parent, message){
    const small = parent.querySelector('small');
    small.innerHTML = message;
}

function passportTypeValidate(){
    const ordinaryPassport = document.getElementById('ordinary-passport')
    const officialPassport = document.getElementById('official-passport');
    const supporting_doc = document.getElementById('select-supporting-doc');
    const payReqNo = document.getElementById('payment-required-no');
    const payReqYes = document.getElementById('payment-required-yes');

    if(ordinaryPassport.checked == false && officialPassport.checked == false){
        const parent = ordinaryPassport.parentElement.parentElement
        setErrormessage(parent, "Passport Type is required");
    }
    else if(officialPassport.checked == true){
        if(supporting_doc.value == ''){
            const parent = supporting_doc.parentElement
            setErrormessage(parent, "Select available supporting document is required.");
        }
        else{
            const parent = supporting_doc.parentElement
            setSuccess(parent, '');

            if(payReqNo.checked == false && payReqYes.checked == false){
                const parent = payReqNo.parentElement.parentElement
                setErrormessage(parent, "Please select whether a payment is required.");
            }
            else{
                const parent = payReqNo.parentElement.parentElement
                setErrormessage(parent, "");
                return true
            }
        }

        if(payReqNo.checked == false && payReqYes.checked == false){
            const parent = payReqNo.parentElement.parentElement
            setErrormessage(parent, "Please select whether a payment is required.");
        }
        else{
            const parent = payReqNo.parentElement.parentElement
            setErrormessage(parent, "");
            return true
        }
    }
    else{
        const parent = ordinaryPassport.parentElement.parentElement
        setSuccess(parent, '');
        return true;
    }   
}

function personalInformationValidate(){
    const gender = document.getElementById('gender');
    const full_name = document.getElementById('full-name');
    const given_name = document.getElementById('given-name');
    const surname = document.getElementById('surname');
    const profession = document.getElementById('profession');
    const religion = document.getElementById('religion');
    const country_code = document.getElementById('country-code');
    const mobile_num = document.getElementById('mobile-num');
    const country_by_birth = document.getElementById('country-by-birth');
    const district_by_birth = document.getElementById('district-by-birth');
    const dist = document.getElementById('dist');
    const birth_date = document.getElementById('birth-date');
    const citizenship = document.getElementById('citizenship');
    
    let isGender, isFullName, isGivenName, isSurname, isProfession, isReligion, isCountryCode, isMobileNum, isCountryBirth, isDistrictBirth, isdist, isbirthDate, isCitizenship; 

    // gender check
    if(gender.value == ''){
        const parent = gender.parentElement
        setErrormessage(parent, "Please select gender.");
        isGender = false;
        
    }
    else{
        const parent = gender.parentElement
        setSuccess(parent, '');
        isGender = true;
    }

    // full_name check
    if(full_name.value == ''){
        const parent = full_name.parentElement
        setErrormessage(parent, "Full Name (as per previous passport or NID/BRC) is required.");
        isFullName = false;
    }
    else{
        const parent = full_name.parentElement
        setSuccess(parent, '');
        isFullName = true;
    }

    // given_name check
    if(given_name.value == ''){
        const parent = given_name.parentElement
        setErrormessage(parent, "Given Name (as per previous passport or NID/BRC) is required.");
        isGivenName = false;
    }
    else{
        const parent = given_name.parentElement
        setSuccess(parent, '');
        isGivenName = true;
    }

    // surname check
    if(surname.value == ''){
        const parent = surname.parentElement
        setErrormessage(parent, "Given Name (as per previous passport or NID/BRC) is required.");
        isSurname = false;
    }
    else{
        const parent = surname.parentElement
        setSuccess(parent, '');
        isSurname = true;
    }

    // profession check
    if(profession.value == ''){
        const parent = profession.parentElement
        setErrormessage(parent, "Select profession is required.");
        isProfession = false;
    }
    else{
        const parent = profession.parentElement
        setSuccess(parent, '');
        isProfession = true;
    }

    // religion check
    if(religion.value == ''){
        const parent = religion.parentElement
        setErrormessage(parent, "Select religion is required.");
        isReligion = false;
        
    }
    else{
        const parent = religion.parentElement
        setSuccess(parent, '');
        isReligion = true;
    }

    // country_code check
    if(country_code.value == ''){
        const parent = country_code.parentElement
        setErrormessage(parent, "Select countrycode is required.");
        isCountryCode = false;
        
    }
    else{
        const parent = country_code.parentElement
        setSuccess(parent, '');
        isCountryCode = true;
    }

    // mobile_num check
    if(mobile_num.value == ''){
        const parent = mobile_num.parentElement
        setErrormessage(parent, "Select mobile num is required.");
        isMobileNum = false;
    }
    else{
        const parent = mobile_num.parentElement
        setSuccess(parent, '');
        isMobileNum = true;
    }

    // country_by_birth check
    if(country_by_birth.value == ''){
        const parent = country_by_birth.parentElement
        setErrormessage(parent, "Select country of birth is required.");
        isCountryBirth = false
    }
    else{
        const parent = country_by_birth.parentElement                               
        setSuccess(parent, '');
        isCountryBirth = true
    }

    // district_by_birth check
    const distcheck = (district_by_birth.value == '') && (dist.value == '')
    if( distcheck ){
        const parent = district_by_birth.parentElement
        console.log(Boolean(distcheck))
        setErrormessage(parent, "Select district of birth is required.");
        isDistrictBirth = false;
        isdist = false;
    }
    else{
        const parent = district_by_birth.parentElement
        setSuccess(parent, '');
        isDistrictBirth = true;
        isdist = true
    }

    // birth_date check
    if(birth_date.value == ''){
        const parent = birth_date.parentElement
        setErrormessage(parent, "Enter valid date");
        isbirthDate = false
    }
    else{
        const parent = birth_date.parentElement
        setSuccess(parent, '');
        isbirthDate = true;
    }

    // citizenship check
    if(citizenship.value == ''){
        const parent = citizenship.parentElement
        setErrormessage(parent, "Select citizenship is required.");
        isCitizenship = false;
    }
    else{
        const parent = citizenship.parentElement
        setSuccess(parent, '');
        isCitizenship = true;
    }

    if(isGender == true && isFullName == true && isGivenName == true && isSurname == true && isProfession == true && isReligion == true && isCountryCode == true && isMobileNum == true && isCountryBirth == true && (isDistrictBirth == true || isdist == true) && isbirthDate == true && isCitizenship == true ){
        return true;
    }
    
}

function addressValidate(){
    const district_address = document.getElementById('district-address');
    const city = document.getElementById('city');
    const road = document.getElementById('road');
    const post_office = document.getElementById('post-office');
    const post_code = document.getElementById('post-code');
    const police_station = document.getElementById('police-station');
    const present_district_address = document.getElementById('present-district-address');
    const present_city = document.getElementById('present-city');
    const present_road = document.getElementById('present-road');
    const present_post_office = document.getElementById('present-post-office');
    const present_post_code = document.getElementById('present-post-code');
    const present_police_station = document.getElementById('present-police-station')
    const regional_passport = document.getElementById('regional-passport');
    const bd_mission_passport = document.getElementById('bd-mission-passport');

    let isDistAdd, isCity, isRoad, isPostOff, isPostCode, isPolice, isPDistAdd, isPCity, isPRoad, isPPostOff, isPPostCode, isPPolice, rbpassport;

    // district_address check
    if(district_address.value == ''){
        const parent = district_address.parentElement
        setErrormessage(parent, "Select district is required.");
        isDistAdd = false;
    }
    else{
        const parent = district_address.parentElement
        setSuccess(parent, '');
        isDistAdd = true;
    }

    // city check
    if(city.value == ''){
        const parent = city.parentElement
        setErrormessage(parent, "Select city is required.");
        isCity = false;
    }
    else{
        const parent = city.parentElement
        setSuccess(parent, '');
        isCity = true;
    }

    // road check
    if(road.value == ''){
        const parent = road.parentElement
        setErrormessage(parent, "Select road is required.");
        isRoad = false;
    }
    else{
        const parent = road.parentElement
        setSuccess(parent, '');
        isRoad = true
    }

    // post_office check
    if(post_office.value == ''){
        const parent = post_office.parentElement
        setErrormessage(parent, "Select post office is required.");
        isPostOff = false;
    }
    else{
        const parent = post_office.parentElement
        setSuccess(parent, '');
        isPostOff = true;
    }

    // post_code check
    if(post_code.value == ''){
        const parent = post_code.parentElement
        setErrormessage(parent, "Select district is required.");
        isPostCode = false;
    }
    else{
        const parent = post_code.parentElement
        setSuccess(parent, '');
        isPostCode = true;
    }

    // police_station check
    if(police_station.value == ''){
        const parent = police_station.parentElement
        setErrormessage(parent, "Select police station is required.");
        isPolice = false;
    }
    else{
        const parent = police_station.parentElement
        setSuccess(parent, '');
        isPolice = true;
    }

    // present district_address check
    if(present_district_address.value == ''){
        const parent = present_district_address.parentElement
        setErrormessage(parent, "Select present district is required.");
        isPDistAdd = false;
    }
    else{
        const parent = present_district_address.parentElement
        setSuccess(parent, '');
        isPDistAdd = true;
    }

    // present city check
    if(present_city.value == ''){
        const parent = present_city.parentElement
        setErrormessage(parent, "Select present city is required.");
        isPCity = false;
    }
    else{
        const parent = present_city.parentElement
        setSuccess(parent, '');
        isPCity = true;
    }

    // present road check
    if(present_road.value == ''){
        const parent = present_road.parentElement
        setErrormessage(parent, "Select present road is required.");
        isPRoad = false;
    }
    else{
        const parent = present_road.parentElement
        setSuccess(parent, '');
        isPRoad = true;
    }

    // present post_office check
    if(present_post_office.value == ''){
        const parent = present_post_office.parentElement
        setErrormessage(parent, "Select present post office is required.");
        isPPostOff = false;
    }
    else{
        const parent = present_post_office.parentElement
        setSuccess(parent, '');
        isPPostOff = true;
    }

    // present post_code check
    if(present_post_code.value == ''){
        const parent = present_post_code.parentElement
        setErrormessage(parent, "Select present district is required.");
        isPPostCode = false;
    }
    else{
        const parent = present_post_code.parentElement
        setSuccess(parent, '');
        isPPostCode = true;
    }

    // police_station check
    if(present_police_station.value == ''){
        const parent = present_police_station.parentElement
        setErrormessage(parent, "Select present police station is required.");
        isPPolice = false;
    }
    else{
        const parent = present_police_station.parentElement
        setSuccess(parent, '');
        isPPolice = true;
    }

    if(regional_passport.checked == false && bd_mission_passport.checked == false){
        const parent = regional_passport.parentElement.parentElement
        setErrormessage(parent, "Select present police station is required.");
    }
    else{
        const parent = present_police_station.parentElement.parentElement
        setSuccess(parent, '');
        rbpassport = true;
    }

    if(isDistAdd == true && isCity && isRoad && isPostOff && isPostCode && isPolice && isPDistAdd && isPCity && isPRoad && isPPostOff && isPPostCode && isPPolice && rbpassport){
        return true;
    }

}

function idDocumentsValidate(){
    const mrp_passport = document.getElementById('mrp-passport');
    const e_passport = document.getElementById('e-passport');
    const no_passport = document.getElementById('no-passport');
    const reissue_reason = document.getElementById('reissue-reason');
    const previous_passport_number = document.getElementById('previous-passport-number');
    const issue_date = document.getElementById('issue-date');
    const expire_date = document.getElementById('expire-date');
    const dont_have = document.getElementById('dont-have');
    const have_passport = document.getElementById('have-passport');
    const issuing_country_list = document.getElementById('issuing-country-list')
    const foreign_passport_number = document.getElementById('foreign-passport-number')
    const birth_register_number = document.getElementById('birth-register-number');

    let isReissue, isPreviousPass, isIssueDate, isExpireDate, isIssueCountry, isForeignPass, isbirthReg;

    if( mrp_passport.checked == true || e_passport.checked == true){
        // reissue reason check
        if(reissue_reason.value == ''){
            const parent = reissue_reason.parentElement
            setErrormessage(parent, "Select present reissue reason is required.");
            isReissue = false;
        }
        else{
            const parent = reissue_reason.parentElement
            setSuccess(parent, '');
            isReissue = true;
        }

        // previous_passport_number check
        if(previous_passport_number.value == ''){
            const parent = previous_passport_number.parentElement
            setErrormessage(parent, "Select previous passport is required.");
            isPreviousPass = false;
        }
        else{
            const parent = previous_passport_number.parentElement
            setSuccess(parent, '');
            isPreviousPass = true;
        }

        // issue_date check
        if(issue_date.value == ''){
            const parent = issue_date.parentElement
            setErrormessage(parent, "Select issue date is required.");
            isIssueDate = false;
        }
        else{
            const parent = issue_date.parentElement
            setSuccess(parent, '');
            isIssueDate = true;
        }

        // expire_date check
        if(expire_date.value == ''){
            const parent = expire_date.parentElement
            setErrormessage(parent, "Select present police station is required.");
            isExpireDate = false;
        }
        else{
            const parent = expire_date.parentElement
            setSuccess(parent, '');
            isExpireDate = true;
        }
    }
    else{
        isReissue = true;
        isPreviousPass = true;
        isIssueDate = true;
        isExpireDate = true;
    }

    if(have_passport.checked == true){
        // issuing_country_list check
        if(issuing_country_list.value == ''){
            console.log(issuing_country_list.value)
            const parent = issuing_country_list.parentElement
            setErrormessage(parent, "Select Issuing country is required.");
            isIssueCountry = false;
        }
        else{
            const parent = issuing_country_list.parentElement
            setSuccess(parent, '');
            isIssueCountry = true;
        }

        // foreign_passport_number check
        if(foreign_passport_number.value == ''){
            const parent = foreign_passport_number.parentElement
            setErrormessage(parent, "Foreign passport number is required.");
            isForeignPass = false;
        }
        else{
            const parent = foreign_passport_number.parentElement
            setSuccess(parent, '');
            isForeignPass = true;
        }
    }
    else{
        isIssueCountry = true;
        isForeignPass = true;
    }

    // birth_register_number check
    if(birth_register_number.value == ''){
        const parent = birth_register_number.parentElement
        setErrormessage(parent, "Select present police station is required.");
        isbirthReg = false;
    }
    else{
        const parent = birth_register_number.parentElement
        setSuccess(parent, '');
        isbirthReg = true;
    }

    if(isReissue && isPreviousPass && isIssueDate && isExpireDate && isIssueCountry && isForeignPass && isbirthReg){
        return true;
    }
}

function parentalInformationValidate(){
    const father_unknown = document.getElementById('father-unknown')
    const mother_unknown = document.getElementById('mother-unknown')
    const guardian_unknown = document.getElementById('guardian-unknown');

    const fathers_name = document.getElementById('fathers-name');
    const fathers_profession = document.getElementById('fathers-profession');
    const fathers_nationality = document.getElementById('fathers-nationality');
    const fathers_nid = document.getElementById('fathers-nid');

    const mothers_name = document.getElementById('mothers-name');
    const mothers_profession = document.getElementById('mothers-profession');
    const mothers_nationality = document.getElementById('mothers-nationality');
    const mothers_nid = document.getElementById('mothers-nid');

    const guardians_name = document.getElementById('guardians-name');
    const guardians_profession = document.getElementById('guardians-profession');
    const guardians_nationality = document.getElementById('guardians-nationality');
    const guardians_nid = document.getElementById('guardians-nid');

    let fname, fprofession, fnationality, fnid, mname, mprofession, mnationality, mnid, gname, gprofession, gnationality, gnid;
    
    if(father_unknown.checked != true){
        // father_name check
        if(fathers_name.value == ''){
            const parent = fathers_name.parentElement
            setErrormessage(parent, "Fathers name is required.");
            fname = false;
        }
        else{
            const parent = fathers_name.parentElement
            setSuccess(parent, '');
            fname = true;
        }

        // fathers_profession check
        if(fathers_profession.value == ''){
            const parent = fathers_profession.parentElement
            setErrormessage(parent, "Select fathers profession is required.");
            fprofession = false;
        }
        else{
            const parent = fathers_profession.parentElement
            setSuccess(parent, '');
            fprofession = true;
        }

        // fathers_nationality check
        if(fathers_nationality.value == ''){
            const parent = fathers_nationality.parentElement
            setErrormessage(parent, "Select fathers nationality is required.");
            fnationality = false;
        }
        else{
            const parent = fathers_nationality.parentElement
            setSuccess(parent, '');
            fnationality = true;
        }

        // fathers_nid check
        if(fathers_nid.value == ''){
            const parent = fathers_nid.parentElement
            setErrormessage(parent, "fathers nid is required.");
            fnid = false;
        }
        else{
            const parent = fathers_nid.parentElement
            setSuccess(parent, '');
            fnid = true;
        }

        mname = true;
        mprofession = true;
        mnationality = true;
        mnid = true;

        gname = true;
        gprofession = true;
        gnationality = true;
        gnid = true;
    }

    if(mother_unknown.checked != true){
        // mother_name check
        if(mothers_name.value == ''){
            const parent = mothers_name.parentElement
            setErrormessage(parent, "Mothers name is required.");
            mname = false;
        }
        else{
            const parent = mothers_name.parentElement
            setSuccess(parent, '');
            mname = true;
        }

        // mothers_profession check
        if(mothers_profession.value == ''){
            const parent = mothers_profession.parentElement
            setErrormessage(parent, "Select mothers profession is required.");
            mprofession = false;
        }
        else{
            const parent = mothers_profession.parentElement
            setSuccess(parent, '');
            mprofession = true;
        }

        // mothers_nationality check
        if(mothers_nationality.value == ''){
            const parent = mothers_nationality.parentElement
            setErrormessage(parent, "Select mothers nationality is required.");
            mnationality = false;
        }
        else{
            const parent = mothers_nationality.parentElement
            setSuccess(parent, '');
            mnationality = true;
        }

        // mothers_nid check
        if(mothers_nid.value == ''){
            const parent = mothers_nid.parentElement
            setErrormessage(parent, "mothers nid is required.");
            mnid = false;
        }
        else{
            const parent = mothers_nid.parentElement
            setSuccess(parent, '');
            mnid = true;
        }

        fname = true;
        fprofession = true;
        fnationality = true;
        fnid = true;

        gname = true;
        gprofession = true;
        gnationality = true;
        gnid = true;
    }

    if(guardian_unknown.checked != true){
        //guardians_name check
        if(guardians_name.value == ''){
            const parent = guardians_name.parentElement
            setErrormessage(parent, "guardians name is required.");
            gname = false;
        }
        else{
            const parent = guardians_name.parentElement
            setSuccess(parent, '');
            gname = true;
        }

        // guardians_profession check
        if(guardians_profession.value == ''){
            const parent = guardians_profession.parentElement
            setErrormessage(parent, "Select guardians profession is required.");
            gprofession = false;
        }
        else{
            const parent = guardians_profession.parentElement
            setSuccess(parent, '');
            gprofession = true;
        }

        // guardians_nationality check
        if(guardians_nationality.value == ''){
            const parent = guardians_nationality.parentElement
            setErrormessage(parent, "Select guardians nationality is required.");
            gnationality = false;
        }
        else{
            const parent = guardians_nationality.parentElement
            setSuccess(parent, '');
            gnationality = true;
        }

        // guardians_nid check
        if(guardians_nid.value == ''){
            const parent = guardians_nid.parentElement
            setErrormessage(parent, "guardians nid is required.");
            gnid = false;
        }
        else{
            const parent = guardians_nid.parentElement
            setSuccess(parent, '');
            gnid = true;
        }

        fname = true;
        fprofession = true;
        fnationality = true;
        fnid = true;

        mname = true;
        mprofession = true;
        mnationality = true;
        mnid = true;
    }

    if(fname && fprofession && fnationality && fnid && mname && mprofession && mnationality && mnid && gname && gprofession && gnationality && gnid){
        return true;
    }
}

function spouseInformationValidate(){
    const marriage_status = document.getElementById('marriage-status');
    let isMarried;

    // marriage_status check
    if(marriage_status.value == ''){
        const parent = marriage_status.parentElement
        setErrormessage(parent, "Select marriage status is required.");
        isMarried = false;
    }
    else{
        const parent = marriage_status.parentElement
        setSuccess(parent, '');
        isMarried = true;
    }

    if(isMarried){
        return true;
    }
}

function emergencyContactValidate(){
    const emergency_person = document.getElementById('emergency-person');
    const emerge_person_name = document.getElementById('emerge-person-name');
    const emergency_person_district_address = document.getElementById('emergency-person-district-address');
    const emergency_person_city = document.getElementById('emergency-person-city');
    const emergency_person_road = document.getElementById('emergency-person-road');
    const emergency_person_post_office = document.getElementById('emergency-person-post-office');
    const emergency_person_post_code = document.getElementById('emergency-person-post-code');
    const emergency_person_police_station = document.getElementById('emergency-person-police-station');
    const emergency_person_email = document.getElementById('emergency-person-email');
    const emergency_person_country_code = document.getElementById('emergency-person-country-code');
    const emergency_person_mobile_num = document.getElementById('emergency-person-mobile-num');

    let isPerson, isName, isDistrict, isCity, isRoad, isPostOff, isPostCode, isPolice, isEmail, isCountryCode, isMobileNum;

    // emergency_person check
    if(emergency_person.value == ''){
        const parent = emergency_person.parentElement
        setErrormessage(parent, "Select emergency person is required.");
        isPerson = false;
    }
    else{
        const parent = emergency_person.parentElement
        setSuccess(parent, '');
        isPerson = true;
    }

    // emerge_person_name check
    if(emerge_person_name.value == ''){
        const parent = emerge_person_name.parentElement
        setErrormessage(parent, "Emergency person name is required.");
        isName = false;
    }
    else{
        const parent = emerge_person_name.parentElement
        setSuccess(parent, '');
        isName = true;
    }

    // emergency_person_district_address check
    if(emergency_person_district_address.value == ''){
        const parent = emergency_person_district_address.parentElement
        setErrormessage(parent, "Select district is required.");
        isDistrict = false;
    }
    else{
        const parent = emergency_person_district_address.parentElement
        setSuccess(parent, '');
        isDistrict = true;
    }

    // emergency_person_city check
    if(emergency_person_city.value == ''){
        const parent = emergency_person_city.parentElement
        setErrormessage(parent, "Select marriage status is required.");
        isCity = false;
    }
    else{
        const parent = emergency_person_city.parentElement
        setSuccess(parent, '');
        isCity = true;
    }

    // emergency_person_road check
    if(emergency_person_road.value == ''){
        const parent = emergency_person_road.parentElement
        setErrormessage(parent, "Road is required.");
        isRoad = false;
    }
    else{
        const parent = emergency_person_road.parentElement
        setSuccess(parent, '');
        isRoad = true;
    }

    // emergency_person_post_office check
    if(emergency_person_post_office.value == ''){
        const parent = emergency_person_post_office.parentElement
        setErrormessage(parent, "Select post office is required.");
        isPostOff = false;
    }
    else{
        const parent = emergency_person_post_office.parentElement
        setSuccess(parent, '');
        isPostOff = true;
    }

    // emergency_person_post_code check
    if(emergency_person_post_code.value == ''){
        const parent = emergency_person_post_code.parentElement
        setErrormessage(parent, "Select marriage status is required.");
        isPostCode = false;
    }
    else{
        const parent = emergency_person_post_code.parentElement
        setSuccess(parent, '');
        isPostCode = true;
    }

    // emergency_person_police_station check
    if(emergency_person_police_station.value == ''){
        const parent = emergency_person_police_station.parentElement
        setErrormessage(parent, "Select police station is required.");
        isPolice = false;
    }
    else{
        const parent = emergency_person_police_station.parentElement
        setSuccess(parent, '');
        isPolice = true;
    }

    // emergency_person_email check
    if(emergency_person_email.value == ''){
        const parent = emergency_person_email.parentElement
        setErrormessage(parent, "Email is required.");
        isEmail = false;
    }
    else{
        const parent = emergency_person_email.parentElement
        setSuccess(parent, '');
        isEmail = true;
    }

    // emergency_person_country_code check
    if(emergency_person_country_code.value == ''){
        const parent = emergency_person_country_code.parentElement
        setErrormessage(parent, "Select Country code is required.");
        isCountryCode = false;
    }
    else{
        const parent = emergency_person_country_code.parentElement
        setSuccess(parent, '');
        isCountryCode = true;
    }

    // emergency_person_mobile_num check
    if(emergency_person_mobile_num.value == ''){
        const parent = emergency_person_mobile_num.parentElement
        setErrormessage(parent, "Select marriage status is required.");
        isMobileNum = false;
    }
    else{
        const parent = emergency_person_mobile_num.parentElement
        setSuccess(parent, '');
        isMobileNum = true;
    }

    if(isPerson && isName && isDistrict && isCity && isRoad && isPostOff && isPostCode && isPolice && isEmail && isCountryCode && isMobileNum){
        return true;
    }
}