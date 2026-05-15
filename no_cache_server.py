"""
캐시 없는 개발용 HTTP 서버
사용: python no_cache_server.py [포트(기본 8000)]
"""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # 로그 출력 끄기

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
print(f'Serving on http://localhost:{port}  (no-cache)')
HTTPServer(('', port), NoCacheHandler).serve_forever()
