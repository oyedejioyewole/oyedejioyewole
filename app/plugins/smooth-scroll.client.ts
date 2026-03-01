import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default defineNuxtPlugin((nuxtApp) => {
  const locomotiveScroll = new LocomotiveScroll();
  nuxtApp.provide("locomotiveScroll", locomotiveScroll);
});
