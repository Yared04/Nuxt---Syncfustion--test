import { ref } from 'vue'

export const newListData = ref([
  {
    id: 1,
    name: 'Item 1',
  },
  {
    id: 2,
    name: 'Item 2',
  },
  {
    id: 3,
    name: 'Item 3',
  },
])

export const addNewListItem = ref([
  {
    id: 1,
    title: 'List 1',
    isHovered: false,
    opensubmenu: true,
    level: 0,
    sublists: [
      {
        id: 1,
        title: 'Report',
        isHovered: false,
        opensubmenu: false,
        level: 1,
        sublists: [
          {
            id: 1,
            title: 'Section',
            isHovered: false,
            opensubmenu: true,
            level: 2,
            sublists: [
              {
                id: 1,
                title: 'Data',
                isHovered: false,
                level: 3,
                sublists: [],
              },
            ],
          },
          {
            id: 2,
            title: 'Task',
            isHovered: false,
            level: 2,
            opensubmenu: false,
            sublists: [
              {
                id: 1,
                title: 'Task Data',
                isHovered: false,
                level: 3,
                sublists: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Trial 1',
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        sublists: [
          {
            id: 2,
            title: 'Trial Ttask',
            isHovered: false,
            level: 2,
            opensubmenu: false,
            sublists: [
              {
                id: 1,
                title: 'Task data',
                isHovered: false,
                level: 3,
                sublists: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Item 2',
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        sublists: [],
      },
    ],
  },
  {
    id: 2,
    title: 'List 2',
    isHovered: false,
    opensubmenu: true,
    level: 0,
    sublists: [
      {
        id: 1,
        title: 'Contract',
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        sublists: [
          {
            id: 1,
            title: 'Contract item',
            isHovered: false,
            opensubmenu: false,
            level: 2,
            sublists: [],
          },
        ],
      },
      {
        id: 2,
        title: 'Form',
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        sublists: [],
      },
    ],
  },
])
