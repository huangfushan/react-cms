/**
 * 银行卡校验
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

function luhnCheck(bankno){
  const lastNum= bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）
  const newLastNum = parseInt(lastNum, 10);
  const first15Num=bankno.substr(0,bankno.length-1);//前15或18位
  const newArr=[];
  for(let i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i,1));
  }
  const arrJiShu=[];  //奇数位*2的积 <9
  const arrJiShu2=[]; //奇数位*2的积 >9

  const arrOuShu=[];  //偶数位数组
  for(let j=0;j<newArr.length;j++){
    if((j+1)%2===1){//奇数位
      if(parseInt(newArr[j],10)*2<9)
        arrJiShu.push(parseInt(newArr[j],10)*2);
      else
        arrJiShu2.push(parseInt(newArr[j],10)*2);
    }
    else //偶数位
      arrOuShu.push(newArr[j]);
  }

  const jishu_child1=[];//奇数位*2 >9 的分割之后的数组个位数
  const jishu_child2=[];//奇数位*2 >9 的分割之后的数组十位数
  for(let h=0;h<arrJiShu2.length;h++){
    jishu_child1.push(parseInt(arrJiShu2[h],10)%10);
    jishu_child2.push(parseInt(arrJiShu2[h],10)/10);
  }

  let sumJiShu=0; //奇数位*2 < 9 的数组之和
  let sumOuShu=0; //偶数位数组之和
  let sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal=0;
  for(let m=0;m<arrJiShu.length;m++){
    sumJiShu=sumJiShu+parseInt(arrJiShu[m],10);
  }

  for(let n=0;n<arrOuShu.length;n++){
    sumOuShu=sumOuShu+parseInt(arrOuShu[n],10);
  }

  for(let p=0;p<jishu_child1.length;p++){
    sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p],10);
    sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p],10);
  }
  //计算总和
  sumTotal=parseInt(sumJiShu,10)+parseInt(sumOuShu,10)+parseInt(sumJiShuChild1,10)+parseInt(sumJiShuChild2,10);

  //计算luhn值
  const k= parseInt(sumTotal,10)%10 === 0 ? 10 : parseInt(sumTotal,10)%10;
  const luhn= 10-k;
  if(newLastNum === luhn){
    console.log("验证通过");
    return true;
  }else{
    console.log("银行卡号必须符合luhn校验");
    return false;
  }
}


//检查银行卡号
export const  checkBankNo = (bankno) => {
  const newBankno = bankno.replace(/\s/g,'');
  if(newBankno === "") {
    console.log('请填写银行卡号');
    return false;
  }

  const num = /^\d*$/;//全数字
  if(!num.exec(newBankno)) {
    console.log('银行卡号必须全为数字');
    return false;
  }

  //开头6位
  const strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if(strBin.indexOf(newBankno.substring(0, 2)) === -1) {
    console.log('银行卡号开头6位不符合规范')

    return false;
  }

  if(newBankno.length < 16 || newBankno.length > 19) {
    console.log('银行卡号长度必须在16到19之间');

    return false;
  }

  //Luhn校验
  if(!luhnCheck(newBankno)){
    return false;
  }
  return true;
};


//检查银行卡号,antd的form表单需要
export const  checkBankNoForm = (rule, bankno, callback) => {
  if (!bankno){
    callback();
    return ;
  }
  const newBankno = bankno.replace(/\s/g,'');


  const num = /^\d*$/;//全数字
  if(!num.exec(newBankno)) {
    callback('银行卡号必须全为数字')
  }

  //开头6位
  const strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if(strBin.indexOf(newBankno.substring(0, 2)) === -1) {
    callback('银行卡号开头6位不符合规范')
  }

  if(newBankno && (newBankno.length < 16 || newBankno.length > 19)) {
    callback('银行卡号长度必须在16到19之间')
  }

  //Luhn校验
  if(newBankno && !luhnCheck(newBankno)){
    callback('请输入正确的银行卡号')
  }
  callback()
};

