import App from 'next/app'
import React from 'react'

import './general.styl'

export default class Application extends App {

	public render() {
		const { Component, pageProps } = this.props

		return <Component {...pageProps} />
	}
}