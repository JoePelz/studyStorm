//Helper functions
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

//Test if an email address is valid my.bcit.ca address
function validateEmail(id, err){
    if (testValidEmail(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidEmail(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.endsWith("my.bcit.ca"));
}

//Test if a User Name is valid (at least 2 non-space characters)
function validateName(id, err){
    if (testValidName(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidName(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.length >= 2);
}

//Test if a password is valid (at least 4 non-space characters)
function validatePass(id, err){
    if (testValidPass(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidPass(id){
    var elem = $(id);
    var value = elem.val();
    value.replace(/\s/, "");
    return (value.length >= 4);
}

//Test if two things (passwords) match
function validateMatching(id1, id2, err){
    if (testMatching(id1, id2)) {
        $(id2).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id2).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testMatching(id1, id2){
    var val1 = $(id1).val();
    var val2 = $(id2).val();
    return (val1 == val2);
}
