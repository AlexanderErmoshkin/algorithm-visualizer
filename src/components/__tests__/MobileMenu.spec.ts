import { describe, it, expect, vi, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MobileMenu from "../MobileMenu.vue";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { defineStore } from "pinia";
import { useStore } from "@/stores";

describe("MobileMenu.vue", () => {
  test("menu is hidden by default", () => {
    const wrapper = getWrapper(getPinia());
    expect(wrapper.find(".navbar-collapse").isVisible()).toBeFalsy();
  });

  test("menu is displayed", () => {
    const pinia = getPinia();
    const useStore = defineStore("algorithm", {
      state: () => ({ isMobileMenuOpened: true }),
    });
    useStore(pinia);

    const wrapper = getWrapper(pinia);
    expect(wrapper.find(".navbar-collapse").isVisible()).toBeTruthy();
  });

  it("toggles menu when a button is clicked", async () => {
    const wrapper = getWrapper(getPinia());
    await wrapper.find(".navbar-toggle-icon").trigger("click");
    const store = useStore();
    expect(store.toggleMobileMenu).toHaveBeenCalledOnce();
  });
});

function getWrapper(pinia: TestingPinia) {
  const wrapper = shallowMount(MobileMenu, {
    global: {
      plugins: [pinia],
      stubs: {
        MaxHeightTransition: {
          template: "<slot />",
        },
      },
    },
  });
  return wrapper;
}

function getPinia() {
  return createTestingPinia({ createSpy: vi.fn });
}
