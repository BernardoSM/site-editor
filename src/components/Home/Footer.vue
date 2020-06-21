<template>
	<div class="footer">
		<div class="container">
			<div class="editor">
				<editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
				  <div
				    class="menububble"
				    :class="{ 'is-active': menu.isActive }"
				    :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
				  >

				    <button
				      class="menububble__button"
				      :class="{ 'is-active': isActive.bold() }"
				      @click="commands.bold"
				    >
				      B
				    </button>

				    <button
				      class="menububble__button"
				      :class="{ 'is-active': isActive.italic() }"
				      @click="commands.italic"
				    >
				      I
				    </button>

				    <button
				      class="menububble__button"
				      :class="{ 'is-active': isActive.code() }"
				      @click="commands.code"
				    >
				      Code
				    </button>

				  </div>
				</editor-menu-bubble>

				<editor-content class="editor__content" :editor="editor" />
			</div>
		</div>
		<div class="menu">
			<div class="versions">
				<div v-for="(site, i) in sites" :key="i" @click="setVersion(site)" class="version">
					Versão {{ i+1 }}
				</div>
			</div>
			<div class="buttons">
				<button class="btn" @click="createSite()">
					Criar
				</button>
				<button class="btn btn-primary" @click="editSite()">>
					Salvar
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
	import {
	  Blockquote,
	  BulletList,
	  CodeBlock,
	  HardBreak,
	  Heading,
	  ListItem,
	  OrderedList,
	  TodoItem,
	  TodoList,
	  Bold,
	  Code,
	  Italic,
	  Link,
	  Strike,
	  Underline,
	  History,
	} from 'tiptap-extensions'
	import { mapActions } from 'vuex'

	export default {
	  components: {
	    EditorContent,
	    EditorMenuBubble,
	  },
	  data() {
	    return {
	    	currentSite: '',
	      keepInBounds: true,
	      editor: new Editor({
	        extensions: [
	          new Blockquote(),
	          new BulletList(),
	          new CodeBlock(),
	          new HardBreak(),
	          new Heading({ levels: [1, 2, 3] }),
	          new ListItem(),
	          new OrderedList(),
	          new TodoItem(),
	          new TodoList(),
	          new Link(),
	          new Bold(),
	          new Code(),
	          new Italic(),
	          new Strike(),
	          new Underline(),
	          new History(),
	        ],
	        content: `
	          <h2>
	            Trabalho ES2
	          </h2>
	          <p>
	            Aqui eu posso editar qualquer texto, então estou simulando um criador / editor de sites.
	          </p>
	        `,
	      }),
	    }
	  },
	  computed: {
	  	sites() {
	  		return this.$store.getters.getSites.reverse()
	  	},
	  },
	  methods: {
	  	...mapActions(['sendSiteRequest', 'sitesRequest', 'editSiteRequest']),
	  	createSite() {
	  		this.sendSiteRequest(this.editor.getHTML()).then(resp => {
	  			this.sitesRequest()
	  		})
	  	},
	  	editSite() {
	  		this.currentSite.text = this.editor.getHTML()

	  		this.editSiteRequest(this.currentSite).then(resp => {
	  			this.sitesRequest()
	  		})
	  	},
	  	setVersion(site) {
	  		this.currentSite = site
	  		this.editor.setContent(site.text)
	  	}
	  },
	  beforeDestroy() {
	    this.editor.destroy()
	  },
	  mounted() {
	  	this.sitesRequest().then(resp => {
	  		this.editor.setContent(this.sites[this.sites.length - 1].text)
	  	})
	  }
	}
</script>

<style lang="scss" scoped>
	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 61px;
		width: 100%;
		font-weight: $regular;
		font-size: 18px;
		line-height: 21px;
		color: $gray-light;

		.container {
			text-align: center;
		}

		.menu {
			position: fixed;
			bottom: 20px;
			left: 20px;
			width: 100%;
			max-width: 260px;
			height: 300px;
			border-radius: 10px;
			padding: 20px;
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			background: rgba($primary, 0.3);

			.versions {
				width: 100%;
				max-height: 224px;
				overflow: auto;

				.version {
					font-weight: $medium;
					color: $gray;
					font-size: 16px;
					text-align: center;
					width: 100%;
					padding: 8px 0px;
					background: $white;

					&:nth-child(2) {
						background: $white-secondary;
					}
				}
			}

			.buttons {
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>