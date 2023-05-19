const shadow = `
--shadow-color: var(--color-hue) var(--color-saturation) var(--color-lightness);
  --shadow-elevation-low:
    0px 0.3px 0.3px hsl(var(--shadow-color) / 0.34),
    0px 0.6px 0.7px -1.2px hsl(var(--shadow-color) / 0.34),
    0px 1.4px 1.6px -2.5px hsl(var(--shadow-color) / 0.34);
    --shadow-elevation-medium:
    0px 0.3px 0.3px hsl(var(--shadow-color) / 0.29),
    0px 0.9px 1px -0.6px hsl(var(--shadow-color) / 0.29),
    -0.1px 1.7px 1.9px -1.2px hsl(var(--shadow-color) / 0.29),
    -0.1px 3.5px 3.9px -1.9px hsl(var(--shadow-color) / 0.29),
    -0.2px 6.8px 7.7px -2.5px hsl(var(--shadow-color) / 0.29);
  --shadow-elevation-high:
    0px 0.3px 0.3px hsl(var(--shadow-color) / 0.27),
    0px 1.6px 1.8px -0.3px hsl(var(--shadow-color) / 0.27),
    -0.1px 2.9px 3.3px -0.6px hsl(var(--shadow-color) / 0.27),
    -0.1px 4.4px 5px -0.8px hsl(var(--shadow-color) / 0.27),
    -0.2px 6.4px 7.2px -1.1px hsl(var(--shadow-color) / 0.27),
    -0.3px 9.2px 10.4px -1.4px hsl(var(--shadow-color) / 0.27),
    -0.4px 13.1px 14.7px -1.7px hsl(var(--shadow-color) / 0.27),
    -0.5px 18.3px 20.6px -1.9px hsl(var(--shadow-color) / 0.27),
    -0.7px 25.1px 28.2px -2.2px hsl(var(--shadow-color) / 0.27),
    -1px 33.8px 38px -2.5px hsl(var(--shadow-color) / 0.27);
  --shadow-elevation-low-elevated:
    0px 1px 1.1px hsl(var(--shadow-color) / 0.34),
    0px 1.7px 1.9px -1.2px hsl(var(--shadow-color) / 0.34),
    0px 4px 4.5px -2.5px hsl(var(--shadow-color) / 0.34);
  --shadow-elevation-medium-elevated:
    0px 1px 1.1px hsl(var(--shadow-color) / 0.29),
    0px 2.6px 2.9px -0.6px hsl(var(--shadow-color) / 0.29),
    0px 5.2px 5.9px -1.2px hsl(var(--shadow-color) / 0.29),
    0px 10.4px 11.7px -1.9px hsl(var(--shadow-color) / 0.29),
    0px 20px 22.5px -2.5px hsl(var(--shadow-color) / 0.29);
  --shadow-elevation-high-elevated:
    0px 1px 1.1px hsl(var(--shadow-color) / 0.27),
    0px 4.8px 5.4px -0.3px hsl(var(--shadow-color) / 0.27),
    0px 8.5px 9.6px -0.6px hsl(var(--shadow-color) / 0.27),
    0px 12.9px 14.5px -0.8px hsl(var(--shadow-color) / 0.27),
    0px 18.9px 21.3px -1.1px hsl(var(--shadow-color) / 0.27),
    0px 27.1px 30.5px -1.4px hsl(var(--shadow-color) / 0.27),
    0px 38.6px 43.4px -1.7px hsl(var(--shadow-color) / 0.27),
    0px 54px 60.8px -1.9px hsl(var(--shadow-color) / 0.27),
    0.1px 74.2px 83.5px -2.2px hsl(var(--shadow-color) / 0.27),
    0.1px 100px 112.5px -2.5px hsl(var(--shadow-color) / 0.27);
`

export default shadow
