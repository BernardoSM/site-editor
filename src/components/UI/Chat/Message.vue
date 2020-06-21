<template>
	<div class="message" :class="{clerk: isClerk}">
		<div class="picture" v-if="hasImage">
			<template v-if="isClerk">
				<img :src="require(`@/assets/lia-icon.png`)" alt="Atendente">
			</template>
		</div>
		<div class="content">
			<div v-if="!isClerk" class="status">
				<img v-if="sended" src="@/assets/message-delete.png" alt="Status" @click="$emit('deleteMessage')">
				<img v-else src="@/assets/message-watch.png" alt="Status">
			</div>
			<div class="text" @click="$emit('editMessage')">
				{{ text }}
			</div>
			<div v-if="notOption" class="buttons">
				<button class="btn btn-secondary">Opção 01</button>
				<button class="btn btn-secondary">Opção 02</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			text: String,
			buttons: Array,
			isClerk: {
				type: Boolean,
				default: false
			},
			notOption: {
				type: Boolean,
				default: false
			},
			hasImage: Boolean,
			sended: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			userData() {
				return this.$store.getters.getUserData
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: flex-end;

		&:last-child {

			.content {
				margin-top: 20px;
			}
		}

		&:first-child {

			.content {
				margin-bottom: 20px;
			}
		}

		&.clerk {
			align-items: flex-start;
			padding-left: 34px;
			width: calc(100% - 34px);
			justify-content: flex-start;

			.content {
				background: $white-dark;

				.text {
					padding-right: 0;
				}
			}

			.picture {
				justify-content: flex-start;
			}
		}

		.content {
			background: lighten( $primary, 25% );
			border-radius: 21px;
			padding: 12px 18px;
			box-sizing: border-box;
			position: relative;
			margin-bottom: 8px;
			max-width: 100%;
			word-break: break-all;

			.status {
				position: absolute;
				top: 14px;
				right: 15px;

				img {
					width: 14px;
					height: auto;
					display: block;
				}
			}

			.text {
				width: 100%;
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray;
				padding-right: 18px;
			}

			.buttons {
				flex-wrap: wrap;
				display: block;

				button {
					margin-right: 6px;
					margin-top: 12px;
					border-radius: 5px;
					font-size: 10px;
					line-height: 12px;
					padding: 6px 12px;
					
				}
			}
		}

		.picture {
			display: flex;
			justify-content: flex-end;
			width: 100%;
			margin-bottom: 8px;
			margin-bottom: 6px;
			position: absolute;
			top: 0;
			left: 0;

			img {
				border-radius: 50%;
				display: block;
				width: 24px;
				height: 24px;
			}
		}
	}
</style>