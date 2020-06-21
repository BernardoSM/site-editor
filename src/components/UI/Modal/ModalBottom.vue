<template>
	<div class="body">
		<div class="modal modal-confirm">
			<img class="close" src="@/assets/close-icon-b.png" alt="Fechar" @click="$emit('close')">
			<img class="modal-image" :src="require(`@/assets/${image}-icon-${type}.png`)" alt="Confirmar">
			<div class="text">
				<div class="title">
					{{ title }}
				</div>
				<div class="description">
					{{ description }}
				</div>
			</div>
			<div class="btn" :class="`btn-${type}`" @click="$emit('buttonClick')">
				{{ btnText }}
			</div>
		</div>
		<div class="background" @click="$emit('close')"></div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'description', 'type', 'image', 'btnText']
	}
</script>

<style lang="scss" scoped>
	.body {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 100000;
		box-sizing: border-box;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $black;
		opacity: 0;
		z-index: 100000;
	}

	.modal {
		height: auto;
		width: 100%;
		padding: 20px;
		font-family: $font;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		background: $white;
		border-radius: 30px 30px 0 0;
		box-sizing: border-box;
		z-index: 100001;
		box-shadow: 0px -8px 10px rgba(0, 0, 0, 0.1);
		position: relative;

		.close {
			display: block;
			width: 22px;
			height: auto;
			position: absolute;
			top: 20px;
			right: 20px;
		}

		.modal-image {
			width: auto;
			height: 89px;
			display: block;
			margin: 0 auto;
		}

		.text {
			margin: 20px 0;
			text-align: center;

			.title {
				font-weight: $medium;
				font-size: 14px;
				line-height: 18px;
				color: $black;
				margin-bottom: 6px;
			}

			.description {
				font-weight: $medium;
				font-size: 12px;
				line-height: 16px;
				color: $grey-primary;
			}
		}

		.btn {
			display: flex;
			width: 100%;
			height: 30px;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}

	}
</style>