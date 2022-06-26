/*
    현재 만들고 있는 파일을 main 파일 또는 main 어플리케이션이라고 한다.
    우리가 어떤 프로젝트를 만들 때 규모가 커지면 파일을 나누어야 하는데
    이때 누구를 실행시켜야지 어플리케이션이 동작할 수 있는가 라고 하는
    최초의 진입점이라고 할 수 있는 그런 어플리케이션이 필요한데
    이러한 어플리케이션을 main 어플리케이션이라고 한다.
    app.js는 express에서 권장하는 메인 어플리케이션 이름이다.
*/
var express = require('express');

// post로 사용자가 요청을 했을 때 request안에는 body라는 객체가 존재하지 않는다.
// 밑의 코드를 추가하고 app.use(bodyParser.urlencoded({ extended: false })); 이 코드도 추가한다.
// 이렇게되면 bodyParser가 body라는 객체를 추가해줌으로써 코드가 실행된다.
// name의 값으로 들어온 데이터들을 body객체의 프로퍼티로 넣어준다.
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true;

/*
    template 엔진을 express와 결합시킬 때
    template 엔진의 구체적인 제품 jade를 설치하고, 밑의 설정을 해주었다.
    그리고 res.render을 통해 화면에 보여주었다.
    데이터를 주입하고싶을 땐 객체를 정의해서 프로퍼티값으로 넣어준다.
    이러한 내용은 구글에 jade template engine으로 검색해면 된다.
*/
app.set('view engine', 'jade');
app.set('views', './views');

// 밑의 코드는 덩어리로 생각하자. public이라는 디렉토리를 정적인 파일이 위치하는 디렉토리로 하겠다.
// 정적인 파일이 위치할 디렉토리를 지정하는 코드이며, 그 디렉토리는 public이다.
// url의 뒤에다가 /karina.jpg만 쳐도 카리나 이미지를 읽어낸다. 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/form', function (req, res) {
    res.render('form');
})

app.get('/form_receiver', function (req, res) {
    res.send(req.query.title + ', ' +  req.query.description);
})

/*
    url의 규정상 일정 길이가 넘어가면 데이터를 버린다. get방식의 경우 url에 내용들이 담겨있기 때문에 
    대량의 데이터를 보낼 땐 get방식이 아니라 post 방식을 사용해야한다. 또한, post방식도 안전한건 아니지만
    id와 pw와 같은 정보를 입력할 때도 get방식이 아니라 post방식으로 보낸다.
*/
app.post('/form_receiver', function (req, res) {
    res.send(req.body.title + ", " + req.body.description);
})

app.get('/topic', function (req, res) {
    var topics = ['javascript is...', 'node.js is...', 'express is...'];
    var output = `
        <a href="/topic?id=0">javascript</a><br>
        <a href="/topic?id=1">node.js</a><br>
        <a href="/topic?id=2">express</a><br><br>
        ${topics[req.query.id]}
    `
    res.send(output);
})
/*
    위의 코드처럼 /topic/id=? 이런식으로 접근하는 것이 아니라 /topic/? 이런식으로 접근하는 방식을 시멘틱 웹이라고 한다.
*/


// parameter 접근 방식
app.get('/topic/:id', function (req, res) {
    var topics = ['javascript is...', 'node.js is...', 'express is...'];
    var output = `
        <a href="/topic/0">javascript</a><br>
        <a href="/topic/1">node.js</a><br>
        <a href="/topic/2">express</a><br><br>
        ${topics[req.params.id]}
    `
    res.send(output);
})

app.get('/router', function (req, res) {
    res.send('Hello Router, <img src="/karina.jpg"/>')
})

app.get('/template', function (req,res) {
    res.render('temp', {time:Date(), _title:'Jade'});    
})

/*
    사용자가 홈페이지로 접속했을 때 홈페이지에 접속했다라는걸 화면에 보여주고싶을 때 get함수 사용
    post 방식도 있고, 우리가 url을 통해 홈페이지에 접속하는 것은 get방식임. get방식으로 접속한 사용자를 받기 위해서는
    get함수를 사용해야함.
    링크를 통해 들어가는 것은 get방식
*/
app.get('/', function (req, res) {
    res.send('Hello homepage');
});


/*
    사용자가 홈에 접속했을 때 두번째 인자로 전달한 함수가 실행되도록 약속되어있다.
    함수를 실행시키면 첫번째 매개변수의 값으로 (사용자의 요청한 것과 관련된 정보)를 담고있는 request 객체를 전달하고있고,
    두번째 매개변수의 값으로 (사용자가 요청한 정보에 대해서 응답을 할 수 있는) 여러가지 방법을 담고있는 응답에 대한 객체를 전달해주도록 약속되어있다.
*/

app.get('/login', function (req, res) {
    res.send('<h1>login please</h1>');
});

/*
    경로를 통해 어떤 것이 실행될 것인가 라고 하는 것을 결정하는 연결해주는 역할을 하는 것이 get이라는 메소드이다.
    get이라는 메소드를 우리는 라우터라고 부른다. get이 하는 일을 라우팅이라고 하고 뜻은 길을 찾는다.
    get은 (사용자의 요청)과 (요청에 대한 처리인 콘트롤러)를 중계하는 역할이다.

*/

app.listen(3000, function () {
    console.log('Connected 3000 port!');    
})

/*
    우리가 어플리케이션을 제어하기 위해서는 익스프레스 모듈을 통해서 애플리케이션이라는 객체를 만들어줘야 한다.
    가져온 express 모듈은 함수이기 때문에 위의 코드 처럼 express() 함수를 실행하면 함수는 애플리케이션이라는 것을 리턴하고
    우리는 이 애플리케이션을 이용해서 만들어 나가면 된다. 이것은 express를 만든 사람의 약속이다.
    리스닝이 성공하면 콜백 함수가 실행된다.
*/

/*
  summary
    정적인 파일을 서비스 하고싶다면 위에 app.use(express.static('public')) 코드 필요
    public이라는 디렉토리에 정적인 파일을 갖다 놓으면 그 정적인 파일을 사용자에게 서비스할 수 있다.
    그리고 정적인 파일은 우리가 내용을 바꾸더라도 서버를 껐다 킬 필요없이
    홈페이지를 새로고침하면 바로 수정되어있다.
    정적인 파일의 경우 요청이 들어올 때마다 노드가 잡아서 던져준다. 그래서 껏다 킬 필요가 없다.
*/

/*
    html파일의 경우 이미 화면에 표시된 코드를 동적으로 바꿀 수 있는 능력이 존재하지 않기 때문에
    이런 경우, 우리가 동적으로 웹페이지를 생성할 수 있는 그런 기능을 가질 필요가 있다.
*/