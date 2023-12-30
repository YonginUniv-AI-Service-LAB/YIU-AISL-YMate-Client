const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "/nickcheck",
    createProxyMiddleware( { // /mail로 시작하는 모든 경로를 프록시
      target: 'http://localhost:8080', // 프록시할 서버 주소
      changeOrigin: true, // 주소 변경 (true로 설정할 경우, target의 주소로 변경됨)
    })
  );
};