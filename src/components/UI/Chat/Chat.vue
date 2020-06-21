<template>
	<div class="chat">
		<div class="messages">
			<Message v-for="(message, i) in messages" :key="i" :text="message.text" 
				:isClerk="isClerk(message.actor_type)" 
				:hasImage="hasImage(i)" 
				:sended="getStatus(message.status)" 
				@deleteMessage="deleteMessage(message)"
				@editMessage="messageToEdit(message)"/>
		</div>
		<div class="input" :class="'size-' + inputSize">
			<span v-if="!focused" class="placeholder">Digite uma mensagem</span>
			<div class="fake-textarea" contenteditable
				:class="{focused}"  
				@focus="textAreaFocus()"
				@focusout="textAreaFocusOut($event)"
				tabindex="1">
			</div>
			<div id="picker" 
				v-show="picker" 
				@focusout="pickerFocusOut()"
				tabindex="0">
				<VEmojiPicker @select="selectEmoji" />
			</div>
			<div class="emoji-button" @click="pickerFocus()">
				<font-awesome-icon :icon="['far', 'grin']" />
			</div>
			<div class="emoji-button" @click="editMessage()">
				<font-awesome-icon :icon="['far', 'edit']" />
			</div>
			<div class="send-button" @click="sendMessage()">
				<font-awesome-icon icon="paper-plane" />
			</div>
		</div>
	</div>
</template>

<script>
	import VEmojiPicker from 'v-emoji-picker'
	import Message from '@/components/UI/Chat/Message.vue'
	import { mapActions } from 'vuex'

	export default {
		components: {
			VEmojiPicker,
			Message,
		},
		data() {
			return {
				picker: false,
				focused: false,
				inputSize: 0,
				message: '',
				fakeText: '',
				messageIdEdit: '',
			}
		},
		computed: {
			messages() {
				return this.$store.getters.getMessages
			}
		},
		methods: {
			...mapActions([
				'messagesRequest',
				'sendMessageRequest',
				'editMessageRequest',
				'deleteMessageRequest'
				]),
			selectEmoji(emoji) {
				document.querySelector('.fake-textarea').innerText = document.querySelector('.fake-textarea').innerText + emoji.data
				this.message = document.querySelector('.fake-textarea').innerText

				this.focused = true
			},
			pickerFocus() {
				this.picker = !this.picker
				setTimeout(() => {
					document.querySelector('#picker').focus()
				}, 100)
		    },
		    pickerFocusOut() {
		        this.picker = false
		    },
		    textAreaFocus() {
		    	this.focused = true
		    },
		    textAreaFocusOut(e) {
		    	this.message = e.target.innerText

		    	if(this.message.length === 0){
		    		this.focused = false
		    	}
		    },
		    resetMessage() {
		    	this.message = ''
		    	this.fakeText = ''
		    	this.messageIdEdit = ''

		    	document.querySelector('.fake-textarea').innerText = ''
		    	this.focused = false
		    },
		    sendMessage(){
		    	this.sendMessageRequest(this.message).then(resp => {
		    		this.doRequests()
		    		this.resetMessage()
		    	})
		    },
		    messageToEdit(message){
		    	this.messageIdEdit = message._id
		    	this.focused = true
		    	document.querySelector('.fake-textarea').innerText = message.text.trim()
		    	this.message = this.fakeText
		    },
		    editMessage(){
		    	const { message, messageIdEdit } = this

		    	this.editMessageRequest({ message, messageIdEdit }).then(resp => {
		    		this.doRequests()
		    		this.resetMessage()
		    	},err => {
		    		this.resetMessage()
		    	})
		    },
		    deleteMessage(message) {
		    	console.log('teste')

		    	this.deleteMessageRequest(message._id).then(resp => {
		    		this.doRequests()
		    	})
		    },
		    isClerk(owner) {
				return owner === 'agent' ? true : false
			},
			hasImage(i) {
				let actor = this.messages[i].actor_type || ''
				let nextActor = ''

				if(typeof this.messages[i + 1] !== "undefined"){
					nextActor = this.messages[i + 1].actor_type || ''
				}
				

				return actor != nextActor ? true : false
			},
			getStatus(status){
				return status != 'pending' ? true : false
			},
			doRequests(){
				this.messagesRequest()
			}
		},
		mounted() {
			this.doRequests()
		}
	}
</script>

<style lang="scss" scoped>
	.chat {
		height: calc(100vh - 171px);
		background: $white;
		border-radius: 20px;
		position: relative;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-flow: column;
		justify-content: space-between;

		@media (max-width: 991px) {
			border-radius: 0;
			height: calc(100vh - 53px);
		}

		.messages {
			font-family: $font;
			height: auto;
			padding: 0 20px;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-flow: column;
			flex-direction: column-reverse;
			scroll-padding-top: 20px;
		}

		.input {
			width: calc(100% - 20px);
			background: $white-dark;
			min-height: 42px;
			height: auto;
			display: flex;
			align-items: flex-end;
			padding: 10px;
			border-bottom-right-radius: 20px;
			border-bottom-left-radius: 20px;
			position: relative;

			@media (max-width: 991px) {
				border-radius: 0;
			}

			.placeholder {
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray-light;
				position: absolute;
				left: 31px;
    			top: 21px;
    			pointer-events: none;
			}

			.fake-textarea {
				width: 100%;
				background: $white;
				border: none;
				outline: 0;
				border-radius: 21px;
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray;
				padding: 11px 21px;
				padding-bottom: 9px;
				white-space: pre-wrap;
    			word-wrap: break-word;
    			cursor: text;
    			height: calc(100% - 20px);
    			max-height: 81px;
    			overflow-y: auto;

    			&.focused {
    				user-select: text;
    			}
			}

			#picker {
				position: absolute;
				bottom: 62px;
				right: 15px;
				outline: none;
			}

			.emoji-button {
				min-width: 42px;
				height: 42px;
				border-radius: 21px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: $white-dark;
				cursor: pointer;
				margin: 0 10px;

				@media (max-width: 991px) {
					display: none;
				}

				&:hover {

					svg {
						color: $gray;
					}
				}

				svg {
					font-size: 22px;
					color: $gray-light;
				}
			}

			.send-button {
				min-width: 42px;
				height: 42px;
				border-radius: 21px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: $primary;
				cursor: pointer;
				margin: 0 10px;

				svg {
					font-size: 16px;
					color: $white;
				}
			}
		}
	}
</style>