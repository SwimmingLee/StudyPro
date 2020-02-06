<template>
<div id="postcontent">'
    <h1>hello</h1>{{$route.params.postID}}
</div>
</template>

<script>
export default {
    name: 'postcontent',
    props: ['postID']
}
</script>