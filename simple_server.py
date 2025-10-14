#!/usr/bin/env python3
"""
Simple HTTP server for Maintenance single-spa app with CORS
"""
import http.server
import socketserver
import os

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Max-Age', '86400')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    PORT = 4202 # Port for Maintenance
    
    # Change to the dist directory to serve the built main.js file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dist_dir = os.path.join(current_dir, 'dist')
    if os.path.exists(dist_dir):
        os.chdir(dist_dir)
    else:
        print(f"Error: 'dist' directory not found at {dist_dir}. Please build the Vue app first.")
        exit(1)
    
    Handler = CORSHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Maintenance server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {dist_dir}")
        print("🌐 CORS headers enabled for cross-origin requests")
        print("📦 Serving Vue single-spa build")
        httpd.serve_forever()

