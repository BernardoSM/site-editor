<template>
	<div id="home">
		<HomeHeader/>
		<div class="container">
			<HomeFooter/>
		</div>
	</div>
</template>

<script>
	import HomeHeader from '@/components/Home/Header.vue'
	import HomeFooter from '@/components/Home/Footer.vue'

	export default {
		components: {
			HomeHeader,
			HomeFooter
		}
	}
</script>

<style lang="scss">
	#home {
		width: 100%;
		height: 100vh;
		background: $white-secondary;

		.container {
			width: 100%;
			max-width: 1390px;
			height: 100%;
			margin: 0 auto;
			position: relative;

			@media (max-width: 1390px) {
				max-width: 991px;
			}
		}
	}

</style>