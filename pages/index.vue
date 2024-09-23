<!-- Copyright 2023 Ziad Malik -->

<template>
    <!-- @vue-ignore -->
    <div v-for="lecture in Object.keys(lecturesToAssignments)" class="py-4 space-y-4">
        <span class="px-2 text-xl font-semibold text-primary-500">{{ lecture }}</span>
        <div class="flex gap-2 px-2">
            <!-- @vue-ignore -->
            <UButton color="gray" icon="i-heroicons-globe-alt" label="Website" :to="lecturesToAssignments[lecture].website" target="_blank" />
            <!-- @vue-ignore -->
            <UButton color="gray" icon="i-heroicons-video-camera" label="Video Lectures" :to="lecturesToAssignments[lecture].video" target="_blank" />
        </div>
        <div class="flex gap-3 overflow-auto px-2 py-2">
            <!-- @vue-ignore -->
            <AssignmentCard v-for="assignment in lecturesToAssignments[lecture].exercises" :assignment="assignment" />
        </div>
    </div>

    <div class="flex flex-col px-2">
        <span class="text-xl font-semibold text-primary-500">Diskrete Mathematik</span>
        <div class="flex gap-2 my-4">
            <UButton color="gray" icon="i-heroicons-globe-alt" label="Website" to="https://crypto.ethz.ch/teaching/DM24/" target="_blank" />
            <!-- @vue-ignore -->
            <UButton color="gray" icon="i-heroicons-video-camera" label="Video Lectures" to="https://video.ethz.ch/lectures/d-infk/2024/autumn/252-0025-01L.html" target="_blank" />
            <UButton color="gray" icon="i-heroicons-globe-alt" label="exercise" to="https://dm.crypto.ethz.ch/" target="_blank" />
        </div>
    </div>
    <div class="flex flex-col px-2">
        <span class="text-xl font-semibold text-primary-500">Analysis II</span>
        <div class="flex gap-2 my-4">
            <UButton color="gray" icon="i-heroicons-globe-alt" label="Website" to="https://moodle-app2.let.ethz.ch/course/view.php?id=23610#section-2" target="_blank" />
            <!-- @vue-ignore -->
            <UButton color="gray" icon="i-heroicons-video-camera" label="Video Lectures" to="https://video.ethz.ch/lectures/d-math/2024/autumn/401-0213-16L.html" target="_blank" />
            <UButton color="gray" icon="i-heroicons-globe-alt" label="exercise" to="https://moodle-app2.let.ethz.ch/course/view.php?id=23610#section-3" target="_blank" />
        </div>
    </div>
    <div class="flex flex-col px-2">
        <span class="text-xl font-semibold text-primary-500">Theoretische Info</span>
        <div class="flex gap-2 my-4">
            <UButton color="gray" icon="i-heroicons-globe-alt" label="Website" to="https://moodle-app2.let.ethz.ch/course/view.php?id=23497" target="_blank" />
            <!-- @vue-ignore -->
            <UButton color="gray" icon="i-heroicons-video-camera" label="Video Lectures" to="https://video.ethz.ch/lectures/d-infk/2024/autumn/252-0057-00L.html" target="_blank" />
            <UButton color="gray" icon="i-heroicons-globe-alt" label="exercise" to="https://moodle-app2.let.ethz.ch/course/view.php?id=23497#section-6" target="_blank" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: lecturesToAssignments } = await useFetch("/api/assignments", {
    transform: (data) => {
        const obj = data;

        Object.keys(data).forEach((key) => {
            // @ts-ignore
            obj[key].exercises = obj[key].exercises.reverse();
        });

        return obj;
    },
});
</script>
