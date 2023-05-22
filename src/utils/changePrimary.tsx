const changePrimary = (primary: string) => `
  --primary: var(--${primary});
  --primary-hue: var(--${primary}-hue);
  --primary-saturation: var(--${primary}-saturation);
  --primary-lightness: var(--${primary}-lightness);
  --primary-text-color: var(--${primary}-text-color);
  --primary50: var(--${primary}50);
  --primary50-lightness: var(--${primary}50-lightness);
  --primary100: var(--${primary}100);
  --primary100-lightness: var(--${primary}100-lightness);
  --primary200: var(--${primary}200);
  --primary200-lightness: var(--${primary}200-lightness);
  --primary300: var(--${primary}300);
  --primary300-lightness: var(--${primary}300-lightness);
  --primary400: var(--${primary}400);
  --primary400-lightness: var(--${primary}400-lightness);
  --primary500: var(--${primary}500);
  --primary500-lightness: var(--${primary}500-lightness);
  --primary600: var(--${primary}600);
  --primary600-lightness: var(--${primary}600-lightness);
  --primary700: var(--${primary}700);
  --primary700-lightness: var(--${primary}700-lightness);
  --primary800: var(--${primary}800);
  --primary800-lightness: var(--${primary}800-lightness);
  --primary900: var(--${primary}900);
  --primary900-lightness: var(--${primary}900-lightness);
`

export default changePrimary
