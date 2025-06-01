# Discord Bot 및 Self-Bot 안내서

이 저장소는 Discord 일반 봇과 셀프봇(Self-Bot)의 구현 예제를 제공하고, 사용 시 주의사항 및 세팅 방법을 설명합니다.

기능은 계속해서 추가될 예정입니다.

---

## 📌 일반 봇 (권장)

### ✅ 기능

- 간단한 명령어 응답 (`!ping`, `!echo`)
- 사용자 정보 조회 (`!userinfo`)
- TTS(텍스트 음성 변환) 메시지 전송 (`!tts`)

### ✅ 설정 방법

1. [Discord Developer Portal](https://discord.com/developers/applications)에 접속하여 봇 애플리케이션을 생성합니다.
2. 봇의 TOKEN을 복사하여 `.env` 파일에 저장합니다.

```env
TOKEN=당신의_디스코드_봇_토큰
```

3. 필요한 라이브러리 설치:

```bash
npm install discord.js dotenv
```

4. 봇 실행

```bash
node index.js
```

### ✅ 봇 예제 코드 (`index.js`)

(작성하신 일반 봇 코드를 삽입)

---

## ⚠️ 셀프봇 (Self-Bot)

> 셀프봇은 사용자의 개인 Discord 계정을 통해 작동하며, Discord의 서비스 약관(TOS)을 위반하는 행위입니다. 셀프봇 사용 시 계정이 영구 정지될 수 있으므로 강력히 권장하지 않습니다. 이 코드는 학습 목적으로만 사용해야 합니다.

### ⚠️ 주의사항

- Discord의 서비스 약관 위반
- 계정 영구 정지 가능성 매우 높음

### ⚠️ 셀프봇 예제 코드

셀프봇 코드는 랜덤한 메시지 발송 및 메시지 삭제 기능을 포함합니다. 탐지 가능성을 줄이기 위해 메세지 전송 시 랜덤한 시간차를 두었으며 매 메세지 전송마다 랜덤한 이모지나 문자를 포함합니다.사용 시 발생하는 문제에 대해 책임지지 않습니다.

### ✅ 설정 방법

1. 셀프봇 전용 환경변수를 `.env` 파일에 설정합니다:

```env
SELF_TOKEN=당신의_디스코드_사용자_토큰
CHANNEL_ID=메시지_발송_채널_ID
MESSAGE_TEXT="메시지 본문 (템플릿 형식)"
OPENING_LINES=["메시지 오프닝 라인 배열"]
SUFFIX_EMOJIS=["이모지 배열"]
```

2. 필요한 라이브러리 설치:

```bash
npm install discord.js-selfbot-v13 dotenv node-cron
```

3. 셀프봇 실행

```bash
node selfbot.js
```

### ✅ 셀프봇 예제 코드 (`selfbot.js`)

(작성하신 셀프봇 코드를 삽입)

---

## 📢 권장사항

- 일반적인 용도로 Discord 봇을 제작할 경우, 반드시 공식적인 **봇 계정**을 사용하십시오.
- 셀프봇은 개인용 학습 목적을 제외하고는 사용하지 마십시오.
- Discord는 셀프봇을 적극적으로 탐지하며, 발견 즉시 계정을 정지시킬 수 있습니다.

---

이 문서가 Discord 봇 개발에 도움이 되기를 바랍니다.
