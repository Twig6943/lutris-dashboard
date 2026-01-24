<template>
  <div class="app-container">
    <game-change-table :loading="loading" :changes="changes" />
  </div>
</template>

<script>
import GameChangeTable from './gameChangeTable.vue'
import { fetchGameChanges } from '@/api/games'

export default {
  name: 'GameChanges',
  components: {
    GameChangeTable
  },
  data() {
    return {
      changes: [],
      loading: false
    }
  },
  created() {
    this.getGameChanges()
  },
  methods: {
    getGameChanges() {
      this.loading = true
      fetchGameChanges().then(response => {
        this.changes = response.data.results || []
        this.loading = false
      })
    }
  }
}
</script>