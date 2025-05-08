import dayjs from "dayjs";
export default {
    vnToStr(text) {
        if (typeof text !== 'string') return;

        text = text.toLowerCase();
        text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        text = text.replace(/đ/g, "d");
        text = text.replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " "
        );
        text = text.replace(/\s+/g, " ");
        text = text.trim();
        return text;
    },
    preventCharacterInput(e) {
        if (e.shiftKey ||
            (e.keyCode > 31 &&
                (e.keyCode < 48 || e.keyCode > 57) &&
                (e.keyCode < 96 || e.keyCode > 106) &&
                e.keyCode !== 46)
        ) e.preventDefault();
        return true;
    },
    decimalToBinaryWithFixedLength(decimal, length = 7) {
        let binary = (decimal >>> 0).toString(2);
        while (binary.length < length) {
            binary = '0' + binary;
        }
        return binary;
    },
    getIframeUrl(route) {
        let domain = process.env.LOYALTY_DOMAIN,
            path = route.path,
            query = {...route.query, is_popup: 1};
        let arr = [];
        Object.keys(query).forEach((item) => {
            let str = `${item}=${query[item]}`;
            arr.push(str);
        });

        return `${domain}${path}?${arr.join("&")}`;
    },
    filterCurrency(currency, text) {
        if (currency) {
            currency = Math.round(currency);
            var input = currency.toString().replace(/\./g, "").split("");
            var arr = [];
            while (input.length >= 3) {
                var l = input.slice(input.length - 3, input.length);
                input.splice(input.length - 3, 1);
                input.splice(input.length - 2, 1);
                input.splice(input.length - 1, 1);
                arr.unshift(l.join(""));
            }
            if (input.length > 0) {
                arr.unshift(input.join(""));
            }
            //check số âm
            let checkNegative = false;
            if (arr.find(item => item == '-')) {
                checkNegative = true;
                arr.shift();
            }
            if (arr.length >= 2) {
                currency = arr.join(".");
            }
            if (checkNegative) {
                currency = '-' + currency;
            }
        } else {
            if (text) {
                return text;
            }
            return 0;
        }
        if (!currency) {
            return 0;
        }
        return currency;
    },
    formatter(value) {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    parser(value) {
        return value.replace(/\$\s?|(,*)/g, '');
    },
    getPercent(num, total) {
        if (!num || !total) {
            return 0;
        }
        return (num / total * 100).toFixed(2);
    },
    formatDateTime: function (date, format='DD/MM/YYYY HH:mm:ss') {
        if(date == null) {
            return '-';
        }
        return dayjs(date).format(format);
    },
    getErrorMessage(isInValid, value) {
        if (isInValid && value) {
            return 'error';
        }
        return '';
    },
    limitStringLimit: function (value, limit = 20) {
        if (value !== undefined) {
            if (value.length < limit) {
                return value;
            }
            return value.substring(0, limit) + '...';
        }
        return value;
    },
    normalizeNumber: function (number) {
        // const epsilon = 1e-10;
        // const rounded = Math.round(number);
        // if (Math.abs(number - rounded) < epsilon) {
        //     return rounded;
        // }
        // return number;

        // Cách 2
        const epsilon = 1e-10;
        const rounded = Math.round(number);
        const result = Math.abs(number - rounded) < epsilon ? rounded : number;

        // Định dạng theo kiểu Việt Nam: dấu . cho hàng nghìn, dấu , cho phần thập phân
        return result.toLocaleString('vi-VN');
    },
    textToKey: function (text) {
        const charMap = {
            'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
            'đ': 'd', 'Đ': 'd'
        };

        return text
            .split('')
            .map(char => charMap[char] || char)
            .join('')
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '_');
    },
    textToKeyUppercase: function (text) {
        const charMap = {
            'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
            'đ': 'd', 'Đ': 'd'
        };

        return text
            .split('')
            .map(char => charMap[char] || char)
            .join('')
            .toUpperCase()
            .replace(/[^A-Z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '_');
    },
}