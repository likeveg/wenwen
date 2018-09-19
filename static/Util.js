//工具类,依赖于工程所引入的第三方框架，应该在应用开始之前，第三方框架之后引入该文件
var Util = function () {};
//字符串转json对象
Util.strToJSON = function (data) {
    if(Util.isNullOrUndefOrSpace(data)){
        return {};
    }else{
        return eval('(' + data + ')');
    }
};
//判断对象是否为空，包括：空对象，未定义，字符串类型的话判断是否为空字符串,obj:值，
// isContinuous：是否处连续为空的情况，
// 返回：true：是， false：否
Util.isNullOrUndefOrSpace = function (obj, isContinuous) {
    // 未定义设置默认值
    if (isContinuous == undefined)
        isContinuous = true;

    if (obj == undefined || obj == null)
        return true;
    else if (Util.isArray(obj) && obj.length == 0) return true;
    else
        return isContinuous ? (obj.toString().trim() == '') : (obj.toString() == '');
};

//构造错误对象
Util.getError = function (summary, info, code) {
    return {code: code, info: info, summary: summary};
}
Util.getDomPosition=function (obj) {
    var rtn={left:-1,top:-1};
    var fixedX = -1; // x position (-1 if to appear below control)
    var fixedY = -1; // x position (-1 if to appear below control)
    var leftpos = 0;
    var toppos = 0;
    var aTag = obj;
    do {
        aTag = aTag.offsetParent;
        leftpos += aTag.offsetLeft;
        toppos += aTag.offsetTop;
    } while (aTag.tagName != "BODY");
    rtn.left=( fixedX == -1 ? obj.offsetLeft + leftpos : fixedX);
    rtn.top = (fixedY == -1 ? obj.offsetTop + toppos : fixedY);
    return rtn;
}
//*********************************************************模块操作***************************************************//
//获取模块，如果不存在，则创建模块，并返回
Util.module = function (name, requires, configFn) {
    var module = null;
    try {
        module = angular.module(name);
    } catch (err) {
        module = angular.module(name, requires, configFn);
    }
    return module;
}

//获取控制器定义模块
Util.defController = function (name, handler) {
    ConstData.CONTROLLER_PROVIDER.register(name, handler);
}
//获取全局服务定义模块
Util.defService = function (name, handler) {
    Util.module(ConstData.APP_NAME + ".services", []).factory(name, handler);
}
//定义指令
Util.defDriective = function (name, handler) {
    angular.module(ConstData.APP_NAME).directive(name, handler);
}
//定义提供服务
Util.defProvider = function (name, handler) {
    angular.module(ConstData.APP_NAME).provider(name, handler);
}
//定义过滤器
Util.defFilter = function (name, handler) {
    angular.module(ConstData.APP_NAME).filter(name, handler);
}
// 数组获取单一元素
Util.getArrayElement = function (array, index) {
    if (Util.isNullOrUndefOrSpace(array)) {
        return null; // 参数异常处理
    }
    if (index < array.length && index >= 0) {
        return array[index];
    } else {
        return null;
    }
}
// 单词分页逻辑
Util.sliceWord = function (array, spliteNum, index) {
    var start = index * spliteNum;
    var end = (index + 1) * spliteNum;
    if (start < array.length) {
        return array.slice(start, end);
    } else {
        return null;
    }
}
// 判断两数组是否相等
Util.isSameArray = function (arr1, arr2) {
    var minLen = arr1.length > arr2.length ? arr2.length : arr1.length;
    for (var i = 0; i < minLen; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}
// 生成随机数组
Util.genRandomArray = function (arr) {
    var oldArr = new Array();
    for (var i = 0; i < arr.length; i++) {
        oldArr.push({index: i, val: arr[i]});
    }
    var genArr = oldArr.sort(function (a, b) {
        return Math.random() > .5 ? -1 : 1; // 根据random随机数生成函数生成随机顺序
    });
    if (genArr.toString() == oldArr.toString()) {
        genArr = oldArr.reverse(); // 随机后若序列依然相同，则使用逆序
    }
    return genArr;
}

/***
 * 判断对象是否在数组
 * @param a 对象数组
 * @param o 如果id为空，则o就是需要查找的对，否则o就是需要查找的属性
 * @param id 需要查找的数学值
 * @returns {number}
 */
Util.indexOfArray = function (a, o, id) {
    if (!Util.isArray(a)) {
        return -1; // 参数异常处理
    }
    for (var i = 0, len = a.length; i < len; i++) {
        if (id == undefined) {
            if (a[i] == o) {
                return i;
            }
        } else {
            if (a[i][o] == id) {
                return i;
            }
        }
    }
    return -1;
};
/**
 * Remove array item, 'o' parameter can be item object or id field name.
 * When 'o' parameter is the id field name, the 'id' parameter is valid.
 */
/***
 * 在数组中删除对象
 * @param a 对象数组
 * @param o 如果id为空，则o就是需要查找的对，否则o就是需要查找的属性
 * @param id 需要删除的对象属性值
 */
Util.removeArrayItem = function (a, o, id) {
    if (!Util.isArray(a)) {
        return; // 参数异常处理
    }
    if (typeof o == 'string' && !Util.isNullOrUndefOrSpace(id)) {//说明是移除对象
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i][o] == id) {
                a.splice(i, 1);
                return;
            }
        }
    } else {
        var index = Util.indexOfArray(a, o);
        if (index != -1) {
            a.splice(index, 1);
        }
    }
};
/***
 *往数组中添加或者替换对象
 * @param a 对象数组
 * @param o 如果id为空，则o就是需要查找的对，否则o就是需要查找的属性
 * @param r
 */
Util.addArrayItem = function (a, o, r) {
    if (!Util.isArray(a)) {
        a = new Array(); // 参数异常处理
    }
    var index = Util.indexOfArray(a, o, r ? r[o] : undefined);
    if (index == -1) {
        a.push(r ? r : o);
    } else {
        a[index] = r ? r : o;
    }
};
Util.getArrayItem = function (a, o, id) {
    if (!Util.isArray(a)) {
        return null; // 参数异常处理
    }
    var index = Util.indexOfArray(a, o, id);
    return index == -1 ? null : a[index];
};
Util.forEach = function (data, deep, callback) {
    var nodes = [];
    for (var i = 0; i < data.length; i++) {
        nodes.push(data[i]);
    }
    while (nodes.length) {
        var node = nodes.shift();
        if (callback(node) == false) {
            return;
        }
        if (deep && node.children) {
            for (var i = node.children.length - 1; i >= 0; i--) {
                nodes.unshift(node.children[i]);
            }
        }
    }
}

String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//返回yyyymmdd 如20171230
Date.prototype.formatDate = function () {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    if(month<10)
        month = "0" + month;
    if(day<10)
        day = "0" + day
    return "" + year + month + day;
}

//返回当月起始日期 如2018-01-01 00:00:00
Date.prototype.getMonthStartDate = function () {
    var year = this.getFullYear();
    var month =this.getMonth() + 1;

    if(month<10)
        month = "0" + month;

    return "" + year + "-" + month + "-01 00:00:00";
}

/**
 * 获取当前日期中的月的天数
 * @param year
 * @param month
 * @returns {number}
 */
Util.getMonthDays = function (year, month) {
    var days = new Date(year, month, 0);
    return days.getDate(); 
}

Util.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// 判断arr1是否包含数组2，key为对象主键字段
Util.isContantArray = function (arr1, arr2, key) {
    if (Util.isNullOrUndefOrSpace(arr2) || Util.isNullOrUndefOrSpace(arr1)) {
        return false;
    } else if (Util.isArray(arr2)) {
        if (arr1.length < arr2.length) {
            return false;
        } else {
            for (var i = 0; i < arr2.length; i++) {
                if (Util.indexOfArray(arr1, arr2[i], key) < 0) {
                    return false;
                }
            }
            return true;
        }
    } else if (Util.indexOfArray(arr1, arr2) < 0) {
        return false;

    }
    else {
        return true;
    }
    return true;
}
//判断一个对象是否为空或未定义
Util.isnUndefOrNull = function (obj) {
    if (obj == undefined)
        return true;
    else if (obj == null)
        return true;
    else
        return false;
}
//计算时间差，返回时间差格式：x天 00:00:00
Util.getDateDur = function (starttime, endtime) {
    if (typeof starttime == "string")
        starttime = Util.stringToDate(starttime);

    if (typeof endtime == "string")
        endtime = Util.stringToDate(endtime);
    var dur = endtime.getTime() - starttime.getTime();
    //只取秒
    dur = parseInt(dur / 1000);
    var day = parseInt(dur / 86400);
    var hour = parseInt(dur % 86400 / 3600);
    var min = parseInt(dur % 86400 % 3600 / 60);
    var second = parseInt(dur % 86400 % 3600 % 60);

    return day + "天 " + ((hour > 9) ? "" : "0") + hour + ":" + ((min > 9) ? "" : "0") + min + ":" + (second > 9 ? "" : "0") + second;
}

//格式化时间, 单位毫秒
Util.getDurText = function(dur, accuracy) {
    if (Util.isnUndefOrNull(dur))
        return "";
    //只取毫秒


    if (!Util.isnUndefOrNull(accuracy) && accuracy != 0)
        dur = Number(dur) * accuracy;

    dur = parseInt(dur);

    var day = hour = min = second = millsecond = 0;
    var remainder = 0;
    if (dur == 0)
        return millsecond + "毫秒";
    else {
        day = Math.floor(dur / 86400000);
        remainder = dur % 86400000;
        if (remainder != 0) {
            hour =  Math.floor(remainder / 3600000)
            remainder = remainder % 3600000;
        }

        if (remainder != 0) {
            min =  Math.floor(remainder / 60000)
            remainder = remainder % 60000;
        }

        if (remainder != 0) {
            second =  Math.floor(remainder / 1000)
            remainder = remainder % 1000;
        }

        if (remainder != 0) {
            millsecond =  Math.floor(remainder)
        }

        var result = "";
        if (day > 0)
            result += day + "天";
        if (hour > 0)
            result += hour + "小时";
        if (min > 0)
            result += min + "分钟";
        if (second > 0)
            result += second + "秒";

        if (Util.isNullOrUndefOrSpace(result) || millsecond > 0)
            result += millsecond + "毫秒";

        return result;
    }
}

//字符串转日期
Util.stringToDate = function (val, formmater) {
    formmater = 'yyyy-MM-dd hh:mm:ss';
    val = val.replace(/-/g, "/");
    return new Date(val);
};

/**
 * 对象信息复制
 */
Util.clone = function (obj, except) {
    if (Util.isnUndefOrNull(obj))
        return obj;

    var newObj = {};
    for (var p in obj) {
        if (p != except)
            newObj[p] = obj[p];
    }
    return newObj;
}

Util.selectDatas = {
    get: function(datas, value, field){
        var selecteds = [];
        if (Util.isNullOrUndefOrSpace(field))
            field = "select";
        if (Util.isNullOrUndefOrSpace(value))
            value = true;
        for (var i = 0; i < datas.length; i++) {
            if(!Util.isNullOrUndefOrSpace(datas[i][field])){
                if (datas[i][field]==value){
                    selecteds.push(datas[i]);
                }
            }
        }
        return selecteds;
    },
    set: function(datas, value, field){
        if (Util.isNullOrUndefOrSpace(datas))
            return;

        if (Util.isNullOrUndefOrSpace(field))
            field = "select";
        if (Util.isNullOrUndefOrSpace(value))
            value = true;

        for (var i = 0; i < datas.length; i++) {
            datas[i][field] = value;
        }
    },
    check: function(datas, value, field){
        if (Util.isNullOrUndefOrSpace(field))
            field = "select";
        if (Util.isNullOrUndefOrSpace(value))
            value = true;
        if (Util.isNullOrUndefOrSpace(datas))
            return value;
        if (!value)
            return value;
        // var valFlag = true;

        for (var i = 0; i < datas.length; i++) {
            if(datas[i][field] == undefined)
                datas[i][field] = false;

            if(datas[i][field] != value)
            {
                value = !value;
                break;
            }
        }

        return value;
    }
}

Util.setTableCheckStatus = function(table, label, checked){
    if(checked)
        table.find(label).find("input[type=checkbox].table-checkbox-flag").prop("checked", true);
    else
        table.find(label).find("input[type=checkbox].table-checkbox-flag").removeProp("checked");
}

Util.setCheckStatus = function(obj, checked){
    if(checked)
        obj.prop("checked", true);
    else
        obj.removeProp("checked");
}
/**
 * 生成元素随机id
 * @param pre
 * @param lenght
 * @returns {*}
 */
Util.getRandomId = function(pre, lenght)
{
    if(Util.isNullOrUndefOrSpace(pre))
        pre = "_element_";

    if(Util.isNullOrUndefOrSpace(lenght))
        lenght = 100000000;
    return pre + Math.ceil(Math.random() * lenght);
}

Util.buildGetPath = function(service, obj){
    var path = ConstData.SERVICE_ROOT + service;
    if(!Util.isnUndefOrNull(obj))
        path += "?" + ConstData.BINNARY_PARAMETER_FIELD + "=" + JSON.stringify(obj);

    return path;
}

Util.downloadFile = function(file, url){
    if(Util.isnUndefOrNull(file) || Util.isNullOrUndefOrSpace(file.code))
        return;

    window.open(url+ "?" + ConstData.BINNARY_PARAMETER_FIELD +"=" + JSON.stringify(file));
}

Util.downloadForPost = function(url, params){
    var iframeid = Util.getRandomId();
    var iframe = $('<iframe id="' + iframeid + '" />');
    var form = $('<form target="' + iframeid + '" method="post" enctype="multipart/form-data" action="' + url + '"/>');

    form.append("<input type='text' name='" + ConstData.BINNARY_PARAMETER_FIELD + "' value='" + JSON.stringify(params) + "' />");
    iframe.append(form);
    $(document.body).append(iframe);
    form[0].submit();
    iframe.remove();
}

Util.exportFile = function(url, obj){
    window.open(ConstData.SERVICE_ROOT + url + "?id=" + obj.id);
}
Util.debug = function(){
    var a = 1;
}
/**
 * 获取界面路径
 * @param appModule 模块名称
 * @param path 文件路径
 * @returns {string} 返回界面全路径
 */
Util.getTemplateUrl = function(appModule, path){
    return appModule + "/module/" + path + "?time=" + Util.getRandomId();
}

/**
 * 获取界面路径，不加随机码
 * @param appModule 模块名称
 * @param path 文件路径
 * @returns {string} 返回界面全路径
 */
Util.getTemplateUrlNoRandom = function(appModule, path){
    return appModule + "/module/" + path;
}
/**
 * 获取服务路径
 * @param appModule 模块名称
 * @param service 服务路径
 * @returns {string} 返回服务全路径
 */
Util.getServiceUrl = function (appModule, service) {
    return appModule + "/service/" + service;
}

Util.buildToolTipHtmlText = function(text, width)
{
    return '<div class="content-break" ' + (Util.isNullOrUndefOrSpace(width) ? "" : (' style="max-width:  ' +  width + 'px; "')) + '>' + text + '</div>';
}

Util.reciveMessageHandler = function(e){
    //转换参数为json
    var msg = Util.strToJSON(e.data);
    //设置集成后的页面位置
    if (msg.type == "range") {
        ConstData.INTERGRATION_POSTION.width = msg.width;
        ConstData.INTERGRATION_POSTION.heith = msg.height;
    } else if (msg.type == "position"){
        ConstData.INTERGRATION_POSTION.top = msg.top;
        ConstData.INTERGRATION_POSTION.left = msg.left;
    }

    Util.resizeModuleContainer();
}

//像父窗口发送消息通知
Util.sendMessage = function(message, orgin)
{
    if(Util.isInIframe())
    {
        window.parent.postMessage(message, Util.isNullOrUndefOrSpace(orgin) ? "*" : orgin);
    }
}

//改变模块窗口大小
Util.resizeModuleContainer = function(){
    if(!Util.isInIframe())
        return;

    if(sdialogObj = $("sdialog").length > 0){
        //如果有弹出窗口，则修改模块容器的大小和位置
        var position = {top: ConstData.INTERGRATION_POSTION.top + "px", left: ConstData.INTERGRATION_POSTION.left + "px"};
        if(!Util.isnUndefOrNull(ConstData.INTERGRATION_POSTION.width))
            position.width = ConstData.INTERGRATION_POSTION.width;
        if(!Util.isnUndefOrNull(ConstData.INTERGRATION_POSTION.heith))
            position.height = ConstData.INTERGRATION_POSTION.heith;

        $("#_module_container_3493084093840").css(position);
        Util.sendMessage("true");
    }else {
        //否则，将模块容器置为100%充满当前界面，并发送界面修改通知
        $("#_module_container_3493084093840").css({width: "", height: "100%", top:"", left:""});
        Util.sendMessage("false");
    }
}
/**
 * 判断当前页是否在iframe中
 * @returns {Object|boolean}
 */
Util.isInIframe = function(){
    return (window.parent != window);
}
/**
 * 将容器滚动条滚动到子元素位置
 * @param container
 * @param child
 */
Util.scrollToChild = function(container, child)
{
    var scrollTop = child.offset().top - container.offset().top + container.scrollTop();
    container.animate({scrollTop: scrollTop});
}
/**
 * 明细字段解析
 */
Util.resolveReportDetailCol = function(fields, expr, position){
    var nameIndex = expr.split("(");
    var varIndexs = nameIndex[1].substring(1, nameIndex[1].length - 2).split(",");
    var name = nameIndex[0];
    var tempParams = [];
    for(var i = 0; i < varIndexs.length; i++){
        tempParams.push(fields[varIndexs[i]]);
    }
    //计算位置，0最后一列，-2倒数第二列，2正数第二列
    if(position == 0 || (position > 0 && position > fields.length))
        position = fields.length;
    else  if(position > 0)
        position = position - 1;
    else if(position < 0){
        position = (fields.length + position > 0) ? (fields.length + position) : 0;
    }

    return {name: name, params: tempParams, position: position, uid: Util.getRandomId()};
}

Util.objCovertList = function(obj, nameField, valueField){
    if(Util.isnUndefOrNull(obj))
        return [];
    var result = [];
    if(Util.isNullOrUndefOrSpace(nameField))
        nameField = "name";
    if(Util.isNullOrUndefOrSpace(valueField))
        valueField = "value";

    for(var p in obj){
        var item = {};
        item[nameField] = obj[p];
        item[valueField] = p;

        result.push(item);
    }

    return result;
}

/**
 * 生成UID字符串
 * @param prefix
 * @returns {string}
 */
Util.genUID = function(prefix)
{
    var res = [], hex = '0123456789ABCDEF';

    for (var i = 0; i < 36; i++) res[i] = Math.floor(Math.random()*0x10);

    res[14] = 4;
    res[19] = (res[19] & 0x3) | 0x8;

    for (var i = 0; i < 36; i++) res[i] = hex[res[i]];

    res[8] = res[13] = res[18] = res[23] = '-';

    return (prefix || "") + res.join('');
}

Util.base64 = {
    map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encoded: function(input){
        if(Util.isNullOrUndefOrSpace(input))
            return;
        input = Util.utf16to8(input);
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + Util.base64.map.charAt(enc1) + Util.base64.map.charAt(enc2)
                + Util.base64.map.charAt(enc3) + Util.base64.map.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    },
    decoded: function(input){
        if(Util.isNullOrUndefOrSpace(input))
            return input;

        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;


        if (input.length % 4 != 0) {
            return "";
        }
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            return "";
        }
        do {
            enc1 = Util.base64.map.indexOf(input.charAt(i++));
            enc2 = Util.base64.map.indexOf(input.charAt(i++));
            enc3 = Util.base64.map.indexOf(input.charAt(i++));
            enc4 = Util.base64.map.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;


            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return Util.utf8to16(output);
    }
}

Util.utf16to8 = function(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

Util.utf8to16 = function(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
/**
 * 替换字符串
 */
Util.replaceAll = function(val, oldVal, newVal){
    return val.split(oldVal).join(newVal);
}
/**
 * 字符串加密， 加密规则：
 * （加密值的base64编码再进行base64编码, 替换“=”为“#”， 对长度进行编码（最大值限制为9），长度进行编码后取前两位）
 * + （加密值的base64编码再进行base64编码, 替换“=”为“#”， 取前9位（不足9位，则取全部））
 * + 编码后的字符串值（替换“=”为“#”）
 *
 * @param value
 * @return
 *
 */
Util.encode = function(value)
{
    //为空时，不进行编码
    if(Util.isNullOrUndefOrSpace(value))
        return "";
    //对值进行base64编码
    var encodeVal = Util.base64.encoded(value);
    //对编码后的值进行编码，替换=为#，取前9位
    var tempVal = Util.replaceAll(Util.base64.encoded(encodeVal), "=", "#").substr(0, 9);
    //生成加密字符串
    return Util.base64.encoded(tempVal.length.toString()).substr(0, 2) + tempVal + Util.replaceAll(encodeVal, "=", "#");
}
/**
 * 字符串解密， 解密规则：
 * 1、获取随机字符串长度（取前两位并补“==”，base64解码）
 * 2、截取以随机字符串结束索引位置为开始的字符串
 * 3、将截取到的字符串进行base64解码
 *
 * @param value
 * @return
 *
 */
Util.decode = function(value)
{
    var result = "";
    if(!Util.isnUndefOrNull(value) && value.length >= 2)
    {
        var preValue = parseInt(Util.base64.decoded(value.substr(0, 2) + "=="));
        if(value.length >= preValue + 2)
            result = Util.base64.decoded(Util.replaceAll(value.substr(2 + preValue), "#", "="));
    }

    return result;
}
Util.getRecentTenYears = function () {
    var result = [];
    var date = new Date;
    var year = date.getFullYear();
    for(var i = 0; i < 10; i++){
        var yearObj = {name: year + "年", id: year};
        result.push(yearObj);
        year--;
    }
    return result;
}
/**
 * 将流程建模信息转为流程编辑器可识别的数据结构
 * @param processDetail
 * @returns {{id, model: {code, stencil: {id: string}, childShapes: Array, stencilset: {namespace: string, url: string, path: string}}}}
 */
Util.processDetailConvertoDesignerData = function (processDetail) {
    var versionInfo = {id: processDetail.id, model:{code: processDetail.id, stencil:{id: "BPMNDiagram"}, childShapes:[], stencilset: {namespace: "http://b3mn.org/stencilset/bpmn2.0#", url:"../stencilsets/bpmn2.0/bpmn2.0.json" ,
        path: "data/processnode.json"}}};
    //处理连线
    var lineStartMap = {};
    $.each(processDetail.tlines, function (index, line) {
        var tempLine = $.extend(true, {}, line);
        delete tempLine.bounds;
        delete tempLine.dockers;
        versionInfo.model.childShapes.push({code: line.code, properties: line, stencil: {id: line.type}, outgoing: [line.end],
            childShapes:[],
            properties: tempLine,
            bounds: angular.fromJson(line.bounds),
            dockers: angular.fromJson(line.dockers)
        });
        //记录连线起始节点，作为节点连出连线
        if(Util.isnUndefOrNull(lineStartMap[line.start.code])){
            lineStartMap[line.start.code] = [];
        }
        lineStartMap[line.start.code].push(line);
    })
    //处理节点，如果节点存在父级，则将节点放入到父级图形中，pool节点需要特殊处理
    //记录父节点
    var parentNodeMap = {};
    var nodeMap = {};
    $.each(processDetail.tnodes, function (index, node) {
        var tempNode = $.extend(true, {}, node);
        delete tempNode.dockers;
        delete tempNode.bounds;
        var nodeObj = {code: node.code, properties: tempNode, stencil: {id: node.type}, bounds: angular.fromJson(node.bounds), dockers: [], childShapes:[], outgoing:(lineStartMap[node.code] || [])};
        //如果为pool，则添加泳道对象
        if(node.type == "Pool")
            nodeObj.childShapes.push({code: Util.genUID("soa"), properties:{}, stencil: {id: "Lane"}, childShapes: [], outgoing:[],dockers:[],
                bounds: {lowerRight: {x: nodeObj.bounds.lowerRight.x, y: nodeObj.bounds.lowerRight.y - 187}, upperLeft: {x: nodeObj.bounds.upperLeft.x + 30, y: nodeObj.bounds.upperLeft.y - 187}}})
        if(Util.isnUndefOrNull(node.parent))
        {
            versionInfo.model.childShapes.push(nodeObj);
        }else
        {
            //存储父节点
            if(Util.isnUndefOrNull(parentNodeMap[node.parent.code]))
                parentNodeMap[node.parent.code] = [];
            parentNodeMap[node.parent.code].push(nodeObj);
        }
        nodeMap[node.code] = nodeObj;
    });
    //将节点加入到所属父节点中
    $.each(parentNodeMap, function(parentCode, childShapes){
        var parentNode = nodeMap[parentCode];
        //如果为Pool，则将子节点加入到泳道中
        if(parentNode.stencil.id = "Pool")
            parentNode.childShapes[0].childShapes = childShapes;
        else
            parentNode.childShapes = childShapes;
    })

    return versionInfo;
}
/**
 * svg字符串转为svg对象
 * @param svgStr
 */
Util.strToSvg = function (svgStr) {
    if(Util.isnUndefOrNull(svgStr))
        return;

    return new DOMParser().parseFromString(svgStr,"text/xml").documentElement;
}
/**
 * 流程节点样式修改通用方法
 * @type {{drawbefore: {Pool: Util.processModifyHandler.drawbefore.Pool}}}
 */
Util.processModifyHandler = {
    common: function (svg, selector,  attr, value, type) {
        //通用修改svg属性的值
        if(Util.isnUndefOrNull(value) || Util.isnUndefOrNull(attr) || Util.isnUndefOrNull(svg))
            return;
        if(Util.isnUndefOrNull(type))
            type = "attr";

        if(!Util.isnUndefOrNull(selector))
            svg = $(svg).find(selector);
        if(type == "css"){
            $(svg)[0].style[attr] = value;
        }else
            $(svg)[type](attr, value);
    },
    drawbefore: {
        modify: function (svg, shape, type, config) {
            //通用修改方法
            if(Util.isnUndefOrNull(type))
                return;
            if(!Util.isnUndefOrNull(Util.processModifyHandler.drawbefore[type.toLowerCase()]))
                Util.processModifyHandler.drawbefore[type.toLowerCase()](svg, shape, type, config);
        },
        pool: function (svg, shape, type, config) {
            //confign格式：{theme： #fffff}
            if(Util.isnUndefOrNull(config) || Util.isnUndefOrNull(config.theme))
                return;

            $(svg).find("rect[fill != 'none']").attr("fill", config.theme);
        },
        usertask: function (svg, shape, type, config) {
            //confign格式：{fontColor： #fffff, borderColor: #fffff, bgColor: #ffffff, imageColor: #ffffff}
            if(Util.isnUndefOrNull(config))
                return;
            //修改文字颜色
            Util.processModifyHandler.common(svg, "g > text:first", "fill", config.fontColor, "css");
            //修改边框颜色
            Util.processModifyHandler.common(svg, "g > rect[id = 'bg_frame']", "stroke", config.borderColor);
            //修改背景色
            Util.processModifyHandler.common(svg, "g > rect[id = 'bg_frame']", "fill", config.bgColor);
            //修改图标颜色
            Util.processModifyHandler.common(svg, "g > g:first > path", "fill", config.imageColor, "css");
            Util.processModifyHandler.common(svg, "g > g:gt(0)", "stroke", config.imageColor);
        },
        servicetask: function (svg, shape, type, config) {
            //confign格式：{fontColor： #fffff, borderColor: #fffff, bgColor: #ffffff, imageColor: #ffffff}
            //处理逻辑与用户节点相同
            Util.processModifyHandler.drawbefore.usertask(svg, shape, type, config);
        },
        sequenceflow: function (svg, shape, type, config) {
            if(Util.isnUndefOrNull(config))
                return;
            //confign格式：{borderColor： #fffff, borderWidth: 2, animationPathColor: #ff00000}}
            //修改连线颜色
            Util.processModifyHandler.common(svg, "g > path", "stroke", config.borderColor);
            //修改起始和终止箭头颜色
            Util.processModifyHandler.common(svg, "defs > marker > path", "stroke", config.borderColor);
            Util.processModifyHandler.common(svg, "defs > marker > path[id = 'arrowhead']", "fill", config.borderColor);
            //处理连线宽度
            Util.processModifyHandler.common(svg, "g > path", "stroke-width", config.borderWidth);
            //添加运动轨迹
            if(Util.isnUndefOrNull(config.animationPathColor))
                return;

            var animationStr = '<g xmlns=\"http://www.w3.org/2000/svg\">' +
                "<circle cx=\"\" cy=\"\" r=\"10\" fill=\"" + config.animationPathColor + "\">" +
                "<animateMotion dur=\"1s\" repeatCount=\"indefinite\">" +
                "<mpath href=\"#bg_frame\"/>" +
                "</animateMotion>" +
                "</circle>" +
                "</g>";
            svg.appendChild(Util.strToSvg(animationStr));
        },
        startnoneevent: function (svg, shape, type, config) {
            Util.processModifyHandler.common(svg, "circle", "fill", config.bgColor);
            //设置字体颜色
            Util.processModifyHandler.common(svg, "text", "fill", config.bgColor);
        },

        subprocess: function (svg, shape, type, config) {
            //confign格式：{fontColor： #fffff, borderColor: #fffff, bgColor: #ffffff, imageColor: #ffffff}
            //处理逻辑与用户节点相同
            Util.processModifyHandler.drawbefore.usertask(svg, shape, type, config);
        }
    },
    update: {
        update: function (shape, config) {
            if(Util.isnUndefOrNull(config))
                return;
            var nodetype = shape._stencil._jsonStencil.id.toLowerCase();
            if(!Util.isnUndefOrNull(Util.processModifyHandler.update[nodetype]))
                Util.processModifyHandler.update[nodetype](shape, nodetype, config)
        },
        pool: function (shape, type, config) {
            Util.processModifyHandler.drawbefore.pool($(shape.node).find(".stencils > .me > g")[0],
                shape, type, config);
        }
    }
}

Util.setSvgElementColor = function (svg, stencil, color) {
    //如果节点执行过，有异常的则显示红色，否则显示绿色
    var g = svg.getElementsByTagName("g")[0];
    //设置鼠标悬浮样式
    g.style.cursor = "pointer";
    //设置背景色
    angular.forEach(g.children, function (data) {
        data.setAttributeNS(null, "stroke",  color);
    })
    //消息节点
    if(stencil._jsonStencil.id == "BoundaryMessageEvent" || stencil._jsonStencil.id == "StartMessageEvent")
        $(g).find("path")[0].setAttributeNS(null, "fill",  color);

    //排他网关节点
    if(stencil._jsonStencil.id == "ExclusiveGateway"){
        g.getElementsByTagName("path")[1].setAttributeNS(null, "stroke",  color);
        g.getElementsByTagName("path")[1].setAttributeNS(null, "fill",  color);
        g.getElementsByTagName("path")[2].setAttributeNS(null, "stroke",  color);
        g.getElementsByTagName("path")[2].setAttributeNS(null, "fill",  color);
    }
    //终止结束时间， 填充圆圈
    if(stencil._jsonStencil.id == "EndTerminateEvent") {
        //选第二个圆填充
        g.getElementsByTagName("circle")[1].setAttributeNS(null, "fill",  color);
    }
    //信号中间事件（抛出）， 填充三角形
    if(stencil._jsonStencil.id == "ThrowSignalEvent") {
        g.getElementsByTagName("path")[0].setAttributeNS(null, "fill",  color);
    }
    //设置字体颜色
    $(g).find("text")[0].setAttributeNS(null, "fill",  color);
}
//转换异常种类
Util.setExceptionKind = function (kind) {
    if(kind == "exception")
        return "异常";
    else if(kind == "warning")
        return "告警";
}

//翻译整改节点类型
Util.translateNodeType = function (type) {
    if(type == "start")
        return "发起";
    else if(type == "approve")
        return "审批";
    else if(type == "feedback")
        return "反馈";
    else if(type == "end")
        return "完结";
}

//翻译整改处理标志
Util.translateDealresult = function (result) {
    if(result == "true")
        return "已处理";
    else if(result == "false")
        return "未处理";
    else if(result == "working")
        return "正在整改";
    else if(result == "fail")
        return "难以整改";
}
//翻译解析对象类型
Util.translateObjecttype = function (objecttype) {
    if(objecttype == "input"){
        return '输入';
    }else if(objecttype == "output"){
        return '输出';
    }else {
        return "";
    }
}


// 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
Util.getNowFormatDate = function(data) {
    var date = new Date();
    if(!Util.isnUndefOrNull(data))
        date = new Date(data);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var second = date.getSeconds();
    var minute = date.getMinutes();
    var hour = date.getHours();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strDate >= 0 && second <= 9) {
        second = "0" + second;
    }
    if (strDate >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (strDate >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}

Util.getCurMonthLastTime = function (time) {
    var year = time.substring(0,4);
    var month = time.substring(5,7);

    if(month > 11){
        year = parseInt(year) + 1;
        month = 0
    }

    var date = new Date(parseInt(year), parseInt(month), 1);
    return new Date(date.getTime() - 1000).Format("yyyy-MM-dd hh:mm:ss");
}

/**
 * 表格td的内容过长时不换行显示...省略内容了， 计算出需要设置列的宽度
 * @param element 当前元素
 * @param otherTableColWidths 表格其他列宽度
 */
Util.setNowrapColWidth = function (element, otherTableColWidths) {
    var width = element.find(".table-panel").width();
    //margin: 30, border: 2
    var nowrapColWidth = width - 30 - 2
    for(var i = 0; i<otherTableColWidths.length; i++){
        nowrapColWidth = nowrapColWidth - otherTableColWidths[i];
    }
    return  nowrapColWidth + 'px';
}
/**
 * 构造数据，将对象中的某个字段替换为，另外一个字段
 * @param data
 * @param sourceFieldName 需要替换字段名称
 * @param targetFieldName 替换后的字段名称
 */
Util.buildData = function (data, sourceFieldName, targetFieldName) {
    if(Util.isnUndefOrNull(data) || Util.isNullOrUndefOrSpace(sourceFieldName))
        return data;
    if(Util.isNullOrUndefOrSpace(targetFieldName))
        targetFieldName = "value";
    if($.isArray(data))
    {
        var newDatas = [];
        $.each(data, function (i, item) {
            var tempData = $.extend(true, {}, item);
            tempData[targetFieldName] = tempData[sourceFieldName];
            newDatas.push(tempData);
        })
        return newDatas;
    }else
    {
        var newData = $.extend(true, {}, data);
        data[targetFieldName] = data[sourceFieldName];
        return newData;
    }
}
/**
 * 通用局部打印函
 */
Util.commonPrintFun = {
    printArea:function () {
        $(".main-ul").hide();
        $(".header").hide();
        $(".navbar").hide();
        $(".printDiv").css("top", "0px");
        $(".printDiv").css("position", "fixed");
        $("canvas").css("width", "100%");
        $("canvas").css("height", "100%");

        window.print();

        $(".main-ul").show();
        $(".header").show();
        $(".navbar").show();
        $(".printDiv").css("top", "86px");
        $(".printDiv").css("position", "absolute");
        $("canvas").css("width", "100%");
        $("canvas").css("height", "100%");
    }
}
