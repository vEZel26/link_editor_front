<script setup>
import DividerItem from '../DividerItem.vue'
import { mapGetters, mapState } from 'vuex'
import LogicItem from './LogicItem.vue';
</script>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        add_logic(question_id) {
            this.$store.dispatch('ADD_LOGIC', {question_id})
        },

    },
    props: ["logic_array", 'question_object_id'],
    computed: {
        ...mapState({
            question_list: state => state.quiz[0]?.question,
        }),
        ...mapGetters(["getAnswersForQuestion"])
    },
    components: { LogicItem }
}
</script>

<template>
  <div class="wrapper-logic">
    <text class="strong-text">Показывать этот вопрос, если</text>
    <div class="list-logic">
        <LogicItem v-for="(item, index) in logic_array" :key="item.id"
            :question_id="item.question"
            :type="item.type"
            :logic_id="item.id"
            :answers="item.answers"
            :question_object_id="this.question_object_id"
            :for_question_id="item.for_question"
            :index="index"
    />
    </div>
    <div class="btn-logic">
        <button @click="add_logic(this.question_object_id)" class="btn-scenario">Добавить условие</button>
        <button disabled class="btn-scenario">Удалить сценарий</button>
    </div>
    <DividerItem/>
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
    font-weight: 500;
    margin-bottom: 10px;
}
.list-logic {
    display: flex;
    flex-direction: column;
    padding-left: 0;
}
.btn-logic {
    display: flex;
    justify-content: space-between;
    margin: 15px 0
}
.btn-scenario {
  border-radius: 4px;
  border: 1px solid #7f7f7f;
  background-color: #ffffff;
  width: 200px;
  height: 45px;
  color:#7f7f7f;
  font-size: 16px;
}
.btn-scenario:hover {
    background-color: #cfcfcf;
}
</style>
