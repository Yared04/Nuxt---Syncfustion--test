<template>
  <div class="mb-10">
    <div class="py-2 ml-1">
      <p class="font-medium text-surface-600 font-poppins text-xl mb-5 ml-2">
        Integration
      </p>

      <div class="flex justify-between mt-5 ml-2">
        <span class="relative flex">
          <i
            class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
            style="color: rgb(117, 119, 120);"
          ></i>
          <InputText
            v-model="searchQuery" placeholder="Search"
            class="pl-10 font-normal rounded-lg border-gray-300 w-72"
          />
        </span>
        <Button
          icon="pi pi-sliders-v" label="Filter" outlined severity="surface-600"
          class="h-9 text-surface-500 border-surface-300"
        />
      </div>

      <div class="mt-5 mb-10">
        <!-- <p class="font-medium text-surface-600 font-poppins text-xl my-8">All Integrations</p> -->
        <div class="flex flex-wrap mb-10">
          <div
            v-for="integration in filteredIntegrations"
            class="card w-72 h-44 shadow-sm space-y-6 ml-2"
          >
            <div class="flex space-x-3">
              <img :src="integration.img" alt="integration" class="w-10 h-10 rounded-md" />
              <p class="text-lg font-medium font-poppins pt-2 text-surface-600">
                {{ integration.title }}
              </p>
            </div>
            <Button
              label="Connect" severity="surface-500"
              class="bg-surface-100 w-4/5 h-10 text-surface-500 font-thin btn"
            />
            <p class="text-surface-500 text-sm font-poppins desc pr-1">
              {{ integration.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')

const integrationsList = [

  {
    title: 'Slack',
    route: '/settings/integration/slack',
    img: 'https://static-00.iconduck.com/assets.00/slack-icon-2048x2048-5nfqoyso.png',
    description: 'Enable Slack notification for workspace data changes.',
  },
  {
    title: 'Notion',
    route: '/settings/integration',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    description: 'Connect your workspace with Notion to sync data.',
  },
  {
    title: 'Google Drive',
    route: '/settings/integration/google-drive',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png',
    description: 'Connect your workspace with Google Drive to sync data.',
  },
  {
    title: 'Dropbox',
    route: '/settings/integration/dropbox',
    img: 'https://static-00.iconduck.com/assets.00/dropbox-rounded-icon-2048x2048-8gdnefgc.png',
    description: 'Connect your workspace with Dropbox to sync data.',
  },
  {
    title: 'Spreadsheet',
    route: '/settings/integration',
    img: 'https://static-00.iconduck.com/assets.00/ms-excel-icon-2048x2026-nws24wyy.png',
    description: 'Import data from Google Sheets or Excel',
  },
  {
    title: 'Stripe',
    img: 'https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png',
    description: 'API suite for online payment processing and commerce solutions',
  },
  {
    title: 'Chatgpt',
    img: 'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
    description: 'AI-powered chatbot for customer support',
  },
  {
    title: 'Zapier',
    img: 'https://simpletexting.com/wp-content/uploads/2020/06/zapier-logomark.svg',
    description: 'Build custom automations to create or update issues',
  },
  {
    title: 'Github',
    img: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    description: 'Developers can collaborate on projects using Github',
  },
  {
    title: 'Airtable',
    img: 'https://static-00.iconduck.com/assets.00/airtable-icon-512x428-olxouyvv.png',
    description: 'Accelerate your workflow with Airtable',
  },
  {
    title: 'Miro',
    img: 'https://play-lh.googleusercontent.com/LSnrgWVfyKTEp7zLAWNdXukvHt0jvH-KmnAjTV6cVJWXauW4K8iFX4lI0MYY3drQpAuc',
    description: 'The online collaborative whiteboard platform to bring teams together',
  },

]
// Filtered integrations based on the search query
const filteredIntegrations = computed(() => {
  return integrationsList.filter((integration) => {
    return integration.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
</script>

<style scoped>
.card {
    position: relative;
    perspective: 1000px;
    /* Add perspective to create 3D effect */
}

.card .btn,
.card .desc {
    position: absolute;
    top: 10;
    left: 1;
    right: 1;
    bottom: 5;
    backface-visibility: hidden;
    transition: all 0.3s ease;
}

.card .btn {
    z-index: 2;
}

.card .btn {
    transform: rotateY(-90deg);
    transform-origin: left;
    pointer-events: none;
}

.card:hover .desc {
    transform: rotateY(90deg);
    pointer-events: none;
}

.card:hover .btn {
    transform: rotateY(0deg);
    pointer-events: auto;
}
</style>
