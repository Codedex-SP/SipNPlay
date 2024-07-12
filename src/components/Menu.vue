<template>
  <div class="bg-white font-nunito text-black min-h-screen">
    <div class="max-w-5xl mx-auto p-4 md:p-5">
      <h2 class="text-2xl md:text-3xl text-black font-bold mb-5">Categories</h2>
      <div class="overflow-x-auto snap-x snap-mandatory flex space-x-4 md:space-x-6 pb-4">
        <template v-for="category in categories" :key="category">
          <label
            class="snap-center flex flex-col items-center justify-center w-24 h-36 md:w-32 md:h-48 rounded-3xl p-2 border-2 transition-all duration-300"
            :class="{
              'bg-white border-black': selectedCategory === category,
              'bg-[#ffb571] border-[#ffb571]': selectedCategory !== category
            }">
            <input type="radio" name="category" :value="category" v-model="selectedCategory" class="hidden"
              @change="setFeaturedItem" />
            <div class="h-16 md:h-20 flex justify-center items-center w-16 md:w-20 rounded-full bg-white shadow-md">
              <img :src="getCategoryIcon(category)" alt="Category icon" class="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div class="mt-2 text-center text-black text-sm md:text-base font-medium">{{ formatCategoryName(category) }}
            </div>
          </label>
        </template>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-4">All items</h2>
      <div class="flex justify-center">
        <div class="flex items-center">
          <button class="p-4 text-3xl" @click="prevPage" :disabled="currentPage === 1">
            <FontAwesomeIcon :icon="['fas', 'angle-left']" />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <template v-for="food in paginatedFoods" :key="food.id">
            <div class="flex flex-col justify-between items-center mb-4"> <!-- Añadido mb-4 para margen inferior -->
              <img :src="food.image" :alt="food.name + ' image'" class="h-40 object-fill p-5 -mt-20 translate-y-1/2" />

              <div class="bg-white border border-gray-200 h-64 w-72 rounded-lg shadow-md overflow-hidden">
                <div class="pt-16 p-4 flex flex-col justify-between  h-full">
                  <h3 class="text-lg font-bold text-gray-800 mb-2 text-center">{{ food.name }}</h3>
                  <p class="text-gray-600 mb-2 text-center">{{ food.description }}</p>
                  <div class="flex justify-between items-center">
                    <p class="text-lg font-semibold text-gray-800 price-container">${{ formatPrice(food.price) }}</p>
                    <button class="px-4 py-2 border border-orange-500 text-orange-400 rounded-2xl"
                      @click="selectFeaturedItem(food)">View more</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="flex items-center">
          <button class="p-4 text-3xl" @click="nextPage" :disabled="currentPage === totalPages">
            <FontAwesomeIcon :icon="['fas', 'angle-right']" />
          </button>
        </div>
      </div>

      <div v-if="featuredItem" class="py-8 rounded-xl overflow-hidden relative">
        <div class="bg-gradient-to-br from-amber-100 to-orange-100 p-8 shadow-2xl">

          <h2 class="text-3xl md:text-4xl retro-font font-serif font-semibold text-center mb-4 text-orange-700">
            {{ featuredItem.name }}
          </h2>

          <div class="flex flex-col md:flex-row md:space-x-8 items-center justify-center">

            <div class="md:w-1/2 mb-4 md:mb-0">
              <div class="relative overflow-hidden rounded-lg">
                  <div ref="container" class="rounded-full"></div>
              </div>
            </div>

            <div class="md:w-1/2 text-center md:text-left">
              <div class="text-2xl retro-font font-semibold text-amber-700 mb-2">
                ${{ formatPrice(featuredItem.price) }}
              </div>

              <div class="text-gray-700">
                <p class="description-line" v-for="(line, index) in featuredItem.description.split('\n')" :key="index">
                  {{ line
                  }}</p>
              </div>

              <button @click="showIngredients = !showIngredients"
                class="mt-4 bg-amber-300 hover:bg-amber-400 text-orange-700 font-semibold py-2 px-4 rounded transition duration-300">
                {{ showIngredients ? 'Hide Ingredients' : 'See Ingredients' }}
              </button>

              <transition name="fade">
                <div v-if="showIngredients" class="mt-4">
                  <h3 class="text-xl font-semibold text-amber-700 mb-2">Ingredients</h3>
                  <div class="flex flex-wrap justify-center md:justify-start -mx-2">
                    <div v-for="ingredient in featuredItem.ingredients" :key="ingredient" class="px-2 mb-2">
                      <div class="bg-white rounded-full shadow-md p-2 flex items-center">
                        <img :src="getIngredientIcon(ingredient)" alt="Ingredient" class="w-8 h-8 mr-2">
                        <span class="text-sm">{{ ingredient }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>

        </div>
      </div>



    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

library.add(faAngleLeft, faAngleRight);

export default {
  name: 'MenuComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      selectedCategory: 'All',
      categories: [],
      menu: {},
      featuredItem: null,
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    filteredFoods() {
      if (this.selectedCategory === 'All') {
        return Object.values(this.menu).flat();
      } else {

        return this.menu[this.selectedCategory] || [];
      }
    },
    totalPages() {
      return Math.ceil(this.filteredFoods.length / this.itemsPerPage);
    },
    paginatedFoods() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredFoods.slice(start, end);
    },
  },
  methods: {
    async loadMenuData() {
      try {
        const response = await axios.get('http://localhost:3000/menu');
        console.log('Menu data:', response.data);
        if (response.data) {
          this.categories = Object.keys(response.data);
          this.menu = response.data;
          this.setFeaturedItem();
        } else {
          console.error('Menu data is not valid.');
        }
      } catch (error) {
        console.error('Error loading menu data:', error);
      }
    },
    getPrice(item) {
      if (item.price) {
        if (typeof item.price === 'number') {
          return `$${item.price.toFixed(2)}`;
        } else if (typeof item.price === 'object') {
          return Object.entries(item.price)
            .map(([size, price]) => `${size}: $${price.toFixed(2)}`)
            .join(' | ');
        } else {
          return 'Price not available';
        }
      } else {
        return 'Price not available';
      }
    },
    formatPrice(price) {
      if (typeof price === 'number') {
        return `${price.toFixed(2)}`;
      } else if (typeof price === 'object') {
        if (price.hot !== undefined && price.cold !== undefined) {
          return `${price.hot} (Hot) \n ${price.cold} (Cold)`;
        } else if (price.hot !== undefined) {
          return `${price.hot} (Hot)`;
        } else if (price.cold !== undefined) {
          return `${price.cold} (Cold)`;
        } else if (price.Medium !== undefined && price.Large !== undefined) {
          return `Medium: $${price.Medium.toFixed(2)}\nLarge: $${price.Large.toFixed(2)}`;
        } else {
          return 'Price format not recognized';
        }
      } else {
        return 'Price format not recognized';
      }
    },


    selectFeaturedItem(item) {
      this.featuredItem = item;
      this.$nextTick(() => {
        this.load3DModel();
      });
    },
    setFeaturedItem() {
      const foodsInCategory = this.menu[this.selectedCategory];

      if (foodsInCategory && foodsInCategory.length > 0) {
        this.featuredItem = foodsInCategory[0]; // Selecciona el primer ítem de la categoría actual
        this.$nextTick(() => {
          this.load3DModel();
        });
      } else {
        this.featuredItem = null;
      }
    },

    getCategoryIcon(category) {
      return `/src/assets/img/categories/${category}.png`;
    },
    getIngredientIcon(ingredient) {
      return `/src/assets/ingredients/${ingredient}.png`;
    },
    formatCategoryName(category) {
      return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    load3DModel() {
      console.log('Loading 3D model...');
      if (!this.$refs.container) {
        console.error('3D model container not found');
        return;
      }

      let scene, camera, renderer, controls;

      const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(300, 300);
        renderer.setClearColor(0xffffff, 0);
        this.$refs.container.innerHTML = '';
        this.$refs.container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 500;

        const light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);

        const loader = new GLTFLoader();
        const glbFileName = this.featuredItem.name.toLowerCase().replace(/\s+/g, '_');
        console.log('GLB file name:', glbFileName);

        loader.load(`src/assets/img/foods/${glbFileName}.glb`, function (gltf) {

          scene.add(gltf.scene);

          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = new THREE.Vector3();
          box.getSize(size);

          const desiredHeight = 1;
          const scale = desiredHeight / size.y;

          gltf.scene.scale.set(scale, scale, scale);

          const boxCenter = box.getCenter(new THREE.Vector3());
          gltf.scene.position.sub(boxCenter);

          animate();
        });

        camera.position.set(0, 2, 2);
        camera.lookAt(0, 0, 0);
      };

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      const onWindowResize = () => {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(300, 300);
      };

      window.addEventListener('resize', onWindowResize, false);

      init();
    },

  },
  mounted() {
    this.loadMenuData();
  },
};
</script>


<style>
.retro-font {
  font-family: 'Press Start 2P', cursive;
}

.price-container {
  white-space: pre-line;
}
</style>
