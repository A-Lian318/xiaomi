const gulp = require("gulp");
//先引入
/* 再编写任务 */
gulp.task("hello",function(){
    console.log("hello world");    
})
/* gulp.src()找到源文件路径 
gulp.dest()找打目的文件路径
pipe（） 程序管道
*/
gulp.task("copy-html",function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());//任务自动刷新
}
)
/* 
拷贝静态文件 图片
*/
gulp.task("images",function(){
   /*  return gulp.src("images/*.jpg")
    .pipe(gulp.dest("dist/images")); */
   /*  return gulp.src("images/*.{jpg,png}")
    .pipe(gulp.dest("dist/images")); */
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());//任务自动刷新
})
/* 
拷贝多个文件到一个目录
*/
gulp.task("data",function(){
    return gulp.src(["json/*.json","xml/*.xml","!xml/4.xml"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());//任务自动刷新

})
/* 一次性执行多个任务的操作 */
gulp.task("build",["copy-html","images","data"],function(){
    console.log("任务执行完毕");
})
/* 监听 如果监听文件有改变，会自动去执行对应的任务，更新数据 */

gulp.task("watch",function(){
    // 第一个参数 监听文件的路径
// 第二个参数 监听要执行的任务
    gulp.watch("index.html",["copy-html"]);
    gulp.watch("images/**/*",["images"]);
    gulp.watch("json/*.json","xml/*.xml","!xml/4.xml",["data"]);

})
/* 给gulp添加插件
    cnpm install 插件名字 --save-dev
    cnpm i 插件名字 -D 简写
    通过 require()引入文件
    上官网查阅插件用法
    开发版本 index.css
    上线版本 index.min.css
*/
/*  gulp-connect 启动一个服务器 */
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",//设置根目录
        port:8888,
        livereload:true //启动实时刷新
    })

})
/* 同时启动监听和服务 */
gulp.task("default",["watch","server"]);