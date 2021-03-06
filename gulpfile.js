/* 
第三方插件
gulp-scss  gulp-sass
gulp-minify-scss
gulp-rename
*/
/* 
    把.scss文件 编译css文件 压缩 min.css
*/
const gulp = require("gulp");
const scss = require('gulp-sass')(require('sass'));
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
gulp.task("scss", function() {
        return gulp.src("stylesheet/index.scss")
            .pipe(scss())
            .pipe(gulp.dest("dist/css"))
            .pipe(minifyCSS())
            .pipe(rename("index.min.css"))
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload()); //实时刷新
    })
    /* 批量处理scss文件*/
gulp.task("scssAll", function() {
        return gulp.src("stylesheet/*.scss")
            .pipe(scss())
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload()); //实时刷新
    })
    //处理js文件
gulp.task("scripts", function() {
        return gulp.src(["*.js", "!gulpfile.js"])
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload()); //实时刷新
    })
    //处理html

gulp.task("copy-html", function() {
        return gulp.src("*.html")
            .pipe(gulp.dest("dist"))
            .pipe(connect.reload()); //实时刷新

    })
    //处理数据
gulp.task("data", function() {
        return gulp.src(["*.json", "!package.json"])
            .pipe(gulp.dest("dist/data"))
            .pipe(connect.reload()); //实时刷新
    })
    //处理图片
gulp.task("images", function() {
        return gulp.src("images/**/*")
            .pipe(gulp.dest("dist/images"))
            .pipe(connect.reload()); //实时刷新
    })
    //一次性执行多任务
gulp.task("build", ["scss", "copy-html", "scripts", "images", "data", "scssAll"], function() {
        console.log("项目建立成功");
    })
    //建立监听
gulp.task("watch", function() {
        gulp.watch("stylesheet/index.scss", ["scss"]);
        gulp.watch("stylesheet/*.scss", ["scssAll"]);
        gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
        gulp.watch("*.html", ["copy-html"]);
        gulp.watch(["*.json", "!package.json"], ["data"]);
        gulp.watch("images/**/*", ["images"]);

    })
    //启动服务器
    //const connect = require("gulp-connect");
gulp.task("server", function() {
    connect.server({
        root: "dist", //设置根目录
        port: 8888, //0 -65535
        livereload: true
    })
})

//启动默认任务
gulp.task("default", ["watch", "server"]);