const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`${client.user.tag}에 로그인하였습니다.`);
});

//갱신 간격 (1000 - 1초)
const UpdateTime = 5000;

//기본 지급 돈
let wallet = 1000;

//캐캐오 주가변경 알고리즘
const kakao = 1000;
let kakaMove = 0;
let kakaoJusik = '주가 정보 불러오기에 실패하였습니다.';
let kakaoVa = '주가 정보 불러오기에 실패했습니다.';
let kakaoIfDownOrUp = 0;
let UpOrDownMessage = '주가 정보 불러오기에 실패했습니다.';
let MyHave = [''];
let myjusik_1 = undefined;

//구매감지
let sell = undefined;
		
//while (true){ 
	setTimeout(function () {
		//캐캐오 랜덤값 설정
		kakaoMove = Math.floor(Math.random() * 20) + 8;
		console.log('kakaoMove : '+kakaoMove);
		
		//오를까 내릴까 설정
		kakaoIfDownOrUp = Math.floor(Math.random() * 1 + 1);
		console.log(kakaoIfDownOrUp);
	}, UpdateTime);

	setTimeout(function () {
		if (kakaoIfDownOrUp == 3) {
			//주식값 오름
			kakaoJusik = kakao + kakaoMove;
			console.log('kakaoJusik : '+kakaoJusik);
			UpOrDownMessage = '▲ ';
		} else if (kakaoIfDownOrUp == 1) {
			//주식값 내림
			kakaoJusik = kakao - kakaoMove;
			console.log('kakaoJusik : '+kakaoJusik);
			UpOrDownMessage = '▼ ';
		}
	}, UpdateTime);

	//주가 변경 계산
	setTimeout(function () {
		kakaoVa = kakaoJusik - kakao;
		console.log('kakaoVa : '+kakaoVa);
	}, UpdateTime);
//}

client.on('messageCreate', (message) => {
	//시세확인
	if (message.content === '이코야 현재시세') {
		message.channel.send('```캐캐오 : ' + kakaoJusik + '이코 (' + UpOrDownMessage + kakaoVa + '이코)```');
	}
	
	//구매하기
	if (message.content === '이코야 구매 캐캐오') {
		message.channel.send('캐캐오의 현재 시세는 ' + kakaoJusik + '이코입니다.\n정말로 구매하시겠습니까?\n구매하시려면 **"이코야 구매 확인 캐캐오"**을 입력해주세요.');
	}
	
	//구매의사 재확인
	if (message.content === '이코야 구매 확인 캐캐오') {
		console.log('정상 입력');
		
		//구매의사 저장
		buy = '구매완료';
		console.log(sell);
		
		//지갑에서 돈 차감
		if (buy == '구매완료') {
			if (wallet >= kakaoJusik) {
				wallet = wallet - kakaoJusik;
				message.channel.send('구매가 완료되었습니다.\n' + kakaoJusik + '이코가 차감되어 현재 보유 금액은 ' + wallet + '이코 입니다.');
				
				//보유 주식 어레이 저장
				MyHave[MyHave.length] = ('캐캐오');
				myjusik_1 = ('캐캐오');
				console.log(MyHave)
			}
			else {
				//구매 실패
				message.channel.send('지갑에 돈이 부족하여 구매가 불가능합니다.');
			}
		}
	}
	
	//판매
	if (message.content === '이코야 판매 캐캐오') { 
		if (myjusik_1 == '캐캐오'){
			message.channel.send('정말 캐캐오를 판매하시겠습니까?\n판매를 한다면 ' + kakaoJusik + '이코가 지갑에 입금됩니다.\n캐캐오를 판매하실 것이라면 **"이코야 판매 확인 캐캐오를"** 입력해주세요.');
		}
		else {
			message.channel.send('캐캐오 주식을 보유하고 있지 않습니다.');
		}
	}
	
	if (message.content === '이코야 판매 확인 캐캐오') { 
		wallet = wallet + kakaoJusik;
		MyHave[MyHave.deleted] = ('2');
		message.channel.send('지갑에 ' + kakaoJusik + '이코가 입금되었습니다.\n현재 ' + wallet + '이코 보유중입니다.');
	}

	//지갑
	if (message.content === '이코야 지갑') { 
		message.channel.send('현재 보유중인 돈은 총 ' + wallet + '이코이고\n현재 보유하고 있는 주식은 ' + MyHave +' 입니다.');
	}
	
	if (!message.guild) return;
	if (message.author.bot) return;
});

// 디스코드 클라이언트 토큰 (유출금지 ㄹㅇ찐임)
client.login('OTIyNDcyMDg0NDY1MTM1NjE2.YcB9Ew.MZtRFv_NCFj3z3QqomT4qeW_FXo');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`${client.user.tag}에 로그인하였습니다.`);
});

//갱신 간격 (1000 - 1초)
const UpdateTime = 5000;

//기본 지급 돈
let wallet = 1000;

//캐캐오 주가변경 알고리즘
const kakao = 1000;
let kakaMove = 0;
let kakaoJusik = '주가 정보 불러오기에 실패하였습니다.';
let kakaoVa = '주가 정보 불러오기에 실패했습니다.';
let kakaoIfDownOrUp = 0;
let UpOrDownMessage = '주가 정보 불러오기에 실패했습니다.';
let MyHave = [''];
let myjusik_1 = undefined;

//구매감지
let sell = undefined;
		
//while (true){ 
	setTimeout(function () {
		//캐캐오 랜덤값 설정
		kakaoMove = Math.floor(Math.random() * 20) + 8;
		console.log('kakaoMove : '+kakaoMove);
		
		//오를까 내릴까 설정
		kakaoIfDownOrUp = Math.floor(Math.random() * 1 + 1);
		console.log(kakaoIfDownOrUp);
	}, UpdateTime);

	setTimeout(function () {
		if (kakaoIfDownOrUp == 3) {
			//주식값 오름
			kakaoJusik = kakao + kakaoMove;
			console.log('kakaoJusik : '+kakaoJusik);
			UpOrDownMessage = '▲ ';
		} else if (kakaoIfDownOrUp == 1) {
			//주식값 내림
			kakaoJusik = kakao - kakaoMove;
			console.log('kakaoJusik : '+kakaoJusik);
			UpOrDownMessage = '▼ ';
		}
	}, UpdateTime);

	//주가 변경 계산
	setTimeout(function () {
		kakaoVa = kakaoJusik - kakao;
		console.log('kakaoVa : '+kakaoVa);
	}, UpdateTime);
//}

client.on('messageCreate', (message) => {
	//시세확인
	if (message.content === '이코야 현재시세') {
		message.channel.send('```캐캐오 : ' + kakaoJusik + '이코 (' + UpOrDownMessage + kakaoVa + '이코)```');
	}
	
	//구매하기
	if (message.content === '이코야 구매 캐캐오') {
		message.channel.send('캐캐오의 현재 시세는 ' + kakaoJusik + '이코입니다.\n정말로 구매하시겠습니까?\n구매하시려면 **"이코야 구매 확인 캐캐오"**을 입력해주세요.');
	}
	
	//구매의사 재확인
	if (message.content === '이코야 구매 확인 캐캐오') {
		console.log('정상 입력');
		
		//구매의사 저장
		buy = '구매완료';
		console.log(sell);
		
		//지갑에서 돈 차감
		if (buy == '구매완료') {
			if (wallet >= kakaoJusik) {
				wallet = wallet - kakaoJusik;
				message.channel.send('구매가 완료되었습니다.\n' + kakaoJusik + '이코가 차감되어 현재 보유 금액은 ' + wallet + '이코 입니다.');
				
				//보유 주식 어레이 저장
				MyHave[MyHave.length] = ('캐캐오');
				myjusik_1 = ('캐캐오');
				console.log(MyHave)
			}
			else {
				//구매 실패
				message.channel.send('지갑에 돈이 부족하여 구매가 불가능합니다.');
			}
		}
	}
	
	//판매
	if (message.content === '이코야 판매 캐캐오') { 
		if (myjusik_1 == '캐캐오'){
			message.channel.send('정말 캐캐오를 판매하시겠습니까?\n판매를 한다면 ' + kakaoJusik + '이코가 지갑에 입금됩니다.\n캐캐오를 판매하실 것이라면 **"이코야 판매 확인 캐캐오를"** 입력해주세요.');
		}
		else {
			message.channel.send('캐캐오 주식을 보유하고 있지 않습니다.');
		}
	}
	
	if (message.content === '이코야 판매 확인 캐캐오') { 
		wallet = wallet + kakaoJusik;
		MyHave[MyHave.deleted] = ('2');
		message.channel.send('지갑에 ' + kakaoJusik + '이코가 입금되었습니다.\n현재 ' + wallet + '이코 보유중입니다.');
	}

	//지갑
	if (message.content === '이코야 지갑') { 
		message.channel.send('현재 보유중인 돈은 총 ' + wallet + '이코이고\n현재 보유하고 있는 주식은 ' + MyHave +' 입니다.');
	}
	
	if (!message.guild) return;
	if (message.author.bot) return;
});

// 디스코드 클라이언트 토큰 (유출금지 ㄹㅇ찐임)
client.login('OTIyNDcyMDg0NDY1MTM1NjE2.YcB9Ew.MZtRFv_NCFj3z3QqomT4qeW_FXo');
