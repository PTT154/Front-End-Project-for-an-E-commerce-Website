import { getEle } from "../main.js";

class Validation {
    checkEmpty(value, errorId, mess) {
        if (value === "") {
            // Lỗi => Show câu thông báo lỗi
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }
        // có nhập ID
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    checkFloat(value, errorId, mess) {
        // Chấp nhận cả số nguyên và số thực
        if (!isNaN(value) && value.toString().trim() !== "") {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    checkLength(value, errorId, mess, min, max) {
        if (value && min <= value.trim().length && value.trim().length <= max) {
            // success
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        // error 
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    checkExist(value, errorId, mess, listData) {
        for (let i = 0; i < listData.length; i++) {
            if (value === listData[i].id) {
                // error 
                getEle(errorId).style.display = 'block';
                getEle(errorId).innerHTML = mess;
                return false;
            }
        }
        // success
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    // checkCharacterString(value, errorId, mess) {
    //     let letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    //     if (value.match(letter)) {
    //         // success
    //         getEle(errorId).style.display = 'none';
    //         getEle(errorId).innerHTML = '';
    //         return true;
    //     }
    //     // error 
    //     getEle(errorId).style.display = 'block';
    //     getEle(errorId).innerHTML = mess;
    //     return false;
    // }

    // checkEmail(value, errorId, mess) {
    //     let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (email.test(value)) {
    //         // success
    //         getEle(errorId).style.display = 'none';
    //         getEle(errorId).innerHTML = '';
    //         return true;
    //     }
    //     // error 
    //     getEle(errorId).style.display = 'block';
    //     getEle(errorId).innerHTML = mess;
    //     return false;
    // }

    // checkPassword(value, errorId, mess) {
    //     let password = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,10}$/;
    //     if (password.test(value)) {
    //         // success
    //         getEle(errorId).style.display = 'none';
    //         getEle(errorId).innerHTML = '';
    //         return true;
    //     }
    //     // error 
    //     getEle(errorId).style.display = 'block';
    //     getEle(errorId).innerHTML = mess;
    //     return false;
    // }

    // checkDate(value, errorId, mess) {
    //     let date = /^(0[1-9]|1[0-2])[-\/](0[1-9]|[12][0-9]|3[01])[-\/]\d{4}$/;
    //     if (date.test(value)) {
    //         // success
    //         getEle(errorId).style.display = 'none';
    //         getEle(errorId).innerHTML = '';
    //         return true;
    //     }
    //     // error 
    //     getEle(errorId).style.display = 'block';
    //     getEle(errorId).innerHTML = mess;
    //     return false;
    // }

    checkProductType(value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    // checkGioLam(value, errorId, mess) {
    //     if (80 <= value && value <= 200) {
    //         getEle(errorId).style.display = 'none';
    //         getEle(errorId).innerHTML = '';
    //         return true;
    //     }
    //     getEle(errorId).style.display = 'block';
    //     getEle(errorId).innerHTML = mess;
    //     return false;
    // }

    checkRating(value, errorId, mess) {
        if (0 <= value && value <= 5) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }
}

export default Validation;