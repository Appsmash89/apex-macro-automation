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

:: 2. Start Command Bridge (Background)
echo [2/4] STARTING_SOVEREIGN_RELAY_BRIDGE...
start "APEX_RELAY" /min python engines/bridge_relay.py

:: 3. Start Institutional Dashboard (Background)
echo [3/4] INITIALIZING_COMMAND_DASHBOARD...
start "APEX_DASHBOARD" /min npm run dev

:: 4. Navigate to Command Center
echo [4/4] STEERING_BROWSER_TO_DCC_ALPHA...
timeout /t 5 >nul
start http://localhost:3000

echo.
echo ============================================================
echo   FACTORY_ACTIVE: NODE_01 IS OPERATIONAL
echo   Close windows manually to terminate.
echo ============================================================
echo.

