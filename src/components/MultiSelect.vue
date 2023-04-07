<script setup>
import { mapGetters, mapState } from 'vuex'
</script>

<script>
export default {
    data () {
        return {
            show: false,
            selected: [],
        }
    },
    methods: {
        showDropdown() {
            this.show = !this.show
        }
    },
    watch: {
        question_id() {
            this.selected = this.getAnswersForLogic(this.selected_option, this.question_id)
        }
    },
    props: ['options', 'selected_option', 'question_id', 'logic_question_id', 'logic_id'],

    computed: {
        ...mapState({
            question_list: state => state.quiz[0]?.question,
        }),
        ...mapGetters(['getAnswersForLogic'])
    },
    mounted() {
        this.selected = this.getAnswersForLogic(this.selected_option, this.question_id)
        this.$watch('selected', (val) => {
            this.$emit('checked', val)
            this.$store.dispatch('EDIT_ANSWERS_LOGIC', {
                logic_question_id: this.logic_question_id,
                logic_id: this.logic_id,
                answers: this.selected
            })
        })
    }
}
</script>

<template>
  <div>
    <div class="dropdown" @click="showDropdown" @blur="showDropdown">
        <div class="overselect"></div>
        <select class="c-from-input" v-on:change.prevent>
            <option value="" id="option-selected">{{ selected.map(item => item.title).join() }}</option>
        </select>
    </div>
    <div class="multiselect" v-if="show">
      <ul id="high-check">
        <ul v-for="(option, index) in options" :key="index" id="check">
          <input type="checkbox" :id="index" :value="{title: option.title, id: option.id, question: question_id}" v-model="selected">
          <label :for="index" class="text-option">{{ option.title }}</label>
        </ul>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper-logic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}
#check {
    padding: 10px;
    border-bottom: 1px solid #d7d7d7;
}
#high-check {
    padding: 10px;
    z-index: 100;
    position: absolute;
    border-radius: 8px;
    border: 1px solid rgba(121, 121, 121, 0);
    box-shadow: 2px 2px 9px 0 rgba(0, 0, 0, 0.19);
    width: 230px;
    background-color: #ffffff;
}
.multiselect {
    position: relative;
    padding-left: 5px;
}
.c-from-input {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 230px;
    height: 45px;
    margin: 0 5px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #d7d7d7;
}
.text-option {
    padding-left: 10px;
    color: #333333;
}
</style>
