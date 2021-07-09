<template>
  <div>
    <Banner />
    <NewPlaylists />
    <NewSongs />
    <NewMvs />
  </div>
</template>

<script>
import Banner from "./components/banner";
import NewPlaylists from "./components/new-playlists";
import NewSongs from "./components/new-songs";
import NewMvs from "./components/new-mvs";
import Routers from '../../../history/index';
export default {
  components: { Banner, NewPlaylists, NewSongs, NewMvs },
  mounted(){
    Routers.$emit('route', this.$route.path)
  }
};
</script>

<style lang="less">
</style>