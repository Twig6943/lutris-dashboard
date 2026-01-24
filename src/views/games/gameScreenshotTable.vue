<template>
  <div class="screenshot-grid">
    <div v-for="screenshot in screenshots" :key="screenshot.id" class="screenshot-card">
      <div class="screenshot-card__image-wrapper">
        <img :src="screenshot.image" class="screenshot-card__image" alt="" loading="lazy">
      </div>
      <div class="screenshot-card__body">
        <div class="screenshot-card__header">
          <router-link
            v-if="screenshot.game?.slug"
            :to="'/games/' + screenshot.game.slug"
            class="screenshot-card__game">
            {{ screenshot.game.name }}
          </router-link>
          <span v-else class="screenshot-card__game">{{ screenshot.game?.name }}</span>
        </div>
        <div class="screenshot-card__meta">
          <img
            v-if="screenshot.uploaded_by?.avatar_url"
            :src="screenshot.uploaded_by.avatar_url"
            class="screenshot-card__avatar"
            alt="">
          <span class="screenshot-card__user">{{ screenshot.uploaded_by?.username }}</span>
          <span class="screenshot-card__date" :title="screenshot.uploaded_at">
            {{ formatDate(screenshot.uploaded_at) }}
          </span>
        </div>
      </div>
      <div class="screenshot-card__actions">
        <el-button type="success" size="small" @click="onScreenshotAccept(screenshot.id)">
          <el-icon><Check /></el-icon> Accept
        </el-button>
        <el-button type="danger" size="small" @click="onScreenshotRefuse(screenshot.id)">
          <el-icon><Close /></el-icon> Refuse
        </el-button>
      </div>
    </div>
    <div v-if="screenshots.length === 0" class="screenshot-empty">
      <el-icon class="screenshot-empty__icon"><PictureFilled /></el-icon>
      <p>No screenshots to review</p>
    </div>
  </div>
</template>

<script>
import { sendScreenshotReview } from '@/api/games'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'GameScreenshotTable',
  props: {
    screenshots: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).fromNow()
    },

    getScreenshotIndex(screenshotId) {
      for (let index = 0; index < this.screenshots.length; index++) {
        if (this.screenshots[index].id === screenshotId) {
          return index
        }
      }
    },

    onScreenshotAccept(screenshotId) {
      sendScreenshotReview(screenshotId, 'accept').then(response => {
        if (response.data.accepted) {
          this.screenshots.splice(this.getScreenshotIndex(screenshotId), 1)
        }
      })
    },

    onScreenshotRefuse(screenshotId) {
      sendScreenshotReview(screenshotId, 'refuse').then(() => {
        this.screenshots.splice(this.getScreenshotIndex(screenshotId), 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.screenshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
}

.screenshot-card {
  background: var(--system-page-background);
  border: 1px solid var(--system-header-border-color);
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  &__image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--system-container-background, #f0f2f5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__body {
    padding: 14px 16px 10px;
  }

  &__header {
    margin-bottom: 8px;
  }

  &__game {
    font-size: 14px;
    font-weight: 600;
    color: var(--system-primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--system-page-tip-color);
  }

  &__avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__user {
    font-weight: 500;
    color: var(--system-page-color);
  }

  &__date {
    margin-left: auto;
  }

  &__actions {
    display: flex;
    gap: 8px;
    padding: 10px 16px 14px;
  }
}

.screenshot-empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--system-page-tip-color);

  &__icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.4;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
}
</style>
