<template>
  <div class="daily">
    <div class="daily-menu">
      <div class="daily-menu-item" :class="{on: type === 'recommend'}" @click="handleToRecommend">每日推荐</div>
      <div class="daily-menu-item" :class="{on: type === 'daily'}" @click="showThemes = !showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="(item, index) in themes" :key="index">
          <a :class="{on: item.id === themeId && type === 'daily'}"
              @click="handleToTheme(item.id)"
          >{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list" ref="list">
      <template v-if="type === 'recommend'">
        <div v-for="(list, index) in recommendList" :key="index">
          <div class="daily-date">{{formatDay(list.date)}}</div>
          <Item v-for="(item, _index) in list.stories" 
                :key="_index"
                :class="{on: articalId == item.id}"
                :data="item"
                @click.native="handleClick(item.id)"
          ></Item>
        </div>
      </template>
      <template v-if="type === 'daily'">
        <Item v-for="item in list" :key="item.id" :data="item" @click.native="handleClick(item.id)"></Item>
      </template>
    </div>
    <daily-artical :id="articalId"></daily-artical>
  </div>
</template>

<script>
  import Item from './item.vue'
  import dailyArtical from './dailyArtical.vue'
  import $ from '@/util/http.js'
  export default {
    data(){
      return {
        themes: [],
        showThemes: false,
        type: 'recommend',
        themeId: 0,
        list:[],
        dailyTime: 0,
        recommendList: [],
        articalId: 0
      }
    },
    components: {
      Item,
      dailyArtical
    },
    mounted() {
      this.getThemes();
      this.handleToRecommend();

      const $list = this.$refs.list;
      $list.addEventListener('scroll', () => {
        // 在主题日报或正在加载推荐列表时停止操作
        if(this.type === 'daily' || this.isLoading) return;

        // 已经滚动的距离加页面的高度等于整个内容区域的高度时，视为接触底部
        if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight){
          // 时间相对减少一天
          this.dailyTime -= 86400000;
          this.getRecommendList();
        }
      })
    },
    methods: {
      handleClick(id){
        this.articalId = id
      },
      // 转换为带汉字的日
      formatDay(date){
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        if(month.substr(0, 1) ==='0'){
          month = month.substr(1,1)
        }

        if(day.substr(0, 1) === '0'){
          day = day.substr(1,1)
        }

        return `${month}月${day}日`
      },
      getThemes(){
        $.ajax.get('themes').then( res => {
          this.themes = res.others
        })
      },
      handleToTheme(id){
        this.type = 'daily';
        this.themeId = id;

        this.list = []
        $.ajax.get('theme/'+id).then( res => {
          this.list = res.stories.filter( item => item.type !== 1)
        })
      },
      handleToRecommend(){
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = $.getTodayTime();
        
        this.getRecommendList();
      },
      getRecommendList(){
        this.isLoading = true;
        const prevDay = $.prevDay(this.dailyTime + 86400000);
        console.log(this.dailyTime)
        $.ajax.get('news/before/'+prevDay).then( res => {
          this.recommendList.push(res);
          this.isLoading = false;

          if(this.recommendList.length){
            console.log(this.recommendList)
            this.articalId = this.recommendList[0].stories[0].id
          }
        })
      }
    }
  }
</script>

<style>
html, body{
  margin:0;
  padding:0;
  height: 100%;
  color: #657180;
  font-size: 16px;
}
.daily-menu{
  width: 150px;
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  overflow: auto;
  background: #f5f7f9;
}
.daily-menu-item{
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  cursor: pointer;
  border-right: 2px solid transparent;
  transition: all .3s ease-in-out;
}
.daily-menu-item:hover{
  background: #e3e8ee;
}
.daily-menu-item.on{
  border-right: 2px solid #3399ff;
}
.daily-list{
  width: 300px;
  position: fixed;
  top:0;
  bottom:0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-item{
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all .3s ease-in-out;
}
.daily-item:hover,
.daily-item.on{
  background: #e3e8ee
}

.dailu-artical{
  margin-left: 450px;
  padding: 20px;
}
.daily-menu ul{
  list-style: none;
  padding:0;
}
.daily-menu ul li a{
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 5px 0;
  cursor: pointer;
}
.daily-menu ul li a:hover,
.daily-menu ul li a.on{
  color: #3399ff
}
</style>
