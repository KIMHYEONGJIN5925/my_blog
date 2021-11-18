const express = require('express');
const Boards = require("../schemas/boards"); // 상위의 스키마의 boards에서 가져옴

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

router.get("/boards/:boardId", async (req, res) => {
    const { boardId } = req.params;
    boards = await Boards.findOne({ boardId: boardId });
    res.json({ detail: boards });
});

module.exports = router;
