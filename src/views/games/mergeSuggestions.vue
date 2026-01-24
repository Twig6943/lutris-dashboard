<template>
  <div class="app-container">
    <h1>Merge suggestions</h1>

    <el-table
      v-loading="loading"
      key="id"
      :data="suggestions"
      fit
      highlight-current-row
      @current-change="onSelectSuggestion">
      <el-table-column label="Keep" prop="game">
        <template #default="props">
          {{ props.row["game"].name }}
        </template>
      </el-table-column>
      <el-table-column label="Remove (duplicate)" prop="other_game">
        <template #default="props">
          {{ props.row["other_game"].name }}
        </template>
      </el-table-column>
      <el-table-column label="Reason" prop="reason">
        <template #default="props">
          {{ props.row["reason"] || "—" }}
        </template>
      </el-table-column>
      <el-table-column label="User" prop="user">
        <template #default="props">
          {{ props.row["user"].username }}
        </template>
      </el-table-column>
    </el-table>

    <div v-if="selected" style="margin-top: 20px;">
      <el-row>
        <el-col>
          <el-button type="info" icon="Sort" @click="onSwap">Swap</el-button>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="red"
            title="Accept merge? The duplicate game (right) will be merged into the kept game (left) and deleted."
            @confirm="onAccept"
          >
            <template #reference>
              <el-button type="warning">Accept</el-button>
            </template>
          </el-popconfirm>
          <el-button type="danger" @click="onReject">Reject</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="12">
          <h3>Keep</h3>
          <div v-if="gameKeep">
            <game-card :game="gameKeep" />
          </div>
          <div v-else v-loading="true" style="min-height: 200px;"></div>
        </el-col>
        <el-col :span="12">
          <h3>Remove (duplicate)</h3>
          <div v-if="gameRemove">
            <game-card :game="gameRemove" />
          </div>
          <div v-else v-loading="true" style="min-height: 200px;"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard/index.vue'
import {
  fetchMergeSuggestions,
  acceptMergeSuggestion,
  rejectMergeSuggestion,
  swapMergeSuggestion,
  getGame
} from '@/api/games'

export default {
  name: 'MergeSuggestions',
  components: {
    GameCard
  },
  data() {
    return {
      suggestions: [],
      loading: false,
      selected: null,
      gameKeep: null,
      gameRemove: null
    }
  },
  created() {
    this.loadSuggestions()
  },
  methods: {
    loadSuggestions() {
      this.loading = true
      fetchMergeSuggestions().then(response => {
        this.suggestions = response.data.results
        this.loading = false
      })
    },

    onSelectSuggestion(row) {
      if (!row) return
      this.selected = row
      this.gameKeep = null
      this.gameRemove = null
      getGame(row.game.slug).then(response => {
        this.gameKeep = response.data
      })
      getGame(row.other_game.slug).then(response => {
        this.gameRemove = response.data
      })
    },

    onSwap() {
      swapMergeSuggestion(this.selected.id).then(() => {
        const tmpGame = this.selected.game
        this.selected.game = this.selected.other_game
        this.selected.other_game = tmpGame
        const tmp = this.gameKeep
        this.gameKeep = this.gameRemove
        this.gameRemove = tmp
      })
    },

    getSuggestionIndex(suggestionId) {
      for (let index = 0; index < this.suggestions.length; index++) {
        if (this.suggestions[index].id === suggestionId) {
          return index
        }
      }
    },

    onAccept() {
      acceptMergeSuggestion(this.selected.id).then(response => {
        if (response.data.accepted) {
          this.suggestions.splice(this.getSuggestionIndex(this.selected.id), 1)
          this.selected = null
          this.gameKeep = null
          this.gameRemove = null
        }
      })
    },

    onReject() {
      rejectMergeSuggestion(this.selected.id).then(response => {
        if (!response.data.accepted) {
          this.suggestions.splice(this.getSuggestionIndex(this.selected.id), 1)
          this.selected = null
          this.gameKeep = null
          this.gameRemove = null
        }
      })
    }
  }
}
</script>
