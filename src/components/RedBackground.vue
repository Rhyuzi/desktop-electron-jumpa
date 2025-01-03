<template>
  <div class="w-screen h-screen fixed bg-maroon items-center red-background bg-cover">
    <Particles
      id="tsparticles"
      :options="tsOption"
    />
    <div class="mx-auto min-w-min relative h-screen flex flex-nowrap flex-col items-center justify-center">
        <router-view/>
    </div>
		<footer class="absolute mx-auto py-4 w-full bottom-0">
			<transition name="slide-up" appear>
				<p class="text-white text-center text-xs">
					Version: 1.0.0 
					<a href="/" class="font-bold">PT. Jumpa Daring Indonesia</a><br>
				</p>
			</transition>
		</footer>
  </div>
</template>

<script>
import { nextTick } from '@vue/runtime-core';
export default {
  name: 'RedBackground',
  data() {
    return {
      tsOption: {
        background: {
          color: {
            value: '#790F19',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: false,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 10,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            random: false,
            speed: 0.5,
            straight: false,
            out_mode:'out'
          },
          number: {
            value: 80,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 2,
          },
        },
        detectRetina: true,
      }
    }
  },
}
</script>
<style scoped>
</style>