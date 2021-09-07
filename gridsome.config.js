// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const postcssPlugins = [tailwind()];

module.exports = {
  siteName: "Alakazam.io",
  siteUrl: "https://twblog.terabytetiger.com",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        remark: {},
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        include: ["/", "/blog/**"],
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`
      }
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        [
          "remark-autolink-headings",
          {
            behavior: "wrap",
            linkProperties: {
              ariaHidden: "true",
              tabIndex: -1,
            },
          },
        ],
        [
          "gridsome-plugin-remark-prismjs-all",
          {
            showLineNumbers: true,
            aliases: {
              vue: "html",
              cmd: "bash",
              dos: "bash",
            },
          },
        ],
      ],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
