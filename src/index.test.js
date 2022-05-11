const path = require("path");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const colors = require('tailwindcss/colors');
const cssVariableFallbackPlugin = require(".");

function run(config, plugin = tailwindcss) {
  let { currentTestName } = expect.getState();
  config = {
    ...{
      theme: {
        colors: {
          ...colors,
          fuck: {
            ie: {
              100: '#1908FF',
            },
          },
          primary: '#04cb94',
        },
      },
      plugins: [cssVariableFallbackPlugin],
      corePlugins: { preflight: false },
    },
    ...config,
  }

  return postcss(plugin(config)).process("@tailwind utilities", {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

it("should add the `border-*` utilits", () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="border-red-100 border-b-red-100 border-x-red-100 border-fuck-ie-100"></div>`,
      },
    ],
  };

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .border-red-100 {
        --tw-border-opacity: 1;
        border-color: rgb(254 226 226 / var(--tw-border-opacity))
      }
      .border-fuck-ie-100 {
        --tw-border-opacity: 1;
        border-color: rgb(25 8 255 / var(--tw-border-opacity));
      }
      .border-x-red-100 {
        --tw-border-opacity: 1;
        border-left-color: rgb(254 226 226 / var(--tw-border-opacity));
        border-right-color: rgb(254 226 226 / var(--tw-border-opacity))
      }
      .border-b-red-100 {
        --tw-border-opacity: 1;
        border-bottom-color: rgb(254 226 226 / var(--tw-border-opacity))
      }

      .border-red-100 {
        border-color: #fee2e2
      }
      .border-fuck-ie-100 {
        border-color: #1908FF
      }
      .border-x-red-100 {
        border-left-color: #fee2e2;
        border-right-color: #fee2e2;
      }
      .border-b-red-100 {
        border-bottom-color: #fee2e2
      }
      
    `)
  });
});

it("should add the responsive `border-*` utility", () => {
  const config = {
    content: [{ raw: String.raw`<div class="lg:border-red-100"></div>` }],
  };

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @media (min-width: 1024px) {
        .lg\:border-red-100 {
          --tw-border-opacity: 1;
        border-color: rgb(254 226 226 / var(--tw-border-opacity));
        border-color: #fee2e2;
        }
      }
    `)
  });
});

it('should add the hover `border-*` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="hover:border-red-100"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .hover\:border-red-100:hover {
        --tw-border-opacity: 1;
        border-color: rgb(254 226 226 / var(--tw-border-opacity));
        border-color: #fee2e2;
      }
    `)
  })
})

it('should add the hover `border-*` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="hover:border-red-100"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .hover\:border-red-100:hover {
        --tw-border-opacity: 1;
        border-color: rgb(254 226 226 / var(--tw-border-opacity));
        border-color: #fee2e2;
      }
    `)
  })
})

it('should add the after `border-*` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="after:border-red-100"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .after\:border-red-100::after {
        --tw-border-opacity: 1;
        border-color: rgb(254 226 226 / var(--tw-border-opacity));
        content: var(--tw-content);
        border-color: #fee2e2;
      }
    `)
  })
})


it('should add the  `bg-*` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bg-red-100"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bg-red-100 {
        --tw-bg-opacity: 1;
        background-color: rgb(254 226 226 / var(--tw-bg-opacity));
        background-color: #fee2e2;
      }
    `)
  })
})

it('should add the  `text-*` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="text-red-100"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .text-red-100 {
        --tw-text-opacity: 1;
        color: rgb(254 226 226 / var(--tw-text-opacity));
        color: #fee2e2;
      }
    `)
  })
})

it('should add the after:content utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="after:content"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .after\:content::after {
        content:" ";
      }
    `)
  })
})

it('should add the before:content utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="before:content"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .before\:content::before {
        content:" ";
      }
    `)
  })
})