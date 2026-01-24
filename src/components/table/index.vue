<template>
  <div class="system-table-box">
    <el-table
      v-bind="$attrs"
      class="system-table"
      border
      height="100%"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="50" v-if="showSelection" />
      <el-table-column label="#" width="60" align="center" v-if="showIndex">
        <template #default="scope">
          {{ (page.index - 1) * page.size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="showPage"
      v-model:current-page="page.index"
      class="system-page"
      background
      :layout="pageLayout"
      :total="page.total"
      :page-size="page.size"
      :page-sizes="pageSizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    data: { type: Array, default: () => [] },
    select: { type: Array, default: () => [] },
    showIndex: { type: Boolean, default: false },
    showSelection: { type: Boolean, default: false },
    showPage: { type: Boolean, default: true },
    page: {
      type: Object,
      default: () => {
        return { index: 1, size: 20, total: 0 }
      }
    },
    pageLayout: { type: String, default: "total, sizes, prev, pager, next, jumper" },
    pageSizes: { type: Array, default: [10, 20, 50, 100] }
  },
  setup(props, context) {
    let timer = null
    const handleCurrentChange = (val) => {
      if (timer) {
        props.page.index = 1
      } else {
        props.page.index = val
        context.emit("getTableData")
      }
    }
    const handleSizeChange = (val) => {
      timer = 'work'
      setTimeout(() => {
        timer = null
      }, 100)
      props.page.size = val
      context.emit("getTableData", true)
    }
    const handleSelectionChange = (val) =>{
      context.emit("selection-change", val)
    }
    return {
      handleCurrentChange,
      handleSizeChange,
      handleSelectionChange
    }
  }
})
</script>

<style lang="scss" scoped>
  .system-table-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    .system-table {
      flex: 1;
      height: 100%;
    }
    
    .system-page {
      margin-top: 20px;
    }
  }
</style>