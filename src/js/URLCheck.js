function checkUrlParameterAndCreateButton() {
    console.log('URLCheck');
    let url = window.location.href;
    const button = document.querySelector('.BackToInnovation');

    if (url.includes('innovation')) {
        button.style.display = 'flex';
        button.addEventListener('click', function() {
            window.location.href = 'https://i.transport.mos.ru/screen';
        });
        document.addEventListener("DOMContentLoaded", () => {
            const links = document.querySelectorAll("a");
            links.forEach(link => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("#") && !href.startsWith("mailto") && !href.startsWith("tel") && !href.includes("?innovation")) {
                    link.setAttribute("href", `${href}?innovation`);
                }
            });
        });
    }
}

checkUrlParameterAndCreateButton();
// window.onload = checkUrlParameterAndCreateButton;
