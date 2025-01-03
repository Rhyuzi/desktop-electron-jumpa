<template>
	<div id="contactDetails" class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <div class="bg-white rounded-px5 mx-auto border border-grey-disable flex flex-col items-center py-px15 lg:py-4 xl:py-5 2xl:py-6 max-w-xs">
                <img :src=profileImage :alt=profileName class="bg-grey-black rounded-full w-28 lg:w-32 xl:w-36 2xl:w-40 h-28 lg:h-32 xl:h-36 2xl:h-40 object-cover mt-2.5 lg:mt-3 xl:mt-4 2xl:mt-5">
                <div class="px-8 text-center py-px15 lg:py-4 xl:py-5 2xl:py-6">
                    <h3 class="kanit text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-grey-ed">{{ profileName }}</h3>
                    <h5 class="text-px10 font-bold text-grey-gray pb-px15">{{ profileEmail }}</h5>
                    <p class="text-px10 text-grey-gray">Bio and phone</p>
                    <p class="text-px10 text-grey-black pb-2.5">{{ profileBio }}</p>
                    <h4 class="text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold text-grey-ed pb-7 lg:pb-8 xl:pb-9 2xl:pb-10">{{ profilePhone }}</h4>
                </div>
                <div class="flex justify-center gap-2.5 items-center border-t border-grey-disable pt-2.5 lg:pt-3 xl:pt-4 2xl:pt-5 w-full">
                    <button @click="$emit('edit')" class="bg-grey-background border border-grey-disable text-px10 text-grey-ed rounded-px5 px-4 lg:px-5 xl:px-6 2xl:px-7 py-px5 lg:py-2">Edit Contact</button>
                    <button @click="$emit('delete')" class="bg-lightred text-white text-px10 rounded-px5 px-4 lg:px-5 xl:px-6 2xl:px-7 py-px5 lg:py-2">Delete</button>
                </div>
            </div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'ContactDetails',
    props: ['profileImage', 'profileName', 'profileEmail', 'profileBio', 'profilePhone', 'profileId']
}
</script>
<style>
</style>