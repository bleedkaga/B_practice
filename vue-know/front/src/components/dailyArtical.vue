<template>
    <div class="daily-artical">
        <div class="daily-artical-title">
            {{data.title}}
        </div>
        <div class="daily-artical-content" v-html="data.body"></div>
        <div class="daily-comments" v-if="comments.length">
            <span class="comment-length">评论（{{comments.length}})</span>
            <div class="daily-comment" v-for="comment in comments" :key="comment.id">
                <div class="daily-comment-avatar">
                    <img :src="comment.avatar" alt="">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">
                        {{comment.author}}
                    </div>
                    <div class="daily-comment-time" v-time="comment.time">

                    </div>
                    <div class="daily-comment-text">
                        {{comment.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from '@/util/http.js'
    import Time from '@/directives/time.js'
    export default {
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        directives: {
            Time
        },
        data(){
            return {
                data: {},
                comments: []
            }
        },
        methods: {
            getArtical(){
                $.ajax.get('news/'+this.id).then( res => {
                    // 将文章中的图片地址替换为代理的地址
                    // res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath +'http')
                    // res.body = res.body.replace(/src="https/g, 'src="' + $.imgPath +'https')

                    this.data = res;
                    window.scrollTo(0,0)
                    this.getComments();
                })
            },
            getComments(){
                this.comments = [];
                $.ajax.get('story/'+this.id +'/short-comments').then( res => {
                    this.comments = res.comments.map( comment => {
                        comment.avatar = $.imgPath + comment.avatar;

                        return comment
                    })
                })
            }
        },
        watch: {
            id(val){
                if(val) this.getArtical()
            }
        }
    }
</script>

<style>
.daily-artical{
    margin-left: 450px;
    padding: 20px;
}
.daily-artical-title{
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0
}
.view-more a{
    cursor: pointer;
    background: #f5f7f9;
    text-align: center;
    color: inherit;
    text-decoration: none;
    padding: 4px 10px;
    border-radius: 3px;
}
.view-more{
    text-align: center
}
.view-more a:hover{
    background: #3399ff;
    color: white
}
.daily-artical-content{
    text-align: justify
}
.content-image{
    vertical-align: top;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

/* comments */
.daily-comments{
    margin: 10px 0
}
.comment-length{
    display: block;
    text-align: left
}

.daily-comments span{
    display: block;
    margin:10px 0;
    font-size: 20px;
}
.daily-comment{
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e3e8ee;
}
.daily-comment-avatar{
    width: 50px;
    height: 50px;
    float: left;
}
.daily-comment-avatar img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.daily-comment-content{
    margin-left: 65px;
    text-align: left
}
.daily-comment-time{
    color: #9ea7b4;
    font-size: 14px;
    margin-top: 5px;
}
.daily-comment-text{
    margin-top: 10px;
}

</style>

