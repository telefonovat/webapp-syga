import { render, screen } from '@testing-library/vue';
import App from '@/App.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  components,
  directives,
});

describe('Top level error boundary', () => {
  it('renders the app without any errors thrown', async () => {
    const pinia = createPinia();
    render(App, {
      global: {
        plugins: [router, pinia, vuetify],
      },
    });

    await router.isReady();

    expect(screen.getByText(/Syga/i)).toBeInTheDocument();
  });

  it('renders top-level error when an error bubbles up', async () => {
    const ErroneousComponent = defineComponent({
      name: 'ErroneousComponent',
      mounted() {
        throw new Error('Boom');
      },
      template: '<div>This should not render</div>',
    });

    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: ErroneousComponent,
      },
    });

    await nextTick();

    expect(wrapper.html()).toContain('Error');
  });
});
