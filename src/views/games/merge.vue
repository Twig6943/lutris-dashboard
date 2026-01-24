<template>
  <div class="app-container merge-page">
    <div class="merge-layout">
      <!-- Left: Keep -->
      <div class="merge-side merge-side--keep">
        <div class="merge-side__label">
          <el-icon><CircleCheckFilled /></el-icon>
          Keep
        </div>
        <game-search-input :on-select="onLoadGame1" />
        <game-card v-if="game_1" :game="game_1" />
        <div v-else class="merge-placeholder">
          <el-icon><Search /></el-icon>
          <span>Search for the game to keep</span>
        </div>
      </div>

      <!-- Center: Merge action -->
      <div class="merge-action">
        <div v-if="game_1 && game_2" class="merge-action__content">
          <el-icon class="merge-action__arrow"><Back /></el-icon>
          <el-popconfirm
            confirm-button-text="Yes, merge"
            cancel-button-text="Cancel"
            icon="Warning"
            icon-color="#e6a23c"
            title="The game on the right will be merged into the left one and deleted."
            @confirm="doMerge">
            <template #reference>
              <el-button type="warning" size="large">
                <el-icon><Back /></el-icon> Merge
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>

      <!-- Right: Delete -->
      <div class="merge-side merge-side--delete">
        <div class="merge-side__label merge-side__label--danger">
          <el-icon><DeleteFilled /></el-icon>
          Will be deleted
        </div>
        <game-search-input :on-select="onLoadGame2" />
        <game-card v-if="game_2" :game="game_2" />
        <div v-else class="merge-placeholder">
          <el-icon><Search /></el-icon>
          <span>Search for the game to merge away</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameSearchInput from '@/components/GameSearchInput/index.vue'
import GameCard from '@/components/GameCard/index.vue'
import { getGame, mergeGames } from '@/api/games'

export default {
  name: 'GameMerge',
  components: {
    GameSearchInput,
    GameCard
  },
  data() {
    return {
      game_1: null,
      game_2: null
    }
  },
  methods: {
    onLoadGame1(slug) {
      getGame(slug).then(response => {
        this.game_1 = response.data
      })
    },
    onLoadGame2(slug) {
      getGame(slug).then(response => {
        this.game_2 = response.data
      })
    },
    doMerge() {
      mergeGames(this.game_1.slug, this.game_2.slug).then(() => {
        this.game_2 = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.merge-page {
  padding: 20px;
}

.merge-layout {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: start;
}

.merge-side {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #67c23a;
    text-transform: uppercase;
    letter-spacing: 0.03em;

    .el-icon {
      font-size: 16px;
    }

    &--danger {
      color: #f56c6c;
    }
  }
}

.merge-action {
  display: flex;
  align-items: center;
  padding-top: 80px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__arrow {
    font-size: 24px;
    color: var(--system-page-tip-color);
  }
}

.merge-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;
  border: 2px dashed var(--system-header-border-color);
  border-radius: 10px;
  color: var(--system-page-tip-color);
  font-size: 13px;

  .el-icon {
    font-size: 28px;
    opacity: 0.4;
  }
}

@media (max-width: 900px) {
  .merge-layout {
    grid-template-columns: 1fr;
  }

  .merge-action {
    padding-top: 0;
    justify-content: center;
    padding: 12px 0;
  }
}
</style>
