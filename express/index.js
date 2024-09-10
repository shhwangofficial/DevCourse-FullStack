// index.js

import express from 'express'; 
const app = express(); 
const port = 3000;

let db = new Map();
let id = 1;
db.set(id++, {channelTitle: "TEO", sub : 1000000, videonum: 300});
db.set(id++, {channelTitle: "KBS", sub : 2000000, videonum: 400});

app.get('/youtubers', function(req, res) {
	const youtubers = {};

    if (db.size) { // Map 객체가 텅빈 경우를 위한 예외처리는 이렇게
	db.forEach((youtuber, key)=> youtubers[key] = youtuber);
	res.json(
		youtubers
	);
    } else {
        res.status(404).json({
            message : "조회할 유튜버 없음"
        });
    }
})

app.get('/youtubers/:id', function(req, res) {
	const param = req.params;
	let id = Number(param.id);
    let youtuber = db.get(id);

    if (youtuber){
        res.json(youtuber);
    } else {
        res.status(404).json({
            message : "조회할 유튜버 없음"
        });
    }
})

app.use(express.json());
app.post('/youtubers', (req, res) => {
    if (req.body.channelTitle) { // post 시 channelTitle 누락하는 경우 처리
       db.set(id++, req.body);
        res.status(201).json(req.body); // 등록 성공 코드는 201
    } else {
        res.status(400).json({ // req의 데이터 부족 코드는 400
            message: "channelTitle이 필요합니다."
        })
    }
	
});

app.delete('/youtubers/:id', (req, res)=>{
	const param = req.params;
	let id = Number(param.id);
	const youtuber = db.get(id);

	if ( youtuber == undefined ){
		res.status(404).json({
			message: "가입된 유튜버가 아닙니다."
		});
	}
	else {
		res.json({
			message: `${youtuber.channelTitle}님, 안녕히가십시오`
		});
	
		db.delete(n);
	}
});

app.delete('/youtubers', (req, res)=>{
	if (db.size >= 1) {
		db.clear();
		res.send('전체 삭제 되었습니다.');
	}
	else{
		res.status(404).send('삭제할 유튜버가 없습니다.');
	}
});

app.put('/youtubers/:id', (req, res)=> {
	const param = req.params;
	let id = Number(param.id);
	const youtuber = db.get(id);

	if ( youtuber == undefined ){
		res.status(404).json({
			message: "가입된 유튜버가 아닙니다."
		});
	}
	else {
		youtuber.channelTitle = req.body.channelTitle;
		db.set(id, youtuber);
		res.json({
			message: `${youtuber.channelTitle}님 수정되었습니다.`
		});	
	}
})


// 서버를 지정된 포트에서 실행시킵니다.
app.listen(port);
