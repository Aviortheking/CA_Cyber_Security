import URLManager from '@dzeio/url-manager'

interface userInformations {
	family_name: string
	name: string
	picture: string
	locale: string
	email: string
	given_name: string
	id: string
	verified_email: boolean
}

export default class GoogleClient {

	public static config = {
		clientID: process.env.GOOGLE_CLIENT_ID || '',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		redirectURI: process.env.GOOGLE_REDIRECT || ''
	}

	public static scopes = [
		'email',
		'https://www.googleapis.com/auth/userinfo.profile'
	]


	public static getUrl(): string {
		return new URLManager('https://accounts.google.com/o/oauth2/v2/auth')
			.query('client_id', this.config.clientID || '')
			.query('redirect_uri', this.config.redirectURI || '')
			.query('response_type', 'code')
			.query('scope', this.scopes.join(encodeURI(' ')))
			.toString()
	}

	public static async processCode(code: string): Promise<{id: string, email: string}> {
		// Fetch Access Token
		const url1 = new URLManager()
			.query('code', code)
			.query('redirect_uri', encodeURI(this.config.redirectURI))
			.query('client_id', this.config.clientID)
			.query('client_secret', this.config.clientSecret)
			.query('grant_type', 'authorization_code')

		const { access_token }: {access_token: string} = await fetch('https://oauth2.googleapis.com/token', {
			body: url1.toString().substr(1),
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((resp) => resp.json())

		// Fetch informations
		const { id, email }: userInformations = await fetch('https://www.googleapis.com/userinfo/v2/me', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}).then((resp) => resp.json())

		return {
			id,
			email
		}
	}
}