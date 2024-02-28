import { ref } from 'vue';


export const useMenuItems = () => {
  const menuItems = ref([
    {
      title: "Home",
      icon: "pi pi-home",
      route: "/",
      isHovered: false
    },
    {
        title: "Templates",
        icon: "pi pi-file-edit",
        route: "/templates",
        isHovered: false
      },
      {
        title: "Documents Library",
        icon: "pi pi-server",
        route: "/document-library",
        isHovered: false
      },
      {
        title: "Data Library",
        icon: "pi pi-chart-bar",
        route: "/data-library",
        isHovered: false
      },
  ]);

  return { menuItems };
};

export const useSubItems = () => {
    const subItems = ref([
      {
        title: "List",
        icon: "pi pi-list",
        route: "settings/list",
        isHovered: false,
      },
      {
        title: "Field formats",
        icon: "pi pi-home",
        route: "settings/field_formats",
        isHovered: false
      },
      {
        title: "Archive",
        icon: "pi pi-sliders-h",
        route: "settings/archive",
        isHovered: false
      },
      {
        title: "User",
        icon: "pi pi-users",
        route: "settings/user",
        isHovered: false
      },
    ]);
  
    return { subItems };
  };