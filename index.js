const { Client, Intents } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`${client.user.tag}에 로그인하였습니다.`);
});

//갱신 간격 (1000 - 1초)
const UpdateTime = 5000;

//기본 지급 돈
let wallet = 3000;

//캐캐오 주가변경 알고리즘
let kakaMove = 0;
let kakaoJusik = '주가 정보 불러오기에 실패하였습니다.';
let kakaoVa = '주가 정보 불러오기에 실패했습니다.';
let kakaoIfDownOrUp = 0;
let UpOrDownMessage = '주가 정보 불러오기에 실패했습니다.';

//캐캐오 기본가격
const kakao = 800;

//캐캐오 구매 저장
let myjusik_1 = undefined;

//지갑 주식확인
let MyHave = [''];

//구매감지
let sell = undefined;

while (true){
setTimeout(function () {
	//캐캐오 랜덤값 설정
	kakaoMove = Math.floor(Math.random() * 20) + 8;
	console.log('kakaoMove : ' + kakaoMove);

	//오를까 내릴까 설정
	kakaoIfDownOrUp = Math.floor(Math.random() * 2 + 1);
	console.log(kakaoIfDownOrUp);
}, UpdateTime);

setTimeout(function () {
	if (kakaoIfDownOrUp == 1) {
		//주식값 오름
		kakaoJusik = kakao + kakaoMove;
		console.log('kakaoJusik : ' + kakaoJusik);
		UpOrDownMessage = '▲ ';
	} else if (kakaoIfDownOrUp == 2) {
		//주식값 내림
		kakaoJusik = kakao - kakaoMove;
		console.log('kakaoJusik : ' + kakaoJusik);
		UpOrDownMessage = '▼ ';
	}
}, UpdateTime);

//주가 변경 계산
setTimeout(function () {
	kakaoVa = kakaoJusik - kakao;
	console.log('kakaoVa : ' + kakaoVa);
}, UpdateTime);
};

client.on('messageCreate', async (message) => {
	//시세확인
	if (message.content === '이코야 현재시세') {
		const exampleEmbed = new MessageEmbed()
			.setColor('#FE9A2E')
			.setTitle('현재 주식 시세')
			.setDescription(
				'캐캐오 : ' + kakaoJusik + '이코 (' + UpOrDownMessage + kakaoVa + '이코)'
			)
			.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

		message.channel.send({ embeds: [exampleEmbed] });
	}

	//지갑
	if (message.content === '이코야 지갑') {
		const exampleEmbed = new MessageEmbed()
			.setColor('#FE9A2E')
			.setTitle('보유 자산')
			.setDescription('보유중인 이코 : ' + wallet + '이코\n보유중인 주식 : ' + MyHave)
			.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

		message.channel.send({ embeds: [exampleEmbed] });
	}

	//판매확인 캐캐오
	if (message.content === '이코야 판매 확인 캐캐오') {
		if (myjusik_1 == '캐캐오') {
			myjusik_1 = 0;
			wallet = wallet + kakaoJusik;
			MyHave.splice('캐캐오');
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('판매가 완료되었습니다.')
				.setDescription('판매가 완료되어 ' + kakaoJusik + '이코가 지갑에 입금되었습니다.')
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		} else {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('캐캐오를 보유하지 않았습니다.')
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		}
	}

	//주식구매 캐캐오
	if (message.content === '이코야 구매 캐캐오') {
		if (myjusik_1 == '캐캐오') {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('이미 캐캐오를 보유하고 있습니다.')
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		} else {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('정말 캐캐오를 구매하시겠습니까?')
				.setDescription(
					'구매 한다면 ' +
						kakaoJusik +
						'이코가 지갑에서 차감됩니다.\n구매를 원하시면 **이코봇 구매 확인 캐캐오**를 입력해주세요.'
				)
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		}
	}

	//구매의사 재확인
	if (message.content === '이코야 구매 확인 캐캐오') {
		console.log('정상 입력');
		if (myjusik_1 == '캐캐오') {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('이미 캐캐오를 보유하고 있습니다.')
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		} else {
			//구매의사 저장
			buy = '구매완료';
			console.log(sell);

			//지갑에서 돈 차감
			if (buy == '구매완료') {
				if (wallet >= kakaoJusik) {
					wallet = wallet - kakaoJusik;

					const exampleEmbed = new MessageEmbed()
						.setColor('#FE9A2E')
						.setTitle('구매가 완료되었습니다.')
						.setDescription(
							kakaoJusik +
								'이코가 지갑에서 차감되어 현재 보유 금액은 ' +
								wallet +
								'이코입니다.'
						)
						.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

					message.channel.send({ embeds: [exampleEmbed] });

					//보유 주식 어레이 저장
					MyHave[MyHave.length] = '캐캐오';
					myjusik_1 = '캐캐오';
					console.log(MyHave);
				} else {
					//구매 실패
					const exampleEmbed = new MessageEmbed()
						.setColor('#FE9A2E')
						.setTitle('지갑에 돈이 부족하여 구매가 불가합니다.')
						.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

					message.channel.send({ embeds: [exampleEmbed] });
				}
			}
		}
	}

	//도움말
	if (message.content === '이코야') {
		const exampleEmbed = new MessageEmbed()
			.setColor('#FE9A2E')
			.setTitle('이코봇 도움말')
			.setDescription(
				'이코야 현재시세 : 지금 주식들의 시세를 표시합니다.\n이코야 구매 [주식명] : 주식을 구매합니다.\n이코야 구매 확인 [주식명] : 주식을 확인 절차 없이 바로 구매하니 조심해서 사용해주세요!\n이코야 판매 [주식명] : 주식을 판매합니다.\n이코야 판매 확인 [주식명] : 주식을 확인 절차 없이 바로 판매하니 조심해서 사용해주세요!\n이코야 지갑 : 나의 보유 주식과 보유한 돈을 확인합니다.\n이코야 : 이코봇에 대한 도움말을 표시합니다.'
			)
			.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

		message.channel.send({ embeds: [exampleEmbed] });
	}

	//판매
	if (message.content === '이코야 판매 캐캐오') {
		if (myjusik_1 == '캐캐오') {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('정말 캐캐오를 판매하시겠습니까?')
				.setDescription(
					'판매를 한다면 ' +
						kakaoJusik +
						'이코가 지갑에 입금됩니다.\n판매를 원하시면 **이코봇 판매 확인 캐캐오**를 입력해주세요.'
				)
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		} else {
			const exampleEmbed = new MessageEmbed()
				.setColor('#FE9A2E')
				.setTitle('캐캐오 주식을 보유하고 있지 않습니다.')
				.setFooter('Make by SEONG Park(Dev) & Nayun(Plan)');

			message.channel.send({ embeds: [exampleEmbed] });
		}
	}
	if (!message.guild) return;
	if (message.author.bot) return;
});

// 디스코드 클라이언트 토큰 (유출금지 ㄹㅇ찐임)
client.login('OTIyNDcyMDg0NDY1MTM1NjE2.YcB9Ew.C0-ufBsUEU2_kOJIM9wSzemnxhE');
