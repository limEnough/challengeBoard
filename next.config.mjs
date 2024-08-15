/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    /*
      Next.js는 기본적으로 Suspense 사용 페이지에서 SSR을 통해 준비되지 않은 상태가 있으면 CSR로 백업해서 페이지를 다시 렌더링하는 bailout 메커니즘을 사용
      missingSuspenseWithCSRBailout: false 설정을 통해 Suspense 컴포넌트의 CSR 대체를 허용하지 않음으로써 SSR에서 발생할 수 있는 문제를 명확히 파악할 수 있게 함
    */
    missingSuspenseWithCSRBailout: false,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')], // sassOptions 옵션 추가
      prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`, // prependData 옵션 추가
    },
  },
};

export default nextConfig;
