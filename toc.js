// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">PnP React Hooks</li><li class="chapter-item expanded "><a href="getting-started.html"><strong aria-hidden="true">1.</strong> Getting Started</a></li><li class="chapter-item expanded "><a href="hook-options.html"><strong aria-hidden="true">2.</strong> Hook Options</a></li><li class="chapter-item expanded "><a href="option-provider.html"><strong aria-hidden="true">3.</strong> Option Provider</a></li><li class="chapter-item expanded "><a href="accessing-options.html"><strong aria-hidden="true">4.</strong> Accessing Options</a></li><li class="chapter-item expanded "><a href="hooks.html"><strong aria-hidden="true">5.</strong> SP Hooks</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="hooks/useApp.html"><strong aria-hidden="true">5.1.</strong> useApp</a></li><li class="chapter-item expanded "><a href="hooks/useApps.html"><strong aria-hidden="true">5.2.</strong> useApps</a></li><li class="chapter-item expanded "><a href="hooks/useAttachment.html"><strong aria-hidden="true">5.3.</strong> useAttachment</a></li><li class="chapter-item expanded "><a href="hooks/useAttachments.html"><strong aria-hidden="true">5.4.</strong> useAttachments</a></li><li class="chapter-item expanded "><a href="hooks/useChanges.html"><strong aria-hidden="true">5.5.</strong> useChanges</a></li><li class="chapter-item expanded "><a href="hooks/useContentTypes.html"><strong aria-hidden="true">5.6.</strong> useContentTypes</a></li><li class="chapter-item expanded "><a href="hooks/useCurrentUser.html"><strong aria-hidden="true">5.7.</strong> useCurrentUser</a></li><li class="chapter-item expanded "><a href="hooks/useFeatures.html"><strong aria-hidden="true">5.8.</strong> useFeatures</a></li><li class="chapter-item expanded "><a href="hooks/useField.html"><strong aria-hidden="true">5.9.</strong> useField</a></li><li class="chapter-item expanded "><a href="hooks/useFields.html"><strong aria-hidden="true">5.10.</strong> useFields</a></li><li class="chapter-item expanded "><a href="hooks/useFile.html"><strong aria-hidden="true">5.11.</strong> useFile</a></li><li class="chapter-item expanded "><a href="hooks/useFiles.html"><strong aria-hidden="true">5.12.</strong> useFiles</a></li><li class="chapter-item expanded "><a href="hooks/useFolder.html"><strong aria-hidden="true">5.13.</strong> useFolder</a></li><li class="chapter-item expanded "><a href="hooks/useFolders.html"><strong aria-hidden="true">5.14.</strong> useFolders</a></li><li class="chapter-item expanded "><a href="hooks/useGroup.html"><strong aria-hidden="true">5.15.</strong> useGroup</a></li><li class="chapter-item expanded "><a href="hooks/useGroups.html"><strong aria-hidden="true">5.16.</strong> useGroups</a></li><li class="chapter-item expanded "><a href="hooks/useGroupUser.html"><strong aria-hidden="true">5.17.</strong> useGroupUser</a></li><li class="chapter-item expanded "><a href="hooks/useGroupUsers.html"><strong aria-hidden="true">5.18.</strong> useGroupUsers</a></li><li class="chapter-item expanded "><a href="hooks/useHasPermission.html"><strong aria-hidden="true">5.19.</strong> useHasPermission</a></li><li class="chapter-item expanded "><a href="hooks/useIsMemberOf.html"><strong aria-hidden="true">5.20.</strong> useIsMemberOf</a></li><li class="chapter-item expanded "><a href="hooks/useItemComments.html"><strong aria-hidden="true">5.21.</strong> useItemComments</a></li><li class="chapter-item expanded "><a href="hooks/useListAsStream.html"><strong aria-hidden="true">5.22.</strong> useListAsStream</a></li><li class="chapter-item expanded "><a href="hooks/useListChangeToken.html"><strong aria-hidden="true">5.23.</strong> useListChangeToken</a></li><li class="chapter-item expanded "><a href="hooks/useListItem.html"><strong aria-hidden="true">5.24.</strong> useListItem</a></li><li class="chapter-item expanded "><a href="hooks/useListItems.html"><strong aria-hidden="true">5.25.</strong> useListItems</a></li><li class="chapter-item expanded "><a href="hooks/useList.html"><strong aria-hidden="true">5.26.</strong> useList</a></li><li class="chapter-item expanded "><a href="hooks/useLists.html"><strong aria-hidden="true">5.27.</strong> useLists</a></li><li class="chapter-item expanded "><a href="hooks/useNavigation.html"><strong aria-hidden="true">5.28.</strong> useNavigation</a></li><li class="chapter-item expanded "><a href="hooks/usePageComments.html"><strong aria-hidden="true">5.29.</strong> usePageComments</a></li><li class="chapter-item expanded "><a href="hooks/useProfile.html"><strong aria-hidden="true">5.30.</strong> useProfile</a></li><li class="chapter-item expanded "><a href="hooks/useRecycleBinItem.html"><strong aria-hidden="true">5.31.</strong> useRecycleBinItem</a></li><li class="chapter-item expanded "><a href="hooks/useRecycleBinItems.html"><strong aria-hidden="true">5.32.</strong> useRecycleBinItems</a></li><li class="chapter-item expanded "><a href="hooks/useRegionalSetting.html"><strong aria-hidden="true">5.33.</strong> useRegionalSetting</a></li><li class="chapter-item expanded "><a href="hooks/useRoleAssignments.html"><strong aria-hidden="true">5.34.</strong> useRoleAssignments</a></li><li class="chapter-item expanded "><a href="hooks/useRoleDefinition.html"><strong aria-hidden="true">5.35.</strong> useRoleDefinition</a></li><li class="chapter-item expanded "><a href="hooks/useRoleDefinitions.html"><strong aria-hidden="true">5.36.</strong> useRoleDefinitions</a></li><li class="chapter-item expanded "><a href="hooks/useSearch.html"><strong aria-hidden="true">5.37.</strong> useSearch</a></li><li class="chapter-item expanded "><a href="hooks/useSearchUser.html"><strong aria-hidden="true">5.38.</strong> useSearchUser</a></li><li class="chapter-item expanded "><a href="hooks/useSite.html"><strong aria-hidden="true">5.39.</strong> useSite</a></li><li class="chapter-item expanded "><a href="hooks/useSiteUsers.html"><strong aria-hidden="true">5.40.</strong> useSiteUsers</a></li><li class="chapter-item expanded "><a href="hooks/useSubWebs.html"><strong aria-hidden="true">5.41.</strong> useSubWebs</a></li><li class="chapter-item expanded "><a href="hooks/useUser.html"><strong aria-hidden="true">5.42.</strong> useUser</a></li><li class="chapter-item expanded "><a href="hooks/useView.html"><strong aria-hidden="true">5.43.</strong> useView</a></li><li class="chapter-item expanded "><a href="hooks/useViews.html"><strong aria-hidden="true">5.44.</strong> useViews</a></li><li class="chapter-item expanded "><a href="hooks/useWebInfo.html"><strong aria-hidden="true">5.45.</strong> useWebInfo</a></li><li class="chapter-item expanded "><a href="hooks/useWebProperties.html"><strong aria-hidden="true">5.46.</strong> useWebProperties</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Development</li><li class="chapter-item expanded "><a href="building-and-testing.html"><strong aria-hidden="true">6.</strong> Building &amp; Testing</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="changelog.html">Changelog</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
