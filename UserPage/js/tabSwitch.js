/**
 * Hàm chuyển tab
 */
export function tabSwitch(selector) {
    document.querySelectorAll(selector).forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll(selector).forEach(function (t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');
        });
    });
}