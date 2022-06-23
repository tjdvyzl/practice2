const http = require('http'); // 웹서버가 되기 위해서는 nodejs가 제공하는 기능들 중에 http라는 모듈을 사용해야한다.

/*
    어떤 웹서버를 만들고 그 웹서버를 a라는 포트를 바라보게 하면
    사용자의 요청은 이 포트를 향해 들어올 수 있게된다.
*/

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


/*
    listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    위 내용은 밑의 내용과 같다.
    createServer로 서버를 만들고, 그렇게 만들어진 서버가 어떤 특정한 포트를 바라보게 하는 것이다.(1337)
    그리고 사용자가 우리 서버를 접속할 때
    어떤 IP를 타고 들어온 사용자를 수용할 것인지 적는 것이다. --> listen
    그리고 listen(비동기)이 완료되었을 때 안에있는 callback 함수가 실행되도록 약속되어있다.

    웹서버가 특정 포트를 바라보게 하고 있다.
    (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }
    사용자가 특정 포트를 통해 들어왔을 때 어떤 내용을 출력할 것인가 라는 내용은 위의 함수이다.
    이 함수는 두개의 인자를 받고, 첫번째 인자는 request, 두번째 인자는 response 이다. 요청과 응답
    
    
*/
var server = http.createServer();
server.listen();
