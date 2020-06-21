<template>
	<div class="login">
		<div class="box">
			<div class="title">
				Login
			</div>
			<GlobalInput nome="Email">
				<input type="name" v-model="login.email" placeholder=" ">
			</GlobalInput>
			<GlobalInput nome="Senha">
				<input type="password" v-model="login.password" placeholder=" ">
			</GlobalInput>
			<div class="error">
				{{ error }}
			</div>
			<router-link to="/register" class="link">
				Não tem uma conta? Registre-se
			</router-link>
			<button class="btn btn-primary" @click="signIn()">
				Fazer login
			</button>
		</div>
	</div>
</template>

<script>
	import GlobalInput from '@/components/UI/Form/GlobalInput.vue'
	import { mapActions } from 'vuex'

	export default {
		components: {
			GlobalInput
		},
		data() {
			return {
				login: {
					email: '',
					password: ''
				},
				error: ''
			}
		},
		methods: {
			...mapActions([
				'authRequest'
				]),
			signIn() {
				this.authRequest(this.login).then(resp =>{
					this.$router.push('/')
				}, err => {
					this.error = err.response.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100vw;
		height: 100vh;
		background: $primary;
		display: flex;
		justify-content: center;
		align-items: center;

		.box {
			background: $white;
			padding: 20px;
			width: 80vw;
			max-width: 400px;
			box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
			border-radius: 5px;

			.title {
				font-size: 18px;
				text-align: center;
				margin-bottom: 20px;
			}

			.global-input {
				margin-bottom: 8px;
			}

			.link {
				text-align: center;
				display: block;
				margin-top: 20px;
			}

			.error {
				color: #e74c3c;
			}

			.btn {
				margin: 0 auto;
				margin-top: 20px;
			}
		}
	}
</style>