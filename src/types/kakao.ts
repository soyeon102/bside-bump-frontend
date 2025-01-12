export interface KakaoImageUploadResponse {
  infos: {
    original: {
      url: string;
    };
  };
}

// Kakao 전역 객체 타입 정의
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
