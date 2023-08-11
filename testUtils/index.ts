import {act, fireEvent, render} from '@testing-library/react-native';

const customRender = (ui, options) => {
  const renderOptions = options?.rendererOptions;
  return render(ui, renderOptions);
};

// override render method
export {customRender as render};

export function wait(ms) {
  return act(() => new Promise(r => setTimeout(r, ms)));
}

// Due to debounce on Button UI Kit, we need to add milisecond waiting timer
export function fireAsyncPress(element, ms = 100) {
  fireEvent.press(element);
  return wait(ms);
}
