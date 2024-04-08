<template>
  <div style="text-align: center;width: 600px;">
    <el-form label-width="160px">
      <el-form-item label="网址：">
        <el-input v-model="httpSinput" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="名字截取：">
        <el-input v-model="nameinput" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="章节内容底部：">
        <el-input v-model="endinput" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="inroot" size="mini">访问</el-button>
      </el-form-item>
      <el-form-item label="获取章节地址：">
        {{this.pageShow[0]}}
      </el-form-item>
      <el-form-item label="章节内容标题截取1：">
        <el-input v-model="titleinput1" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="章节内容标题截取2：">
        <el-input v-model="titleinput2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="章节内容截取头部：">
        <el-input v-model="contantinput1" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="章节内容截取尾部：">
        <el-input v-model="contantinput2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="verify('干')" size="mini">校验</el-button>
        <el-button @click="finsh(0)" size="mini" style="margin-left: 40px;">爬取</el-button>
      </el-form-item>
      <!-- <el-form-item label="查看单章结果：">
        {{showContant}}
      </el-form-item> -->
    </el-form>
  </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      httpSinput: '/137_137479/',
      nameinput: '第50章 张家',
      endinput: '</dl>',
      pageShow: [],
      titleinput1: '<h1>',
      titleinput2: '</h1>',
      contantinput1: '<div id="content" deep="3">',
      contantinput2: '无尽的昏迷过后，时宇猛地从床上起身',
      showContant: '',
      nnnumber: 0,
    }
  },
  
  methods: {
    // 访问网址
    inroot() {
      let url = "/api" + this.httpSinput
      axios({
        method: "get",
        url: url,
      }).then((result) => {
        if (result.status == 200) {
          this.$message.success("访问成功");
          this.pageShow = []
          let data = result.data
          let startNum = data.indexOf(this.nameinput)
          // 字符串截取
          let c = data.substring(startNum)
          let endNum = c.indexOf(this.endinput)
          let a = c.substring(0,endNum)
          console.log(a)
          // 截取之后转变成数组
          let arr = a.split(this.httpSinput).join('').split('<dd>')
          console.log(arr)
          for (let a in arr) {
            if (arr[a].indexOf('href=') != -1) {
              this.pageShow.push(this.httpSinput + arr[a].substring(arr[a].indexOf('href=\"') + 6,arr[a].indexOf('.html')) + '.html')
            }
          }
          console.log(this.pageShow)
        } else {
          this.$message.error("更换地址吧~");
        }
      });
    },
    // 校验章节内容截取的是否正确
    verify(ur) {
      let url
      if (ur && ur != '干') {
        url = "/api" + ur
      } else {
        url = "/api" + this.pageShow[0]
      }
      axios({
        method: "get",
        url: url,
      }).then((result) => {
        if (result.status == 200) {
          let data = result.data

          // 截取内容
          let startNum = data.indexOf(this.contantinput1) + this.contantinput1.length
          let c = data.substring(startNum)
          // console.log(c)
          let endNum = c.indexOf(this.contantinput2)
          // console.log(endNum)
          // let a = c.substring(0,endNum).replaceAll('&nbsp;'," ").replaceAll("<br>", "\r").replaceAll("<p>", "\r").replaceAll("</P>", " ")
          let a = c.substring(0,endNum).replaceAll("<p>", "&nbsp;&nbsp;&nbsp;&nbsp;").replaceAll("</P>", "</p>").replaceAll("</p>", "<br><br>").replaceAll('&nbsp;'," ").
          replaceAll("<br>", "\r").replaceAll("<br/>", "\r").replaceAll("<br />", "\r")
          
          // let a = c.substring(0,endNum).replaceAll('\n'," ").replaceAll('\r'," ")
          // .replaceAll('</p>', " ")
          // .replaceAll('<p class="content_detail">', " ")
          // .replaceAll("<br/>", "\r")
          // .replaceAll("<br>", "")

          // 截取标题
          let b1 = data.indexOf(this.titleinput1) + 4
          let b = data.substring(b1)
          let b2 = b.indexOf(this.titleinput2)
          let b3 = b.substring(0,b2)
          let endC = b3 + "\r" + a
          // console.log(endC)
          // // let zuizhong = endC.substring(endC.indexOf('"title">') + 8,endC.indexOf('<a')).replaceAll("</div>", "")
          // let zuizhong = endC.replaceAll('<p class="content_detail">', "")
          // console.log(zuizhong)
          if (ur && ur != '干') {
            this.showContant =  this.showContant + endC
            this.nnnumber = this.nnnumber + 1
            this.finsh(this.nnnumber)
          } else {
            this.showContant = endC
          }
        } else {
          console.log(123123)
          this.$message.error("网址访问不了");
        }
      }).catch(err => {
        console.log('报错')
        console.log(err)
        console.log(this.showContant)
      });
    },
    // 获取最后结果
    finsh(num) {
      this.nnnumber = num
      let a = this.pageShow[this.nnnumber]
      if (!this.pageShow[this.nnnumber]) {
        console.log(this.showContant)
      }
      this.verify(a)
    },

  }
}
</script>
