<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  const inputs = document.querySelectorAll('.input-container input, .input-container textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.nextElementSibling.classList.add('move');
    });
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.nextElementSibling.classList.remove('move');
      }
    });
  });
});
</script>

<template>
  <div class="feedback flex flex-row text-left justify-center bg-black">
    <div class="bg-lime-300 p-20 flex flex-col items-center">
      <h2 class="mb-28 text-2xl font-bold text-wrap max-w-96">Feel free to drop us your feedback</h2>
      <div class="bg-lime-200 rounded-full max-w-72 h-auto">
        <img src="/src/assets/images/storefront_illustration.svg" alt="Café image">
      </div>
    </div>
    <div class="bg-lime-100 p-20 flex flex-col items-center">
      <div class="form">
        <h3 class="text-center mb-10 font-bold">Submit general questions, suggestions, and boardgame recommendations below!</h3>
        <div class="flex flex-col gap-4">
          <div class="input-container">
            <input type="text" id="name" name="name" class="input rounded-lg" required>
            <label for="name" class="input-placeholder">Name</label>
          </div>
          <div class="input-container">
            <input type="email" id="email" name="email" class="input rounded-lg" required>
            <label for="email" class="input-placeholder">Email</label>
          </div>
          <div class="input-container">
            <textarea id="feedback" name="feedback" class="input rounded-lg" required></textarea>
            <label for="feedback" class="input-placeholder">Feedback</label>
          </div>
          <button type="submit" class="text-white bg-lime-300 rounded-2xl p-2">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  height: 50px;
}
.input {
  background: #F1F8ED;
  width: 100%;
}

.input-placeholder {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s ease;
}

.input-placeholder.move {
  top: 0;
  font-size: 0.8em;
  color: gray;
  background: #F1F8ED;
  padding: 0 5px;
}

input, textarea {
  height: 100%;
}

.flex > div {
  width: 100%;
}

.form {
  max-width: 30em;
}

@media screen and (max-width: 600px){
  .feedback {
    flex-wrap: wrap;
  }
}

</style>