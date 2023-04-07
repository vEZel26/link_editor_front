<script setup>
import QuestionList from './components/questionList/QuestionList.vue'
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <text class="text-logo">Логотип</text>
        <img src="./components/icons/logo.svg"/>
      </div>
      <div class="tabs">
        <text class="tab" id="active-tab">Опросы</text>
        <text class="tab">Пользователи</text>
        <text class="tab">Черные списки</text>
      </div>
      <div class="right-tabs">
        <button class="create-quiz">Создать опрос</button>
        <img src="./components/icons/push.svg" class="push"/>
        <div class="cabinet">
          <img src="./components/icons/cabinet.svg" class="logo-cabinet"/>
          <text>Личный кабинет</text>
        </div>
      </div>
    </div>
    <div class="content-container">
      <QuestionList></QuestionList>
    </div>
    <div class="footer">
      <div class="document">
        <text>Условия использования</text>
        <text>Политика конфиденциальности</text>
      </div>
      <text>@Название сервиса 2023</text>
    </div>
  </div>
</template>

<style scoped>

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
  }
  .logo-container {
    position: relative;
    width: 180px;
  }
  .text-logo {
    position: absolute;
    top: 25%;
    left: 35%;
    z-index: 100;
  }
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 50px;
    border-bottom: 1px solid rgba(121, 121,121, 0.5);
    padding-bottom: 20px;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    width: 330px;
  }
  .tab {
    font-size: 16px;
    font-weight: 500;
    color: #7f7f7f;
  }
  #active-tab {
    color: #333333;
  }
  .create-quiz { 
    width: 160px;
    height: 40px;
    background-color: #1e98d7;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-weight: 700;
    margin-right: 40px;
  }
  .right-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cabinet {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .push {
    margin-right: 20px;
  }
  .logo-cabinet {
    margin-right: 10px
  }
  .content-container {
    max-width: 1280px;
    margin: 0 auto;
  }
  .footer {
    background-color: #d7d7d7;
    height: 40px;
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px 0;
    font-size: 13px;
    color: #333333;
  }
  .document {
    width: 400px;
    display: flex;
    justify-content: space-between;
    margin-left: 100px;
  }
</style>
