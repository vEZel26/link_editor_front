import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/main.css'
import axios from 'axios'

const API = 'http://158.160.29.67/api'

const store = createStore({
    state () {
      return {
        quiz: {
            id: null,
            title: '',
            date_of_ending: null,
            question: [],
        }
      }
    },
    mutations: {
      SET_QUIZ: (state, payload) => {
        state.quiz = payload;
      },
      EDIT_TEXT_QUESTION: (state, payload) => {
        let question_for_edit = state.quiz[0].question.find((item) => item.id === payload.id)
        question_for_edit = payload
      },
      ADD_QUESTION: (state, payload) => {
        state.quiz[0].question.push(payload)
      },
      DELETE_QUESTION: (state, payload) => {
        state.quiz[0].question.splice(payload.index, 1)
      },
      ADD_ANSWER: (state, payload) => {
        let question_for_edit = state.quiz[0].question.find((item) => item.id === payload.question)
        question_for_edit.answer.push(payload)
      },
      EDIT_TITLE_ANSWER: (state, payload) => {
        let answer_for_edit = state.quiz[0].question.find((item) => item.id === payload.question_id).answer.find((item) => item.id === payload.data.id)
        answer_for_edit = payload.data
      },
      DELETE_ANSWER: (state, payload) => {
        state.quiz[0].question[payload.question_index].answer.splice(payload.answer_index, 1)
      },
      EDIT_QUESTION_LOGIC: (state, payload) => {
        let logic_for_edit = state.quiz[0].question.find((item) => item.id === payload.question_id).logic.find((item) => item.id === payload.logic_id)
        logic_for_edit = payload.data
      },
      EDIT_TYPE_LOGIC: (state, payload) => {
        let logic_for_edit = state.quiz[0].question.find((item) => item.id === payload.question_id).logic.find((item) => item.id === payload.logic_id)
        logic_for_edit = payload.data
      },
      EDIT_ANSWERS_LOGIC: (state, payload) => {
        let logic_for_edit = state.quiz[0].question.find((item) => item.id === payload.question_id).logic.find((item) => item.id === payload.logic_id)
        logic_for_edit = payload.data
      },
      ADD_LOGIC: (state, payload) => {
        state.quiz[0].question.find((item) => item.id === payload.question_id).logic.push(payload.data)
      },
      DELETE_LOGIC: (state, payload) => {
        state.quiz[0].question.find((item) => item.id === payload.question_id).logic.splice(payload.logic_index, 1)
      },
      EDIT_TEXT_QUIZ: (state, payload) => {
            let quiz = state.quiz[0]
            quiz = payload
      },
      EDIT_DATE_QUIZ: (state, payload) => {
        let quiz = state.quiz[0]
        quiz.date_of_ending = payload
      }
    },
    actions: {
        GET_QUIZ: async (context) => {
            const response = await axios.get(`${API}/quiz/`)
            context.commit('SET_QUIZ', response.data)
        },
        PATCH_EDIT_TEXT_QUESTION: async (context, payload) => {
            const response = await axios.patch(`${API}/question/${payload.id}/`, {title: payload.title})
            context.commit('EDIT_TEXT_QUESTION', response.data)
        },
        ADD_QUESTION: async (context, payload) => {
            const response = await axios.post(`${API}/question/`, {quiz: payload.quiz_id})
            context.commit('ADD_QUESTION', response.data)
        },
        DELETE_QUESTION: async (context, payload) => {
            await axios.delete(`${API}/question/${payload.id}/`)
            context.commit('DELETE_QUESTION', payload.index)
        },
        ADD_ANSWER: async (context, payload) => {
            const response = await axios.post(`${API}/answer/`, {title: payload.title, question: payload.question_id})
            context.commit('ADD_ANSWER', response.data)
        },
        EDIT_ANSWER: async (context, payload) => {
            const response = await axios.patch(`${API}/answer/${payload.id}/`, {title: payload.title})
            context.commit('EDIT_TITLE_ANSWER', {question_id: payload.question_id, data: response.data})
        },
        DELETE_ANSWER: async (context, payload) => {
            await axios.delete(`${API}/answer/${payload.answer_id}/`)
            context.commit('DELETE_ANSWER', {question_index: payload.question_index, answer_index: payload.answer_index})
        },
        EDIT_QEUSTION_LOGIC: async (context, payload) => {
            const response = await axios.patch(`${API}/logic/${payload.logic_id}/`, {
                question: payload.question_id,
                answers: [0],
                type: payload.type_logic,
                for_question: payload.logic_question_id
            })
            context.commit('EDIT_QUESTION_LOGIC', {question_id: payload.logic_question_id, logic_id: payload.logic_id, data: response.data})
        },
        EDIT_TYPE_LOGIC: async (context, payload) => {
            const response = await axios.patch(`${API}/logic/${payload.logic_id}/`, {
                question: payload.question_id,
                answers: [0],
                type: payload.type_logic,
                for_question: payload.logic_question_id
            })
            context.commit('EDIT_TYPE_LOGIC', {question_id: payload.logic_question_id, logic_id: payload.logic_id, data: response.data})
        },
        EDIT_ANSWERS_LOGIC: async (context, payload) => {
            const response = await axios.patch(`${API}/logic/${payload.logic_id}/`, {
                answers: payload.answers.length !== 0 ? payload.answers.map((item) => item.id) : [0],
            })
            context.commit('EDIT_ANSWERS_LOGIC', {question_id: payload.logic_question_id, logic_id: payload.logic_id, data: response.data})

        },
        ADD_LOGIC: async (context, payload) => {
            const response = await axios.post(`${API}/logic/`, {
                question: payload.question_id,
                type: 'ANY',
                for_question: context.state.quiz[0].question[0].id,
                answers: [0]
            })
            context.commit('ADD_LOGIC', {question_id: payload.question_id, data: response.data})
        },
        DELETE_LOGIC: async (context, payload) => {
            await axios.delete(`${API}/logic/${payload.logic_id}/`)
            context.commit('DELETE_LOGIC', {question_id: payload.question_id, logic_index: payload.logic_index})
        },
        EDIT_TEXT_QUIZ: async (context, payload) => {
            const response = await axios.patch(`${API}/quiz/${payload.id}/`, {title: payload.title})
            context.commit('EDIT_TEXT_QUIZ', response.data)
        },
        EDIT_DATE_QUIZ: async (context, payload) => {
            const response = await axios.patch(`${API}/quiz/${payload.id}/`, {date_of_ending: payload.date})
            context.commit('EDIT_DATE_QUIZ', response.data.date_of_ending)
        }
    },
    getters: {
        getAnswersForQuestion: (state) => (id) => {
            return state.quiz[0].question.find(question => question.id === id)
        },
        getAnswersForLogic: (state) => (ids_answers, question_id) => {
            return state.quiz[0].question.find(question => question.id === question_id).answer.filter(answers => ids_answers.includes(answers.id))
        },
        getQuiz: (state) => () => {
            console.log(state.quiz[0].title, 'state')
            return state?.quiz[0]?.title
        }
    }
  })

const app = createApp(App)

app.use(store).mount('#app')
