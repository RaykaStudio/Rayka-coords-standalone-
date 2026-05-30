const wrapper = document.getElementById('coords-wrapper');
let isTransitioning = false;

window.addEventListener('message', function(event) {
    let item = event.data;
    if (item.action === "open") {
        if (isTransitioning) return;

        document.getElementById('xyz-val').innerText = item.xyz;
        document.getElementById('vector3-val').innerText = item.vector3;
        document.getElementById('vector4-val').innerText = item.vector4;
        
        wrapper.style.display = 'block';
        wrapper.className = "";
        
        void wrapper.offsetWidth; 
        
        wrapper.classList.add('anim-open');
    }
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const button = document.getElementById(elementId).nextElementSibling;
    const icon = button.querySelector('i');
    
    icon.className = 'fas fa-check';
    icon.style.color = '#6AFF40';
    button.style.transform = 'scale(1.2)';

    setTimeout(() => {
        icon.className = 'far fa-copy';
        icon.style.color = '';
        button.style.transform = '';
    }, 1000);
}

document.getElementById('close-menu').addEventListener('click', function() {
    closeUI();
});

window.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeUI();
    }
});

function closeUI() {
    if (isTransitioning) return;
    isTransitioning = true;

    wrapper.className = ""; 
    void wrapper.offsetWidth; 
    wrapper.classList.add('anim-close');

    setTimeout(() => {
        wrapper.style.display = 'none';
        isTransitioning = false;
        fetch(`https://${GetParentResourceName()}/closeUI`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        });
    }, 450); 
}