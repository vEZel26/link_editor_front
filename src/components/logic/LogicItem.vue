<script setup>
import MultiSelect from '../MultiSelect.vue';
import { mapGetters, mapState } from 'vuex'
</script>

<script>
export default {
    data () {
        return {
            logic_question_id: 0,
            type_logic: 'ANY',
            checked_answers_logic: [],
            option_for_select: [],
            for_question_id_state: 0
        }
    },
    props: ['question_id', 'type', 'logic_id', 'answers', 'question_object_id', 'for_question_id', 'index'],
    computed: {
        ...mapState({
            question_list: state => state.quiz[0]?.question,
        }),
        ...mapGetters(['getAnswersForQuestion'])
    },
    mounted() {
        this.logic_question_id = this.question_id
        this.type_logic = this.type
        this.checked_answers_logic = this.answers
        this.option_for_select = this.getAnswersForQuestion(this.for_question_id).answer
        this.for_question_id_state = this.for_question_id
        this.$watch('for_question_id_state', (val) => {
            this.option_for_select = this.getAnswersForQuestion(val).answer
            this.checked_answers_logic = [0]
            this.$store.dispatch('EDIT_QEUSTION_LOGIC', {
                logic_question_id: val,
                type_logic: this.type_logic,
                logic_id: this.logic_id,
                question_id: this.logic_question_id,
                answers: this.checked_answers_logic
            })
        })
        this.$watch('type_logic', (val) => {
            this.checked_answers_logic = [0]
            this.$store.dispatch('EDIT_TYPE_LOGIC', {
                logic_question_id: this.for_question_id_state,
                type_logic: val,
                logic_id: this.logic_id,
                question_id: this.logic_question_id,
                answers: this.checked_answers_logic
            })
        })
    },
    methods: {
        delete_logic() {
            this.$store.dispatch('DELETE_LOGIC', {question_id: this.logic_question_id, logic_id: this.logic_id, logic_index: this.index})
        }
    }
}
</script>

<template>
    <div class="logic-item">
        <select v-model="for_question_id_state" class="selector">
            <option v-for="(question, index) in question_list" :value="question.id" :key="question.id">
                {{ `Вопрос ${index +1}` }}
            </option>
        </select>
        <select v-model="type_logic" class="selector">
            <option value="ANY">Равен любому</option>
            <option value="CER">Равен любому из</option>
        </select>
        <select v-model="checked_answers_logic" v-if="type_logic === 'ANY'" class="selector" disabled >
            <option :value="checked_answers_logic">-</option>
        </select>

        <MultiSelect 
        :options="option_for_select"
        v-if="type_logic === 'CER'"
        :selected_option="checked_answers_logic"
        :question_id="for_question_id_state"
        :logic_question_id="logic_question_id"
        :logic_id="logic_id"
        />
        <button @click="delete_logic()" class="delete-logic-btn">
            <img src="../icons/line.svg" class="line-cross" id="line-1"/>
            <img src="../icons/line.svg" class="line-cross" id="line-2"/>
        </button>
    </div>
</template>

<style scoped>
.wrapper-logic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}
.strong-text {
    font-size: 16px;
    font-weight: bold;
}
.list-logic {
    display: flex;
    flex-direction: column;
    padding-left: 0;
}
.logic-item {
    display: flex;
}
.selector {
    width: 230px;
    height: 45px;
    margin: 0 5px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #d7d7d7;
}
.line-cross {
    position: relative;
}
#line-1 {
    transform: rotate(45deg);
    position: absolute;
}
#line-2 {
    transform: rotate(315deg);
    position: absolute;
}
.delete-logic-btn {
    background-color: #ffffff;
    border: none;
}
</style>
