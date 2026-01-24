<template>
  <el-table v-loading="loading" key="id" :data="changes" fit highlight-current-row class="change-table">
    <el-table-column label="Game" min-width="250">
      <template #default="{ row }">
        <div class="game-cell">
          <span class="game-name">{{ row.game?.name }}</span>
          <span class="game-slug">{{ row.game?.change_for?.slug }}</span>
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
  flex-direction: column;
  gap: 2px;
}

.game-name {
  font-weight: 500;
}

.game-slug {
  font-size: 12px;
  color: var(--system-page-tip-color);
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
