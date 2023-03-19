import { AddressbarColor, setCssVar } from 'quasar';

export const useTheme = () => {
  const setTheme = (primary: string, secondary: string) => {
    if (primary) {
      setCssVar('primary', primary);
      AddressbarColor.set(primary);
    }
    if (secondary) setCssVar('secondary', secondary);
  };
  return { setTheme };
};
