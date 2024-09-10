import express from 'express'; // Express 모듈을 가져옵니다.
const app = express(); // Express 애플리케이션을 만듭니다.
const port = 3000; // 서버가 실행될 포트를 설정합니다.

const fruits = [  // json array
	{ id : 1, name: 'apple'},
	{ id : 2, name: 'orange'},
	{ id : 3, name: 'strawberry'},
];

app.get('/fruits', (req, res) =>{
	res.json(fruits);
});

app.get('/fruits/:id', (req, res) => {
	let id = req.params.id;

	let fruit = fruits.find((fruit)=> fruit.id == id);
	
	if (fruit){
		res.json(fruit); 
	}
	else {
		res.status(404).json({
			message: "찾는 id의 과일 없음"
		});
	}
});

// 서버를 지정된 포트에서 실행시킵니다.
app.listen(port);
