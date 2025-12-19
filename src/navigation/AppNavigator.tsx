/**
 * Love Diary - App Navigator
 * Main navigation structure
 */

import React, { useState } from 'react';
import { View, Modal, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import BottomTabBar from '../components/BottomTabBar';
import {
  DiaryScreen,
  WriteEntryScreen,
  TimelineScreen,
  ChallengesScreen,
  ProfileScreen,
} from '../screens';

const AppNavigator: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { colors } = theme;

  const [currentTab, setCurrentTab] = useState('Diary');
  const [showWriteModal, setShowWriteModal] = useState(false);

  const handleTabPress = (tabName: string) => {
    if (tabName === 'Write') {
      setShowWriteModal(true);
    } else {
      setCurrentTab(tabName);
    }
  };

  const renderScreen = () => {
    switch (currentTab) {
      case 'Diary':
        return <DiaryScreen />;
      case 'Timeline':
        return <TimelineScreen />;
      case 'Challenges':
        return <ChallengesScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <DiaryScreen />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Main Screen */}
      {renderScreen()}

      {/* Bottom Tab Bar */}
      <BottomTabBar currentTab={currentTab} onTabPress={handleTabPress} />

      {/* Write Entry Modal */}
      <Modal
        visible={showWriteModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowWriteModal(false)}
      >
        <WriteEntryScreen
          onClose={() => setShowWriteModal(false)}
          onSave={(entry) => {
            console.log('New entry:', entry);
            setShowWriteModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default AppNavigator;
