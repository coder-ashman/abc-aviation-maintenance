import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

// Ensure `process.env.NODE_ENV` is defined when the bundle executes in the shell.
const globalRef = typeof globalThis !== 'undefined' ? globalThis : window;
const processRef = (globalRef as any).process || ((globalRef as any).process = {});
processRef.env = {
  NODE_ENV: processRef.env?.NODE_ENV || (import.meta.env?.MODE === 'development' ? 'development' : 'production'),
  ...processRef.env,
};

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
});

// Track CSS link element
let styleLink: HTMLLinkElement | null = null;

export const bootstrap = vueLifecycles.bootstrap;

export const mount = async (props: any) => {
  // Inject the built CSS (Vite library mode doesn't auto-inject it)
  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'http://localhost:4202/style.css';
    styleLink.setAttribute('data-maintenance-css', 'true');
    document.head.appendChild(styleLink);
  }
  
  return vueLifecycles.mount(props);
};

export const unmount = async (props: any) => {
  const result = await vueLifecycles.unmount(props);
  
  // Remove CSS when unmounting
  if (styleLink && styleLink.parentNode) {
    styleLink.parentNode.removeChild(styleLink);
    styleLink = null;
  }
  
  return result;
};
