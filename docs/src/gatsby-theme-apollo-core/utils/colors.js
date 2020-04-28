// src/gatsby-theme-apollo-core/utils/colors.js
const { colors } = require("gatsby-theme-apollo-core/src/utils/colors")
const { colors: spaceKitColors } = require("@apollo/space-kit/colors")

console.log(colors)
exports.colors = {
  ...colors,
  primary: spaceKitColors.yellow.base,
  divider: spaceKitColors.black.base,
  primaryLight: spaceKitColors.black.base,
}
