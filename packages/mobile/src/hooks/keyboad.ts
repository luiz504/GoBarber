import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface IUseKeyBoardUtils {
  isOpenKeyboard: boolean;
}

export default function useKeyboadUtils(): IUseKeyBoardUtils {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState<boolean>(false);

  const handleKeyboard = useCallback((value?: boolean) => {
    if (value === true) {
      setIsOpenKeyboard(true);
      return;
    }
    setIsOpenKeyboard(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      Keyboard.addListener('keyboardDidShow', () => handleKeyboard(true));
      Keyboard.addListener('keyboardDidHide', () => handleKeyboard());

      return () => {
        Keyboard.removeListener('keyboardDidShow', () => handleKeyboard());
        Keyboard.removeListener('keyboardDidHide', () => handleKeyboard());
      };
    }, [handleKeyboard]),
  );
  return { isOpenKeyboard };
}
