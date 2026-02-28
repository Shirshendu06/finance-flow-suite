let currentMode = 'emi';

const configs = {
    emi: { name: "EMI Calculator", desc: "Calculate your monthly loan repayments.", label: "Principal Amount (₹)" },
    sip: { name: "SIP Calculator", desc: "Grow wealth through monthly savings.", label: "Monthly SIP (₹)" },
    fd: { name: "FD Calculator", desc: "Calculate Fixed Deposit returns.", label: "Deposit Amount (₹)" },
    lumpsum: { name: "Lumpsum Returns", desc: "One-time investment growth.", label: "Investment Amount (₹)" }
};

function updateMode(mode, btn) {
    currentMode = mode;
    document.getElementById('calc-name').innerText = configs[mode].name;
    document.getElementById('calc-desc').innerText = configs[mode].desc;
    document.getElementById('label-amount').innerText = configs[mode].label;
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    slideBack();
}

function runCalculation() {
    const P = parseFloat(document.getElementById('val-amount').value);
    const R = parseFloat(document.getElementById('val-rate').value);
    const Y = parseFloat(document.getElementById('val-years').value);

    if(!P || !R || !Y) return alert("Please fill all fields!");

    let invested, total;

    if (currentMode === 'emi') {
        let r = R / 12 / 100;
        let n = Y * 12;
        let emi = P * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
        total = emi * n;
        invested = P;
    } else if (currentMode === 'sip') {
        let r = R / 12 / 100;
        let n = Y * 12;
        invested = P * n;
        total = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
        invested = P;
        total = P * Math.pow((1 + R / 100), Y);
    }

    document.getElementById('res-invested').innerText = "₹" + Math.round(invested).toLocaleString();
    document.getElementById('res-profit').innerText = "+ ₹" + Math.round(total - invested).toLocaleString();
    document.getElementById('res-total').innerText = "₹" + Math.round(total).toLocaleString();

    document.getElementById('slideWrapper').style.transform = "translateX(-50%)";
}

function slideBack() {
    document.getElementById('slideWrapper').style.transform = "translateX(0%)";
}