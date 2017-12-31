// pages/index/index.js

//先引入封装的fetch   Promise这个对象
const fetch=require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      slides: [],
      categories: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //请求轮播图
        fetch("slides").then(
            res=>{
                this.setData({
                    slides:res.data
                })
            }
        )
     
      //发送请求九宫格的请求
        fetch('categories').then(res=>{
        this.setData({
            categories: res.data
        })
      })
  },
})