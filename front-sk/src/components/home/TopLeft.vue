<template>
    <div class="d-block white--text">
        <tabs class="pa-2"/>
        <tabs-view/>
    </div>
</template>

<script>
export default {
    components: {
        Tabs: () => import('@/components/home/Tabs'),
        TabsView: () => import('@/components/home/TabsView'),
    }
}
</script>