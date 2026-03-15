# Design System: 90s Webcore & Highteen Retro

## 1. Visual Concept
- **Base Style**: Windows 98/XP OS interface mixed with "Y2K Aesthetic".
- **Key Elements**: Pixelated borders, heavy shadows, lo-fi graphics, draggable windows.

## 2. Color Palette
- **Background**: #C0C0C0 (Classic System Grey)
- **Primary (Header)**: #000080 (Classic Navy) or #FF79C6 (Vibrant Pink for Highteen vibe)
- **Surface**: #FFFFFF (White for content area)
- **Accent**: #A29BFE (Soft Lavender), #55E6C1 (Mint/Neon Green)
- **Shadows**: 
  - Outset (Bevel): border: 2px solid; border-color: #fff #808080 #808080 #fff;
  - Inset: border: 2px solid; border-color: #808080 #fff #fff #808080;

## 3. Typography
- **Primary**: 'MS Sans Serif', 'Tahoma', sans-serif (system-like font).
- **Fallback**: 'Courier New' for a lo-fi/coding vibe.
- **Rules**: No anti-aliasing (if possible) to keep the pixel feel.

## 4. Layout: The "Desktop" UI
- **Desktop**: A full-screen container with a background color or a tiled pixel pattern.
- **Taskbar**: Bottom fixed bar (height: 40px) with a 'Start' button and clock.
- **Windows**: 
  - Must have a Title Bar with [Name | _ | □ | X] controls.
  - Windows should be draggable (use react-draggable).
  - Background: #C0C0C0.

## 5. Menu Mapping (IA)
- **Home**: Desktop Shortcut "About_Me.txt"
- **Work (Folder)**: UX_Research, Design, Papers (Sub-folders or files)
- **Create (Apps)**: Music (Media Player), Drawing (Paint UI), Architecture (Gallery)
- **Life (Diary/Logs)**: Cooking, Travel, Diary (Notepad style)