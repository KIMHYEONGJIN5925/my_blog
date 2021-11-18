const express = require('express');
const Boards = require("../schemas/Boards"); // 상위의 스키마의 boards에서 가져옴

const router = express.Router();

router.get("/boards", async (req, res, next) => { //api의 boards 라고 호출하면 아래를 가져온다
    try {
        const { boardId } = req.query;
        const boards = await Boards.find({ boardId }).sort("-boardId"); // 모든 boardId를 가져오고 내림차순 정렬
        res.json({ boards: boards }); // josn 형식으로 내려줄 것
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/boards/:boardId", async (req, res) => { // api에 boards의 boardId값
    const { boardId } = req.params; // req.params 에서 값 가져옴
    boards = await Boards.findOne({ boardId: boardId }); // 여러개 중 특정 하나 클릭 했을 때 상세 페이지로 넘어감
    res.json({ detail: boards }); // detail 이라는 key 에 boards 담음
});

// 글 등록
router.post('/boards', async (req, res) => {
    const { boardId, title, writer, content, password } = req.body; // regDate 는 default 로 넣어둠

    isExist = await Goods.find({ goodsId });
    if (isExist.length == 0) {
        await Boards.create({ boardId, title, writer, content, password });
    }
    res.send({ result: "success" });
});

module.exports = router;
