<template>
  <el-table v-loading="loading" key="id" :data="changes" fit highlight-current-row class="change-table">
    <el-table-column label="Game" min-width="280">
      <template #default="{ row }">
        <div class="game-cell">
          <div class="banner-wrapper">
            <img
              v-if="row.game?.banner_url"
              :src="row.game.banner_url"
              class="game-banner"
              alt=""
              @error="$event.target.style.display='none'">
            <div class="game-banner game-banner--placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </div>
          <div class="game-info">
            <span class="game-name">{{ row.game?.name }}</span>
            <span class="game-slug">{{ row.game?.change_for?.slug }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Submitted by" width="140">
      <template #default="{ row }">
        <span class="user-name">{{ row.user?.username }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Date" width="120">
      <template #default="{ row }">
        <span class="date-cell" :title="row.created_at">{{ formatDate(row.created_at) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="" width="100" align="center">
      <template #default="{ row }">
        <a
          :href="baseUrl + '/games/' + row.game?.change_for?.slug"
          target="_blank"
          class="review-link">
          Review <el-icon><TopRight /></el-icon>
        </a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'GameChangeTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    changes: {
      type: Array,
      default: () => []
    },
    baseUrl: {
      type: String,
      default: import.meta.env.VITE_BASE_URL
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
.game-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.banner-wrapper {
  position: relative;
  width: 64px;
  height: 24px;
  flex-shrink: 0;
}

.game-banner {
  width: 64px;
  height: 24px;
  object-fit: cover;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;

  &--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--system-container-background, #f0f2f5);
    color: var(--system-page-tip-color);
    font-size: 14px;
  }
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.game-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-slug {
  font-size: 12px;
  color: var(--system-page-tip-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-name {
  font-weight: 500;
}

.date-cell {
  font-size: 12px;
  color: var(--system-page-tip-color);
}

.review-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--system-primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  .el-icon {
    font-size: 12px;
  }
}
</style>
