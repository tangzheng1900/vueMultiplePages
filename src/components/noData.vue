<template>
    <!-- 页面头部 -->
    <div class="no_data_box" >
    	<img src="../statics/images/system/no_data.png" class="no_data" />
    	<p>空无一物</p>
    </div>
    
</template>

<script>

    export default {
        name : 'noData',
        
       
        data : ()=>({
           
        }),
        methods:{
           
        },
        created(){
           
        }
    }
</script>

<style lang="less" scoped>
	.no_data_box{
		margin-top:2rem;
		width:100%;
		.no_data{
		   	display:block;
		   	width:20%;
		   	margin:0 auto;
	   }
	   p{
	   	font-size:0.8rem;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:1.1rem;
		margin-top:0.5rem;
		text-align: center;
	   }
	}
   
</style>