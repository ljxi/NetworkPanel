var maxtheard
var testurl
var lsat_date=0
var CountryCode_Zh_cn={"US": "\u7f8e\u56fd", "CA": "\u52a0\u62ff\u5927", "HK": "\u9999\u6e2f(\u4e2d\u56fd)", "TW": "\u53f0\u6e7e(\u4e2d\u56fd)", "SG": "\u65b0\u52a0\u5761", "JP": "\u65e5\u672c", "KR": "\u97e9\u56fd", "AU": "\u6fb3\u5927\u5229\u4e9a", "NZ": "\u65b0\u897f\u5170", "AF": "\u963f\u5bcc\u6c57", "AL": "\u963f\u5c14\u5df4\u5c3c\u4e9a", "DZ": "\u963f\u5c14\u53ca\u5229\u4e9a", "AS": "\u7f8e\u5c5e\u8428\u6469\u4e9a(\u7f8e\u56fd)", "AD": "\u5b89\u9053\u5c14", "AO": "\u5b89\u54e5\u62c9", "AI": "\u5b89\u572d\u62c9", "AG": "\u5b89\u63d0\u74dc\u548c\u5df4\u5e03\u8fbe", "AR": "\u963f\u6839\u5ef7", "AM": "\u4e9a\u7f8e\u5c3c\u4e9a", "AW": "\u963f\u9c81\u5df4", "AT": "\u5965\u5730\u5229", "AZ": "\u963f\u585e\u62dc\u7586", "BS": "\u5df4\u54c8\u9a6c", "BH": "\u5df4\u6797", "BD": "\u5b5f\u52a0\u62c9\u56fd", "BB": "\u5df4\u5df4\u591a\u65af", "BY": "\u767d\u4fc4\u7f57\u65af", "BE": "\u6bd4\u5229\u65f6", "BZ": "\u4f2f\u5229\u5179", "BJ": "\u8d1d\u5b81", "BM": "\u767e\u6155\u5927", "BT": "\u4e0d\u4e39", "BO": "\u73bb\u5229\u7ef4\u4e9a", "BA": "\u6ce2\u9ed1", "BW": "\u535a\u8328\u74e6\u7eb3", "BR": "\u5df4\u897f", "VG": "\u82f1\u5c5e\u7ef4\u4eac\u7fa4\u5c9b(\u82f1\u56fd)", "BN": "\u6587\u83b1", "BG": "\u4fdd\u52a0\u5229\u4e9a", "BF": "\u5e03\u57fa\u7eb3\u6cd5\u7d22", "BI": "\u5e03\u9686\u8fea", "KH": "\u67ec\u57d4\u5be8", "CM": "\u5580\u9ea6\u9686", "CV": "\u4f5b\u5f97\u89d2", "KY": "\u5f00\u66fc\u7fa4\u5c9b(\u82f1\u56fd)", "CF": "\u4e2d\u975e\u5171\u548c\u56fd", "TD": "\u4e4d\u5f97", "CL": "\u667a\u5229", "CO": "\u54e5\u4f26\u6bd4\u4e9a", "KM": "\u79d1\u6469\u7f57", "CD": "\u521a\u679c(\u91d1)", "CK": "\u5e93\u514b\u7fa4\u5c9b(\u65b0\u897f\u5170)", "CR": "\u54e5\u65af\u8fbe\u9ece\u52a0", "CI": "\u79d1\u7279\u8fea\u74e6", "HR": "\u514b\u7f57\u5730\u4e9a", "CU": "\u53e4\u5df4", "CY": "\u585e\u6d66\u8def\u65af", "CZ": "\u6377\u514b", "DK": "\u4e39\u9ea6", "DJ": "\u5409\u5e03\u63d0", "DM": "\u591a\u7c73\u5c3c\u514b", "DO": "\u591a\u7c73\u5c3c\u52a0\u5171\u548c\u56fd", "EC": "\u5384\u74dc\u591a\u5c14", "EG": "\u57c3\u53ca", "SV": "\u8428\u5c14\u74e6\u591a", "GQ": "\u8d64\u9053\u51e0\u5185\u4e9a", "ER": "\u5384\u7acb\u7279\u91cc\u4e9a", "EE": "\u7231\u6c99\u5c3c\u4e9a", "ET": "\u57c3\u585e\u4fc4\u6bd4\u4e9a", "FO": "\u6cd5\u7f57\u7fa4\u5c9b(\u4e39\u9ea6)", "FJ": "\u6590\u6d4e", "FI": "\u82ac\u5170", "FR": "\u6cd5\u56fd", "GF": "\u6cd5\u5c5e\u572d\u4e9a\u90a3(\u6cd5\u56fd)", "PF": "\u6cd5\u5c5e\u73bb\u5229\u5c3c\u897f\u4e9a", "GA": "\u52a0\u84ec", "GM": "\u5188\u6bd4\u4e9a", "GE": "\u683c\u9c81\u5409\u4e9a", "DE": "\u5fb7\u56fd", "GH": "\u52a0\u7eb3", "GI": "\u76f4\u5e03\u7f57\u9640(\u82f1\u56fd)", "GR": "\u5e0c\u814a", "GL": "\u683c\u9675\u5170", "GD": "\u683c\u6797\u7eb3\u8fbe", "GP": "\u74dc\u5fb7\u7f57\u666e", "GU": "\u5173\u5c9b(\u7f8e\u56fd)", "GT": "\u5371\u5730\u9a6c\u62c9", "GN": "\u51e0\u5185\u4e9a", "GW": "\u51e0\u5185\u4e9a\u6bd4\u7ecd", "GY": "\u572d\u4e9a\u90a3", "HT": "\u6d77\u5730", "HN": "\u6d2a\u90fd\u62c9\u65af", "HU": "\u5308\u7259\u5229", "IS": "\u51b0\u5c9b", "IN": "\u5370\u5ea6", "ID": "\u5370\u5ea6\u5c3c\u897f\u4e9a", "IR": "\u4f0a\u6717", "IQ": "\u4f0a\u62c9\u514b", "IE": "\u7231\u5c14\u5170\u5171\u548c\u56fd", "IL": "\u4ee5\u8272\u5217", "IT": "\u610f\u5927\u5229", "JM": "\u7259\u4e70\u52a0", "JO": "\u7ea6\u65e6", "KZ": "\u54c8\u8428\u514b\u65af\u5766", "KE": "\u80af\u5c3c\u4e9a", "KI": "\u57fa\u91cc\u5df4\u65af", "KP": "\u5317\u671d\u9c9c", "KW": "\u79d1\u5a01\u7279", "KG": "\u5409\u5c14\u5409\u65af\u65af\u5766", "LA": "\u8001\u631d", "LV": "\u62c9\u8131\u7ef4\u4e9a", "LB": "\u9ece\u5df4\u5ae9", "LS": "\u83b1\u7d22\u6258", "LR": "\u5229\u6bd4\u91cc\u4e9a", "LY": "\u5229\u6bd4\u4e9a", "LI": "\u5217\u652f\u6566\u58eb\u767b", "LT": "\u7acb\u9676\u5b9b", "LU": "\u5362\u68ee\u5821", "MO": "\u6fb3\u95e8(\u4e2d\u56fd)", "MK": "\u9a6c\u5176\u987f", "MG": "\u9a6c\u8fbe\u52a0\u65af\u52a0", "MW": "\u9a6c\u62c9\u7ef4", "MY": "\u9a6c\u6765\u897f\u4e9a", "MV": "\u9a6c\u5c14\u4ee3\u592b", "ML": "\u9a6c\u91cc\u5171\u548c\u56fd", "MT": "\u9a6c\u8033\u4ed6", "MH": "\u9a6c\u7ecd\u5c14\u7fa4\u5c9b", "MQ": "\u9a6c\u63d0\u5c3c\u514b(\u6cd5\u56fd)", "MR": "\u6bdb\u91cc\u5854\u5c3c\u4e9a", "MU": "\u6bdb\u91cc\u6c42\u65af", "YT": "\u9a6c\u7ea6\u7279", "MX": "\u58a8\u897f\u54e5", "FM": "\u5bc6\u514b\u7f57\u5c3c\u897f\u4e9a\u8054\u90a6", "MD": "\u6469\u5c14\u591a\u74e6", "MC": "\u6469\u7eb3\u54e5", "MN": "\u8499\u53e4\u56fd", "ME": "\u9ed1\u5c71\u5171\u548c\u56fd", "MS": "\u8499\u585e\u62c9\u7279\u5c9b(\u82f1\u56fd)", "MA": "\u6469\u6d1b\u54e5", "MZ": "\u83ab\u6851\u6bd4\u514b", "MM": "\u7f05\u7538", "NA": "\u7eb3\u7c73\u6bd4\u4e9a", "NR": "\u7459\u9c81", "NP": "\u5c3c\u6cca\u5c14", "599": "\u8377\u5c5e\u5b89\u7684\u5217\u65af", "NL": "\u8377\u5170", "NC": "\u65b0\u5580\u91cc\u591a\u5c3c\u4e9a(\u6cd5\u56fd)", "NI": "\u5c3c\u52a0\u62c9\u74dc", "NE": "\u5c3c\u65e5\u5c14", "NG": "\u5c3c\u65e5\u5229\u4e9a", "NU": "\u7ebd\u57c3", "MP": "\u5317\u9a6c\u91cc\u4e9a\u7eb3\u7fa4\u5c9b(\u7f8e\u56fd)", "NO": "\u632a\u5a01", "OM": "\u963f\u66fc", "PK": "\u5df4\u57fa\u65af\u5766", "PW": "\u5e15\u52b3", "PS": "\u5df4\u52d2\u65af\u5766", "PA": "\u5df4\u62ff\u9a6c", "PG": "\u5df4\u5e03\u4e9a\u65b0\u51e0\u5185\u4e9a", "PY": "\u5df4\u62c9\u572d", "CN": "\u4e2d\u56fd", "PE": "\u79d8\u9c81", "PH": "\u83f2\u5f8b\u5bbe", "PL": "\u6ce2\u5170", "PT": "\u8461\u8404\u7259", "PR": "\u6ce2\u591a\u9ece\u5404(\u7f8e\u56fd)", "QA": "\u5361\u5854\u5c14", "CG": "\u521a\u679c\u5171\u548c\u56fd", "ZW": "\u6d25\u5df4\u5e03\u97e6", "RE": "\u7559\u5c3c\u6c6a(\u6cd5\u56fd)", "RO": "\u7f57\u9a6c\u5c3c\u4e9a", "RU": "\u4fc4\u7f57\u65af", "RW": "\u5362\u65fa\u8fbe", "SH": "\u5723\u8d6b\u52d2\u62ff", "KN": "\u5723\u57fa\u8328\u548c\u5c3c\u7ef4\u65af", "LC": "\u5723\u5362\u897f\u4e9a", "PM": "\u5723\u76ae\u57c3\u5c14\u548c\u5bc6\u514b\u9686\u5c9b(\u6cd5\u56fd)", "VC": "\u5723\u6587\u68ee\u7279\u548c\u683c\u6797\u7eb3\u4e01\u65af", "WS": "\u8428\u6469\u4e9a", "SM": "\u5723\u9a6c\u529b\u8bfa", "ST": "\u5723\u591a\u7f8e\u548c\u666e\u6797\u897f\u6bd4", "SA": "\u6c99\u7279\u963f\u62c9\u4f2f", "SN": "\u585e\u5185\u52a0\u5c14", "RS": "\u585e\u5c14\u7ef4\u4e9a\u5171\u548c\u56fd", "SC": "\u585e\u820c\u5c14", "SL": "\u585e\u62c9\u5229\u6602", "SK": "\u65af\u6d1b\u4f10\u514b", "SI": "\u65af\u6d1b\u6587\u5c3c\u4e9a", "SB": "\u6240\u7f57\u95e8\u7fa4\u5c9b", "SO": "\u7d22\u9a6c\u91cc", "ZA": "\u5357\u975e", "SS": "\u5357\u82cf\u4e39", "ES": "\u897f\u73ed\u7259", "LK": "\u65af\u91cc\u5170\u5361", "SD": "\u82cf\u4e39", "SR": "\u82cf\u91cc\u5357", "SZ": "\u65af\u5a01\u58eb\u5170", "SE": "\u745e\u5178", "CH": "\u745e\u58eb", "SY": "\u53d9\u5229\u4e9a", "TJ": "\u5854\u5409\u514b\u65af\u5766", "TZ": "\u5766\u6851\u5c3c\u4e9a", "TH": "\u6cf0\u56fd", "TL": "\u4e1c\u5e1d\u6c76", "TG": "\u591a\u54e5", "TK": "\u6258\u514b\u52b3", "TO": "\u6c64\u52a0", "TT": "\u7279\u7acb\u5c3c\u8fbe\u548c\u591a\u5df4\u54e5", "TN": "\u7a81\u5c3c\u65af", "TR": "\u571f\u8033\u5176", "TM": "\u571f\u5e93\u66fc\u65af\u5766", "TC": "\u7279\u514b\u65af\u548c\u51ef\u79d1\u65af\u7fa4\u5c9b(\u82f1\u56fd)", "TV": "\u56fe\u74e6\u5362", "UG": "\u4e4c\u5e72\u8fbe", "UA": "\u4e4c\u514b\u5170", "AE": "\u963f\u62c9\u4f2f\u8054\u5408\u914b\u957f\u56fd", "GB": "\u82f1\u56fd", "UY": "\u4e4c\u62c9\u572d", "UZ": "\u4e4c\u5179\u522b\u514b\u65af\u5766", "VU": "\u74e6\u52aa\u963f\u56fe", "VE": "\u59d4\u5185\u745e\u62c9", "VN": "\u8d8a\u5357", "WF": "\u74e6\u5229\u65af\u548c\u5bcc\u56fe\u7eb3\u7fa4\u5c9b(\u6cd5\u56fd)", "YE": "\u4e5f\u95e8", "ZM": "\u8d5e\u6bd4\u4e9a"}
var all_down_sum=0
var run=false
var checkIP=false
var visibl=true
var thread_down = []
var lsat_all_down=0
var refresh_lay=5000
async function start_thread(index){
    try{
        const response = await fetch(testurl,{cache: "no-store",mode: 'cors',referrerPolicy: 'no-referrer'})
        const reader = response.body.getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                reader.cancel()
                start_thread(index);
                break;
            }
            if(!run){
                reader.cancel()
                break
            }
            thread_down[index]+=value.length
        }
    } catch(err) {
        console.log(err)
        if(run)start_thread(index);
    }
}
async function cale(){
        var all_down_a=sum(thread_down)
        if(visibl)document.getElementById("speed").innerText=show((all_down_a-lsat_all_down)/(new Date().getTime()-lsat_date)*1000,['B/s','KB/s','MB/s','GB/s','TB/s','PB/s'],[0,0,1,2,2,2]);
        if(visibl)document.getElementById("mbps").innerText=show((all_down_a-lsat_all_down)/(new Date().getTime()-lsat_date)*8000,['Bps','Kbps','Mbps','Gbps','Tbps','Pbps'],[0,0,0,2,2,2]);
        if(!visibl)document.title=show((all_down_sum+all_down_a),['B','KB','MB','GB','TB','PB'],[0,0,0,2,2,2]) + ' ' +show((all_down_a-lsat_all_down)/(new Date().getTime()-lsat_date)*1000,['B/s','KB/s','MB/s','GB/s','TB/s','PB/s'],[0,0,0,2,2,2]);
        lsat_all_down=all_down_a
        lsat_date=new Date().getTime();
        if(run)setTimeout(cale,1000)
        else 
        {   
            var avg_speed=1000*(all_down_a)/(new Date().getTime()-start_time)
            
            document.title='网络面板'
            document.getElementById("speed").innerText=show((avg_speed),['B/s','KB/s','MB/s','GB/s','TB/s','PB/s'],[0,0,1,2,2,2]);
            document.getElementById("mbps").innerText=show((avg_speed)*8,['Bps','Kbps','Mbps','Gbps','Tbps','Pbps'],[0,0,0,2,2,2]);
            lsat_all_down=0
            document.getElementById('describe').innerText='平均速度';
        }
}

async function total(){
    var all_down=sum(thread_down)
    if(visibl)document.getElementById("total").innerText=show((all_down_sum+all_down),['B','KB','MB','GB','TB','PB'],[0,0,1,2,2,2]);
    if((all_down_sum+all_down) >= Maximum  && Maximum!=0)stop()
    if(run)setTimeout(total,100)
    else{
        all_down_sum+=all_down;
        document.getElementById("total").innerText=show((all_down_sum),['B','KB','MB','GB','TB','PB'],[0,0,1,2,2,2]);
    }
}

async function start(){
    if(all_down_sum >= Maximum && Maximum!=0){
        all_down_sum = 0
    }
    maxtheard=document.getElementById("thread").value;
    testurl=document.getElementById("link").value;
    if(testurl.length<10){
        alert("链接不合法")
        return;
    }
    testurl=testurl.substring(0,5).toLowerCase()+ testurl.substring(5, testurl.length);
    if(!checkURL(testurl)){
        alert("链接不合法")
        return;
    }
    if(testurl.startsWith("http://")){
        alert("由于浏览器安全限制，不支持http协议，请使用https协议")
        return;
    }
    if(!testurl.startsWith("https://")){
        alert("链接不合法")
        return;
    }
    document.getElementById('do').innerText='正在检验链接...';
    document.getElementById('do').disabled=true;

    try{
        const response = await fetch(testurl,{cache: "no-store",mode: 'cors',referrerPolicy: 'no-referrer'})
        const reader = response.body.getReader();
        const { value, done } = await reader.read();
        if(value.length<=0)throw "资源响应异常";
        reader.cancel()
    } catch(err) {
        console.warn(err)
        document.getElementById('do').innerText='开始';
        document.getElementById('do').disabled=false;
        alert("该链接不可用，如果你能够正常访问该链接，那么很有可能是浏览器的跨域限制")
        return
    }
    document.getElementById('describe').innerText='实时速度';
    document.getElementById('do').innerText='停止';
    document.getElementById('do').disabled=false;
    var num=maxtheard
    lsat_all_down=0
    start_time = new Date().getTime()
    run = true
    thread_down=[]
    while(num--){
        thread_down[num]=0
        start_thread(num)
    }
    cale()
    total()
}
function stop(){
    run=false
    document.getElementById('do').innerText='开始';
}

function sum(arr) {
  var s = 0;
  for (var i = 0;i<arr.length;i++) {
    s += arr[i];
  }
  return s;
}

function botton_clicked(){
    if(run){
        stop();
    }else{
        start();
    }
}
function checkURL(URL){
    var str=URL;
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    if(objExp.test(str)==true){
    return true;
    }else{
    return false;
    }
} 

var cnip=''
function ipcn(){
    if(visibl){
        fetch('https://forge.speedtest.cn/api/location/info',{referrerPolicy: 'no-referrer'})
        .then(response => response.json())
        .then(data =>{
            var tag = document.getElementById("ipcn")
            tag.innerText=data['ip']+' '+data['province']+' '+data['city']+' '+data['distinct']+' '+data['isp']
            if(data['ip'] !== cnip){
                tag.style.color=''
                ckip(data['ip'],tag)
            }
            cnip=data['ip'];
        });
    }
    setTimeout(ipcn,5000)
}
var gbip=""
function ipgb(){
    if(visibl){
        fetch('https://api-ipv4.ip.sb/geoip',{referrerPolicy: 'no-referrer'})
        .then(response => response.json())
        .then(data =>{
            var tag = document.getElementById("ipgb")
            tag.innerText=data['ip']+' '+CountryCode_Zh_cn[data['country_code']]+' '+data['isp']
            if(data['ip'] !== gbip){
                tag.style.color=''
                ckip(data['ip'],tag)
            }
            gbip=data['ip'];
        });
    }
    setTimeout(ipgb,refresh_lay)
}


function laycn(){
    if(visibl){
        var start_ti = new Date().getTime();
        fetch("https://connectivitycheck.platform.hicloud.com/generate_204", {method: "HEAD",cache: "no-store",mode: 'no-cors',referrerPolicy: 'no-referrer'})
        .then(function(){
            var lay=new Date().getTime()-start_ti;document.getElementById("laycn").innerText=lay+'ms';
        })
        .catch(error=>document.getElementById("laycn").innerText='-ms');
    }
    setTimeout(laycn,1000)
}

function laygb(){
    if(visibl){
    var start_ti = new Date().getTime();
    fetch("	https://cp.cloudflare.com/", {method: "HEAD",cache: "no-store",mode: 'no-cors',referrerPolicy: 'no-referrer'})
      .then(function(){
        var lay=new Date().getTime()-start_ti;document.getElementById("laygb").innerText=lay+'ms';
      })
      .catch(error=>document.getElementById("laygb").innerText='-ms');
    }
    setTimeout(laygb,1000)
}

function ckbl(){
    if(visibl){
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 2000);
    fetch("https://twitter.com/", {signal: controller.signal,method: "HEAD",cache: "no-store",mode: 'no-cors',referrerPolicy: 'no-referrer'})
      .then(function(){
        document.getElementById("laygb").style.color="green";
      })
      .catch(error=>document.getElementById("laygb").style.color="red");
    }
    setTimeout(ckbl,1000)
}

function ckip(ip,tag){
    if(checkIP){
        fetch('https://down.ljxnet.cn/?headers=%7B%22referer%22%3A%22https%3A%2F%2Fipinfo.io%2F%22%2C%22origin%22%3A%22https%3A%2F%2Fipinfo.io%2F%22%7D&url=https%3A%2F%2Fipinfo.io%2Fwidget%2Fdemo%2F' + ip)
        .then(response => response.json())
        .then(data =>{
            console.log(data.input,data.data.country,data.data.city,data.data.asn.name,data.data.company.type)
            if(data.data.company.type === "isp")tag.style.color ="green"
        });
    }
}

ipcn()
ipgb()
laycn()
laygb()
ckbl()

document.addEventListener("visibilitychange", function() {
    var string = document.visibilityState
    if (string === 'hidden') {
        visibl=false
        if(run&&!document.getElementById("customSwitch2").checked)botton_clicked();
    }
    if (string === 'visible') {
        visibl=true    
        document.title="网络面板"
    }
  });
