<template>
  <div class="action-bar">
    <div v-if="$slots.left || left" class="action-bar__left">
      <slot v-if="$slots.left" name="left" />
      <template v-else-if="left">
        <slot name="default" />
      </template>
    </div>
    <div v-if="$slots.right || right" class="action-bar__right">
      <slot v-if="$slots.right" name="right" />
      <template v-else-if="right">
        <slot name="default" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  /** Whether children are aligned to left (ignored with slots) */
  left?: boolean;
  /** Whether children are aligned to right (ignored with slots) */
  right?: boolean;
}

withDefaults(defineProps<IProps>(), {
  left: false,
  right: false,
});
</script>

<style lang="scss" scoped>
$item-spacing: 16px;

.action-bar {
  display: flex;
  align-items: center;
  width: 100%;
}

.action-bar__left,
.action-bar__right {
  display: flex;
  align-items: center;
}

.action-bar__left {
  > :not(:first-child) {
    margin-left: $item-spacing;
  }
}

.action-bar__right {
  margin-left: auto;

  > :not(:last-child) {
    margin-right: $item-spacing;
  }
}
</style>
