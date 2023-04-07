<script setup>
import { mapGetters, mapState } from 'vuex'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
</script>

<script>
export default {
    props: ['quiz'],
    data () {
        return {
          quiz_title: ''
        }
    },
    methods: {
      save_text_quiz(id, title) {
        this.$store.dispatch('EDIT_TEXT_QUIZ', {id, title})
      },
      handleDate(modelData) {
        const day = modelData.getDate();
        const month = modelData.getMonth() + 1;
        const year = modelData.getFullYear();
        const date = `${year}-${month}-${day}`
        this.$store.dispatch('EDIT_DATE_QUIZ', {id: this.quiz.id, date})
      }
    },
    created() {
      this.$store.dispatch('GET_QUIZ')
    },
}
</script>

<template>
  <div>
    <div class="header-step">
      <div class="steps">
        <div class="step">
          <div class="cnt-step">1</div>
          <text class="text-step">Создание опроса</text>
        </div>
        <div class="step">
          <div class="cnt-step cnt-step-2">2</div>
          <text class="text-step text-step-2">Параметры запуска</text>
        </div>
      </div>
      <div class="test">
        <img src="../icons/eye.svg"/>
        <text class="text-test">Тестовый просмотр</text>
      </div>
    </div>
    <div class="quiz-container">
      <div class="header-quiz">
        <text class="new-quiz-text">Новый опрос</text>
        <div class="maket">
            <text>Черновик</text>
        </div>
      </div>
      <text id="cnt-question">Вы можете добавить до 20 вопросов в опрос</text>
      <input placeholder="Введите название опроса" v-model="this.quiz.title" @input="event => save_text_quiz(quiz.id, quiz.title)" class="text-quiz"/>
      <text id="date">Укажите дату завершения опроса</text>
      <VueDatePicker v-model="this.quiz.date_of_ending" :format="format" @update:model-value="handleDate" class="date-picker"></VueDatePicker>
    </div>
  </div>
    
</template>

<style scoped>
.add-question {
  background-color: #c3c1c1;
}
.quiz-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #d7d7d7;
  padding: 32px;
  border-radius: 8px;
  margin: 20px 0;
}
.new-quiz-text {
    font-size: 24px;
    font-weight: 700;
}
#cnt-question {
    font-size: 16px;
    color: #333333;
    margin-bottom: 20px;
}
.text-quiz {
    width: 720px;
    height: 45px;
    padding: 15px 20px;
    margin-bottom: 15px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
}
#date {
    font-size: 16px;
    color: #333333;
}
.date-picker {
    width: 350px;
    height: 45px;
}
.header-quiz {
    display: flex;
    justify-content: space-between;
}
.maket {
    border: 1px solid #7f7f7f;
    border-radius: 20px;
    width: 115px;
    height: 30px;
    text-align: center;
    padding: 2.5px;
    color: #7f7f7f;
    font-size: 13px;
}
.header-step {
  display: flex;
  justify-content: space-between;
}
.step {
  display: flex;
  margin-right: 30px;
  align-content: center;
}
.cnt-step {
  border: 1px solid #555555;
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  padding: 3.5px 0;
  margin-right: 10px;
}
.steps {
  display: flex;
}
.text-step {
  padding-top: 5px;
}
.cnt-step-2 {
  border: 1px solid #7f7f7f;
  color: #7f7f7f
}
.text-step-2 {
  color: #7f7f7f;
}
.test {
  display: block;
  height: 16px;
  text-align: center;
  padding-top: 5px;
}
.text-test {
  color: #555555;
  font-size: 16px;
  padding-top: 0;
  margin-left: 5px;
}
</style>
