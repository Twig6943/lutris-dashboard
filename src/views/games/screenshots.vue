<template>
  <div class="app-container" v-loading="loading">
    <game-screenshot-table :screenshots="screenshots" />
  </div>
</template>

<script>
import GameScreenshotTable from './gameScreenshotTable.vue'
import { fetchGameScreenshots } from '@/api/games'

export default {
  name: 'GameScreenshots',
  components: {
    GameScreenshotTable
  },
  data() {
    return {
      screenshots: [],
      loading: false
    }
  },
  created() {
    this.getGameScreenshots()
  },
  methods: {
    getGameScreenshots() {
      this.loading = true
      fetchGameScreenshots().then(response => {
        this.screenshots = response.data.results || []
        this.loading = false
      })
    }
  }
}
</script>
