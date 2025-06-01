// index.js

// 1) discord.js 불러오기
const { Client, GatewayIntentBits, Partials, Events } = require("discord.js");
require("dotenv").config(); // 토큰을 환경변수에서 불러오기 위해 (optional)

// 2) 클라이언트 생성 시 Intents 설정
//    - 메시지 내용을 읽으려면 MESSAGE_CONTENT 인텐트를 활성화해야 함
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // 봇이 서버(길드) 정보를 가져올 수 있게
    GatewayIntentBits.GuildMessages, // 텍스트 채널의 메시지 정보를 받기 위해
    GatewayIntentBits.MessageContent, // 메시지 내용을 읽기 위해 (Privileged Intent)
  ],
  partials: [Partials.Channel], // 일부 기능(예: DM) 사용 시 필요할 수 있음
});

// 3) 봇이 준비되었을 때 한 번 실행되는 이벤트
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

// 4) 메시지를 수신했을 때 실행되는 이벤트
client.on(Events.MessageCreate, async (message) => {
  // 봇 자신이 보낸 메시지나 다른 봇의 메시지는 무시
  if (message.author.bot) return;

  const content = message.content.trim();

  // 간단한 "핑-퐁" 예제
  if (content === "!ping") {
    // reply()를 쓰면 상대가 멘션된 형태로 답장됨
    await message.reply("Pong! 🏓");
  }

  // "!echo <내용>" 이라고 입력하면, <내용>을 그대로 되돌려줌
  if (content.startsWith("!echo ")) {
    const echoMsg = content.slice(6).trim();
    if (echoMsg.length === 0) {
      return message.reply("⚠️ 내용을 입력해주세요. 예시: `!echo 안녕하세요!`");
    }
    await message.channel.send(`📢 ${echoMsg}`);
  }

  if (content.startsWith("!tts ")) {
    const toSpeak = content.slice(5).trim();
    if (!toSpeak) {
      return message.reply("⚠️ 읽어줄 문장을 입력해 이소.");
    }

    // 메시지 내용과 함께 tts:true 옵션을 줘서 보낸다
    return message.channel.send({ content: toSpeak, tts: true });
  }

  // "!userinfo" 입력 시, 사용자 정보 간단히 보여주기
  if (content === "!userinfo") {
    const member = message.member;
    await message.channel.send({
      embeds: [
        {
          color: 0x0099ff,
          title: `${member.user.tag}님의 정보`,
          thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
          fields: [
            { name: "유저 ID", value: member.user.id, inline: true },
            { name: "가입일", value: `${member.joinedAt.toLocaleDateString()}`, inline: true },
            {
              name: "계정 생성일",
              value: `${member.user.createdAt.toLocaleDateString()}`,
              inline: true,
            },
          ],
          timestamp: new Date(),
        },
      ],
    });
  }
});

// 5) Discord 클라이언트 로그인
//    - 환경변수에 DISCORD_TOKEN이 설정되어 있으면 process.env.DISCORD_TOKEN을 사용
const token = process.env.TOKEN;
if (!token) {
  console.error(
    "❌ Discord 봇 토큰이 설정되지 않았습니다. 환경변수 또는 코드 내에 올바른 토큰을 지정하세요."
  );
  process.exit(1);
}

client.login(token);
