<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    fit
    highlight-current-row
    class="submission-table">
    <el-table-column label="Game" min-width="200">
      <template #default="{ row }">
        <div class="game-cell">
          <span class="game-name">{{ row.game?.name || row.name }}</span>
          <span class="game-year" v-if="row.year">({{ row.year }})</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Version" min-width="140">
      <template #default="{ row }">
        <router-link :to="'/installers/submissions/' + row.id" class="version-link">
          {{ row.version }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="Runner" width="100">
      <template #default="{ row }">
        <el-tag size="small" :type="runnerTagType(row.runner)" disable-transitions>
          {{ row.runner }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Type" width="100">
      <template #default="{ row }">
        <el-tag
          size="small"
          :type="row.base_installer ? 'warning' : 'success'"
          disable-transitions>
          {{ row.base_installer ? 'Update' : 'New' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Submitted by" width="140" prop="user" />
    <el-table-column label="Date" width="120">
      <template #default="{ row }">
        <span class="date-cell" :title="row.created_at">{{ formatDate(row.created_at) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'SubmissionTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    submissions: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).fromNow()
    },
    runnerTagType(runner) {
      const types = {
        wine: 'danger',
        linux: 'success',
        steam: '',
        zdoom: 'warning'
      }
      return types[runner] || 'info'
    }
  }
}
</script>

<style lang="scss" scoped>
.game-cell {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.game-name {
  font-weight: 500;
}

.game-year {
  font-size: 12px;
  color: var(--system-page-tip-color);
}

.version-link {
  color: var(--system-primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.date-cell {
  font-size: 12px;
  color: var(--system-page-tip-color);
}
</style>
