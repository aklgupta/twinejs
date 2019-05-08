/* An editor for adding and removing tags from a passage. */

const $ = require("jquery");
require("select2");
const Vue = require('vue');
const { updatePassage } = require('../../../data/actions/passage');
const uniq = require('lodash.uniq');

module.exports = Vue.extend({
	data: () => ({
		newVisible: false
	}),

	computed: {
		tagColors() {
			return this.allStories.find(s => s.id === this.storyId).tagColors;
		}
	},

	props: {
		passage: {
			type: Object,
			required: true
		},
		storyId: {
			type: String,
			required: true
		}
	},

	template: require('./index.html'),

	methods: {
		showNew() {
			this.newVisible = true;
			// this.$nextTick(() => this.$els.newName.focus());
			setTimeout(()=>{
				$("#new-tag-select").empty();
				$("#new-tag-select").select2({
					closeOnSelect: true,
					tags: true,
					placeholder:'Tag name',
					allowClear: true,
					data: [""].concat(Object.keys(this.tagColors).filter(x => !this.passage.tags.includes(x))),
				});
				$("#new-tag-select").select2("open");
			}, 1);
		},

		hideNew() {
			this.newVisible = false;
		},

		addNew() {
			const newName = this.$els.newName.value.replace(/\s/g, '-');

			/* Clear the newName element while it's transitioning out. */

			this.$els.newName.value = '';

			this.updatePassage(
				this.storyId,
				this.passage.id,
				{
					tags: uniq([].concat(this.passage.tags, newName))
				}
			);

			this.hideNew();
		}
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories
		},
		actions: { updatePassage }
	},

	components: {
		'tag-menu': require('./tag-menu')
	}
});