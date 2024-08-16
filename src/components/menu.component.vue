<template>
  <div class="bg-white min-h-screen font-nunito text-gray-800">
    <div class="max-w-5xl mx-auto p-6">
      <!-- Categorías -->
      <h2 class="text-3xl font-extrabold text-gray-700 mb-8 text-center">Categories</h2>
      <div class="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-4">
        <template v-for="category in categories" :key="category.id">
          <label
            class="flex flex-col items-center justify-center w-24 h-36 md:w-28 md:h-44 rounded-3xl p-3 border-2 shadow-lg transition-all duration-300 snap-center"
            :class="{
              'bg-white border-transparent shadow-xl': selectedCategoryId === category.id,
              'bg-orange-100 border-orange-200': selectedCategoryId !== category.id
            }">
            <input type="radio" name="category" :value="category.id" v-model="selectedCategoryId" class="hidden" />
            <div class="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md">
              <img :src="category.image" alt="Category icon" class="w-8 h-8" />
            </div>
            <div class="mt-2 text-center text-gray-800 font-medium">{{ category.name }}</div>
          </label>
        </template>
      </div>

      <!-- Items -->
      <h2 class="text-3xl font-extrabold text-gray-700 mt-10 mb-6 text-center">All Items</h2>
      <div class="flex justify-center items-center">
        <button class="text-2xl text-gray-500" @click="prevPage" :disabled="currentPage === 1">
          <FontAwesomeIcon :icon="['fas', 'angle-left']" />
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
          <template v-for="product in paginatedProducts" :key="product.id">
            <div class=" flex flex-col">
              <!-- Imagen del producto -->
              <div class="flex mt-24 justify-center  relative">
                <img :src="product.image" :alt="product.name + ' image'"
                  class="h-48 w-52 p-2 object-contain absolute -bottom-20" />
              </div>
              <!-- Contenido del producto -->
              <div class="flex flex-col border-2 border-gray-200 rounded-lg shadow-lg items-center bg-white p-4 pt-20">
                <h3 class="text-lg font-bold text-gray-800 mb-2 text-center">{{ product.name }}</h3>
                <p class="text-gray-600 mb-3 text-center">{{ product.description }}</p>
                <div class="text-center">
                  <!-- Mostrar opciones de tamaño si están disponibles -->
                  <select v-if="typeof product.price === 'object'" v-model="selectedSize[product.id]"
                    class="block w-full mb-3 p-2 bg-gray-100 border border-gray-300 rounded-md">
                    <option v-for="(value, size) in product.price" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                  <p class="text-lg font-semibold text-orange-500">
                    {{ formatPrice(product.price, product.id) }}
                  </p>
                  <button
                    class="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    @click="selectFeaturedProduct(product)">
                    View more
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
        <button class="text-2xl text-gray-500" @click="nextPage" :disabled="currentPage === totalPages">
          <FontAwesomeIcon :icon="['fas', 'angle-right']" />
        </button>
      </div>

      <!-- Item Destacado -->
      <div v-if="featuredProduct"
        class="bg-white p-8 mt-12 rounded-xl  ">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-6 md:mb-0">
            <div
              class="relative overflow-hidden rounded-lg ">
              <div ref="container" class="rounded-full"></div>
              <div v-if="isHovered" class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button class="text-white text-lg retro-font">View Details</button>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 text-center md:text-left md:pl-8">
            <h2 class="text-4xl retro-font font-bold text-gray-800 mb-4">{{ featuredProduct.name }}</h2>
            <div class="text-2xl retro-font font-semibold text-orange-500 mb-4">
              {{ formatPrice(featuredProduct.price) }}
            </div>
            <div class="text-gray-800">
              <p v-for="(line, index) in featuredProduct.description.split('\n')" :key="index">
                {{ line }}
              </p>
            </div>
            <button v-if="featuredProduct.description.split('\n').length > 3"
              class="text-orange-600 mt-4 hover:underline" @click="showFullDescription = !showFullDescription">
              {{ showFullDescription ? 'Read Less' : 'Read More' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// El código JavaScript sigue siendo el mismo
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import products from '../assets/data/products.json';

library.add(faAngleLeft, faAngleRight);

export default {
  name: 'MenuComponent',
  components: {
    FontAwesomeIcon,
  },
  created() {
    this.initializeSelectedSize();
  },
  data() {
    return {
      selectedCategoryId: null,
      categories: products.categories,
      products: products.products,
      selectedSize: {},
      featuredProduct: null,
      currentPage: 1,
      itemsPerPage: 3,
      isHovered: false,
      showFullDescription: false,
      product: null,
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategoryId === null) {
        return this.products;
      }
      return this.products.filter(product => product.category_id === this.selectedCategoryId);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    }
  }
  ,
  methods: {
    initializeSelectedSize() {
      this.products.forEach(product => {
        if (typeof product.price === 'object') {
          const firstSize = Object.keys(product.price)[0];
          this.selectedSize[product.id] = firstSize;
        } else {
          this.selectedSize[product.id] = null;
        }
      });
    },
    formatPrice(price, productId) {
      if (typeof price === 'object') {
        const size = this.selectedSize[productId] || Object.keys(price)[0];
        return `$${price[size].toFixed(2)}`;
      } else {
        return `$${price.toFixed(2)}`;
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    isObject(value) {
      return value && typeof value === 'object' && value.constructor === Object;
    },
    selectFeaturedProduct(product) {
      this.featuredProduct = product;
      if (typeof product.price === 'object') {
        this.selectedSize[product.id] = Object.keys(product.price)[0];

      }
      this.$nextTick(() => {
        this.load3DModel();
      });
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

      const container = this.$refs.container;

      let scene, camera, renderer, controls;

      const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(300, 300);
        renderer.setClearColor(0xffffff, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

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
        loader.load(`${this.featuredProduct.modelUrl}`, function (gltf) {

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
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');

.retro-font {
  font-family: 'Nunito', sans-serif;
}
</style>
