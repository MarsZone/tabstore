pnpm i

pnpm dev

src - main source.
content-script - scripts and components to be injected as content_script
iframe content script iframe vue3 app which will be injected into page
background - scripts for background.
popup - popup vuejs application root
pages - popup pages
options - options vuejs application root
pages - options pages
setup - Page for Install and Update extension events
pages - pages for install and update events
offscreen - extension offscreen pages, can be used for audio, screen recording etc
pages - application pages, common to all views (About, Contact, Authentication etc)
components - auto-imported Vue components that are shared in popup and options page.
assets - assets used in Vue components
dist - built files
chrome - Chrome extension, can be publishd to Opera, Edge and toher chromium based browsers store etc
firefox - Firefox extension

-- todo
- 在popup页面，增加一个按钮。点击后获取当前chrome所有tab的信息，打印出来。
- 