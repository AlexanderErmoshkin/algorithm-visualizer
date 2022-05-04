import { describe, it, expect, vi } from "vitest";
import { defineStore } from "pinia";
import { shallowMount } from "@vue/test-utils";
import Log from "../Log.vue";
import { createTestingPinia } from "@pinia/testing";

describe("Log.vue", () => {
  it("renders a list of logs", () => {
    expect(getWrapper().findAll("li").length).toBe(3);
  });

  it("scrolls to the end of the logs element when the component is updated", async () => {
    const wrapper = getWrapper();
    const scrollMock = vi.fn();
    (wrapper.vm.$el as HTMLDivElement).scroll = scrollMock;
    await wrapper.vm.$forceUpdate();
    expect(scrollMock).toHaveBeenCalledOnce();
  });
});

function getWrapper() {
  const useStore = defineStore("algorithm", {
    getters: {
      logs: () => ["log1", "log2", "log3"],
    },
  });
  const pinia = createTestingPinia({ createSpy: vi.fn });
  useStore(pinia);

  return shallowMount(Log, {
    global: {
      plugins: [pinia],
    },
  });
}
