/**
 * Love Diary - Animation Hooks
 * Smooth, gentle animations for intimate interactions
 */

import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

// Fade in animation
export const useFadeIn = (delay: number = 0, duration: number = 300) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return opacity;
};

// Scale animation (for buttons, hearts, etc.)
export const useScale = (initialScale: number = 1) => {
  const scale = useRef(new Animated.Value(initialScale)).current;

  const scaleIn = (toValue: number = 1.1, duration: number = 150) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const scaleOut = (toValue: number = 1, duration: number = 150) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { scale, scaleIn, scaleOut, pulse };
};

// Heart beat animation
export const useHeartbeat = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const beat = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { scale, beat };
};

// Slide in animation
export const useSlideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  delay: number = 0,
  duration: number = 400
) => {
  const position = useRef(new Animated.Value(getInitialPosition(direction))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  function getInitialPosition(dir: string) {
    switch (dir) {
      case 'left':
        return -50;
      case 'right':
        return 50;
      case 'up':
        return 30;
      case 'down':
        return -30;
      default:
        return 30;
    }
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration * 0.6,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const transform =
    direction === 'left' || direction === 'right'
      ? { translateX: position }
      : { translateY: position };

  return {
    opacity,
    transform: [transform],
  };
};

// Stagger animation for lists
export const useStaggeredList = (itemCount: number, baseDelay: number = 50) => {
  const animations = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  ).current;

  useEffect(() => {
    const animationSequence = animations.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 300,
          delay: index * baseDelay,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 300,
          delay: index * baseDelay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(baseDelay, animationSequence).start();
  }, []);

  return animations.map((anim) => ({
    opacity: anim.opacity,
    transform: [{ translateY: anim.translateY }],
  }));
};

// Page flip animation (for memory book)
export const usePageFlip = () => {
  const rotateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const flipForward = (onComplete?: () => void) => {
    Animated.parallel([
      Animated.timing(rotateY, {
        toValue: 180,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      rotateY.setValue(0);
      onComplete?.();
    });
  };

  const flipBack = (onComplete?: () => void) => {
    Animated.parallel([
      Animated.timing(rotateY, {
        toValue: -180,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      rotateY.setValue(0);
      onComplete?.();
    });
  };

  const interpolatedRotateY = rotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  return {
    style: {
      opacity,
      transform: [{ perspective: 1000 }, { rotateY: interpolatedRotateY }],
    },
    flipForward,
    flipBack,
  };
};

// Gentle shake animation (for errors, attention)
export const useShake = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 4, duration: 50, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  return { translateX, shake };
};

// Floating animation (for decorative elements)
export const useFloat = (range: number = 10, duration: number = 2000) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -range,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: range,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return translateY;
};

export default {
  useFadeIn,
  useScale,
  useHeartbeat,
  useSlideIn,
  useStaggeredList,
  usePageFlip,
  useShake,
  useFloat,
};
