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
            <input type="radio" name="category" :value="category" v-model="selectedCategory" class="hidden" />
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
      <div v-if="featuredItem"
        class="py-8 rounded-xl overflow-hidden relative transition-shadow duration-300 hover:shadow-2xl">
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-8 relative">
          <div class="absolute inset-0 rounded-xl bg-gradient-to-bl from-white/10 to-white/30 blur"></div>

          <h2
            class="text-3xl md:text-4xl retro-font font-serif font-semibold text-center mb-4 text-orange-800 relative z-10">
            {{ featuredItem.name }}
          </h2>

          <div class="flex flex-col md:flex-row md:space-x-8 items-center justify-center relative z-10">

            <div class="md:w-1/2 mb-4 md:mb-0">
              <div
                class="relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105"
                @mouseover="isHovered = true" @mouseleave="isHovered = false">
                <div ref="container" class="rounded-full"></div>
                <div v-if="isHovered" class="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button class="text-white text-lg retro-font">View Details</button>
                </div>
              </div>
            </div>

            <div class="md:w-1/2 text-center md:text-left">
              <div class="text-2xl retro-font font-semibold text-amber-800 mb-2 relative z-10">
                ${{ formatPrice(featuredItem.price) }}
              </div>
              <div class="text-gray-800 line-clamp-3" style="max-height: 6rem;">
                <p class="description-line" v-for="(line, index) in featuredItem.description.split('\n')" :key="index">
                  {{ line }}
                </p>
              </div>
              <button v-if="featuredItem.description.split('\n').length > 3"
                class="text-orange-600 mt-2 hover:underline" @click="showFullDescription = !showFullDescription">
                {{ showFullDescription ? 'Read Less' : 'Read More' }}
              </button>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>

const menuData = {
  "menu": {
    "coffee": [
      {
        "id": 1,
        "name": "Latte",
        "price": {
          "hot": 4.75,
          "cold": 5.25
        },
        "description": "Espresso with steamed milk.",
        "image": "/src/assets/img/foods/latte.png"
      },
      {
        "id": 2,
        "name": "Cappuccino",
        "price": {
          "hot": 4.50
        },
        "description": "Espresso with steamed milk and a layer of foam.",
        "image": "/src/assets/img/foods/cappuccino.png"
      },
      {
        "id": 3,
        "name": "Americano",
        "price": {
          "hot": 3.75,
          "cold": 4.25
        },
        "description": "Espresso diluted with hot water.",
        "image": "/src/assets/img/foods/americano.png"
      }
    ],
    "specialty_drinks": [
      {
        "id": 9,
        "name": "Rose Latte",
        "price": {
          "hot": 5.75,
          "cold": 6.25
        },
        "description": "Latte with a subtle rose flavor.",
        "image": "/src/assets/img/foods/rosse_latte.png"
      },
      {
        "id": 10,
        "name": "Chai",
        "price": {
          "hot": 5.00,
          "cold": 5.50
        },
        "description": "A spiced tea latte made with a blend of spices.",
        "image": "/src/assets/img/foods/chai.png"
      },
      {
        "id": 11,
        "name": "Matcha Latte",
        "price": {
          "hot": 5.25,
          "cold": 5.75
        },
        "description": "Green tea latte made with matcha powder.",
        "image": "/src/assets/img/foods/matcha_latte.png"
      }
    ],
    "boba": [
      {
        "id": 18,
        "name": "Black Milk Tea",
        "price": {
          "Medium": 4.25,
          "Large": 5.25,
          "Hot": 5.25
        },
        "description": "Classic milk tea made with black tea.",
        "image": "/src/assets/img/foods/black_milk_tea.png"
      },
      {
        "id": 19,
        "name": "Taro Milk Tea",
        "price": {
          "Medium": 4.75,
          "Large": 5.75,
          "Hot": 5.75
        },
        "description": "Caffeine free, made with taro flavor.",
        "image": "/src/assets/img/foods/taro_milk_tea.png"
      },
      {
        "id": 20,
        "name": "Thai Milk Tea",
        "price": {
          "Medium": 4.25,
          "Large": 5.25,
          "Hot": 5.25
        },
        "description": "Caffeine free, made with Thai tea flavor.",
        "image": "/src/assets/img/foods/thai_milk_tea.png"
      }
    ],
    "sandwiches_salads": [
      {
        "id": 36,
        "name": "Pizza Panini",
        "price": 11,
        "description": "Delicious pepperoni and fresh mozzarella pressed to perfection! Served with chips.",
        "ingredients": [
          "pepperoni",
          "fresh mozzarella",
          "marinara",
          "olive oil",
          "Italian herb focaccia",
          "chips"
        ],
        "image": "/src/assets/img/foods/pizza_panini.png"
      },
      {
        "id": 37,
        "name": "Mixed Green Salad",
        "price": 6.50,
        "description": "A refreshing mix of greens. Customize with smoked salmon (+$5.00), boiled egg (+$1.00), or avocado (+$1.50).",
        "ingredients": [
          "mixed greens",
          "tomato",
          "vegan"
        ],
        "image": "/src/assets/img/foods/mixed_green_salad.png"
      },
      {
        "id": 38,
        "name": "Avocado Toast",
        "price": 10.00,
        "description": "Creamy avocado mashed. Add an egg (+$1.00) for extra flavor.",
        "ingredients": [
          "avocado",
          "salt",
          "pepper",
          "lemon juice",
          "olive oil",
          "toasted heritage wheat",
          "side salad"
        ],
        "image": "/src/assets/img/foods/avocado_toast.png"
      }
    ],
    "hot_bites": [
      {
        "id": 25,
        "name": "Chicken Poppers",
        "price": 6,
        "description": "Crispy chicken bites.",
        "image": "/src/assets/img/foods/chicken_poppers.png"
      },
      {
        "id": 26,
        "name": "Fries",
        "price": 5,
        "description": "Crispy seasoned fries.",
        "image": "/src/assets/img/foods/fries.png"
      },
      {
        "id": 27,
        "name": "Pigs in a Blanket",
        "price": 7,
        "description": "Mini hot dogs wrapped in dough.",
        "image": "/src/assets/img/foods/pigs_in_a_blanket.png"
      }
    ],
    "seasonal_menu": [
      {
        "id": 45,
        "name": "Pina Colada",
        "price": {
          "Medium": 4.75,
          "Large": 5.75
        },
        "description": "Our coconut boba with pineapple flavor.",
        "image": "/src/assets/img/foods/pina_colada.png"
      },
      {
        "id": 46,
        "name": "Matcha Lemonade",
        "price": {
          "Medium": 5,
          "Large": 6
        },
        "description": "Our freshly squeezed lemonade with a balance of an earthy shot of matcha.",
        "image": "/src/assets/img/foods/matcha_lemonade.png"
      },
      {
        "id": 47,
        "name": "Citrus Boba",
        "price": {
          "Medium": 5,
          "Large": 6
        },
        "description": "Made with real fruit juice and fruit slices!",
        "image": "/src/assets/img/foods/citrus_boba.png"
      }
    ],
    "beer_wine": [
      {
        "id": 52,
        "name": "Babe Rose",
        "price": 18.99,
        "description": "Light and refreshing rosé wine.",
        "image": "/src/assets/img/foods/babe_rose.png"
      },
      {
        "id": 53,
        "name": "Archer Roose White",
        "price": 22.50,
        "description": "Crisp and refreshing white wine.",
        "image": "/src/assets/img/foods/archer_roose_white.png"
      },
      {
        "id": 54,
        "name": "Allagash White",
        "price": 25.75,
        "description": "Rich and bold white beer.",
        "image": "/src/assets/img/foods/allagash_white.png"
      }
    ]
  }
};


const menuArray = Object.entries(menuData.menu).map(([category, items]) => ({
  category,
  items
}));

console.log(menuArray);


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
    loadMenuData() {
     
        const response = menuData;
        console.log('Menu data:', response.menu);
       
          this.categories = Object.keys(response.menu);
          this.menu = response.menu;
          this.setFeaturedItem();
       
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
      console.log('Loading 3D model/src.');
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

        loader.load(`/src/assets/img/foods/${glbFileName}.glb`, function (gltf) {

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


.price-container {
  white-space: pre-line;
}
</style>
