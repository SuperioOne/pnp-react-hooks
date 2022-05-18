"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[8062],{9238:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"v1.1.0","metadata":{"permalink":"/pnp-react-hooks/changelog/v1.1.0","source":"@site/changelog/2022-05-18-v1.1.0.md","title":"v1.1.0 - More hooks","description":"Changelog","date":"2022-05-18T00:00:00.000Z","formattedDate":"May 18, 2022","tags":[{"label":"pnp-react-hooks","permalink":"/pnp-react-hooks/changelog/tags/pnp-react-hooks"},{"label":"v1","permalink":"/pnp-react-hooks/changelog/tags/v-1"}],"truncated":false,"authors":[{"name":"SuperiorOne","title":"Maintainer","url":"https://github.com/SuperioOne","key":"superior"}],"frontMatter":{"slug":"v1.1.0","title":"v1.1.0 - More hooks","authors":["superior"],"tags":["pnp-react-hooks","v1"]},"nextItem":{"title":"v1.0.1 - Search patch","permalink":"/pnp-react-hooks/changelog/v1.0.1"}},"content":"## Changelog\\n\\n### Sp\\n  - **New** useListItems paged request option.\\n  - **New** useView and useViews hooks.\\n  - **New** useListAsStream hook.\\n  - **New** FetchWithAbort behavior for cancelling consecutive fetch requests automatically.\\n  - **Fixed:** useSearch double query issue."},{"id":"v1.0.1","metadata":{"permalink":"/pnp-react-hooks/changelog/v1.0.1","source":"@site/changelog/2022-03-11-v1.0.1.md","title":"v1.0.1 - Search patch","description":"Changelog","date":"2022-03-11T00:00:00.000Z","formattedDate":"March 11, 2022","tags":[{"label":"pnp-react-hooks","permalink":"/pnp-react-hooks/changelog/tags/pnp-react-hooks"},{"label":"v1","permalink":"/pnp-react-hooks/changelog/tags/v-1"}],"truncated":false,"authors":[{"name":"SuperiorOne","title":"Maintainer","url":"https://github.com/SuperioOne","key":"superior"}],"frontMatter":{"slug":"v1.0.1","title":"v1.0.1 - Search patch","authors":["superior"],"tags":["pnp-react-hooks","v1"]},"prevItem":{"title":"v1.1.0 - More hooks","permalink":"/pnp-react-hooks/changelog/v1.1.0"},"nextItem":{"title":"v1.0.0 - Initial release","permalink":"/pnp-react-hooks/changelog/v1.0.0"}},"content":"## Changelog\\n\\n### Sp\\n  - **Fixed:** useSearch was failing when getPageDispatch was called more than once.\\n\\n### Dependencies\\n  - **Updated:** All dependencies are updated to the latest version and tested for any breaking changes."},{"id":"v1.0.0","metadata":{"permalink":"/pnp-react-hooks/changelog/v1.0.0","source":"@site/changelog/2022-03-09-v1.0.0.md","title":"v1.0.0 - Initial release","description":"What\'s In","date":"2022-03-09T00:00:00.000Z","formattedDate":"March 9, 2022","tags":[{"label":"pnp-react-hooks","permalink":"/pnp-react-hooks/changelog/tags/pnp-react-hooks"},{"label":"v1","permalink":"/pnp-react-hooks/changelog/tags/v-1"}],"truncated":false,"authors":[{"name":"SuperiorOne","title":"Maintainer","url":"https://github.com/SuperioOne","key":"superior"}],"frontMatter":{"slug":"v1.0.0","title":"v1.0.0 - Initial release","authors":["superior"],"tags":["pnp-react-hooks","v1"]},"prevItem":{"title":"v1.0.1 - Search patch","permalink":"/pnp-react-hooks/changelog/v1.0.1"}},"content":"## What\'s In\\n\\n* 42 new custom hook for accessing SharePoint contents.\\n* PnPjs v3 upgrade. *v2 support dropped before major release.*\\n* Configuration system based on React Context API.\\n* Helper hook function for accessing options.\\n\\n## What\'s planned for future release\\n\\n- [x] Paged mode for `useListItems` hook.\\n- [x] Auto request cancellation with [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). Currently observers cancels execution but fetch request continues on background.\\n- [ ] Adding a [*subscription*](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/subscribe-to-list-notifications) base hook function similar to React\'s `useEffect` to execute custom action when list content updated.\\n- [ ] Recursive option for `useFiles`."}]}')}}]);