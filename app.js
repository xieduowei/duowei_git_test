/**
 * Created by jiewei on 2017/3/19.
 */
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path')
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// var partials = require('express-partials');
// app.set('x-powered-by', false);
// app.use(partials());
app.listen('8080',function () {
    console.log(1)
});


app.get('/',function (req,res) {



    res.render('index.ejs',{})
})
app.get('/query',function (req,res) {
    request.get('http://www.qiushibaike.com/')
        .end(function (err,data) {
            // console.log(res.text);
            const $ = cheerio.load(data.text);
            var obj= {}
            $('.article .content span').each(function (i,item) {
                // console.log($(this).text())
                // console.log('--------------')
                var key = new Date().getTime();
                obj[key+i] = $(this).text()

            })
            res.send(obj)

        })
})

