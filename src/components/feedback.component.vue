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
  <div class="flex flex-row text-left">
    <div class="bg-lime-300 p-20">
      <h2 class="mb-28 text-2xl font-bold text-wrap max-w-96">Feel free to drop us your feedback</h2>
      <div class="bg-lime-200 rounded-full">
        <img src="/src/assets/images/storefront_illustration.svg" alt="Café image">
      </div>
    </div>
    <div class="bg-lime-100 p-20">
      <h3 class="text-center mb-10 font-bold">Submit general questions, suggestions, and boardgame recommendations below!</h3>
      <div class="flex flex-col gap-4">
        <div class="input-container">
          <input type="text" id="name" name="name" class="input" required>
          <label for="name" class="input-placeholder">Name</label>
        </div>
        <div class="input-container">
          <input type="email" id="email" name="email" class="input" required>
          <label for="email" class="input-placeholder">Email</label>
        </div>
        <div class="input-container">
          <textarea id="feedback" name="feedback" class="input" required></textarea>
          <label for="feedback" class="input-placeholder">Feedback</label>
        </div>
        <button type="submit" class="text-white bg-lime-300">Send</button>
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
</style>