# Love Diary 💕

A beautiful mobile app for couples to share their love journey through diary entries, memories, and meaningful challenges.

## Features

### 📖 Love Diary
- **Multiple formats**: Text, photo, voice, and video diary entries
- **Mood tags**: Express how you're feeling with beautiful emoji-based moods
- **Love Index**: Daily love index slider to track emotional connection
- **Privacy controls**: Keep entries private or share with your partner
- **Partner interactions**: Hearts, comments, and emoji reactions

### 📅 Love Timeline
- Visual relationship milestone timeline
- Day counter showing your journey together
- Card-based memories with photos and illustrations
- Annual recap with beautiful statistics
- Memory book style page-flip animations
- Export as commemorative video

### 💪 Couple Challenges
- Daily, weekly, and 30-day challenges
- Categories: Communication, Intimacy, Adventure, Gratitude, Creative
- Streak tracking with visual progress
- Reward system: Love badges, exclusive stickers, unlockable themes

## Design System

### Color Palette
- **Primary**: Soft rose, blush pink, cream
- **Accents**: Lavender, mint, sky blue, honey
- **Hearts**: Pink, coral, soft red

### Visual Style
- Soft pastel colors
- Rounded cards with gentle shadows
- Intimate, book-like reading experience
- Smooth, gentle animations
- Full night mode support

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Custom bottom tab bar with floating action button
- **Styling**: Theme-based design system
- **Animations**: React Native Animated API with custom hooks
- **State**: React Context for theme management

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Avatar.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Challenges.tsx
│   ├── DiaryEntry.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── LoveIndex.tsx
│   ├── MoodSelector.tsx
│   ├── PrivacyToggle.tsx
│   ├── Reactions.tsx
│   ├── Timeline.tsx
│   └── BottomTabBar.tsx
├── context/          # React Context providers
│   └── ThemeContext.tsx
├── hooks/            # Custom React hooks
│   └── useAnimation.ts
├── navigation/       # Navigation setup
│   └── AppNavigator.tsx
├── screens/          # App screens
│   ├── DiaryScreen.tsx
│   ├── WriteEntryScreen.tsx
│   ├── TimelineScreen.tsx
│   ├── ChallengesScreen.tsx
│   └── ProfileScreen.tsx
├── theme/            # Design system
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
└── utils/            # Utility functions
    └── helpers.ts
```

## Getting Started

### Prerequisites

- Node.js 18+（**建議 Node 20 LTS**；本專案使用 Expo SDK 50，使用 Node 22 可能導致 Metro 檔案監看問題）
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 如果遇到 Metro `EMFILE: too many open files, watch`

這通常代表系統可用的檔案監看/FD 數量不足（Metro 使用 NodeWatcher 時特別容易發生）。

- **已內建緩解**：本專案 `npm start` 會先嘗試執行 `ulimit -n 10000` 後再啟動 Expo。
- **推薦做法**：
  - 使用 Node 20（見 `.nvmrc`）
  - 安裝並啟用 watchman（macOS 可用 Homebrew 安裝），讓 Metro 使用 watchman 監看檔案
  - 若仍遇到問題，請在同一個終端機先手動執行 `ulimit -n 10000` 再跑 `npm start`

## Key Components

### MoodSelector
Beautiful emoji-based mood selection with horizontal or grid layout.

### LoveIndexSlider
Interactive slider with heart emojis representing different love levels (💔 → 🥰).

### DiaryEntry
Complete diary entry card with support for text, photos, voice notes, and videos.

### DayCounter
Animated counter showing total days together with gradient background.

### ChallengeCard
Gamified challenge cards with progress tracking and rewards.

## Animations

The app includes several custom animation hooks:

- `useFadeIn` - Smooth fade in effects
- `useHeartbeat` - Pulsing heart animation
- `usePageFlip` - Memory book page turn effect
- `useSlideIn` - Directional slide animations
- `useStaggeredList` - List item cascade animation

## Night Mode

Full dark theme support with:
- Muted romantic color palette
- Adjusted shadows and elevation
- Comfortable reading experience
- Automatic system theme detection

## License

Made with 💕

---

*A private, warm, romantic space for couples to nurture their relationship.*
