@echo off
SETLOCAL EnableDelayedExpansion

echo.
echo ============================================================
echo   APEX_MACRO_AUTOMATION: SOVEREIGN_FACTORY_LAUNCHER
echo ============================================================
echo.

:: 1. Dependency Validation
echo [1/4] VALIDATING_PYTHON_DEPENDENCIES...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Dependency installation failed. Check your Python environment.
    pause
    exit /b
)

:: 2. Start Institutional Dashboard (Background)
echo [2/3] INITIALIZING_COMMAND_DASHBOARD...
start "APEX_DASHBOARD" /min npm run dev

:: 3. Navigate to Command Center
echo [3/3] STEERING_BROWSER_TO_DCC_ALPHA...
timeout /t 5 >nul
start http://localhost:3000

echo.
echo ============================================================
echo   FACTORY_ACTIVE: NODE_01 IS OPERATIONAL
echo   Close windows manually to terminate.
echo ============================================================
echo.

