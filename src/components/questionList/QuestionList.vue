<script setup>
import QuestionItem from '../question/QuestionItem.vue'
import QuizHeader from '../quizHeader/QuizHeader.vue'
import { mapState } from 'vuex'

</script>

<script>
export default {
    props: [''],
    data () {
        return {
        }
    },
    methods: {
      add_question(quiz_id) {
        this.$store.dispatch('ADD_QUESTION', {quiz_id})
      },
      delete_question(index, id) {
        this.$store.dispatch('DELETE_QUESTION', {index, id})
        this.question_list.splice(index, 1)
      },
      save_text_quiz(id, title) {
        console.log(title)
        this.$store.dispatch('EDIT_TEXT_QUIZ', {id, title})
      },
    },
    created() {
      this.$store.dispatch('GET_QUIZ')
    },
    computed: {

     ...mapState({
      question_list: state => state.quiz[0]?.question,
      quiz_id: state => state.quiz[0].id,
      quiz: state => state.quiz[0]
    })
  },
}
</script>

<template>
  <div >
    <QuizHeader :quiz="this.quiz" v-if="quiz"/>
    <QuestionItem @delete_question="delete_question" v-for="(item, index) in question_list" :key="index" :question_object="item" :pos="index"/>
  </div>

  <button class="add-question" @click="add_question(quiz_id)">+ Добавить вопрос</button>
  <div class="btn-group-footer">
    <button class="footer-button" id="save-maket">Сохранить черновик</button>
    <button class="footer-button" id="parameter">Перейти к параметрам</button>
  </div>
</template>

<style scoped>
.add-question {
  background-color: #f2f2f2;
  width: 800px;
  border: none;
  border-radius: 8px;
  height: 45px;
  text-align: center;
  color: #333333;
  font-size: 16px;
  font-weight: 500;
}
.btn-group-footer {
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin-top: 25px;
}
.footer-button {
  border-radius: 8px;
  height: 45px;
  width: 380px;
  font-size: 16px;
  font-weight: 500;
}
#save-maket {
  border: 1px solid #7f7f7f;
  background-color: #ffffff;
  color: #7f7f7f;
}
#parameter {
  border-radius: 8px;
  border: none;
  background-color: #1e98d7;
  color: #ffffff;
}
</style>
