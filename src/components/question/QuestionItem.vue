<script setup>
import DividerItem from '../DividerItem.vue'
import QuestionLogic from '../logic/QuestionListLogic.vue'
</script>

<script>
export default {
    data () {
        return {
            question: '',
            edit_answer_state: {
              status: false,
              index: null,
            }
        }
    },
    methods: {
      add_answer(title, question_id) {
        this.$store.dispatch('ADD_ANSWER', {title, question_id})
      },
      delete_answer(question_index, answer_index, answer_id) {
        this.$store.dispatch('DELETE_ANSWER', {question_index, answer_index, answer_id})
      },
      edit_answer(index) {
        this.edit_answer_state.status = true
        this.edit_answer_state.index = index
      },
      complete_edit_answer(question_id, title, id) {
        this.$store.dispatch('EDIT_ANSWER', {question_id, title, id})
        this.edit_answer_state.status = false
        this.edit_answer_state.index = null
      },
      save_text_question(id, title) {
        this.$store.dispatch('PATCH_EDIT_TEXT_QUESTION', {id, title})
      },
      delete_question(id, index) {
        this.$store.dispatch('DELETE_QUESTION', {id, index})
      }
    },
    props: ['question_object', 'pos', 'question_object_id']
}
</script>

<template>
  <div class="wrapper">
    <text class="strong-text">Вопрос {{ this.pos + 1 }}</text>
    <input 
      v-model="question_object.title"
      placeholder="Введите текст вопроса"
      class="text-question"
      @input="event => save_text_question(question_object.id, question_object.title)"
    />
    <ul v-for="(item, index) in question_object.answer" class="answer-list" :key="item.id">
      <div class="item-answer">
        <div>
          <input type="radio" :value="item.title" :id="index" name="answer-list" class="radio"/>
          <input v-model="item.title" placeholder="Введите текст ответа" v-if="edit_answer_state.status === true && edit_answer_state.index === index" class="answer-input"
          @keyup.enter.prevent="complete_edit_answer(question_object.id, item.title, item.id)">
          <text v-if="edit_answer_state.index !== index" :for="index">{{ item.title }}</text>
        </div>
        <div>
          <button @click="edit_answer(index)" v-if="edit_answer_state.index !== index" class="btn">
            <img src="../icons/edit.svg"/>
          </button>
          <button @click="delete_answer(this.pos, index, item.id)" class="btn">
            <img src="../icons/delete.svg"/>
          </button>
        </div>

      </div>
    </ul>
    <DividerItem v-if="question_object.answer.length > 0"/>
    <QuestionLogic :logic_array="question_object.logic" :question_object_id="question_object.id" v-if="question_object.answer.length > 0"/>
    <div class="bottom-btn-wrapper">
      <div class="add-container">
        <select class="type-question">
          <option>Один из списка</option>
        </select>
        <button @click="add_answer(`Ответ ${question_object.answer.length + 1}`, question_object.id)" class="add-answer">+ Добавить ответ</button>
        <div class="logic-icon-container">
          <img src="../icons/logic.svg" class="icon-logic"/>
          <div class="check-container" v-if="question_object.logic.length > 0">
            <img src="../icons/logic_check.svg" class="logic-check"/>
          </div>
        </div>
      </div>
      <div class="edit-question-button">
        <button class="delete-question-btn">
          <img src="../icons/copy.svg"/>
        </button>
        <button @click="delete_question(question_object.id, pos)" class="delete-question-btn">
          <img src="../icons/delete.svg"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    border: 1px solid #d7d7d7;
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;
}
.answer-list {
  padding-left: 5px;
}
.text-question {
  width: 720px;
  height: 45px;
  padding: 20px 15px;
  color: #333333;
  font-size: 14px;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  margin-bottom: 20px;
}
.strong-text {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}
.item-answer:hover {
  background-color: #f2f2f2;
  border-radius: 8px;
}
.item-answer {
  width: 715px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.radio {
  margin-right: 8px;
}
.btn {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
.btn:hover {
  background-color: rgb(215, 215, 215);
  border-radius: 8px;
}
.add-answer {
  border-radius: 4px;
  height: 45px;
  width: 170px;
  background-color:#d7d7d7;
  border: none;
  color: #333333;
}
.add-answer:hover {
  background-color: #bdbdbd;
}
.bottom-btn-wrapper {
  display: flex;
  justify-content: space-between;
}
.delete-question-btn {
  height: 40px;
  width: 40px;
  background-color: #ffffff;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  margin: 0 6px;
}
.delete-question-btn:hover {
  background-color: #d7d7d7;
}
.edit-question-button {
  display: flex;
}
.type-question {
  width: 260px;
  height: 45px;
  margin-right: 15px;
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #d7d7d7;
}
.add-container {
  display: flex;
}
.icon-logic {
  transform: rotate(270deg);
}
.logic-icon-container {
  height: 45px;
  width: 45px;
  margin-left: 10px;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  text-align: center;
  padding: 7px 0;
}
.check-container {
  background-color: #7f7f7f;
  width: 15px;
  height: 15px;
  border: 1px solid rgba(215, 215, 215, 0);
  border-radius: 15px;
  position: absolute;
  top: -5px;
  right: -5px;
}
.logic-check {
  position: absolute;
  left: 3.5px;
  top: 4px;
}
.answer-input {
  width: 500px;
  border: 1px solid #d7d7d7;
  padding: 5px;
  border-radius: 4px;
}
</style>
