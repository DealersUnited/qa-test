<template>
  <header class="header">
    <img src="../assets/logo.png" alt="buyerbridge logo">
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped lang="scss">
.header{
  height: 216px;
  background:linear-gradient(165deg, #6F76B3 0%, #6F76B3 30%, #00D4BE 80%, #00D4BE 100%);
  display:flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 80px;
  @media all and (max-width: 1024px){
    height: 150px;
    padding: 5px 30px;
  }
  img{
    @media all and (max-width: 1024px){
      max-width: 280px;
      height: auto;
    }
  }
}
</style>
