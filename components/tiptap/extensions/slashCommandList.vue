<script setup lang="ts">
import { ref, watch } from "vue";
import { Editor, type Range } from "@tiptap/core";
import { type SuggestionItem } from "./slashExtension";
// import LoadingCircle from "../icons/loadingCircle.vue";
// import { useCompletion } from "ai/vue";
import { getPrevText } from "../lib/editor";
import { TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
 } from "@headlessui/vue";

const props = defineProps({
  items: {
    type: Array as PropType<SuggestionItem[]>,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
  range: {
    type: Object as PropType<Range>,
    required: true,
  },
});
const isYoutubeModal = ref(false);
const selectedIndex = ref(0);

// const { complete, isLoading } = useCompletion({
//   id: "novel",
//   api: "/api/generate",
//   onResponse: (_) => {
//     props.editor.chain().focus().deleteRange(props.range).run();
//   },
//   onFinish: (_prompt, completion) => {
//     // highlight the generated text
//     props.editor.commands.setTextSelection({
//       from: props.range.from,
//       to: props.range.from + completion.length,
//     });
//   },
//   onError: (e) => {
//   },
// });

const commandListContainer = ref();

const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
function onKeyDown(e: KeyboardEvent) {
  if (navigationKeys.includes(e.key)) {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      selectedIndex.value =
        (selectedIndex.value + props.items.length - 1) % props.items.length;
      scrollToSelected();
      return true;
    }
    if (e.key === "ArrowDown") {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
      console.log(selectedIndex.value)
      scrollToSelected();
      return true;
    }
    if (e.key === "Enter") {
      selectItem(selectedIndex.value);
      return true;
    }
    return false;
  }
}

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

defineExpose({
  onKeyDown,
});

const youtubeLink = ref("");
function selectItem(index: number) {
  const item = props.items[index];

  if (item) {
    if (item.title === "Youtube") {
      isYoutubeModal.value = true;
      const tippy = document.querySelector("div[data-tippy-root]");
      if (tippy instanceof HTMLDivElement) {
        tippy.style.display = "none";
      }
      // if (isLoading.value) return;
      // complete(
      //   getPrevText(props.editor, {
      //     chars: 5000,
      //     offset: 1,
      //   })
      // );
    } else {
      props.command(item);
    }
    // if (item.title === "Continue writing") {
    //   if (isLoading.value) return;
    //   complete(
    //     getPrevText(props.editor, {
    //       chars: 5000,
    //       offset: 1,
    //     })
    //   );
    // } else {
    //   props.command(item);
    // }
  }
}
const importYoutube = () => {
  props.editor
    .chain()
    .focus()
    .deleteRange(props.range)
    .setYoutubeVideo({
      src: youtubeLink.value,
    })
    .run();
};
function updateScrollView(container: HTMLElement, item: HTMLElement) {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
}

function scrollToSelected() {

  const container = commandListContainer.value;
  const item = container?.children[selectedIndex.value] as HTMLElement;
  if (container && item) {
    console.log('hi')
    updateScrollView(container, item);
  }


} 
 const setIsOpen = ( value:any) => {
    isYoutubeModal.value = value
  }
  const isOpen = ref(true)

function closeModal() {
  isYoutubeModal.value = false
}
function openModal() {
  isYoutubeModal.value = true
}
</script>
<template>
  <div>
    <div
      v-if="items.length > 0"
      ref="commandListContainer"
      class="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      <button
        v-for="(item, index) in items"
        class="flex items-center w-full px-2 py-1 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100"
        :class="index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''"
        :key="index"
        @click="selectItem(index)"
      >
        <div
          class="flex items-center justify-center w-10 h-10 bg-white border rounded-md border-stone-200"
        >
          <component :is="item.icon" size="18" />
        </div>
        <div>
          <p class="font-medium">{{ item.title }}</p>
          <p class="text-xs text-stone-500">{{ item.description }}</p>
        </div>
      </button>
    </div>


    <TransitionRoot appear :show="isYoutubeModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>




    <!-- <v-dialog v-model="isYoutubeModal">
      <v-card rounded="lg" width="30vw" class="mx-auto">
        <v-toolbar color="transparent">
          <v-toolbar-title>
            <p :style="{ fontWeight: '700', fontSize: '16px' }">유튜브 링크</p>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <button
            size="small"
            varaint="text"
            icon="mdi-close"
            @click.prevent="isYoutubeModal = false"
          >
          </button>
        </v-toolbar>
        <v-form @submit.prevent="importYoutube">
          <div class="px-4 pt-4">
            <customField
              placeholder="URL을 입력해주세요"
              v-model="youtubeLink"
              autofocus
            ></customField>
          </div>
          <div class="pa-4 text-end">
            <button
              rounded="lg"
              class="mr-4 px-8"
              variant="text"
              size="large"
              @click="isYoutubeModal = false"
              >취소</button
            >
            <button
              color="info"
              class="px-8"
              rounded="lg"
              variant="elevated"
              size="large"
              type="submit"
              >확인</button
            >
          </div>
        </v-form>
      </v-card>
    </v-dialog> -->
  </div>
</template>


<style></style>
