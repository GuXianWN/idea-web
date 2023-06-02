<template>
  <div id="app" class="list-content app">
    <!--    fff5e0-->
    <router-view/>
    <center>
      <span class="my-face" style="margin-bottom: 30px">(●'◡'●)ﾉ</span>
    </center>
  </div>
</template>

<style>
.app{
  min-height: 100vh;
  height: 100vh;
  overflow: auto;
  /*background: rgb(245,244,249);*/

  background-color: #efefef;
  background-image: linear-gradient(90deg, rgba(60,10,30,0.04) 3%, transparent 0),linear-gradient(1turn, rgba(60,10,30,0.04) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  background-position-x: 50%;
  background-position-y: center;
  background-repeat: repeat;
}
* {
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", serif;
}

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background-color: rgb(245, 244, 249);
}

*::-webkit-scrollbar-thumb {
  background: rgb(6, 182, 212);
  border-radius: 10px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.key{
  color: #f50;
  font-weight: 600;
}

.doesNotOverflow{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.doesNotOverflow3{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.my-face {
  -webkit-animation: haha 5s infinite ease-in-out;
  animation: haha 5s infinite ease-in-out;
  display: inline-block;
  margin-top: 100px;
}

span.my-face {
}

@-webkit-keyframes haha {
  2%, 24%, 80% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg)
  }
  4%, 68%, 98% {
    -webkit-transform: translate(0, -1.5px) rotate(-.5deg);
    transform: translate(0, -1.5px) rotate(-.5deg)
  }
  38%, 6% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg)
  }
  8%, 86% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg)
  }
  10%, 72% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg)
  }
  12%, 64%, 78%, 96% {
    -webkit-transform: translate(0, -.5px) rotate(1.5deg);
    transform: translate(0, -.5px) rotate(1.5deg)
  }
  14%, 54% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg)
  }
  16% {
    -webkit-transform: translate(0, -.5px) rotate(-1.5deg);
    transform: translate(0, -.5px) rotate(-1.5deg)
  }
  18%, 22% {
    -webkit-transform: translate(0, .5px) rotate(-1.5deg);
    transform: translate(0, .5px) rotate(-1.5deg)
  }
  20%, 36%, 46% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg)
  }
  26%, 50% {
    -webkit-transform: translate(0, .5px) rotate(.5deg);
    transform: translate(0, .5px) rotate(.5deg)
  }
  28% {
    -webkit-transform: translate(0, .5px) rotate(1.5deg);
    transform: translate(0, .5px) rotate(1.5deg)
  }
  30%, 40%, 62%, 76%, 88% {
    -webkit-transform: translate(0, -.5px) rotate(2.5deg);
    transform: translate(0, -.5px) rotate(2.5deg)
  }
  32%, 34%, 66% {
    -webkit-transform: translate(0, 1.5px) rotate(-.5deg);
    transform: translate(0, 1.5px) rotate(-.5deg)
  }
  42% {
    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
    transform: translate(0, 2.5px) rotate(-1.5deg)
  }
  44%, 70% {
    -webkit-transform: translate(0, 1.5px) rotate(.5deg);
    transform: translate(0, 1.5px) rotate(.5deg)
  }
  48%, 74%, 82% {
    -webkit-transform: translate(0, -.5px) rotate(.5deg);
    transform: translate(0, -.5px) rotate(.5deg)
  }
  52%, 56%, 60% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg)
  }
  58% {
    -webkit-transform: translate(0, .5px) rotate(2.5deg);
    transform: translate(0, .5px) rotate(2.5deg)
  }
  84% {
    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
    transform: translate(0, 1.5px) rotate(2.5deg)
  }
  90% {
    -webkit-transform: translate(0, 2.5px) rotate(-.5deg);
    transform: translate(0, 2.5px) rotate(-.5deg)
  }
  92% {
    -webkit-transform: translate(0, .5px) rotate(-.5deg);
    transform: translate(0, .5px) rotate(-.5deg)
  }
  94% {
    -webkit-transform: translate(0, 2.5px) rotate(.5deg);
    transform: translate(0, 2.5px) rotate(.5deg)
  }
  0%, 100% {
    -webkit-transform: translate(0, 0) rotate(0);
    transform: translate(0, 0) rotate(0)
  }
}

@keyframes haha {
  2%, 24%, 80% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg)
  }
  4%, 68%, 98% {
    -webkit-transform: translate(0, -1.5px) rotate(-.5deg);
    transform: translate(0, -1.5px) rotate(-.5deg)
  }
  38%, 6% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg)
  }
  8%, 86% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg)
  }
  10%, 72% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg)
  }
  12%, 64%, 78%, 96% {
    -webkit-transform: translate(0, -.5px) rotate(1.5deg);
    transform: translate(0, -.5px) rotate(1.5deg)
  }
  14%, 54% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg)
  }
  16% {
    -webkit-transform: translate(0, -.5px) rotate(-1.5deg);
    transform: translate(0, -.5px) rotate(-1.5deg)
  }
  18%, 22% {
    -webkit-transform: translate(0, .5px) rotate(-1.5deg);
    transform: translate(0, .5px) rotate(-1.5deg)
  }
  20%, 36%, 46% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg)
  }
  26%, 50% {
    -webkit-transform: translate(0, .5px) rotate(.5deg);
    transform: translate(0, .5px) rotate(.5deg)
  }
  28% {
    -webkit-transform: translate(0, .5px) rotate(1.5deg);
    transform: translate(0, .5px) rotate(1.5deg)
  }
  30%, 40%, 62%, 76%, 88% {
    -webkit-transform: translate(0, -.5px) rotate(2.5deg);
    transform: translate(0, -.5px) rotate(2.5deg)
  }
  32%, 34%, 66% {
    -webkit-transform: translate(0, 1.5px) rotate(-.5deg);
    transform: translate(0, 1.5px) rotate(-.5deg)
  }
  42% {
    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
    transform: translate(0, 2.5px) rotate(-1.5deg)
  }
  44%, 70% {
    -webkit-transform: translate(0, 1.5px) rotate(.5deg);
    transform: translate(0, 1.5px) rotate(.5deg)
  }
  48%, 74%, 82% {
    -webkit-transform: translate(0, -.5px) rotate(.5deg);
    transform: translate(0, -.5px) rotate(.5deg)
  }
  52%, 56%, 60% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg)
  }
  58% {
    -webkit-transform: translate(0, .5px) rotate(2.5deg);
    transform: translate(0, .5px) rotate(2.5deg)
  }
  84% {
    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
    transform: translate(0, 1.5px) rotate(2.5deg)
  }
  90% {
    -webkit-transform: translate(0, 2.5px) rotate(-.5deg);
    transform: translate(0, 2.5px) rotate(-.5deg)
  }
  92% {
    -webkit-transform: translate(0, .5px) rotate(-.5deg);
    transform: translate(0, .5px) rotate(-.5deg)
  }
  94% {
    -webkit-transform: translate(0, 2.5px) rotate(.5deg);
    transform: translate(0, 2.5px) rotate(.5deg)
  }
  0%, 100% {
    -webkit-transform: translate(0, 0) rotate(0);
    transform: translate(0, 0) rotate(0)
  }
}

@-webkit-keyframes slide {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    -webkit-transform: scale(2);
    transform: scale(2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

</style>

<script>

</script>