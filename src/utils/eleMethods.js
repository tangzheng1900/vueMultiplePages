/**
* 善行webapp常用方法
* @module 善行webapp常用方法
*/

/** 
* 布局方法
* @class 布局方法
*/

/**
 * 使用方式：
<div class="img_box" ref="img_box">//ref="img_box"必写，用以获取父框宽高
	//:ref="'filesha1'"此处为获取图片元素，sha1为idx
	<img @load="imgLoad(index,'img_box','oimg')" :ref="'oimg'+index" v-lazy="{src:getImg(banners && banners[0]?banners[0].file:''),error:err_img2}" />
</div>
需配合css使用：
.box{
	width: 100%;
    height:100%;
    position: relative;
    overflow: hidden;
    .child{
        position: absolute;
        top: 50%;
        left: 50%;
        height:100%;
        transform: translate3d(-50%,-50%,0);
    }
}

 * @method imgLoad
 * @name 图片居中自适应
 */


function imgLoad (idx,ele,child_name){
    let obj = this.$refs[child_name+idx][0] || this.$refs[child_name+idx];
    let father_ele=this.$refs[ele][0] || this.$refs[ele];
    let father_ele_w=father_ele.offsetWidth;
    let father_ele_h=father_ele.offsetHeight;
    let w = obj.width;
    let h = obj.height;
    // console.log('w:'+w+',h:'+h+',f_h:'+father_ele_h+',f_w:'+father_ele_w)
    if(w > h){
        let a=father_ele_w/w;
        if(a<1){
            obj.style.height='100%'
        }else{
            obj.style.height = a*100+'%';
        }
        obj.style.width = 'auto';
    }else if(w<h){
        let a=father_ele_h/h;
        if(a<1){
            obj.style.width = '100%';
        }else{
            obj.style.width = a*100+'%';
        }
        obj.style.height = 'auto';
    }else{
        let a=father_ele_h/h;
        obj.style.width = a*100+'%';
        obj.style.height = 'auto';
    }
}
export{
	imgLoad
}
