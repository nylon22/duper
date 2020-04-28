module.exports = {
  pathPrefix: "docs",
  siteMetadata: {
    siteName: `duper`,
    title: `duper Docs`,
    description: `A command line tool that makes administering Elasticsearch Cross-cluster Replication easy`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/source/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `duper-docs`,
        short_name: `dupergraphql`,
        start_url: `/`,
        background_color: `#0E2339`,
        theme_color: `#0E2339`,
        display: `minimal-ui`,
        icon: `src/gatsby-theme-apollo-core/components/logo.svg`,
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: false,
      },
    },
    {
      resolve: "gatsby-theme-apollo-docs",
      options: {
        siteName: "duper",
        menuTitle: "duper documentation",
        version: "1",
        fields: {
          version: "1",
        },
        baseUrl: "https://duper.github.io",
        contentDir: "source",
        root: __dirname,
        subtitle: "duper documentation",
        twitterHandle: "tyson_warner",
        description:
          "A command line tool that makes administering Elasticsearch Cross-cluster Replication (CCR) easy",
        githubRepo: "nylon22/duper",
        defaultVersion: "0.4",
        logoLink: "https://duper.github.io",
        navConfig: {
          Github: {
            url: "https://github.com/nylon22/duper",
            description: "duper on Github",
          },
        },
        sidebarCategories: {
          null: ["index", "getting-started"],
          "Configuration Commands": [
            "commands/config-add-cluster",
            "commands/config-delete-cluster",
            "commands/config-list",
            "commands/config-set-follower-cluster",
            "commands/config-set-leader-cluster",
          ],
          "Enable CCR Commands": [
            "commands/connect",
            "commands/enable-soft-deletes",
          ],
          "CCR Commands": [
            "commands/follow",
            "commands/forget",
            "commands/info",
            "commands/pause",
            "commands/resume",
            "commands/stats",
            "commands/unfollow",
          ],
          "Auto-Follow CCR Commands": [
            "commands/auto-follow",
            "commands/delete-auto-follow",
            "commands/get-auto-follow",
            "commands/pause-auto-follow",
            "commands/resume-auto-follow",
          ],
        },
      },
    },
  ],
}
