const formatPriceWithSymbol = function(price) {  // ¥ 金额格式化
    if (price == null) {
        return '-'
    }
    //return price.toLocaleString('en-US')
    return  parseFloat(price).toFixed(0).replace(new RegExp('(\\d)(?=(\\d{4})+$)','ig'),"$1,");
}
const formatPrice = function(price) {  // 金额
    if (price == null || price == 'undefined') {
        return '-'
    }
    return parseFloat(price).toFixed(0).replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
}

const formatweekno = function(data){

  if(!data) {
    return null
  }

  return data.substr(data.length-2,data.length)
}

//登录过期处理
const quit = function(){ 
        this.$router.push({name:'login'})
        localStorage.clear()
        this.companyName = "九域开放平台"
        this.username = ''
        this.log_url = ''
        
}

//比较日期时间大小,格式"2007-2-2 7:30"
const compareDate = function(d1, d2) { 
     return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));     
} 



//为true返回0
const checkRunType = function(data){
 // console.log("checkRunType"+data)
  if(data == true){
     return 0
  }else{
    return 2
  }
}

//应用状态转换
const changeRunType = function(data){
   if(data == 0){
      return 'H5'
   }
   if(data == 2){
      return '离线轻应用'
   }
   return data
}

//为空返回暂缺
const formatStoreMessage = function(data){
  if(data){
    return data
  }else{
    return '暂缺'
  }
}

//为空或underfind返回-
const formatunderfined = function(data){
  if(data == null || data == 'undefined'){
    return '-'
  }else{
    return data
  }
}

//保留两位小数为空返回-
const formatTwoPoint = function(data){
  if(data == null || data == 'undefined'){
    return '-'
  }else{
    return data.toFixed(2)
  }
}

//保留两位小数为空返回null
const formatTwoPoint_null = function(data){
  if(data == null || data == 'undefined'){
    return null
  }else{
    return data.toFixed(2)
  }
}

//小数转为百分数保留一位小数
const formatDiscount = function(discount,num=1) {
  if (discount == null) {
      return '-'
  }
  if(Math.abs(discount) < 0.0001){return '0.0%'}

  return (parseFloat(discount) * 100).toFixed(1) + '%'

}

//除10并保留一位小数 加百分号
const formatnumber10 = function(n){
   if(n == null || n == '-'){
    return null
   }
   return (parseFloat(n) / 10).toFixed(1) + '%'
}

//和最大值比较 加百分号
const formatnumberMax = function(n,m){
   if(n == null || n == '-'){
    return null
   }
   return (parseFloat(n) / parseFloat(m) * 100 ) + '%'
}

//保留整数为null返回null
const formatNumberParseInt =function(data){
  if(data == null){
    return null
  }else{
    return Math.round(data)
  }
}
//保留整数为null返回-
const formatNumberParseInt2 =function(data){
  if(data == null){
    return '-'
  }else{
    return Math.round(data)
  }
}

//小数乘一百保留一位小数
const formatPercentage = function(v,num=1) {
  if (v == null || v == 'undefined') {
    return null
  }
  //console.log((parseFloat(v) * 100).toFixed(num))
  return parseFloat((parseFloat(v) * 100).toFixed(num))
}




const formatNumber = function(v,num=0) {
  if (v == null ) {
    return null
  }
  //console.log((parseFloat(v) * 100).toFixed(num))

  if(num == 0) {
    return parseInt((parseFloat(v)).toFixed(num))
  }

  return parseFloat((parseFloat(v)).toFixed(num))
}

//数组全为null 把元素改为undefined,需求:解决echarts bar系列data全为空不画图的问题
const checkNull = function(data){
  let j =0
  for(let i =0;i<data.length;i++){
    if(data[i] == null){
      j +=1
    }
  }
  if(j == data.length){
    data[0] = 'undefined'
    return data
  }else{
    return data
  }
}

//单元格有空填-
const checkTable = function(){
  let td_name=document.getElementsByTagName("td");
  for(let i=0;i<td_name.length;i++){
      if(td_name[i].innerHTML == ""){
         td_name[i].innerHTML = '-'
         td_name[i].style.color="#666"
      }
  }
}

//合并单元格算法tabObj代表表的Id，即GridView的Id，cellIndex代表合并第几列，beignRow 代表从几行开始，通常使用1，因为0是表头
const SpanGrid = function(tabObj, cellindex, beginRow) {
    var colIndex = cellindex;
    var rowBeginIndex = beginRow;
    if (tabObj != null) {
        var i, j, m;
        var intSpan;
        var strTemp;
        m = 0;
        for (i = rowBeginIndex; i < tabObj.rows.length; i++) {
            intSpan = 1;
            m++;
            strTemp = tabObj.rows[i].cells[colIndex].innerText;
            for (j = i + 1; j < tabObj.rows.length; j++) {
                if (strTemp == tabObj.rows[j].cells[colIndex].innerText &&(tabObj.rows[i].cells[0].innerText == tabObj.rows[j].cells[0].innerText ) ) {
                    intSpan++;
                    tabObj.rows[i].cells[colIndex].rowSpan = intSpan;
                    tabObj.rows[j].cells[colIndex].style.display = "none";
                }
                else {
                    break;
                }
            }

        }
        i = j - 1;
    }
}

export default {
  quit:quit,
  changeRunType:changeRunType,
  checkRunType:checkRunType,
  formatweekno : formatweekno,
  checkTable:checkTable,
  formatDiscount : formatDiscount,
  formatPercentage : formatPercentage,
  formatTwoPoint_null:formatTwoPoint_null,
  formatNumber : formatNumber,
  SpanGrid:SpanGrid,
  formatnumberMax:formatnumberMax,
  formatnumber10:formatnumber10,
  formatunderfined:formatunderfined,
  formatTwoPoint:formatTwoPoint,
  formatStoreMessage:formatStoreMessage,
  formatNumberParseInt:formatNumberParseInt,
  formatNumberParseInt2:formatNumberParseInt2,
  formatPriceWithSymbol:formatPriceWithSymbol,
  formatPrice:formatPrice,
  checkNull:checkNull,
}
