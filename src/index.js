const plugin = require("tailwindcss/plugin");


const collectColors = (collectedColors, colors, subfix) => {
  if (Object.prototype.toString.call(colors) === "[object Object]") {
    for (const colorKey in colors) {
      const colorValue = colors[colorKey];
      const newSubfix = subfix ? `${subfix}-${colorKey}` : colorKey;
      if (typeof colorValue === "string") {
        collectedColors[newSubfix] = colorValue;
      } else if (
        Object.prototype.toString.call(colorValue) === "[object Object]"
      ) {
        collectColors(collectedColors, colorValue, newSubfix);
      }
    }
  }
};

const fallbackCss = (collectedColors, callback) => {
  for (const subfix in collectedColors) {
    const collectedColorValue = collectedColors[subfix];
    callback(subfix, collectedColorValue);
  }
}

const cssVariableFallback = plugin(
  function ({ addUtilities, matchUtilities, theme, variants, e }) {
    const colors = theme("colors");
    const collectedColors = {};
    collectColors(collectedColors, colors);

    // border-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-${subfix}`)}`]: {
          borderColor: colorValue,
        },
      });
    });

    // border-x-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-x-${subfix}`)}`]: {
          borderLeftColor: colorValue,
          borderRightColor: colorValue,
        },
      })
    });

    // border-y-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-y-${subfix}`)}`]: {
          borderTopColor: colorValue,
          borderBottomColor: colorValue,
        },
      });
    });

    // border-t-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-t-${subfix}`)}`]: {
          borderTopColor: colorValue,
        },
      });
    });

    // border-b-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-b-${subfix}`)}`]: {
          borderBottomColor: colorValue,
        },
      });
    });

    // border-r-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-r-${subfix}`)}`]: {
          borderRightColor: colorValue,
        },
      });
    });

    // border-l-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`border-l-${subfix}`)}`]: {
          borderLeftColor: colorValue,
        },
      });
    });

    // bg-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`bg-${subfix}`)}`]: {
          backgroundColor: colorValue,
        },
      });
    });

    // text-*
    fallbackCss(collectedColors, (subfix, colorValue) => {
      addUtilities({
        [`.${e(`text-${subfix}`)}`]: {
          color: colorValue,
        },
      });
    });

    addUtilities({
      '.content': {
        content: `" "`,
      },
    })
  },
  {
    variants: {
      // cssVariableFallback: ['responsive']
    },
  }
);

module.exports = cssVariableFallback
