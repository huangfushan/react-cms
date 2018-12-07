/**
 * 用星星隐藏
 * @param idNumber
 * @returns {*}
 */

//隐藏身份证
const idNumber = (idNumber) => {
  const newIdNumber=idNumber.replace(/(\d{6})(\d+)(\d{4})/,function(x,y,z,p){
    let i="";
    while(i.length<z.length){ i+="*" }
    return y+i+p
  });
  return newIdNumber;
};


//phone
const phone = (phone) => {
  const newPhone=phone.replace(/(\d{3})(\d+)(\d{4})/,function(x,y,z,p){
    let i="";
    while(i.length<z.length){ i+="*" }
    return y+i+p
  });
  return newPhone;
};

//银行卡
const bank = (bank) => {
  const newBank=bank.replace(/(\d{4})(\d+)(\d{4})/,function(x,y,z,p){
    let i="";
    while(i.length<z.length){ i+="*" }
    return y+i+p
  });
  return newBank;
};

export default{
  idNumber,
  phone,
  bank,
}


