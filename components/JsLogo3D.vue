<template>
  <div class="js-logo-3d">
    <client-only>
      <model-viewer
        class="js-logo-viewer"
        src="/models/js-logo.glb"
        alt="JavaScript 3D logo in chrome"
        auto-rotate
        rotation-per-second="20deg"
        camera-orbit="0deg 80deg auto"
        field-of-view="25deg"
        exposure="1.1"
        shadow-intensity="1"
        environment-image="neutral"
      >
        <!-- Studio lighting for chrome reflections -->
        <slot name="lights">
          <div class="light light-key"></div>
          <div class="light light-fill"></div>
          <div class="light light-rim"></div>
        </slot>
      </model-viewer>
    </client-only>
  </div>
</template>

<script setup lang="ts">
// model-viewer is loaded globally from a CDN in nuxt.config.ts (head.script).
// This component just mounts it and configures chrome-style studio lighting.
</script>

<style scoped>
.js-logo-3d {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.js-logo-viewer {
  width: 100%;
  height: 100%;
  --poster-color: transparent;
}

/* Soft glow behind the chrome logo */
.js-logo-3d::before {
  content: '';
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 214, 0, 0.25) 0%,
    rgba(255, 214, 0, 0.08) 40%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: 0;
}

.js-logo-viewer {
  z-index: 1;
}

/* Decorative light sources (visual only; model-viewer uses environment-image) */
.light {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.light-key {
  top: 8%;
  left: 12%;
  width: 30%;
  height: 30%;
  background: radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%);
}
.light-fill {
  bottom: 10%;
  right: 12%;
  width: 35%;
  height: 35%;
  background: radial-gradient(circle, rgba(120,180,255,0.35), transparent 70%);
}
.light-rim {
  top: 40%;
  right: 5%;
  width: 25%;
  height: 25%;
  background: radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%);
}
</style>
