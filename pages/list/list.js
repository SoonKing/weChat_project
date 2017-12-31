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
      shops: [],
      pageIndex:0,
      pageSize:20,
      hasMore:true
  },
  //封装一个加载的函数
  loadMore(){

    if(!this.data.hasMore) return;

      let {pageIndex,pageSize}=this.data//解构赋值,获取到这两个值
      const params = { _page: ++pageIndex, _limit: pageSize }
     
      fetch(`categories/${this.data.category.id}/shops`,params ).then(res=>{
          //获取当前分类下面的所有的店铺数量
          const totalCount = parseInt(res.header['X-Total-Count']);
          const hasMore=pageIndex*pageSize<totalCount;

          const shops=this.data.shops.concat(res.data)

          this.setData({
            //   shops:res.data,
              shops: shops,
              pageIndex:pageIndex,//把这个值赋值回去,不然始终开始的时候都是0
              hasMore:hasMore
          })
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(options)
//发送请求,拿到标题
    fetch(`categories/${options.cat}`).then(res=>{
        this.setData({
            category:res.data
        })
    
     //两个函数是异步的,可能不会先加载进来
        wx.setNavigationBarTitle({
            title: this.data.category.name,
        })
        //继续发送请求,请求当前分类下面的部分店铺
        this.loadMore()
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
    this.setData({
        shops:[],
        pageIndex:0,
        hasMore:true
    })
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(123)
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})