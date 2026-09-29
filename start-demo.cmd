@echo off
cd /d "%~dp0"
call npm run build
if errorlevel 1 (
  echo Demo build failed.
  pause
  exit /b 1
)
call npm run preview -- --port 5173 --strictPort
