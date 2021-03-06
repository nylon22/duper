require('dotenv').config();

module.exports = {
  pathPrefix: 'docs',
  siteMetadata: {
    siteName: 'duper',
    title: 'duper Docs',
    description: 'A command line tool that makes administering Elasticsearch Cross-cluster Replication easy'
  },
  plugins: [
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/source/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'duper-docs',
        short_name: 'dupergraphql',
        start_url: '/',
        background_color: '#0E2339',
        theme_color: '#0E2339',
        display: 'minimal-ui',
        icon: 'assets/logo.svg'
      }
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: false
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.DUPER_GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.DUPER_ALGOLIA_ADMIN_KEY,
        queries: require('./src/utils/algolia-queries')
      },
    },
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        siteName: 'duper',
        menuTitle: 'duper documentation',
        version: '1',
        fields: {
          version: '1'
        },
        baseUrl: 'https://nylon22.github.io/duper/',
        contentDir: 'source',
        root: __dirname,
        subtitle: 'duper documentation',
        twitterHandle: 'tyson_warner',
        description:
          'A command line tool that makes administering Elasticsearch Cross-cluster Replication (CCR) easy',
        githubRepo: 'nylon22/duper',
        defaultVersion: '0.4',
        logoLink: 'https://nylon22.github.io/duper/',
        navConfig: {
          Github: {
            url: 'https://github.com/nylon22/duper',
            description: 'duper on Github'
          }
        },
        algoliaApiKey : 'b906b2ebfad7ffcce0b21bab135d11b2',
        algoliaIndexName: 'duper',
        sidebarCategories: {
          null: ['index', 'getting-started'],
          'Configuration Commands': [
            'commands/config-add-cluster',
            'commands/config-delete-cluster',
            'commands/config-list',
            'commands/config-set-follower-cluster',
            'commands/config-set-leader-cluster'
          ],
          'Enable CCR Commands': ['commands/connect'],
          'Open/Close Index Commands': ['commands/open', 'commands/close'],
          'CCR Commands': [
            'commands/follow',
            'commands/forget',
            'commands/info',
            'commands/pause',
            'commands/resume',
            'commands/stats',
            'commands/unfollow'
          ],
          'Auto-Follow CCR Commands': [
            'commands/auto-follow',
            'commands/delete-auto-follow',
            'commands/get-auto-follow',
            'commands/pause-auto-follow',
            'commands/resume-auto-follow'
          ]
        }
      }
    }
  ]
};
