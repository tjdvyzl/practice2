const fs = require('fs');

console.log(1);
var data = fs.readFileSync('data.txt', { encoding: 'utf8' });
console.log(data);

console.log('----------------');
console.log(2);
fs.readFile('data.txt', { encoding: 'utf8' }, function (err, data) {
    console.log(3);
    console.log(data);
})
console.log(4);

/*
    빨래 설거지 청소
    sync 
        빨래 1시간 -> 설거지 1시간 -> 청소 1시간  총 3시간
    async
        빨래 업체에 연락, 설거지 업체에 연락, 청소 업체에 연락 3분
        먼저 끝난 업체에서 연락이 온다. 예를 들어 설거지 업체에서 연락오고 빨래 업체에서 연락오고
        훨씬 빠르다. 하지만 뭐가 먼저 될지 알 수 없다. 순서가 상관없다면 비동기 형식으로 하는 것이 낫다.
        
    이메일의 경우,
    글을 하나 쓰고 만 명에게 이메일을 보낼 때, 버튼 한번에 1초 즉, 만 초가 걸린다.
    동기 형식일 땐 한 명 보내고 한 명 보내고 이런식으로 만초가 걸렸겟지만
    비동기 형식일 땐 버튼 한번으로 만 명 전부에게 보내지도록 설정하는 것이다.
    a라는 사람에게 보내는 동안 b라는 사람에게도 이메일을 보내는 식으로
*/