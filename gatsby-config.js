/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Gatsby demo`,
    description: `Gatsby demo`,
    author: `@aakash`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Teko\:200, 400, 500,600,700`],
        display: `swap`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://wordpress-1096095-4170173.cloudwaysapps.com/graphql`,
        schema: {
          typePrefix: `Wp`,
        },
        // html: {
        //   useGatsbyImage: false,
        //   createStaticFiles: false,
        // },
        develop: {
          hardCacheMediaFiles: false,
        },
        auth: {
          htaccess: {
            username: `demo`,
            password: process.env.WPPASSWORD,
          },
        },
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 50 : 5000,
          },
        },
        // hostingWPCOM: false,
        // useACF: true,
        // verboseOutput: true,
      },
    },
  ],
}
