<template>
  <div class="dashboard" v-loading="statsLoading">
    <!-- Game Search -->
    <div class="search-bar">
      <game-search-input :on-select="onGameSelect" />
    </div>

    <!-- Action Items Banner -->
    <div class="action-banner" v-if="totalActionItems > 0">
      <el-icon><WarningFilled /></el-icon>
      <span>{{ totalActionItems }} items need your attention</span>
    </div>

    <!-- Action Items -->
    <div class="section-title">Needs Review</div>
    <el-row :gutter="16" class="action-row">
      <el-col :xs="24" :sm="8">
        <router-link to="/games/game_submissions" class="action-card action-card--warning">
          <div class="action-card__count">{{ stats.pending_game_submissions }}</div>
          <div class="action-card__label">Pending Submissions</div>
          <el-icon class="action-card__icon"><EditPen /></el-icon>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="8">
        <router-link to="/games/game_changes" class="action-card action-card--info">
          <div class="action-card__count">{{ stats.pending_game_changes }}</div>
          <div class="action-card__label">Pending Changes</div>
          <el-icon class="action-card__icon"><Switch /></el-icon>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="8">
        <router-link to="/games/screenshots" class="action-card action-card--purple">
          <div class="action-card__count">{{ stats.unpublished_screenshots }}</div>
          <div class="action-card__label">Screenshot Reviews</div>
          <el-icon class="action-card__icon"><PictureFilled /></el-icon>
        </router-link>
      </el-col>
    </el-row>

    <!-- Stats Grid -->
    <div class="section-title">Overview</div>
    <el-row :gutter="16" class="stats-row">
      <!-- Games Card -->
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="stat-card">
          <div class="stat-card__header">
            <span class="stat-card__title">Games</span>
            <el-icon class="stat-card__header-icon stat-card__header-icon--blue"><Trophy /></el-icon>
          </div>
          <div class="stat-card__value">{{ stats.games }}</div>
          <div class="stat-card__details">
            <div class="stat-detail">
              <span class="stat-detail__dot stat-detail__dot--success"></span>
              <span class="stat-detail__label">Published</span>
              <span class="stat-detail__value">{{ stats.published_games }}</span>
            </div>
            <div class="stat-detail">
              <span class="stat-detail__dot stat-detail__dot--muted"></span>
              <span class="stat-detail__label">Unpublished</span>
              <span class="stat-detail__value">{{ stats.unpublished_games }}</span>
            </div>
          </div>
        </div>
      </el-col>

      <!-- Submissions Card -->
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="stat-card">
          <div class="stat-card__header">
            <span class="stat-card__title">Submissions</span>
            <el-icon class="stat-card__header-icon stat-card__header-icon--green"><DocumentChecked /></el-icon>
          </div>
          <div class="stat-card__value">{{ stats.game_submissions }}</div>
          <div class="stat-card__details">
            <div class="stat-detail">
              <span class="stat-detail__dot stat-detail__dot--success"></span>
              <span class="stat-detail__label">Accepted</span>
              <span class="stat-detail__value">{{ stats.accepted_game_submissions }}</span>
            </div>
            <div class="stat-detail">
              <span class="stat-detail__dot stat-detail__dot--warning"></span>
              <span class="stat-detail__label">Pending</span>
              <span class="stat-detail__value">{{ stats.pending_game_submissions }}</span>
            </div>
          </div>
        </div>
      </el-col>

      <!-- Installers Card -->
      <el-col :xs="24" :sm="12" :lg="6">
        <router-link to="/installers/submissions" class="stat-card-link">
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__title">Installers</span>
              <el-icon class="stat-card__header-icon stat-card__header-icon--orange"><Download /></el-icon>
            </div>
            <div class="stat-card__value">{{ stats.installers }}</div>
            <div class="stat-card__details">
              <div class="stat-detail">
                <span class="stat-detail__dot stat-detail__dot--success"></span>
                <span class="stat-detail__label">Published</span>
                <span class="stat-detail__value">{{ stats.published_installers }}</span>
              </div>
              <div class="stat-detail">
                <span class="stat-detail__dot stat-detail__dot--warning"></span>
                <span class="stat-detail__label">Submissions</span>
                <span class="stat-detail__value">{{ stats.submitted_drafts }}</span>
              </div>
              <div class="stat-detail">
                <span class="stat-detail__dot stat-detail__dot--muted"></span>
                <span class="stat-detail__label">Drafts</span>
                <span class="stat-detail__value">{{ stats.drafts }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>

      <!-- Screenshots Card -->
      <el-col :xs="24" :sm="12" :lg="6">
        <router-link to="/games/screenshots" class="stat-card-link">
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__title">Screenshots</span>
              <el-icon class="stat-card__header-icon stat-card__header-icon--purple"><Picture /></el-icon>
            </div>
            <div class="stat-card__value">{{ stats.screenshots }}</div>
            <div class="stat-card__details">
              <div class="stat-detail">
                <span class="stat-detail__dot stat-detail__dot--success"></span>
                <span class="stat-detail__label">Published</span>
                <span class="stat-detail__value">{{ stats.published_screenshots }}</span>
              </div>
              <div class="stat-detail">
                <span class="stat-detail__dot stat-detail__dot--muted"></span>
                <span class="stat-detail__label">Unpublished</span>
                <span class="stat-detail__value">{{ stats.unpublished_screenshots }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>

    <!-- Quick Links -->
    <div class="section-title">Quick Actions</div>
    <el-row :gutter="16" class="quick-links">
      <el-col :xs="12" :sm="8">
        <router-link to="/games/merge" class="quick-link">
          <el-icon><Connection /></el-icon>
          <span>Merge Games</span>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="8">
        <router-link to="/installers/submissions" class="quick-link">
          <el-icon><Upload /></el-icon>
          <span>Installer Reviews</span>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="8">
        <router-link to="/installers/drafts" class="quick-link">
          <el-icon><Document /></el-icon>
          <span>Installer Drafts</span>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchStats } from '@/api/games'
import GameSearchInput from '@/components/GameSearchInput/index.vue'

export default {
  name: 'Dashboard',
  components: {
    GameSearchInput
  },
  data() {
    return {
      statsLoading: false,
      stats: {
        games: 0,
        published_games: 0,
        unpublished_games: 0,
        game_changes: 0,
        game_submissions: 0,
        accepted_game_submissions: 0,
        pending_game_submissions: 0,
        pending_game_changes: 0,
        installers: 0,
        published_installers: 0,
        submitted_drafts: 0,
        drafts: 0,
        screenshots: 0,
        published_screenshots: 0,
        unpublished_screenshots: 0
      }
    }
  },
  computed: {
    totalActionItems() {
      return (
        this.stats.pending_game_submissions +
        this.stats.pending_game_changes +
        this.stats.unpublished_screenshots
      )
    }
  },
  created() {
    this.getStats()
  },
  methods: {
    onGameSelect(slug) {
      this.$router.push({ path: '/games/' + slug })
    },
    getStats() {
      this.statsLoading = true
      fetchStats().then(response => {
        this.stats = response.data
        this.statsLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
}

.search-bar {
  margin-bottom: 24px;

  :deep(.el-autocomplete) {
    width: 100% !important;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--system-page-tip-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  margin-top: 8px;
}

/* Action Banner */
.action-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #fdf6ec;
  border: 1px solid #f5dab1;
  border-radius: 8px;
  color: #e6a23c;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

/* Action Cards */
.action-row {
  margin-bottom: 28px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 100px;
  margin-bottom: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__count {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  &__label {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.85;
  }

  &__icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 36px;
    opacity: 0.2;
  }

  &--warning {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    color: #fff;
  }

  &--info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
  }

  &--purple {
    background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
    color: #fff;
  }
}

/* Stat Cards */
.stats-row {
  margin-bottom: 28px;
}

.stat-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.stat-card {
  background: var(--system-page-background);
  border: 1px solid var(--system-header-border-color);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .stat-card-link &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__title {
    font-size: 13px;
    font-weight: 500;
    color: var(--system-page-tip-color);
  }

  &__header-icon {
    font-size: 20px;
    padding: 8px;
    border-radius: 8px;

    &--blue {
      color: #409eff;
      background: rgba(64, 158, 255, 0.1);
    }
    &--green {
      color: #67c23a;
      background: rgba(103, 194, 58, 0.1);
    }
    &--orange {
      color: #e6a23c;
      background: rgba(230, 162, 60, 0.1);
    }
    &--purple {
      color: #a855f7;
      background: rgba(168, 85, 247, 0.1);
    }
  }

  &__value {
    font-size: 28px;
    font-weight: 700;
    color: var(--system-page-color);
    margin-bottom: 16px;
    line-height: 1;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-top: 1px solid var(--system-header-border-color);
    padding-top: 12px;
  }
}

.stat-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;

    &--success {
      background: #67c23a;
    }
    &--warning {
      background: #e6a23c;
    }
    &--muted {
      background: #c0c4cc;
    }
  }

  &__label {
    color: var(--system-page-tip-color);
    flex: 1;
  }

  &__value {
    font-weight: 600;
    color: var(--system-page-color);
  }
}

/* Quick Links */
.quick-links {
  margin-bottom: 20px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: var(--system-page-background);
  border: 1px solid var(--system-header-border-color);
  border-radius: 8px;
  text-decoration: none;
  color: var(--system-page-color);
  font-size: 13px;
  font-weight: 500;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 12px;

  .el-icon {
    font-size: 18px;
    color: var(--system-primary-color);
  }

  &:hover {
    border-color: var(--system-primary-color);
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
  }
}

/* Dark mode adjustments */
:global(.dark) .action-banner {
  background: rgba(230, 162, 60, 0.1);
  border-color: rgba(230, 162, 60, 0.3);
}

:global(.dark) .stat-card {
  background: var(--system-page-background);
}

:global(.dark) .quick-link {
  background: var(--system-page-background);
}
</style>