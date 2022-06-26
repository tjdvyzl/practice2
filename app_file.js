var express = require('express');
var app = express(); // express라는 변수에 담겨있는 함수를 실행하면 애플리케이션 객체를 리턴한다.
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true; // jade파일 줄바꿈 해줌

app.set('views', './views_file'); // 템플릿 파일들은 views_file에다가 두겠다 라고 설정해줌.
app.set('view engine', 'jade'); // 어떤 템플릿 엔진을 사용할 것인지 설정, jade로 사용하겠다 라는 코드

app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
});

app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    // data 디렉토리 안에 title이라는 파일 이름으로 description의 내용인 파일을 추가하겠다.
    fs.writeFile('data/' + title, description, function(err){
        if(err) {
            res.status(500).send('Internal Server Error');
        }
        // callback 함수가 실행된 이후에 res를 쓸 수 있기 때문에 콜백 함수 안에 넣어야한다.
        res.redirect('/topic/' + title);
    });
});

// app.get('/topic', function (req, res) {
//     fs.readdir('data', function (err, files) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', { topics: files });
//     })
// })

// app.get('/topic/:id', function (req, res) {
//     var id = req.params.id;
//     fs.readdir('data', function (err, files) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }

//         fs.readFile('data/' + id, 'utf8', function (err, data) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', { topics: files, title:id, description:data });
//         })
//     })
// })

// 위의 두 get 코드를 중복처리하여 하나로 합친 코드임
app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        var id = req.params.id;

        // js에서 null값은 false와 등값임.
        if (id) {
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            })
        }
        else {
             res.render('view', { topics: files, title:"Welcome To Page", description:"Practice2" });
        }
    })
})

// 우리는 애플리케이션 객체가 갖고있는 메소드중에서 listen이라는 것을 통해서 애플리케이션이 특정 포트를 리스닝 하도록 한다.
// 3000번 포트에 연결되었다면 콜백함수가 실행됨
app.listen(3000, function () {
    console.log('Connected, 3000 port');
})

/*
    supervisor app_file.js
*/