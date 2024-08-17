/**
 * [참고문서] sassOptions
 * https://velog.io/@juice-han/dirname-is-not-defined-in-ES-module-scope-%EC%98%A4%EB%A5%98%EC%9D%98-%EC%9B%90%EC%9D%B8%EA%B3%BC-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
 */
import path from "path"; // 파일이나 디렉토리 경로를 다루는 path 모듈
import { fileURLToPath } from 'url'; // 일반적인 파일 url을 Node.js 파일 path로 바꿔주는 함수

const __filename = fileURLToPath(import.meta.url); // server.js 의 파일 url을 가져와서 fileURLToPath 로 경로 변환하여 저장
const __dirname = path.dirname(__filename); // 변환된 경로의 디렉터리 경로를 __dirname 에 저장

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /*
      Next.js는 기본적으로 Suspense 사용 페이지에서 SSR을 통해 준비되지 않은 상태가 있으면 CSR로 백업해서 페이지를 다시 렌더링하는 bailout 메커니즘을 사용
      missingSuspenseWithCSRBailout: false 설정을 통해 Suspense 컴포넌트의 CSR 대체를 허용하지 않음으로써 SSR에서 발생할 수 있는 문제를 명확히 파악할 수 있게 함
    */
    missingSuspenseWithCSRBailout: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`, // prependData 옵션 추가
  },
};

export default nextConfig;
