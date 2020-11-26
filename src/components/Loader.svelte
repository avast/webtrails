<script>

export let progress = 0;
export let status = 'Processing data...';

</script>
<div class="loader">
  <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
  <p>{status}</p>
  <div class="progress">
    <div class="progress-bar" style="width: {progress}%"></div>
  </div>
</div>

<style>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.progress {
  height: 5px;
  background: var(--background-shade);
  width: 15rem;
  margin: 1rem auto;
}
.progress-bar {
  height: 5px;
  background: var(--highlight-1-2);
}

p {
  text-align: center;
}

.sk-folding-cube {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--highlight-1-1);
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  animation-delay: 0.3s;
  background-color: var(--highlight-1-2);
}
.sk-folding-cube .sk-cube3:before {
  animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
  animation-delay: 0.9s;
  background-color: var(--highlight-1-2);
}
@-webkit-keyframes sk-foldCubeAngle {
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
