import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ControlPanel from "../ControlPanel.vue";
import Button from "../UI/Button.vue";
import { createTestingPinia } from "@pinia/testing";
import { useStore } from "@/stores";

describe("ControlPanel.vue", () => {
  it("renders buttons", () => {
    expect(getWrapper().findAllComponents(Button).length).toBe(2);
  });

  it('generates a random list on "Random" click', async () => {
    const wrapper = getWrapper();
    await wrapper.findAllComponents(Button).at(0)?.trigger("click");
    const store = useStore();
    expect(store.generateRandomArray).toHaveBeenCalledOnce();
  });

  it('starts sorting the list on "Sort" click', async () => {
    const wrapper = getWrapper();
    await wrapper.findAllComponents(Button).at(1)?.trigger("click");
    const store = useStore();
    expect(store.executeAlgorithm).toHaveBeenCalledOnce();
  });
});

function getWrapper() {
  return shallowMount(ControlPanel, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  });
}
