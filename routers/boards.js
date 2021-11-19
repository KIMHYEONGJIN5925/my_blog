const express = require('express');
const Boards = require("../schemas/Boards"); // 상위의 스키마의 boards에서 가져옴

const router = express.Router();

// 게시글 목록 조회
router.get("/boards", async (req, res, next) => { //api의 boards 라고 호출하면 아래를 가져온다
    try {
        const { boardId } = req.query;
        //const { regDate } = req.query;
        const boards = await Boards.find({ boardId }).sort("-boardId"); // 모든 boardId를 가져오고 내림차순 정렬
        res.json({ boards: boards }); // josn 형식으로 내려줄 것
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// 게시글 상세조회
router.get("/boards/:boardId", async (req, res) => { // api에 boards의 boardId값
    const { boardId } = req.params; // req.params 에서 값 가져옴
    boards = await Boards.findOne({ boardId: boardId }); // 여러개 중 특정 하나 클릭 했을 때 상세 페이지로 넘어감
    res.json({ detail: boards }); // detail 이라는 key 에 boards 담음
});


// 게시글 등록
router.post('/boards/insert', async (req, res) => {

    const { title, writer, content, password  } = req.body; // 작성한 데이터 가져옴
    //console.log(title, regDate);

    // isExist = await Boards.find({ boardId });
   // if (isExist.length == 0) { // boardId가 없으면 (++ 되므로 계속 생김)
        await Boards.create({ title, writer, content, password  });
   // }
    res.send({ result: "success" });
});


// 게시글 수정 페이지에서 기존 내용 띄워줌
router.get("/updateBoard/:boardId", async (req, res) => { // api에 boards의 boardId값
    const { boardId } = req.params; // req.params 에서 값 가져옴
    boards = await Boards.findOne({ boardId: boardId }); // 여러개 중 특정 하나 클릭 했을 때 상세 페이지로 넘어감
    res.json({ detail: boards }); // detail 이라는 key 에 boards 담음
});


// 게시글 수정 (작성일은 처음 작성일이기 때문에 변경 안함)
router.patch("/boards/:boardId/update", async (req, res) => {
    const { boardId } = req.params;
    // const data = { title, writer, content } = req.body; 배열로 넣으려고 했는데 안됨
    const { title, writer, content  } = req.body;
    const { password } = req.body;

    // console.log(title, writer, content)

    const isIdInBoard = await Boards.find({ boardId });
    if (isIdInBoard.length > 0) { // boards에 같은 boardId가 있으면
        await Boards.updateOne({ boardId }, { $set: { title, writer, content, password } }); // goodsId가 같은 아이템을 찾아서 새로운 수량으로 바꿔줘라
    }

    res.send({ result: "success" });
})


// 게시글 삭제
router.delete("/boards/:boardId/delete", async (req, res) => {
    const { boardId } = req.params;

    const isIdInBoard = await Boards.find({ boardId });
    if (isIdInBoard.length > 0) {
        await Boards.deleteOne({ boardId });
    }
    res.send({ result: "success" });
});




module.exports = router;
