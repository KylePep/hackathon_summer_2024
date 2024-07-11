<template>
  <div class="boss-dragon text-center ms-4  pb-1 px-3 fs-3">
    🐲
    <div class=" px-3">
      <h1>Boss Dragon</h1>
      <h2>1000000</h2>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.boss-dragon {
  font-family: "MedievalSharp", cursive;
  font-weight: 400;
  font-style: normal;
  color: var(--bs-light);
  text-shadow: 8px 8px 10px #0000008c;
  box-shadow: 2px 0px 10px #0000008c;
  background-color: #343a40;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000);
  border: 1px solid white;
  border-top: 0px;
  border-radius: 0px 0px 16px 16px;
  padding-top: 1rem;


  >div {
    display: none;
  }
}

.boss-dragon:hover {

  >div {
    display: block
  }

}
</style>