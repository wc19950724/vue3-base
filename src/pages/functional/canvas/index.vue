<template>
  <section class="canvas-wrapper">
    <div>
      <video
        ref="video"
        src="https://media.prod.mdn.mozit.cloud/samples/video/chroma-key/video.ogv"
        controls="true"
        crossorigin="anonymous"
      />
    </div>
    <div>
      <canvas ref="c1" class="c1" width="160" height="96" />
      <canvas ref="c2" class="c2" width="160" height="96" />
    </div>
  </section>
</template>
<script lang="ts" setup>
const video = ref<HTMLVideoElement>();
const c1 = ref<HTMLCanvasElement>();
const c2 = ref<HTMLCanvasElement>();
let ctx1: CanvasRenderingContext2D | null;
let ctx2: CanvasRenderingContext2D | null;
let width = 0;
let height = 0;

const timerCallback = () => {
  if (video.value?.paused || video.value?.ended) {
    return;
  }
  computeFrame();
  setTimeout(() => {
    timerCallback();
  }, 0);
};

const doLoad = () => {
  if (c1.value) {
    ctx1 = c1.value.getContext("2d", { willReadFrequently: true });
  }
  if (c2.value) {
    ctx2 = c2.value.getContext("2d", { willReadFrequently: true });
  }
  console.log(c1.value);
  console.log(c2.value);
  console.log(video.value);
  if (video.value) {
    video.value.addEventListener(
      "play",
      () => {
        if (video.value) {
          width = video.value.videoWidth / 2;
          height = video.value.videoHeight / 2;
        }

        timerCallback();
      },
      false
    );
  }
};

const computeFrame = () => {
  if (ctx1 && ctx2 && video.value) {
    ctx1.drawImage(video.value, 0, 0, width, height);
    let frame = ctx1.getImageData(0, 0, width, height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
    }
    ctx2.putImageData(frame, 0, 0);
  }
};

onMounted(() => {
  doLoad();
});
</script>
<style lang="less" scoped>
.canvas-wrapper {
  .c2 {
    background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F25%2F20200425173132_svsej.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678345976&t=10f5442c0620de8a8e7b2e308026f94b);
    background-repeat: no-repeat;
    background-size: cover;
  }
  div {
    float: left;
    border: 1px solid #444444;
    padding: 10px;
    margin: 10px;
    background: #3b3b3b;
  }
}
</style>
