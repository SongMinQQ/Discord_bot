require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const cron = require("node-cron");

const client = new Client();

// env에서 JSON 배열로 읽어오기
const suffixEmojis = JSON.parse(process.env.SUFFIX_EMOJIS || "[]");
const openingLines = JSON.parse(process.env.OPENING_LINES || "[]");
const rawMessageTemplate = process.env.MESSAGE_TEXT;
const channelId = process.env.CHANNEL_ID;

let lastMessage = null;

client.on("ready", () => {
  console.log(`${client.user.username} 셀프봇 작동 시작`);

  cron.schedule("*/15 * * * *", async () => {
    const delaySec = Math.floor(Math.random() * 220) + 20;
    console.log(`다음 메시지는 ${delaySec}초 후에 전송됩니다.`);

    setTimeout(async () => {
      try {
        const channel = await client.channels.fetch(channelId);
        if (!channel) return;

        // 이전 메시지 삭제
        if (lastMessage && !lastMessage.deleted) {
          try {
            await lastMessage.delete();
            console.log("이전 메시지 삭제 완료");
          } catch (err) {
            console.warn("이전 메시지 삭제 실패:", err.message);
          }
        }

        // 랜덤 요소 선택
        const emoji = suffixEmojis[Math.floor(Math.random() * suffixEmojis.length)];
        const opening = openingLines[Math.floor(Math.random() * openingLines.length)];

        const messageContent = rawMessageTemplate
          .replace("{opening}", opening)
          .replace("{emoji}", emoji);

        lastMessage = await channel.send(messageContent);
        console.log("✅ 메시지 전송 완료");
      } catch (err) {
        console.error("❌ 메시지 전송 실패:", err.message);
      }
    }, delaySec * 1000);
  });
});

client.login(process.env.SELF_TOKEN);
