const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas');
connect();

// body편하게 쓰기 위한 미들웨어
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));

/*위에 한줄이 대신함*/
// app.get('/board/list', (req, res) => {
//     res.send('게시글 목록 페이지')
// })

// app.get('/board/detail', (req, res) => {
//     res.send('게시글 상세 페이지')
// })

// boards route 생성
const boardRouter = require("./routers/boards");
app.use("/api", [boardRouter]); // api 하위 라우터에서 쓸 것

app.use((req, res, next) => {
    // console.log(req);
    next();
});

// ejs 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 메인화면
app.get('/home', (req, res) => {
    res.render('index');
})

// 게시글 등록 화면
app.get('/insertBoard', (req, res) => { // test 라우터로 들어오는 경우
    // let name = req.query.name;   해당 쿼리의 이름을 가져오는 처리 *body로 넘기는 방법이 있고, query(?=name=bob)로 넘기는 방법이 있음
    res.render('insertBoard'); 
})

// 게시글 상세조회 화면
app.get('/detail', (req, res) => {
    res.render('detail');
})

// 게시글 수정/삭제 화면
app.get('/updateBoard', (req, res) => {
    res.render('updateBoard' );
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})