<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    fit
    highlight-current-row
    class="game-submission-table">
    <el-table-column label="Game" min-width="280">
      <template #default="{ row }">
        <div class="game-cell">
          <img
            v-if="row.game?.banner_url"
            :src="row.game.banner_url"
            class="game-banner"
            alt="">
          <div class="game-info">
            <router-link :to="'/games/' + row.game?.slug" class="game-name">
              {{ row.game?.name }}
            </router-link>
            <span class="game-slug">{{ row.game?.slug }}</span>
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
    <el-table-column label="Actions" width="200" align="center">
      <template #default="{ row }">
        <el-button type="success" size="small" @click="acceptSubmission(row.id)">Accept</el-button>
        <el-button type="danger" size="small" @click="rejectSubmission(row.id)">Reject</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { sendSubmissionAccept, sendSubmissionReject } from '@/api/games'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'GameSubmissionTable',
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

    getSubmissionIndex(submissionId) {
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].id === submissionId) {
          return index
        }
      }
    },

    acceptSubmission(submissionId) {
      sendSubmissionAccept(submissionId).then(response => {
        if (response.data.accepted) {
          this.submissions.splice(this.getSubmissionIndex(submissionId), 1)
        }
      })
    },

    rejectSubmission(submissionId) {
      sendSubmissionReject(submissionId).then(response => {
        if (!response.data.accepted) {
          this.submissions.splice(this.getSubmissionIndex(submissionId), 1)
        }
      })
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

.game-banner {
  width: 64px;
  height: 24px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.game-name {
  color: var(--system-primary-color);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
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
</style>
