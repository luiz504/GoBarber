import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

interface IUseKeyBoardUtils {
  isOpenKeyboard: boolean;
}

export default function useKeyboadUtils(): IUseKeyBoardUtils {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState<boolean>(false);

  const handleKeyboard = useCallback((value: boolean | undefined) => {
    if (value !== undefined) {
      setIsOpenKeyboard(value);
    }
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => handleKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => handleKeyboard(false));

    return () => {
      Keyboard.removeListener('keyboardDidShow', () =>
        handleKeyboard(undefined),
      );
      Keyboard.removeListener('keyboardDidHide', () =>
        handleKeyboard(undefined),
      );
    };
  }, [handleKeyboard]);

  return { isOpenKeyboard };
}
