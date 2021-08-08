/* author：liyingxia */

Page({
  data: {
    imgUrl: "http://pic.51yuansu.com/backgd/cover/00/40/00/5be62bbb6ac3f.jpg!/fw/780/quality/90/unsharp/true/compress/true",
    isHidde: true,
    hiddeButton: false,
    ucompany: '',
    uname: '',
    upost:''
  },

  /* 监听input输入值的变化 实时更新*/
  onchangeCompany(e) {
    var that = this;
    that.setData({
      ucompany: e.detail.value,
    })
  },
  onchangePost(e) {
    var that = this;
    that.setData({
      upost:e.detail.value,
    })
  },
  onchangeName(e) {
    var that = this;
    that.setData({
      uname: e.detail.value
    })
    // console.log("输入监听变化：" + this.data.uname);
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  /* 初始化加载显示 */
  onLoad: function (options) {
    //把网络图片转成在本地
    wx.getImageInfo({
      src: this.data.imgUrl,
      success: (res) => {
        this.setData({
          imgUrl: res.path
        })
        this.getcanvas();
      }
    })
  },

  /* 生成图片 */
  createImg() {
    this.getcanvas();
    this.setData({
      isHidde: false,
      // hiddeButton: true,
      ucompany: '',
      uname: '',
      upost: ''
    })
  },

  /* 绘制canvas内容 */
  getcanvas() {
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas');
    // ctx.setFillStyle('red');    
    let metrics = ctx.measureText(that.data.ucompany); //获取字体的宽度
    let name = ctx.measureText(that.data.uname); //获取字体的宽度
    let rpx = 1;
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375; //适配手机

      },
    })
    ctx.drawImage(this.data.imgUrl, 0, 0, 300 * rpx, 460 * rpx);
        // 绘制行业文字
        ctx.setFontSize(20 * rpx);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('center');
        ctx.fillText(that.data.upost,60 * rpx,30* rpx); // 参数：文本内容，x，y
        // 绘制名字文字
        ctx.setFontSize(40 * rpx);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('center');
        ctx.fillText(that.data.uname, 150 * rpx, 80 * rpx); 
        //  绘制联系电话
        ctx.setFontSize(20 * rpx);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left')
        ctx.fillText(that.data.ucompany, 80 * rpx, 120 * rpx);
        ctx.draw(); // 将内容添加到canvas上
  },

  /* 保存图片 */
  saveImg() {
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: (res) => {
        wx.hideLoading();
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功！',
            })
          }
        })
      }
    });
  },

  /* 取消保存 */
  closeDialog() {
    wx.showToast({
      title: '已取消保存！',
    });
    this.setData({
      isHidde: true,
    });
    this.resetCanvas();
  },

  /* 重置图片模板内容 */
  resetCanvas() {
    this.setData({
      hiddeButton: false,
    });
    this.getcanvas();
  },


})
