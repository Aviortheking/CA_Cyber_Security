import { GetServerSideProps } from 'next'
import React from 'react'
import Image from 'next/image'
import Router from 'next/router'
import GoogleClient from '../libs/GoogleClient'
import css from './style.module.styl'
import URLManager from '@dzeio/url-manager'

interface Props {
	code: string
	email: string
	id: string
}

export default class Index extends React.Component<Props> {
	public render = () => (
		<div className={css.parent}>
			<div className={css.boxWrapper}>
				<Image src="/google.svg" width={75} height={24} />
				<p className={css.txt}>Code: {this.props.code}</p>
				<p className={css.txt}>Email: {this.props.email}</p>
				<i className={css.txt}>Id: {this.props.id}</i>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	const { code } = ctx.query as { code: string }
	try {
		const infos = await GoogleClient.processCode(code)
		if (!infos.email || !infos.id) {
			return {
				redirect: {
					destination: '/',
					statusCode: 301
				},
			}
		}
		return {
			props: {
				code,
				email: infos.email,
				id: infos.id
			}
		}
	} catch (e) {
		console.log(e)
		return {
			redirect: {
				destination: '/',
				statusCode: 301
			},
		}
	}
	
}