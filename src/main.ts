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

export const bootstrap = async (props: any) => {
  console.log('🚀 Maintenance App: Bootstrapping...');
  return vueLifecycles.bootstrap(props);
};

export const mount = async (props: any) => {
  console.log('📦 Maintenance App: Mounting...', { props });
  
  // Inject CSS if not already present
  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'http://localhost:4202/style.css';
    styleLink.setAttribute('data-maintenance-css', 'true');
    document.head.appendChild(styleLink);
  }
  
  const result = await vueLifecycles.mount(props);
  console.log('✅ Maintenance App: Mounted successfully!');
  return result;
};

export const unmount = async (props: any) => {
  console.log('🔄 Maintenance App: Unmounting...');
  const result = await vueLifecycles.unmount(props);
  
  // Remove CSS when unmounting
  if (styleLink && styleLink.parentNode) {
    styleLink.parentNode.removeChild(styleLink);
    styleLink = null;
  }
  
  console.log('✅ Maintenance App: Unmounted successfully!');
  return result;
};
