<script setup lang="ts">
import { useUIStore } from '../../store/useUIStore';
import { Trash, FilePlus2, FilePen, MoreVertical, X } from "lucide-vue-next";

const uiStore = useUIStore();
</script>
<template>
  <Transition name="fade">

    <div v-if="uiStore.isLoading">
      <!-- 
    <div class="loader">
      <div class="face">
        <div class="circle"></div>
      </div>
      <div class="face">
        <div class="circle"></div>
      </div>
    </div> -->

      <div class="no-freeze-spinner">

        <div id="no-freeze-spinner">
          <div>
            <FilePlus2 stroke-width="2" class="mx-auto" color="white"></FilePlus2>

            <FilePen stroke-width="2" class="mx-auto" color="white"></FilePen>

            <Trash stroke-width="2" class="mx-auto" color="white"></Trash>

            <div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </Transition>
</template>
<style lang="scss">
.spinner {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  background-color: rgba(69, 69, 69, 0.412);
  display: flex;
  justify-content: center;
  align-items: center;
}


@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

$dark: rgba(58, 58, 58, 0.8);





#no-freeze-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.1s linear;
  opacity: 0;
  height: 100vh;
  transform: scale(10);
  z-index: -1;
  background: $dark;
}

.no-freeze-spinner #no-freeze-spinner {
  z-index: 9999;
  opacity: 0.5;
  transform: scale(1);
}

#no-freeze-spinner>div>div {
  animation-play-state: paused;
  border: 5px solid rgba(200, 200, 200, 1);
  border-radius: 50%;
  animation: rotate 1s infinite linear;
  border-left-color: rgba(200, 200, 200, 0.4);
  width: 100%;
  height: 100%;
}

#no-freeze-spinner>div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  box-shadow: 0 0 0 2000px $dark;
  width: 66px;
  height: 66px;
  padding: 5px;
}

.no-freeze-spinner #no-freeze-spinner div div {
  animation-play-state: running;
}

@keyframes loadicons {
  0% {
    transform: scale(0) translate3d(0, 0, 0);
  }

  11% {
    transform: scale(1.2) translate3d(0, 0, 0);
  }

  22% {
    transform: scale(1) translate3d(0, 0, 0);
  }

  33% {
    transform: scale(0) translate3d(0, 0, 0);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.no-freeze-spinner #no-freeze-spinner svg {
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  line-height: 1;
  transform: scale(0) translate3d(0, 0, 0);
}

.no-freeze-spinner #no-freeze-spinner svg:nth-of-type(1) {
  animation: loadicons 3s infinite ease-in-out;
}

.no-freeze-spinner #no-freeze-spinner svg:nth-of-type(2) {
  animation: loadicons 3s 1s infinite ease-in-out;
}

.no-freeze-spinner #no-freeze-spinner svg:nth-of-type(3) {
  animation: loadicons 3s 2s infinite ease-in-out;
}
</style>