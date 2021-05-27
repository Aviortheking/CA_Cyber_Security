const stylus = require('next-pre-css')
const withPlugins = require('next-compose-plugins')
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = withPlugins([
		[stylus, {
			cssModules: true,
			cssLoaderOptions: {
				localIdentName: "[hash:base64:6]",
			},
			[PHASE_DEVELOPMENT_SERVER]: {
				cssLoaderOptions: {
					localIdentName: "[path][name]__[local]"
				}
			}
		}]
	], {
		experimental: {
			modern: true
		},
		images: {
			domains: [
				'external-content.duckduckgo.com'
			]
		},
		future: {
			webpack5: true,
			strictPostcssConfiguration: true
		}
	}
)