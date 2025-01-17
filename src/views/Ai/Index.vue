<script setup>
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postMessage } from '@/controllers';
import { sleep, showAlert } from '@/helpers';
import store from '@/configs/store';
import VsModal from "@vuesimple/vs-modal";

const route = useRoute();
const router = useRouter();
const queryText = ref(route.query.text);

let messages = ref([
  { role: 'system', content: 'Hello! How can I assist you today?' }
]);
let histories = ref([]);
let is_history = ref(-1)
let history_change_title = reactive({ index: null, title: '' })
let modal_change_title = ref(null);
const chatbox = ref(null);
let chat = ref('');
let isSending = ref(false);
const typingSpeed = ref(50);

onMounted(async () => {
  //await store.commit('destroyChatHistory');
  const stateHistory = store.getters.stateChatHistory;
  if (stateHistory) {
    histories.value = stateHistory;
  }

  if (queryText.value) {
    chat.value = queryText.value;
    await sendMessage();
  }

  removeQuery();
  scrollToBottom();
});

const removeQuery = () => {
  if (Object.keys(route.query).length > 0) {
    router.replace({ path: route.path });
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatbox.value) {
      chatbox.value.scrollTop = chatbox.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!chat.value.trim() || isSending.value) return;

  isSending.value = true;
  messages.value.push({ role: 'user', content: chat.value });
  scrollToBottom();

  const messagesForAPI = messages.value.slice(-1).map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const result = await postMessage(messagesForAPI);
  if (result) {
    if (result.success) {
      chat.value = '';
      await addMessage({ role: 'assistant', content: result.respone })
    } else {
      showAlert({ type: 'warning', text: result.msg });
    }
    isSending.value = false;
  }
};

const addMessage = async (newMsg) => {
  const index = messages.value.length;
  messages.value.push({ ...newMsg, content: "" });
  scrollToBottom();
  await typeMessage(newMsg, index);
  await saveChatHistory();
}

async function typeMessage(msg, index) {
  const fullText = msg.content;
  messages.value[index].content = "";
  for (let i = 0; i < fullText.length; i++) {
    messages.value[index].content += fullText[i];
    await new Promise((resolve) => setTimeout(resolve, typingSpeed.value));
  }
}

const saveChatHistory = async () => {
  if (is_history.value == -1) {
    const newHistory = {
      key: `chat-${Date.now()}`,
      title: `Chat ${histories.value.length + 1}`,
      messages: messages.value,
    };
    await store.commit('addChatHistory', newHistory);
    is_history.value = histories.value.length;
  } else {
    updateChatHistory();
  }
};

const updateChatHistory = async () => {
  await store.commit('updateChatMessageHistory', {
    key: is_history.value,
    messages: messages.value,
  });
}

const selectHistory = async (key) => {
  is_history.value = key;
  messages.value = histories.value[`${is_history.value}`].messages;
  show_history.value = false;
  scrollToBottom();
};
const changeTitleHistory = async (key) => {
  history_change_title.index = key;
  history_change_title.title = histories.value[key].title;
  openModalTitle();
};
const openModalTitle = (index) => {
  modal_change_title.value.open();
};

const closeModalTitle = () => {
  modal_change_title.value.close();
};
const processChangeTitle = async () => {
  await store.commit('updateChatTitleHistory', {
    key: history_change_title.index,
    title: history_change_title.title,
  });
  closeModalTitle();
}

const formatRespone = (content) => {
  const escapedContent = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;'); 
  const formattedBlocks = escapedContent.replace(
    /```(.*?)\n([\s\S]*?)```/g,
    (_, language, code) => {
      return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
    }
  );
  const formattedInline = formattedBlocks.replace(
    /`([^`]+)`/g,
    '<code class="attribute">$1</code>'
  );
  return formattedInline.replace(/\n/g, '<br>');
};

const show_history = ref(false)
function showHistory(){
  show_history.value = !show_history.value;
}
</script>

<template>
  <section class="section bg-transparent ai-section section-content">
    <div class="container container-ai py-1">
      <div class="row gy-4 justify-content-center content-ai">
        <div class="col-lg-3 p-0 ps-5 ai-history-sidebar" :class="{'is-show': show_history}" >
          <div class="card border-0">
            <div
              class="ai-content-header border-0 card-header bg-transparent py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 text-white ls-xs">History</h6>
              <a @click.prevent="showHistory();" class="d-xl-none d-lg-none btn btn-sm py-0 px-2 text-white">Close</a>
            </div>
            <div id="ai-history-body" class="card-body text-start">
              <div v-for="(his, idh) in histories" :key="his.key"
                class="ai-history-item d-flex mb-1 align-items-center justify-content-between py-1 px-2 rounded-sm">
                <a href="#" @click.prevent="selectHistory(idh)" class="ps-1 ws-75">
                  <p class="m-0 text-white fs-12px">{{ his.title }}</p>
                </a>
                <div class="d-inline-flex gap-1 ws-25">
                  <a href="#" @click.prevent="changeTitleHistory(idh)" class="btn btn-sm"><i
                      class="text-white bi bi-pencil"></i></a>
                  <a @click.prevent="selectHistory(idh)" href="#" class="btn btn-sm"><i
                      class="text-white bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 p-0 ps-5 ai-message-sidebar">
          <div class="card h-100 card-conversation border-0">
            <div
              class="ai-content-header card-header bg-transparent py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 text-white ls-xs">Ask Anything</h6>
              <a @click.prevent="showHistory();" class="d-xl-none d-lg-none btn btn-sm py-0 px-2 text-white">History</a>
            </div>
            <div id="ai-message-body" ref="chatbox" class="card-body text-start pe-5">
              <div v-for="msg in messages" :class="{ 'is-me': msg.role == 'user' }" class="ai-message-item d-flex mb-1">
                <p :class="{ 'px-3': msg.role == 'user' }" class="m-0 text-white fs-12px bubble py-2 rounded-sm" v-html="formatRespone(msg.content)"></p>
              </div>
            </div>
            <div id="ai-message-footer" class="card-footer py-4 border-0 bg-transparent pe-5">
              <form @submit.prevent="sendMessage">
                <div class="input-group input-group-lg rounded-sm shadow">
                  <a class="btn btn-sm text-white bg-transparent input-group-text">
                    <img src="/assets/img/add.png" />
                  </a>
                  <input id="ai-message-prompt" v-model="chat" required
                    class="ps-0 form-control form-control-sm fs-12px text-white bg-transparent"
                    placeholder="Start typing your prompt .....">
                  <button id="ai-send-message" type="submit" :disabled="isSending" :class="{ 'disabled': isSending }"
                    class="btn btn-sm text-white bg-transparent input-group-text">
                    <span v-if="isSending" class="spinner-border spinner-border-sm text-secondary" role="status"></span>
                    <img v-else src="/assets/img/send.png" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <vs-modal size="s" ref="modal_change_title">
    <template #header>
      <h6 class="m-0">Ubah Riwayat</h6>
    </template>
    <div class="modal-body mt-2">
      <form @submit.prevent="processChangeTitle">
        <input class="form-control" placeholder="Input title" v-model="history_change_title.title">
        <div class="d-flex justify-content-end mt-3">
          <button type="submit" class="btn btn-sm btn-primary">Save Change</button>
        </div>
      </form>
    </div>
  </vs-modal>
</template>

<style scoped></style>
