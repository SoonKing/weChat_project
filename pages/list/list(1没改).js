// pages/list/list.js

//引入fetch对象
const fetch=require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      //获得分类,存储到这里面
      category: {},
      //获取分类存到数组里面
      shops: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(options)

   
    wx.request({
        url: "https://locally.uieee.com/categories/" + options.cat,
        success:res=>{
            // console.log(res)
            this.setData({
                //res.data是回调函数返回来的数据
                category:res.data
            })
            //两个函数是异步的,可能不会先加载进来
            wx.setNavigationBarTitle({
                title: this.data.category.name,
            })
            //根据当前的数据,在发送一次请求,
            wx.request({
                url: "https://locally.uieee.com/categories/"+options.cat+"/shops"+"?_page=1&_limit=10",
                success:res=>{
                    this.setData({
                        shops:res.data
                    })
                }
            })
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //在这里展示页面头部标题的变化
  if(this.data.category.name){
      wx.setNavigationBarTitle({
          title: this.data.category.name,
      })
  }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})