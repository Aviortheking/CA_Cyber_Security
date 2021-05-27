import { GetServerSideProps } from 'next'
import React from 'react'
import Image from 'next/image'
import Router from 'next/router'
import GoogleClient from '../libs/GoogleClient'
import css from './style.module.styl'

interface Props {
	oauth: string
}

export default class Index extends React.Component<Props> {
	public render = () => (
		<div className={css.parent}>
			<div className={css.boxWrapper}>
				<Image src="/google.svg" width={75} height={24} />
				<p className={css.title}>Connexion</p>
				<p className={css.txt}>Utiliser votre compote Google</p>
				<i className={css.sub}>S'il ne s'agit pas de votre ordinateur, blablabla, En savoir plus</i>
				<a className={css.button} href={this.props.oauth}>Google</a>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	return {
		props: {
			oauth: GoogleClient.getUrl()
		}
	}
}