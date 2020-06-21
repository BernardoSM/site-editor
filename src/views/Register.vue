<template>
	<div class="login">
		<div class="box">
			<div class="title">
				Registrar
			</div>
			<GlobalInput nome="Nome">
				<input type="name" v-model="register.name" placeholder=" ">
			</GlobalInput>
			<GlobalInput nome="Email">
				<input type="name" v-model="register.email" placeholder=" ">
			</GlobalInput>
			<GlobalInput nome="Senha">
				<input type="password" v-model="register.password" placeholder=" ">
			</GlobalInput>
			<div class="error">
				{{ error }}
			</div>
			<router-link to="/login" class="link">
				Já tem uma conta? Fazer login
			</router-link>
			<button class="btn btn-primary" @click="signUp()">
				Enviar
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
				register: {
					name: '',
					email: '',
					password: ''
				},
				error: ''
			}
		},
		methods: {
			...mapActions([
				'registerRequest'
				]),
			signUp() {
				this.registerRequest(this.register).then(resp =>{
					this.$router.push('/login')
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

			.btn {
				margin: 0 auto;
				margin-top: 20px;
			}
		}
	}
</style>