const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Add Node environment to PATH if present
const portableNodeDir = 'C:\\Users\\snayo\\Downloads\\cyber sheild ai full project coding\\node-env';
if (fs.existsSync(portableNodeDir)) {
  process.env.PATH = `${portableNodeDir};${process.env.PATH}`;
}

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const aiDir = path.join(rootDir, 'ai-service');
const frontendDir = path.join(rootDir, 'frontend');

// Python executable path
const pythonExe = fs.existsSync('C:\\Users\\snayo\\AppData\\Local\\Programs\\Python\\Python313\\python.exe')
  ? 'C:\\Users\\snayo\\AppData\\Local\\Programs\\Python\\Python313\\python.exe'
  : 'python';

console.log('============================================================');
console.log('            FORMShift Full-Stack System Launcher           ');
console.log('                  Source → Structure → Verify               ');
console.log('============================================================');

// Ensure root .env exists
const envFile = path.join(rootDir, '.env');
const envExample = path.join(rootDir, '.env.example');
if (!fs.existsSync(envFile) && fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envFile);
  console.log('📌 Created .env from .env.example');
}

const processes = [];

function runService(name, command, args, cwd, colorCode) {
  const resetColor = '\x1b[0m';
  console.log(`🚀 Starting ${name}...`);
  
  const proc = spawn(command, args, {
    cwd,
    env: { ...process.env },
    shell: false,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line) console.log(`${colorCode}[${name}]${resetColor} ${line}`);
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line) console.error(`${colorCode}[${name} ERR]${resetColor} ${line}`);
    });
  });

  proc.on('close', (code) => {
    console.log(`⚠️ ${name} process exited with code ${code}`);
  });

  processes.push(proc);
  return proc;
}

// 1. Backend Service (Port 5000)
runService('Backend', process.execPath, [path.join(backendDir, 'node_modules', 'tsx', 'dist', 'cli.mjs'), 'watch', 'src/server.ts'], backendDir, '\x1b[36m'); // Cyan

// 2. AI Microservice (Port 8000)
runService('AI-Service', pythonExe, ['-m', 'uvicorn', 'main:app', '--reload', '--host', '0.0.0.0', '--port', '8000'], aiDir, '\x1b[35m'); // Magenta

// 3. Frontend Service (Port 3000)
runService('Frontend', process.execPath, [path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '0.0.0.0', '--port', '3000'], frontendDir, '\x1b[32m'); // Green

// Open Browser Function
let browserOpened = false;
function checkAndOpenBrowser() {
  if (browserOpened) return;

  const req = http.get('http://127.0.0.1:3000', (res) => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      browserOpened = true;
      console.log('\n============================================================');
      console.log('🎉 ALL FORMShift SERVICES ARE ONLINE AND READY!');
      console.log('🔗 Web UI: http://localhost:3000');
      console.log('🔗 Express API Health: http://localhost:5000/api/health');
      console.log('🔗 Python AI Health: http://localhost:8000/health');
      console.log('🌐 Opening FORMShift application in Google Chrome...');
      console.log('============================================================\n');

      const openCmd = process.platform === 'win32'
        ? 'start chrome http://localhost:3000 || start http://localhost:3000'
        : process.platform === 'darwin'
        ? 'open http://localhost:3000'
        : 'xdg-open http://localhost:3000';

      exec(openCmd, (err) => {
        if (err) {
          console.log('💡 Note: Open your browser at http://localhost:3000');
        }
      });
    } else {
      setTimeout(checkAndOpenBrowser, 1000);
    }
  });

  req.on('error', () => {
    setTimeout(checkAndOpenBrowser, 1000);
  });
}

// Start checking
setTimeout(checkAndOpenBrowser, 2000);


// Shutdown handler
function cleanup() {
  console.log('\n🛑 Shutting down all FORMShift services...');
  processes.forEach((proc) => {
    try {
      proc.kill('SIGTERM');
    } catch (_) {}
  });
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
