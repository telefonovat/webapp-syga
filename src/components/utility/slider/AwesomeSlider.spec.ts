import { describe, expect, it } from "vitest";
import type { AwesomeSliderModel } from "./AwesomeSliderModel";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import AwesomeSlider from "./AwesomeSlider.vue";

describe("Slider functionality", async () => {
  it("should render model value changes", async () => {
    const sliderModel = ref<AwesomeSliderModel>({
      value: 0,
      min: 0,
      max: 100,
    });

    const wrapper = mount(AwesomeSlider, {
      props: {
        modelValue: sliderModel.value,
        "onUpdate:modelValue": (e) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    expect(wrapper.html()).toContain("0");

    sliderModel.value.value = 99;

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("99");
  });
});
