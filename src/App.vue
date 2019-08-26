<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="header-logo"></div>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<style lang="less">
.layout {
  display: flex;
  min-height: 100% !important;
  flex-direction: column;
  justify-content: space-around;
  .header{
    background-color: white;
    color: black;
    border-bottom: 1px solid darken(white, 10);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-logo{
      background: darken(white, 10);
      height: 30px;
      width: 150px;
    }
  }
  .content {
    flex: 1;
    position: relative;
  }
}
</style>
