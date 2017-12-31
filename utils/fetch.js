//小程序也是支持commonjs规范的
//可以返回到外面一个对象
module.exports=function(url,data){
    //创建一个promise
    let p = new Promise(function (resolve, reject) {
        wx.request({
            url: `https://locally.uieee.com/${url}`,
            data: data,
            success: resolve,
            fail:reject
        })//Request
    })//Promise
    return p;
}//function
