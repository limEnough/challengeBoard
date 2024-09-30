import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
  data: {
    title: string; // 제목
    body: string; // 내용
    image: string; // 이미지(아이콘)
    click_action: string; // 이동할 url
    token: string // 토큰
  };
}

export const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 푸시 알림 전송 대상 토큰
  const notificationData = { data };

  // 푸시 알림 전송
  const response = await admin.messaging().send(notificationData);

  return response;
};