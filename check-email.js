// TODO: Gmail 에서 듀오링고 정보 가져오기
 
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const authenticate = async () => {
  const content = fs.readFileSync(CREDENTIALS_PATH);
  const credentials = JSON.parse(content);

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  // redirect_uris가 없는 경우 처리
  if (!redirect_uris || redirect_uris.length === 0) {
    throw new Error('Redirect URIs are missing in the credentials.json file.');
  }

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
      const token = fs.readFileSync(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const code = '사용자 인증 코드';  // TODO: 
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  }

  return oAuth2Client;
};

const getMailsFromSender = async (auth, senderEmail) => {
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({
      userId: 'me',
      q: `from:${senderEmail}`,
  });

  const messages = res.data.messages || [];
  for (const message of messages) {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
    });

    const payload = msg.data.payload;
    const parts = payload.parts;

    // parts가 존재하는지 확인
    if (!parts || parts.length === 0) {
      console.log('No parts found in the email.');
      continue;
    }

    for (const part of parts) {
      if (part.mimeType === 'text/plain') {
        const data = part.body.data;
        const buffer = Buffer.from(data, 'base64');
        const emailBody = buffer.toString('utf8');
        console.log('Email Body:', emailBody);
      }
    }
  }
};

const main = async () => {
  const auth = await authenticate();
  await getMailsFromSender(auth, 'hello@duolingo.com'); // 발신자 듀오링고
};

main().catch(console.error);