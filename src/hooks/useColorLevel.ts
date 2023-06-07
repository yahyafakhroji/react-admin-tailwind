const useColorLevel = (level: string | number) => {
  const colorLevel = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const index = colorLevel.indexOf(level?.toString());

  const calculateLevel = (action: 'decrement' | 'increment') => {
    if (index === 0 || index === colorLevel.length - 1) {
      return level;
    }

    if (action === 'decrement') {
      return colorLevel[index - 1];
    }

    if (action === 'increment') {
      return colorLevel[index + 1];
    }

    return level;
  };

  const decreaseLevel = calculateLevel('decrement');

  const increaseLevel = calculateLevel('increment');

  return [increaseLevel, decreaseLevel];
};

export default useColorLevel;
